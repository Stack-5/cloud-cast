"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabse/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CircleAlert } from "lucide-react"; 

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Organization name is required" }).max(100),
  description: z.string().max(500, { message: "Description is too long" }).optional(),
});

export const CreateOrganizationForm = () => {
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", description: "" },
  });

  const generateJoinCode = () => Math.random().toString(36).substr(2, 8);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setLoading(true);
    const supabase = createClient();
    const joinCode = generateJoinCode();

    const user = supabase.auth.user(); 

    if (!user) {
      console.log("User is not authenticated.");
      setShowErrorAlert(true);
      setLoading(false);
      return;
    }

    const { data: orgData, error } = await supabase
      .from("organizations")
      .insert([
        {
          name: data.name, 
          description: data.description, 
          join_code: joinCode, 
          created_by: user.id, 
        },
      ])
      .select("id");

    if (error || !orgData?.[0]?.id) {
      setShowErrorAlert(true);
      setLoading(false);
      return;
    }

    await supabase.from("organization_members").insert([
      { organization_id: orgData[0].id, user_id: user.id, role: "admin" },
    ]);

    setLoading(false);
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 3000); 
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Controller
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization Name</FormLabel>
              <FormControl>
                <Input placeholder="Organization Name" {...field} />
              </FormControl>
              <FormDescription>Name of the organization</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a description for your organization" className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Optional description of your organization</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">Join Code</label>
          <input type="text" value={generateJoinCode()} readOnly className="w-full p-2 mt-1 border rounded-md bg-gray-100" />
        </div>

        <Button type="submit" className="mt-6" disabled={loading}>
          {loading ? "Creating..." : "Create Organization"}
        </Button>
      </form>

      {showSuccessAlert && (
        <Alert variant="destructive">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>Organization created successfully!</AlertDescription>
        </Alert>
      )}

      {showErrorAlert && (
        <Alert variant="destructive">
          <CircleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>There was an error creating the organization. Please try again.</AlertDescription>
        </Alert>
      )}
    </Form>
  );
};

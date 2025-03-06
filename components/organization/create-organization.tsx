"use client";

import { useState, useEffect } from "react";
import { useUser } from "@/context/user-context";
import { createClient } from "@/lib/supabse/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const CreateOrganizationDialog = () => {
  const { user } = useUser();
  const [organizationName, setOrganizationName] = useState("");
  const [description, setDescription] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to reset form fields
  const resetForm = () => {
    setOrganizationName("");
    setDescription("");
    setJoinCode(Math.random().toString(36).substr(2, 8));
  };

  // Reset form fields when the dialog opens
  useEffect(() => {
    if (isDialogOpen) {
      resetForm();
    }
  }, [isDialogOpen]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You need to be logged in to create an organization.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createClient();

    const { error } = await supabase.from("organizations").insert([
      {
        name: organizationName,
        description,
        join_code: joinCode,
        created_by: user.id,
      },
    ]);

    if (error) {
      toast.error("Failed to create organization. Please try again.");
      setIsSubmitting(false);
      return;
    }

    toast.success("Organization created successfully!");
    setIsDialogOpen(false);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-2 rounded-sm cursor-pointer"
        >
          <Plus className="w-6 h-6 text-[#0052CC]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Organization</DialogTitle>
          <DialogDescription>
            Enter the details for your new organization. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="organization-name">Organization Name</Label>
          <Input
            id="organization-name"
            type="text"
            placeholder="Enter Organization Name"
            value={organizationName}
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="organization-description">Description</Label>
          <Textarea
            id="organization-description"
            placeholder="Enter description for your organization"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="invite-code">Invite Code</Label>
          <Input
            id="invite-code"
            type="text"
            value={joinCode}
            readOnly
            disabled
            className="mt-2 bg-gray-100 text-gray-500"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || !organizationName || !description}
          className="w-full mt-4 bg-[#0052CC] hover:bg-[#172B4D]"
        >
          {isSubmitting ? "Creating..." : "Create Organization"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrganizationDialog;

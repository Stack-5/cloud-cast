"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useUser } from "@/context/user-context";

const JoinOrganizationDialog = () => {
  const { user } = useUser();
  const [inviteCode, setInviteCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // **Reset form when dialog opens**
  useEffect(() => {
    if (!isDialogOpen) {
      setInviteCode("");
    }
  }, [isDialogOpen]);

  const handleSubmit = async () => {
    if (!user?.id) {
      toast.error("You must be logged in to join an organization.");
      return;
    }

    setIsSubmitting(true);

    const res = await fetch("/api/join-organization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode, userId: user.id }),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.error || "Failed to join organization.");
    } else {
      toast.success("Successfully joined the organization!");
      setIsDialogOpen(false); // ✅ Close dialog
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="p-2 rounded-sm cursor-pointer">
          <Plus className="w-6 h-6 text-[#0052CC]" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md w-full p-6">
        <DialogHeader>
          <DialogTitle>Join an Organization</DialogTitle>
        </DialogHeader>

        <div className="mb-4">
          <Label htmlFor="invite-code">Invite Code</Label>
          <Input
            id="invite-code"
            type="text"
            placeholder="Enter invite code"
            value={inviteCode}
            onChange={(e) => setInviteCode(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || inviteCode.length < 6}
          className="w-full bg-[#0052CC] hover:bg-[#0747A6]"
        >
          {isSubmitting ? "Joining..." : "Join Organization"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default JoinOrganizationDialog;

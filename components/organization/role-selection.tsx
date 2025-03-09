"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabse/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { TableUser } from "@/types/table-user";

interface RoleSelectionProps {
  user: TableUser | null;
  onClose: () => void;
}

const RoleSelection = ({ user, onClose }: RoleSelectionProps) => {
  const supabase = createClient();
  const [selectedRole, setSelectedRole] = useState(user?.role || "");

  const updateRole = async (newRole: string) => {
    if (!user) return;

    const newStatus = newRole ? "Active" : "Pending"; // ✅ Auto-update status

    const { error } = await supabase
      .from("organization_members")
      .update({ role: newRole, status: newStatus }) // ✅ Update both role + status
      .eq("id", user.id);

    if (error) {
      console.error("❌ Failed to update role:", error);
    } else {
      console.log(`✅ Role updated to ${newRole}, Status updated to ${newStatus}`);
      setSelectedRole(newRole);

      // ✅ Manually fetch updated role if real-time fails
      const { data, error: fetchError } = await supabase
        .from("organization_members")
        .select("role")
        .eq("id", user.id)
        .single();

      if (!fetchError) {
        user.role = data.role; // ✅ Force UI update
      }
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6 flex flex-col items-center">
        <DialogHeader className="text-center">
          <DialogTitle className="text-lg font-semibold">
            Change Role for {user?.employee_name}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Select a new role for this user.
          </DialogDescription>
        </DialogHeader>

        {/* ✅ User Details */}
        <div className="text-center mt-4 space-y-2">
          <p className="text-sm"><strong>Name:</strong> {user?.employee_name}</p>
          <p className="text-sm"><strong>Email:</strong> {user?.email}</p>
          <p className="text-sm"><strong>Status:</strong> {user?.status}</p>
        </div>

        {/* ✅ Role Selection */}
        <div className="w-full mt-4">
          <Select onValueChange={updateRole} defaultValue={selectedRole}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="product_manager">Product Manager</SelectItem>
              <SelectItem value="employee">Employee</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelection;

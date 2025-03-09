"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabse/client";
import { useSelectedOrganization } from "@/context/selected-organization-context";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { TableUser } from "@/types/table-user";
import RoleSelection from "../organization/role-selection"; // ✅ Import RoleSelection

const UserTable = () => {
  const { selectedOrg } = useSelectedOrganization();
  const [users, setUsers] = useState<TableUser[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TableUser | null>(null);

  useEffect(() => {
    if (!selectedOrg) return;

    const supabase = createClient();

    const fetchUsers = async () => {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("organization_members")
        .select("id, employee_name, role, email, status, avatar_url")
        .eq("organization_id", selectedOrg);

      if (!error) setUsers(data);
      setIsFetching(false);
    };

    fetchUsers();

    // ✅ Subscribe to role & status changes in real-time
    const subscription = supabase
      .channel("organization_members")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "organization_members" }, // ✅ Listen for ALL updates
        (payload) => {
          console.log("🔄 Real-time update received:", payload);

          setUsers((prev) =>
            prev.map((user) =>
              user.id === payload.new.id
                ? {
                    ...user,
                    role: payload.new.role, // ✅ Ensure role updates
                    status: payload.new.status, // ✅ Ensure status updates
                  }
                : user
            )
          );
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // ✅ Ensure cleanup
    };
  }, [selectedOrg]);

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1 w-full overflow-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white z-10 shadow-md">
            <TableRow className="border-b border-[#C1C7D0]">
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 && !isFetching ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-[#7A869A]">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <ContextMenu key={user.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-[#E6F0FF] transition">
                      <TableCell className="font-medium text-[#172B4D]">
                        {user.employee_name}
                      </TableCell>
                      <TableCell className="text-[#7A869A]">
                        {user.role}
                      </TableCell>
                      <TableCell className="text-[#7A869A]">
                        {user.email}
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`px-2 py-1 rounded-md text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-[#36B37E] text-white"
                              : "bg-[#FFAB00] text-white"
                          }`}
                        >
                          {user.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => setSelectedUser(user)}>
                      🔄 Change Role
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>

      {/* ✅ Role Dialog Component */}
      <RoleSelection
        user={selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </div>
  );
};

export default UserTable;

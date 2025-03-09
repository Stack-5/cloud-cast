"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabse/client";
import { useSelectedOrganization } from "@/context/selected-organization-context"; 
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/user";

const UserTable = () => {
  const { selectedOrg } = useSelectedOrganization(); 
  const [users, setUsers] = useState<User[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!selectedOrg) {
      console.log("🔹 No organization selected. Clearing users.");
      setUsers([]);
      return;
    }

    const supabase = createClient();

    const fetchUsers = async () => {
      setIsFetching(true);
      console.log(`🔹 Fetching users for organization ID: ${selectedOrg}`);

      const { data, error } = await supabase
        .from("organization_members")
        .select(`
          user_id,
          role,
          users!organization_members_user_id_fkey ( id, name, email, avatar_url )
        `)
        .eq("organization_id", selectedOrg);

      console.log("🔹 Raw Supabase Response:", data, error);

      if (!error && data) {
        const validUsers = data.filter((member) => member.users && member.users.length > 0);
        console.log(`🔹 Total valid users found: ${validUsers.length}`);

        setUsers(
          validUsers.map((member) => {
            const user = member.users[0]; // ✅ Access first user
            console.log("🔹 Processing user:", user);
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar_url: user.avatar_url ?? "", // ✅ Ensure avatar_url is not null
              role: member.role,
            };
          })
        );
      } else {
        console.error("❌ Error fetching users:", error);
      }

      setIsFetching(false);
    };

    fetchUsers();

    // ✅ Subscribe to real-time updates
    const channel = supabase
      .channel("organization_members")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "organization_members" },
        () => fetchUsers() // Refresh when changes occur
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedOrg]);

  if (isFetching) {
    return (
      <div className="flex flex-col h-full w-full">
        <ScrollArea className="flex-1 w-full overflow-auto">
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full mb-2" />
          <Skeleton className="h-10 w-full" />
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full">
      <ScrollArea className="flex-1 w-full overflow-auto">
        <Table className="w-full">
          <TableHeader className="sticky top-0 bg-white z-10 shadow-md">
            <TableRow className="border-b border-[#C1C7D0]">
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length > 0 ? (
              users.map((user) => (
                <ContextMenu key={user.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow className="cursor-pointer hover:bg-[#E6F0FF] transition">
                      <TableCell className="font-medium text-[#172B4D]">{user.name}</TableCell>
                      <TableCell className="text-[#7A869A]">{user.role}</TableCell>
                      <TableCell className="text-[#7A869A]">{user.email}</TableCell>
                    </TableRow>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>🔄 Change Role</ContextMenuItem>
                    <ContextMenuItem className="text-[#FF5630]">🗑 Remove User</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-500">
                  No users found for this organization.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UserTable;

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

// Mock user data
const users = [
  { name: "Romnoel Petracorta", role: "Admin", email: "romnoel.petracorta@neu.edu.ph", status: "Active" },
  { name: "Lourie Jane Abao", role: "Product Manager", email: "lourie.jane@neu.edu.ph", status: "Awaiting Approval" },
  { name: "Richmond Baltazar", role: "Employee", email: "richmond.baltazar@neu.edu.ph", status: "Active" },
  { name: "Kevin Ros Lisboa", role: "Product Manager", email: "kevin.ros.lisboa@neu.edu.ph", status: "Active" },
  { name: "John Doe", role: "Pending", email: "john.doe@example.com", status: "Awaiting Approval" },
  { name: "Jane Smith", role: "Employee", email: "jane.smith@example.com", status: "Active" },
  { name: "Michael Johnson", role: "Employee", email: "michael.johnson@example.com", status: "Active" },
  { name: "Emily White", role: "Product Manager", email: "emily.white@example.com", status: "Awaiting Approval" },
];

const UserTable = () => {
  return (
    <div className="flex flex-col h-full w-full">
      {/* Scrollable Table */}
      <ScrollArea className="flex-1 w-full overflow-auto">
        <Table className="w-full">
          {/* Sticky Table Header */}
          <TableHeader className="sticky top-0 bg-white z-10 shadow-md">
            <TableRow className="border-b border-[#C1C7D0]">
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <ContextMenu key={user.email}>
                <ContextMenuTrigger asChild>
                  <TableRow className="cursor-pointer hover:bg-[#E6F0FF] transition">
                    <TableCell className="font-medium text-[#172B4D]">{user.name}</TableCell>
                    <TableCell className="text-[#7A869A]">{user.role}</TableCell>
                    <TableCell className="text-[#7A869A]">{user.email}</TableCell>
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
                  {user.status === "Awaiting Approval" && (
                    <>
                      <ContextMenuItem className="text-[#36B37E]">✅ Accept User</ContextMenuItem>
                      <ContextMenuItem className="text-[#FF5630]">❌ Reject User</ContextMenuItem>
                    </>
                  )}
                  <ContextMenuItem>🗑 Remove User</ContextMenuItem>
                  <ContextMenuItem>🔄 Change Role</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default UserTable;

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

const users = [
  {
    name: "Romnoel Petracorta",
    role: "Admin",
    email: "romnoel.petracorta@neu.edu.ph",
    status: "Active",
  },
  {
    name: "Lourie Jane Abao",
    role: "Product Manager",
    email: "lourie.jane@neu.edu.ph",
    status: "Awaiting Approval",
  },
  {
    name: "Richmond Baltazar",
    role: "Employee",
    email: "richmond.baltazar@neu.edu.ph",
    status: "Active",
  },
  {
    name: "Kevin Ros Lisboa",
    role: "Product Manager",
    email: "kevin.ros.lisboa@neu.edu.ph",
    status: "Active",
  },
  {
    name: "John Doe",
    role: "Pending",
    email: "john.doe@example.com",
    status: "Awaiting Approval",
  },
  {
    name: "Jane Smith",
    role: "Employee",
    email: "jane.smith@example.com",
    status: "Active",
  },
  {
    name: "Michael Johnson",
    role: "Employee",
    email: "michael.johnson@example.com",
    status: "Active",
  },
  {
    name: "Emily White",
    role: "Product Manager",
    email: "emily.white@example.com",
    status: "Awaiting Approval",
  },
];

const UserTable = () => {
  return (
    <ScrollArea className="w-full max-h-[500px] overflow-auto rounded-md">
      <Table className="w-full">
        {/* Sticky Table Header */}
        <TableHeader className="sticky top-0 bg-white z-10 shadow-md">
          <TableRow>
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
                <TableRow className="cursor-pointer">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">{user.status}</TableCell>
                </TableRow>
              </ContextMenuTrigger>
              <ContextMenuContent>
                {user.status === "Awaiting Approval" && (
                  <>
                    <ContextMenuItem className="text-green-600">
                      ✅ Accept User
                    </ContextMenuItem>
                    <ContextMenuItem className="text-red-600">
                      ❌ Reject User
                    </ContextMenuItem>
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
  );
};

export default UserTable;

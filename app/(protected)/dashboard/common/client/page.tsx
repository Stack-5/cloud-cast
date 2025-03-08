import { ClientPageProps } from "@/types/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UserTable from "@/components/user/user-table";
import Inbox from "@/components/user/inbox";
import Project from "@/components/user/project";
import FileStorage from "@/components/user/file-storage";
import Analytics from "@/components/user/analytics";

const ClientPage = ({ readOnly = false, restricted = false }: ClientPageProps) => {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-2 h-full p-4">
      {!restricted && (
        <Card className="col-span-3 row-span-3">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Periodic chart reports about organization metrics</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-full">
            <Analytics />
          </CardContent>
        </Card>
      )}

      {!restricted && !readOnly && (
        <Card className="col-span-3 row-span-3 col-start-4 flex flex-col">
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage and view organization users</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <UserTable />
          </CardContent>
        </Card>
      )}

      <Card className="col-span-2 row-span-2 row-start-4 flex flex-col">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Track progress and milestones</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden px-14">
          <Project />
        </CardContent>
      </Card>

      <Card className="col-span-2 row-span-2 col-start-3 row-start-4 flex flex-col">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>View and manage messages</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <Inbox />
        </CardContent>
      </Card>

      <Card className="col-span-2 row-span-2 col-start-5 row-start-4 flex flex-col">
        <CardHeader>
          <CardTitle>File Storage</CardTitle>
          <CardDescription>Access organization documents</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <FileStorage />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPage;

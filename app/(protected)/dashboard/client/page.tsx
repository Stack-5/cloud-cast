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

const ClientPage = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-5 gap-2 h-full p-4">
      {/* Top Left Card */}
      <Card className="col-span-3 row-span-3">
        <CardContent className="flex items-center justify-center h-full">
          1
        </CardContent>
      </Card>

      {/* Users Table - Full Height Scrollable Card */}
      <Card className="col-span-3 row-span-3 col-start-4 flex flex-col">
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage and view organization users</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <UserTable />
        </CardContent>
      </Card>

      {/* Bottom Left Card */}
      <Card className="col-span-2 row-span-2 row-start-4">
        <CardHeader>
          <CardTitle>Projects</CardTitle>
          <CardDescription>Track progress and milestones</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <Project/>
        </CardContent>
      </Card>

      {/* Bottom Middle Card */}
      <Card className="col-span-2 row-span-2 col-start-3 row-start-4 pb-4">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>View and manage messages</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <Inbox />
        </CardContent>
      </Card>

      {/* Bottom Right Card */}
      <Card className="col-span-2 row-span-2 col-start-5 row-start-4">
        <CardHeader>
          <CardTitle>File Storage</CardTitle>
          <CardDescription>Access organization documents</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-full">
          <FileStorage/>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPage;

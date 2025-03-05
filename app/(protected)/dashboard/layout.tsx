import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex h-screen w-screen"> {/* Ensure full screen width */}
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
        <SidebarTrigger />
        <main className="p-6 flex-1 min-h-screen">{children}</main> {/* Ensures full height */}
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;


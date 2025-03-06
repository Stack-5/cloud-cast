import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/sidebar/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <SidebarProvider>
    <div className="flex h-screen w-screen overflow-hidden"> 
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-100 h-screen overflow-y-auto">
        <SidebarTrigger />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </div>
  </SidebarProvider>
);

export default DashboardLayout;


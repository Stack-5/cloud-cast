"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Home, Inbox, File, ChevronDown, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/context/user-context";
import SignOutButton from "@/components/authentication/signout-button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import OrganizationsList from "@/components/organization/organization-list";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import CreateOrganizationDialog from "../organization/create-organization";
import JoinOrganizationDialog from "../organization/join-organization";

const items = [
  { title: "Overview", url: "/dashboard/client", icon: Home },
  { title: "Inbox", url: "/dashboard/inbox", icon: Inbox },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
  { title: "File Storage", url: "/dashboard/file-storage", icon: File },
];

const getInitials = (name: string) => {
  const words = name.split(" ");
  return words.length > 1
    ? `${words[0][0]}${words[1][0]}`.toUpperCase()
    : words[0][0].toUpperCase();
};

const AppSidebar = () => {
  const { user, loading } = useUser();
  const [selected, setSelected] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);
  const [actionsOpen, setActionsOpen] = useState(false);
  const router = useRouter();

  const handleNavigation = (url: string, title: string) => {
    setSelected(title);
    router.push(url, { scroll: false });
  };

  return (
    <Sidebar className="h-screen flex flex-col bg-[#FFFFFF] text-[#172B4D] border-r border-[#C1C7D0]">
      <SidebarContent className="flex-1">
        {/* Logo Section */}
      <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-3 text-[#0052CC] text-xl font-bold">
            <Image src="/cloud-cast.svg" width={24} height={24} alt="Cloud Cast Logo" />
            <span>Cloud Cast</span>
          </SidebarGroupLabel>
        </SidebarGroup>

        {/* Collapsible Actions */}
        <SidebarMenu>
          <Collapsible open={actionsOpen} onOpenChange={setActionsOpen} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  disabled={!selectedOrg}
                  className={`flex items-center w-full px-3 py-2 text-lg font-medium rounded-md transition 
                  ${selectedOrg ? "text-[#172B4D] hover:bg-[#E6F0FF] cursor-pointer" : "text-[#C1C7D0] cursor-not-allowed"}`}
                >
                  <ChevronRight className={`mr-2 transition-transform ${actionsOpen ? "rotate-90" : ""}`} />
                  Actions
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {items.map(({ title, url, icon: Icon }) => (
                    <SidebarMenuSubItem key={title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={url}
                          prefetch
                          onClick={() => handleNavigation(url, title)}
                          className={`flex items-center space-x-4 text-lg py-2 px-3 rounded-md transition-colors 
                          ${selected !== title ? "text-[#172B4D] hover:bg-[#E6F0FF]" : "bg-[#0052CC] text-white font-semibold"}`}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="font-medium text-base">{title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>

        {/* Organizations */}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-lg font-medium text-[#172B4D]">
              Organizations
            </SidebarGroupLabel>

            {user?.role === "admin" ? <CreateOrganizationDialog /> : <JoinOrganizationDialog />}
          </div>
          <OrganizationsList />
        </SidebarGroup>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter className="bg-[#FFFFFF] border-t border-[#C1C7D0]">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {loading ? (
                    <span className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                  ) : (
                    <Avatar>
                      <AvatarImage src={user?.avatar_url || ""} />
                      <AvatarFallback className="bg-[#0052CC] text-white">
                        {user?.name ? getInitials(user.name) : "?"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span className="ml-3 text-base font-medium text-[#172B4D]">
                    {loading ? "Loading..." : user?.name || "Guest"}
                  </span>
                  <ChevronDown className="ml-auto text-[#172B4D]" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56 bg-white text-black shadow-md border border-[#C1C7D0]">
                <DropdownMenuItem className="hover:bg-[#E6F0FF]">Account</DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <SignOutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;

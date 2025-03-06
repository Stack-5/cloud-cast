"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Home, Inbox, File, ChevronUp } from "lucide-react";
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import CreateOrganizationDialog from "../organization/create-organization";

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
  const [selected, setSelected] = useState("Overview");
  const router = useRouter();

  const handleNavigation = (url: string, title: string) => {
    setSelected(title);
    router.push(url, { scroll: false });
  };

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-3">
            <Image
              src="/cloud-cast.svg"
              width={24}
              height={24}
              alt="Cloud Cast Logo"
            />
            <span className="text-2xl font-bold text-blue-600">Cloud Cast</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild className="mb-2">
                    <Link
                      href={url}
                      prefetch
                      onClick={() => handleNavigation(url, title)}
                      className={`flex items-center space-x-4 text-lg py-4 rounded-md transition-colors ${
                        selected !== title
                          ? "text-gray-800 hover:bg-blue-100"
                          : "bg-blue-600 text-white font-semibold"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-medium text-base">{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Organization */}
        <SidebarContent>
          <SidebarGroup>
            <div className="flex items-center justify-between">
              <SidebarGroupLabel className="text-lg font-medium text-gray-700">
                Organizations
              </SidebarGroupLabel>
              <CreateOrganizationDialog />
            </div>
            <OrganizationsList />
          </SidebarGroup>
        </SidebarContent>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
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
                      <AvatarFallback>
                        {user?.name ? getInitials(user.name) : "?"}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <span className="ml-3 text-base font-medium">
                    {loading ? "Loading..." : user?.name || "Guest"}
                  </span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem>Account</DropdownMenuItem>
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

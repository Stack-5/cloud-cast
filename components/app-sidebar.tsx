"use client";

import { useState, useEffect } from "react";
import { Calendar, Home, Inbox, File, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabse/client";
import SignOutButton from "@/components/signout-button";

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

const items = [
  { title: "Dashboard", url: "#", icon: Home },
  { title: "Inbox", url: "#", icon: Inbox },
  { title: "Calendar", url: "#", icon: Calendar },
  { title: "File Storage", url: "#", icon: File },
];

const AppSidebar = () => {
  const [selected, setSelected] = useState("Dashboard");
  const [user, setUser] = useState<{ name: string; avatar_url: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("users")
        .select("name, avatar_url")
        .single();

      if (error || !data) return setLoading(false);

      setUser(data);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex-1">
        {/* Cloud Cast Branding */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <span className="text-2xl font-bold text-blue-600">Cloud Cast</span>
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map(({ title, url, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild className="mb-2">
                    <a
                      href={url}
                      onClick={() => setSelected(title)}
                      className={`flex items-center space-x-4 text-lg py-4 rounded-lg transition-colors ${
                        selected !== title
                          ? "text-gray-800 hover:bg-blue-100"
                          : "bg-blue-600 text-white font-semibold"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                      <span className="font-medium text-base">{title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Organizations Section with Add Button */}
        <SidebarGroup>
          <div className="flex items-center justify-between py-2">
            <SidebarGroupLabel className="text-lg font-medium text-gray-700">
              Organizations
            </SidebarGroupLabel>
            <button className=" rounded-md hover:bg-gray-200 p-1">
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <SidebarGroupContent />
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {loading ? (
                    <span className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
                  ) : user?.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt="User Avatar"
                      width={32}
                      height={32}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="w-8 h-8 bg-gray-400 rounded-full" />
                  )}
                  <span className="ml-3 text-base font-medium">
                    {loading ? "Loading..." : user?.name || "Guest"}
                  </span>
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
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

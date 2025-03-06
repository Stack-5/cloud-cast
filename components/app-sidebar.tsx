"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Home, Inbox, File, ChevronUp, Plus } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabse/client";
import SignOutButton from "@/components/signout-button";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [selected, setSelected] = useState("Overview");
  const [user, setUser] = useState<{ name: string; avatar_url: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleNavigation = (url: string, title: string) => {
    setSelected(title);
    router.push(url, { scroll: false });
  };

  return (
    <Sidebar className="h-screen flex flex-col">
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center space-x-3">
            <Image src="/cloud-cast.svg" width={24} height={24} alt="Cloud Cast Logo" />
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
                      className={`flex items-center space-x-4 text-lg py-4 rounded-lg transition-colors ${
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

        {/* Organizations Section with Add Button & Dialog */}
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-lg font-medium text-gray-700">Organizations</SidebarGroupLabel>
            <Dialog>
              <DialogTrigger asChild>
                <button className="p-1 rounded-md hover:bg-gray-200">
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a new Organization</DialogTitle>
                  <DialogDescription>
                    Enter details for your new organization. This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <SidebarGroupContent />
        </SidebarGroup>
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

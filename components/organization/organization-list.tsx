"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabse/client";
import { useUser } from "@/context/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Organization } from "@/types/organization";
import { Folder } from "lucide-react"; // ✅ Import folder icon

// ✅ Define expected prop type
type OrganizationsListProps = {
  setSelectedOrg: (orgId: string | null) => void;
};

const OrganizationsList = ({ setSelectedOrg }: OrganizationsListProps) => {
  const { user, loading } = useUser();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [selectedOrg, setLocalSelectedOrg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();

    const fetchOrganizations = async () => {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrganizations(data);
      }
      setIsFetching(false);
    };

    fetchOrganizations();

    // ✅ Subscribe to real-time updates
    const channel = supabase.channel("organizations");

    channel.on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "organizations" },
      (payload) => {
        console.log("New organization added:", payload.new);
        setOrganizations((prev) => [...prev, payload.new as Organization]);
      }
    );

    channel.on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "organizations" },
      (payload) => {
        console.log("Organization updated:", payload.new);
        setOrganizations((prev) =>
          prev.map((org) => (org.id === payload.new.id ? (payload.new as Organization) : org))
        );
      }
    );

    channel.on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "organizations" },
      (payload) => {
        console.log("Organization deleted:", payload.old);
        setOrganizations((prev) => prev.filter((org) => org.id !== payload.old.id));
      }
    );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading || isFetching) {
    return (
      <SidebarGroupContent>
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full" />
      </SidebarGroupContent>
    );
  }

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <SidebarMenuItem key={org.id}>
              <SidebarMenuButton
                onClick={() => {
                  setLocalSelectedOrg(org.id);
                  setSelectedOrg(org.id); // ✅ Pass selected organization to AppSidebar
                }}
                className={`flex items-center space-x-4 text-base py-3 rounded-md transition-colors 
                  ${selectedOrg === org.id ? "bg-[#0052CC] text-white font-semibold" : "text-gray-800 hover:bg-[#172B4D] hover:text-white"}
                `}
              >
                <Folder className="w-5 h-5 text-gray-800" /> 
                <span className="font-medium text-base">{org.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        ) : (
          <p className="text-gray-500 text-sm px-3">No organizations found.</p>
        )}
      </SidebarMenu>
    </SidebarGroupContent>
  );
};

export default OrganizationsList;

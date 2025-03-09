"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabse/client";
import { useUser } from "@/context/user-context";
import { useSelectedOrganization } from "@/context/selected-organization-context"; // ✅ Import
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Organization } from "@/types/organization";
import { Folder } from "lucide-react"; // ✅ Import folder icon

const OrganizationsList = () => {
  const { user, loading } = useUser();
  const { selectedOrg, setSelectedOrg } = useSelectedOrganization(); // ✅ Use context

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const fetchOrganizations = async () => {
      setIsFetching(true);
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrganizations(data);

        // ✅ Auto-select the first organization only if one isn't already selected
        if (!selectedOrg && data.length > 0) {
          setSelectedOrg(data[0].id);
        }
      }

      setIsFetching(false);
    };

    fetchOrganizations();

    // ✅ Real-time updates for organizations
    channel = supabase
      .channel("organizations")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "organizations" },
        (payload) => {
          console.log("New organization added:", payload.new);
          setOrganizations((prev) => [...prev, payload.new as Organization]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "organizations" },
        (payload) => {
          console.log("Organization updated:", payload.new);
          setOrganizations((prev) =>
            prev.map((org) => (org.id === payload.new.id ? (payload.new as Organization) : org))
          );
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "organizations" },
        (payload) => {
          console.log("Organization deleted:", payload.old);
          setOrganizations((prev) => prev.filter((org) => org.id !== payload.old.id));

          // ✅ If the deleted org is the selected one, deselect it
          if (selectedOrg === payload.old.id) {
            setSelectedOrg(null);
          }
        }
      )
      .subscribe();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user, selectedOrg, setSelectedOrg]); // ✅ Include all dependencies

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
                onClick={() => setSelectedOrg(org.id)} // ✅ Use global context
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

"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { SelectedOrganizationContextType } from "@/types/selected-organization";

export const SelectedOrganizationContext = createContext<SelectedOrganizationContextType | undefined>(undefined);

export const SelectedOrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedOrg, setSelectedOrg] = useState<string | null>(null);

  return (
    <SelectedOrganizationContext.Provider value={{ selectedOrg, setSelectedOrg }}>
      {children}
    </SelectedOrganizationContext.Provider>
  );
};

export const useSelectedOrganization = () => {
  const context = useContext(SelectedOrganizationContext);
  if (!context) {
    throw new Error("useSelectedOrganization must be used within a SelectedOrganizationProvider");
  }
  return context;
};

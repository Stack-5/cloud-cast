export type SelectedOrganizationContextType = {
  selectedOrg: string | null;
  setSelectedOrg: (orgId: string | null) => void;
};

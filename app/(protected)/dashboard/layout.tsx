import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard Layout</h1>
      {children} 
    </div>
  );
};

export default DashboardLayout;

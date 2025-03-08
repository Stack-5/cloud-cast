"use client";

import { useUser } from "@/context/user-context";

const ClientPage = () => {
  const { user, loading } = useUser();

  if (loading) return <p>Loading...</p>;

  if (!user) return <p>Unauthorized</p>;

  return (
    <div>
      {/* Employees can only view */}
      {user.role === "employee" && <p>View-only access</p>}

      {/* Product Managers can view but not delete */}
      {user.role === "product-manager" && <p>Can edit but not delete</p>}

      {/* Admins have full control */}
      {user.role === "admin" && <p>Full access</p>}
    </div>
  );
};

export default ClientPage;

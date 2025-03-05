"use client";

import useUser from "@/hooks/use-user";

const LoadingState = () => <p>Loading...</p>;
const ErrorState = ({ message }: { message: string }) => <p>Error: {message}</p>;
const UserInfo = ({ user, role }: { user?: { email?: string }; role?: string }) => (
  <>
    <h1 className="text-lg font-medium">User: {user?.email || "N/A"}</h1>
    <h2 className="text-lg font-medium">Role: {role || "N/A"}</h2>
  </>
);

const ClientPage = () => {
  const { loading, error, user, role } = useUser();
  
  // Convert null values to undefined for proper typing
  const safeUser = user ?? undefined;
  const safeRole = role ?? undefined;

  const content = loading 
    ? <LoadingState /> 
    : error 
    ? <ErrorState message={error.message} /> 
    : <UserInfo user={safeUser} role={safeRole} />;

  return (
    <div className="space-y-4">
      {content}
      <p className="text-muted-foreground">(I am a client component.)</p>
    </div>
  );
};

export default ClientPage;

import  getUserRole  from "@/lib/get-user-role";
import { createClient } from "@/lib/supabse/server";

const fetchUserData = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const role = await getUserRole();
  return { user, role };
};

const ServerPage = async () => {
  const { user, role } = await fetchUserData();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">User: {user?.email || "N/A"}</h1>
      <h2 className="text-lg font-medium">Role: {role || "N/A"}</h2>
      <p className="text-muted-foreground">(I am a server component.)</p>
    </div>
  );
};

export default ServerPage;

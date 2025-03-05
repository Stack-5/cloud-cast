import { createClient } from "@/lib/supabse/server";
import { User } from "@/types/user-types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchUsers = async (): Promise<{ users: User[] | null; error: any }> => {
  const supabase = await createClient();
  const { data: users, error } = await supabase
    .from("users")
    .select("id, email, role");

  return { users, error };
};

const UserList = ({ users }: { users: User[] }) => (
  <ul className="text-muted-foreground text-sm">
    {users.map(({ id, email, role }) => (
      <li key={id}>
        Email: {email}, Role: {role}
      </li>
    ))}
  </ul>
);

const AdminPage = async () => {
  const { users, error } = await fetchUsers();

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-medium">Welcome admin!</h1>
      <h2>User List:</h2>
      {error ? <p>Error loading users: {error.message}</p> : users && <UserList users={users} />}
    </div>
  );
};

export default AdminPage;

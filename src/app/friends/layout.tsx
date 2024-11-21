import getFriends from "@/actions/getFriends";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();
  // const currentUser = await getCurrentUser();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList
          items={friends}
          // user={currentUser}
        />
        {children}
      </div>
    </Sidebar>
  );
}

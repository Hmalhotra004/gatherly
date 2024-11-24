import getFriendRequests from "@/actions/getFriendRequests";
import getFriends from "@/actions/getFriends";
import Sidebar from "@/components/sidebar/Sidebar";
import UserList from "@/components/users/UserList";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();
  const friendRequests = await getFriendRequests();
  return (
    <Sidebar>
      <div className="h-full">
        <UserList
          friends={friends}
          friendRequests={friendRequests}
        />
        {children}
      </div>
    </Sidebar>
  );
}

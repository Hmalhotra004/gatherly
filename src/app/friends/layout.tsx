import getFriendRequests from "@/actions/getFriendRequests";
import getFriends from "@/actions/getFriends";
import Sidebar from "@/components/sidebar/Sidebar";
import FriendList from "@/components/friends/FriendList";

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
        <FriendList
          friends={friends}
          friendRequests={friendRequests}
        />
        {children}
      </div>
    </Sidebar>
  );
}
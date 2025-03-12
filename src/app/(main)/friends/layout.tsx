import getCurrentUser from "@/actions/getCurrentUser";
import getFriendRequests from "@/actions/getFriendRequests";
import getFriends from "@/actions/getFriends";
import FriendList from "@/components/friends/FriendList";

export default async function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();
  const friendRequests = await getFriendRequests();
  const currentUser = await getCurrentUser();
  return (
    <section className="flex w-full h-full">
      <FriendList
        friends={friends}
        friendRequests={friendRequests}
        currentUser={currentUser!}
      />
      {children}
    </section>
  );
}

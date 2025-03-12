// import getFriendRequests from "@/actions/getFriendRequests";
// import getFriends from "@/actions/getFriends";
// import Sidebar from "@/components/sidebar/Sidebar";
// import FriendList from "@/components/friends/FriendList";
// import getCurrentUser from "@/actions/getCurrentUser";

export default async function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const friends = await getFriends();
  // const friendRequests = await getFriendRequests();
  // const currentUser = await getCurrentUser();
  return (
    <section className="flex w-full h-full">
      hello
      {/* <FriendList
      friends={friends}
      friendRequests={friendRequests}
      currentUser={currentUser!}
    /> */}
      {children}
    </section>
  );
}

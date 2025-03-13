import getConversations from "@/actions/getConversations";
import getFriends from "@/actions/getFriends";
import ConversationList from "@/components/conversations/ConversationList";

export default async function FriendsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const friends = await getFriends();
  const conversations = await getConversations();
  return (
    <section className="flex w-full h-full">
      <ConversationList
        initialItems={conversations}
        users={friends}
      />
      {children}
    </section>
  );
}

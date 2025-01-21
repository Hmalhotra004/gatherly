import getConversations from "@/actions/getConversations";
import getFriends from "@/actions/getFriends";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  const userFriends = await getFriends();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList
          initialItems={conversations}
          users={userFriends}
        />
        {children}
      </div>
    </Sidebar>
  );
}

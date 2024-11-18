import getConversations from "@/actions/getConversations";
import ConversationList from "@/components/conversations/ConversationList";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function ConversationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await getConversations();
  return (
    <Sidebar>
      <div className="h-full">
        <ConversationList initialItems={conversations} />
        {children}
      </div>
    </Sidebar>
  );
}

import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import ChatForm from "@/components/chat/ChatForm";
import ChatWall from "@/components/chat/ChatWall";
import Header from "@/components/chat/Header";
import EmptyState from "@/components/EmptyState";

const ConversationIdPage = async ({
  params,
}: {
  params: Promise<{ conversationId: string }>;
}) => {
  const conversationId = (await params).conversationId;
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <div className="h-full w-full flex flex-col">
        <Header conversation={conversation} />
        <ChatWall initialMessages={messages!} />
        <ChatForm />
      </div>
    </div>
  );
};

export default ConversationIdPage;

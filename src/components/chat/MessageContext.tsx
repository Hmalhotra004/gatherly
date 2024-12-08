import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import axios from "axios";
import { Clipboard, Edit } from "lucide-react";

interface MessageContextProps {
  children: React.ReactNode;
  data: FullMessageType;
  isOwn: boolean;
}

const MessageContext = ({ children, data, isOwn }: MessageContextProps) => {
  const { conversationId } = useConversation();
  async function handleDelete() {
    try {
      await axios.delete("/api/messages/", {
        data: {
          id: data.id,
          conversationId,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(data.body!);
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
        {!data.deleted && (
          <ContextMenuContent>
            {data?.body && !data.deleted && (
              <ContextMenuItem
                className="space-x-1 cursor-pointer"
                onClick={handleCopy}
              >
                <Clipboard size={15} />
                <p>Copy</p>
              </ContextMenuItem>
            )}
            {data?.body && !data.deleted && isOwn && (
              <ContextMenuItem
                className="space-x-1 cursor-pointer"
                onClick={handleCopy}
              >
                <Edit size={15} />
                <p>Edit</p>
              </ContextMenuItem>
            )}
            <ContextMenuSeparator />
            {isOwn && !data.deleted && (
              <ContextMenuItem
                className="text-red-800 focus:text-red-900 cursor-pointer"
                onClick={handleDelete}
              >
                Delete
              </ContextMenuItem>
            )}
          </ContextMenuContent>
        )}
      </ContextMenu>
    </>
  );
};

export default MessageContext;

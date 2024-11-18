"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import MessagesBox from "./MessagesBox";

interface ChatWallProps {
  initialMessages: FullMessageType[];
}

const ChatWall = ({ initialMessages }: ChatWallProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, idx) => (
        <MessagesBox
          key={message.id}
          isLast={idx === messages.length - 1}
          data={message}
        />
      ))}
      <div
        ref={bottomRef}
        className="pt-24"
      />
    </div>
  );
};

export default ChatWall;

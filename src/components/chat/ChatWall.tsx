"use client";

import useConversation from "@/hooks/useConversation";
import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/types";
import axios from "axios";
import { find } from "lodash";
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

  useEffect(() => {
    pusherClient.subscribe(conversationId!);
    bottomRef?.current?.scrollIntoView();

    async function messageHandler(message: FullMessageType) {
      await axios.post(`/api/conversations/${conversationId}/seen`);
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    }

    async function updateMessageHandler(newMessage: FullMessageType) {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) return newMessage;

          return currentMessage;
        })
      );
    }

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId!);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
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

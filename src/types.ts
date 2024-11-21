import { Conversation, Message, User } from "@prisma/client";
import { DefaultUser } from "next-auth";

export type Variant = "LOGIN" | "REGISTER";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

declare module "next-auth" {
  interface User extends DefaultUser {
    discriminator?: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      image?: string;
      discriminator?: string;
    };
  }
}

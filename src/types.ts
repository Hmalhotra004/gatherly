import {
  Conversation,
  ConversationOnUser,
  Friend,
  Message,
  User,
} from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: ConversationOnUser[];
  messages: FullMessageType[];
};

export type UserWithFriendsAndFriendRequests = User & {
  friends: friend[];
  friendRequests: Friend[];
};

export type otherUser = ConversationOnUser & {
  user: User;
};

export type friend = {
  id: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
};

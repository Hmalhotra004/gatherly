import { FullConversationType, otherUser } from "@/types";
import Cookies from "js-cookie";

const useOtherUser = (conversation: FullConversationType) => {
  const currentUserId = Cookies.get("userId");

  const otherUser = conversation.users.find((user) => {
    return user.userId !== currentUserId;
  });

  return otherUser as otherUser;
};

export default useOtherUser;

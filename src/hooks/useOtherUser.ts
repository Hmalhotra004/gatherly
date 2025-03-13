import { FullConversationType, otherUser } from "@/types";
import Cookies from "js-cookie";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType) => {
  const otherUser = useMemo(() => {
    const currentUserId = Cookies.get("userId");

    const otherUser = conversation.users.find((user) => {
      return user.userId !== currentUserId;
    });

    return otherUser;
  }, [conversation.users]);

  return otherUser as otherUser;
};

export default useOtherUser;

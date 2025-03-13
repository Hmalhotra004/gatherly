"use client";

import { FullMessageType, otherUser } from "@/types";
import { Conversation } from "@prisma/client";
import Image from "next/image";

interface AvatarGroupProps {
  users?: Conversation & {
    users: otherUser[];
    messages: FullMessageType[];
  };
}

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const slicedUsers = users?.users.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers?.map((user, idx) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] 
            ${positionMap[idx as keyof typeof positionMap]}`}
        >
          <Image
            alt="GroupAvatar"
            src={user?.user.image || "/placeholder.jpeg"}
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;

"use client";
import useActiveList from "@/store/useActiveList";
import { friend } from "@/types";
import Image from "next/image";

interface AvatarProps {
  user: friend;
}

const Avatar = ({ user }: AvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user.email!) !== -1;
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
        <Image
          src={user?.image || "/placeholder.jpeg"}
          alt="avatar"
          fill
        />
      </div>
      {isActive && (
        <span className="absolute block rounded-full bg-green-500 ring-2 ring-white top-0 right-0 h-2 w-2 md:h-3 md:w-3" />
      )}
    </div>
  );
};

export default Avatar;

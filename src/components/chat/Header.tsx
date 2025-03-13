"use client";
import Avatar from "@/components/avatar/Avatar";
import AvatarGroup from "@/components/avatar/AvatarGroup";
import useOtherUser from "@/hooks/useOtherUser";
import useActiveList from "@/store/useActiveList";
import { FullConversationType } from "@/types";
import Link from "next/link";
import { useMemo } from "react";
import { HiChevronLeft, HiEllipsisHorizontal } from "react-icons/hi2";
import ProfileDrawer from "../modals/ProfileDrawer";

interface HeaderProps {
  conversation: FullConversationType;
}

const Header = ({ conversation }: HeaderProps) => {
  const { members } = useActiveList();
  const otherUser = useOtherUser(conversation);
  const isActive = members.indexOf(otherUser?.user.email) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? `Active` : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>

          {conversation.isGroup ? (
            <AvatarGroup users={conversation} />
          ) : (
            <Avatar user={otherUser.user} />
          )}

          <div className="flex flex-col">
            <div>{conversation.name || otherUser.user.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <ProfileDrawer data={conversation}>
          <HiEllipsisHorizontal
            size={32}
            className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
          />
        </ProfileDrawer>
      </div>
    </>
  );
};

export default Header;

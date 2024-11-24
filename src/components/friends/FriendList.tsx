"use client";
import { cn } from "@/lib/utils";
import { friend } from "@/types";
import FriendModal from "../modals/FriendRequestModal";
import AddFriendBox from "./AddFriendBox";
import FriendBox from "./FriendBox";

interface FriendListProps {
  friends: friend[];
  friendRequests: friend[];
}

const FriendList = ({ friends, friendRequests }: FriendListProps) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 flex overflow-y-auto border-r border-gray-200 w-full left-0 flex-col">
      <div className="px-5 flex-grow">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Friends
          </div>
          <div className="ml-auto">
            <FriendModal friends={friendRequests}>
              <button
                className={cn("bg-gray-300 rounded-full z-50 px-2 py-[2px]")}
              >
                {friendRequests.length}
              </button>
            </FriendModal>
          </div>
        </div>
        {friends.length >= 1 ? (
          <div>
            {friends.map((friend) => (
              <FriendBox
                key={friend.id}
                data={friend}
              />
            ))}
          </div>
        ) : (
          <h2>Maybe add a friend</h2>
        )}
      </div>
      <AddFriendBox />
    </aside>
  );
};

export default FriendList;

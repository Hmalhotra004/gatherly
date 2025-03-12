"use client";
import { pusherClient } from "@/lib/pusher";
import { friend } from "@/types";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import FriendModal from "../modals/FriendRequestModal";
import AddFriendBox from "./AddFriendBox";
import FriendBox from "./FriendBox";

interface FriendListProps {
  friends: friend[];
  friendRequests: friend[];
  currentUser: User;
}

const FriendList = ({
  friends,
  friendRequests,
  currentUser,
}: FriendListProps) => {
  const [friendReqs, setFriendReqs] = useState(friendRequests);
  const [friendState, setFriendState] = useState(friends);

  useEffect(() => {
    pusherClient.subscribe(currentUser.id);

    async function handleRequest(newReq: friend) {
      setFriendReqs((current) => {
        if (current.some((req) => req.id === newReq.id)) {
          return current;
        }
        return [newReq, ...current];
      });
    }

    async function handleAccept(newFrd: friend) {
      setFriendState((current) => {
        if (current.some((frd) => frd.id === newFrd.id)) {
          return current;
        }
        return [newFrd, ...current];
      });
    }

    pusherClient.bind("request:pending", handleRequest);
    pusherClient.bind("request:accepted", handleAccept);

    return () => {
      pusherClient.unsubscribe(currentUser.id);
      pusherClient.unbind("request:pending", handleRequest);
      pusherClient.unbind("request:accepted", handleAccept);
    };
  }, [currentUser.id]);

  useEffect(() => {
    setFriendReqs(friendRequests);
  }, [friendRequests]);

  useEffect(() => {
    setFriendState(friends);
  }, [friends]);

  return (
    <aside className="inset-y-0 pb-20 lg:pb-0 lg:w-80 flex overflow-y-auto border-r border-gray-200 w-full left-0 flex-col">
      <div className="px-5 flex-grow">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Friends
          </div>
          <div className="ml-auto">
            <FriendModal friends={friendReqs}>
              <button className="bg-gray-300 rounded-full z-50 px-2 py-[2px] cursor-pointer">
                {friendReqs.length}
              </button>
            </FriendModal>
          </div>
        </div>
        {friends.length >= 1 ? (
          <div>
            {friendState.map((friend) => (
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

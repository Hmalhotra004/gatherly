"use client";

import Avatar from "@/components/avatar/Avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { friend } from "@/types";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface FriendRequestModalProps {
  children: React.ReactNode;
  friends: friend[];
}

const FriendRequestModal = ({ children, friends }: FriendRequestModalProps) => {
  const [open, setOpen] = useState(false);

  async function handleAccept(friend: friend) {
    try {
      const response = await axios.put("/api/friends/accept", {
        friendId: friend.id,
      });
      if (response.status === 200) {
        toast.success("Friend Added");
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  async function handleDecline(friend: friend) {
    try {
      const response = await axios.put("/api/friends/decline", {
        friendId: friend.id,
      });
      if (response.status === 200) {
        toast.success("Friend Request Declined");
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Friend Requests</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          {friends && friends.length > 0 ? (
            <div className="flex flex-col gap-y-4">
              {friends.map((friend) => {
                return (
                  <div
                    key={friend.id}
                    className="flex items-center gap-x-2"
                  >
                    <Avatar user={friend} />
                    <h2>{friend.name}</h2>
                    <div className="ml-auto flex gap-x-4">
                      <Button
                        variant="blue"
                        onClick={() => handleAccept(friend)}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => handleDecline(friend)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <h2>No friend requests</h2>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FriendRequestModal;

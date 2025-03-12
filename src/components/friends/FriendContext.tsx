import { friend } from "@/types";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import axios from "axios";
import toast from "react-hot-toast";

interface FriendContextProps {
  children: React.ReactNode;
  friend: friend;
}

const FriendContext = ({ children, friend }: FriendContextProps) => {
  async function handleRemove() {
    try {
      const response = await axios.delete("/api/friends/", {
        data: {
          friendId: friend.id,
        },
      });
      if (response.status === 200) {
        toast.success("Friend removed");
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          className="text-red-800 focus:text-red-900 cursor-pointer"
          onClick={handleRemove}
        >
          Remove
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FriendContext;

import { friend } from "@/types";

import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface FriendModalProps {
  children: React.ReactNode;
  friend: friend;
}

const FriendModal = ({ children, friend }: FriendModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogHeader>
        <DialogTitle>{friend.image}</DialogTitle>
        {/* <DialogTitle>{friend.name}</DialogTitle> */}
      </DialogHeader>
    </Dialog>
  );
};

export default FriendModal;

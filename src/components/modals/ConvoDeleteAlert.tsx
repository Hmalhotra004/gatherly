"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button";

interface ConvoDeleteAlertProps {
  children: React.ReactNode;
}

const ConvoDeleteAlert = ({ children }: ConvoDeleteAlertProps) => {
  const [loading, setLoading] = useState(false);
  const { conversationId } = useConversation();
  const router = useRouter();

  async function onDelete() {
    setLoading(true);
    try {
      const response = await axios.delete(
        `/api/conversations/${conversationId}`,
        {
          data: {
            conversationId,
          },
        }
      );
      if (response.status === 200) {
        router.push(`/conversations`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          <AlertDialogHeader className="flex items-center gap-2 flex-row">
            <div>
              <TriangleAlert className="h-6 w-6 text-red-600 flex" />
            </div>
            <h2 className="pb-[6px]">Delete Conversation</h2>
          </AlertDialogHeader>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm text-gray-500">
          Are you sure you want to delete this conversation? <br />
          This action cannot be undone.
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            danger
            onClick={onDelete}
            disabled={loading}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConvoDeleteAlert;

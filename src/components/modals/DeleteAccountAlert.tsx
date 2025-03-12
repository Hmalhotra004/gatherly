"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { TriangleAlert } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

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

const DeleteAccountAlert = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onDelete() {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/settings`);
      if (response.status === 200) {
        signOut();
        router.push(`/log-in`);
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
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          <AlertDialogHeader className="flex items-center gap-2 flex-row">
            <div>
              <TriangleAlert className="h-6 w-6 text-red-600 flex" />
            </div>
            <h2 className="pb-[6px]">Delete Account</h2>
          </AlertDialogHeader>
        </AlertDialogTitle>
        <AlertDialogDescription className="text-sm text-gray-500">
          Are you sure you want to delete your Account <br />
          <span className="font-bold">This action is Permanent</span>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
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

export default DeleteAccountAlert;

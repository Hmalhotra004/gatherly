"use client";
import AuthInput from "@/components/auth/AuthInput";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import axios from "axios";
import { Clipboard, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SettingsModalProps {
  currentUser: User;
  children: React.ReactNode;
}

const SettingsModal = ({ currentUser, children }: SettingsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(currentUser.name || "");
  const router = useRouter();

  const username = `${currentUser.name}#${currentUser.discriminator}`;

  const handleModalClose = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) {
      setName(currentUser.name || "");
      setIsEditingName(false);
    }
  };

  function handleCopy() {
    navigator.clipboard.writeText(username);
    toast.success("copied to clipboard");
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const updatedName = name.trim();
      if (!updatedName) {
        toast.error("Name cannot be empty");
        return;
      }

      const response = await axios.patch(`/api/settings`, {
        name: updatedName,
      });

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setIsEditingName(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleModalClose}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-gray-900">Profile</DialogTitle>
          <DialogDescription className="mt-1 text-gray-600">
            Edit your public information.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-1">
            <p>Name:</p>
            <div>
              {!isEditingName ? (
                <div className="flex items-center">
                  <h2 className="font-semibold">{username}</h2>
                  <div className="flex items-center gap-x-2 ml-auto">
                    <Clipboard
                      className="w-5 h-5 cursor-pointer hover:text-gray-500"
                      onClick={handleCopy}
                    />
                    <Edit
                      className="w-5 h-5 cursor-pointer hover:text-gray-500"
                      onClick={() => setIsEditingName(true)}
                    />
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex gap-x-2"
                >
                  <AuthInput
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    variant="blue"
                    className="ml-auto"
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;

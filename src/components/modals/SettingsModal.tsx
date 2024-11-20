"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import AuthInput from "../auth/AuthInput";
import AuthLabel from "../auth/AuthLabel";
import Button from "../Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import ProfileImageModal from "./ProfileImageModal";

interface SettingsModalProps {
  currentUser: User;
  children: React.ReactNode;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot be more than 50 characters"),
  image: z.any(),
});

const SettingsModal = ({ currentUser, children }: SettingsModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: currentUser?.image || "",
      name: currentUser?.name || "",
    },
  });

  const image = form.watch("image");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.patch(`/api/settings`, values);
      if (response.status === 200) {
        router.refresh();
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="space-y-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="border-b border-gray-900/10 pb-12">
                <DialogTitle className="">
                  <DialogHeader className="text-gray-900">Profile</DialogHeader>
                  <DialogDescription className="mt-1 text-gray-600">
                    Edit your public information.
                  </DialogDescription>
                </DialogTitle>
                <div className="mt-10 flex flex-col gap-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <AuthLabel
                          id="name"
                          field={field}
                          fieldState={fieldState}
                        >
                          Name
                        </AuthLabel>
                        <FormControl>
                          <AuthInput
                            field={field}
                            fieldState={fieldState}
                            disabled={isLoading}
                            id="name"
                            type="text"
                          />
                        </FormControl>
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      </FormItem>
                    )}
                  />
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Photo
                    </label>
                    <div className="mt-2 flex items-center gap-x-3">
                      <Image
                        alt="photo"
                        width={48}
                        height={48}
                        className="rounded-full"
                        src={image || currentUser?.image || "/placeholder.jpeg"}
                      />

                      <ProfileImageModal>
                        <Button
                          disabled={isLoading}
                          secondary
                          type="button"
                        >
                          Change
                        </Button>
                      </ProfileImageModal>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Button
                  disabled={isLoading}
                  secondary
                  type="button"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  type="submit"
                  // onClick={(e) => stopPropagation()}
                >
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;

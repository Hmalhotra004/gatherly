import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { friend } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import z from "zod";
import AuthInput from "../auth/AuthInput";
import AuthLabel from "../auth/AuthLabel";
import Button from "../Button";
import SelectBox from "../conversations/SelectBox";

interface MakeGroupModalProps {
  children: React.ReactNode;
  users: friend[];
}

const formSchema = z.object({
  name: z.string().min(1),
  members: z.any(),
});

const MakeGroupModal = ({ children, users }: MakeGroupModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = form.watch("members");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/conversations", {
        ...values,
        isGroup: true,
      });
      if (response.status === 200) {
        router.refresh();
        setOpen(false);
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
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12">
                <DialogTitle>
                  <DialogHeader className="font-semibold text-gray-900">
                    Create a group chat
                  </DialogHeader>
                  <DialogDescription className="mt-1 text-gray-600">
                    Start a new group chat with your friends.
                  </DialogDescription>
                </DialogTitle>
                <div className="mt-10 flex flex-col gap-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <AuthLabel
                          field={field}
                          fieldState={fieldState}
                          id="name"
                        >
                          Name
                        </AuthLabel>
                        <FormControl>
                          <AuthInput
                            field={field}
                            fieldState={fieldState}
                            id="name"
                            type="text"
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="members"
                    render={({ field, fieldState }) => (
                      <FormItem>
                        <AuthLabel
                          field={field}
                          fieldState={fieldState}
                          id="members"
                        >
                          Members
                        </AuthLabel>
                        <FormControl>
                          <SelectBox
                            disabled={isLoading}
                            options={users.map((user) => ({
                              value: user.id,
                              label: user.name,
                            }))}
                            onChange={(value) =>
                              form.setValue("members", value, {
                                shouldValidate: true,
                              })
                            }
                            value={members}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <DialogClose>Cancel</DialogClose>
              <Button
                type="submit"
                disabled={isLoading}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MakeGroupModal;

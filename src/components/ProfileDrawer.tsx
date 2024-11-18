"use client";

import useOtherUser from "@/hooks/useOtherUser";
// import { Dialog, Transition } from "@headlessui/react";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useMemo } from "react";
import Avatar from "./Avatar";
import ConvoDeleteAlert from "./modals/ConvoDeleteAlert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

interface ProfileDrawerProps {
  data: Conversation & {
    users: User[];
  };
  children: React.ReactNode;
}

const ProfileDrawer = ({ data, children }: ProfileDrawerProps) => {
  const otherUser = useOtherUser(data);

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [otherUser, data]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }
    return `Active`;
  }, [data]);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="max-w-md flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
        <div className="relative mt-6 flex-1 px-4 sm:px-6">
          <div className="flex flex-col items-center">
            <SheetHeader>
              <SheetTitle>
                <div className="mb-2">
                  <Avatar user={otherUser} />
                </div>
              </SheetTitle>
            </SheetHeader>
            <div>{title}</div>
            <div className="text-sm text-gray-500">{statusText}</div>
            <div className="flex gap-10 my-8">
              <ConvoDeleteAlert>
                <div
                  onClick={() => {}}
                  className="flex flex-col gap-3 items-center cursor-pointer hover:opacity-75"
                >
                  <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                    <Trash2 size={20} />
                  </div>
                  <div className="text-sm font-light text-neutral-600">
                    Delete
                  </div>
                </div>
              </ConvoDeleteAlert>
            </div>
            <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
              <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
                {!data.isGroup && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Email
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      {otherUser.email}
                    </dd>
                  </div>
                )}
                {!data.isGroup && (
                  <>
                    <hr />
                    <div>
                      <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                        Joined
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        <time dateTime={joinedDate}>{joinedDate}</time>
                      </dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileDrawer;

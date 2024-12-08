import Avatar from "@/components/avatar/Avatar";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ImageModal from "../modals/ImageModal";
import MessageContext from "./MessageContext";

interface MessageBoxProps {
  isLast?: boolean;
  data: FullMessageType;
}

const MessagesBox = ({ isLast, data }: MessageBoxProps) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const container = cn("flex gap-3 p-4", isOwn && "justify-end");

  const avatar = cn(isOwn && "order-2");

  const body = cn("flex flex-col gap-2", isOwn && "items-end");

  const message = cn(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.deleted
      ? "rounded-full py-2 px-3 italic font-semibold"
      : data.image
      ? "rounded-md p-0"
      : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
        </div>

        <MessageContext
          data={data}
          isOwn={isOwn}
        >
          {!data.deleted ? (
            <div className={message}>
              {data.image && (
                <ImageModal src={data.image}>
                  <Image
                    alt="image"
                    width="200"
                    height="200"
                    src={data.image}
                    className="object-cover cursor-pointer hover:scale-110 transition translate"
                  />
                </ImageModal>
              )}
              {data.body && <div>{data.body}</div>}
            </div>
          ) : (
            <p className={message}>This message was deleted.</p>
          )}
        </MessageContext>

        <div className="text-[11px] font-light text-gray-500 -translate-y-1 flex items-center gap-x-2">
          {data.body && data.edited && <p className="pb-[1px]">Edited</p>}
          {format(new Date(data.createdAt), "p")}
        </div>

        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs font-light text-gray-500">
            {`Seen by ${seenList}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesBox;

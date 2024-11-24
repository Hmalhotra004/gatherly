import { friend } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Avatar from "../avatar/Avatar";
interface FriendBoxProps {
  data: friend;
}

const FriendBox = ({ data }: FriendBoxProps) => {
  const router = useRouter();

  async function handleClick() {
    try {
      const response = await axios.post(`/api/conversations`, {
        userId: data.id,
      });

      if (response.status === 200) {
        router.push(`/conversations/${response.data.id}`);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      toast.error("Something went wrong");
    }
  }

  return (
    <div
      onClick={handleClick}
      className="w-full flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer group"
    >
      <Avatar user={data} />
      <div className="flex justify-end items-center mb-1">
        <p className="text-sm font-medium text-gray-900">{data.name}</p>
        {/* <FriendModal friend={data}>
          <Ellipsis
            className="group-hover:block hidden transition text-gray-800 ml-auto"
            onClick={(e) => e.stopPropagation()}
          />
        </FriendModal> */}
      </div>
    </div>
  );
};

export default FriendBox;

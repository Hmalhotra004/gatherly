"use client";
import { friend } from "@/types";
import AddFriendBox from "./AddFriendBox";
import UserBox from "./UserBox";

interface UserListProps {
  items: friend[];
}

const UserList = ({ items }: UserListProps) => {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 flex overflow-y-auto border-r border-gray-200 w-full left-0 flex-col">
      <div className="px-5 flex-grow">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Friends
          </div>
        </div>
        {items.length >= 1 ? (
          <div>
            {items.map((item) => (
              <UserBox
                key={item.id}
                data={item}
              />
            ))}
          </div>
        ) : (
          <h2>Maybe add a friend</h2>
        )}
      </div>
      <AddFriendBox />
    </aside>
  );
};

export default UserList;

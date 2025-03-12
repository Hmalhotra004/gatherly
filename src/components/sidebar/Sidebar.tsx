"use client";
import { useGetCurrentUser } from "@/lib/fetch";
import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";

const Sidebar = () => {
  const data = useGetCurrentUser();

  const user = data.data;

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user!} />
      <MobileFooter />
    </div>
  );
};

export default Sidebar;

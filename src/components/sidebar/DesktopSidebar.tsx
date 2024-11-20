"use client";

import Avatar from "@/components/Avatar";
import useRoutes from "@/hooks/useRoutes";
import { User } from "@prisma/client";
import ActionTooltip from "../ActionTootip";
import SettingsModal from "../modals/SettingsModal";
import ModeToggle from "../ModeToggle";
import DesktopItem from "./DesktopItem";

interface DestopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DestopSidebarProps) => {
  const routes = useRoutes();

  return (
    <div
      className={`hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 
    lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 
    lg:flex lg:flex-col justify-between`}
    >
      <nav className="mt-4 flex flex-col justify-between">
        <ul
          role="list"
          className="flex flex-col items-center space-y-1"
        >
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center gap-y-4">
        <ActionTooltip
          label="Theme Toggle"
          side="right"
          align="center"
        >
          <div>
            <ModeToggle />
          </div>
        </ActionTooltip>
        <SettingsModal currentUser={currentUser}>
          <div>
            <ActionTooltip
              label="Profile"
              side="right"
              align="center"
            >
              <div className="cursor-pointer hover:opacity-75 transition">
                <Avatar user={currentUser} />
              </div>
            </ActionTooltip>
          </div>
        </SettingsModal>
      </nav>
    </div>
  );
};

export default DesktopSidebar;

"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";
import ActionTooltip from "../ActionTootip";

interface DesktopItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) => {
  function handleClick() {
    if (onClick) return onClick();
  }

  return (
    <ActionTooltip
      label={label}
      side="right"
      align="center"
    >
      <li onClick={handleClick}>
        <Link
          href={href}
          className={cn(
            `group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100`,
            active && "text-black bg-gray-100"
          )}
        >
          <Icon className="h-6 w-6 shrink-0" />
          <span className="sr-only">{label}</span>
        </Link>
      </li>
    </ActionTooltip>
  );
};

export default DesktopItem;

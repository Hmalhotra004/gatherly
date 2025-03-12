"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { IconType } from "react-icons";

interface MobileItemProps {
  label: string;
  icon: IconType;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const MobileItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: MobileItemProps) => {
  function handleClick() {
    if (onClick) return onClick();
  }
  return (
    <Link
      href={href}
      className={cn(
        `group flex gap-x-3 text-sm leading-6 w-full font-semibold justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100`,
        active && "text-black bg-gray-100"
      )}
      onClick={handleClick}
    >
      <Icon className="h-6 w-6" />
      <p className="sr-only">{label}</p>
    </Link>
  );
};

export default MobileItem;

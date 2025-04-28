"use client";

import Image from "next/image";
import { adminSideBarLinks } from "@/constant";
import Link from "next/link";
import { cn, getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import config from "@/lib/config";
import { motion } from "framer-motion";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();

  return (
    <motion.div
      className="admin-sidebar bg-dark-300"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}>
      <div>
        <motion.div
          className="logo"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}>
          <Image
            src="/icons/admin/logo.svg"
            alt="logo"
            height={37}
            width={37}
          />
          <h1>{config.project.name}</h1>
        </motion.div>

        <div className="mt-5 flex flex-col gap-3">
            {adminSideBarLinks.map((link) => {
              const isSelected =
                (link.route !== "/admin" &&
                  pathname.includes(link.route) &&
                  link.route.length > 1) ||
                pathname === link.route;

              return (
                <Link href={link.route} key={link.route}>
                  <motion.div
                    className={cn(
                      "link",
                      "transition-all duration-200 ease-in-out",
                      isSelected && "bg-primary-admin shadow-xs",
                    )}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}>
                    <div className="relative size-7 ">
                      <Image
                        src={link.img}
                        alt="icon"
                        fill
                        className={cn(
                          "object-contain transition-all duration-200",
                          isSelected
                            ? "brightness-0 invert"
                            : "hover:brightness-0 hover:invert",
                        )}
                      />
                    </div>

                    <p
                      className={cn(
                        " duration-200 text-xl font-semibold",
                        isSelected ? "text-white" : "text-[#8c8e98]",
                      )}>
                      {link.text}
                    </p>
                  </motion.div>
                </Link>
              );
            })}
        </div>
      </div>

      <motion.div
        className="user items-center cursor-pointer"
        // whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.25 }}>
        <Avatar className="size-9">
          <AvatarFallback className="bg-gray-400 transition-colors duration-200">
            {getInitials(session?.user?.name || "IN")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
          <p className="font-semibold text-lg text-light-200">
            {session?.user?.name}
          </p>
          <p className="text-xs text-light-500">{session?.user?.email}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Sidebar;

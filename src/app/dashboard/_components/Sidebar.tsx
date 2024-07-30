"use client";
import Image from "next/image";
import LogoutButton from "../core-components/LogoutButton";
import CreateTaskButton from "../core-components/CreateTaskButton";
import { useAuth } from "@/providers/AuthContext";

const navItems = [
  {
    name: "Home",
    icon: "/images/home.png",
    alt: "home",
  },
  {
    name: "Boards",
    icon: "/images/boards.png",
    alt: "boards",
  },
  {
    name: "Settings",
    icon: "/images/settings.png",
    alt: "settings",
  },
  {
    name: "Teams",
    icon: "/images/teams.png",
    alt: "teams",
  },
  {
    name: "Analytics",
    icon: "/images/analytics.png",
    alt: "analytics",
  },
];

const Sidebar = () => {
  const { username, email } = useAuth();

  return (
    <div className="px-[15px] w-[285px] h-screen bg-white flex flex-col justify-between  ">
      {/* Top Element */}
      <div className="space-y-6">
        {/* User Profile Section */}
        <div>
          <div className="flex items-center gap-6 pt-[24px] mb-[14px]">
            <Image
              src="/images/man.png"
              alt="logo"
              width={31}
              height={31}
              className="rounded-md"
            />
            <span className="font-[500] text-[20px]">{username}</span>
          </div>
          <div className="flex justify-between">
            <div className="flex gap-x-[20px] items-center">
              <Image
                src={"/images/bell.png"}
                alt="bell"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <Image
                src={"/images/sun.png"}
                alt="bell"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
              <Image
                src={"/images/arrow.png"}
                alt="bell"
                width={24}
                height={24}
                className="w-[24px] h-[24px]"
              />
            </div>
            <LogoutButton />
          </div>
        </div>
        {/* NavItems Section */}
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-start flex-col gap-x-4 gap-y-4 ">
            {navItems.map((item) => (
              <div key={item.name} className="flex items-center gap-x-4">
                <Image
                  src={item.icon}
                  alt={item.alt}
                  width={24}
                  height={24}
                  className="w-[24px] h-[24px]"
                />
                <span className="font-[500] text-[16px]">{item.name}</span>
              </div>
            ))}
          </div>
          <CreateTaskButton buttonText="Create new Task" />
        </div>
      </div>
      {/* End Element */}
      <div className="flex items-center mt-6 gap-x-4 bg-[#F3F3F3] px-1 py-3 rounded-md border-[1px] border-gray-200 mb-8">
        <Image
          src={"/images/download.png"}
          alt="line"
          width={40}
          height={40}
          className="w-[40px] h-[40px]"
        />
        <div className="text-[#666666] ">
          <div className="text-[20px] font-500 "> Download the app</div>
          <div className="text-[14px] font-400 "> Get the full experience </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

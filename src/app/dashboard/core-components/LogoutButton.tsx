"use client";

import { useAuth } from "@/providers/AuthContext";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth();

  return (
    <div>
      <button
        onClick={logout}
        className="bg-[#F4F4F4] text-[16px] font-[400] p-2  rounded-md  "
      >
        Logout
      </button>
    </div>
  );
};

export default LogoutButton;

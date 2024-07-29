"use client";
import Image from "next/image";

interface IButtonProps {
  onClick?: () => void;
}

const AddNewButton = ({ onClick }: IButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center w-[380px] h-[40px] bg-gradient-to-b from-[#3A3A3A] to-[#202020] rounded-md text-white justify-between p-[8px] "
    >
      <div> Add New </div>
      <Image
        src="/images/add.png"
        alt="addicon"
        width={24}
        height={24}
        className="w-[24px] h-[24px] "
      />
    </button>
  );
};

export default AddNewButton;

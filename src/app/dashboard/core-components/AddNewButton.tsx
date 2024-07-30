"use client";
import Image from "next/image";

interface IButtonProps {
  onButtonClick?: () => void;
}

const AddNewButton = ({ onButtonClick }: IButtonProps) => {
  return (
    <button
      onClick={onButtonClick}
      className="flex items-center w-[340px] h-[40px] bg-gradient-to-b from-[#3A3A3A] to-[#202020] rounded-md text-white justify-between p-[8px] "
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

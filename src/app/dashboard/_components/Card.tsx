import { ITaskInterface } from "@/schema/task.schema";
import Image from "next/image";

interface cardData {
  cardData?: ITaskInterface;
}

const Card: React.FC = ({ cardData }: cardData) => {
  return (
    <div className="bg-[#F9F9F9] w-[380px] px-4 py-4 border-[1px] border-[#DEDEDE] space-y-4 rounded-lg shadow-md">
      <div className="space-y-4">
        <div className=" text-[16px] font-[500] text-[#606060] ">
          {cardData?.title || "Implement User Authentication "}
        </div>
        <div className="text-[14px] font-[400] text-[#797979] ">
          {cardData?.description ||
            "Develop and integrate user authentication using email and password."}
        </div>
      </div>
      <div
        className={`  text-[12px] font-[400] text-white  px-2 py-1 w-[55px] h-[27px] rounded-[8px] ${"bg-[#FF6B6B]"} `}
      >
        {cardData?.priority || "Urgent"}
      </div>
      <div className="flex items-center gap-x-2">
        <Image
          src={"/images/clock.png"}
          alt="clock"
          width={24}
          height={24}
          className="w-[24px] h-[24px] "
        />
        <span className="text-[14px] font-[600] text-[#606060]">
          {cardData?.deadline || "2 days left"}
        </span>
      </div>
      <div className="text-[14px] font-[500] text-[#797979]">
        {cardData?.time || "1 hrs ago"}
      </div>
    </div>
  );
};

export default Card;

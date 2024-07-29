import Image from "next/image";

const cartItems = [
  {
    title: "Introducing tags",
    desc: "Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.",
    image: "/images/cardOne.png",
  },
  {
    title: "Share Notes Instantly",
    desc: "Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.",
    image: "/images/cardTwo.png",
  },
  {
    title: "Access Anywhere",
    desc: "Sync your notes across all devices. Stay productive whether you're on your phone, tablet, or computer.",
    image: "/images/cardThree.png",
  },
];

const Hero = () => {
  return (
    <div className="space-y-4">
      {/* Welcome */}
      <div className="flex flex-row w-[1570px] justify-between">
        <div className="text-[48px] font-[600]"> Good morning, Sabeen </div>
        <div className="flex items-center gap-x-2">
          <span> Help & feedback</span>
          <Image
            src={"/images/question.png"}
            alt="question"
            width={24}
            height={24}
            className="w-[24px] h-[24px]"
          />
        </div>
      </div>

      {/* Cards */}

      <div className="grid grid-cols-3 gap-x-4">
        {cartItems.map((item, index) => (
          <div
            className="flex flex-row gap-x-2 py-8 px-4 bg-white rounded-md border-[1px] border-gray-200 shadow-lg"
            key={index}
          >
            <Image
              src={item.image}
              alt="cardImage"
              width={77}
              height={61}
              className="w-[77px] h-[61px]"
            />
            <div>
              <div className="text-[16px] font-[600] text-[#757575]">
                {item.title}
              </div>
              <div className="text-[14px] font-[400] text-[#868686]">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;

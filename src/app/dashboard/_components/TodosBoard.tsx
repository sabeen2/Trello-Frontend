import AddNewButton from "../core-components/AddNewButton";
import Card from "./Card";
import SectionSkeleton from "./SectionSkeleton";

const TodosBoard = () => {
  return (
    <div className="bg-white  h-[650px] w-[full] border-[1px] border-gray-200 shadow-lg px-4 py-4">
      {/* <AddNewButton /> */}
      {/* <Card /> */}
      <SectionSkeleton />
    </div>
  );
};

export default TodosBoard;

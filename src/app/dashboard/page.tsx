import React from "react";
import Hero from "./_components/Hero";
import Midsection from "./_components/Midsection";
import TodosBoard from "./_components/TodosBoard";

const Dashboard = () => {
  return (
    <div className="mx-8">
      <Hero />
      <Midsection />
      <TodosBoard />
    </div>
  );
};

export default Dashboard;

"use client";
import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const DndContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <DndProvider backend={HTML5Backend}>{children}</DndProvider>;
};

export default DndContext;

import { Inter } from "next/font/google";
import Sidebar from "./_components/Sidebar";
import DndContext from "./dnd-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <DndContext>{children}</DndContext>
    </div>
  );
}

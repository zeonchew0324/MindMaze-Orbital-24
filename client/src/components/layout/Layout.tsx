import React, { ReactNode } from "react";
import Navbar from "../navBar/NavBar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-screen w-[99vw]">
      <Navbar />
      <main className="w-full h-full mt-[200px] mb-0">{children}</main>
    </div>
  );
};

export default Layout;

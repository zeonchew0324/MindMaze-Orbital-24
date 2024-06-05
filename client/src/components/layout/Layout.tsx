import React, { ReactNode } from 'react';
import Navbar from '../navBar/NavBar';

// Define the props type for the Layout component
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
};

export default Layout;

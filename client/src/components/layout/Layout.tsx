import React, { ReactNode } from 'react';
import Navbar from '../navBar/NavBar';

// Define the props type for the Layout component
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-screen w-[99vw]'>
      <Navbar />
      <main className='w-full h-full mt-[150px] mb-0'>
        {children}
      </main>
    </div>
  );
};

export default Layout;

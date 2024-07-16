import React, { ReactNode } from 'react';
import Navbar from '../navBar/NavBar';

// Define the props type for the Layout component
interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='h-svh w-svw'>
      <Navbar />
      <main className='w-full h-full mt-[150px]'>
        {children}
      </main>
    </div>
  );
};

export default Layout;

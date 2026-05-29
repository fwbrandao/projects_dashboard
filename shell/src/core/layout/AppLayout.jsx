import React from 'react';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const AppLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopNav />
      <main className="ml-72 pt-28 px-12 pb-20">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};

export default AppLayout;

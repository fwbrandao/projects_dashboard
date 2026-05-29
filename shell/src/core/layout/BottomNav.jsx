import React from 'react';

const BottomNav = () => {
  return (
    <footer className="fixed bottom-0 right-0 w-[calc(100%-18rem)] h-10 px-8 flex items-center justify-end z-50 bg-slate-900/60 backdrop-blur-lg border-t border-white/5 shadow-[0_-10px_30px_-15px_rgba(255,81,250,0.1)]">
      <div className="flex items-center gap-3 animate-pulse">
        <span className="w-2 h-2 rounded-full bg-fuchsia-500 shadow-[0_0_8px_#ff51fa]"></span>
        <span className="text-[10px] font-bold text-fuchsia-300 uppercase tracking-widest font-label">
          System Status: Active
        </span>
      </div>
      <div className="ml-6 flex items-center gap-4 border-l border-white/10 pl-6">
        <span className="material-symbols-outlined text-sm text-indigo-400">info</span>
        <span className="text-[10px] text-indigo-400 font-label uppercase tracking-widest">
          Protocol 12-X Engaged
        </span>
      </div>
    </footer>
  );
};

export default BottomNav;

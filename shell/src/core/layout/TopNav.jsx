import React from 'react';

const TopNav = () => {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-18rem)] h-20 px-12 flex justify-between items-center z-40 bg-slate-950/30 backdrop-blur-xl">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-indigo-300/50 group-focus-within:text-cyan-400 transition-colors">
            search
          </span>
          <input
            className="w-full bg-surface-container-lowest/50 border-none rounded-full py-2.5 pl-12 pr-6 text-sm focus:ring-1 focus:ring-cyan-500/50 focus:shadow-[inset_0_0_8px_rgba(0,245,245,0.4)] placeholder-indigo-300/30 text-on-surface outline-none"
            placeholder="Search systems, models, or datasets..."
            type="text"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6 ml-8">
        <div className="flex items-center gap-2">
          <button className="p-2 text-indigo-300/50 hover:text-cyan-200 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="p-2 text-indigo-300/50 hover:text-cyan-200 transition-colors">
            <span className="material-symbols-outlined">apps</span>
          </button>
        </div>
        <div className="h-8 w-[1px] bg-outline-variant/20"></div>
        <span className="text-lg font-black text-cyan-50 font-headline">ProjectOS</span>
      </div>
    </header>
  );
};

export default TopNav;

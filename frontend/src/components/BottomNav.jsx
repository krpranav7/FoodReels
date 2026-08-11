import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav = () => {
    return (
        <nav className='fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-120 h-12 z-50 flex items-center bg-black/35 backdrop-blur-[2px] text-white shadow-md border-white/15 border-t border-t-[--color-border]'>
            <div className='w-full mx-auto h-full grid grid-cols-2'>
                <NavLink to="/home" className={({isActive}) => `flex flex-col items-center justify-center no-underline gap-0.5 transition-all duration-200 ${isActive ? 'text-blue-500 hover:text-blue-400 hover:scale-105' : 'text-slate-400 hover:text-white hover:scale-105'}` }>
                    <span className="leading-0" aria-hidden="true">
                        {/* home icon */}
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 10.5 12 3l9 7.5"/>
                            <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
                        </svg>
                    </span>
                    <span className="text-xs">Home</span>
                </NavLink>
                <NavLink to="/saved" className={({ isActive }) => `flex flex-col items-center justify-center no-underline gap-0.5 transition-all duration-200 ${isActive ? 'text-blue-500 hover:text-blue-400 hover:scale-105' : 'text-slate-400 hover:text-white hover:scale-105'}`}>
                    <span className="leading-0" aria-hidden="true">
                        {/* bookmark icon */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
                        </svg>
                    </span>
                    <span className="text-xs">Saved</span>
                </NavLink>
            </div>
        </nav>
    );
}

export default BottomNav;
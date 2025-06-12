"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import StreakCounter from "./ui/streakCounter";
import CoinCounter from "./ui/coinCounter";
import { useUser } from "@/context/UserContext";
import Month from "./Month";

const Navbar: React.FC = () => {
    const { name, streak, coins, solvedDates } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className='bg-white shadow-sm sticky top-0 z-10'>
            <div className='md:w-11/12 mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between h-16'>
                    <div className='flex items-center'>
                        <Link href='/'>
                            <div className='flex-shrink-0 flex items-center cursor-pointer'>
                                <div className='bg-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center'>
                                    <span className='text-white font-bold'>CH</span>
                                </div>
                                <span className='ml-2 text-xl font-bold text-gray-800 hidden md:block'>CodersHub</span>
                            </div>
                        </Link>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <div
                            className='relative'
                            ref={dropdownRef}>
                            <div
                                onClick={() => setIsOpen((prev) => !prev)}
                                className='cursor-pointer'>
                                <StreakCounter streak={streak} />
                            </div>
                            {isOpen && (
                                <div className='absolute right-2/12 top-auto z-20 bg-white'>
                                    <Month
                                        monthStart={monthStart}
                                        solvedDates={solvedDates}
                                    />
                                </div>
                            )}
                        </div>

                        <Link href='/store'>
                            <CoinCounter coins={coins} />
                        </Link>

                        <Link href='/profile'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 cursor-pointer hover:scale-105 transition-allduration-300'>
                                <div className='bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center'>
                                    <span className='text-white font-bold'>{name[0].toUpperCase()}</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

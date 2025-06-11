"use client";

import React from "react";
import Link from "next/link";
import StreakCounter from "./ui/StreakCounter";
import CoinCounter from "./ui/CoinCounter";

const Navbar: React.FC = () => {
    const streak = 7;
    const coins = 150;

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
                        <Link href='/'>
                            <StreakCounter streak={streak} />
                        </Link>

                        <Link href='/store'>
                            <CoinCounter coins={coins} />
                        </Link>

                        <Link href='/profile'>
                            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 cursor-pointer hover:scale-105'>
                                <div className='bg-indigo-500 w-8 h-8 rounded-full flex items-center justify-center'>
                                    <span className='text-white font-bold'>R</span>
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

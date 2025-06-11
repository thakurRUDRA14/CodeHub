"use client";

import React from "react";
import { useUser } from "../../context/UserContext";
import CalendarView from "../../components/CalendarView";
import { format } from "date-fns";

const ProfilePage: React.FC = () => {
    const { name, joinedDate, streak, coins, solvedQuestions, lastSolvedDate } = useUser();
    const solvedDates = new Set<string>();
    if (lastSolvedDate) {
        solvedDates.add(lastSolvedDate);
    }

    const today = new Date();
    for (let i = 0; i < 100; i++) {
        const randomDay = new Date();
        randomDay.setDate(today.getDate() - Math.floor(Math.random() * 365));
        solvedDates.add(randomDay.toISOString().split("T")[0]);
    }

    return (
        <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex items-center mb-6'>
                    <div className='bg-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mr-4'>
                        <span className='text-white text-2xl font-bold'>{name[0].toUpperCase()}</span>
                    </div>
                    <div>
                        <h1 className='text-2xl font-bold text-gray-900'>{name}</h1>
                        <p className='text-gray-600'>Joined {format(new Date(joinedDate), "MMMM yyyy")}</p>
                    </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
                    <div className='bg-indigo-50 p-4 rounded-lg'>
                        <div className='text-sm text-indigo-700 font-medium'>Total Solved</div>
                        <div className='text-2xl font-bold text-indigo-900'>{solvedQuestions.size} problems</div>
                    </div>
                    <div className='bg-orange-50 p-4 rounded-lg'>
                        <div className='text-sm text-orange-700 font-medium'>Current Streak</div>
                        <div className='text-2xl font-bold text-orange-900 flex items-center'>
                            {streak} days
                            <span className='ml-2'>🔥</span>
                        </div>
                    </div>
                    <div className='bg-amber-50 p-4 rounded-lg'>
                        <div className='text-sm text-amber-700 font-medium'>Total Coins</div>
                        <div className='text-2xl font-bold text-amber-900 flex items-center'>
                            {coins}
                            <span className='ml-2'>🪙</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>Consistency Calendar</h2>
                <CalendarView solvedDates={solvedDates} />
            </div>
        </div>
    );
};

export default ProfilePage;

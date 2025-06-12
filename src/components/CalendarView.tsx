import React, { useState, useEffect } from "react";
import Month from "./ui/month";

interface CalendarViewProps {
    solvedDates: Map<string, number>;
}

const CalendarView: React.FC<CalendarViewProps> = ({ solvedDates }) => {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [months, setMonths] = useState<Date[]>([]);

    useEffect(() => {
        const monthsArray = [];
        for (let i = 0; i < 12; i++) {
            monthsArray.push(new Date(currentYear, i, 1));
        }
        setMonths(monthsArray);
    }, [currentYear]);

    return (
        <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center'>
            <h2 className='text-xl font-bold text-gray-800 mb-1'>{currentYear}</h2>

            <div className='flex justify-evenly gap-1 overflow-x-auto no-scrollbar'>
                {months.map((monthStart, idx) => (
                    <Month
                        key={idx}
                        monthStart={monthStart}
                        solvedDates={solvedDates}
                    />
                ))}
            </div>
            <div className='flex justify-between items-center mt-8'>
                <button
                    onClick={() => setCurrentYear((prev) => prev - 1)}
                    className='p-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200'>
                    &larr; Prev
                </button>
                <div className=' flex flex-wrap justify-center gap-4'>
                    <div className='flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200'>
                        <span className='text-xs mr-2 text-gray-600'>Less</span>
                        <div className='w-4 h-4 bg-gray-100 rounded-sm'></div>
                        <div className='w-4 h-4 bg-green-100 rounded-sm'></div>
                        <div className='w-4 h-4 bg-green-300 rounded-sm'></div>
                        <div className='w-4 h-4 bg-green-500 rounded-sm'></div>
                        <div className='w-4 h-4 bg-green-700 rounded-sm'></div>
                        <span className='text-xs ml-2 text-gray-600'>More</span>
                    </div>

                    <div className='flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200'>
                        <div className='w-4 h-4 bg-gray-100 rounded-sm mr-2'></div>
                        <span className='text-xs text-gray-600'>No submissions</span>
                    </div>

                    <div className='flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200'>
                        <div className='w-4 h-4 bg-white ring-2 ring-blue-500 rounded-sm mr-2'></div>
                        <span className='text-xs text-gray-600'>Today</span>
                    </div>
                </div>
                <button
                    onClick={() => setCurrentYear((prev) => prev + 1)}
                    className='p-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    disabled={currentYear >= new Date().getFullYear()}>
                    Next &rarr;
                </button>
            </div>
        </div>
    );
};

export default CalendarView;

import React, { useState, useEffect } from "react";
import { format, eachDayOfInterval, endOfMonth, eachWeekOfInterval, isSameMonth, isSameDay } from "date-fns";

interface CalendarViewProps {
    solvedDates: Set<string>;
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

    const getIntensity = (date: Date): number => {
        const dateStr = format(date, "yyyy-MM-dd");
        if (solvedDates.has(dateStr)) {
            return Math.floor(Math.random() * 4) + 1;
        }
        return 0;
    };

    const getColorClass = (intensity: number): string => {
        switch (intensity) {
            case 1:
                return "bg-green-100";
            case 2:
                return "bg-green-300";
            case 3:
                return "bg-green-500";
            case 4:
                return "bg-green-700";
            default:
                return "bg-gray-100";
        }
    };

    const getTextColor = (intensity: number): string => {
        return intensity > 2 ? "text-white" : "text-gray-800";
    };

    return (
        <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 text-center'>
            <h2 className='text-xl font-bold text-gray-800 mb-5'>{currentYear}</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 min-[97rem]:grid-cols-6 gap-3'>
                {months.map((monthStart, idx) => {
                    const monthName = format(monthStart, "MMMM");
                    const monthEnd = endOfMonth(monthStart);

                    const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 0 });

                    return (
                        <div
                            key={idx}
                            className='mb-4 min-w-[200px] shadow-sm rounded-lg p-3 border border-gray-200'>
                            <h3 className='text-lg font-semibold text-gray-800 mb-2'>{monthName}</h3>

                            <div className='flex justify-between mb-1'>
                                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                    <div
                                        key={day}
                                        className='text-xs text-gray-500 w-6 h-6 flex items-center justify-center font-medium'>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {weeks.map((weekStart, weekIdx) => {
                                const weekDays = eachDayOfInterval({
                                    start: weekStart,
                                    end: new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6),
                                });

                                return (
                                    <div
                                        key={weekIdx}
                                        className='flex justify-between mb-1'>
                                        {weekDays.map((day, dayIdx) => {
                                            const intensity = getIntensity(day);
                                            const colorClass = getColorClass(intensity);
                                            const textClass = getTextColor(intensity);
                                            const isCurrentMonth = isSameMonth(day, monthStart);
                                            const isToday = isSameDay(day, new Date());

                                            return (
                                                <div
                                                    key={`${weekIdx}-${dayIdx}`}
                                                    className={`w-6 h-6 rounded-sm flex items-center justify-center text-xs hover:scale-110 transition-transform ${
                                                        !isCurrentMonth ? "opacity-30" : "cursor-pointer"
                                                    } ${colorClass} ${textClass} ${isToday ? "ring-2 ring-blue-500 font-bold" : ""}`}
                                                    title={`${format(day, "MMM d, yyyy")} - ${intensity || "No"} submissions`}>
                                                    {isCurrentMonth ? day.getDate() : ""}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
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

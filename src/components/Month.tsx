import React from "react";
import { format, endOfMonth, eachWeekOfInterval, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";

interface Props {
    monthStart: Date;
    solvedDates: Map<string, number>;
}

const Month: React.FC<Props> = ({ monthStart, solvedDates }) => {
    const monthName = format(monthStart, "MMMM");
    const monthEnd = endOfMonth(monthStart);
    const weeks = eachWeekOfInterval({ start: monthStart, end: monthEnd }, { weekStartsOn: 0 });

    const getIntensity = (date: Date): number => {
        const dateStr = format(date, "yyyy-MM-dd");
        const count = solvedDates.get(dateStr) || 0;

        if (count === 0) return 0;
        if (count === 1) return 1;
        if (count <= 3) return 2;
        if (count <= 5) return 3;
        return 4;
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
        <div className='mb-4 min-w-[200px] shadow-sm rounded-lg p-3 border border-gray-200'>
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
};

export default Month;

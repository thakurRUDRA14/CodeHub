"use client";

export default function StreakCounter({ streak }: { streak: number }) {
    return (
        <div className='flex items-center space-x-1 bg-orange-100 px-3 py-1 rounded-full hover:scale-105'>
            <span className='text-orange-500'>{streak > 0 ? "🔥" : "❄️"}</span>
            <span className='font-medium text-orange-800'>{streak}</span>
        </div>
    );
}

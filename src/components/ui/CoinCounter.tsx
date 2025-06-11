"use client";

export default function CoinCounter({ coins }: { coins: number }) {
    return (
        <div className='flex items-center space-x-1 bg-amber-100 px-3 py-1 rounded-full hover:scale-105'>
            <span className='text-amber-500'>🪙</span>
            <span className='font-medium text-amber-800'>{coins}</span>
        </div>
    );
}

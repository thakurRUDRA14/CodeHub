"use client";

import React, { useState } from "react";
import { useUser } from "../../context/UserContext";
import StoreItemCard from "../../components/StoreItemCard";
import { storeItems } from "../../data/storeItems";

const StorePage: React.FC = () => {
    const { coins, redeemItem } = useUser();
    const [redeemedItem, setRedeemedItem] = useState<string | null>(null);

    const handleRedeem = (itemId: string, cost: number) => {
        const success = redeemItem(cost);
        if (success) {
            setRedeemedItem(itemId);
            setTimeout(() => setRedeemedItem(null), 3000);
        }
    };

    return (
        <div className='space-y-6'>
            <div className='bg-white p-6 rounded-xl shadow-md'>
                <div className='flex justify-between items-center mb-6'>
                    <div>
                        <h1 className='text-3xl sm:text-5xl font-bold text-gray-900'>Reward Store</h1>
                        <p className='text-gray-600'>Redeem your coins for exclusive rewards</p>
                    </div>
                    <div className='bg-amber-100 px-4 py-2 rounded-full flex items-center min-w-20'>
                        <span className='text-amber-800 font-bold sm:text-lg'>🪙 {coins}</span>
                    </div>
                </div>

                {redeemedItem && (
                    <div className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6'>
                        <span className='font-bold'>Success! </span>
                        You've redeemed {storeItems.find((item) => item.id === redeemedItem)?.name}
                    </div>
                )}

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 xl:gap-16 lg:mx-10'>
                    {storeItems.map((item) => (
                        <StoreItemCard
                            key={item.id}
                            item={item}
                            onRedeem={handleRedeem}
                            coins={coins}
                        />
                    ))}
                </div>
            </div>

            <div className='bg-white p-6 rounded-xl shadow-md'>
                <h2 className='text-xl font-semibold text-gray-900 mb-4'>How to earn more coins</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='border border-gray-200 p-4 rounded-lg'>
                        <div className='text-indigo-600 font-bold text-lg mb-2'>Solve Problems</div>
                        <p>Each solved problem gives you 10 coins </p>
                    </div>
                    <div className='border border-gray-200 p-4 rounded-lg'>
                        <div className='text-indigo-600 font-bold text-lg mb-2'>Weekly Challenges</div>
                        <p>Complete weekly challenges for big coin rewards</p>
                    </div>
                    <div className='border border-gray-200 p-4 rounded-lg'>
                        <div className='text-indigo-600 font-bold text-lg mb-2'>Contest</div>
                        <p>Earn bonus coins by giving weekly contests.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorePage;

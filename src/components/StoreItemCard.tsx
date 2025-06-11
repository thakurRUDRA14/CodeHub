import React from "react";
import Button from "./ui/button";
import Image from "next/image";
import { StoreItem } from "@/data/storeItems";

interface StoreItemCardProps {
    item: StoreItem;
    onRedeem: (itemId: string, cost: number) => void;
    coins: number;
}

const StoreItemCard: React.FC<StoreItemCardProps> = ({ item, onRedeem, coins }) => {
    const canRedeem = coins >= item.cost;

    return (
        <div className='p-4 flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden border border-gray-200'>
            <div className='relative w-full aspect-square overflow-hidden mb-4 hover:scale-[1.01] transition-all '>
                <Image
                    src={item.url || "/item.png"}
                    alt={item.alt || "Store Item Image"}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
            </div>
            <div className='flex justify-between align-middle'>
                <div>
                    <h3 className='font-medium text-gray-900 line-clamp-2'>{item.name}</h3>
                    <p className='text-sm text-gray-600 mb-4 flex-grow line-clamp-2'>{item.description}</p>
                </div>
                <span className='hover:scale-105 transition-all min-w-26'>
                    <Button
                        variant={"primary"}
                        onClick={() => canRedeem && onRedeem(item.id, item.cost)}
                        disabled={!canRedeem}>
                        {item.cost} 🪙
                    </Button>
                </span>
            </div>
        </div>
    );
};

export default StoreItemCard;

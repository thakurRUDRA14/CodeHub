"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
    name: string;
    joinedDate: string;
    streak: number;
    coins: number;
    solvedQuestions: Set<string>;
    lastSolvedDate: string | null;
    solvedDates: Map<string, number>;
    solveQuestion: (id: string) => void;
    redeemItem: (cost: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [name, setName] = useState("Coder");
    const [joinedDate, setJoinedDate] = useState(new Date().toISOString().split("T")[0]);
    const [isClient, setIsClient] = useState(false);
    const [streak, setStreak] = useState(0);
    const [coins, setCoins] = useState(0);
    const [solvedQuestions, setSolvedQuestions] = useState<Set<string>>(new Set());
    const [lastSolvedDate, setLastSolvedDate] = useState<string | null>(null);
    const [solvedDates, setSolvedDates] = useState<Map<string, number>>(new Map());

    useEffect(() => {
        setIsClient(true);

        setName(localStorage.getItem("name") || "Coder");
        setJoinedDate(localStorage.getItem("joinedDate") || new Date().toISOString().split("T")[0]);
        setStreak(parseInt(localStorage.getItem("streak") || "0"));
        setCoins(parseInt(localStorage.getItem("coins") || "100"));

        const solvedSet = localStorage.getItem("solvedQuestions");
        setSolvedQuestions(solvedSet ? new Set(JSON.parse(solvedSet)) : new Set());

        const dateCount = localStorage.getItem("solvedDates");
        setSolvedDates(dateCount ? new Map(JSON.parse(dateCount)) : new Map());

        setLastSolvedDate(localStorage.getItem("lastSolvedDate"));
    }, []);

    useEffect(() => {
        if (!isClient) return;
        localStorage.setItem("name", name);
        localStorage.setItem("joinedDate", joinedDate);
        localStorage.setItem("streak", streak.toString());
        localStorage.setItem("coins", coins.toString());
        localStorage.setItem("solvedQuestions", JSON.stringify([...solvedQuestions]));
        localStorage.setItem("solvedDates", JSON.stringify(Array.from(solvedDates.entries())));
        if (lastSolvedDate) localStorage.setItem("lastSolvedDate", lastSolvedDate);
    }, [name, joinedDate, streak, coins, solvedQuestions, solvedDates, lastSolvedDate, isClient]);

    const solveQuestion = (id: string) => {
        if (solvedQuestions.has(id)) return;

        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        let newStreak = streak;
        let shouldAddCoins = false;

        if (!lastSolvedDate) {
            newStreak = 1;
            shouldAddCoins = true;
        } else if (lastSolvedDate === yesterdayStr) {
            newStreak = streak + 1;
            shouldAddCoins = true;
        } else if (lastSolvedDate !== today) {
            newStreak = 1;
            shouldAddCoins = true;
        }

        setStreak(newStreak);
        if (shouldAddCoins) {
            setCoins((coins) => coins + 10);
        }

        setSolvedQuestions((prev) => new Set(prev).add(id));
        setLastSolvedDate(today);

        setSolvedDates((prev) => {
            const newMap = new Map(prev);
            newMap.set(today, (newMap.get(today) || 0) + 1);
            return newMap;
        });
    };

    const redeemItem = (cost: number) => {
        if (coins >= cost) {
            setCoins(coins - cost);
            return true;
        }
        return false;
    };

    return (
        <UserContext.Provider
            value={{
                name,
                joinedDate,
                streak,
                coins,
                solvedQuestions,
                lastSolvedDate,
                solvedDates,
                solveQuestion,
                redeemItem,
            }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};

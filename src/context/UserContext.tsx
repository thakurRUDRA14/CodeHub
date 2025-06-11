"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserContextType {
    name: string;
    joinedDate: string;
    streak: number;
    coins: number;
    solvedQuestions: Set<string>;
    lastSolvedDate: string | null;
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

    useEffect(() => {
        setIsClient(true);
        setName(() => {
            const saved = localStorage.getItem("name");
            return saved ? saved : "Coder";
        });
        setJoinedDate(() => {
            const saved = localStorage.getItem("lastSolvedDate");
            return saved ? saved : new Date().toISOString().split("T")[0];
        });
        setStreak(() => {
            const saved = localStorage.getItem("streak");
            return saved ? parseInt(saved) : 0;
        });
        setCoins(() => {
            const saved = localStorage.getItem("coins");
            return saved ? parseInt(saved) : 100;
        });
        setSolvedQuestions(() => {
            const saved = localStorage.getItem("solvedQuestions");
            return saved ? new Set(JSON.parse(saved)) : new Set();
        });
        setLastSolvedDate(() => {
            return localStorage.getItem("lastSolvedDate");
        });
    }, []);

    useEffect(() => {
        if (!isClient) return;
        localStorage.setItem("name", name);
        localStorage.setItem("joinedDate", joinedDate);
        localStorage.setItem("streak", streak.toString());
        localStorage.setItem("coins", coins.toString());
        localStorage.setItem("solvedQuestions", JSON.stringify([...solvedQuestions]));
        if (lastSolvedDate) localStorage.setItem("lastSolvedDate", lastSolvedDate);
    }, [streak, coins, solvedQuestions, lastSolvedDate, isClient]);

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

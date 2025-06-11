"use client";

import React from "react";
import { useUser } from "../context/UserContext";
import QuestionCard from "../components/QuestionCard";
import { questions } from "../data/questions";

const DashboardPage: React.FC = () => {
    const { solvedQuestions, solveQuestion } = useUser();

    return (
        <div className='bg-white p-6 rounded-xl shadow-md'>
            <h2 className='text-3xl sm:text-5xl font-semibold text-gray-900 mb-4'>Problems</h2>
            <div className='space-y-4'>
                {questions.map((question) => (
                    <QuestionCard
                        key={question.id}
                        question={question}
                        onSolve={solveQuestion}
                        isSolved={solvedQuestions.has(question.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DashboardPage;

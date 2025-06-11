"use client";

import React from "react";
import Button from "./ui/button";
import Badge from "./ui/badge";

interface Question {
    id: string;
    title: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    description: string;
}

interface QuestionCardProps {
    question: Question;
    onSolve: (id: string) => void;
    isSolved: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onSolve, isSolved }) => {
    return (
        <div className='bg-white hover:bg-gray-50 hover:shadow-lg rounded-xl shadow-md overflow-hidden p-4 mb-4'>
            <div className='flex justify-between items-start'>
                <div>
                    <h3 className='text-lg font-medium text-gray-900'>{question.title}</h3>
                    <div className='mt-1 flex flex-wrap gap-2'>
                        <Badge variant={question.difficulty}>{question.difficulty}</Badge>
                        {question.tags.map((tag) => (
                            <span
                                key={tag}
                                className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <p className='mt-2 text-sm text-gray-600'>{question.description}</p>
                </div>

                <div className='hover:scale-105 transition-all duration-300'>
                    <Button
                        variant={isSolved ? "success" : "primary"}
                        onClick={() => !isSolved && onSolve(question.id)}
                        disabled={isSolved}>
                        {isSolved ? "Solved" : "Solve"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;

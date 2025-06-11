export interface Question {
    id: string;
    title: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    description: string;
}

export const questions: Question[] = [
    {
        id: "1",
        title: "Two Sum",
        difficulty: "easy",
        tags: ["Array", "Hash Table"],
        description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    },
    {
        id: "2",
        title: "Reverse String",
        difficulty: "easy",
        tags: ["String"],
        description: "Write a function that reverses a string. The input string is given as an array of characters.",
    },
    {
        id: "3",
        title: "Valid Parentheses",
        difficulty: "easy",
        tags: ["String", "Stack"],
        description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    },
    {
        id: "4",
        title: "Merge Two Sorted Lists",
        difficulty: "medium",
        tags: ["Linked List"],
        description: "Merge two sorted linked lists and return it as a sorted list.",
    },
    {
        id: "5",
        title: "Maximum Subarray",
        difficulty: "medium",
        tags: ["Array", "Divide and Conquer", "Dynamic Programming"],
        description: "Find the contiguous subarray which has the largest sum and return its sum.",
    },
    {
        id: "6",
        title: "Container With Most Water",
        difficulty: "medium",
        tags: ["Array", "Two Pointers"],
        description: "Find two lines that together with the x-axis form a container, such that the container contains the most water.",
    },
    {
        id: "7",
        title: "3Sum",
        difficulty: "medium",
        tags: ["Array", "Two Pointers"],
        description: "Given an integer array, return all the triplets that sum to zero.",
    },
    {
        id: "8",
        title: "Regular Expression Matching",
        difficulty: "hard",
        tags: ["String", "Dynamic Programming", "Backtracking"],
        description: "Implement regular expression matching with support for '.' and '*'",
    },
    {
        id: "9",
        title: "Merge k Sorted Lists",
        difficulty: "hard",
        tags: ["Linked List", "Heap", "Divide and Conquer"],
        description: "Merge k sorted linked lists and return it as one sorted list.",
    },
    {
        id: "10",
        title: "Trapping Rain Water",
        difficulty: "hard",
        tags: ["Array", "Two Pointers", "Stack"],
        description: "Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.",
    },
];

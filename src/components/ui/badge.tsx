import React from "react";

interface BadgeProps {
    variant: "easy" | "medium" | "hard";
    children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ variant, children }) => {
    const variantClasses = {
        easy: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        hard: "bg-red-100 text-red-800",
    };

    return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>{children}</span>;
};

export default Badge;

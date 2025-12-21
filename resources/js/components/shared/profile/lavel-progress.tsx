"use client"

import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

interface LevelProgressProps {
    level?: number
    current?: number
    max?: number
    displayValue?: number
    containerClassName?: string
}

export default function LevelProgress({
    level = 94,
    current = 6601,
    max = 10000,
    displayValue = 194,
    containerClassName
}: LevelProgressProps) {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        // Animate progress on mount
        const timer = setTimeout(() => {
            setProgress((current / max) * 100)
        }, 100)
        return () => clearTimeout(timer)
    }, [current, max])

    return (
        <div className={cn("w-full max-w-2xl px-6 pt-4 pb-6 bg-bg-primary rounded-sm", containerClassName)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold">Level {level}</h2>
                <span className="text-sm text-gray-400">
                    {current.toLocaleString()}/{max.toLocaleString()}
                </span>
            </div>

            {/* Progress Bar Container */}
            <div className="relative">
                {/* Background Track */}
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                    {/* Gradient Progress */}
                    <div
                        className="h-full ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] transition-all duration-1000 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Circular Badge */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000 ease-out"
                    style={{ left: `calc(${progress}% - 20px)` }}
                >
                    <div className="flex items-center justify-center w-8 h-8 ease-in-out bg-gradient-to-r bg-[linear-gradient(45deg,var(--color-primary-color),var(--color-secondary-color))] rounded-full shadow-lg">
                        <span className="text-xs font-bold text-white">{displayValue}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

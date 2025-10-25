import { cn } from "@/lib/utils";

export default function Progressbar({ progress, milestones = [], containerClassName }: { progress: number, milestones?: number[], containerClassName?: string }) {
    // Ensure progress is within 0-100
    const clampedProgress = Math.max(0, Math.min(100, progress));
    return (
        <div className={cn("relative w-full h-2 bg-gray-200 rounded-full overflow-hidden min-w-xl", containerClassName)}>
            {/* Filled Progress */}
            <div
                className="absolute top-0 left-0 h-full bg-primary-color rounded-full transition-all duration-500 ease-out"
                style={{ width: `${clampedProgress}%` }}
            ></div>

            {/* Milestones */}
            {milestones.map((milestone, index) => (

                milestone < clampedProgress && (
                    <div
                        key={index}
                        className="absolute top-1/2 w-2 h-2 bg-white rounded-full border border-primabg-primary-color"
                        style={{ left: `${milestone}%`, transform: 'translateX(-50%) translateY(-50%)' }}
                        aria-label={`Milestone at ${milestone}%`}
                    ></div>
                )

            ))}
        </div>
    )
}

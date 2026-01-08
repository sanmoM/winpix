import { cn } from "@/lib/utils";

export default function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("max-w-[1700px] lg:w-[90%] mx-auto px-4 md:px-6 xl:px-4 2xl:px-0", className)}>
      {children}
    </div>
  )
}

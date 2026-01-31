import { cn } from '@/lib/utils'
import React from 'react'

export default function Table({ children, headingItems }: { children: React.ReactNode, headingItems?: any }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-bg-primary shadow-sm">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                <thead className="bg-primary-color text-white ">
                    <tr>
                        {headingItems && headingItems.map((item, index) => {
                            const isRTL =
                                typeof document !== "undefined" && document.dir === "rtl"

                            return (
                                <th
                                    key={index}
                                    className={cn(
                                        "px-4 py-3 text-nowrap",

                                        // LTR (default)
                                        !isRTL && "first:!text-left last:!text-right",

                                        // RTL (reverse)
                                        isRTL && "first:!text-right last:!text-left"
                                    )}
                                >
                                    {item}
                                </th>
                            )
                        })}
                    </tr>

                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

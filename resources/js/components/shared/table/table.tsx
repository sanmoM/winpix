import React from 'react'

export default function Table({ children, headingItems }: { children: React.ReactNode, headingItems?: string[] }) {
    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-bg-primary shadow-sm">
            <table className="min-w-full border-collapse text-left text-sm text-gray-700">
                <thead className="bg-primary-color text-white ">
                    <tr>
                        {headingItems && headingItems.map((item, index) => (
                            <th key={index} className="px-4 py-3 first:!text-left last:!text-right">
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}

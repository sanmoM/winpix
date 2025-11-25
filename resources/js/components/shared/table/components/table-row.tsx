
export default function TableRow({ children }: { children: React.ReactNode }) {
    return (
        <tr
            className="border-t transition hover:bg-bg-primary/10 "
        >
            {children}
        </tr>
    )
}

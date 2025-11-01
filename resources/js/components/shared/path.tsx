import { Link } from "@inertiajs/react";

interface PathProps {
    paths: PathItemProps[];
}

interface PathItemProps {
    label: string;
    href: string;
}

export default function Path({ paths }: PathProps) {
    return (
        <nav className="text-sm font-medium">
            {
                paths.map((path, index) => (
                    <>

                        <Link href={path?.href} className="text-primary-color">{path.label}</Link>
                        {
                            paths.length - 1 !== index &&
                            <span className="mx-2">&gt;</span>
                        }
                    </>
                ))
            }
        </nav>
    )
}

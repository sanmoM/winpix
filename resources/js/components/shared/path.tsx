import { Link } from "@inertiajs/react";

interface PathProps {
    paths: string[];
}

export default function Path({ paths }: PathProps) {
    return (
        <nav className="text-sm font-medium">
            {
                paths.map((path, index) => (
                    <>

                        <Link href="#" className="text-primary-color">PULSEpx Support</Link>
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

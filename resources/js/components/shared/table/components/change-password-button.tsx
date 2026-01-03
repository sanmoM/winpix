import useLocales from '@/hooks/useLocales';
import { Link } from '@inertiajs/react';

export default function ChangePasswordButton({ route }: { route: string }) {
    const { t } = useLocales();
    return (
        <Link
            href={route}
            className="bg-dark cursor-pointer rounded-md bg-slate-800 px-3 py-2 font-medium text-white"
        >
            Change Password
        </Link>
    );
}

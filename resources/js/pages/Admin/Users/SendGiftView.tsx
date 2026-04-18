import Button from '@/components/shared/buttons/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import useLocales from '@/hooks/useLocales'
import AppLayout from '@/layouts/app-layout'
import { useForm } from '@inertiajs/react'
import { route } from 'ziggy-js'

export default function SendGiftView({ userId }: { userId: number }) {
    const { t } = useLocales()
    const breadcrumbs = t('dashboard.users.index.breadcrumbs', {
        returnObjects: true,
    })

    const { data, setData, put, errors, processing } = useForm({
        type: 'pixel',
        amount: 0,
    })

    const types = [
        {
            id: "pixel",
            name: 'Pixel',
        },
        {
            id: "v-coin",
            name: 'V-Coin',
        },
    ]

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("first")
        put(route('admin.sendGift', { id: userId }));
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs as any}>
            <div className="p-4 h-full w-full flex justify-center items-center">
                <form className='min-w-sm bg-[var(--background)] p-4 rounded-xl border' onSubmit={handleSubmit}>
                    <h1 className='text-2xl font-bold'>Send Gift</h1>
                    <div className="grid w-full items-center gap-2 mt-4" >
                        <Label htmlFor="type" className="font-semibold">
                            Gift Type
                        </Label>
                        <select
                            id="type"
                            value={data.type}
                            onChange={(e) => setData('type', e.target.value)}
                            className="rounded-lg border border-gray-300 p-2  focus:outline-none bg-bg-primary"
                        >
                            <option value="">Select gift type</option>
                            {types?.map((singleType) => (
                                <option
                                    key={singleType.id}
                                    value={singleType.id}
                                >
                                    {singleType.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid w-full items-center gap-2 mt-4">
                        <Label htmlFor="amount" className="font-semibold">
                            Amount
                        </Label>
                        <Input
                            id="amount"
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', Number(e.target.value))}
                            placeholder="Enter amount"
                        />
                    </div>
                    <Button text="Send Gift" className="mt-4 px-10 py-1.5 !text-lg" />
                </form>
            </div>
        </AppLayout>
    )
}

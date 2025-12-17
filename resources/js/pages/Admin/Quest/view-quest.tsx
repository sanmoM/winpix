import { Label } from '@/components/ui/label';
import SinglePrize from '@/components/user-dashboard/quest/prize-input/single-prize';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { formatDate } from '@/utils/date';
import { Head, usePage } from '@inertiajs/react';

interface Prize {
    min: number | string;
    max: number | string;
    coin: number | string;
    title: string;
    coinType?: string;
}

interface Quest {
    title_en: string;
    brief_en: string;
    title_ar: string;
    brief_ar: string;
    category: { name: string };
    quest_type: { name: string };
    start_date: string;
    end_date: string;
    entry_coin: string;
    rank_tier: string;
    image: string;
    prizes: Prize[];
    quest_series?: { title_en: string };
}

export default function QuestView() {
    const { quest, prizePools } = usePage<any>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Quest Details',
            href: '/admin/contest',
        },
    ];


    const prizePoolOptions = prizePools.map((prizePool) => ({
        value: prizePool.id,
        label: prizePool.name,
    }));


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Quest Details" />

            <div className="max-w-6xl space-y-8 p-6">

                {/* Image */}
                {quest.image && (
                    <div className="overflow-hidden rounded-xl border">
                        <img
                            src={"/storage/" + quest.image}
                            alt={quest.title_en}
                            className="h-[260px] w-full object-cover"
                        />
                    </div>
                )}

                {/* Titles */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label>Title (EN)</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {quest.title_en}
                        </p>
                    </div>
                    <div dir="rtl">
                        <Label>العنوان</Label>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {quest.title_ar}
                        </p>
                    </div>
                </section>

                {/* Briefs */}
                <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <Label>Description (EN)</Label>
                        <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                            {quest.brief_en}
                        </p>
                    </div>
                    <div dir="rtl">
                        <Label>الوصف</Label>
                        <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                            {quest.brief_ar}
                        </p>
                    </div>
                </section>

                {/* Meta */}
                <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <Meta label="Category" value={quest.category?.name} />
                    <Meta label="Type" value={quest.quest_type?.name} />
                    <Meta label="Series" value={quest.quest_series?.title_en ?? '-'} />
                    <Meta label="Rank Tier" value={quest.rank_tier} />
                </section>

                {/* Dates */}
                <section className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    <Meta label="Start Date" value={formatDate(quest.startDate)} />
                    <Meta label="End Date" value={formatDate(quest.endDate)} />
                    <Meta label="Entry Coin" value={quest.entry_coin} />
                </section>

                {/* Prizes */}
                <section>
                    <Label>Prizes</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                        {quest.prizes?.map((prize: Prize, idx: number) => (
                            <SinglePrize prize={prize} prizePools={prizePoolOptions} hasRemove={false} />
                        ))}
                    </div>
                </section>

            </div>
        </AppLayout>
    );
}

const Meta = ({
    label,
    value,
}: {
    label: string;
    value?: string | number;
}) => (
    <div>
        <Label>{label}</Label>
        <p className="mt-1 text-sm text-muted-foreground">
            {value ?? '-'}
        </p>
    </div>
);

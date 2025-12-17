import Card from '@/components/shared/card/card';
import Container from '@/components/shared/container';
import NoData from '@/components/shared/no-data';
import Tab from '@/components/shared/tab';
import useLocales from '@/hooks/useLocales';
import UserLayout from '@/layouts/user-layout';
import { Link } from '@inertiajs/react';
import { useState } from 'react';


export default function EndedQuests({ myQuests, recentlyEnded, inactiveSeries }: any) {
    const { t } = useLocales()
    const [activeTab, setActiveTab] = useState("my-quests");
    return (
        <UserLayout>
            <Container className="space-y-4 md:space-y-6 lg:space-y-10 my-10 md:my-16 lg:my-12">
                <Tab
                    options={[
                        { label: t('endedQuests.tab.myQuests'), value: "my-quests" },
                        { label: t('endedQuests.tab.ended'), value: "ended" },
                        { label: t('endedQuests.tab.inactive'), value: "inactive" },
                    ]}
                    value={activeTab}
                    onChange={(val) => setActiveTab(val)}

                />
                {
                    activeTab === "my-quests" && (
                        <>
                            {
                                myQuests.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {myQuests.map((quest) => (

                                        <Link href={`/quests/single-quest/${quest.id}`} className='block'>
                                            <Card key={quest.id} item={quest} />
                                        </Link>
                                    ))}
                                </div>) : (
                                    <NoData text='You have not joined any quests yet.' />
                                )
                            }
                        </>
                    )
                }
                {
                    activeTab === "ended" && (
                        <>
                            {
                                recentlyEnded.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {recentlyEnded.map((quest) => (
                                        <Link href={`/quests/single-quest/${quest.id}`} className='block'>
                                            <Card key={quest.id} item={quest} />
                                        </Link>
                                    ))}
                                </div>) : (
                                    <NoData text='No recently ended quests.' />
                                )
                            }
                        </>
                    )
                }
                {
                    activeTab === "inactive" && (
                        <>
                            {
                                inactiveSeries.length > 0 ? (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {inactiveSeries.map((quest) => (
                                        <Link href={`/quests/single-quest-series/${quest.id}`} className='block'>
                                            <Card key={quest.id} item={quest} isSeries={true} />
                                        </Link>
                                    ))}
                                </div>) : (
                                    <NoData text='No inactive series.' />
                                )
                            }
                        </>
                    )
                }
            </Container>
        </UserLayout>
    )
}

import BorderButton from '@/components/shared/buttons/border-button';
import Button from '@/components/shared/buttons/button';
import PillButton from '@/components/shared/buttons/pill-button';
import useLocales from '@/hooks/useLocales';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import BadgeCheckboxItem from './components/badge-checkbox';
import CheckboxItem from './components/checkbox-item';
import FilterSection from './components/filter-section';

// --- Type Definitions ---

interface ISkillRank {
    multiSkill: boolean;
    a: boolean;
    b: boolean;
    c: boolean;
    unranked: boolean;
}

interface IQuestStatus {
    submit: boolean;
    vote: boolean;
    lateEntry: boolean;
    finalizing: boolean;
}

interface ICategory {
    all: boolean;
    landscape: boolean;
    stillLife: boolean;
    people: boolean;
    animals: boolean;
    urban: boolean;
    minimalism: boolean;
    fineArt: boolean;
    documentary: boolean;
}

interface IQuestType {
    casual: boolean;
    weekly: boolean;
    monthly: boolean;
    quarterly: boolean;
    yearly: boolean;
    promotional: boolean;
    community: boolean;
}

const colors = ['bg-red-500', 'bg-purple-600', 'bg-blue-500', 'bg-green-500']

export default function ActiveQuestFilterModalContents({ handleFilter, filter, setFilter, categories, questTypes, resetFilter }: any) {
    const { currentLanguage, t } = useLocales()

    const skillRankOptions = t('activeQuests.filter.filterModal.rank', { returnObjects: true })

    // Sort filter state
    const sortOptions = t('activeQuests.filter.filterModal.sort', { returnObjects: true })

    const entryFeeOptions = t('activeQuests.filter.filterModal.entryFee', { returnObjects: true })

    const questStatusOptions = t('activeQuests.filter.filterModal.status', { returnObjects: true })

    // Quest Status filter state
    const [questStatus, setQuestStatus] = useState<IQuestStatus>({
        submit: false,
        vote: false,
        finalizing: false,
    });
    // --- State Handler Functions ---

    const handleCheckboxChange = <
        T extends { [K in keyof T]: boolean }
    >(
        setState: React.Dispatch<React.SetStateAction<T>>,
        key: keyof T
    ) => {
        setState(prev => ({ ...prev, [key]: !prev[key] }));
    };


    return (
        <>
            <div className="mx-auto font-sans pb-16">
                {/* Sort Filter */}
                <div className="flex flex-wrap gap-3">
                    {sortOptions.map(option => (
                        <PillButton
                            key={option?.value}
                            label={option?.label}
                            isActive={filter.sort === option?.value}
                            className={"py-2 px-5 "}
                            onClick={() => {
                                filter.sort === option?.value ? setFilter('sort', null) : setFilter('sort', option?.value)
                            }}
                        />
                    ))}
                </div>

                {/* Skill Rank Filter */}
                {/* <FilterSection title={t('activeQuests.filter.labels.rank')}>

                    {
                        skillRankOptions.map((item: any, index) => (
                            <BadgeCheckboxItem
                                key={item.value}
                                label={item.label}
                                checked={filter.rank === item.value}
                                onChange={() => filter.rank === item.value ? setFilter('rank', null) : setFilter('rank', item.value)}
                                color={item?.hasColor !== false ? colors[index % colors?.length] : null}
                            />
                        ))
                    }
                </FilterSection> */}

                {/* Entry Fee Filter */}
                <FilterSection title={t('activeQuests.filter.labels.entryFee')}>
                    {
                        entryFeeOptions.map((item: any, index) => (
                            <PillButton
                                key={item.value}
                                label={item.label}
                                isActive={filter.isFree === item.value}
                                onClick={() => filter.isFree === item.value ? setFilter('isFree', null) : setFilter('isFree', item.value)}
                                className={"py-2 px-5 "}
                            />
                        ))
                    }
                </FilterSection>

                {/* Quest Status Filter */}
                {/* <FilterSection title={t('activeQuests.filter.labels.status')}>
                    {
                        questStatusOptions.map((item: any, index) => (
                            <CheckboxItem
                                key={item.value}
                                label={item.label}
                                checked={filter.status === item.value}
                                onChange={() => filter.status === item.value ? setFilter('status', null) : setFilter('status', item.value)}
                            />
                        ))
                    }
                </FilterSection> */}

                {/* Category Filter */}
                <FilterSection title={t('activeQuests.filter.labels.category')}>
                    {(categories as Array<keyof ICategory>).map(category => (
                        <CheckboxItem
                            key={category?.id}
                            label={category?.name}
                            checked={filter.category === category?.id}
                            onChange={() => filter.category === category?.id ? setFilter('category', null) : setFilter('category', category?.id)}
                        />
                    ))}
                </FilterSection>

                {/* Quest Type Filter */}
                <FilterSection title={t('activeQuests.filter.labels.questType')}>
                    {questTypes.map((questType) => (
                        <CheckboxItem
                            key={questType.id}
                            label={questType.name}
                            checked={filter.questType === questType.id}
                            onChange={() => filter.questType === questType.id ? setFilter('questType', null) : setFilter('questType', questType.id)}
                        />
                    ))}
                </FilterSection>
            </div>
            <div className={cn('absolute bottom-0 py-6 flex items-center gap-4 bg-background', currentLanguage === 'en' ? 'pr-10 ' : 'pr-0 flex-row-reverse')}>
                <BorderButton text='Reset Filter' onClick={() => {
                    resetFilter();
                }} className="w-fit" />
                <Button text="Apply Filter" onClick={() => handleFilter()} className="px-8" />
            </div>

        </>
    );
}

import CheckBox from '@/components/shared/inputs/check-box';
import React, { JSX, useState } from 'react';
import BadgeCheckboxItem from './components/badge-checkbox';
import CheckboxItem from './components/checkbox-item';
import FilterSection from './components/filter-section';
import PillButton from '@/components/shared/buttons/pill-button';

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

export default function ActiveQuestFilterModalContents(): JSX.Element {
    // --- State Hooks ---

    // Sort filter state
    const [activeSort, setActiveSort] = useState<string>('Rising');
    const sortOptions: string[] = ['Hot', 'Rising', 'Ending Soon', 'Newest', 'Oldest'];

    // Skill Rank filter state
    const [skillRank, setSkillRank] = useState<ISkillRank>({
        multiSkill: true,
        a: true,
        b: false,
        c: false,
        unranked: false,
    });

    // Entry Fee filter state
    const [entryFee, setEntryFee] = useState<string>('No');

    // Quest Status filter state
    const [questStatus, setQuestStatus] = useState<IQuestStatus>({
        submit: false,
        vote: false,
        lateEntry: true,
        finalizing: false,
    });

    // Category filter state
    const [category, setCategory] = useState<ICategory>({
        all: false,
        landscape: false,
        stillLife: true,
        people: false,
        animals: false,
        urban: false,
        minimalism: false,
        fineArt: false,
        documentary: false,
    });

    // Quest Type filter state
    const [questType, setQuestType] = useState<IQuestType>({
        casual: false,
        weekly: false,
        monthly: true,
        quarterly: false,
        yearly: false,
        promotional: false,
        community: false,
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
        <div className="mx-auto font-sans">
            {/* Sort Filter */}
            <div className="flex flex-wrap gap-3">
                {sortOptions.map(option => (
                    <PillButton
                        key={option}
                        label={option}
                        isActive={activeSort === option}
                        className={"py-2 px-5 "}
                        onClick={() => setActiveSort(option)}
                    />
                ))}
            </div>

            {/* Skill Rank Filter */}
            <FilterSection title="Skill Rank">
                <BadgeCheckboxItem
                    label="A"
                    color="bg-red-500"
                    checked={skillRank.a}
                    onChange={() => handleCheckboxChange(setSkillRank, 'a')}
                />
                <BadgeCheckboxItem
                    label="B"
                    color="bg-purple-600"
                    checked={skillRank.b}
                    onChange={() => handleCheckboxChange(setSkillRank, 'b')}
                />
                <BadgeCheckboxItem
                    label="C"
                    color="bg-blue-500"
                    checked={skillRank.c}
                    onChange={() => handleCheckboxChange(setSkillRank, 'c')}
                />
                <CheckboxItem
                    label="Unranked"
                    checked={skillRank.unranked}
                    onChange={() => handleCheckboxChange(setSkillRank, 'unranked')}
                />
            </FilterSection>

            {/* Entry Fee Filter */}
            <FilterSection title="Entry Fee">
                <PillButton
                    label="Yes"
                    isActive={entryFee === 'Yes'}
                    onClick={() => setEntryFee('Yes')}
                    className={"py-2 px-5 "}
                />
                <PillButton
                    label="No"
                    isActive={entryFee === 'No'}
                    onClick={() => setEntryFee('No')}
                    className={"py-2 px-5 "}
                />
            </FilterSection>

            {/* Quest Status Filter */}
            <FilterSection title="Quest status">
                <CheckboxItem
                    label="Submit"
                    checked={questStatus.submit}
                    onChange={() => handleCheckboxChange(setQuestStatus, 'submit')}
                />
                <CheckboxItem
                    label="Vote"
                    checked={questStatus.vote}
                    onChange={() => handleCheckboxChange(setQuestStatus, 'vote')}
                />
                <CheckboxItem
                    label="Late Entry"
                    checked={questStatus.lateEntry}
                    onChange={() => handleCheckboxChange(setQuestStatus, 'lateEntry')}
                />
                <CheckboxItem
                    label="Finalizing"
                    checked={questStatus.finalizing}
                    onChange={() => handleCheckboxChange(setQuestStatus, 'finalizing')}
                />
            </FilterSection>

            {/* Category Filter */}
            <FilterSection title="Category">
                {(Object.keys(category) as Array<keyof ICategory>).map(key => (
                    <CheckboxItem
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1).replace('all', 'All Categories').replace('stillLife', 'Still Life').replace('fineArt', 'Fine Art')}
                        checked={category[key]}
                        onChange={() => handleCheckboxChange(setCategory, key)}
                    />
                ))}
            </FilterSection>

            {/* Quest Type Filter */}
            <FilterSection title="Quest type">
                {(Object.keys(questType) as Array<keyof IQuestType>).map(key => (
                    <CheckboxItem
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        checked={questType[key]}
                        onChange={() => handleCheckboxChange(setQuestType, key)}
                    />
                ))}
            </FilterSection>

        </div>
    );
}

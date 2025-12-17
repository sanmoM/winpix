import { Link } from "@inertiajs/react";
import { useEffect, useState } from "react";

import React from 'react';
import Button from "../buttons/button";
import PillButton from "../buttons/pill-button";

export default function CardActions({ data }: any) {
    return (
        <div className="absolute top-4 left-4 right-0 text-white flex flex-col w-[15%] lg:w-[25%] rounded-sm overflow-hidden">
            <Countdown targetDate={data?.end_date} />
            {
                new Date(new Date(data?.end_date).setHours(23, 59, 59, 999)).getTime() > Date.now() && (
                    <>
                        <Link href={"/quests/single-quest/" + data?.id}>
                            <Button text="Join" className="mx-0 w-full rounded-none py-0.5 text-[10px]" />
                        </Link>
                        <Link href={"/quests/single-quest/" + data?.id}>
                            <PillButton label="Vote" className="rounded-none py-0.5 text-[10px] w-full" />
                        </Link>
                    </>
                )
            }
        </div>
    )
}


interface CountdownProps {
    targetDate: string | Date;
}

interface TimeLeft {
    days?: number;
    hours?: number;
    minutes?: number;
    expired: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const normalizeDate = (date: string | Date): Date => {
        if (typeof date === "string" && date.length === 10) {
            // YYYY-MM-DD → end of day
            return new Date(`${date}T23:59:59`);
        }
        return new Date(date);
    };

    const calculateTimeLeft = (): TimeLeft => {
        const difference =
            normalizeDate(targetDate).getTime() - new Date().getTime();

        if (difference <= 0) {
            return { expired: true };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        return { days, hours, minutes, expired: false };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(
        calculateTimeLeft()
    );

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    if (timeLeft.expired) {
        return <span className="!text-center bg-black/30 text-[10px] py-0.5">Expired</span>;
    }

    if ((timeLeft.days ?? 0) > 0) {
        return (
            <span className="!text-center bg-black/30 text-[10px] py-0.5">
                {timeLeft.days} day
                {timeLeft.days && timeLeft.days > 1 ? "s" : ""} left
            </span>
        );
    }

    return (
        <span className="!text-center bg-black/30 text-[10px] py-0.5">
            {String(timeLeft.hours ?? 0).padStart(2, "0")} H : {String(timeLeft.minutes ?? 0).padStart(2, "0")} M left
        </span>
    );
};
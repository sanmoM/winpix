import React from 'react'
import TextInput from '../shared/inputs/text-input';

export default function ScoreContent({ image, setScore, score }: { image: any, setScore: any, score: any }) {
    return (
        <div className="group relative flex h-full w-xl cursor-pointer flex-col overflow-hidden rounded-lg">
            <div className="mb-3 flex-1 overflow-hidden rounded-xl bg-bg-primary">
                <img
                    src={'/storage/' + image}
                    alt={`Photo`}
                    className="h-full w-full rounded-md object-contain duration-300 group-hover:scale-105"
                />
            </div>
            <div className="mx-3">
                <TextInput
                    min={1}
                    max={10}
                    label="Score"
                    placeholder="Enter score"
                    type="number"
                    setValue={(value) => setScore(parseInt(value))}
                    value={score}
                />
            </div>
        </div>
    )
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { getRandomPhases, Phases } from "../lib/phase10logic";

export default function Randomizer() {
    const [phases, setPhases] = useState<string[]>([]);
    const [phaseList, setPhaseList] = useState<Phases>({});
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetch('/phases.json')
            .then(response => response.json())
            .then((data: Phases) => {
                setPhaseList(data);
                setPhases(getRandomPhases(data));
            });
    }, []);

    const handleRandomize = () => {
        const newPhases = getRandomPhases(phaseList);
        setPhases(newPhases);
    };

    const copyURLToClipboard = () => {
        navigator.clipboard.writeText(window.location.origin).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error("Could not copy URL: ", err);
        });
    };

    return (
        <div className="flex flex-col items-center gap-4 py-6">
            <div className="text-center">
                {phases.map((phase, index) => (
                    <p key={index} className="text-lg font-sans text-white">Phase {index + 1}: {phase}</p>
                ))}
            </div>
            <Button
                onClick={handleRandomize}
                className="px-4 py-2 border-2 border-gray-500 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-colors"
            >
                Randomize
            </Button>
            <div className="self-end mt-4">
                <Button
                    onClick={copyURLToClipboard}
                    className={`bg-red-500 text-white font-bold py-1 px-2 text-sm rounded transition duration-500 ${copied ? 'bg-green-500' : 'hover:bg-red-600'}`}
                >
                    {copied ? 'Copied!' : 'Copy URL'}
                </Button>
            </div>
        </div>
    );
}

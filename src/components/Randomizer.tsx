"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { getRandomPhases, Phases } from "../lib/phase10logic";
import { generateElegantUrl } from "../lib/urlGenerator";

interface RandomizerProps {
    initialPhases?: string[];
}

export default function Randomizer({ initialPhases }: RandomizerProps) {
    const [phases, setPhases] = useState<string[]>(initialPhases || []);
    const [phaseList, setPhaseList] = useState<Phases>({});
    const [copied, setCopied] = useState(false);
    const [showRules, setShowRules] = useState(false);

    useEffect(() => {
        fetch('/phases.json')
            .then(response => response.json())
            .then((data: Phases) => {
                setPhaseList(data);
                if (!initialPhases || initialPhases.length === 0) {
                    setPhases(getRandomPhases(data));
                }
            });
    }, [initialPhases]);

    const handleRandomize = () => {
        const newPhases = getRandomPhases(phaseList);
        setPhases(newPhases);
        
        // Update URL without page reload
        const elegantUrl = generateElegantUrl(newPhases);
        window.history.pushState({}, '', `/${elegantUrl}`);
    };

    const copyURLToClipboard = () => {
        const elegantUrl = generateElegantUrl(phases);
        const fullUrl = `${window.location.origin}/${elegantUrl}`;
        navigator.clipboard.writeText(fullUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error("Could not copy URL: ", err);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center gap-1 sm:gap-3 py-1 sm:py-2">
                <div className="text-center bg-white/95 rounded-lg p-1 sm:p-3 shadow-inner w-full flex flex-col">
                    <div className="flex flex-col justify-center space-y-0.5 sm:space-y-1 mb-2">
                        {phases.map((phase, index) => (
                            <div key={index} className="text-xs sm:text-sm font-semibold text-gray-700 px-1 py-0.5 sm:p-1.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-md text-left flex flex-shrink-0 min-h-[1.25rem] sm:min-h-[2rem] items-center">
                                <span className="text-blue-600 font-bold mr-2 w-4 flex-shrink-0">{index + 1}.</span>
                                <span className="flex-1 leading-tight">{phase}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    onClick={handleRandomize}
                    className="px-4 py-2 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                >
                    🎲 Randomize Phases
                </Button>
                <div className="flex justify-between items-center w-full mt-2">
                    <Button
                        onClick={() => setShowRules(true)}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-3 text-xs rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        📖 Rules
                    </Button>
                    <Button
                        onClick={copyURLToClipboard}
                        className={`font-bold py-1.5 px-3 text-xs rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                    >
                        {copied ? '✓ Copied!' : '🔗 Copy URL'}
                    </Button>
                </div>
            </div>

            {showRules && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">How to Play Phase 10</h2>
                            <Button
                                onClick={() => setShowRules(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm"
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="space-y-4 text-sm text-gray-700">
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🎯 Objective</h3>
                                <p>Complete all 10 phases in order. The first player to complete Phase 10 wins!</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🃏 Phase Types</h3>
                                <ul className="space-y-1 text-xs">
                                    <li><strong>Set:</strong> Cards of the same number (e.g., 7-7-7)</li>
                                    <li><strong>Run:</strong> Cards in sequence (e.g., 2-3-4-5)</li>
                                    <li><strong>Color:</strong> Cards of the same color</li>
                                    <li><strong>Wild Cards:</strong> Can be any number/color</li>
                                    <li><strong>Skip Cards:</strong> Skip next player's turn</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🎮 How to Play</h3>
                                <ol className="space-y-1 text-xs list-decimal list-inside">
                                    <li>Each player draws 10 cards to start</li>
                                    <li>Try to complete your current phase</li>
                                    <li>Once you complete a phase, lay it down</li>
                                    <li>Add remaining cards to other phases</li>
                                    <li>Discard to end your turn</li>
                                    <li>Move to next phase only after completing current one</li>
                                </ol>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🔢 Scoring</h3>
                                <p className="text-xs">Each card left in hand counts as points (bad). Lowest score wins!</p>
                                <ul className="space-y-1 text-xs mt-2">
                                    <li><strong>Numbers 1-9:</strong> 5 points each</li>
                                    <li><strong>Numbers 10-12:</strong> 10 points each</li>
                                    <li><strong>Skip:</strong> 25 points</li>
                                    <li><strong>Wild:</strong> 25 points</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { getRandomPhases, Phases } from "../lib/phase10logic";
import { generateElegantUrl, parseElegantUrl, isValidElegantUrl } from "../lib/urlGenerator";

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
                    // Check if we have a URL path that might contain phase information
                    const path = window.location.pathname.substring(1);
                    if (path && isValidElegantUrl(path)) {
                        parseElegantUrl(path).then(retrievedPhases => {
                            if (retrievedPhases && retrievedPhases.length > 0) {
                                setPhases(retrievedPhases);
                            } else {
                                // If we can't get phases from the URL, generate new ones
                                const newPhases = getRandomPhases(data);
                                setPhases(newPhases);
                                // Generate a URL for these new phases
                                const elegantUrl = generateElegantUrl(newPhases);
                                window.history.replaceState({}, '', `/${elegantUrl}`);
                            }
                        });
                    } else {
                        // No URL or invalid URL, generate new phases
                        const newPhases = getRandomPhases(data);
                        setPhases(newPhases);
                        // Generate a URL for these new phases
                        const elegantUrl = generateElegantUrl(newPhases);
                        window.history.replaceState({}, '', `/${elegantUrl}`);
                    }
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
        // Just use current URL instead of generating a new one
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error("Could not copy URL: ", err);
        });
    };

    return (
        <>
            <div className="flex flex-col items-center gap-2 sm:gap-3 py-2 sm:py-3">
                <div className="text-center bg-white/95 rounded-lg p-2 sm:p-3 shadow-inner w-full flex flex-col">
                    <div className="flex flex-col justify-center space-y-1.5 mb-2">
                        {phases.map((phase, index) => (
                            <div key={index} className="text-xs sm:text-base font-semibold text-gray-700 px-2 py-1.5 sm:p-2.5 bg-gradient-to-r from-blue-100 to-purple-100 rounded-md text-left flex flex-shrink-0 min-h-[2rem] sm:min-h-[2.5rem] items-center">
                                <span className="text-blue-600 font-bold mr-2 w-5 flex-shrink-0">{index + 1}.</span>
                                <span className="flex-1 leading-tight">{phase}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    onClick={handleRandomize}
                    className="w-full sm:w-auto px-6 py-3 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                    🎲 Randomize Phases
                </Button>
                <div className="flex justify-between items-center w-full mt-2 gap-2">
                    <Button
                        onClick={() => setShowRules(true)}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-4 text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        📖 Rules
                    </Button>
                    <Button
                        onClick={copyURLToClipboard}
                        className={`flex-1 font-bold py-2.5 px-4 text-xs sm:text-sm rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                    >
                        {copied ? '✓ Copied!' : '🔗 Copy URL'}
                    </Button>
                </div>
            </div>

            {showRules && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 sm:p-4 z-50">
                    <div className="bg-white rounded-lg p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">How to Play Phase 10</h2>
                            <Button
                                onClick={() => setShowRules(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg text-sm"
                            >
                                ✕
                            </Button>
                        </div>
                        <div className="mb-4 bg-blue-50 p-2 rounded-lg border border-blue-100">
                            <h3 className="font-bold text-blue-600 mb-2 text-sm">📋 Official Phases</h3>
                            <ol className="text-xs list-decimal list-inside space-y-1">
                                <li>2 sets of 3</li>
                                <li>1 set of 3 + 1 run of 4</li>
                                <li>1 set of 4 + 1 run of 4</li>
                                <li>1 run of 7</li>
                                <li>1 run of 8</li>
                                <li>1 run of 9</li>
                                <li>2 sets of 4</li>
                                <li>7 cards of one color</li>
                                <li>1 set of 5 + 1 set of 2</li>
                                <li>1 set of 5 + 1 set of 3</li>
                            </ol>
                        </div>
                        <div className="space-y-4 text-sm text-gray-700">
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🎯 Objective</h3>
                                <p>Complete all 10 phases in order. The first player to complete Phase 10 wins! The goal is to have the lowest score at the end of the game.</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🃏 Phase Types</h3>
                                <ul className="space-y-1 text-xs">
                                    <li><strong>Set:</strong> Cards of the same number (e.g., 7-7-7)</li>
                                    <li><strong>Run:</strong> Cards in sequential order (e.g., 3-4-5-6)</li>
                                    <li><strong>Color:</strong> Cards of the same color</li>
                                    <li><strong>Wild Cards:</strong> Can substitute for any card in a set or run</li>
                                    <li><strong>Skip Cards:</strong> Skip the next player's turn when played</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🎮 How to Play</h3>
                                <ol className="space-y-1 text-xs list-decimal list-inside">
                                    <li>Each player starts with 10 cards</li>
                                    <li>On your turn, draw 1 card (from deck or discard pile)</li>
                                    <li>Try to complete your current phase</li>
                                    <li>When ready, lay down your completed phase</li>
                                    <li>Play additional cards on yours or others' phases</li>
                                    <li>Discard 1 card to end your turn</li>
                                    <li>First player to discard all cards ends the round</li>
                                    <li>Score remaining cards in hand (lower is better)</li>
                                    <li>If you didn't complete your phase, you must repeat it</li>
                                    <li>First player to complete Phase 10 and go out wins!</li>
                                </ol>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2">🔢 Scoring</h3>
                                <p className="text-xs">Each card left in hand counts as points (bad). Lowest score wins!</p>
                                <ul className="space-y-1 text-xs mt-2">
                                    <li><strong>Numbers 1-9:</strong> <strong className="text-red-600">5 points</strong> each</li>
                                    <li><strong>Numbers 10-12:</strong> <strong className="text-red-600">10 points</strong> each</li>
                                    <li><strong>Skip:</strong> <strong className="text-red-600">25 points</strong></li>
                                    <li><strong>Wild:</strong> <strong className="text-red-600">25 points</strong></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

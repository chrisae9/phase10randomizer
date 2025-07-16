"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { getRandomPhases, Phases } from "../lib/phase10logic";
import { generateElegantUrl, parseElegantUrl, isValidElegantUrl } from "../lib/urlGenerator";

export default function Randomizer() {
    const [phases, setPhases] = useState<string[]>([]);
    const [phaseList, setPhaseList] = useState<Phases>({});
    const [copied, setCopied] = useState(false);
    const [showRules, setShowRules] = useState(false);

    const officialPhases = [
        "2 sets of 3",
        "1 set of 3 + 1 run of 4",
        "1 set of 4 + 1 run of 4",
        "1 run of 7",
        "1 run of 8",
        "1 run of 9",
        "2 sets of 4",
        "7 cards of one color",
        "1 set of 5 + 1 set of 2",
        "1 set of 5 + 1 set of 3"
    ];

    useEffect(() => {
        fetch('/phases.json')
            .then(response => response.json())
            .then((data: Phases) => {
                setPhaseList(data);
                const path = window.location.pathname.substring(1);
                
                if (path === 'official-phases') {
                    setPhases(officialPhases);
                    return;
                }
                
                // Check if we have a URL path that might contain phase information
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
            });
    }, []);

    // We no longer need the useEffect that updates the URL when phases change
    // because URL updates are handled in the handleRandomize function

    const handleRandomize = () => {
        const newPhases = getRandomPhases(phaseList);
        setPhases(newPhases);
        
        // Generate an elegant URL for the new phases
        const elegantUrl = generateElegantUrl(newPhases);
        
        // If we're on the official phases page, navigate to the home page with the elegant URL
        if (window.location.pathname === '/official-phases') {
            window.location.href = `/${elegantUrl}`;
        } else {
            // Update URL without page reload
            window.history.pushState({}, '', `/${elegantUrl}`);
        }
    };

    const useOfficialPhases = () => {
        window.location.href = '/official-phases';
    };

    const copyURLToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        }).catch(err => {
            console.error("Could not copy URL: ", err);
        });
    };

    return (
        <div className="flex flex-col items-center gap-1.5 sm:gap-2.5 py-1.5 sm:py-2.5">
            <div className="text-center bg-white/95 rounded-lg p-1.5 sm:p-2.5 shadow-inner w-full flex flex-col">
                <div className="flex flex-col justify-center space-y-1 mb-1.5 sm:space-y-1.5">
                    {phases.map((phase, index) => (
                        <div key={index} className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 px-2 py-1 sm:p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-md text-left flex flex-shrink-0 min-h-[1.75rem] sm:min-h-[2.25rem] items-center">
                            <span className="text-blue-600 font-bold mr-1.5 w-4 flex-shrink-0">{index + 1}.</span>
                            <span className="flex-1 leading-tight">{phase}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center w-full">
                <Button
                    onClick={handleRandomize}
                    className="flex-1 sm:flex-1 px-2 py-1.5 sm:py-2 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                    🎲 Randomize
                </Button>
                <Button
                    onClick={useOfficialPhases}
                    className="flex-1 sm:flex-1 px-2 py-1.5 sm:py-2 border-2 border-gray-500 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm"
                >
                    📋 Official
                </Button>
            </div>
            <div className="flex justify-between items-center w-full mt-1.5 gap-1.5 sm:gap-2">
                <Button
                    onClick={() => setShowRules(true)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    📖 Rules
                </Button>
                <Button
                    onClick={copyURLToClipboard}
                    className={`flex-1 font-bold py-1.5 sm:py-2 px-2 sm:px-4 text-xs sm:text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    {copied ? '✓ Copied!' : '🔗 Copy URL'}
                </Button>
            </div>

            {showRules && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-1 z-50">
                    <div className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md mx-1 h-[95vh] sm:h-auto max-h-[95vh] flex flex-col">
                        <h2 className="text-lg sm:text-xl font-bold text-center text-blue-700 mb-2 border-b pb-1">Phase 10 Rules</h2>
                        <div className="space-y-3 text-gray-700 overflow-y-auto flex-1 pr-1 -mr-1">
                            <div className="bg-blue-50 rounded-md p-2">
                                <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🎯 Objective</h3>
                                <p className="text-xs sm:text-sm leading-tight">Phase 10 is a rummy-type card game where players aim to be the first to complete ten specific phases (combinations of cards). Each phase has requirements like sets (cards with the same number) and runs (cards in sequential order). Players draw and discard cards each turn, trying to lay down their phase and then "go out" by discarding their last card. The game is won by the first player to complete all ten phases.</p>
                            </div>
                            
                            <div className="bg-blue-50 rounded-md p-2">
                                <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🃏 Cards & Definitions</h3>
                                <p className="text-xs sm:text-sm leading-tight mb-1">The deck contains 108 cards: 24 each of red, blue, green, and yellow cards numbered 1-12 (two of each number in each color), plus 4 Skip cards and 8 Wild cards.</p>
                                <div className="grid grid-cols-1 gap-1 text-xs sm:text-sm">
                                    <div className="bg-white/70 p-1.5 rounded">
                                        <strong>Set:</strong> Two or more cards with the same number in any color combination (e.g., three 7s)
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded">
                                        <strong>Run:</strong> Four or more cards in numerical sequence in any color combination (e.g., 3-4-5-6)
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded">
                                        <strong>Wild Cards:</strong> Can substitute for any number or color to complete a Phase
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded">
                                        <strong>Skip Cards:</strong> Force another player to lose their turn when discarded
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 rounded-md p-2">
                                <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🎮 How To Play</h3>
                                <ul className="space-y-0.5 text-xs sm:text-sm">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Setup:</strong> Each player is dealt 10 cards</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Turn Order:</strong> Play proceeds clockwise starting with the player to the dealer's left</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>On Your Turn:</strong> Draw one card (from draw pile or top discard), try to complete your current phase, and end by discarding one card</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Making a Phase:</strong> When you have all required cards for your current phase, lay them face-up during your turn</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Hitting:</strong> After completing your phase, you can add matching cards to your own or others' completed phases</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Going Out:</strong> Discard your last card to end the round</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Advancing:</strong> Players who complete their phase advance to the next phase; those who don't try the same phase again</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Wild Cards:</strong> Can be used in any phase but can't be replaced once played</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span><strong>Skip Cards:</strong> Make another player lose their turn when discarded (cannot be picked from discard pile)</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-blue-50 rounded-md p-2">
                                <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🎯 Hitting</h3>
                                <p className="text-xs sm:text-sm leading-tight">After completing your phase, you can "hit" by adding cards to any completed phase on the table.</p>
                                <ul className="space-y-0.5 text-xs sm:text-sm mt-1">
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>You must complete your own phase before hitting</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>Add cards that properly fit the pattern (add a 4 to a set of 4s, add a 2 to a run of 3-4-5-6, etc.)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>Hit during your turn before discarding</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>You can hit your own phases or other players' phases</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>Wild cards can be added to any phase</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-blue-500 mr-1">•</span>
                                        <span>You cannot replace a Wild card with a card from your hand</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div className="bg-blue-50 rounded-md p-2">
                                <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🔢 Scoring</h3>
                                <p className="text-xs sm:text-sm leading-tight mb-1">Players score points for cards remaining in their hands when someone goes out. Lower score is better!</p>
                                <div className="grid grid-cols-2 gap-1 text-xs sm:text-sm">
                                    <div className="bg-white/70 p-1.5 rounded flex justify-between">
                                        <span>Cards 1-9:</span>
                                        <span className="text-red-600 font-bold">5 points</span>
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded flex justify-between">
                                        <span>Cards 10-12:</span>
                                        <span className="text-red-600 font-bold">10 points</span>
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded flex justify-between">
                                        <span>Skip Cards:</span>
                                        <span className="text-red-600 font-bold">15 points</span>
                                    </div>
                                    <div className="bg-white/70 p-1.5 rounded flex justify-between">
                                        <span>Wild Cards:</span>
                                        <span className="text-red-600 font-bold">25 points</span>
                                    </div>
                                </div>
                                <p className="text-xs sm:text-sm leading-tight mt-1">The player who goes out scores zero points. The player with the lowest total score after all phases are completed is the winner.</p>
                            </div>
                        </div>
                        <div className="mt-2 sm:mt-3 flex justify-center pt-2 border-t border-gray-200">
                            <Button
                                onClick={() => setShowRules(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 sm:py-2 px-6 rounded-lg text-sm w-full max-w-[150px]"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

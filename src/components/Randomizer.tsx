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
        
        // If we're on the official phases page, navigate to the home page with the hash
        if (window.location.pathname === '/official-phases') {
            const hash = btoa(newPhases.join('|'));
            window.location.href = `/#${hash}`;
        } else {
            // Update URL without page reload
            const hash = btoa(newPhases.join('|'));
            window.history.pushState({}, '', `/#${hash}`);
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
            <div className="flex flex-wrap gap-2 justify-center w-full">
                <Button
                    onClick={handleRandomize}
                    className="flex-grow sm:flex-grow-0 px-4 py-2 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-base"
                >
                    🎲 Randomize Phases
                </Button>
                <Button
                    onClick={useOfficialPhases}
                    className="flex-grow sm:flex-grow-0 px-4 py-2 border-2 border-gray-500 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-xs sm:text-base"
                >
                    📋 Official Phases
                </Button>
            </div>
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

            {showRules && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-2 sm:p-4 z-50">
                    <div className="bg-white rounded-lg p-3 sm:p-5 max-w-md w-full h-[90vh] sm:h-auto max-h-[90vh] flex flex-col">
                        <div className="space-y-2.5 text-sm text-gray-700 overflow-y-auto px-1 flex-1">
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2 text-left">🎯 Objective</h3>
                                <p className="text-left text-xs">Phase 10 is a rummy-type card game where players aim to be the first to complete ten specific phases (combinations of cards). Each phase has requirements like sets (cards with the same number) and runs (cards in sequential order). Players draw and discard cards each turn, trying to lay down their phase and then "go out" by discarding their last card. The game is won by the first player to complete all ten phases.</p>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2 text-left">🃏 Cards & Definitions</h3>
                                <p className="text-xs text-left mb-1">The deck contains 108 cards: 24 each of red, blue, green, and yellow cards numbered 1-12 (two of each number in each color), plus 4 Skip cards and 8 Wild cards.</p>
                                <ul className="space-y-1 text-xs text-left list-disc list-inside">
                                    <li><strong>Set:</strong> Two or more cards with the same number in any color combination (e.g., three 7s)</li>
                                    <li><strong>Run:</strong> Four or more cards in numerical sequence in any color combination (e.g., 3-4-5-6)</li>
                                    <li><strong>Wild Cards:</strong> Can substitute for any number or color to complete a Phase</li>
                                    <li><strong>Skip Cards:</strong> Force another player to lose their turn</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2 text-left">🎮 How To Play</h3>
                                <ul className="space-y-1 text-xs list-disc list-inside text-left">
                                    <li><strong>Setup:</strong> Each player is dealt 10 cards</li>
                                    <li><strong>Turn Order:</strong> Play proceeds clockwise starting with the player to the dealer's left</li>
                                    <li><strong>On Your Turn:</strong> Draw one card (from draw pile or top discard), try to complete your current phase, and end by discarding one card</li>
                                    <li><strong>Making a Phase:</strong> When you have all required cards for your current phase, lay them face-up during your turn</li>
                                    <li><strong>Hitting:</strong> After completing your phase, you can add matching cards to your own or others' completed phases</li>
                                    <li><strong>Going Out:</strong> Discard your last card to end the round</li>
                                    <li><strong>Advancing:</strong> Players who complete their phase advance to the next phase; those who don't try the same phase again</li>
                                    <li><strong>Wild Cards:</strong> Can be used in any phase but can't be replaced once played</li>
                                    <li><strong>Skip Cards:</strong> Make another player lose their turn when discarded (cannot be picked from discard pile)</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2 text-left">🎯 Hitting</h3>
                                <p className="text-xs text-left mb-1">After completing your phase, you can "hit" by adding cards to any completed phase on the table.</p>
                                <ul className="space-y-1 text-xs list-disc list-inside text-left">
                                    <li>You must complete your own phase before hitting</li>
                                    <li>Add cards that properly fit the pattern (add a 4 to a set of 4s, add a 2 to a run of 3-4-5-6, etc.)</li>
                                    <li>Hit during your turn before discarding</li>
                                    <li>You can hit your own phases or other players' phases</li>
                                    <li>Wild cards can be added to any phase</li>
                                    <li>You cannot replace a Wild card with a card from your hand</li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="font-bold text-blue-600 mb-2 text-left">🔢 Scoring</h3>
                                <p className="text-xs text-left">Players score points for cards remaining in their hands when someone goes out. Lower score is better!</p>
                                <ul className="space-y-1 text-xs mt-1 text-left list-disc list-inside">
                                    <li><strong>Cards 1-9:</strong> <strong className="text-red-600">5 points</strong> each</li>
                                    <li><strong>Cards 10-12:</strong> <strong className="text-red-600">10 points</strong> each</li>
                                    <li><strong>Skip Cards:</strong> <strong className="text-red-600">15 points</strong> each</li>
                                    <li><strong>Wild Cards:</strong> <strong className="text-red-600">25 points</strong> each</li>
                                </ul>
                                <p className="text-xs text-left mt-1">The player who goes out scores zero points. The player with the lowest total score after all phases are completed is the winner.</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-center pt-2 border-t border-gray-200">
                            <Button
                                onClick={() => setShowRules(false)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg text-sm w-full max-w-[200px]"
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

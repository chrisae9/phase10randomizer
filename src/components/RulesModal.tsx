"use client";

import { Button } from "./Button";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface RulesModalProps {
    showRules: boolean;
    setShowRules: (show: boolean) => void;
}

export function RulesModal({ showRules, setShowRules }: RulesModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!showRules || !mounted) return null;
    
    const modalContent = (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-2 sm:p-4 md:p-6" style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100dvh',
            height: 'calc(var(--vh) * 100)',
            zIndex: 9999,
            overflow: 'hidden'
        }}>
            <div 
                className="bg-white rounded-lg p-3 sm:p-4 md:p-6 w-full max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl mx-2 sm:mx-4 flex flex-col relative"
                style={{ 
                    maxHeight: "90dvh",
                    maxHeight: "calc(var(--vh) * 90)",
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-700 mb-3 md:mb-4 border-b pb-2 flex-shrink-0">Phase 10 Rules</h2>
                <div className="space-y-3 md:space-y-4 text-gray-700 overflow-y-auto flex-1 pr-2 -mr-2 overscroll-contain" style={{ touchAction: 'pan-y' }}>
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🎯 Objective</h3>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed">Phase 10 is a rummy-type card game where players aim to be the first to complete ten specific phases (combinations of cards). Each phase has requirements like sets (cards with the same number) and runs (cards in sequential order). Players draw and discard cards each turn, trying to lay down their phase and then &quot;go out&quot; by discarding their last card. The game is won by the first player to complete all ten phases.</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🃏 Cards & Definitions</h3>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-2">The deck contains 108 cards: 24 each of red, blue, green, and yellow cards numbered 1-12 (two of each number in each color), plus 4 Skip cards and 8 Wild cards.</p>
                        <div className="grid grid-cols-1 gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
                            <div className="bg-white/70 p-2 md:p-3 rounded">
                                <strong>Set:</strong> Two or more cards with the same number in any color combination (e.g., three 7s)
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded">
                                <strong>Run:</strong> Four or more cards in numerical sequence in any color combination (e.g., 3-4-5-6)
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded">
                                <strong>Wild Cards:</strong> Can substitute for any number or color to complete a Phase
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded">
                                <strong>Skip Cards:</strong> Force another player to lose their turn when discarded
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🎮 How To Play</h3>
                        <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Setup:</strong> Each player is dealt 10 cards</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Turn Order:</strong> Play proceeds clockwise starting with the player to the dealer&apos;s left</span>
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
                                <span><strong>Hitting:</strong> After completing your phase, you can add matching cards to your own or others&apos; completed phases</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Going Out:</strong> Discard your last card to end the round</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Advancing:</strong> Players who complete their phase advance to the next phase; those who don&apos;t try the same phase again</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Wild Cards:</strong> Can be used in any phase but can&apos;t be replaced once played</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-1">•</span>
                                <span><strong>Skip Cards:</strong> Make another player lose their turn when discarded (cannot be picked from discard pile)</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🎯 Hitting</h3>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-2">After completing your phase, you can &quot;hit&quot; by adding cards to any completed phase on the table.</p>
                        <ul className="space-y-1 md:space-y-2 text-xs sm:text-sm md:text-base">
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
                                <span>You can hit your own phases or other players&apos; phases</span>
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
                    
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🔢 Scoring</h3>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed mb-2">Players score points for cards remaining in their hands when someone goes out. Lower score is better!</p>
                        <div className="grid grid-cols-2 gap-2 md:gap-3 text-xs sm:text-sm md:text-base">
                            <div className="bg-white/70 p-2 md:p-3 rounded flex justify-between">
                                <span>Cards 1-9:</span>
                                <span className="text-red-600 font-bold">5 points</span>
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded flex justify-between">
                                <span>Cards 10-12:</span>
                                <span className="text-red-600 font-bold">10 points</span>
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded flex justify-between">
                                <span>Skip Cards:</span>
                                <span className="text-red-600 font-bold">15 points</span>
                            </div>
                            <div className="bg-white/70 p-2 md:p-3 rounded flex justify-between">
                                <span>Wild Cards:</span>
                                <span className="text-red-600 font-bold">25 points</span>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm md:text-base leading-relaxed mt-2">The player who goes out scores zero points. The player with the lowest total score after all phases are completed is the winner.</p>
                    </div>
                    
                    <div className="bg-blue-50 rounded-md p-3 md:p-4">
                        <h3 className="font-bold text-blue-700 mb-2 text-sm sm:text-base md:text-lg">🃏 Play with Regular Cards</h3>
                        <div className="flex justify-center">
                            <Image
                                src="/phase10withregcards.png"
                                alt="Phase 10 scoring chart with regular cards"
                                width={400}
                                height={400}
                                className="rounded-lg max-w-full h-auto"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-2 sm:mt-3 flex justify-center pt-2 border-t border-gray-200 flex-shrink-0">
                    <Button
                        onClick={() => setShowRules(false)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 sm:py-2 px-6 rounded-lg text-sm w-full max-w-[150px]"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
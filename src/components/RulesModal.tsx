"use client";

import { Button } from "./Button";

interface RulesModalProps {
    showRules: boolean;
    setShowRules: (show: boolean) => void;
}

export function RulesModal({ showRules, setShowRules }: RulesModalProps) {
    if (!showRules) return null;
    
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-1 z-50">
            <div 
                className="bg-white rounded-lg p-3 sm:p-4 w-full max-w-md mx-1 flex flex-col"
                style={{ 
                    height: "95dvh",
                    maxHeight: "calc(var(--vh) * 95)"
                }}
            >
                <h2 className="text-lg sm:text-xl font-bold text-center text-blue-700 mb-2 border-b pb-1">Phase 10 Rules</h2>
                <div className="space-y-3 text-gray-700 overflow-y-auto flex-1 pr-1 -mr-1">
                    <div className="bg-blue-50 rounded-md p-2">
                        <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🎯 Objective</h3>
                        <p className="text-xs sm:text-sm leading-tight">Phase 10 is a rummy-type card game where players aim to be the first to complete ten specific phases (combinations of cards). Each phase has requirements like sets (cards with the same number) and runs (cards in sequential order). Players draw and discard cards each turn, trying to lay down their phase and then &quot;go out&quot; by discarding their last card. The game is won by the first player to complete all ten phases.</p>
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
                    
                    <div className="bg-blue-50 rounded-md p-2">
                        <h3 className="font-bold text-blue-700 mb-1 text-sm sm:text-base">🎯 Hitting</h3>
                        <p className="text-xs sm:text-sm leading-tight">After completing your phase, you can &quot;hit&quot; by adding cards to any completed phase on the table.</p>
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
    );
}

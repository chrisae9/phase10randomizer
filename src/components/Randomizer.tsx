"use client";

import { useEffect, useState } from "react";
import { Button } from "./Button";
import { getRandomPhases, Phases } from "../lib/phase10logic";
import { generateElegantUrl, parseElegantUrl, isValidElegantUrl } from "../lib/urlGenerator";
import { setupViewportHeightFix } from "../lib/viewportHeight";
import { RulesModal } from "./RulesModal";

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

    // Set up the viewport height fix for mobile browsers
    useEffect(() => {
        return setupViewportHeightFix();
    }, []);
    
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
        <div className="flex flex-col items-center gap-1.5 sm:gap-2.5 md:gap-3 py-1 sm:py-2 md:py-3 flex-grow h-full">
            <div className="text-center bg-white/95 rounded-lg p-0.5 sm:p-1 md:p-1.5 lg:p-2 shadow-inner w-full flex flex-col flex-grow">
                <div className="flex flex-col justify-center items-center space-y-0.5 sm:space-y-1 md:space-y-2 lg:space-y-2.5 xl:space-y-3 mb-1 sm:mb-1.5 md:mb-2 lg:mb-3 h-[290px] md:h-[370px] lg:h-[440px] overflow-auto">
                    {phases.map((phase, index) => (
                        <div key={index} className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-700 px-1.5 py-0.5 sm:px-2.5 md:px-3.5 lg:px-5 sm:py-1 md:py-1.5 lg:py-2.5 bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded-md shadow-sm hover:shadow-md transition-shadow flex flex-shrink-0 min-h-[24px] sm:min-h-[28px] md:min-h-[36px] lg:min-h-[42px] items-center w-full">
                            <span className="text-blue-600 font-bold mr-1.5 md:mr-2.5 lg:mr-3.5 w-4 md:w-5 lg:w-6 flex-shrink-0 text-center">{index + 1}.</span>
                            <span className="flex-1 leading-tight break-words">{phase}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full gap-1.5 sm:gap-2.5 md:gap-3 justify-between h-[40px] md:h-[45px] lg:h-[50px]">
                <Button
                    onClick={handleRandomize}
                    className="w-[49%] h-full px-1 sm:px-2 md:px-3 py-1 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base"
                >
                    🎲 Randomize
                </Button>
                <Button
                    onClick={useOfficialPhases}
                    className="w-[49%] h-full px-1 sm:px-2 md:px-3 py-1 border-2 border-gray-500 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm md:text-base"
                >
                    📋 Official
                </Button>
            </div>
            <div className="flex w-full mt-1.5 sm:mt-2 md:mt-2.5 gap-1.5 sm:gap-2.5 md:gap-3 justify-between h-[40px] md:h-[45px] lg:h-[50px]">
                <Button
                    onClick={() => setShowRules(true)}
                    className="w-[49%] h-full border-2 border-gray-500 bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-1 sm:px-2 md:px-3 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    📖 Rules
                </Button>
                <Button
                    onClick={copyURLToClipboard}
                    className={`w-[49%] h-full border-2 border-gray-500 font-bold py-1 px-1 sm:px-2 md:px-3 text-xs sm:text-sm md:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${copied ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    {copied ? '✓ Copied!' : '🔗 Copy URL'}
                </Button>
            </div>

            <RulesModal showRules={showRules} setShowRules={setShowRules} />
        </div>
    );
}

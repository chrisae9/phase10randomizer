"use client";

import { useEffect, useState, useMemo } from "react";
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

    const officialPhases = useMemo(() => [
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
    ], []);

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
    }, [officialPhases]);

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
        <div className="flex flex-col h-full overflow-hidden">
            <div className="text-center bg-white/95 rounded-lg p-2 shadow-inner flex-grow flex flex-col overflow-hidden mb-3">
                <div className="flex flex-col justify-start items-center space-y-0.5 overflow-hidden flex-grow">
                    {phases.map((phase, index) => (
                        <div key={index} className="text-xs font-semibold text-gray-700 px-2.5 py-1 bg-gradient-to-r from-blue-100 via-indigo-50 to-purple-100 rounded shadow-sm hover:shadow-md transition-shadow flex items-center w-full min-h-[28px] flex-shrink-0">
                            <span className="text-blue-600 font-bold mr-2.5 w-5 flex-shrink-0 text-center text-xs">{index + 1}.</span>
                            <span className="flex-1 leading-tight break-words">{phase}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-2">
                <Button
                    onClick={handleRandomize}
                    className="h-11 px-3 py-2 border-2 border-gray-500 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center"
                >
                    🎲 Randomize
                </Button>
                <Button
                    onClick={useOfficialPhases}
                    className="h-11 px-3 py-2 border-2 border-gray-500 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold transition-all duration-200 shadow-md hover:shadow-lg text-sm flex items-center justify-center"
                >
                    📋 Official
                </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <Button
                    onClick={() => setShowRules(true)}
                    className="h-11 border-2 border-gray-500 bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-2 text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    📖 Rules
                </Button>
                <Button
                    onClick={copyURLToClipboard}
                    className={`h-11 border-2 border-gray-500 font-bold px-3 py-2 text-sm rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center ${copied ? 'bg-green-500 text-white' : 'bg-red-500 hover:bg-red-600 text-white'}`}
                >
                    {copied ? '✓ Copied!' : '🔗 Copy URL'}
                </Button>
            </div>

            <RulesModal showRules={showRules} setShowRules={setShowRules} />
        </div>
    );
}

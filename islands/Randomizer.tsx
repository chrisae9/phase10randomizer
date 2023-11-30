import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

function randomizePhases(phaseList) {
    return Object.keys(phaseList).map(phase => {
        const challenges = phaseList[phase];
        const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
        return `${phase}) ${randomChallenge}`;
    });
}

function phasesToString(phases) {
    return phases.join(',');
}

function stringToPhases(str) {
    return str.split(',');
}

export default function Randomizer() {
    const [phases, setPhases] = useState([]);
    const [phaseList, setPhaseList] = useState({});
    const [copied, setCopied] = useState(false); // State to manage button animation


    const copyURLToClipboard = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1000); // Reset the state after 1 second
        }).catch(err => {
            console.error("Could not copy URL: ", err);
        });
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const savedPhases = params.get('phases');

        fetch('/phases.json') // Fetching from static directory
            .then(response => response.json())
            .then(data => {
                setPhaseList(data);
                if (savedPhases) {
                    setPhases(stringToPhases(savedPhases));
                } else {
                    const newPhases = randomizePhases(data);
                    setPhases(newPhases);
                    updateURL(newPhases);
                }
            });
    }, []);

    const handleRandomize = () => {
        const newPhases = randomizePhases(phaseList);
        setPhases(newPhases);
        updateURL(newPhases);
    };

    const updateURL = (newPhases) => {
        const newURL = new URL(window.location);
        newURL.searchParams.set('phases', phasesToString(newPhases));
        window.history.pushState({}, '', newURL);
    };

    return (
        <div class="flex flex-col items-center gap-4 py-6">
            <div class="text-center">
                {phases.map((phase, index) => (
                    <p key={index} class="text-xl text-white">{phase}</p>
                ))}
            </div>
            <Button
                onClick={() => setPhases(randomizePhases(phaseList))}
                class="px-4 py-2 border-2 border-gray-500 rounded bg-yellow-500 hover:bg-yellow-600 text-black font-bold transition-colors"
            >
                Randomize
            </Button>
            <div class="self-end mt-1">
                <Button
                    onClick={copyURLToClipboard}
                    class={`bg-red-500 text-white font-bold py-1 px-2 text-sm rounded transition duration-500 ${copied ? 'bg-green-500' : 'hover:bg-red-600'}`}
                >
                    {copied ? 'Copied!' : 'Copy URL'}
                </Button>
            </div>
        </div>
    );
}

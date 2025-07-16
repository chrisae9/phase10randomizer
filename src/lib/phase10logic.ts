export interface Phases {
    [key: string]: string[];
}

export function getRandomPhases(phases: Phases): string[] {
    const chosen: string[] = [];
    for (let i = 0; i < 10; i++) {
        let selection: string;
        do {
            selection = phases[(i + 1).toString()][Math.floor(Math.random() * phases[(i + 1).toString()].length)];
        } while (chosen.includes(selection));
        chosen.push(selection);
    }
    return chosen;
}

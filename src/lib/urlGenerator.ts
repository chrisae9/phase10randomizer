import { adjectives, nouns } from './wordLists';

function createHashFromPhases(phases: string[]): number {
  let hash = 0;
  const phaseString = phases.join('|');
  
  for (let i = 0; i < phaseString.length; i++) {
    const char = phaseString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash);
}

function reconstructPhasesFromHash(hash: number): string[] {
  // This is a simplified reconstruction - in a real app you'd need
  // a more sophisticated approach or store the mapping
  // For now, we'll use a deterministic phase generation based on hash
  const phases = [
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
  
  // Generate a deterministic selection based on hash
  const selectedPhases: string[] = [];
  let currentHash = hash;
  
  for (let i = 0; i < 5; i++) {
    const phaseIndex = currentHash % phases.length;
    selectedPhases.push(phases[phaseIndex]);
    currentHash = Math.floor(currentHash / phases.length);
  }
  
  return selectedPhases;
}

export function generateElegantUrl(phases: string[]): string {
  if (!phases || phases.length === 0) {
    return 'empty-phase-set';
  }
  
  const phaseHash = createHashFromPhases(phases);
  
  // Use hash to select words deterministically
  const adj1 = adjectives[phaseHash % adjectives.length];
  const adj2 = adjectives[Math.floor(phaseHash / adjectives.length) % adjectives.length];
  const noun = nouns[Math.floor(phaseHash / (adjectives.length * adjectives.length)) % nouns.length];
  
  return `${adj1}-${adj2}-${noun}`;
}

export function parseElegantUrl(slug: string): string[] | null {
  if (!slug || slug === 'empty-phase-set') {
    return [];
  }
  
  const parts = slug.split('-');
  if (parts.length !== 3) {
    return null;
  }
  
  // Find indices and reconstruct hash
  const adj1Index = adjectives.indexOf(parts[0]);
  const adj2Index = adjectives.indexOf(parts[1]);
  const nounIndex = nouns.indexOf(parts[2]);
  
  if (adj1Index === -1 || adj2Index === -1 || nounIndex === -1) {
    return null;
  }
  
  const reconstructedHash = adj1Index + (adj2Index * adjectives.length) + (nounIndex * adjectives.length * adjectives.length);
  
  return reconstructPhasesFromHash(reconstructedHash);
}

export function isValidElegantUrl(slug: string): boolean {
  return parseElegantUrl(slug) !== null;
}
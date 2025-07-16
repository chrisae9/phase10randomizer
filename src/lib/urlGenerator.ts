import { adjectives, nouns } from './wordLists';

function encodePhases(phases: string[]): string {
  // Base64 encode the phases as JSON
  const phasesJson = JSON.stringify(phases);
  if (typeof btoa !== 'undefined') {
    return btoa(phasesJson).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } else {
    // Fallback for server-side rendering
    return Buffer.from(phasesJson).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }
}

function decodePhases(encodedPhases: string): string[] {
  try {
    // Add padding back and decode
    const padded = encodedPhases.replace(/-/g, '+').replace(/_/g, '/');
    const paddedLength = padded.length + (4 - (padded.length % 4)) % 4;
    const fullPadded = padded.padEnd(paddedLength, '=');
    
    let decodedJson: string;
    if (typeof atob !== 'undefined') {
      decodedJson = atob(fullPadded);
    } else {
      // Fallback for server-side rendering
      decodedJson = Buffer.from(fullPadded, 'base64').toString();
    }
    
    return JSON.parse(decodedJson);
  } catch (error) {
    console.error('Error decoding phases:', error);
    return [];
  }
}

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

export function generateElegantUrl(phases: string[]): string {
  if (!phases || phases.length === 0) {
    return 'empty-phase-set';
  }
  
  const encodedPhases = encodePhases(phases);
  const phaseHash = createHashFromPhases(phases);
  
  // Use hash to select words deterministically for the readable part
  const adj1 = adjectives[phaseHash % adjectives.length];
  const adj2 = adjectives[Math.floor(phaseHash / adjectives.length) % adjectives.length];
  const noun = nouns[Math.floor(phaseHash / (adjectives.length * adjectives.length)) % nouns.length];
  
  return `${adj1}-${adj2}-${noun}-${encodedPhases}`;
}

export function parseElegantUrl(slug: string): string[] | null {
  if (!slug || slug === 'empty-phase-set') {
    return [];
  }
  
  const parts = slug.split('-');
  if (parts.length !== 4) {
    return null;
  }
  
  // Extract the encoded phases (last part)
  const encodedPhases = parts[3];
  const phases = decodePhases(encodedPhases);
  
  if (phases.length === 0) {
    return null;
  }
  
  return phases;
}

export function isValidElegantUrl(slug: string): boolean {
  return parseElegantUrl(slug) !== null;
}
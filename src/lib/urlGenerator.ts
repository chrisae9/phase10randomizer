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

export function generateElegantUrl(phases: string[]): string {
  if (!phases || phases.length === 0) {
    return 'empty-phase-set';
  }
  
  const phaseHash = createHashFromPhases(phases);
  
  // Use hash to select words deterministically for the readable part
  const adj1 = adjectives[phaseHash % adjectives.length];
  const adj2 = adjectives[(Math.floor(phaseHash / adjectives.length) + 7) % adjectives.length];
  const noun = nouns[(Math.floor(phaseHash / (adjectives.length * 2)) + 13) % nouns.length];
  
  const funnyUrl = `${adj1}-${adj2}-${noun}`;
  
  // Store the phases using our API
  if (typeof window !== 'undefined') {
    // Only run this on the client side
    fetch('/api/phases', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: funnyUrl, phases }),
    }).catch(error => console.error('Error storing phases:', error));
  }
  
  return funnyUrl;
}

export async function parseElegantUrl(slug: string): Promise<string[] | null> {
  if (!slug || slug === 'empty-phase-set') {
    return [];
  }
  
  try {
    // Retrieve phases using our API
    if (typeof window !== 'undefined') {
      const response = await fetch(`/api/phases?url=${slug}`);
      
      if (!response.ok) {
        throw new Error('Failed to retrieve phases');
      }
      
      const data = await response.json();
      return data.phases;
    }
    
    return null;
  } catch (error) {
    console.error("Error retrieving phases:", error);
    return null;
  }
}

export function isValidElegantUrl(slug: string): boolean {
  const parts = slug.split('-');
  // A valid elegant URL should have exactly 3 parts (adj1-adj2-noun)
  return parts.length === 3;
}
import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory cache for phases
// In a production environment, use a database
const phaseStore: { [key: string]: string[] } = {};

export async function POST(request: NextRequest) {
  try {
    const { url, phases } = await request.json();
    
    if (!url || !phases || !Array.isArray(phases)) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    
    // Store the phases with the URL as the key
    phaseStore[url] = phases;
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to store phases' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl.searchParams.get('url');
    
    if (!url) {
      return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
    }
    
    // Retrieve phases for the URL
    const phases = phaseStore[url];
    
    if (!phases) {
      return NextResponse.json({ error: 'No phases found for this URL' }, { status: 404 });
    }
    
    return NextResponse.json({ phases });
  } catch {
    return NextResponse.json({ error: 'Failed to retrieve phases' }, { status: 500 });
  }
}

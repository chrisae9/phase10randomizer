import { parseElegantUrl } from '@/lib/urlGenerator';
import Randomizer from '@/components/Randomizer';
import Image from "next/image";

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = params;
  const phases = parseElegantUrl(slug);
  
  if (phases === null) {
    return (
      <div className="font-sans flex items-center justify-center min-h-screen p-2">
        <div className="bg-white/90 rounded-lg shadow-xl p-3 w-full max-w-sm mx-auto text-center">
          <h1 className="text-lg font-bold text-red-600 mb-3">Invalid URL</h1>
          <p className="text-gray-700 mb-3 text-sm">
            This combination doesn't exist or the URL format is incorrect.
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors text-sm"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-2">
      <div className="bg-white/90 rounded-lg shadow-xl p-3 w-full max-w-sm mx-auto">
        <div className="text-center py-1">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={200}
            height={60}
            className="mx-auto max-w-full h-auto"
          />
        </div>
        <Randomizer initialPhases={phases} />
      </div>
    </div>
  );
}
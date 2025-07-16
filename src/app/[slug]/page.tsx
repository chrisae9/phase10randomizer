import { isValidElegantUrl } from '@/lib/urlGenerator';
import Randomizer from '@/components/Randomizer';
import Image from "next/image";
import { Metadata } from 'next';

interface SlugPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: SlugPageProps): Metadata {
  const { slug } = params;
  const capitalizedWords = slug.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${capitalizedWords} | Phase 10 Randomizer`,
    description: `Play Phase 10 with the ${capitalizedWords} phase set - a custom combination for a fresh challenge!`
  };
}

export default function SlugPage({ params }: SlugPageProps) {
  const { slug } = params;
  
  // Validate the URL format
  if (!isValidElegantUrl(slug)) {
    return (
      <div className="font-sans flex items-center justify-center min-h-screen p-2 sm:p-4">
        <div className="bg-white/90 rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-md mx-auto text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">Invalid URL</h1>
          <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">
            This combination doesn't exist or the URL format is incorrect.
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm sm:text-base"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-1 sm:p-2">
      <div className="bg-white/90 rounded-lg shadow-xl p-2 sm:p-3 w-full max-w-md sm:max-w-md mx-auto">
        <div className="text-center py-1">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={200}
            height={60}
            className="mx-auto max-w-full h-auto"
          />
        </div>
        <Randomizer />
      </div>
    </div>
  );
}
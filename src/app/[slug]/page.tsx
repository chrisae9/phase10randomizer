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
      <div className="font-sans flex items-center justify-center min-h-[100dvh] p-1.5 sm:p-3 box-border">
        <div className="bg-white/90 rounded-lg shadow-xl p-3 sm:p-5 w-full max-w-md mx-auto text-center">
          <h1 className="text-lg sm:text-xl font-bold text-red-600 mb-2 sm:mb-3">Invalid URL</h1>
          <p className="text-gray-700 mb-3 sm:mb-4 text-sm">
            This combination doesn't exist or the URL format is incorrect.
          </p>
          <a 
            href="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg transition-colors text-sm"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="font-sans flex items-center justify-center min-h-[100dvh] p-1 sm:p-2 box-border">
      <div className="bg-white/90 rounded-lg shadow-xl p-1.5 sm:p-3 w-full max-w-md mx-auto min-h-[480px] flex flex-col">
        <div className="text-center py-0.5 sm:py-1">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={180}
            height={54}
            className="mx-auto max-w-full h-auto"
            priority
          />
        </div>
        <div className="flex-grow flex flex-col">
          <Randomizer />
        </div>
      </div>
    </div>
  );
}
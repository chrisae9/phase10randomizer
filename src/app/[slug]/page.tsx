import { isValidElegantUrl } from '@/lib/urlGenerator';
import Randomizer from '@/components/Randomizer';
import Image from "next/image";
import Link from "next/link";
import { Metadata } from 'next';

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const capitalizedWords = slug.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${capitalizedWords} | Phase 10 Randomizer`,
    description: `Play Phase 10 with the ${capitalizedWords} phase set - a custom combination for a fresh challenge!`
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  
  // Validate the URL format
  if (!isValidElegantUrl(slug)) {
    return (
      <div className="font-sans flex items-center justify-center h-screen overflow-hidden p-0">
        <div className="bg-white/90 rounded-lg shadow-xl p-3 sm:p-5 w-[340px] h-[500px] mx-auto text-center flex flex-col justify-center">
          <h1 className="text-lg sm:text-xl font-bold text-red-600 mb-2 sm:mb-3">Invalid URL</h1>
          <p className="text-gray-700 mb-3 sm:mb-4 text-sm">
            This combination doesn&apos;t exist or the URL format is incorrect.
          </p>
          <div className="flex justify-center">
            <Link 
              href="/" 
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5 px-4 rounded-lg transition-colors text-sm w-[150px]"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="font-sans flex items-center justify-center h-screen overflow-hidden p-0">
      <div className="bg-white/90 rounded-lg shadow-xl p-1.5 sm:p-3 w-[340px] mx-auto h-[500px] flex flex-col">
        <div className="text-center h-[60px] flex items-center justify-center">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={180}
            height={54}
            className="mx-auto max-w-full h-auto"
            priority
          />
        </div>
        <div className="flex-grow flex flex-col h-[440px]">
          <Randomizer />
        </div>
      </div>
    </div>
  );
}
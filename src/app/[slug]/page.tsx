import { isValidElegantUrl } from '@/lib/urlGenerator';
import Randomizer from '@/components/Randomizer';
import Image from "next/image";
import Link from "next/link";
import ViewportHeightFix from "@/components/ViewportHeightFix";
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
    title: "Phase 10 Randomizer",
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
    <>
      <ViewportHeightFix />
      <div className="font-sans flex items-center justify-center overflow-hidden p-3 sm:p-4 md:p-6" style={{ height: "calc(var(--vh) * 100)" }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 p-3 sm:p-4 md:p-5 w-[350px] sm:w-[420px] md:w-[540px] lg:w-[640px] mx-auto flex flex-col" style={{ height: "fit-content", maxHeight: "calc(var(--vh) * 95)" }}>
          <div className="text-center h-[50px] sm:h-[55px] md:h-[65px] flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
            <Image
              src="/phase10logo.png"
              alt="Phase 10 Logo"
              width={150}
              height={45}
              className="mx-auto max-w-full h-auto sm:scale-110 md:scale-125 lg:scale-140"
              priority
            />
          </div>
          <div className="flex-grow flex flex-col overflow-hidden">
            <Randomizer />
          </div>
        </div>
      </div>
    </>
  );
}
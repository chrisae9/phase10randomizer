import Randomizer from '@/components/Randomizer';
import Image from "next/image";

export default function OfficialPhasesPage() {
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

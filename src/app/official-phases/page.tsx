import Randomizer from '@/components/Randomizer';
import Image from "next/image";

export default function OfficialPhasesPage() {
  return (
    <div className="font-sans flex items-center justify-center min-h-[100dvh] p-1 sm:p-2 box-border">
      <div className="bg-white/90 rounded-lg shadow-xl p-1.5 sm:p-3 w-full max-w-md mx-auto">
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
        <Randomizer />
      </div>
    </div>
  );
}

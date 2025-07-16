import Randomizer from "@/components/Randomizer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-1 sm:p-2">
      <div className="bg-white/90 rounded-lg shadow-xl p-2 sm:p-3 w-full max-w-lg sm:max-w-sm mx-auto">
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

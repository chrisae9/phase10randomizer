import Randomizer from "@/components/Randomizer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen">
      <div className="bg-clear rounded-lg shadow-xl p-6 max-w-md w-full">
        <div className="text-center py-4">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={300}
            height={100}
            className="mx-auto"
          />
        </div>
        <Randomizer />
      </div>
    </div>
  );
}

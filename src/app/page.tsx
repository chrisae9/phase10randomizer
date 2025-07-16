import Randomizer from "@/components/Randomizer";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen overflow-hidden p-2 sm:p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[360px] mx-auto min-h-[560px] flex flex-col h-[calc(100vh-16px)] max-h-[700px]">
        {/* Header Section - Phase 10 Logo */}
        <header className="text-center p-1 sm:p-2 flex items-center justify-center border-b border-gray-100">
          <Image
            src="/phase10logo.png"
            alt="Phase 10 Logo"
            width={160}
            height={48}
            className="mx-auto max-w-[140px] h-auto"
            priority
          />
        </header>
        
        {/* Main Content - Randomizer Component */}
        <Randomizer />
      </div>
    </div>
  );
}

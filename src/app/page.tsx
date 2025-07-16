import Randomizer from "@/components/Randomizer";
import Image from "next/image";
import ViewportHeightFix from "@/components/ViewportHeightFix";

export default function Home() {
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

import Randomizer from "@/components/Randomizer";
import Image from "next/image";
import ViewportHeightFix from "@/components/ViewportHeightFix";

export default function Home() {
  return (
    <>
      <ViewportHeightFix />
      <div className="font-sans flex items-center justify-center overflow-hidden p-2" style={{ height: "calc(var(--vh) * 100)" }}>
        <div className="bg-white/90 rounded-lg shadow-xl p-1 sm:p-2 w-full max-w-[340px] mx-auto flex flex-col" style={{ height: "min(500px, calc(var(--vh) * 90))" }}>
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
    </>
  );
}

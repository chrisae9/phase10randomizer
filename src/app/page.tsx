import Randomizer from "@/components/Randomizer";
import Image from "next/image";
import ViewportHeightFix from "@/components/ViewportHeightFix";

export default function Home() {
  return (
    <>
      <ViewportHeightFix />
      <div className="font-sans flex items-center justify-center overflow-hidden p-2 sm:p-3 md:p-4" style={{ height: "calc(var(--vh) * 100)" }}>
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl border border-white/30 p-1 sm:p-2 md:p-3 lg:p-4 w-full max-w-[340px] sm:max-w-[400px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[680px] 2xl:max-w-[720px] mx-auto flex flex-col" style={{ height: "min(720px, calc(var(--vh) * 90))" }}>
          <div className="text-center h-[60px] md:h-[70px] lg:h-[80px] xl:h-[90px] flex items-center justify-center mb-1 sm:mb-2 md:mb-3 lg:mb-4">
            <Image
              src="/phase10logo.png"
              alt="Phase 10 Logo"
              width={180}
              height={54}
              className="mx-auto max-w-full h-auto md:scale-110 lg:scale-130 xl:scale-150"
              priority
            />
          </div>
          <div className="flex-grow flex flex-col h-[440px] md:h-[500px] lg:h-[550px]">
            <Randomizer />
          </div>
        </div>
      </div>
    </>
  );
}

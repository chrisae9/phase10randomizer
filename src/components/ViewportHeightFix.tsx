"use client";

import { useEffect } from "react";
import { setupViewportHeightFix } from "@/lib/viewportHeight";

export default function ViewportHeightFix() {
  useEffect(() => {
    return setupViewportHeightFix();
  }, []);
  
  return null;
}

"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  const mobile = useMediaQuery({ query: "(max-width:767px)" });
  useEffect(() => {
    if (mobile) setIsMobile(mobile);
    if (!mobile) setIsMobile(mobile);
  }, [mobile]);
  return isMobile;
}

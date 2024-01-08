"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Detail() {
  const router = useRouter();
  const pathnName = usePathname();

  console.log(pathnName);

  return <div>Detail</div>;
}

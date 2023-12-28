"use client";
import React from "react";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import(`./_components/orderProcess`),
  {
    ssr: false,
  },
);

export default function order() {
  return (
    <main>
      <DynamicComponentWithNoSSR />
    </main>
  );
}

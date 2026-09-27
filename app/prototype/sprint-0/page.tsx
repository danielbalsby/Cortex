import type { Metadata } from "next";

import { SprintZeroPrototype } from "@/components/prototype/sprint-0/SprintZeroPrototype";

export const metadata: Metadata = {
  title: "Sprint 0 Learning Prototype · Cortex",
  description: "Isoleret Cortex-læringsprototype med udelukkende syntetiske data."
};

export default function SprintZeroPage() {
  return <SprintZeroPrototype />;
}

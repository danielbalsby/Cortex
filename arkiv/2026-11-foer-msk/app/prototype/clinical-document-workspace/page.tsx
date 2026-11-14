import type { Metadata } from "next";

import { ClinicalDocumentWorkspacePrototype } from "@/components/prototype/clinical-document-workspace/ClinicalDocumentWorkspacePrototype";

export const metadata: Metadata = {
  title: "Clinical Document Workspace Prototype v2 · Cortex",
  description:
    "Isoleret, syntetisk prototype for Cortex Clinical Document Workspace v2."
};

export default function ClinicalDocumentWorkspacePrototypePage() {
  return <ClinicalDocumentWorkspacePrototype />;
}

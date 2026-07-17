import type { Metadata } from "next";

import { ClinicalDocumentWorkspacePrototype } from "@/components/prototype/clinical-document-workspace/ClinicalDocumentWorkspacePrototype";

export const metadata: Metadata = {
  title: "Clinical Document Workspace Prototype · Cortex",
  description: "Isoleret interaktiv prototype for Cortex Clinical Document Workspace."
};

export default function ClinicalDocumentWorkspacePrototypePage() {
  return <ClinicalDocumentWorkspacePrototype />;
}

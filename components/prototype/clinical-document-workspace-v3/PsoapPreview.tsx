"use client";

import { useState } from "react";

import { formatPsoap, hasClinicalContent } from "@/clinical/prototypes/clinical-document-workspace-v3/psoap";
import type { PrototypeStateV3 } from "@/clinical/prototypes/clinical-document-workspace-v3/model";

import styles from "./ClinicalDocumentWorkspaceV3.module.css";

/**
 * Read-only PSOAP preview — the only reviewable output surface. There is no
 * separate editable draft-override here: the structured document (left
 * column) is the single place clinical content is entered/reviewed.
 */
export function PsoapPreview({ state }: { state: PrototypeStateV3 }) {
  const [copied, setCopied] = useState(false);
  const text = formatPsoap(state);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className={styles.psoapPanel} aria-labelledby="v3-psoap-title">
      <header>
        <p className={styles.eyebrow}>PSOAP</p>
        <h2 id="v3-psoap-title">Notat</h2>
        <button type="button" onClick={copy}>
          {copied ? "Kopieret" : "Kopiér PSOAP"}
        </button>
      </header>
      <pre className={styles.psoapText} aria-label="PSOAP-notat">
        {text}
      </pre>
      <p className={styles.reviewReminder}>
        {hasClinicalContent(state)
          ? "Udkast – kræver klinisk gennemgang før brug."
          : "Kun problemkontekst. Ingen kliniske oplysninger registreret endnu."}
      </p>
    </section>
  );
}

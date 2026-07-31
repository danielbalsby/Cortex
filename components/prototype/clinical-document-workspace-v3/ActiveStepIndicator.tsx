"use client";

import { useEffect, useState } from "react";

import styles from "./ClinicalDocumentWorkspaceV3.module.css";

const STEP_LABELS: Record<string, string> = {
  "v3-subjective-title": "Subjektivt",
  "v3-objective-title": "Objektivt",
  "v3-assessment-title": "Vurdering",
  "v3-plan-title": "Plan"
};

/**
 * Requirement 1: no top PSOAP step bar. Instead, show only the single
 * currently-active step, discreetly, inline in the workspace — derived from
 * scroll position via IntersectionObserver rather than a multi-step nav.
 */
export function ActiveStepIndicator() {
  const [activeLabel, setActiveLabel] = useState("Subjektivt");

  useEffect(() => {
    const targets = Object.keys(STEP_LABELS)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id && STEP_LABELS[visible.target.id]) {
          setActiveLabel(STEP_LABELS[visible.target.id]);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: [0, 0.1, 0.5] }
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <p className={styles.activeStep} role="status" aria-live="polite">
      Aktivt: {activeLabel}
    </p>
  );
}

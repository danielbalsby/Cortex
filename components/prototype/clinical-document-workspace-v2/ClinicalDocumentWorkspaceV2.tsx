"use client";

import Link from "next/link";
import { useCallback, useEffect, useReducer, useState } from "react";

import {
  buildJournalSections,
  formatJournalSections,
  hasJournalClinicalContent,
  type JournalDraftOverride
} from "@/clinical/prototypes/clinical-document-workspace-v2/journal";
import { createEmptyClinicalDocumentState } from "@/clinical/prototypes/clinical-document-workspace-v2/model";
import {
  buildCockpitView,
  getFocusElementId,
  type FocusTargetId
} from "@/clinical/prototypes/clinical-document-workspace-v2/presentation";
import { workspaceReducer } from "@/clinical/prototypes/clinical-document-workspace-v2/reducer";

import { ClinicalDocument } from "./ClinicalDocument";
import { CortexCockpit } from "./CortexCockpit";
import { JournalPanel } from "./JournalPanel";
import type { OpenPanel } from "./NarrativeSection";
import styles from "./ClinicalDocumentWorkspaceV2.module.css";

const FOCUS_ORDER: readonly FocusTargetId[] = [
  "history-situation",
  "objective-exam",
  "assessment",
  "plan",
  "journal"
];

function panelForFocus(target: FocusTargetId): OpenPanel {
  if (target === "history-trauma") return "trauma";
  if (target === "history-pain") return "pain";
  if (target === "history-function") return "function";
  if (target === "history-situation") return "situation";
  if (target === "objective-exam") return "exam";
  if (target === "assessment") return "assessment";
  if (target === "plan") return "plan";
  return null;
}

export function ClinicalDocumentWorkspaceV2() {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    undefined,
    createEmptyClinicalDocumentState
  );
  const [journalDraftOverride, setJournalDraftOverride] = useState<JournalDraftOverride>();
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);
  const [focusIndex, setFocusIndex] = useState(0);

  const cockpit = buildCockpitView(state);
  const journalSections = buildJournalSections(state);
  const journal = formatJournalSections(journalSections);

  const navigateTo = useCallback((target: FocusTargetId) => {
    const panel = panelForFocus(target);
    if (panel) setOpenPanel(panel);
    const index = FOCUS_ORDER.indexOf(
      target === "history-trauma" ||
        target === "history-pain" ||
        target === "history-function"
        ? "history-situation"
        : target
    );
    if (index >= 0) setFocusIndex(index);
    window.requestAnimationFrame(() => {
      const element = document.getElementById(getFocusElementId(target));
      if (!element) return;
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.focus({ preventScroll: true });
    });
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (event.key === "Escape") {
        setOpenPanel(null);
        return;
      }

      if (typing) return;

      if (event.key === "1") {
        event.preventDefault();
        navigateTo("history-situation");
      }
      if (event.key === "2") {
        event.preventDefault();
        navigateTo("objective-exam");
      }
      if (event.key === "3") {
        event.preventDefault();
        navigateTo("assessment");
      }
      if (event.key === "4") {
        event.preventDefault();
        navigateTo("plan");
      }
      if (event.key === "5") {
        event.preventDefault();
        navigateTo("journal");
      }
      if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        dispatch({
          type: state.normalGroup.confirmed ? "clear-normal-group" : "confirm-normal-group"
        });
      }
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        const next = (focusIndex + 1) % FOCUS_ORDER.length;
        setFocusIndex(next);
        navigateTo(FOCUS_ORDER[next]);
      }
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        const next = (focusIndex - 1 + FOCUS_ORDER.length) % FOCUS_ORDER.length;
        setFocusIndex(next);
        navigateTo(FOCUS_ORDER[next]);
      }
      if (event.key === "Enter" && !openPanel) {
        event.preventDefault();
        navigateTo(FOCUS_ORDER[focusIndex]);
        const panel = panelForFocus(FOCUS_ORDER[focusIndex]);
        if (panel) setOpenPanel(panel);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusIndex, navigateTo, openPanel, state.normalGroup.confirmed]);

  return (
    <main className={styles.shell}>
      <header className={styles.workspaceHeader}>
        <div className={styles.identity}>
          <span className={styles.brandMark} aria-hidden="true">
            C
          </span>
          <div>
            <p className={styles.eyebrow}>ISOLERET · UX-EKSPERIMENT V2</p>
            <strong>Clinical Document Workspace</strong>
            <span>Narrative-first · aktivt cockpit · Quick keyboard</span>
          </div>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.modeSwitch} role="group" aria-label="Workspace-visning">
            {(["quick", "standard"] as const).map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={state.mode === value}
                onClick={() => dispatch({ type: "set-mode", mode: value })}
              >
                {value === "quick" ? "Quick" : "Standard"}
              </button>
            ))}
          </div>
          <button
            className={styles.resetButton}
            type="button"
            onClick={() => {
              dispatch({ type: "reset" });
              setJournalDraftOverride(undefined);
              setOpenPanel(null);
            }}
          >
            Nulstil
          </button>
          <Link className={styles.linkButton} href="/prototype/clinical-document-workspace">
            Baseline workspace
          </Link>
          <Link className={styles.linkButton} href="/">
            Production encounter
          </Link>
        </div>
      </header>

      <p className={styles.keyboardHint}>
        Tastatur: <kbd>1</kbd>–<kbd>5</kbd> hop sektion · <kbd>↑</kbd>
        <kbd>↓</kbd> navigér · <kbd>Enter</kbd> åbn panel · <kbd>N</kbd> basis normal ·{" "}
        <kbd>Esc</kbd> luk
      </p>

      <div className={styles.workspace}>
        <ClinicalDocument
          state={state}
          dispatch={dispatch}
          openPanel={openPanel}
          setOpenPanel={setOpenPanel}
        />
        <aside className={styles.companionPane} aria-label="Cortex overblik og journal">
          <CortexCockpit cockpit={cockpit} onNavigate={navigateTo} />
          <JournalPanel
            generatedJournal={journal}
            draftOverride={journalDraftOverride}
            hasClinicalContent={hasJournalClinicalContent(journalSections)}
            onDraftOverrideChange={setJournalDraftOverride}
          />
        </aside>
      </div>
    </main>
  );
}

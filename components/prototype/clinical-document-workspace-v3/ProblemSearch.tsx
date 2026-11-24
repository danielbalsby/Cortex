"use client";

import { useState } from "react";

import {
  PROBLEM_PROFILES,
  searchProblemProfiles,
  type ProblemProfileId
} from "@/clinical/prototypes/clinical-document-workspace-v3/model";

import styles from "./ClinicalDocumentWorkspaceV3.module.css";

/**
 * Problem-first search. The chosen profile only steers which prototype
 * group is emphasised/focused first — it is never written into `facts` and
 * never appears as a recorded clinical fact (see model.ts).
 */
export function ProblemSearch({
  activeProfileId,
  onSelectProfile
}: {
  activeProfileId: ProblemProfileId | undefined;
  onSelectProfile: (id: ProblemProfileId) => void;
}) {
  const [query, setQuery] = useState("");
  const results = searchProblemProfiles(query);

  return (
    <section className={styles.problemSearch} aria-label="Problemsøgning">
      <label htmlFor="v3-problem-search-input">Problem</label>
      <input
        id="v3-problem-search-input"
        type="text"
        placeholder="Søg fx “knæsmerte”…"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        autoComplete="off"
      />
      {query.trim() ? (
        <ul className={styles.problemResults} aria-label="Problemprofiler">
          {results.length ? (
            results.map((profile) => (
              <li key={profile.id}>
                <button
                  type="button"
                  aria-pressed={activeProfileId === profile.id}
                  onClick={() => onSelectProfile(profile.id)}
                >
                  {profile.label}
                </button>
              </li>
            ))
          ) : (
            <li className={styles.problemResultsEmpty}>Ingen matchende profiler.</li>
          )}
        </ul>
      ) : null}
      {activeProfileId ? (
        <p className={styles.problemProfileNote} role="status">
          Profil: {PROBLEM_PROFILES.find((p) => p.id === activeProfileId)?.label ?? activeProfileId} —
          styrer kun visning, ikke kliniske facts.
        </p>
      ) : null}
    </section>
  );
}

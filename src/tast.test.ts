import { describe, expect, it } from "vitest";

import { tolkTast } from "./tast";

describe("tolkTast – startskærm", () => {
  it("åbner regioner med 1–5, eksempel med 0 og gennemgang med G", () => {
    expect(tolkTast({ key: "4" }, "felt", "start")).toEqual({ type: "aabn", maal: "knae" });
    expect(tolkTast({ key: "0" }, "felt", "start")).toEqual({ type: "aabn", maal: "eksempel" });
    expect(tolkTast({ key: "g" }, "felt", "start")).toEqual({ type: "aabn", maal: "gennemgang" });
    expect(tolkTast({ key: "9" }, "felt", "start")).toEqual({ type: "ingen" });
  });
});

describe("tolkTast – region åben", () => {
  it("tal vælger, N udfylder normalfund, pile og Enter flytter felt", () => {
    expect(tolkTast({ key: "2" }, "felt", "region")).toEqual({ type: "tal", tal: 2 });
    expect(tolkTast({ key: "n" }, "felt", "region")).toEqual({ type: "normal" });
    expect(tolkTast({ key: "ArrowDown" }, "felt", "region")).toEqual({ type: "flyt", retning: 1 });
    expect(tolkTast({ key: "ArrowUp" }, "felt", "region")).toEqual({ type: "flyt", retning: -1 });
    expect(tolkTast({ key: "Enter" }, "felt", "region")).toEqual({ type: "flyt", retning: 1 });
  });

  it("holdt N-tast (repeat) gentager ikke", () => {
    expect(tolkTast({ key: "n", repeat: true }, "felt", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "N", repeat: true }, "felt", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "n", repeat: false }, "felt", "region")).toEqual({ type: "normal" });
  });

  it("Ctrl/⌘+Z fortryder – også på startskærmen efter nulstilling, men ikke i tekstfelter eller gennemgang", () => {
    expect(tolkTast({ key: "z", ctrl: true }, "felt", "region")).toEqual({ type: "fortryd" });
    expect(tolkTast({ key: "z", meta: true }, "panel", "region")).toEqual({ type: "fortryd" });
    expect(tolkTast({ key: "z", ctrl: true }, "tekst", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "z", ctrl: true }, "felt", "start")).toEqual({ type: "fortryd" });
    expect(tolkTast({ key: "z", ctrl: true }, "felt", "gennemgang")).toEqual({ type: "ingen" });
  });

  it("V/P på et fokuseret punkt i beslutningsstøtten skriver det i notatet", () => {
    expect(tolkTast({ key: "v" }, "egen", "region")).toEqual({ type: "tilNotat" });
    expect(tolkTast({ key: "P" }, "panel", "region")).toEqual({ type: "tilNotat" });
    expect(tolkTast({ key: "v" }, "felt", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "p" }, "tekst", "region")).toEqual({ type: "ingen" });
  });

  it("tal skifter ikke region, når en region er åben", () => {
    expect(tolkTast({ key: "4" }, "felt", "region")).toEqual({ type: "tal", tal: 4 });
  });

  it("i tekstfelter skrives tal og bogstaver som tekst, men Enter går videre", () => {
    expect(tolkTast({ key: "3" }, "tekst", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "n" }, "tekst", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "Enter" }, "tekst", "region")).toEqual({ type: "flyt", retning: 1 });
  });

  // Fejlen fra revisionen 2026-11-14: Enter på "Kilderne er uenige" og kildelinks flyttede feltet.
  it("knapper, links og fold-ud-felter beholder deres egen Enter og piletaster", () => {
    for (const key of ["Enter", "ArrowDown", "ArrowUp", "2", "n"]) {
      expect(tolkTast({ key }, "egen", "region")).toEqual({ type: "ingen" });
    }
  });

  it("i beslutningsstøtten ændrer taster aldrig felterne", () => {
    for (const key of ["Enter", "ArrowDown", "3", "N"]) {
      expect(tolkTast({ key }, "panel", "region")).toEqual({ type: "ingen" });
    }
  });
});

describe("tolkTast – overalt", () => {
  it("Ctrl/Cmd+Enter kopierer, også fra tekstfelter og knapper", () => {
    expect(tolkTast({ key: "Enter", ctrl: true }, "tekst", "region")).toEqual({ type: "kopier" });
    expect(tolkTast({ key: "Enter", meta: true }, "egen", "region")).toEqual({ type: "kopier" });
  });

  it("Esc melder sig altid, så App kan nulstille ved to tryk", () => {
    expect(tolkTast({ key: "Escape" }, "panel", "region")).toEqual({ type: "esc" });
    expect(tolkTast({ key: "Escape" }, "felt", "gennemgang")).toEqual({ type: "esc" });
  });

  it("andre genvejstaster (fx Ctrl+C) og taster på gennemgangssiden gør intet", () => {
    expect(tolkTast({ key: "c", ctrl: true }, "felt", "region")).toEqual({ type: "ingen" });
    expect(tolkTast({ key: "4" }, "felt", "gennemgang")).toEqual({ type: "ingen" });
  });
});

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const styles = readFileSync("src/styles.css", "utf8");

describe("responsive modal styles", () => {
  it("uses a compact mobile modal layout that brings effect content above the fold", () => {
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*\.joker-modal \{[\s\S]*grid-template-areas:[\s\S]*"art title"[\s\S]*"meta meta"[\s\S]*"effect effect"/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*\.modal-content \{[\s\S]*display: contents;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*\.modal-art-panel \{[\s\S]*grid-area: art;[\s\S]*aspect-ratio: 5 \/ 7;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*\.effect-panel \{[\s\S]*grid-area: effect;/
    );
  });
});

import { describe, expect, it } from "vitest";
import { jokerTypeOrder } from "./jokerTypes";
import { tierLists } from "./tierLists";

describe("tier list effect copy", () => {
  it("keeps English source text separate from Korean localized data", () => {
    const items = tierLists.flatMap((tierList) => tierList.items);
    const namesIntentionallyUnchanged = new Set(["DNA"]);

    expect(items.length).toBeGreaterThan(0);

    for (const item of items) {
      expect(item.nameKo, item.nameEn).toBeTruthy();
      if (!namesIntentionallyUnchanged.has(item.nameEn)) {
        expect(item.nameKo, item.nameEn).toMatch(/[가-힣]/);
        expect(item.nameKo, item.nameEn).not.toEqual(item.nameEn);
      }
      expect(item.effectEn, item.nameEn).toBeTruthy();
      expect(item.effectKo, item.nameEn).toBeTruthy();
      expect(item.effectKo, item.nameEn).not.toMatch(/^효과 원문:/);
      expect(item.effectKo, item.nameEn).not.toMatch(/#\d+#/);
      expect(item.effectKo, item.nameEn).not.toEqual(item.effectEn);
      expect(item.effectKo, item.nameEn).toMatch(/[가-힣]/);
    }
  });

  it("uses Korean item names for representative Balatro item families", () => {
    const itemByEnglishName = new Map(
      tierLists
        .flatMap((tierList) => tierList.items)
        .map((item) => [item.nameEn, item])
    );

    expect(itemByEnglishName.get("Blueprint")?.nameKo).toBe("청사진");
    expect(itemByEnglishName.get("Yellow Deck")?.nameKo).toBe("옐로우 덱");
    expect(itemByEnglishName.get("The Fool")?.nameKo).toBe("바보");
    expect(itemByEnglishName.get("Black Hole")?.nameKo).toBe("블랙홀");
    expect(itemByEnglishName.get("Investment")?.nameKo).toBe("투자 태그");
    expect(itemByEnglishName.get("Overstock")?.nameKo).toBe("과잉 재고");
  });

  it("assigns NamuWiki-derived joker type filters to every Joker", () => {
    const jokerList = tierLists.find((tierList) => tierList.id === "jokers");
    const jokerTypes = new Set(jokerTypeOrder);

    expect(jokerList).toBeTruthy();

    for (const joker of jokerList!.items) {
      expect(joker.jokerTypes?.length, joker.nameEn).toBeGreaterThan(0);
      for (const jokerType of joker.jokerTypes ?? []) {
        expect(jokerTypes.has(jokerType), joker.nameEn).toBe(true);
      }
    }
  });

  it("keeps representative Joker type classifications available for filtering", () => {
    const jokerByEnglishName = new Map(
      tierLists
        .find((tierList) => tierList.id === "jokers")!
        .items.map((item) => [item.nameEn, item])
    );

    expect(jokerByEnglishName.get("Blueprint")?.jokerTypes).toContain("passive");
    expect(jokerByEnglishName.get("Canio")?.jokerTypes).toEqual(
      expect.arrayContaining(["multiplicativeMult", "scaling", "cardDestruction"])
    );
    expect(jokerByEnglishName.get("Golden Joker")?.jokerTypes).toContain("gold");
    expect(jokerByEnglishName.get("Hack")?.jokerTypes).toContain("retrigger");
    expect(jokerByEnglishName.get("Gros Michel")?.jokerTypes).toEqual(
      expect.arrayContaining(["additiveMult", "probability", "decay"])
    );
  });
});

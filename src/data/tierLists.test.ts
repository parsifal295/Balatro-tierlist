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

  it("keeps Blackboard and Gluttonous Joker in their corrected source tiers", () => {
    const jokerByEnglishName = new Map(
      tierLists
        .find((tierList) => tierList.id === "jokers")!
        .items.map((item) => [item.nameEn, item])
    );

    expect(jokerByEnglishName.get("Blackboard")?.tier).toBe("S");
    expect(jokerByEnglishName.get("Blackboard")?.sourcePosition).toBe("S-2");
    expect(jokerByEnglishName.get("Gluttonous Joker")?.tier).toBe("C");
    expect(jokerByEnglishName.get("Gluttonous Joker")?.sourcePosition).toBe(
      "C-33"
    );
  });

  it("keeps corrected source positions for Sly, Clever, and Jolly Joker", () => {
    const jokerList = tierLists.find((tierList) => tierList.id === "jokers")!;
    const cardAtC2 = jokerList.items.find(
      (item) => item.sourcePosition === "C-2"
    );
    const cardAtC9 = jokerList.items.find(
      (item) => item.sourcePosition === "C-9"
    );
    const cardAtD16 = jokerList.items.find(
      (item) => item.sourcePosition === "D-16"
    );

    expect(cardAtC2?.nameEn).toBe("Jolly Joker");
    expect(cardAtC2?.nameKo).toBe("쾌활한 조커");
    expect(cardAtC2?.imageSrc).toBe("/assets/jokers/jolly-joker.webp");
    expect(cardAtC2?.effectEn).toBe("+8 Mult if played hand contains a Pair");

    expect(cardAtC9?.nameEn).toBe("Sly Joker");
    expect(cardAtC9?.nameKo).toBe("교활한 조커");
    expect(cardAtC9?.imageSrc).toBe("/assets/jokers/sly-joker.webp");
    expect(cardAtC9?.effectEn).toBe("+50 Chips if played hand contains a Pair");

    expect(cardAtD16?.nameEn).toBe("Clever Joker");
    expect(cardAtD16?.nameKo).toBe("영리한 조커");
    expect(cardAtD16?.imageSrc).toBe("/assets/jokers/clever-joker.webp");
    expect(cardAtD16?.category).toBe("Chips");
    expect(cardAtD16?.effectEn).toBe(
      "+80 Chips if played hand contains a Two Pair"
    );
  });
});

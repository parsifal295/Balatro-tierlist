import { describe, expect, it } from "vitest";
import {
  getEffectText,
  getFacetLabel,
  getItemName,
  getJokerTypeLabel,
  getListCopy,
  getTierLabel,
  t
} from "./i18n";
import { tierListById } from "./data/tierLists";

describe("i18n helpers", () => {
  it("returns Korean and English app copy", () => {
    expect(t("ko").pageTitle).toBe("Balatro 티어리스트 아카이브");
    expect(t("en").pageTitle).toBe("Balatro Tier List Archive");
    expect(t("ko").reset).toBe("초기화");
    expect(t("en").reset).toBe("Reset");
  });

  it("localizes list and tier copy", () => {
    expect(getListCopy(tierListById.jokers, "ko").shortTitle).toBe("조커");
    expect(getListCopy(tierListById.jokers, "en").shortTitle).toBe("Jokers");
    expect(getTierLabel("jokers", tierListById.jokers.tiers[1], "ko")).toBe(
      "런 승리 핵심"
    );
    expect(getTierLabel("jokers", tierListById.jokers.tiers[1], "en")).toBe(
      "Run winners"
    );
  });

  it("localizes item names and keeps the English effect source selectable", () => {
    const blueprint = tierListById.jokers.items.find(
      (item) => item.nameEn === "Blueprint"
    );

    expect(blueprint).toBeTruthy();
    expect(getItemName(blueprint!, "ko")).toBe("청사진");
    expect(getItemName(blueprint!, "en")).toBe("Blueprint");
    expect(getEffectText(blueprint!, "ko")).toContain("오른쪽 조커");
    expect(getEffectText(blueprint!, "en")).toBe(
      "Copies ability of Joker to the right"
    );
  });

  it("localizes Joker type filter labels", () => {
    expect(t("ko").jokerType).toBe("조커 종류");
    expect(t("en").jokerType).toBe("Joker type");
    expect(getJokerTypeLabel("multiplicativeMult", "ko")).toBe("곱배수");
    expect(getJokerTypeLabel("cardGeneration", "en")).toBe("Card generation");
  });

  it("uses the official Korean rarity labels", () => {
    expect(getFacetLabel("Common", "ko")).toBe("일반");
    expect(getFacetLabel("Uncommon", "ko")).toBe("희귀");
    expect(getFacetLabel("Rare", "ko")).toBe("레어");
    expect(getFacetLabel("Legendary", "ko")).toBe("레전더리");
  });
});

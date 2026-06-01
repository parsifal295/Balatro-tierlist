import { describe, expect, it } from "vitest";
import type { JokerCard } from "../data/jokers";
import { filterJokers, filterTierItems } from "./filterJokers";

const sampleJokers: JokerCard[] = [
  {
    id: "blueprint",
    nameEn: "Blueprint",
    nameKo: "블루프린트",
    tier: "S+",
    imageSrc: "/assets/jokers/blueprint.webp",
    effectKo: "오른쪽 조커의 능력을 복사합니다.",
    effectEn: "Copies ability of Joker to the right",
    rarity: "Rare",
    category: "Effect",
    jokerTypes: ["passive"]
  },
  {
    id: "jolly-joker",
    nameEn: "Jolly Joker",
    tier: "D",
    imageSrc: "/assets/jokers/jolly-joker.webp",
    effectKo: "플레이한 핸드에 페어가 있으면 +8 배수.",
    effectEn: "+8 Mult if played hand contains a Pair",
    rarity: "Common",
    category: "Additive Mult",
    jokerTypes: ["additiveMult"]
  }
];

describe("filterJokers", () => {
  it("matches card names and effect text case-insensitively", () => {
    expect(filterJokers(sampleJokers, { query: "copy" })).toEqual([
      sampleJokers[0]
    ]);
    expect(filterJokers(sampleJokers, { query: "페어" })).toEqual([
      sampleJokers[1]
    ]);
  });

  it("applies tier and rarity filters together", () => {
    expect(
      filterJokers(sampleJokers, {
        query: "",
        tiers: ["S+"],
        rarities: ["Rare"]
      })
    ).toEqual([sampleJokers[0]]);
  });

  it("applies generic facet filters to non-joker tier items", () => {
    expect(
      filterTierItems(sampleJokers, {
        facets: ["Additive Mult"]
      })
    ).toEqual([sampleJokers[1]]);
  });

  it("filters jokers by assigned joker type", () => {
    expect(
      filterJokers(sampleJokers, {
        jokerTypes: ["passive"]
      })
    ).toEqual([sampleJokers[0]]);
  });
});

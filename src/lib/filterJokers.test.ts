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
    jokerTypes: ["passive"],
    guideKo: "복사 조커는 배치를 바꾸며 핵심 효과를 두 번 쓰는 운용이 중요합니다.",
    guideEn: "Copy Jokers care about positioning around the best available effect."
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
    jokerTypes: ["additiveMult"],
    guideKo: "페어 계열 핸드를 자주 만들 수 있는 덱에서 안정적으로 발동합니다.",
    guideEn: "Pair-based decks can trigger this reliably."
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

  it("matches guide summary text", () => {
    expect(filterJokers(sampleJokers, { query: "배치" })).toEqual([
      sampleJokers[0]
    ]);
    expect(filterJokers(sampleJokers, { query: "trigger this reliably" })).toEqual([
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

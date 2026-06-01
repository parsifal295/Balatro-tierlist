import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { TierItem } from "../data/tierLists";
import { TierItemDetailModal } from "./TierItemDetailModal";

const renderModal = (item: TierItem) =>
  render(
    <TierItemDetailModal
      item={item}
      itemLabel="조커"
      language="ko"
      onClose={() => undefined}
    />
  );

afterEach(() => {
  cleanup();
});

describe("TierItemDetailModal", () => {
  it("shows joker types without the legacy category field for jokers", () => {
    renderModal({
      id: "canio",
      nameEn: "Canio",
      nameKo: "카니오",
      tier: "S+",
      imageSrc: "/assets/jokers/canio.webp",
      effectKo: "페이스 카드가 파괴될 때 이 조커가 X1 배수를 얻습니다.",
      effectEn: "This Joker gains X1 Mult when a face card is destroyed",
      rarity: "Legendary",
      category: "Multiplicative Mult",
      jokerTypes: ["multiplicativeMult", "scaling", "cardDestruction"],
      sourcePosition: "S+-2"
    });

    expect(screen.queryByText("분류")).not.toBeInTheDocument();
    expect(screen.getByText("조커 종류")).toBeInTheDocument();
    expect(screen.getByText("곱배수, 성장형, 카드 파괴")).toBeInTheDocument();
  });

  it("keeps the category field for non-joker tier items", () => {
    renderModal({
      id: "deck-yellow-deck",
      nameEn: "Yellow Deck",
      nameKo: "옐로우 덱",
      tier: "S",
      imageSrc: "/assets/decks/yellow-deck.webp",
      effectKo: "추가 $10로 시작합니다.",
      effectEn: "Start with extra $10",
      category: "Deck",
      sourcePosition: "S-1"
    });

    expect(screen.getByText("분류")).toBeInTheDocument();
    expect(screen.getByText("덱")).toBeInTheDocument();
    expect(screen.queryByText("조커 종류")).not.toBeInTheDocument();
  });
});

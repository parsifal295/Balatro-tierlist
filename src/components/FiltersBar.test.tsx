import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { FiltersBar } from "./FiltersBar";

afterEach(() => {
  cleanup();
});

describe("FiltersBar", () => {
  it("renders rarity filters with game-colored rarity badges", () => {
    const { container } = render(
      <FiltersBar
        tiers={[]}
        selectedTiers={[]}
        selectedFacets={["Rare"]}
        selectedJokerTypes={[]}
        facets={["Common", "Uncommon", "Rare", "Legendary"]}
        jokerTypes={[]}
        facetLabel="희귀도"
        jokerTypeLegend="조커 종류"
        tierLegend="티어"
        language="ko"
        listId="jokers"
        getFacetLabel={(facet) => facet}
        getJokerTypeLabel={(jokerType) => jokerType}
        onTiersChange={vi.fn()}
        onFacetsChange={vi.fn()}
        onJokerTypesChange={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "일반" })).toHaveAttribute(
      "data-rarity",
      "Common"
    );
    expect(screen.getByRole("button", { name: "레어" })).toHaveAttribute(
      "data-selected",
      "true"
    );

    const badges = [...container.querySelectorAll(".rarity-badge")];
    expect(badges.map((badge) => badge.getAttribute("data-rarity"))).toEqual([
      "Common",
      "Uncommon",
      "Rare",
      "Legendary"
    ]);
  });

  it("keeps non-rarity facets as plain filter chips", () => {
    const { container } = render(
      <FiltersBar
        tiers={[]}
        selectedTiers={[]}
        selectedFacets={[]}
        selectedJokerTypes={[]}
        facets={["Deck"]}
        jokerTypes={[]}
        facetLabel="분류"
        jokerTypeLegend="조커 종류"
        tierLegend="티어"
        language="ko"
        listId="decks"
        getFacetLabel={() => "덱"}
        getJokerTypeLabel={(jokerType) => jokerType}
        onTiersChange={vi.fn()}
        onFacetsChange={vi.fn()}
        onJokerTypesChange={vi.fn()}
      />
    );

    expect(screen.getByRole("button", { name: "덱" })).toBeInTheDocument();
    expect(container.querySelector(".rarity-badge")).not.toBeInTheDocument();
  });
});

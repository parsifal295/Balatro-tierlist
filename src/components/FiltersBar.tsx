import type { Dispatch, SetStateAction } from "react";
import type { TierDefinition, TierListId } from "../data/tierLists";
import type { JokerType } from "../data/jokerTypes";
import { getTierLabel, type Language } from "../i18n";

type FiltersBarProps = {
  tiers: TierDefinition[];
  selectedTiers: string[];
  selectedFacets: string[];
  selectedJokerTypes: JokerType[];
  facets: readonly string[];
  jokerTypes: readonly JokerType[];
  facetLabel: string;
  jokerTypeLegend: string;
  tierLegend: string;
  language: Language;
  listId: TierListId;
  getFacetLabel: (facet: string) => string;
  getJokerTypeLabel: (jokerType: JokerType) => string;
  onTiersChange: Dispatch<SetStateAction<string[]>>;
  onFacetsChange: Dispatch<SetStateAction<string[]>>;
  onJokerTypesChange: Dispatch<SetStateAction<JokerType[]>>;
};

const toggleValue = <T,>(values: T[], value: T) =>
  values.includes(value)
    ? values.filter((currentValue) => currentValue !== value)
    : [...values, value];

export function FiltersBar({
  tiers,
  selectedTiers,
  selectedFacets,
  selectedJokerTypes,
  facets,
  jokerTypes,
  facetLabel,
  jokerTypeLegend,
  tierLegend,
  language,
  listId,
  getFacetLabel,
  getJokerTypeLabel,
  onTiersChange,
  onFacetsChange,
  onJokerTypesChange
}: FiltersBarProps) {
  return (
    <div className="filters-grid">
      <fieldset>
        <legend>{tierLegend}</legend>
        <div className="chip-row">
          {tiers.map((tier) => {
            const isSelected = selectedTiers.includes(tier.id);

            return (
              <button
                key={tier.id}
                className="filter-chip"
                data-selected={isSelected}
                type="button"
                aria-pressed={isSelected}
                onClick={() =>
                  onTiersChange((currentTiers) =>
                    toggleValue(currentTiers, tier.id)
                  )
                }
              >
                <span>{tier.id}</span>
                <small>{getTierLabel(listId, tier, language)}</small>
              </button>
            );
          })}
        </div>
      </fieldset>

      {facets.length > 0 && (
        <fieldset>
          <legend>{facetLabel}</legend>
          <div className="chip-row">
            {facets.map((facet) => {
              const isSelected = selectedFacets.includes(facet);

              return (
                <button
                  key={facet}
                  className="filter-chip rarity-chip"
                  data-rarity={facet}
                  data-selected={isSelected}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    onFacetsChange((currentFacets) =>
                      toggleValue(currentFacets, facet)
                    )
                  }
                >
                  {getFacetLabel(facet)}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {jokerTypes.length > 0 && (
        <fieldset className="wide-filter">
          <legend>{jokerTypeLegend}</legend>
          <div className="chip-row">
            {jokerTypes.map((jokerType) => {
              const isSelected = selectedJokerTypes.includes(jokerType);

              return (
                <button
                  key={jokerType}
                  className="filter-chip joker-type-chip"
                  data-selected={isSelected}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() =>
                    onJokerTypesChange((currentJokerTypes) =>
                      toggleValue(currentJokerTypes, jokerType)
                    )
                  }
                >
                  {getJokerTypeLabel(jokerType)}
                </button>
              );
            })}
          </div>
        </fieldset>
      )}
    </div>
  );
}

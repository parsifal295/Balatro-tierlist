import { useEffect, useMemo, useState } from "react";
import { Filter, RotateCcw, Search } from "lucide-react";
import { FiltersBar } from "./components/FiltersBar";
import { TierItemDetailModal } from "./components/TierItemDetailModal";
import { TierRow } from "./components/TierRow";
import {
  defaultTierListId,
  tierListById,
  tierLists,
  type TierItem,
  type TierListId
} from "./data/tierLists";
import { jokerTypeOrder, type JokerType } from "./data/jokerTypes";
import {
  getFacetLabel,
  getFacetLegend,
  getJokerTypeLabel,
  getListCopy,
  languages,
  t,
  type Language
} from "./i18n";
import { filterTierItems } from "./lib/filterJokers";

function App() {
  const [language, setLanguage] = useState<Language>("ko");
  const [selectedListId, setSelectedListId] =
    useState<TierListId>(defaultTierListId);
  const [query, setQuery] = useState("");
  const [selectedTiers, setSelectedTiers] = useState<string[]>([]);
  const [selectedFacets, setSelectedFacets] = useState<string[]>([]);
  const [selectedJokerTypes, setSelectedJokerTypes] = useState<JokerType[]>([]);
  const [selectedItem, setSelectedItem] = useState<TierItem | null>(null);

  const currentList = tierListById[selectedListId];
  const copy = t(language);
  const currentListCopy = getListCopy(currentList, language);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const availableFacets = useMemo(() => {
    if (!currentList.facetKey) {
      return [];
    }

    const values = Array.from(
      new Set(
        currentList.items
          .map((item) => item[currentList.facetKey!])
          .filter((value): value is string => Boolean(value))
      )
    );

    if (!currentList.facetOrder) {
      return values.sort((left, right) => left.localeCompare(right));
    }

    return values.sort((left, right) => {
      const leftIndex = currentList.facetOrder?.indexOf(left) ?? -1;
      const rightIndex = currentList.facetOrder?.indexOf(right) ?? -1;

      if (leftIndex === -1 && rightIndex === -1) {
        return left.localeCompare(right);
      }

      if (leftIndex === -1) {
        return 1;
      }

      if (rightIndex === -1) {
        return -1;
      }

      return leftIndex - rightIndex;
    });
  }, [currentList]);

  const availableJokerTypes = currentList.id === "jokers" ? jokerTypeOrder : [];

  const filteredItems = useMemo(
    () =>
      filterTierItems(currentList.items, {
        query,
        tiers: selectedTiers,
        facets: selectedFacets,
        jokerTypes: selectedJokerTypes
      }),
    [currentList.items, query, selectedFacets, selectedJokerTypes, selectedTiers]
  );

  const visibleTiers = useMemo(
    () =>
      selectedTiers.length > 0
        ? currentList.tiers.filter((tier) => selectedTiers.includes(tier.id))
        : currentList.tiers,
    [currentList.tiers, selectedTiers]
  );

  const groupedItems = useMemo(() => {
    return visibleTiers.map((tier) => ({
      tier,
      cards: filteredItems.filter((item) => item.tier === tier.id),
      totalInTier: currentList.items.filter((item) => item.tier === tier.id)
        .length
    }));
  }, [currentList.items, filteredItems, visibleTiers]);

  const resetFilters = () => {
    setQuery("");
    setSelectedTiers([]);
    setSelectedFacets([]);
    setSelectedJokerTypes([]);
  };

  const selectTierList = (tierListId: TierListId) => {
    setSelectedListId(tierListId);
    setSelectedItem(null);
    setQuery("");
    setSelectedTiers([]);
    setSelectedFacets([]);
    setSelectedJokerTypes([]);
  };

  return (
    <main className="app-shell">
      <section className="page-header" aria-labelledby="page-title">
        <div>
          <h1 id="page-title">{copy.pageTitle}</h1>
        </div>
        <div className="header-side">
          <div className="language-switcher" aria-label={copy.languageLabel}>
            {languages.map((option) => (
              <button
                key={option.id}
                type="button"
                data-selected={language === option.id}
                aria-pressed={language === option.id}
                onClick={() => setLanguage(option.id)}
              >
                <span>{option.shortLabel}</span>
                <small>{option.label}</small>
              </button>
            ))}
          </div>
          <div className="summary-strip" aria-label="Tier list summary">
            <span>
              <strong>{tierLists.length}</strong>
              {copy.lists}
            </span>
            <span>
              <strong>{currentList.items.length}</strong>
              {currentListCopy.itemLabel}
            </span>
            <span>
              <strong>{filteredItems.length}</strong>
              {copy.visible}
            </span>
          </div>
        </div>
      </section>

      <nav className="list-tabs" aria-label="Tier list categories">
        {tierLists.map((tierList) => {
          const isSelected = selectedListId === tierList.id;

          return (
            <button
              key={tierList.id}
              className="list-tab"
              data-selected={isSelected}
              type="button"
              aria-pressed={isSelected}
              onClick={() => selectTierList(tierList.id)}
            >
              <span>{getListCopy(tierList, language).shortTitle}</span>
              <small>{tierList.items.length}</small>
            </button>
          );
        })}
      </nav>

      <section className="active-list-panel" aria-labelledby="active-list-title">
        <div>
          <h2 id="active-list-title">{currentListCopy.title}</h2>
          <p>{currentListCopy.description}</p>
        </div>
        <a href={currentList.metadataSource} target="_blank" rel="noreferrer">
          {copy.metadataSource}
        </a>
      </section>

      <section className="control-surface" aria-label={copy.searchAndFilters}>
        <div className="search-field">
          <Search aria-hidden="true" size={18} />
          <input
            aria-label={copy.searchLabel(currentListCopy.itemLabel)}
            placeholder={copy.searchPlaceholder(currentListCopy.itemLabel)}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        <div className="control-actions">
          <span className="filter-label">
            <Filter aria-hidden="true" size={16} />
            {copy.filters}
          </span>
          <button className="ghost-button" type="button" onClick={resetFilters}>
            <RotateCcw aria-hidden="true" size={16} />
            {copy.reset}
          </button>
        </div>
        <FiltersBar
          facets={availableFacets}
          facetLabel={getFacetLegend(currentList.facetLabel ?? "Type", language)}
          getFacetLabel={(facet) => getFacetLabel(facet, language)}
          getJokerTypeLabel={(jokerType) => getJokerTypeLabel(jokerType, language)}
          jokerTypeLegend={copy.jokerType}
          jokerTypes={availableJokerTypes}
          tierLegend={copy.tier}
          language={language}
          listId={currentList.id}
          selectedFacets={selectedFacets}
          selectedJokerTypes={selectedJokerTypes}
          selectedTiers={selectedTiers}
          tiers={currentList.tiers}
          onFacetsChange={setSelectedFacets}
          onJokerTypesChange={setSelectedJokerTypes}
          onTiersChange={setSelectedTiers}
        />
      </section>

      <section className="tier-list" aria-label={`${currentListCopy.title} rows`}>
        {groupedItems.map(({ tier, cards, totalInTier }) => (
          <TierRow
            key={tier.id}
            cards={cards}
            itemLabel={currentListCopy.itemLabel}
            language={language}
            listId={currentList.id}
            tier={tier}
            totalInTier={totalInTier}
            onSelectCard={setSelectedItem}
          />
        ))}
      </section>

      {filteredItems.length === 0 && (
        <section className="empty-state" aria-live="polite">
          <h2>{copy.noItemsFound}</h2>
          <p>{copy.emptyMessage}</p>
        </section>
      )}

      <TierItemDetailModal
        item={selectedItem}
        itemLabel={currentListCopy.itemLabel}
        language={language}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
}

export default App;

export type FilterableTierItem = {
  nameKo?: string;
  nameEn: string;
  tier: string;
  effectKo: string;
  effectEn?: string;
  rarity?: string;
  category?: string;
  jokerTypes?: readonly string[];
  notes?: string;
};

export type TierItemFilters = {
  query?: string;
  tiers?: string[];
  facets?: string[];
  jokerTypes?: string[];
  rarities?: string[];
  categories?: string[];
};

const normalize = (value: string) => value.trim().toLocaleLowerCase();

const queryVariants = (query: string) => {
  const variants = new Set([query]);

  if (query.endsWith("y") && query.length > 2) {
    variants.add(`${query.slice(0, -1)}ies`);
  }

  return [...variants];
};

export function filterTierItems<T extends FilterableTierItem>(
  items: T[],
  {
    query = "",
    tiers = [],
    facets = [],
    jokerTypes = [],
    rarities = [],
    categories = []
  }: TierItemFilters
) {
  const normalizedQuery = normalize(query);
  const tierSet = new Set(tiers);
  const facetSet = new Set(facets);
  const jokerTypeSet = new Set(jokerTypes);
  const raritySet = new Set(rarities);
  const categorySet = new Set(categories);

  return items.filter((item) => {
    const matchesTier = tierSet.size === 0 || tierSet.has(item.tier);
    const matchesFacet =
      facetSet.size === 0 ||
      (item.rarity !== undefined && facetSet.has(item.rarity)) ||
      (item.category !== undefined && facetSet.has(item.category));
    const matchesRarity =
      raritySet.size === 0 ||
      (item.rarity !== undefined && raritySet.has(item.rarity));
    const matchesCategory =
      categorySet.size === 0 ||
      (item.category !== undefined && categorySet.has(item.category));
    const matchesJokerType =
      jokerTypeSet.size === 0 ||
      item.jokerTypes?.some((jokerType) => jokerTypeSet.has(jokerType));

    if (
      !matchesTier ||
      !matchesFacet ||
      !matchesRarity ||
      !matchesCategory ||
      !matchesJokerType
    ) {
      return false;
    }

    if (normalizedQuery.length === 0) {
      return true;
    }

    const searchableText = [
      item.nameEn,
      item.nameKo,
      item.effectKo,
      item.effectEn,
      item.rarity,
      item.category,
      ...(item.jokerTypes ?? []),
      item.notes
    ]
      .filter(Boolean)
      .join(" ");

    const normalizedSearchableText = normalize(searchableText);

    return queryVariants(normalizedQuery).some((variant) =>
      normalizedSearchableText.includes(variant)
    );
  });
}

export const filterJokers = filterTierItems;

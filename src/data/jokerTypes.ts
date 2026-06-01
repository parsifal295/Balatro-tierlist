export const jokerTypeOrder = [
  "chips",
  "additiveMult",
  "multiplicativeMult",
  "gold",
  "retrigger",
  "scaling",
  "decay",
  "probability",
  "cardGeneration",
  "cardDestruction",
  "passive"
] as const;

export type JokerType = (typeof jokerTypeOrder)[number];

export const jokerTypeLabels: Record<
  JokerType,
  {
    ko: string;
    en: string;
  }
> = {
  chips: { ko: "칩 증가", en: "Chip gain" },
  additiveMult: { ko: "합배수", en: "Additive Mult" },
  multiplicativeMult: { ko: "곱배수", en: "Multiplicative Mult" },
  gold: { ko: "골드", en: "Gold" },
  retrigger: { ko: "리트리거", en: "Retrigger" },
  scaling: { ko: "성장형", en: "Scaling" },
  decay: { ko: "체감형", en: "Decaying" },
  probability: { ko: "확률", en: "Probability" },
  cardGeneration: { ko: "카드 생성", en: "Card generation" },
  cardDestruction: { ko: "카드 파괴", en: "Card destruction" },
  passive: { ko: "패시브형", en: "Passive" }
};

const categoryTypeMap: Record<string, JokerType[]> = {
  Chips: ["chips"],
  "Additive Mult": ["additiveMult"],
  "Multiplicative Mult": ["multiplicativeMult"],
  "+$": ["gold"],
  "+ +": ["chips", "additiveMult"],
  Retrigger: ["retrigger"],
  Effect: ["passive"],
  Utility: ["passive"],
  "Joker Creation": ["cardGeneration"]
};

const uniqueTypes = (types: Iterable<JokerType>) => {
  const typeSet = new Set(types);

  return jokerTypeOrder.filter((type) => typeSet.has(type));
};

export function getJokerTypes({
  nameEn,
  effectEn,
  category
}: {
  nameEn: string;
  effectEn?: string;
  category?: string;
}) {
  const effect = effectEn ?? "";
  const normalizedEffect = effect.toLowerCase();
  const types: JokerType[] = [...(categoryTypeMap[category ?? ""] ?? [])];

  if (/\bchips?\b/i.test(effect)) {
    types.push("chips");
  }

  if (
    /\+\d+(?:\.\d+)?\s*mult/i.test(effect) ||
    /adds? .* to .*mult/i.test(effect)
  ) {
    types.push("additiveMult");
  }

  if (/\bx\d+(?:\.\d+)?\s*mult/i.test(effect)) {
    types.push("multiplicativeMult");
  }

  if (
    /\$|money|earn|interest|sell value|debt|free reroll|free .*shop/i.test(
      effect
    )
  ) {
    types.push("gold");
  }

  if (/retrigger/i.test(effect)) {
    types.push("retrigger");
  }

  if (
    /this joker gains|gains? [+$x]|\(currently|payout increases|per .* this run|per consecutive|per .* used|per reroll|per card sold|per discarded|per .* in your full deck|per .* you have|per remaining|per empty|per unique|per blind skipped/i.test(
      effect
    )
  ) {
    types.push("scaling");
  }

  if (
    /loses|reduces by|-\d+ .*per|chance this card is destroyed|self destructs|next 10 hands/i.test(
      effect
    )
  ) {
    types.push("decay");
  }

  if (/chance|1 in|random|probabilities/i.test(effect)) {
    types.push("probability");
  }

  if (
    /create|creates|duplicate|add a .*card|add .*to .*deck|permanent copy|negative copy|stone card to the deck/i.test(
      normalizedEffect
    )
  ) {
    types.push("cardGeneration");
  }

  if (/destroy|destroyed|removes card enhancement/i.test(effect)) {
    types.push("cardDestruction");
  }

  if (
    /copies ability|copies the ability|allows|count as|considered face cards|disables effect|prevent|hand size|discard each round|hands and lose|reroll|all .*can be made|all .*counts|may appear multiple times|go up to|sell this card|free double tag/i.test(
      effect
    )
  ) {
    types.push("passive");
  }

  const finalTypes = uniqueTypes(types);

  if (finalTypes.length > 0) {
    return finalTypes;
  }

  return uniqueTypes([nameEn === "Joker" ? "additiveMult" : "passive"]);
}

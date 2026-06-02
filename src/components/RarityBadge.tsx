import type { Language } from "../i18n";

const rarityLabels = {
  Common: { ko: "일반", en: "Common" },
  Uncommon: { ko: "희귀", en: "Uncommon" },
  Rare: { ko: "레어", en: "Rare" },
  Legendary: { ko: "레전더리", en: "Legendary" }
} as const;

export type RarityName = keyof typeof rarityLabels;

export function isRarityName(value: string | undefined): value is RarityName {
  return value !== undefined && value in rarityLabels;
}

export function getRarityBadgeLabel(rarity: RarityName, language: Language) {
  const label = rarityLabels[rarity];

  return language === "ko" ? label.ko : label.en;
}

type RarityBadgeProps = {
  rarity: RarityName;
  language: Language;
};

export function RarityBadge({ rarity, language }: RarityBadgeProps) {
  return (
    <span className="rarity-badge" data-rarity={rarity}>
      {getRarityBadgeLabel(rarity, language)}
    </span>
  );
}

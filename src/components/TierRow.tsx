import type { CSSProperties } from "react";
import type { TierDefinition, TierItem, TierListId } from "../data/tierLists";
import { getTierLabel, type Language } from "../i18n";
import { TierItemCard } from "./TierItemCard";

type TierRowProps = {
  tier: TierDefinition;
  cards: TierItem[];
  itemLabel: string;
  language: Language;
  listId: TierListId;
  totalInTier: number;
  onSelectCard: (item: TierItem) => void;
};

export function TierRow({
  tier,
  cards,
  itemLabel,
  language,
  listId,
  totalInTier,
  onSelectCard
}: TierRowProps) {
  const tierDomId = `tier-${tier.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const labelStyle = {
    "--tier-accent": tier.accent,
    "--tier-text": tier.textColor ?? "#11100e"
  } as CSSProperties;

  return (
    <section
      className="tier-row"
      data-tier={tier.id}
      style={labelStyle}
      aria-labelledby={tierDomId}
    >
      <div className="tier-label">
        <h2 id={tierDomId}>{tier.id}</h2>
        <p>{getTierLabel(listId, tier, language)}</p>
        <span>
          {cards.length}/{totalInTier}
        </span>
      </div>
      <div className="tier-card-grid">
        {cards.map((item) => (
          <TierItemCard
            key={item.id}
            item={item}
            itemLabel={itemLabel}
            language={language}
            onSelect={onSelectCard}
          />
        ))}
      </div>
    </section>
  );
}

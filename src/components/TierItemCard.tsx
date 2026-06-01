import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import type { TierItem } from "../data/tierLists";
import { getItemName, t, type Language } from "../i18n";

type TierItemCardProps = {
  item: TierItem;
  itemLabel: string;
  language: Language;
  onSelect: (item: TierItem) => void;
};

const getInitials = (name: string) =>
  name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export function TierItemCard({
  item,
  itemLabel,
  language,
  onSelect
}: TierItemCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const copy = t(language);
  const displayName = getItemName(item, language);

  return (
    <button
      className="joker-card"
      type="button"
      aria-label={copy.openDetails(displayName, item.tier, itemLabel)}
      onClick={() => onSelect(item)}
    >
      <span className="joker-art-shell" aria-hidden="true">
        {!imageFailed ? (
          <img src={item.imageSrc} alt="" onError={() => setImageFailed(true)} />
        ) : (
          <span className="joker-fallback">{getInitials(displayName)}</span>
        )}
        {item.uncertain && (
          <span className="uncertain-badge" title={copy.uncertainTitle}>
            <AlertTriangle size={12} aria-hidden="true" />
          </span>
        )}
      </span>
      <span className="joker-name-chip">{displayName}</span>
    </button>
  );
}

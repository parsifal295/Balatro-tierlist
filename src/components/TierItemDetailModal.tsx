import { useEffect, useRef, useState } from "react";
import { AlertTriangle, BadgeInfo, Copy, Sparkles, X } from "lucide-react";
import type { TierItem } from "../data/tierLists";
import {
  getEffectText,
  getFacetLabel,
  getItemName,
  getJokerTypeLabel,
  getNotesText,
  t,
  type Language
} from "../i18n";

type TierItemDetailModalProps = {
  item: TierItem | null;
  itemLabel: string;
  language: Language;
  onClose: () => void;
};

const focusableSelector =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function TierItemDetailModal({
  item,
  itemLabel,
  language,
  onClose
}: TierItemDetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    setImageFailed(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) {
      return;
    }

    const previousActiveElement = document.activeElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)
      );

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");

      if (previousActiveElement instanceof HTMLElement) {
        previousActiveElement.focus();
      }
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const copy = t(language);
  const displayName = getItemName(item, language);
  const effectText = getEffectText(item, language);
  const notesText = getNotesText(item.notes, language);
  const jokerTypes = item.jokerTypes ?? [];
  const hasJokerTypes = jokerTypes.length > 0;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        aria-labelledby="item-modal-title"
        aria-modal="true"
        className="joker-modal"
        role="dialog"
      >
        <button
          ref={closeButtonRef}
          className="icon-button modal-close"
          type="button"
          aria-label={copy.closeDetails(itemLabel)}
          onClick={onClose}
        >
          <X aria-hidden="true" size={20} />
        </button>

        <div className="modal-art-panel">
          {!imageFailed ? (
            <img
              src={item.imageSrc}
              alt={`${displayName} artwork`}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="modal-fallback" aria-label={copy.imageUnavailable}>
              {displayName}
            </div>
          )}
        </div>

        <div className="modal-content">
          <div className="modal-title-row">
            <div>
              <p className="eyebrow">
                {copy.tier} {item.tier}
              </p>
              <h2 id="item-modal-title">{displayName}</h2>
              {displayName !== item.nameEn && (
                <p className="modal-subtitle">{item.nameEn}</p>
              )}
            </div>
            {item.uncertain && (
              <span className="modal-warning">
                <AlertTriangle aria-hidden="true" size={16} />
                {copy.uncertain}
              </span>
            )}
          </div>

          <dl className="detail-grid">
            <div>
              <dt>{copy.tier}</dt>
              <dd>{item.tier}</dd>
            </div>
            <div>
              <dt>{copy.rarity}</dt>
              <dd>
                {item.rarity ? getFacetLabel(item.rarity, language) : copy.notAvailable}
              </dd>
            </div>
            {!hasJokerTypes && (
              <div>
                <dt>{copy.type}</dt>
                <dd>
                  {item.category
                    ? getFacetLabel(item.category, language)
                    : copy.unknown}
                </dd>
              </div>
            )}
            {hasJokerTypes && (
              <div>
                <dt>{copy.jokerType}</dt>
                <dd>
                  {jokerTypes
                    .map((jokerType) => getJokerTypeLabel(jokerType, language))
                    .join(", ")}
                </dd>
              </div>
            )}
            <div>
              <dt>{copy.sourceSlot}</dt>
              <dd>{item.sourcePosition ?? copy.untracked}</dd>
            </div>
          </dl>

          <section className="effect-panel">
            <h3>
              <Sparkles aria-hidden="true" size={17} />
              {copy.effect}
            </h3>
            <p>{effectText}</p>
            {language === "ko" && item.effectEn && (
              <p className="effect-source">
                <strong>{copy.englishSource}</strong>
                {item.effectEn}
              </p>
            )}
          </section>

          {notesText && (
            <section className="notes-panel">
              <h3>
                <BadgeInfo aria-hidden="true" size={17} />
                {copy.notes}
              </h3>
              <p>{notesText}</p>
            </section>
          )}

          <button
            className="copy-button"
            type="button"
            onClick={() => {
              void navigator.clipboard?.writeText(
                `${displayName} (${item.tier}) - ${effectText}`
              );
            }}
          >
            <Copy aria-hidden="true" size={16} />
            {copy.copySummary}
          </button>
        </div>
      </div>
    </div>
  );
}

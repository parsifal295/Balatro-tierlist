import type { TierDefinition, TierItem, TierList, TierListId } from "./data/tierLists";
import { translateEffect } from "./data/effectTranslations";
import {
  jokerTypeLabels,
  type JokerType
} from "./data/jokerTypes";

export type Language = "ko" | "en";

export const languages: Array<{
  id: Language;
  label: string;
  shortLabel: string;
}> = [
  { id: "ko", label: "한국어", shortLabel: "KO" },
  { id: "en", label: "English", shortLabel: "EN" }
];

const uiCopy = {
  ko: {
    pageTitle: "Balatro 티어리스트 아카이브",
    languageLabel: "언어",
    lists: "리스트",
    visible: "표시 중",
    metadataSource: "메타데이터 출처",
    searchAndFilters: "검색 및 필터",
    searchPlaceholder: (itemLabel: string) =>
      `${itemLabel}, 효과, 분류 검색...`,
    searchLabel: (itemLabel: string) => `${itemLabel} 이름 또는 효과 검색`,
    filters: "필터",
    reset: "초기화",
    tier: "티어",
    jokerType: "조커 종류",
    noItemsFound: "항목이 없습니다",
    emptyMessage: "검색어 또는 필터를 조정하면 항목이 다시 표시됩니다.",
    closeDetails: (itemLabel: string) => `${itemLabel} 상세 정보 닫기`,
    openDetails: (name: string, tier: string, itemLabel: string) =>
      `${name}, ${tier} 티어. ${itemLabel} 상세 정보 열기.`,
    uncertain: "확인 필요",
    uncertainTitle: "티어 배치 확인 필요",
    imageUnavailable: "이미지를 불러올 수 없음",
    rarity: "희귀도",
    type: "분류",
    sourceSlot: "원본 위치",
    unknown: "알 수 없음",
    notAvailable: "해당 없음",
    untracked: "기록 없음",
    effect: "효과",
    englishSource: "영문 원문",
    notes: "메모",
    copySummary: "항목 요약 복사",
    copiedFallback: "요약 복사"
  },
  en: {
    pageTitle: "Balatro Tier List Archive",
    languageLabel: "Language",
    lists: "Lists",
    visible: "Visible",
    metadataSource: "Metadata source",
    searchAndFilters: "Search and filters",
    searchPlaceholder: (itemLabel: string) =>
      `Search ${itemLabel.toLowerCase()}, effect, type...`,
    searchLabel: (itemLabel: string) => `Search ${itemLabel} by name or effect`,
    filters: "Filters",
    reset: "Reset",
    tier: "Tier",
    jokerType: "Joker type",
    noItemsFound: "No items found",
    emptyMessage: "Adjust the search query or filters to show items again.",
    closeDetails: (itemLabel: string) => `Close ${itemLabel} details`,
    openDetails: (name: string, tier: string, itemLabel: string) =>
      `${name}, ${tier} tier. Open ${itemLabel} details.`,
    uncertain: "Needs check",
    uncertainTitle: "Tier placement uncertain",
    imageUnavailable: "Image unavailable",
    rarity: "Rarity",
    type: "Type",
    sourceSlot: "Source slot",
    unknown: "Unknown",
    notAvailable: "N/A",
    untracked: "Untracked",
    effect: "Effect",
    englishSource: "English source",
    notes: "Notes",
    copySummary: "Copy item summary",
    copiedFallback: "Copy summary"
  }
} as const;

const listCopy: Record<
  TierListId,
  {
    title: Record<Language, string>;
    shortTitle: Record<Language, string>;
    description: Record<Language, string>;
    itemLabel: Record<Language, string>;
  }
> = {
  jokers: {
    title: { ko: "조커 티어리스트", en: "Joker Tier List" },
    shortTitle: { ko: "조커", en: "Jokers" },
    description: {
      ko: "조커 카드의 런 승리 기여도와 빌드 중심성을 기준으로 재구성한 티어리스트",
      en: "A tier list rebuilt around Joker cards, run-winning value, and build-around strength."
    },
    itemLabel: { ko: "조커", en: "Jokers" }
  },
  decks: {
    title: { ko: "덱 티어리스트", en: "Deck Tier List" },
    shortTitle: { ko: "덱", en: "Decks" },
    description: {
      ko: "덱별 시작 조건과 운영 난이도 기준 티어리스트",
      en: "A tier list based on deck starting conditions and run management difficulty."
    },
    itemLabel: { ko: "덱", en: "Decks" }
  },
  planets: {
    title: { ko: "행성 카드 티어리스트", en: "Planet Card Tier List" },
    shortTitle: { ko: "행성", en: "Planets" },
    description: {
      ko: "포커 핸드 레벨업 효율 기준 행성 카드 티어리스트",
      en: "A tier list for Planet cards based on poker-hand upgrade efficiency."
    },
    itemLabel: { ko: "행성 카드", en: "Planet Cards" }
  },
  tarots: {
    title: { ko: "타로 카드 티어리스트", en: "Tarot Card Tier List" },
    shortTitle: { ko: "타로", en: "Tarots" },
    description: {
      ko: "덱 조작, 돈, 조커 생성 효과 중심 타로 카드 티어리스트",
      en: "A Tarot card tier list focused on deck manipulation, economy, and Joker creation."
    },
    itemLabel: { ko: "타로 카드", en: "Tarot Cards" }
  },
  tags: {
    title: { ko: "태그 티어리스트", en: "Tag Tier List" },
    shortTitle: { ko: "태그", en: "Tags" },
    description: {
      ko: "블라인드 스킵 보상 태그의 기대값 기준 티어리스트",
      en: "A tier list for Blind-skip reward Tags based on expected value."
    },
    itemLabel: { ko: "태그", en: "Tags" }
  },
  vouchers: {
    title: { ko: "바우처 티어리스트", en: "Voucher Tier List" },
    shortTitle: { ko: "바우처", en: "Vouchers" },
    description: {
      ko: "상점 바우처의 구매 우선순위와 위험도 기준 티어리스트",
      en: "A Voucher tier list based on shop purchase priority and downside risk."
    },
    itemLabel: { ko: "바우처", en: "Vouchers" }
  },
  spectrals: {
    title: { ko: "스펙트럴 카드 티어리스트", en: "Spectral Card Tier List" },
    shortTitle: { ko: "스펙트럴", en: "Spectrals" },
    description: {
      ko: "고위험 고보상 스펙트럴 카드의 상황별 가치 티어리스트",
      en: "A tier list for high-risk, high-reward Spectral cards and their situational value."
    },
    itemLabel: { ko: "스펙트럴 카드", en: "Spectral Cards" }
  }
};

const tierLabelKo: Record<TierListId, Record<string, string>> = {
  jokers: {
    "S+": "압도적",
    S: "런 승리 핵심",
    A: "강력 / 빌드 중심",
    B: "좋음",
    C: "실전 가능 / 상황 의존",
    D: "평균 이하 / 매우 상황 의존",
    E: "약함",
    F: "거의 쓸모 없음"
  },
  decks: {
    S: "매우 강함",
    A: "강함",
    B: "평균",
    C: "평균보다 약간 낮음",
    D: "약함",
    "ULTRAF-": "극도로 약함"
  },
  planets: {
    "S+": "사기급",
    S: "의도적으로 비워둔 구간",
    A: "저비용 페어 대안",
    B: "좋음",
    C: "실전 가능",
    D: "사용 난이도 높음",
    E: "대체로 다른 선택지보다 열세"
  },
  tarots: {
    S: "최상급 가치",
    A: "강함",
    B: "좋음",
    C: "상황 의존",
    D: "낮은 영향력",
    E: "약함"
  },
  tags: {
    "Ante 1": "앤티 1 스몰 블라인드 스킵 후보",
    Desperation: "위기 상황 스킵 후보",
    Anaglyph: "Anaglyph 덱에서 좋을 수 있음",
    Overrated: "생각보다 좋지 않음",
    "Play Blind": "그냥 블라인드를 플레이"
  },
  vouchers: {
    "S+": "항상 구매",
    S: "대부분 구매",
    A: "상황이 맞으면 강함",
    B: "좋지만 다소 좁거나 사치성 구매",
    C: "대체로 과잉이거나 영향이 낮음",
    D: "대부분 상황에서 해로움"
  },
  spectrals: {
    S: "매우 강함",
    A: "강함",
    B: "초반에 매우 강함",
    C: "약하지만 대체로 무해함",
    D: "대부분 상황에서 해로움"
  }
};

const valueKo: Record<string, string> = {
  Common: "일반",
  Uncommon: "희귀",
  Rare: "레어",
  Legendary: "레전더리",
  Deck: "덱",
  "Planet Card": "행성 카드",
  "Tarot Card": "타로 카드",
  Tag: "태그",
  "Base Voucher": "기본 바우처",
  "Upgraded Voucher": "업그레이드 바우처",
  "Spectral Card": "스펙트럴 카드",
  Effect: "효과",
  "Multiplicative Mult": "곱연산 배수",
  "Additive Mult": "합연산 배수",
  "+$": "경제",
  "Joker Creation": "조커 생성",
  Chips: "칩",
  Retrigger: "재발동",
  Utility: "유틸리티"
};

export const t = (language: Language) => uiCopy[language];

export function getListCopy(tierList: TierList, language: Language) {
  const copy = listCopy[tierList.id];

  return {
    title: copy?.title[language] ?? tierList.title,
    shortTitle: copy?.shortTitle[language] ?? tierList.shortTitle,
    description: copy?.description[language] ?? tierList.description,
    itemLabel: copy?.itemLabel[language] ?? tierList.itemLabel
  };
}

export function getTierLabel(
  tierListId: TierListId,
  tier: TierDefinition,
  language: Language
) {
  if (language === "en") {
    return tier.label;
  }

  return tierLabelKo[tierListId]?.[tier.id] ?? tier.label;
}

export function getFacetLabel(value: string, language: Language) {
  if (language === "en") {
    return value;
  }

  return valueKo[value] ?? value;
}

export function getFacetLegend(facetLabel: string, language: Language) {
  if (language === "en") {
    return facetLabel;
  }

  if (facetLabel === "Rarity") {
    return "희귀도";
  }

  if (facetLabel === "Type") {
    return "분류";
  }

  return facetLabel;
}

export function getJokerTypeLabel(jokerType: JokerType, language: Language) {
  return jokerTypeLabels[jokerType][language];
}

export function getItemName(item: TierItem, language: Language) {
  return language === "ko" && item.nameKo ? item.nameKo : item.nameEn;
}

export function getEffectText(item: TierItem, language: Language) {
  return language === "ko" ? item.effectKo : item.effectEn ?? item.effectKo;
}

export function getNotesText(notes: string | undefined, language: Language) {
  if (!notes) {
    return undefined;
  }

  if (language === "en") {
    return notes;
  }

  return notes
    .replace(/Unlock:/g, "해금:")
    .replace(/Wiki notes:/g, "위키 메모:")
    .split(" / ")
    .map((part) => {
      const [label, ...rest] = part.split(":");
      const body = rest.join(":").trim();

      if (!body) {
        return part;
      }

      return `${label}: ${translateEffect(body)}`;
    })
    .join(" / ");
}

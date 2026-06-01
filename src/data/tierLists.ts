import { jokerCards, rarityOrder, tierLabels, tierOrder } from "./jokers";
import { normalizeEffectText, translateEffect } from "./effectTranslations";
import { getKoreanLocalization } from "./koreanLocalizations";
import { getJokerTypes, type JokerType } from "./jokerTypes";

export type TierListId =
  | "jokers"
  | "decks"
  | "planets"
  | "tarots"
  | "tags"
  | "vouchers"
  | "spectrals";

export type TierItem = {
  id: string;
  nameKo?: string;
  nameEn: string;
  tier: string;
  imageSrc: string;
  effectKo: string;
  effectEn?: string;
  rarity?: string;
  category?: string;
  jokerTypes?: readonly JokerType[];
  notes?: string;
  uncertain?: boolean;
  sourcePosition?: string;
};

export type TierDefinition = {
  id: string;
  label: string;
  accent: string;
  textColor?: string;
};

export type TierList = {
  id: TierListId;
  title: string;
  shortTitle: string;
  description: string;
  itemLabel: string;
  sourceImage: string;
  metadataSource: string;
  facetKey?: "rarity" | "category";
  facetLabel?: string;
  facetOrder?: readonly string[];
  tiers: TierDefinition[];
  items: TierItem[];
};

const tierAccents: Record<string, string> = {
  "S+": "#f36e76",
  "S": "#ffb767",
  "A": "#f3e05e",
  "B": "#ddea58",
  "C": "#95e872",
  "D": "#74d66e",
  "E": "#63d7d6",
  "F": "#8376ee",
};

const jokerTiers: TierDefinition[] = tierOrder.map((tier) => ({
  id: tier,
  label: tierLabels[tier as keyof typeof tierLabels],
  accent: tierAccents[tier] ?? "#eebc4d",
  textColor: "#11100e",
}));

const jokerItems: TierItem[] = jokerCards.map((joker) => ({
  ...joker,
  jokerTypes: getJokerTypes(joker)
}));

const decksTiers: TierDefinition[] = [
  {
    "id": "S",
    "label": "Very Strong",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "A",
    "label": "Strong",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "B",
    "label": "Average",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "C",
    "label": "Slightly Below Average",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "D",
    "label": "Weak",
    "accent": "#63d7d6",
    "textColor": "#11100e"
  },
  {
    "id": "ULTRAF-",
    "label": "Ultra F-",
    "accent": "#8b8b8b",
    "textColor": "#11100e"
  }
];

const decksItems: TierItem[] = [
  {
    "id": "deck-yellow-deck",
    "nameEn": "Yellow Deck",
    "tier": "S",
    "imageSrc": "/assets/decks/yellow-deck.webp",
    "effectKo": "효과 원문: Start with extra $10",
    "effectEn": "Start with extra $10",
    "category": "Deck",
    "notes": "Unlock: Discover at least 50 items from your collection",
    "sourcePosition": "S-1 (Very Strong)"
  },
  {
    "id": "deck-blue-deck",
    "nameEn": "Blue Deck",
    "tier": "S",
    "imageSrc": "/assets/decks/blue-deck.webp",
    "effectKo": "효과 원문: +1 hand every round",
    "effectEn": "+1 hand every round",
    "category": "Deck",
    "notes": "Unlock: Discover at least 20 items from your collection",
    "sourcePosition": "S-2 (Very Strong)"
  },
  {
    "id": "deck-ghost-deck",
    "nameEn": "Ghost Deck",
    "tier": "A",
    "imageSrc": "/assets/decks/ghost-deck.webp",
    "effectKo": "효과 원문: Spectral cards may appear in the shop, start with a Hex card",
    "effectEn": "Spectral cards may appear in the shop, start with a Hex card",
    "category": "Deck",
    "notes": "Unlock: Win a run with the Yellow Deck on any difficulty",
    "sourcePosition": "A-1 (Strong)"
  },
  {
    "id": "deck-plasma-deck",
    "nameEn": "Plasma Deck",
    "tier": "A",
    "imageSrc": "/assets/decks/plasma-deck.webp",
    "effectKo": "효과 원문: Balance Chips and Mult when calculating score for played hand X2 base Blind size",
    "effectEn": "Balance Chips and Mult when calculating score for played hand X2 base Blind size",
    "category": "Deck",
    "notes": "Unlock: Win a run with any deck on the Blue Stake difficulty or harder",
    "sourcePosition": "A-2 (Strong)"
  },
  {
    "id": "deck-abandoned-deck",
    "nameEn": "Abandoned Deck",
    "tier": "A",
    "imageSrc": "/assets/decks/abandoned-deck.webp",
    "effectKo": "효과 원문: Start run with no Face Cards in your deck",
    "effectEn": "Start run with no Face Cards in your deck",
    "category": "Deck",
    "notes": "Unlock: Win a run with the Green Deck on any difficulty",
    "sourcePosition": "A-3 (Strong)"
  },
  {
    "id": "deck-checkered-deck",
    "nameEn": "Checkered Deck",
    "tier": "B",
    "imageSrc": "/assets/decks/checkered-deck.webp",
    "effectKo": "효과 원문: Start run with 26 Spades and 26 Hearts in deck",
    "effectEn": "Start run with 26 Spades and 26 Hearts in deck",
    "category": "Deck",
    "notes": "Unlock: Win a run with the Black Deck on any difficulty",
    "sourcePosition": "B-1 (Average)"
  },
  {
    "id": "deck-erratic-deck",
    "nameEn": "Erratic Deck",
    "tier": "B",
    "imageSrc": "/assets/decks/erratic-deck.webp",
    "effectKo": "효과 원문: All Ranks and Suits in deck are randomized",
    "effectEn": "All Ranks and Suits in deck are randomized",
    "category": "Deck",
    "notes": "Unlock: Win a run with any deck on the Orange Stake difficulty or harder",
    "sourcePosition": "B-2 (Average)"
  },
  {
    "id": "deck-magic-deck",
    "nameEn": "Magic Deck",
    "tier": "B",
    "imageSrc": "/assets/decks/magic-deck.webp",
    "effectKo": "효과 원문: Start run with the Crystal Ball voucher and 2 copies of The Fool",
    "effectEn": "Start run with the Crystal Ball voucher and 2 copies of The Fool",
    "category": "Deck",
    "notes": "Unlock: Win a run with the Red Deck on any difficulty",
    "sourcePosition": "B-3 (Average)"
  },
  {
    "id": "deck-nebula-deck",
    "nameEn": "Nebula Deck",
    "tier": "B",
    "imageSrc": "/assets/decks/nebula-deck.webp",
    "effectKo": "효과 원문: Start run with the Telescope voucher -1 consumable slot",
    "effectEn": "Start run with the Telescope voucher -1 consumable slot",
    "category": "Deck",
    "notes": "Unlock: Win a run with the Blue Deck on any difficulty",
    "sourcePosition": "B-4 (Average)"
  },
  {
    "id": "deck-anaglyph-deck",
    "nameEn": "Anaglyph Deck",
    "tier": "C",
    "imageSrc": "/assets/decks/anaglyph-deck.webp",
    "effectKo": "효과 원문: After defeating each Boss Blind , gain a Double Tag",
    "effectEn": "After defeating each Boss Blind , gain a Double Tag",
    "category": "Deck",
    "notes": "Unlock: Win a run with any deck on the Black Stake difficulty or harder",
    "sourcePosition": "C-1 (Slightly Below Average)"
  },
  {
    "id": "deck-red-deck",
    "nameEn": "Red Deck",
    "tier": "C",
    "imageSrc": "/assets/decks/red-deck.webp",
    "effectKo": "효과 원문: +1 discard every round",
    "effectEn": "+1 discard every round",
    "category": "Deck",
    "notes": "Unlock: Unlocked from start",
    "sourcePosition": "C-2 (Slightly Below Average)"
  },
  {
    "id": "deck-green-deck",
    "nameEn": "Green Deck",
    "tier": "C",
    "imageSrc": "/assets/decks/green-deck.webp",
    "effectKo": "효과 원문: At end of each Round: $2 per remaining Hand $1 per remaining Discard Earn no Interest",
    "effectEn": "At end of each Round: $2 per remaining Hand $1 per remaining Discard Earn no Interest",
    "category": "Deck",
    "notes": "Unlock: Discover at least 75 items from your collection",
    "sourcePosition": "C-3 (Slightly Below Average)"
  },
  {
    "id": "deck-zodiac-deck",
    "nameEn": "Zodiac Deck",
    "tier": "D",
    "imageSrc": "/assets/decks/zodiac-deck.webp",
    "effectKo": "효과 원문: Start run with Tarot Merchant , Planet Merchant , and Overstock",
    "effectEn": "Start run with Tarot Merchant , Planet Merchant , and Overstock",
    "category": "Deck",
    "notes": "Unlock: Win a run with any deck on the Red Stake difficulty or harder",
    "sourcePosition": "D-1 (Weak)"
  },
  {
    "id": "deck-painted-deck",
    "nameEn": "Painted Deck",
    "tier": "D",
    "imageSrc": "/assets/decks/painted-deck.webp",
    "effectKo": "효과 원문: +2 hand size, -1 Joker slot",
    "effectEn": "+2 hand size, -1 Joker slot",
    "category": "Deck",
    "notes": "Unlock: Win a run with any deck on the Green Stake difficulty or harder",
    "sourcePosition": "D-2 (Weak)"
  },
  {
    "id": "deck-black-deck",
    "nameEn": "Black Deck",
    "tier": "ULTRAF-",
    "imageSrc": "/assets/decks/black-deck.webp",
    "effectKo": "효과 원문: +1 Joker slot -1 hand every round",
    "effectEn": "+1 Joker slot -1 hand every round",
    "category": "Deck",
    "notes": "Unlock: Discover at least 100 items from your collection",
    "sourcePosition": "ULTRAF--1 (Ultra F-)"
  }
];

const planetsTiers: TierDefinition[] = [
  {
    "id": "S+",
    "label": "OP",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "S",
    "label": "Intentionally left blank",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "A",
    "label": "Poor mans pair",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "B",
    "label": "Good",
    "accent": "#ddea58",
    "textColor": "#11100e"
  },
  {
    "id": "C",
    "label": "Viable",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "D",
    "label": "Difficult to use",
    "accent": "#74d66e",
    "textColor": "#11100e"
  },
  {
    "id": "E",
    "label": "Usually inferior to other options",
    "accent": "#63d7d6",
    "textColor": "#11100e"
  }
];

const planetsItems: TierItem[] = [
  {
    "id": "planet-mercury",
    "nameEn": "Mercury",
    "tier": "S+",
    "imageSrc": "/assets/planets/mercury.webp",
    "effectKo": "효과 원문: +1 Mult and +15 Chips",
    "effectEn": "+1 Mult and +15 Chips",
    "category": "Planet Card",
    "sourcePosition": "S+-1 (OP)"
  },
  {
    "id": "planet-pluto",
    "nameEn": "Pluto",
    "tier": "A",
    "imageSrc": "/assets/planets/pluto.webp",
    "effectKo": "효과 원문: +1 Mult and +10 Chips",
    "effectEn": "+1 Mult and +10 Chips",
    "category": "Planet Card",
    "sourcePosition": "A-1 (Poor mans pair)"
  },
  {
    "id": "planet-venus",
    "nameEn": "Venus",
    "tier": "B",
    "imageSrc": "/assets/planets/venus.webp",
    "effectKo": "효과 원문: +2 Mult and +20 Chips",
    "effectEn": "+2 Mult and +20 Chips",
    "category": "Planet Card",
    "sourcePosition": "B-1 (Good)"
  },
  {
    "id": "planet-saturn",
    "nameEn": "Saturn",
    "tier": "B",
    "imageSrc": "/assets/planets/saturn.webp",
    "effectKo": "효과 원문: +3 Mult and +30 Chips",
    "effectEn": "+3 Mult and +30 Chips",
    "category": "Planet Card",
    "sourcePosition": "B-2 (Good)"
  },
  {
    "id": "planet-jupiter",
    "nameEn": "Jupiter",
    "tier": "C",
    "imageSrc": "/assets/planets/jupiter.webp",
    "effectKo": "효과 원문: +2 Mult and +15 Chips",
    "effectEn": "+2 Mult and +15 Chips",
    "category": "Planet Card",
    "sourcePosition": "C-1 (Viable)"
  },
  {
    "id": "planet-earth",
    "nameEn": "Earth",
    "tier": "C",
    "imageSrc": "/assets/planets/earth.webp",
    "effectKo": "효과 원문: +2 Mult and +25 Chips",
    "effectEn": "+2 Mult and +25 Chips",
    "category": "Planet Card",
    "sourcePosition": "C-2 (Viable)"
  },
  {
    "id": "planet-mars",
    "nameEn": "Mars",
    "tier": "D",
    "imageSrc": "/assets/planets/mars.webp",
    "effectKo": "효과 원문: +3 Mult and +30 Chips",
    "effectEn": "+3 Mult and +30 Chips",
    "category": "Planet Card",
    "sourcePosition": "D-1 (Difficult to use)"
  },
  {
    "id": "planet-planet-x",
    "nameEn": "Planet X",
    "tier": "D",
    "imageSrc": "/assets/planets/planet-x.webp",
    "effectKo": "효과 원문: +3 Mult and +35 Chips",
    "effectEn": "+3 Mult and +35 Chips",
    "category": "Planet Card",
    "sourcePosition": "D-2 (Difficult to use)"
  },
  {
    "id": "planet-ceres",
    "nameEn": "Ceres",
    "tier": "D",
    "imageSrc": "/assets/planets/ceres.webp",
    "effectKo": "효과 원문: +4 Mult and +40 Chips",
    "effectEn": "+4 Mult and +40 Chips",
    "category": "Planet Card",
    "sourcePosition": "D-3 (Difficult to use)"
  },
  {
    "id": "planet-eris",
    "nameEn": "Eris",
    "tier": "D",
    "imageSrc": "/assets/planets/eris.webp",
    "effectKo": "효과 원문: +3 Mult and +50 Chips",
    "effectEn": "+3 Mult and +50 Chips",
    "category": "Planet Card",
    "sourcePosition": "D-4 (Difficult to use)"
  },
  {
    "id": "planet-uranus",
    "nameEn": "Uranus",
    "tier": "E",
    "imageSrc": "/assets/planets/uranus.webp",
    "effectKo": "효과 원문: +1 Mult and +20 Chips",
    "effectEn": "+1 Mult and +20 Chips",
    "category": "Planet Card",
    "sourcePosition": "E-1 (Usually inferior to other options)"
  },
  {
    "id": "planet-neptune",
    "nameEn": "Neptune",
    "tier": "E",
    "imageSrc": "/assets/planets/neptune.webp",
    "effectKo": "효과 원문: +4 Mult and +40 Chips",
    "effectEn": "+4 Mult and +40 Chips",
    "category": "Planet Card",
    "sourcePosition": "E-2 (Usually inferior to other options)"
  }
];

const tarotsTiers: TierDefinition[] = [
  {
    "id": "S",
    "label": "Top value",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "A",
    "label": "Strong",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "B",
    "label": "Good",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "C",
    "label": "Situational",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "D",
    "label": "Low impact",
    "accent": "#63d7d6",
    "textColor": "#11100e"
  },
  {
    "id": "E",
    "label": "Weak",
    "accent": "#8376ee",
    "textColor": "#11100e"
  }
];

const tarotsItems: TierItem[] = [
  {
    "id": "tarot-the-hermit",
    "nameEn": "The Hermit",
    "tier": "S",
    "imageSrc": "/assets/tarots/the-hermit.webp",
    "effectKo": "효과 원문: Doubles money (Max of $20 )",
    "effectEn": "Doubles money (Max of $20 )",
    "category": "Tarot Card",
    "sourcePosition": "S-1 (Top value)"
  },
  {
    "id": "tarot-death",
    "nameEn": "Death",
    "tier": "S",
    "imageSrc": "/assets/tarots/death.webp",
    "effectKo": "효과 원문: Select 2 cards, convert the left card into the right card (Drag to rearrange)",
    "effectEn": "Select 2 cards, convert the left card into the right card (Drag to rearrange)",
    "category": "Tarot Card",
    "sourcePosition": "S-2 (Top value)"
  },
  {
    "id": "tarot-the-fool",
    "nameEn": "The Fool",
    "tier": "A",
    "imageSrc": "/assets/tarots/the-fool.webp",
    "effectKo": "효과 원문: Creates a copy of the last Tarot or Planet card used. ( The Fool excluded)",
    "effectEn": "Creates a copy of the last Tarot or Planet card used. ( The Fool excluded)",
    "category": "Tarot Card",
    "sourcePosition": "A-1 (Strong)"
  },
  {
    "id": "tarot-the-magician",
    "nameEn": "The Magician",
    "tier": "A",
    "imageSrc": "/assets/tarots/the-magician.webp",
    "effectKo": "효과 원문: Enhances 2 selected cards to Lucky Cards",
    "effectEn": "Enhances 2 selected cards to Lucky Cards",
    "category": "Tarot Card",
    "sourcePosition": "A-2 (Strong)"
  },
  {
    "id": "tarot-the-emperor",
    "nameEn": "The Emperor",
    "tier": "A",
    "imageSrc": "/assets/tarots/the-emperor.webp",
    "effectKo": "효과 원문: Creates up to 2 random Tarot cards (Must have room)",
    "effectEn": "Creates up to 2 random Tarot cards (Must have room)",
    "category": "Tarot Card",
    "sourcePosition": "A-3 (Strong)"
  },
  {
    "id": "tarot-strength",
    "nameEn": "Strength",
    "tier": "A",
    "imageSrc": "/assets/tarots/strength.webp",
    "effectKo": "효과 원문: Increases rank of up to 2 selected cards by 1 (Rank order: A→2→3→4→5→6→7→8→9→10→J→Q→K→A)",
    "effectEn": "Increases rank of up to 2 selected cards by 1 (Rank order: A→2→3→4→5→6→7→8→9→10→J→Q→K→A)",
    "category": "Tarot Card",
    "sourcePosition": "A-4 (Strong)"
  },
  {
    "id": "tarot-the-chariot",
    "nameEn": "The Chariot",
    "tier": "B",
    "imageSrc": "/assets/tarots/the-chariot.webp",
    "effectKo": "효과 원문: Enhances 1 selected card into a Steel Card",
    "effectEn": "Enhances 1 selected card into a Steel Card",
    "category": "Tarot Card",
    "sourcePosition": "B-1 (Good)"
  },
  {
    "id": "tarot-justice",
    "nameEn": "Justice",
    "tier": "B",
    "imageSrc": "/assets/tarots/justice.webp",
    "effectKo": "효과 원문: Enhances 1 selected card into a Glass Card",
    "effectEn": "Enhances 1 selected card into a Glass Card",
    "category": "Tarot Card",
    "sourcePosition": "B-2 (Good)"
  },
  {
    "id": "tarot-the-hanged-man",
    "nameEn": "The Hanged Man",
    "tier": "B",
    "imageSrc": "/assets/tarots/the-hanged-man.webp",
    "effectKo": "효과 원문: Destroys up to 2 selected cards",
    "effectEn": "Destroys up to 2 selected cards",
    "category": "Tarot Card",
    "sourcePosition": "B-3 (Good)"
  },
  {
    "id": "tarot-the-empress",
    "nameEn": "The Empress",
    "tier": "B",
    "imageSrc": "/assets/tarots/the-empress.webp",
    "effectKo": "효과 원문: Enhances 2 selected cards to Mult Cards",
    "effectEn": "Enhances 2 selected cards to Mult Cards",
    "category": "Tarot Card",
    "sourcePosition": "B-4 (Good)"
  },
  {
    "id": "tarot-judgement",
    "nameEn": "Judgement",
    "tier": "B",
    "imageSrc": "/assets/tarots/judgement.webp",
    "effectKo": "효과 원문: Creates a random Joker card (without in-run stickers ) (Must have room)",
    "effectEn": "Creates a random Joker card (without in-run stickers ) (Must have room)",
    "category": "Tarot Card",
    "sourcePosition": "B-5 (Good)"
  },
  {
    "id": "tarot-the-high-priestess",
    "nameEn": "The High Priestess",
    "tier": "C",
    "imageSrc": "/assets/tarots/the-high-priestess.webp",
    "effectKo": "효과 원문: Creates up to 2 random Planet cards (Must have room)",
    "effectEn": "Creates up to 2 random Planet cards (Must have room)",
    "category": "Tarot Card",
    "sourcePosition": "C-1 (Situational)"
  },
  {
    "id": "tarot-the-hierophant",
    "nameEn": "The Hierophant",
    "tier": "C",
    "imageSrc": "/assets/tarots/the-hierophant.webp",
    "effectKo": "효과 원문: Enhances 2 selected cards to Bonus Cards",
    "effectEn": "Enhances 2 selected cards to Bonus Cards",
    "category": "Tarot Card",
    "sourcePosition": "C-2 (Situational)"
  },
  {
    "id": "tarot-temperance",
    "nameEn": "Temperance",
    "tier": "C",
    "imageSrc": "/assets/tarots/temperance.webp",
    "effectKo": "효과 원문: Gives the total sell value of all current Jokers (Max of $50 )",
    "effectEn": "Gives the total sell value of all current Jokers (Max of $50 )",
    "category": "Tarot Card",
    "sourcePosition": "C-3 (Situational)"
  },
  {
    "id": "tarot-the-devil",
    "nameEn": "The Devil",
    "tier": "C",
    "imageSrc": "/assets/tarots/the-devil.webp",
    "effectKo": "효과 원문: Enhances 1 selected card into a Gold Card",
    "effectEn": "Enhances 1 selected card into a Gold Card",
    "category": "Tarot Card",
    "sourcePosition": "C-4 (Situational)"
  },
  {
    "id": "tarot-the-wheel-of-fortune",
    "nameEn": "The Wheel of Fortune",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-wheel-of-fortune.webp",
    "effectKo": "효과 원문: 1 in 4 chance to add Foil , Holographic , or Polychrome edition to a random Joker",
    "effectEn": "1 in 4 chance to add Foil , Holographic , or Polychrome edition to a random Joker",
    "category": "Tarot Card",
    "sourcePosition": "D-1 (Low impact)"
  },
  {
    "id": "tarot-the-star",
    "nameEn": "The Star",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-star.webp",
    "effectKo": "효과 원문: Converts up to 3 selected cards to Diamonds",
    "effectEn": "Converts up to 3 selected cards to Diamonds",
    "category": "Tarot Card",
    "sourcePosition": "D-2 (Low impact)"
  },
  {
    "id": "tarot-the-sun",
    "nameEn": "The Sun",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-sun.webp",
    "effectKo": "효과 원문: Converts up to 3 selected cards to Hearts",
    "effectEn": "Converts up to 3 selected cards to Hearts",
    "category": "Tarot Card",
    "sourcePosition": "D-3 (Low impact)"
  },
  {
    "id": "tarot-the-world",
    "nameEn": "The World",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-world.webp",
    "effectKo": "효과 원문: Converts up to 3 selected cards to Spades",
    "effectEn": "Converts up to 3 selected cards to Spades",
    "category": "Tarot Card",
    "sourcePosition": "D-4 (Low impact)"
  },
  {
    "id": "tarot-the-moon",
    "nameEn": "The Moon",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-moon.webp",
    "effectKo": "효과 원문: Converts up to 3 selected cards to Clubs",
    "effectEn": "Converts up to 3 selected cards to Clubs",
    "category": "Tarot Card",
    "sourcePosition": "D-5 (Low impact)"
  },
  {
    "id": "tarot-the-tower",
    "nameEn": "The Tower",
    "tier": "D",
    "imageSrc": "/assets/tarots/the-tower.webp",
    "effectKo": "효과 원문: Enhances 1 selected card into a Stone Card",
    "effectEn": "Enhances 1 selected card into a Stone Card",
    "category": "Tarot Card",
    "sourcePosition": "D-6 (Low impact)"
  },
  {
    "id": "tarot-the-lovers",
    "nameEn": "The Lovers",
    "tier": "E",
    "imageSrc": "/assets/tarots/the-lovers.webp",
    "effectKo": "효과 원문: Enhances 1 selected card into a Wild Card",
    "effectEn": "Enhances 1 selected card into a Wild Card",
    "category": "Tarot Card",
    "sourcePosition": "E-1 (Weak)"
  }
];

const tagsTiers: TierDefinition[] = [
  {
    "id": "Ante 1",
    "label": "Potential Ante 1 Small Blind Skips",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "Desperation",
    "label": "Potential desperation skips",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "Anaglyph",
    "label": "Potentially good on anaglyph",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "Overrated",
    "label": "It's not gonna be as good as you think it is",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "Play Blind",
    "label": "Just play the blind",
    "accent": "#8376ee",
    "textColor": "#11100e"
  }
];

const tagsItems: TierItem[] = [
  {
    "id": "tag-investment",
    "nameEn": "Investment",
    "tier": "Ante 1",
    "imageSrc": "/assets/tags/investment.webp",
    "effectKo": "효과 원문: Gain $25 after defeating the next Boss Blind .",
    "effectEn": "Gain $25 after defeating the next Boss Blind .",
    "category": "Tag",
    "notes": "Wiki notes: Can be stacked on one Boss Blind, each adding additional $25 bonus.",
    "sourcePosition": "Ante 1-1 (Potential Ante 1 Small Blind Skips)"
  },
  {
    "id": "tag-coupon",
    "nameEn": "Coupon",
    "tier": "Ante 1",
    "imageSrc": "/assets/tags/coupon.webp",
    "effectKo": "효과 원문: In the next shop, initial Jokers , Consumables Cards and Booster Packs are free ($0).",
    "effectEn": "In the next shop, initial Jokers , Consumables Cards and Booster Packs are free ($0).",
    "category": "Tag",
    "notes": "Wiki notes: Other parts of the shop (such as Vouchers and Items generated after rerolls) keep their usual costs.",
    "sourcePosition": "Ante 1-2 (Potential Ante 1 Small Blind Skips)"
  },
  {
    "id": "tag-boss",
    "nameEn": "Boss",
    "tier": "Desperation",
    "imageSrc": "/assets/tags/boss.webp",
    "effectKo": "효과 원문: Re-rolls the next Boss Blind .",
    "effectEn": "Re-rolls the next Boss Blind .",
    "category": "Tag",
    "notes": "Wiki notes: If the Director's Cut has been redeemed, using the Boss tag to re-roll the next Boss Blind will also use up the one Re-Roll option.",
    "sourcePosition": "Desperation-1 (Potential desperation skips)"
  },
  {
    "id": "tag-handy",
    "nameEn": "Handy",
    "tier": "Desperation",
    "imageSrc": "/assets/tags/handy.webp",
    "effectKo": "효과 원문: Gain $1 for each hand played this run.",
    "effectEn": "Gain $1 for each hand played this run.",
    "category": "Tag",
    "sourcePosition": "Desperation-2 (Potential desperation skips)"
  },
  {
    "id": "tag-juggle",
    "nameEn": "Juggle",
    "tier": "Desperation",
    "imageSrc": "/assets/tags/juggle.webp",
    "effectKo": "효과 원문: +3 Hand Size for the next round only.",
    "effectEn": "+3 Hand Size for the next round only.",
    "category": "Tag",
    "notes": "Wiki notes: Can be stacked multiple times on the same round, each adding an additional +3 Hand size.",
    "sourcePosition": "Desperation-3 (Potential desperation skips)"
  },
  {
    "id": "tag-garbage",
    "nameEn": "Garbage",
    "tier": "Desperation",
    "imageSrc": "/assets/tags/garbage.webp",
    "effectKo": "효과 원문: Gain $1 for each unused discard this run.",
    "effectEn": "Gain $1 for each unused discard this run.",
    "category": "Tag",
    "sourcePosition": "Desperation-4 (Potential desperation skips)"
  },
  {
    "id": "tag-economy",
    "nameEn": "Economy",
    "tier": "Desperation",
    "imageSrc": "/assets/tags/economy.webp",
    "effectKo": "효과 원문: Doubles your money (adds a maximum of $40 ) .",
    "effectEn": "Doubles your money (adds a maximum of $40 ) .",
    "category": "Tag",
    "notes": "Wiki notes: If your balance is negative your money is not doubled, instead giving you $0 and essentially wasting the tag.",
    "sourcePosition": "Desperation-5 (Potential desperation skips)"
  },
  {
    "id": "tag-orbital",
    "nameEn": "Orbital",
    "tier": "Anaglyph",
    "imageSrc": "/assets/tags/orbital.webp",
    "effectKo": "효과 원문: Upgrades a specified random Poker Hand by three levels.",
    "effectEn": "Upgrades a specified random Poker Hand by three levels.",
    "category": "Tag",
    "notes": "Wiki notes: The hand can be a secret hand if it has already been played in this run.",
    "sourcePosition": "Anaglyph-1 (Potentially good on anaglyph)"
  },
  {
    "id": "tag-charm",
    "nameEn": "Charm",
    "tier": "Anaglyph",
    "imageSrc": "/assets/tags/charm.webp",
    "effectKo": "효과 원문: Immediately open a free Mega Arcana Pack .",
    "effectEn": "Immediately open a free Mega Arcana Pack .",
    "category": "Tag",
    "sourcePosition": "Anaglyph-2 (Potentially good on anaglyph)"
  },
  {
    "id": "tag-voucher",
    "nameEn": "Voucher",
    "tier": "Anaglyph",
    "imageSrc": "/assets/tags/voucher.webp",
    "effectKo": "효과 원문: Adds a Voucher to the next Shop.",
    "effectEn": "Adds a Voucher to the next Shop.",
    "category": "Tag",
    "notes": "Wiki notes: Can be stacked on one shop until all available vouchers appear (excluding bought vouchers and upgrades of unbought vouchers). Added vouchers do not carry over to later shops in the ante.",
    "sourcePosition": "Anaglyph-3 (Potentially good on anaglyph)"
  },
  {
    "id": "tag-meteor",
    "nameEn": "Meteor",
    "tier": "Anaglyph",
    "imageSrc": "/assets/tags/meteor.webp",
    "effectKo": "효과 원문: Immediately open a free Mega Celestial Pack .",
    "effectEn": "Immediately open a free Mega Celestial Pack .",
    "category": "Tag",
    "sourcePosition": "Anaglyph-4 (Potentially good on anaglyph)"
  },
  {
    "id": "tag-negative",
    "nameEn": "Negative",
    "tier": "Overrated",
    "imageSrc": "/assets/tags/negative.webp",
    "effectKo": "효과 원문: The next base edition Joker you find in a Shop becomes Negative (+1 joker slot) and free.",
    "effectEn": "The next base edition Joker you find in a Shop becomes Negative (+1 joker slot) and free.",
    "category": "Tag",
    "notes": "Wiki notes: If there are no base edition Jokers in the next shop, these tags will instead be stored. Works with Uncommon and Rare Tag if the generated Joker doesn't have an Edition naturally. Can be stacked on one shop until there are no base edition Jokers.",
    "sourcePosition": "Overrated-1 (It's not gonna be as good as you think it is)"
  },
  {
    "id": "tag-uncommon",
    "nameEn": "Uncommon",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/uncommon.webp",
    "effectKo": "효과 원문: The next shop will have a free Uncommon Joker .",
    "effectEn": "The next shop will have a free Uncommon Joker .",
    "category": "Tag",
    "notes": "Wiki notes: The Joker is extra generated, and guaranteed to appear in next shop, which is not affected by Vouchers that relatively lower the weight of Jokers in Shop (see The Shop#Vouchers ), or certain Challenges that Jokers' spawn rate is set to 0. Can be stacked with Edition Tags, generating a free Joker with Editions .",
    "sourcePosition": "Play Blind-1 (Just play the blind)"
  },
  {
    "id": "tag-foil",
    "nameEn": "Foil",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/foil.webp",
    "effectKo": "효과 원문: The next base edition Joker you find in a Shop becomes Foil ( +50 Chips ) and free.",
    "effectEn": "The next base edition Joker you find in a Shop becomes Foil ( +50 Chips ) and free.",
    "category": "Tag",
    "sourcePosition": "Play Blind-2 (Just play the blind)"
  },
  {
    "id": "tag-polychrome",
    "nameEn": "Polychrome",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/polychrome.webp",
    "effectKo": "효과 원문: The next base edition Joker you find in a Shop becomes Polychrome ( X1.5 Mult ) and free.",
    "effectEn": "The next base edition Joker you find in a Shop becomes Polychrome ( X1.5 Mult ) and free.",
    "category": "Tag",
    "sourcePosition": "Play Blind-3 (Just play the blind)"
  },
  {
    "id": "tag-holographic",
    "nameEn": "Holographic",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/holographic.webp",
    "effectKo": "효과 원문: The next base edition Joker you find in a Shop becomes Holographic ( +10 Mult ) and free.",
    "effectEn": "The next base edition Joker you find in a Shop becomes Holographic ( +10 Mult ) and free.",
    "category": "Tag",
    "sourcePosition": "Play Blind-4 (Just play the blind)"
  },
  {
    "id": "tag-double",
    "nameEn": "Double",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/double.webp",
    "effectKo": "효과 원문: Gives a copy of the next Tag selected (excluding Double Tags).",
    "effectEn": "Gives a copy of the next Tag selected (excluding Double Tags).",
    "category": "Tag",
    "notes": "Wiki notes: Can be stacked on one Tag earned, each adding one additional copy of (instead of doubling) that Tag.",
    "sourcePosition": "Play Blind-5 (Just play the blind)"
  },
  {
    "id": "tag-speed",
    "nameEn": "Speed",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/speed.webp",
    "effectKo": "효과 원문: Gives $5 for each Blind you've skipped this run.",
    "effectEn": "Gives $5 for each Blind you've skipped this run.",
    "category": "Tag",
    "notes": "Wiki notes: Guaranteed to give at least $5 , as it includes the Blind skipped to gain this tag.",
    "sourcePosition": "Play Blind-6 (Just play the blind)"
  },
  {
    "id": "tag-top-up",
    "nameEn": "Top-up",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/top-up.webp",
    "effectKo": "효과 원문: Create up to 2 Common Jokers (if you have space).",
    "effectEn": "Create up to 2 Common Jokers (if you have space).",
    "category": "Tag",
    "notes": "Wiki notes: The Jokers created cannot have Stickers , like Eternal/Perishable/Rental, even at higher stakes.",
    "sourcePosition": "Play Blind-7 (Just play the blind)"
  },
  {
    "id": "tag-rare",
    "nameEn": "Rare",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/rare.webp",
    "effectKo": "효과 원문: The next shop will have a free Rare Joker .",
    "effectEn": "The next shop will have a free Rare Joker .",
    "category": "Tag",
    "sourcePosition": "Play Blind-8 (Just play the blind)"
  },
  {
    "id": "tag-buffoon",
    "nameEn": "Buffoon",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/buffoon.webp",
    "effectKo": "효과 원문: Immediately open a free Mega Buffoon Pack .",
    "effectEn": "Immediately open a free Mega Buffoon Pack .",
    "category": "Tag",
    "sourcePosition": "Play Blind-9 (Just play the blind)"
  },
  {
    "id": "tag-d6",
    "nameEn": "D6",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/d6.webp",
    "effectKo": "효과 원문: In the next Shop , Rerolls start at $0 .",
    "effectEn": "In the next Shop , Rerolls start at $0 .",
    "category": "Tag",
    "notes": "Wiki notes: The price will go up $1 per Reroll as normal.",
    "sourcePosition": "Play Blind-10 (Just play the blind)"
  },
  {
    "id": "tag-standard",
    "nameEn": "Standard",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/standard.webp",
    "effectKo": "효과 원문: Immediately open a free Mega Standard Pack .",
    "effectEn": "Immediately open a free Mega Standard Pack .",
    "category": "Tag",
    "notes": "Wiki notes: Other effects of opening Booster Packs (like Red Card and Hallucination ) can be activated as normal.",
    "sourcePosition": "Play Blind-11 (Just play the blind)"
  },
  {
    "id": "tag-ethereal",
    "nameEn": "Ethereal",
    "tier": "Play Blind",
    "imageSrc": "/assets/tags/ethereal.webp",
    "effectKo": "효과 원문: Immediately open a free Spectral Pack .",
    "effectEn": "Immediately open a free Spectral Pack .",
    "category": "Tag",
    "notes": "Wiki notes: It is the only one among Pack-related Tags that does not give a Mega pack. Other effects of opening Booster Packs (like Red Card and Hallucination ) can be activated as normal.",
    "sourcePosition": "Play Blind-12 (Just play the blind)"
  }
];

const vouchersTiers: TierDefinition[] = [
  {
    "id": "S+",
    "label": "Always buy",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "S",
    "label": "Usually Buy",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "A",
    "label": "Strong in the right situation",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "B",
    "label": "Good but kinda niche or luxury buys",
    "accent": "#ddea58",
    "textColor": "#11100e"
  },
  {
    "id": "C",
    "label": "Usually either overkill or low impact",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "D",
    "label": "Actually harmful in most situations",
    "accent": "#63d7d6",
    "textColor": "#11100e"
  }
];

const vouchersItems: TierItem[] = [
  {
    "id": "voucher-grabber",
    "nameEn": "Grabber",
    "tier": "S+",
    "imageSrc": "/assets/vouchers/grabber.webp",
    "effectKo": "효과 원문: Permanently gain +1 hand per round",
    "effectEn": "Permanently gain +1 hand per round",
    "category": "Base Voucher",
    "notes": "Unlock: Play a total of 2500 cards",
    "sourcePosition": "S+-1 (Always buy)"
  },
  {
    "id": "voucher-nacho-tong",
    "nameEn": "Nacho Tong",
    "tier": "S+",
    "imageSrc": "/assets/vouchers/nacho-tong.webp",
    "effectKo": "효과 원문: Permanently gain an additional +1 hand per round",
    "effectEn": "Permanently gain an additional +1 hand per round",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Play a total of 2500 cards",
    "sourcePosition": "S+-2 (Always buy)"
  },
  {
    "id": "voucher-antimatter",
    "nameEn": "Antimatter",
    "tier": "S+",
    "imageSrc": "/assets/vouchers/antimatter.webp",
    "effectKo": "효과 원문: +1 Joker slot",
    "effectEn": "+1 Joker slot",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Redeem Blank 10 total times / Wiki notes: The Antimatter Voucher is always displayed in game as if it was a negative edition and applies the same effect as negative Jokers",
    "sourcePosition": "S+-3 (Always buy)"
  },
  {
    "id": "voucher-petroglyph",
    "nameEn": "Petroglyph",
    "tier": "S+",
    "imageSrc": "/assets/vouchers/petroglyph.webp",
    "effectKo": "효과 원문: -1 Ante, -1 discard each round",
    "effectEn": "-1 Ante, -1 discard each round",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Reach Ante level 12",
    "sourcePosition": "S+-4 (Always buy)"
  },
  {
    "id": "voucher-overstock",
    "nameEn": "Overstock",
    "tier": "S",
    "imageSrc": "/assets/vouchers/overstock.webp",
    "effectKo": "효과 원문: +1 card slot available in shop (to 3 slots)",
    "effectEn": "+1 card slot available in shop (to 3 slots)",
    "category": "Base Voucher",
    "notes": "Unlock: Spend a total of $2500 at the shop / Wiki notes: Also immediately restocks any empty card slots in the Shop when purchased",
    "sourcePosition": "S-1 (Usually Buy)"
  },
  {
    "id": "voucher-clearance-sale",
    "nameEn": "Clearance Sale",
    "tier": "S",
    "imageSrc": "/assets/vouchers/clearance-sale.webp",
    "effectKo": "효과 원문: All cards and packs in shop are 25% off",
    "effectEn": "All cards and packs in shop are 25% off",
    "category": "Base Voucher",
    "notes": "Unlock: Redeem at least 10 Voucher cards in one run / Wiki notes: Also reduces the sell value of your present jokers Prices are rounded half down",
    "sourcePosition": "S-2 (Usually Buy)"
  },
  {
    "id": "voucher-telescope",
    "nameEn": "Telescope",
    "tier": "S",
    "imageSrc": "/assets/vouchers/telescope.webp",
    "effectKo": "효과 원문: Celestial Packs always contain the Planet card for your most played poker hand",
    "effectEn": "Celestial Packs always contain the Planet card for your most played poker hand",
    "category": "Base Voucher",
    "notes": "Unlock: Use a total of 25 Planet cards from booster packs / Wiki notes: Telescope picks the higher tier hand in case of multiple most played hands",
    "sourcePosition": "S-3 (Usually Buy)"
  },
  {
    "id": "voucher-director-s-cut",
    "nameEn": "Director's Cut",
    "tier": "A",
    "imageSrc": "/assets/vouchers/director-s-cut.webp",
    "effectKo": "효과 원문: Reroll Boss Blind 1 time per Ante, $10 per roll",
    "effectEn": "Reroll Boss Blind 1 time per Ante, $10 per roll",
    "category": "Base Voucher",
    "notes": "Unlock: Discover 25 Blinds",
    "sourcePosition": "A-1 (Strong in the right situation)"
  },
  {
    "id": "voucher-hieroglyph",
    "nameEn": "Hieroglyph",
    "tier": "A",
    "imageSrc": "/assets/vouchers/hieroglyph.webp",
    "effectKo": "효과 원문: -1 Ante, -1 hand each round",
    "effectEn": "-1 Ante, -1 hand each round",
    "category": "Base Voucher",
    "notes": "Unlock: Reach Ante level 12",
    "sourcePosition": "A-2 (Strong in the right situation)"
  },
  {
    "id": "voucher-tarot-merchant",
    "nameEn": "Tarot Merchant",
    "tier": "A",
    "imageSrc": "/assets/vouchers/tarot-merchant.webp",
    "effectKo": "효과 원문: Tarot cards appear 2X more frequently in the shop",
    "effectEn": "Tarot cards appear 2X more frequently in the shop",
    "category": "Base Voucher",
    "notes": "Unlock: Buy a total of 50 Tarot cards from the shop / Wiki notes: For details, see The Shop#Vouchers",
    "sourcePosition": "A-3 (Strong in the right situation)"
  },
  {
    "id": "voucher-liquidation",
    "nameEn": "Liquidation",
    "tier": "A",
    "imageSrc": "/assets/vouchers/liquidation.webp",
    "effectKo": "효과 원문: All cards and packs in shop are 50% off",
    "effectEn": "All cards and packs in shop are 50% off",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Redeem at least 10 Voucher cards in one run / Wiki notes: Also reduces the sell value of your present jokers Prices are rounded half down",
    "sourcePosition": "A-4 (Strong in the right situation)"
  },
  {
    "id": "voucher-overstock-plus",
    "nameEn": "Overstock Plus",
    "tier": "A",
    "imageSrc": "/assets/vouchers/overstock-plus.webp",
    "effectKo": "효과 원문: +1 card slot available in shop (to 4 slots)",
    "effectEn": "+1 card slot available in shop (to 4 slots)",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Spend a total of $2500 at the shop / Wiki notes: Also immediately restocks any empty card slots in the Shop when purchased",
    "sourcePosition": "A-5 (Strong in the right situation)"
  },
  {
    "id": "voucher-reroll-surplus",
    "nameEn": "Reroll Surplus",
    "tier": "A",
    "imageSrc": "/assets/vouchers/reroll-surplus.webp",
    "effectKo": "효과 원문: Rerolls cost $2 less",
    "effectEn": "Rerolls cost $2 less",
    "category": "Base Voucher",
    "notes": "Unlock: Reroll the shop a total of 100 times",
    "sourcePosition": "A-6 (Strong in the right situation)"
  },
  {
    "id": "voucher-seed-money",
    "nameEn": "Seed Money",
    "tier": "B",
    "imageSrc": "/assets/vouchers/seed-money.webp",
    "effectKo": "효과 원문: Raise the cap on interest earned in each round to $10",
    "effectEn": "Raise the cap on interest earned in each round to $10",
    "category": "Base Voucher",
    "notes": "Unlock: Max out the interest per round earnings for ten consecutive rounds / Wiki notes: Does nothing when playing the Green Deck.",
    "sourcePosition": "B-1 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-paint-brush",
    "nameEn": "Paint Brush",
    "tier": "B",
    "imageSrc": "/assets/vouchers/paint-brush.webp",
    "effectKo": "효과 원문: +1 Hand Size",
    "effectEn": "+1 Hand Size",
    "category": "Base Voucher",
    "notes": "Unlock: Reduce your hand size down to 5 cards",
    "sourcePosition": "B-2 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-wasteful",
    "nameEn": "Wasteful",
    "tier": "B",
    "imageSrc": "/assets/vouchers/wasteful.webp",
    "effectKo": "효과 원문: Permanently gain +1 discard each round",
    "effectEn": "Permanently gain +1 discard each round",
    "category": "Base Voucher",
    "notes": "Unlock: Discard a total of 2500 cards",
    "sourcePosition": "B-3 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-crystal-ball",
    "nameEn": "Crystal Ball",
    "tier": "B",
    "imageSrc": "/assets/vouchers/crystal-ball.webp",
    "effectKo": "효과 원문: +1 consumable slot",
    "effectEn": "+1 consumable slot",
    "category": "Base Voucher",
    "notes": "Unlock: Use a total of 25 Tarot cards from booster packs / Wiki notes: Omen Globe has a 20% individual chance to replace the Tarot card with a Spectral card for every card in the Arcana Pack",
    "sourcePosition": "B-4 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-palette",
    "nameEn": "Palette",
    "tier": "B",
    "imageSrc": "/assets/vouchers/palette.webp",
    "effectKo": "효과 원문: +1 Hand Size again",
    "effectEn": "+1 Hand Size again",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Reduce your hand size down to 5 cards",
    "sourcePosition": "B-5 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-blank",
    "nameEn": "Blank",
    "tier": "B",
    "imageSrc": "/assets/vouchers/blank.webp",
    "effectKo": "효과 원문: Does nothing?",
    "effectEn": "Does nothing?",
    "category": "Base Voucher",
    "notes": "Unlock: Redeem Blank 10 total times / Wiki notes: The Antimatter Voucher is always displayed in game as if it was a negative edition and applies the same effect as negative Jokers",
    "sourcePosition": "B-6 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-reroll-glut",
    "nameEn": "Reroll Glut",
    "tier": "B",
    "imageSrc": "/assets/vouchers/reroll-glut.webp",
    "effectKo": "효과 원문: Rerolls cost an additional $2 less",
    "effectEn": "Rerolls cost an additional $2 less",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Reroll the shop a total of 100 times",
    "sourcePosition": "B-7 (Good but kinda niche or luxury buys)"
  },
  {
    "id": "voucher-retcon",
    "nameEn": "Retcon",
    "tier": "C",
    "imageSrc": "/assets/vouchers/retcon.webp",
    "effectKo": "효과 원문: Reroll Boss Blind unlimited times, $10 per roll",
    "effectEn": "Reroll Boss Blind unlimited times, $10 per roll",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Discover 25 Blinds",
    "sourcePosition": "C-1 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-recyclomancy",
    "nameEn": "Recyclomancy",
    "tier": "C",
    "imageSrc": "/assets/vouchers/recyclomancy.webp",
    "effectKo": "효과 원문: Permanently gain an additional +1 discard each round",
    "effectEn": "Permanently gain an additional +1 discard each round",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Discard a total of 2500 cards",
    "sourcePosition": "C-2 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-glow-up",
    "nameEn": "Glow Up",
    "tier": "C",
    "imageSrc": "/assets/vouchers/glow-up.webp",
    "effectKo": "효과 원문: Foil, Holographic, and Polychrome cards appear 4x more often",
    "effectEn": "Foil, Holographic, and Polychrome cards appear 4x more often",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Have at least 5 Joker cards with Foil, Holographic, or Polychrome (or Negative) effect / Wiki notes: Polychrome on Jokers actually appears 3x more often for Hone and 7x more often for Glow Up",
    "sourcePosition": "C-3 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-hone",
    "nameEn": "Hone",
    "tier": "C",
    "imageSrc": "/assets/vouchers/hone.webp",
    "effectKo": "효과 원문: Foil, Holographic, and Polychrome cards appear 2x more often",
    "effectEn": "Foil, Holographic, and Polychrome cards appear 2x more often",
    "category": "Base Voucher",
    "notes": "Unlock: Have at least 5 Joker cards with Foil, Holographic, or Polychrome (or Negative) effect / Wiki notes: Polychrome on Jokers actually appears 3x more often for Hone and 7x more often for Glow Up",
    "sourcePosition": "C-4 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-money-tree",
    "nameEn": "Money Tree",
    "tier": "C",
    "imageSrc": "/assets/vouchers/money-tree.webp",
    "effectKo": "효과 원문: Raise the cap on interest earned in each round to $20",
    "effectEn": "Raise the cap on interest earned in each round to $20",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Max out the interest per round earnings for ten consecutive rounds / Wiki notes: Does nothing when playing the Green Deck.",
    "sourcePosition": "C-5 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-observatory",
    "nameEn": "Observatory",
    "tier": "C",
    "imageSrc": "/assets/vouchers/observatory.webp",
    "effectKo": "효과 원문: Planet cards in your consumable area give X1.5 Mult for their specified poker hand",
    "effectEn": "Planet cards in your consumable area give X1.5 Mult for their specified poker hand",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Use a total of 25 Planet cards from booster packs / Wiki notes: Telescope picks the higher tier hand in case of multiple most played hands",
    "sourcePosition": "C-6 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-omen-globe",
    "nameEn": "Omen Globe",
    "tier": "C",
    "imageSrc": "/assets/vouchers/omen-globe.webp",
    "effectKo": "효과 원문: Spectral cards may appear in any of the Arcana Packs",
    "effectEn": "Spectral cards may appear in any of the Arcana Packs",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Use a total of 25 Tarot cards from booster packs / Wiki notes: Omen Globe has a 20% individual chance to replace the Tarot card with a Spectral card for every card in the Arcana Pack",
    "sourcePosition": "C-7 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-illusion",
    "nameEn": "Illusion",
    "tier": "C",
    "imageSrc": "/assets/vouchers/illusion.webp",
    "effectKo": "효과 원문: Playing cards in shop may have an Enhancement , Edition , and/or a Seal",
    "effectEn": "Playing cards in shop may have an Enhancement , Edition , and/or a Seal",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Buy a total of 20 Playing cards from the shop / Wiki notes: Illusion is currently (v1.0.1o-FULL) bugged, and cards in the shop cannot have seals, only enhancements and/or editions, and is unaffected by Hone/Glow Up.",
    "sourcePosition": "C-8 (Usually either overkill or low impact)"
  },
  {
    "id": "voucher-magic-trick",
    "nameEn": "Magic Trick",
    "tier": "D",
    "imageSrc": "/assets/vouchers/magic-trick.webp",
    "effectKo": "효과 원문: Playing cards can be purchased from the shop",
    "effectEn": "Playing cards can be purchased from the shop",
    "category": "Base Voucher",
    "notes": "Unlock: Buy a total of 20 Playing cards from the shop / Wiki notes: Illusion is currently (v1.0.1o-FULL) bugged, and cards in the shop cannot have seals, only enhancements and/or editions, and is unaffected by Hone/Glow Up.",
    "sourcePosition": "D-1 (Actually harmful in most situations)"
  },
  {
    "id": "voucher-planet-merchant",
    "nameEn": "Planet Merchant",
    "tier": "D",
    "imageSrc": "/assets/vouchers/planet-merchant.webp",
    "effectKo": "효과 원문: Planet cards appear 2X more frequently in the shop",
    "effectEn": "Planet cards appear 2X more frequently in the shop",
    "category": "Base Voucher",
    "notes": "Unlock: Buy a total of 50 Planet cards from the shop / Wiki notes: For details, see The Shop#Vouchers",
    "sourcePosition": "D-2 (Actually harmful in most situations)"
  },
  {
    "id": "voucher-planet-tycoon",
    "nameEn": "Planet Tycoon",
    "tier": "D",
    "imageSrc": "/assets/vouchers/planet-tycoon.webp",
    "effectKo": "효과 원문: Planet cards appear 4X more frequently in the shop",
    "effectEn": "Planet cards appear 4X more frequently in the shop",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Buy a total of 50 Planet cards from the shop / Wiki notes: For details, see The Shop#Vouchers",
    "sourcePosition": "D-3 (Actually harmful in most situations)"
  },
  {
    "id": "voucher-tarot-tycoon",
    "nameEn": "Tarot Tycoon",
    "tier": "D",
    "imageSrc": "/assets/vouchers/tarot-tycoon.webp",
    "effectKo": "효과 원문: Tarot cards appear 4X more frequently in the shop",
    "effectEn": "Tarot cards appear 4X more frequently in the shop",
    "category": "Upgraded Voucher",
    "notes": "Unlock: Buy a total of 50 Tarot cards from the shop / Wiki notes: For details, see The Shop#Vouchers",
    "sourcePosition": "D-4 (Actually harmful in most situations)"
  }
];

const spectralsTiers: TierDefinition[] = [
  {
    "id": "S",
    "label": "Very Strong",
    "accent": "#f36e76",
    "textColor": "#11100e"
  },
  {
    "id": "A",
    "label": "Strong",
    "accent": "#ffb767",
    "textColor": "#11100e"
  },
  {
    "id": "B",
    "label": "Very Strong Early Game",
    "accent": "#f3e05e",
    "textColor": "#11100e"
  },
  {
    "id": "C",
    "label": "Weaker But Mostly Harmless",
    "accent": "#95e872",
    "textColor": "#11100e"
  },
  {
    "id": "D",
    "label": "Harmful in most situations",
    "accent": "#63d7d6",
    "textColor": "#11100e"
  }
];

const spectralsItems: TierItem[] = [
  {
    "id": "spectral-black-hole",
    "nameEn": "Black Hole",
    "tier": "S",
    "imageSrc": "/assets/spectrals/black-hole.webp",
    "effectKo": "효과 원문: Upgrades every poker hand (including secret hands not yet discovered) by one level.",
    "effectEn": "Upgrades every poker hand (including secret hands not yet discovered) by one level.",
    "category": "Spectral Card",
    "sourcePosition": "S-1 (Very Strong)"
  },
  {
    "id": "spectral-trance",
    "nameEn": "Trance",
    "tier": "S",
    "imageSrc": "/assets/spectrals/trance.webp",
    "effectKo": "효과 원문: Adds a Blue Seal to 1 selected card.",
    "effectEn": "Adds a Blue Seal to 1 selected card.",
    "category": "Spectral Card",
    "sourcePosition": "S-2 (Very Strong)"
  },
  {
    "id": "spectral-the-soul",
    "nameEn": "The Soul",
    "tier": "S",
    "imageSrc": "/assets/spectrals/the-soul.webp",
    "effectKo": "효과 원문: Creates a Legendary Joker. (Must have room) Artwork: This card is animated, with the gem beating like a heart, or perhaps something inside is trying to break out...",
    "effectEn": "Creates a Legendary Joker. (Must have room) Artwork: This card is animated, with the gem beating like a heart, or perhaps something inside is trying to break out...",
    "category": "Spectral Card",
    "sourcePosition": "S-3 (Very Strong)"
  },
  {
    "id": "spectral-ectoplasm",
    "nameEn": "Ectoplasm",
    "tier": "S",
    "imageSrc": "/assets/spectrals/ectoplasm.webp",
    "effectKo": "효과 원문: Add Negative to a random Joker , but -1 Hand Size , plus another -1 hand size for each time Ectoplasm has been used this run, e.g. using Ectoplasm 3 times in the same run decreases hand size by a total of 6 (1+2+3)",
    "effectEn": "Add Negative to a random Joker , but -1 Hand Size , plus another -1 hand size for each time Ectoplasm has been used this run, e.g. using Ectoplasm 3 times in the same run decreases hand size by a total of 6 (1+2+3)",
    "category": "Spectral Card",
    "sourcePosition": "S-4 (Very Strong)"
  },
  {
    "id": "spectral-immolate",
    "nameEn": "Immolate",
    "tier": "A",
    "imageSrc": "/assets/spectrals/immolate.webp",
    "effectKo": "효과 원문: Destroys 5 random cards in hand, but gain $20 .",
    "effectEn": "Destroys 5 random cards in hand, but gain $20 .",
    "category": "Spectral Card",
    "sourcePosition": "A-1 (Strong)"
  },
  {
    "id": "spectral-cryptid",
    "nameEn": "Cryptid",
    "tier": "A",
    "imageSrc": "/assets/spectrals/cryptid.webp",
    "effectKo": "효과 원문: Creates 2 exact copies (including Enhancements, Editions and Seals ) of a selected card in your hand.",
    "effectEn": "Creates 2 exact copies (including Enhancements, Editions and Seals ) of a selected card in your hand.",
    "category": "Spectral Card",
    "sourcePosition": "A-2 (Strong)"
  },
  {
    "id": "spectral-talisman",
    "nameEn": "Talisman",
    "tier": "A",
    "imageSrc": "/assets/spectrals/talisman.webp",
    "effectKo": "효과 원문: Add a Gold Seal to 1 selected card.",
    "effectEn": "Add a Gold Seal to 1 selected card.",
    "category": "Spectral Card",
    "sourcePosition": "A-3 (Strong)"
  },
  {
    "id": "spectral-hex",
    "nameEn": "Hex",
    "tier": "B",
    "imageSrc": "/assets/spectrals/hex.webp",
    "effectKo": "효과 원문: Adds Polychrome to a random Joker , and destroys the rest.",
    "effectEn": "Adds Polychrome to a random Joker , and destroys the rest.",
    "category": "Spectral Card",
    "sourcePosition": "B-1 (Very Strong Early Game)"
  },
  {
    "id": "spectral-ankh",
    "nameEn": "Ankh",
    "tier": "B",
    "imageSrc": "/assets/spectrals/ankh.webp",
    "effectKo": "효과 원문: Creates a copy of 1 of your Jokers at random, then destroys the others, leaving you with two identical Jokers. ( Editions are also copied, except Negative)",
    "effectEn": "Creates a copy of 1 of your Jokers at random, then destroys the others, leaving you with two identical Jokers. ( Editions are also copied, except Negative)",
    "category": "Spectral Card",
    "sourcePosition": "B-2 (Very Strong Early Game)"
  },
  {
    "id": "spectral-medium",
    "nameEn": "Medium",
    "tier": "C",
    "imageSrc": "/assets/spectrals/medium.webp",
    "effectKo": "효과 원문: Adds a Purple Seal to 1 selected card.",
    "effectEn": "Adds a Purple Seal to 1 selected card.",
    "category": "Spectral Card",
    "sourcePosition": "C-1 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-aura",
    "nameEn": "Aura",
    "tier": "C",
    "imageSrc": "/assets/spectrals/aura.webp",
    "effectKo": "효과 원문: Add Foil , Holographic , or Polychrome edition (determined at random) to 1 selected card in hand.",
    "effectEn": "Add Foil , Holographic , or Polychrome edition (determined at random) to 1 selected card in hand.",
    "category": "Spectral Card",
    "sourcePosition": "C-2 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-deja-vu",
    "nameEn": "Deja Vu",
    "tier": "C",
    "imageSrc": "/assets/spectrals/deja-vu.webp",
    "effectKo": "효과 원문: Adds a Red Seal to 1 selected card.",
    "effectEn": "Adds a Red Seal to 1 selected card.",
    "category": "Spectral Card",
    "sourcePosition": "C-3 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-sigil",
    "nameEn": "Sigil",
    "tier": "C",
    "imageSrc": "/assets/spectrals/sigil.webp",
    "effectKo": "효과 원문: Converts all cards in hand to a single random suit .",
    "effectEn": "Converts all cards in hand to a single random suit .",
    "category": "Spectral Card",
    "sourcePosition": "C-4 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-familiar",
    "nameEn": "Familiar",
    "tier": "C",
    "imageSrc": "/assets/spectrals/familiar.webp",
    "effectKo": "효과 원문: Destroy 1 random card in your hand, but add 3 random Enhanced face cards instead.",
    "effectEn": "Destroy 1 random card in your hand, but add 3 random Enhanced face cards instead.",
    "category": "Spectral Card",
    "sourcePosition": "C-5 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-grim",
    "nameEn": "Grim",
    "tier": "C",
    "imageSrc": "/assets/spectrals/grim.webp",
    "effectKo": "효과 원문: Destroy 1 random card in your hand, but add 2 random Enhanced Aces instead.",
    "effectEn": "Destroy 1 random card in your hand, but add 2 random Enhanced Aces instead.",
    "category": "Spectral Card",
    "sourcePosition": "C-6 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-incantation",
    "nameEn": "Incantation",
    "tier": "C",
    "imageSrc": "/assets/spectrals/incantation.webp",
    "effectKo": "효과 원문: Destroy 1 random card in your hand, but add 4 random Enhanced numbered cards instead.",
    "effectEn": "Destroy 1 random card in your hand, but add 4 random Enhanced numbered cards instead.",
    "category": "Spectral Card",
    "sourcePosition": "C-7 (Weaker But Mostly Harmless)"
  },
  {
    "id": "spectral-wraith",
    "nameEn": "Wraith",
    "tier": "D",
    "imageSrc": "/assets/spectrals/wraith.webp",
    "effectKo": "효과 원문: Creates a random Rare Joker (must have room), but sets money to $0 .",
    "effectEn": "Creates a random Rare Joker (must have room), but sets money to $0 .",
    "category": "Spectral Card",
    "sourcePosition": "D-1 (Harmful in most situations)"
  },
  {
    "id": "spectral-ouija",
    "nameEn": "Ouija",
    "tier": "D",
    "imageSrc": "/assets/spectrals/ouija.webp",
    "effectKo": "효과 원문: Converts all cards in hand to a single random rank , but -1 Hand Size .",
    "effectEn": "Converts all cards in hand to a single random rank , but -1 Hand Size .",
    "category": "Spectral Card",
    "sourcePosition": "D-2 (Harmful in most situations)"
  }
];

const withTranslatedEffects = (items: TierItem[]): TierItem[] =>
  items.map((item) => {
    const effectEn = normalizeEffectText(item.effectEn ?? item.effectKo);
    const localization = getKoreanLocalization(item.nameEn);

    return {
      ...item,
      nameKo: item.nameKo ?? localization?.nameKo,
      effectEn,
      effectKo: localization?.effectKo ?? translateEffect(effectEn)
    };
  });

const rawTierLists: TierList[] = [
  {
    id: "jokers",
    title: "Joker Tier List",
    shortTitle: "Jokers",
    description: "조커 카드의 런 승리 기여도와 빌드 중심성을 기준으로 재구성한 티어리스트",
    itemLabel: "Jokers",
    sourceImage: "01.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Jokers",
    facetKey: "rarity",
    facetLabel: "Rarity",
    facetOrder: rarityOrder,
    tiers: jokerTiers,
    items: jokerItems,
  },
  {
    id: "decks",
    title: "Deck Tier List",
    shortTitle: "Decks",
    description: "덱별 시작 조건과 운영 난이도 기준 티어리스트",
    itemLabel: "Decks",
    sourceImage: "02.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Decks",
    facetKey: "category",
    facetLabel: "Type",
    tiers: decksTiers,
    items: decksItems,
  },
  {
    id: "planets",
    title: "Planet Card Tier List",
    shortTitle: "Planets",
    description: "포커 핸드 레벨업 효율 기준 행성 카드 티어리스트",
    itemLabel: "Planet Cards",
    sourceImage: "03.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Planet_Cards",
    facetKey: "category",
    facetLabel: "Type",
    tiers: planetsTiers,
    items: planetsItems,
  },
  {
    id: "tarots",
    title: "Tarot Card Tier List",
    shortTitle: "Tarots",
    description: "덱 조작, 돈, 조커 생성 효과 중심 타로 카드 티어리스트",
    itemLabel: "Tarot Cards",
    sourceImage: "04.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Tarot_Cards",
    facetKey: "category",
    facetLabel: "Type",
    tiers: tarotsTiers,
    items: tarotsItems,
  },
  {
    id: "tags",
    title: "Tag Tier List",
    shortTitle: "Tags",
    description: "블라인드 스킵 보상 태그의 기대값 기준 티어리스트",
    itemLabel: "Tags",
    sourceImage: "05.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Tags",
    facetKey: "category",
    facetLabel: "Type",
    tiers: tagsTiers,
    items: tagsItems,
  },
  {
    id: "vouchers",
    title: "Voucher Tier List",
    shortTitle: "Vouchers",
    description: "상점 바우처의 구매 우선순위와 위험도 기준 티어리스트",
    itemLabel: "Vouchers",
    sourceImage: "06.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Vouchers",
    facetKey: "category",
    facetLabel: "Type",
    facetOrder: ["Base Voucher", "Upgraded Voucher"],
    tiers: vouchersTiers,
    items: vouchersItems,
  },
  {
    id: "spectrals",
    title: "Spectral Card Tier List",
    shortTitle: "Spectrals",
    description: "고위험 고보상 스펙트럴 카드의 상황별 가치 티어리스트",
    itemLabel: "Spectral Cards",
    sourceImage: "07.webp",
    metadataSource: "https://balatrogame.fandom.com/wiki/Spectral_Cards",
    facetKey: "category",
    facetLabel: "Type",
    tiers: spectralsTiers,
    items: spectralsItems,
  },
];

export const tierLists: TierList[] = rawTierLists.map((tierList) => ({
  ...tierList,
  items: withTranslatedEffects(tierList.items)
}));

export const tierListById = Object.fromEntries(
  tierLists.map((tierList) => [tierList.id, tierList])
) as Record<TierListId, TierList>;

export const defaultTierListId: TierListId = "jokers";

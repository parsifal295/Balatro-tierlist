import type { JokerCard } from "./jokers";
import { getJokerTypes, type JokerType } from "./jokerTypes";

export const namuWikiJokerGuideSource =
  "https://namu.wiki/w/Balatro/%EC%A1%B0%EC%BB%A4%20%EC%B9%B4%EB%93%9C";

export type JokerGuide = {
  ko: string;
  en: string;
  source: string;
};

const guideOverridesKo: Record<string, string> = {
  Blueprint:
    "오른쪽 조커의 능력을 복사하므로 라운드 전후로 위치를 바꿔 핵심 효과를 두 번 쓰는 운용이 중요합니다. 강한 곱배수, 리트리거, 생성형 조커와 함께 두면 런을 크게 안정화합니다.",
  Brainstorm:
    "가장 왼쪽 조커를 복사하므로 복사 대상의 위치를 고정하고 나머지 조커를 그 뒤에 배치하는 식으로 운영합니다. 청사진과 함께 쓰면 복사 효과를 중첩해 고점을 만들 수 있습니다.",
  "Glass Joker":
    "유리 카드가 파괴될수록 성장하는 곱배수 조커라서 덱에 유리 카드를 충분히 만든 뒤 의도적으로 소모할 때 강합니다. 유리 카드 수급이 부족하면 성장 속도가 느리니 강화 카드 관리가 필요합니다.",
  Canio:
    "페이스 카드를 파괴할 수 있는 타로, 스펙트럴, 조커와 함께 키우는 성장형 곱배수 조커입니다. 초반부터 덱을 정리하면서 성장시키면 후반 점수 축으로 쓰기 좋습니다.",
  Yorick:
    "버린 카드 수로 성장하므로 디스카드가 넉넉한 덱과 잘 맞습니다. 성장까지 시간이 필요하니 초반 점수 보조 조커와 함께 운영하는 편이 안정적입니다.",
  Cavendish:
    "큰 조건 없이 X3 배수를 주는 안정적인 곱배수 조커입니다. 파괴 확률은 매우 낮지만, 핵심 조커로 쓸 때는 대체 점수원을 일부 확보해두면 좋습니다.",
  Triboulet:
    "킹과 퀸을 득점시키는 덱에서 폭발적인 곱배수를 냅니다. 페이스 카드 복사, 강화, 리트리거 조커와 결합하면 보스 블라인드 처리력이 크게 올라갑니다.",
  Perkeo:
    "보유 소모품을 네거티브로 복사하므로 강한 타로, 행성, 스펙트럴을 손에 들고 상점을 나가는 운영이 핵심입니다. 소모품 슬롯과 경제를 함께 관리해야 고점이 납니다.",
  Blackboard:
    "손패에 빨강 문양이 없을 때 강한 곱배수를 주므로 스페이드와 클럽 중심 덱에서 안정적입니다. 하트와 다이아몬드가 손에 남지 않도록 버리기와 덱 정제가 중요합니다.",
  "Hanging Chad":
    "첫 득점 카드를 반복 발동시켜 강화 카드, 인장, 폴리크롬 효과의 가치를 키웁니다. 한 장에 보너스를 몰아주는 빌드에서 특히 효율이 좋습니다.",
  Mime:
    "손에 든 카드 효과를 재발동하므로 강철 카드, 골드 카드, 남작 같은 손패 기반 효과와 함께 고점을 냅니다. 핸드 크기 증가와 같이 쓰면 효율이 더 좋아집니다.",
  Baron:
    "손에 남긴 킹이 곱배수를 주므로 킹 중심 덱 정제와 핸드 크기 증가가 중요합니다. 마임, 청사진, 브레인스토밍 같은 복사/재발동 카드와 함께 최상급 고점을 만들 수 있습니다.",
  "Hack":
    "2, 3, 4, 5 카드를 재발동시키므로 낮은 숫자 카드에 강화와 인장을 몰아주는 덱에서 강합니다. 덱을 얇게 만들수록 원하는 카드가 더 자주 잡힙니다.",
  "DNA":
    "첫 핸드가 한 장이면 그 카드를 복사하므로 핵심 강화 카드나 인장 카드를 불리는 데 좋습니다. 복사할 카드의 품질이 낮으면 가치가 떨어지니 타이밍을 보고 사용합니다.",
  "Campfire":
    "카드를 팔 때마다 곱배수가 오르지만 앤티가 넘어가면 초기화됩니다. 상점에서 싼 카드와 대여 카드를 활용해 해당 앤티의 폭발력을 만드는 운영이 좋습니다.",
  "Burnt Joker":
    "처음 버린 포커 핸드의 레벨을 올려주므로 주력 핸드를 정하고 매 라운드 첫 디스카드를 맞추는 운영이 중요합니다. 행성 카드가 부족한 빌드에서 특히 유용합니다.",
  "Credit Card":
    "초반에 빚을 감수하고 핵심 조커나 바우처를 빨리 사는 경제 도구입니다. 이자 기반 운영과는 충돌할 수 있으니 필요한 구매를 마친 뒤 부채를 정리하는 것이 좋습니다.",
  "Gros Michel":
    "초반 합배수 효율이 좋지만 라운드 종료 시 파괴될 수 있습니다. 사라진 뒤 캐번디시가 등장할 수 있으므로 임시 점수원 겸 전환 카드로 보는 편이 좋습니다.",
  "Invisible Joker":
    "충분히 오래 보유한 뒤 팔면 무작위 조커를 복제합니다. 핵심 조커 수가 적거나 복제 대상이 좋은 상태에서 판매해야 기대값이 높습니다.",
  "Trading Card":
    "라운드 첫 버리기가 한 장이면 카드를 제거하고 돈을 얻습니다. 덱 압축과 경제를 동시에 챙길 수 있어 필요 없는 카드를 꾸준히 지우는 운영에 좋습니다."
};

const guideOverridesEn: Record<string, string> = {
  Blueprint:
    "Copies the Joker on its right, so reposition it around each scoring or economy moment to double the strongest effect available. It is best beside high-impact Mult, retrigger, and generation Jokers.",
  Brainstorm:
    "Copies the leftmost Joker, so keep the target fixed on the far left and build the rest of the row around it. It can stack with Blueprint for very high ceilings.",
  "Glass Joker":
    "Scales when Glass Cards are destroyed, making it strong once the deck can create and spend Glass Cards reliably. Without enough Glass supply, its scaling is slow.",
  Canio:
    "A scaling X Mult Joker that wants steady face-card destruction from deck manipulation, Tarot, Spectral, or Joker effects. Grow it early while trimming the deck.",
  Yorick:
    "Scales from discarded cards, so it fits decks with extra discards and patient setup time. Pair it with early scoring support until the X Mult becomes large.",
  Cavendish:
    "A stable X3 Mult Joker with almost no setup. The destruction chance is tiny, but a backup scoring plan keeps the run safer.",
  Triboulet:
    "Explodes in King and Queen scoring decks. Copy effects, enhancements, and retriggers can turn each scored face card into a major multiplier.",
  Perkeo:
    "Duplicates a held consumable as Negative at shop end, so hold the best Tarot, Planet, or Spectral card before leaving the shop. Consumable slots and economy matter a lot.",
  Blackboard:
    "Works best in Spade and Club-focused decks because red suits in hand disable it. Discards and deck trimming help keep the hand clean.",
  "Hanging Chad":
    "Retriggers the first scored card, making enhancements, seals, editions, and card-specific bonuses much stronger. It shines when one card carries most of the value.",
  Mime:
    "Retriggers held-card effects, so it pairs with Steel Cards, Gold Cards, Baron, and hand-size increases. More cards in hand usually means more value.",
  Baron:
    "Rewards holding Kings in hand, so King-focused deck shaping and hand-size increases are key. Mime, Blueprint, and Brainstorm can push its ceiling very high.",
  Hack:
    "Retriggers 2s, 3s, 4s, and 5s, so stack enhancements and seals on low cards. A thinner deck makes those targets appear more often.",
  DNA:
    "Copies the first single-card hand each round, making it useful for multiplying a premium enhanced or sealed card. Wait until the copy target is worth duplicating.",
  "Campfire":
    "Gains X Mult as you sell cards, then resets each Ante. Cheap cards and rentals can turn shop resources into a short-term power spike.",
  "Burnt Joker":
    "Levels the first discarded poker hand each round. Choose a main hand and line up the first discard, especially when Planet cards are scarce.",
  "Credit Card":
    "Lets you take debt to buy key Jokers or Vouchers early. It can clash with interest plans, so clear the debt after the important purchases.",
  "Gros Michel":
    "Strong early additive Mult, but it can destroy itself at round end. Treat it as temporary scoring and a path toward Cavendish appearing later.",
  "Invisible Joker":
    "After holding it long enough, selling it copies a random Joker. Sell when your Joker pool has strong targets and fewer weak outcomes.",
  "Trading Card":
    "If the first discard is one card, it removes that card and pays money. It is excellent for combining deck trimming with economy."
};

const typeGuideKo: Record<JokerType, string> = {
  chips:
    "칩 보강 조커라서 초반 블라인드 통과와 낮은 레벨 핸드 보완에 좋습니다.",
  additiveMult:
    "합배수 조커라서 초반 점수 안정화에 강하고, 후반에는 곱배수 조커를 받쳐주는 기반 역할을 합니다.",
  multiplicativeMult:
    "곱배수 조커라서 기본 칩과 합배수가 갖춰진 뒤 효율이 크게 오릅니다.",
  gold:
    "경제 조커라서 리롤, 바우처, 핵심 조커 구매 기회를 늘리는 데 가치가 있습니다.",
  retrigger:
    "리트리거 조커라서 강화 카드, 인장, 에디션처럼 카드 한 장의 가치가 높을수록 효율이 커집니다.",
  scaling:
    "성장형 조커라서 초반부터 조건을 의식해 키우면 후반 점수 축으로 전환할 수 있습니다.",
  decay:
    "체감형 조커라서 강한 구간에 빠르게 활용하고, 효율이 떨어지기 전에 판매 타이밍을 잡는 편이 좋습니다.",
  probability:
    "확률형 조커라서 기대값 변동이 크며, 확률 보정이나 여유 있는 점수원과 함께 쓰는 편이 안정적입니다.",
  cardGeneration:
    "카드 생성 조커라서 슬롯과 손패 공간을 관리하면서 필요한 카드만 남기는 운영이 중요합니다.",
  cardDestruction:
    "카드 파괴 조커라서 덱 압축과 성장 조건을 동시에 노릴 수 있지만, 필요한 카드를 지우지 않도록 주의해야 합니다.",
  passive:
    "패시브형 조커라서 직접 점수보다 빌드 조건을 완화하거나 다른 조커의 효율을 끌어올리는 용도로 평가합니다."
};

const typeGuideEn: Record<JokerType, string> = {
  chips:
    "A chip-focused Joker helps clear early blinds and supports low-level poker hands.",
  additiveMult:
    "An additive Mult Joker stabilizes early scoring and later becomes the base that X Mult multiplies.",
  multiplicativeMult:
    "An X Mult Joker becomes much stronger after the deck already has enough Chips and additive Mult.",
  gold:
    "An economy Joker creates more rerolls, vouchers, and chances to buy key Jokers.",
  retrigger:
    "A retrigger Joker gets better as individual cards gain enhancements, seals, editions, or other on-score value.",
  scaling:
    "A scaling Joker should be grown from early antes so it can become a late-game scoring pillar.",
  decay:
    "A decaying Joker is best used during its strongest window, then sold before the downside outweighs the value.",
  probability:
    "A probability Joker has swingy expected value and is safer with probability support or backup scoring.",
  cardGeneration:
    "A card-generation Joker needs slot and hand management so the created cards stay useful.",
  cardDestruction:
    "A card-destruction Joker can trim the deck and trigger scaling, but avoid deleting cards the build still needs.",
  passive:
    "A passive Joker is usually valued for enabling a build or increasing the efficiency of other Jokers rather than raw scoring."
};

const conditionGuides = [
  {
    test: /two pair/i,
    ko: "투 페어를 주력으로 삼거나 랭크가 정리된 덱에서 가치가 높습니다.",
    en: "It is better when Two Pair is a main hand or the deck has clean ranks."
  },
  {
    test: /pair/i,
    ko: "페어 계열 핸드를 자주 만들 수 있는 덱에서 안정적으로 발동합니다.",
    en: "It is reliable in decks that can make Pair-based hands often."
  },
  {
    test: /three of a kind|four of a kind|contains 4/i,
    ko: "같은 랭크를 모으는 덱 정제가 되어 있을수록 발동률이 올라갑니다.",
    en: "It improves as the deck is shaped around repeated ranks."
  },
  {
    test: /straight/i,
    ko: "스트레이트를 자주 만들려면 랭크 분포를 넓게 유지하고 간격을 줄이는 덱 관리가 필요합니다.",
    en: "Straight builds need broad rank coverage and careful deck shaping."
  },
  {
    test: /flush|suit|spade|heart|club|diamond/i,
    ko: "문양을 맞추는 덱 정제와 와일드 카드 보조가 있으면 발동이 쉬워집니다.",
    en: "Suit-focused trimming and Wild Card support make it easier to trigger."
  },
  {
    test: /face|king|queen|jack/i,
    ko: "페이스 카드 중심 덱에서 효율이 좋으며, 보스 블라인드의 페이스 카드 제약은 주의해야 합니다.",
    en: "It fits face-card decks, but face-card boss restrictions can be risky."
  },
  {
    test: /\$|money|interest|earn|sell value/i,
    ko: "이자를 유지하면서 상점 선택지를 늘리는 식으로 운영하면 장기 가치가 커집니다.",
    en: "It gains long-term value when you preserve interest while expanding shop options."
  },
  {
    test: /discard/i,
    ko: "버리기 횟수와 첫 디스카드 조건을 관리하면 안정적으로 가치를 뽑을 수 있습니다.",
    en: "Managing discards and first-discard conditions makes it more consistent."
  }
] as const;

const sentenceForCondition = (
  effectEn: string | undefined,
  language: "ko" | "en"
) => {
  if (!effectEn) {
    return undefined;
  }

  return conditionGuides.find(({ test }) => test.test(effectEn))?.[language];
};

const buildGenericGuide = (
  joker: Pick<JokerCard, "nameEn" | "effectEn" | "category">,
  language: "ko" | "en"
) => {
  const types = getJokerTypes(joker);
  const typeText = language === "ko" ? typeGuideKo : typeGuideEn;
  const primaryGuide = typeText[types[0] ?? "passive"];
  const secondaryType = types.find((type) => type !== types[0]);
  const secondaryGuide = secondaryType ? typeText[secondaryType] : undefined;
  const conditionGuide = sentenceForCondition(joker.effectEn, language);

  return [primaryGuide, conditionGuide, secondaryGuide]
    .filter(Boolean)
    .slice(0, 3)
    .join(" ");
};

export function getJokerGuide(
  joker: Pick<JokerCard, "nameEn" | "effectEn" | "category">
): JokerGuide {
  return {
    ko: guideOverridesKo[joker.nameEn] ?? buildGenericGuide(joker, "ko"),
    en: guideOverridesEn[joker.nameEn] ?? buildGenericGuide(joker, "en"),
    source: namuWikiJokerGuideSource
  };
}

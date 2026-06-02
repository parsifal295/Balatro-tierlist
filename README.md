# Balatro Tier List Archive

Balatro 카드와 아이템 티어리스트를 검색 가능한 웹앱으로 정리한
비공식 팬메이드 프로젝트입니다.

이미지로만 보기 어려운 티어리스트를 카드 단위 데이터로 재구성해,
카드 이름, 효과, 희귀도, 조커 종류, 간단한 공략 메모를 빠르게 확인할 수
있도록 만들었습니다.

배포 주소: https://balatro-tierlist.vercel.app

## 주요 기능

- 조커, 덱, 행성, 타로, 태그, 바우처, 스펙트럴 티어리스트 지원
- 한국어 / 영어 UI 전환
- 카드 이름과 효과 검색
- 티어, 희귀도, 조커 종류 필터
- 카드 hover 시 이름 표시
- 카드 클릭 또는 탭 시 상세 모달 표시
- 상세 모달에서 카드 이미지, 이름, 티어, 효과, 희귀도, 공략 요약 확인
- 모바일, 태블릿, 데스크톱 반응형 레이아웃
- 외부 이미지 핫링크 없이 로컬 이미지 에셋 사용

## 조커 분류

조커는 플레이 성격에 따라 다음 분류로 필터링할 수 있습니다.

- 칩 증가
- 합배수
- 곱배수
- 골드
- 리트리거
- 성장형
- 체감형
- 확률
- 카드 생성
- 카드 파괴
- 패시브형

## 기술 스택

- React
- TypeScript
- Vite
- Tailwind CSS
- Vitest
- React Testing Library

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 `http://127.0.0.1:5173/`을 엽니다.

## 테스트와 빌드

```bash
npm test
npm run build
```

## 프로젝트 구조

- `src/data/tierLists.ts`: 티어리스트와 카드 배치 데이터
- `src/data/jokers.ts`: 조커 카드 기본 데이터
- `src/data/jokerTypes.ts`: 조커 종류 분류 규칙과 라벨
- `src/data/jokerGuides.ts`: 조커별 공략 요약
- `src/data/koreanLocalizations.ts`: 한국어 카드 이름과 효과 설명
- `src/components/`: 카드, 필터, 상세 모달 등 UI 컴포넌트
- `public/assets/`: 앱에서 사용하는 로컬 이미지 에셋
- `references/`: 데이터 정리에 사용한 참고 자료 스냅샷

## 참고 자료

- Balatro Wiki:
  - https://balatrogame.fandom.com/wiki/Jokers
  - https://balatrogame.fandom.com/wiki/Decks
  - https://balatrogame.fandom.com/wiki/Planet_Cards
  - https://balatrogame.fandom.com/wiki/Tarot_Cards
  - https://balatrogame.fandom.com/wiki/Tags
  - https://balatrogame.fandom.com/wiki/Vouchers
  - https://balatrogame.fandom.com/wiki/Spectral_Cards
- Balatro Wiki 한국어 로컬라이징 테이블:
  - https://balatrowiki.org/w/Module:Localization/ko
- 나무위키 Balatro 조커 카드 문서:
  - https://namu.wiki/w/Balatro/%EC%A1%B0%EC%BB%A4%20%EC%B9%B4%EB%93%9C

## 안내

이 프로젝트는 Balatro 팬이 만든 비공식 참고용 웹앱입니다.
Balatro 및 관련 이미지와 명칭의 권리는 원저작권자에게 있습니다.

데이터는 계속 다듬는 중이며, 티어 배치나 공략 메모는 플레이 스타일과
버전에 따라 달라질 수 있습니다.

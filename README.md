# Balatro 티어리스트 아카이브

DCInside Balatro 갤러리 게시물에 첨부된 이미지형 티어리스트 7개를
검색과 필터가 가능한 데이터 기반 웹앱으로 재구성한 프로젝트입니다.
원본 이미지를 그대로 붙여 넣는 방식이 아니라, 각 카드를 개별 데이터와
컴포넌트로 렌더링합니다.

## 주요 기능

- 조커, 덱, 행성, 타로, 태그, 바우처, 스펙트럴 티어리스트 지원
- 앱 전체 한글/영어 전환
- 카드 hover 시 이름 표시
- 카드 클릭 또는 탭 시 상세 모달 표시
- 카드 이름, 효과, 분류, 메모 검색
- 조커 희귀도 필터
- 조커 종류 필터
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
- 모바일, 태블릿, 데스크톱 반응형 레이아웃
- 외부 이미지 핫링크 없이 `public/assets/`의 로컬 이미지 사용

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

## 검증

```bash
npm test -- --run
npm run build
```

## 데이터 구조

- `src/data/tierLists.ts`: 7개 티어리스트와 카드 배치 데이터
- `src/data/jokers.ts`: 조커 원본 데이터
- `src/data/jokerTypes.ts`: 조커 종류 분류 규칙과 라벨
- `src/data/koreanLocalizations.ts`: 한글 카드 이름과 효과 설명
- `public/assets/`: 앱에서 사용하는 로컬 카드 이미지
- `references/`: 원본 이미지와 메타데이터 스냅샷

## 참고 자료

- 티어 배치 원본:
  https://gall.dcinside.com/mgallery/board/view/?id=balatro&no=19766&page=1
- 나무위키 조커 카드 문서:
  https://namu.moe/w/Balatro/%EC%A1%B0%EC%BB%A4%20%EC%B9%B4%EB%93%9C
- 나무위키 바우처 문서:
  https://namu.moe/w/Balatro/%EB%B0%94%EC%9A%B0%EC%B2%98?from=%EB%B0%9C%EB%9D%BC%ED%8A%B8%EB%A1%9C+%EB%B0%94%EC%9A%B0%EC%B2%98
- Balatro Wiki 한글 로컬라이징 테이블:
  https://balatrowiki.org/w/Module:Localization/ko
- Balatro Wiki 메타데이터와 이미지 참고:
  https://balatrogame.fandom.com/wiki/Jokers
  https://balatrogame.fandom.com/wiki/Decks
  https://balatrogame.fandom.com/wiki/Planet_Cards
  https://balatrogame.fandom.com/wiki/Tarot_Cards
  https://balatrogame.fandom.com/wiki/Tags
  https://balatrogame.fandom.com/wiki/Vouchers
  https://balatrogame.fandom.com/wiki/Spectral_Cards

## 메모

이 프로젝트는 비공식 팬 참고용 프로젝트입니다. 원본 이미지에서 식별이
애매한 일부 배치는 데이터 파일의 `uncertain: true`와 `notes`로 표시했습니다.

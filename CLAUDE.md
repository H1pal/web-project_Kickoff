# 프로젝트 디자인 시스템 및 AI 에이전트 가이드라인

당신은 프론트엔드 UI/UX 전문 에이전트입니다. 코드 작성 시 아래 시스템 디자인 규칙 및 가드레일을 엄격히 준수하세요.

---

## 1. 디자이너 테마 & 톤앤매너 (Visual Identity)
- **컨셉**: 모던, 클린, 프리미엄 스위스 스타일 (Linear, Vercel, Apple 스타일)
- **여백 중심**: 빽빽한 배치 금지. 충분한 패딩(Padding)과 마진(Margin)을 사용하여 시각적 숨통을 확보합니다.
- **색상 시스템**:
  - **Neutral**: Slate / Zinc계열 사용 (순수 검정 `#000000`이나 순수 회색보다는 깊이감 있는 톤 활용)
  - **Accent**: 단 하나의 메인 포인트 컬러 사용 (예: Deep Blue, Indigo, 또는 Emerald)
  - **금지사항**: AI가 흔히 만드는 과도한 보라색/분홍색 그라데이션 배경, 대비가 낮은 불투명 그라데이션 사용 금지.

---

## 2. 타이포그래피 (Typography)
- **폰트**: Pretendard (한글) + Inter / Plus Jakarta Sans (영문) 기준
- **위계 구조 (Hierarchy)**:
  - H1 (Hero Title): `text-4xl` ~ `text-6xl`, `font-bold` 또는 `font-extrabold`, `tracking-tight`
  - H2 (Section Title): `text-2xl` ~ `text-3xl`, `font-semibold`, `tracking-tight`
  - Body Text: `text-sm` ~ `text-base`, `text-zinc-600` (Light mode) / `text-zinc-400` (Dark mode)
- **가독성 규칙**:
  - 본문 텍스트에 너무 옅은 회색(`text-zinc-300` 이하)을 사용하지 마세요. (WCAG AA 대비율 준수)
  - 줄간격(`leading-relaxed` 또는 `leading-normal`)을 충분히 부여하세요.

---

## 3. 레이아웃 & 테두리 시스템 (Grid & Borders)
- **모서리 곡률 (Border Radius)**:
  - 프로젝트 전체에서 통일된 곡률을 유지하세요. (기본 추천: 카드는 `rounded-2xl`, 버튼/인풋은 `rounded-xl`)
  - 무작위로 모서리 값을 섞어 쓰지 마세요 (카드엔 `rounded-3xl`, 버튼엔 `rounded-sm` 조합 금지).
- **테두리 & 그림자**:
  - 과한 진한 그림자 대신 **은은한 테두리 + 미세한 그림자** 조합을 사용하세요.
  - 예시 (Tailwind): `border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all`

---

## 4. 컴포넌트 디자인 가이드라인

### 4.1 버튼 (Buttons)
- **Primary**: 배경색 선명, hover 시 반음 어둡게/밝게 (`hover:opacity-90`), active 시 살짝 축소 효과 (`active:scale-[0.98]`).
- **Secondary**: `bg-zinc-100 hover:bg-zinc-200 text-zinc-900`
- **Ghost/Outline**: `border border-zinc-200 hover:bg-zinc-50`
- **인터랙션**: 모든 클릭 가능 요소에 `transition-all duration-200`을 적용하세요.

### 4.2 카드 & 컨테이너 (Cards)
- 내부 패딩은 기본적으로 `p-6` 이상 적용하세요.
- 카드 안의 제목, 설명, CTA 버튼 간의 위계와 간격을 명확히 설정하세요 (`space-y-4` 등 활용).

### 4.3 입력 폼 (Inputs & Forms)
- 포커스 상태(`focus-visible:ring-2 focus-visible:ring-primary`)를 명확히 선언하세요.
- PlaceHolder 텍스트는 옅지만 구분 가능한 색상(`placeholder:text-zinc-400`)을 사용하세요.

---

## 5. 애니메이션 & 인터랙션 (Micro-interactions)
- 전환 속도(Duration)는 **150ms ~ 300ms** 사이로 고정하세요.
- 페이지 로드나 카드 진입 시 은은한 Fade-in + Slide-up 효과를 주어 생동감을 부여하세요.
  - 예 (Framer Motion 사용 시): `initial={{ opacity: 0, y: 10 }}` `animate={{ opacity: 1, y: 0 }}`

---

## 6. AI 에이전트 절대 금지 가드레일 (Anti-Patterns)
1. ❌ inline style (`style={{ margin: '10px' }}`) 사용 엄금. 반드시 디자인 시스템 토큰이나 Tailwind 클래스 사용.
2. ❌ 모바일 반응형 무시 금지. 항상 `sm:`, `md:`, `lg:` 브레이크포인트를 활용한 Grid/Flex 지원.
3. ❌ 한 화면에 3가지 이상의 아예 다른 포인트 색상 섞지 않기.
4. ❌ Semantic HTML 태그(`<header>`, `<main>`, `<nav>`, `<article>`, `<button>`) 생략하고 `<div>`로만 도배하지 않기.
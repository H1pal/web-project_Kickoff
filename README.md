# 🛴 Kick-Off

> **안전한 보행길, 깨끗한 우리 동네.**  
> 올바른 PM(Personal Mobility) 문화, 우리가 함께 만듭니다.

전동 킥보드 · 공유 킥보드 등의 잘못된 주차 및 불법 주·정차로 인한 보행 환경 문제를 시민 제보로 해결하기 위한 **시민 참여형 신고·안내 웹사이트**입니다.

---

## 📌 프로젝트 개요

- **프로젝트명**: Kick-Off
- **과목**: Web Subject (2차 수행)
- **팀**: 1312 유희성 / 1313 이하랑
- **목적**: 전동킥보드 등 개인형 이동장치(PM)의 올바른 주차·이용 문화를 시민과 함께 만들어가고, 관련 정보를 투명하게 공유
- **핵심 가치**: 신고(제보) → 공유(현황) → 안내(가이드) 의 선순환 구조

---

## ✨ 주요 기능

| 기능 | 설명 |
| --- | --- |
| 🚨 **신고하기** | 보행로를 막은 킥보드/차량 등을 사진·위치와 함께 즉시 제보 |
| 📊 **업체별 신고 접수 현황** | 어떤 업체의 기기가 문제인지 데이터로 시각화 |
| 📖 **올바른 주차·이용 안내** | 주차구역 안내, 이용자 안전 가이드, FAQ 제공 |
| 🏛️ **제작자 소개 & 비전** | 인사말, 목표, 제작자 소개 |
| 🔔 **공지사항 / 인증** | 운영 공지, 제보 인증 절차 안내 |
| 💬 **자유게시판 · 건의사항** | 시민 간 소통 및 운영진 건의 채널 |
| 🔐 **회원가입 · 로그인** | 제보 내역 조회, 마이페이지 기능(준비) |

---

## 🗂️ 디렉토리 구조

```
1312유희성-1313이하랑_2차수행/
├── html/                    # 페이지 진입점
│   ├── main.html            # 메인(홈)
│   ├── report.html          # 신고(제보) 페이지
│   ├── log_in.html          # 로그인
│   ├── log_up.html          # 회원가입
│   ├── log_inorup.html      # 로그인/회원가입 통합
│   ├── sub_introduction/    # 웹페이지 소개 (인사말, 목표, 제작자 소개)
│   ├── sub_service/         # 서비스 (공지사항, 오시는 길, 인증)
│   ├── sub_guide/           # 안내 (주차구역, 이용자 안전)
│   ├── sub_community/       # 고객센터 (건의사항, FAQ)
│   └── sub_situation/       # 우리 동네 현황 (자유게시판, 업체별 현황)
│
├── css/                     # 스타일시트
│   ├── main.css             # 공통 디자인 토큰 / 헤더·푸터 / 메인 히어로 / 패럴랙스 신
│   ├── sub.css              # 서브 페이지 공통 스타일
│   ├── report.css           # 신고 페이지 스타일
│   ├── report_byenterprise.css # 업체별 신고 현황 스타일
│   └── log_inup.css         # 로그인/회원가입 스타일
│
├── js/
│   └── main.js              # 메인 인터랙션 (스크롤 리빌, 네비, 패럴랙스)
│
├── images/                  # 정적 이미지 자산
│   ├── kickoff.png          # 로고
│   ├── parking_and_scooter.png # 메인 히어로 배경
│   ├── electric_kickboard.png   # 파비콘
│   ├── kickboard.jpg        # 카드 이미지
│   ├── parking.jpg          # 불법주차 사례 이미지
│   ├── kickboard_accident_graph.png # 사고 통계 그래프
│   ├── podol.png / posun.png
│
├── CLAUDE.md                # AI 에이전트 디자인 가드레일
├── AGENTS.md
└── README.md                # 본 문서
```

---

## 🎨 디자인 시스템

**컨셉**: 모던, 클린, 프리미엄 스위스 스타일 (Linear · Vercel · Apple 톤)

### 토큰 (`css/main.css` :root)

| 토큰 | 값 | 용도 |
| --- | --- | --- |
| `--primary` | `#0d9488` (teal-600) | 단일 포인트 컬러 |
| `--primary-strong` | `#0f766e` (teal-700) | hover/active |
| `--ink` | `#0f172a` (slate-900) | 제목 |
| `--body` | `#475569` (slate-600) | 본문 |
| `--navy` | `#0e1f3f` | 푸터 · 히어로 딥 |
| `--radius-card` | `20px` | 카드 |
| `--radius-btn` | `12px` | 버튼/인풋 |
| `--font-sans` | Pretendard + Inter | 본문/타이틀 |

### 메인 히어로의 Kick-Off Cinema
메인 페이지에는 6개 레이어(스카이 → 원경 빌딩 → 네온 사인/가로등 → 원근 도로 → 킥보드 → 후처리)로 구성된 **3D 패럴랙스 시네마**가 들어갑니다. 마우스/스크롤에 따라 카메라가 움직이며, 도로의 차선(`laneFlow`)은 호버 시 일시정지됩니다.

### 반응형 브레이크포인트
- `≤ 1080px` : 햄버거 메뉴
- `≤ 768px` : 패럴랙스 시네마 컴팩트 모드
- `≤ 480px` : HUD 일부 숨김, 캡션 축소

---

## 🚀 실행 방법

별도의 빌드 도구 없이 정적 파일로 동작합니다.

```bash
# 1) 저장소 클론
git clone <repo-url>
cd 1312유희성-1313이하랑_2차수행

# 2) 로컬 서버 실행 (선택 — 단순 열기만 해도 동작)
# Python 3
python3 -m http.server 5500

# 또는 VS Code 확장 "Live Server" 사용

# 3) 브라우저에서 열기
open http://localhost:5500/html/main.html
```

> **참고**: 외부 폰트(Pretendard, Inter) 및 Flaticon 아이콘은 CDN으로 로드됩니다. 인터넷 연결이 필요합니다.

---

## 🧰 기술 스택

- **HTML5** (시맨틱 마크업, `<header>` / `<nav>` / `<main>` / `<section>` / `<article>` / `<footer>`)
- **CSS3** (Flex/Grid, `position: sticky`, `clamp()`, `backdrop-filter`, CSS 변수 디자인 토큰, `@keyframes`, `:has()` 셀렉터)
- **Vanilla JavaScript** (IntersectionObserver 기반 스크롤 리빌, 모바일 네비 토글, 3D 패럴랙스)
- **외부 자산**: Pretendard · Inter 폰트, Flaticon 아이콘

> Tailwind / React / Vue 등 프레임워크는 사용하지 않았습니다.

---

## 🌐 페이지 맵

| 1depth | 2depth | 경로 |
| --- | --- | --- |
| 메인 | — | `html/main.html` |
| 신고 | — | `html/report.html` |
| 로그인 / 회원가입 | — | `html/log_in.html` · `html/log_up.html` · `html/log_inorup.html` |
| 웹페이지 소개 | 인사말 | `html/sub_introduction/greetings.html` |
|  | 목표 | `html/sub_introduction/vision.html` |
|  | 제작자 소개 | `html/sub_introduction/introduce_enterpriser.html` |
| 서비스 | 공지사항 | `html/sub_service/notion.html` |
|  | 오시는 길 | `html/sub_service/directions.html` |
|  | 인증 | `html/sub_service/certification.html` |
| 안내 | 주차구역 안내 | `html/sub_guide/parking_guide.html` |
|  | 이용자 안전/이용방법 | `html/sub_guide/user_guide.html` |
| 고객센터 | 건의사항 | `html/sub_community/suggest.html` |
|  | FAQ | `html/sub_community/faq.html` |
| 우리 동네 현황 | 자유게시판 | `html/sub_situation/general_discussion.html` |
|  | 업체별 신고 접수 현황 | `html/sub_situation/report_byenterprise.html` |

---

## ♿ 접근성

- `:focus-visible` 링 표시 (`--ring`)
- `prefers-reduced-motion` 사용 시 애니메이션/패럴랙스 자동 비활성화
- 시맨틱 태그 사용 (의미 없는 `<div>` 도배 지양)
- WCAG AA 이상 본문 텍스트 명도 대비

---

## 📜 라이선스

본 프로젝트는 **Web Subject 2차 수행 과제**로 제작되었습니다.
이미지/아이콘 등 일부 자산은 외부 CDN을 통해 제공됩니다.

---

## 👥 Contributors

- **1312 유희성**
- **1313 이하랑**

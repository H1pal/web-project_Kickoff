/* ====================================================================
Kick-Off — 공통 인터랙션 모듈
- 헤더 스크롤 그림자
- 모바일 햄버거 토글
- 스크롤 reveal (IntersectionObserver)
- FAQ 아코디언
- 막대 차트 등장 애니메이션
- 히어로 Ken Burns 트리거
- 연도 탭 인터랙션
==================================================================== */

(function () {
  "use strict";

  // JS가 활성화됐음을 알리는 클래스 (CSS @media 외 reveal fallback)
  document.documentElement.classList.add("has-js");

  /* ---------- 1. 헤더 스크롤 그림자 ---------- */
  function initHeaderScroll() {
    const header = document.querySelector("header");
    if (!header) return;
    const SCROLL_THRESHOLD = 8;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        header.classList.toggle("scrolled", window.scrollY > SCROLL_THRESHOLD);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. 모바일 햄버거 토글 ---------- */
  function initNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector("nav");
    if (!toggle || !nav) return;

    const openMenu = () => {
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
    };
    const closeMenu = () => {
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      if (document.body.classList.contains("nav-open")) closeMenu();
      else openMenu();
    });

    // 메뉴 외부 클릭 시 닫기
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      closeMenu();
    });

    // ESC 닫기
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    // 서브메뉴가 없는 메뉴 항목 클릭 시 페이지 이동 후 닫기
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => closeMenu());
    });

    // 1080px 초과로 리사이즈되면 강제 닫기
    let lastW = window.innerWidth;
    window.addEventListener("resize", () => {
      const w = window.innerWidth;
      if (w > 1080 && lastW <= 1080) closeMenu();
      lastW = w;
    });
  }

  /* ---------- 3. 스크롤 reveal (IntersectionObserver) ---------- */
  function initReveal() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document
        .querySelectorAll(".js-reveal")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const items = document.querySelectorAll(".js-reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 4. FAQ 아코디언 ---------- */
  function initFaq() {
    const items = document.querySelectorAll("[data-faq]");
    if (!items.length) return;
    items.forEach((item) => {
      const q = item.querySelector(".faq_q");
      const a = item.querySelector(".faq_a");
      if (!q || !a) return;

      // 토글 표시자 (+) 주입
      if (!q.querySelector(".q_toggle")) {
        const span = document.createElement("span");
        span.className = "q_toggle";
        span.setAttribute("aria-hidden", "true");
        span.textContent = "+";
        q.appendChild(span);
      }
      a.style.maxHeight = "0px";

      q.setAttribute("role", "button");
      q.setAttribute("tabindex", "0");

      const toggle = () => {
        const isOpen = item.classList.contains("is-open");
        if (isOpen) {
          a.style.maxHeight = "0px";
          item.classList.remove("is-open");
          q.setAttribute("aria-expanded", "false");
        } else {
          // 한 번에 하나만 열리게 하려면 다음 줄 해제
          document.querySelectorAll("[data-faq].is-open").forEach((other) => {
            if (other === item) return;
            const oa = other.querySelector(".faq_a");
            if (oa) oa.style.maxHeight = "0px";
            other.classList.remove("is-open");
            const oq = other.querySelector(".faq_q");
            if (oq) oq.setAttribute("aria-expanded", "false");
          });

          a.style.maxHeight = a.scrollHeight + "px";
          item.classList.add("is-open");
          q.setAttribute("aria-expanded", "true");
        }
      };

      q.addEventListener("click", toggle);
      q.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ---------- 5. 막대 차트 등장 애니메이션 ---------- */
  function initBarChart() {
    const groups = document.querySelectorAll(".bar_group");
    if (!groups.length) return;

    // 각 그룹의 실제 height 백분율을 CSS 변수로 저장
    groups.forEach((g) => {
      const fill = g.querySelector(".bar_fill");
      if (!fill) return;
      const computed = getComputedStyle(fill).height;
      // .color_* 클래스가 가지는 inline height를 그대로 사용
      const inlineH = fill.style.height;
      const target = inlineH || computed;
      g.style.setProperty("--target-height", target);
      fill.style.height = "0%";
    });

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      groups.forEach((g) => g.classList.add("in-view"));
      return;
    }

    if (!("IntersectionObserver" in window)) {
      groups.forEach((g) => g.classList.add("in-view"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 },
    );

    groups.forEach((g) => obs.observe(g));
  }

  /* ---------- 6. 연도 탭 ---------- */
  function initYearTabs() {
    const list = document.getElementById("year_list");
    if (!list) return;
    const items = list.querySelectorAll("li");
    items.forEach((li) => {
      li.addEventListener("click", () => {
        items.forEach((other) => other.classList.remove("active"));
        li.classList.add("active");
        // 차트 다시 트리거 (막대 리필)
        const groups = document.querySelectorAll(".bar_group");
        groups.forEach((g) => g.classList.remove("in-view"));
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            groups.forEach((g) => g.classList.add("in-view"));
          });
        });
      });
    });
  }

  /* ---------- 7. 히어로 Ken Burns 트리거 (페이지 로드 시 약간의 지연 후) ---------- */
  function initHeroKenBurns() {
    const hero = document.querySelector(".hero-kenburns");
    if (!hero) return;
    // 이미 main.css에서 animation 정의됨 — 추가로 viewport 진입 시 활성화 (선택)
    // 현재는 항상 켜진 상태로 두고, 페이지 로드 시 부드럽게 보이도록 강제 reflow
    hero.classList.add("is-active");
  }

  /* ---------- 8. 폼 UX (report) ---------- */
  function initReportForm() {
    const form = document.querySelector("#report_form form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("신고 접수가 성공적으로 완료되었습니다.");
      });
    }

    const mapBtn = document.getElementById("map_bt");
    if (mapBtn) {
      mapBtn.addEventListener("click", () => {
        const coord = prompt("좌표 값:");
        if (coord !== null) alert("@@ 지도 @@");
      });
    }

    const inputFile = document.getElementById("report_file");
    const fileBox = document.querySelector(".file_upload_box");
    if (inputFile && fileBox) {
      const resetFile = () => {
        fileBox.innerHTML = `
        <span class="upload_text">여기를 클릭하여 사진을 첨부하세요.</span>
        `;
      };
      inputFile.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) {
          resetFile();
          return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
          fileBox.innerHTML = `<img src="${ev.target.result}" class="file_preview_img" alt="미리보기">`;
        };
        reader.readAsDataURL(file);
      });
    }
  }

  /* ---------- 9. 푸터 연도 갱신 (안전) ---------- */
  function initCopyright() {
    const el = document.getElementById("copyright");
    if (!el) return;
    // 필요 시 동적 갱신 자리 — 현재는 비워둠
  }

  /* ---------- 10. Kick-Off Cinema — 지쿠 스타일 3D 패럴랙스 + HUD ---------- */
  function initCinema() {
    const viewport = document.getElementById("cinema_viewport");
    const scene = document.getElementById("cinema_scene");
    const speedEl = document.getElementById("px_speed");
    const distEl = document.getElementById("px_dist");
    if (!viewport || !scene) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      if (speedEl) speedEl.textContent = "42";
      if (distEl) distEl.textContent = "1.2k";
      return;
    }

    /* ---- 마우스 패럴랙스 (depth 기반) ---- */
    const layers = scene.querySelectorAll(".px_layer[data-depth]");
    let mouseTiltX = 0,
      mouseTiltY = 0;
    let targetX = 0,
      targetY = 0;
    let tiltRaf = null;

    const applyTilt = () => {
      tiltRaf = null;
      mouseTiltX += (targetX - mouseTiltX) * 0.12;
      mouseTiltY += (targetY - mouseTiltY) * 0.12;
      // 씬 전체 가벼운 틸트
      scene.style.transform = `rotateX(${-mouseTiltY * 3}deg) rotateY(${mouseTiltX * 4}deg)`;
      // 레이어별 패럴랙스 (depth에 따라 translateZ)
      layers.forEach((layer) => {
        const d = parseFloat(layer.getAttribute("data-depth")) || 0;
        const tx = mouseTiltX * d * 30; // 멀리 있는 레이어일수록 적게 움직임
        const ty = mouseTiltY * d * 22;
        const tz = -d * 200; // 거리감
        // 기존 translateZ/Y가 있으면 유지
        const base = layer.style.getPropertyValue("--base-tx") || "";
        layer.style.transform = `translate3d(${tx}px, ${ty}px, ${tz}px)`;
      });
      if (
        Math.abs(targetX - mouseTiltX) > 0.001 ||
        Math.abs(targetY - mouseTiltY) > 0.001
      ) {
        tiltRaf = requestAnimationFrame(applyTilt);
      }
    };

    viewport.addEventListener(
      "mousemove",
      (e) => {
        const r = viewport.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5; // -0.5 ~ 0.5
        const y = (e.clientY - r.top) / r.height - 0.5;
        targetX = x * 2;
        targetY = y * 2;
        if (!tiltRaf) tiltRaf = requestAnimationFrame(applyTilt);
      },
      { passive: true },
    );
    viewport.addEventListener("mouseleave", () => {
      targetX = 0;
      targetY = 0;
      if (!tiltRaf) tiltRaf = requestAnimationFrame(applyTilt);
    });

    /* ---- 스크롤 dolly-zoom (viewport가 viewport 중앙에 가까울수록 zoom in) ---- */
    let scrollRaf = null;
    const applyScroll = () => {
      scrollRaf = null;
      const r = viewport.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = r.top + r.height / 2;
      const dist = (center - vh / 2) / vh; // 0 = 중앙, 양수 = 아래
      const t = Math.max(-1, Math.min(1, dist));
      // 중앙에 가까울수록 1.05, 멀수록 0.96
      const scale = 1.05 - Math.abs(t) * 0.09;
      scene.style.setProperty("--scroll-scale", String(scale));
      // 첫 번째 레이어(sky) 약간 위로, 마지막(road) 약간 아래로 (dolly-zoom 효과)
      const tilt = -t * 4; // 도
      scene.style.setProperty("--scroll-tilt", tilt + "deg");
      // 부드럽게 lerp
      scene.style.transform = `rotateX(${-mouseTiltY * 3 - t * 2}deg) rotateY(${mouseTiltX * 4}deg) scale(${scale})`;
    };
    const onScroll = () => {
      if (!scrollRaf) scrollRaf = requestAnimationFrame(applyScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    applyScroll();

    /* ---- HUD 카운터 (CSS keyframe phase와 동기) ---- */
    if (!speedEl || !distEl) return;
    let lastT = null;
    const PEAK = 42; // km/h
    const CYCLE = 5400; // ms (CSS kbSwoop 주기와 동일)
    let distance = 0;

    const tick = (t) => {
      if (lastT === null) lastT = t;
      const dt = (t - lastT) / 1000;
      lastT = t;

      const phase = (t % CYCLE) / CYCLE;
      let speed;
      if (phase < 0.08) {
        // 등장
        speed = (phase / 0.08) * PEAK * 0.4;
      } else if (phase < 0.25) {
        // 가속
        const p = (phase - 0.08) / 0.17;
        speed = PEAK * (0.4 + 0.55 * p);
      } else if (phase < 0.75) {
        // 크루즈 + 피크
        const p = (phase - 0.25) / 0.5;
        speed = PEAK * (0.95 + 0.05 * Math.sin(p * Math.PI));
      } else if (phase < 0.92) {
        // 통과
        speed = PEAK;
      } else {
        // 퇴장
        const p = (phase - 0.92) / 0.08;
        speed = PEAK * (1 - p);
      }

      distance += speed * (dt / 3.6);

      speedEl.textContent = String(Math.round(speed));
      distEl.textContent =
        distance >= 1000
          ? (distance / 1000).toFixed(2) + "k"
          : String(Math.round(distance));

      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- 부트 ---------- */
  function boot() {
    initHeaderScroll();
    initNavToggle();
    initReveal();
    initFaq();
    initBarChart();
    initYearTabs();
    initHeroKenBurns();
    initReportForm();
    initCopyright();
    initCinema();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();

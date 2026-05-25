const timelineMoments = [
  {
    date: "May 26, 2024",
    title: "The day we came together",
    text: "Is din ek choti si chidiya ayi mere pas🐥",
    imageSrc: "came.jpg",
  },
  {
    date: "June 05, 2024",
    title: "First Argument",
    text: "Tab se aj tak , baat kam aur ldai jada hoti hai🙂‍↔️",
    imageSrc: "firstArugument.jpg",
  },
  {
    date: "October 26, 2024",
    title: "When we saw each other",
    text: "Aj tak tumhare hath ka texture yaad hai💝",
    imageSrc: "meet.jpg",
  },

  {
    date: "September 16, 2025",
    title: "The Almost Goodbye",
    text: "No comments on this one.",
    imageSrc: "iThoughtItsOver.jpg",
  },
  {
    date: "May 26, 2026",
    title: "Two Years of Us",
    text: "We fought, We understood, We fixed, We stayed!!🫂💝🧸",
    imageSrc: "us.png",
  },
];

const loveThings = [
  {
    title: "Your smile",
    text: "Ye to bhagwan ki bnai hui sabse sundar chiz hai💝",
  },
  {
    title: "Your laugh",
    text: "Jab meri jaan hasti hai to esa lgta hai puri duniya me bas ek hi awaj aur ek hi chehra guuj rha hai🐥😘",
  },
  {
    title: "Your chaos",
    text: "Tumhari ldai se me sari tension bhul ke bas enjoy krta hu, ki kitni pyara hai chote baby guccha😘😘😘",
  },
  {
    title: "Your patience",
    text: "Mene kitne sare moke diye muje chorne ke but, you kept holding me even on difficult days💝.",
  },
  {
    title: "Your voice",
    text: "Esa lgta hai kii, kisi ne 'sukoon' ko ek awaj me badal diya hai🙂‍↔️💝",
  },
  {
    title: "Your honesty",
    text: "Muje nai yaad ki tumne last time mujse kab jhuth bola tha, and its rare as hell.😘",
  },
  {
    title: "Your dreams",
    text: "Har dusre din mere spne me maal bnke akee muje lalach deti ho🤤",
  },
  {
    title: "Your heart",
    text: "Universe for me🌌🐥💝",
  },
];

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const starsLayer = document.querySelector("#starsLayer");
const timelineList = document.querySelector("#timelineList");
const loveGrid = document.querySelector("#loveGrid");
const finaleParticles = document.querySelector("#finaleParticles");
const timelineModal = document.querySelector("#timelineModal");
const openTimeline = document.querySelector("#openTimeline");
const closeTimeline = document.querySelector("#closeTimeline");
const closeTimelineBackdrop = document.querySelector("#closeTimelineBackdrop");
const musicToggle = document.querySelector("#musicToggle");
const musicIcon = document.querySelector("#musicIcon");
const cursorGlow = document.querySelector(".cursor-glow");
const backgroundMusic = new Audio("audio.oga");

backgroundMusic.preload = "auto";

let musicOn = false;
let lastFocusedElement = null;
let timelineHideTimer = null;

function createStars() {
  const starCount = window.matchMedia("(max-width: 640px)").matches ? 58 : 96;
  const particleCount = window.matchMedia("(max-width: 640px)").matches
    ? 14
    : 22;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${(index * 37) % 100}%`;
    star.style.top = `${(index * 53 + 11) % 100}%`;
    star.style.setProperty("--size", `${1 + (index % 3)}px`);
    star.style.setProperty("--delay", `${(index % 13) * 0.18}s`);
    star.style.setProperty("--duration", `${2.8 + (index % 7) * 0.36}s`);
    fragment.appendChild(star);
  }

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    particle.className = "float-particle";
    particle.style.left = `${(index * 29 + 7) % 100}%`;
    particle.style.setProperty("--delay", `${(index % 9) * 0.7}s`);
    particle.style.setProperty("--duration", `${12 + (index % 6) * 1.5}s`);
    particle.style.setProperty("--drift", `${index % 2 === 0 ? 28 : -24}px`);
    fragment.appendChild(particle);
  }

  starsLayer.appendChild(fragment);
}

function renderTimeline() {
  timelineList.innerHTML = timelineMoments
    .map(
      (moment, index) => `
        <article class="timeline-item" style="--index: ${index}">
          <div class="timeline-card">
            <div class="image-frame">
              <img src="${escapeHtml(moment.imageSrc)}" alt="Timeline memory placeholder">
              <span>Add image</span>
            </div>
            <time>${escapeHtml(moment.date)}</time>
            <h3>${escapeHtml(moment.title)}</h3>
            <p>${escapeHtml(moment.text)}</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderLoveCards() {
  loveGrid.innerHTML = loveThings
    .map(
      (thing, index) => `
        <article class="love-card reveal" style="--duration: ${5.4 + index * 0.22}s; --delay: ${
          index * 0.18
        }s; --float-y: ${index % 2 === 0 ? "-10px" : "10px"}">
          <div class="love-card__icon" aria-hidden="true">♥</div>
          <h3>${escapeHtml(thing.title)}</h3>
          <p>${escapeHtml(thing.text)}</p>
        </article>
      `,
    )
    .join("");
}

function renderFinaleParticles() {
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < 34; index += 1) {
    const particle = document.createElement("span");
    particle.className = "finale-particle";
    particle.style.left = `${(index * 23 + 9) % 100}%`;
    particle.style.top = `${(index * 41 + 17) % 100}%`;
    particle.style.setProperty("--delay", `${(index % 11) * 0.24}s`);
    fragment.appendChild(particle);
  }

  finaleParticles.appendChild(fragment);
}

function setupReveals() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
  );

  document
    .querySelectorAll(".reveal, .timeline-item, .letter-card")
    .forEach((element) => {
      observer.observe(element);
    });
}

function setupLetterLines() {
  document.querySelectorAll(".letter-card span").forEach((line, index) => {
    line.style.setProperty("--line-index", index);
  });
}

function setupSmoothScrollButtons() {
  document.querySelectorAll("[data-scroll-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function openTimelineModal() {
  window.clearTimeout(timelineHideTimer);
  lastFocusedElement = document.activeElement;
  timelineModal.hidden = false;
  timelineModal.classList.add("is-open");
  timelineModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  document.body.style.overflow = "hidden";
  closeTimeline.focus();

  requestAnimationFrame(() => {
    document
      .querySelectorAll(".timeline-item")
      .forEach((item) => item.classList.add("in-view"));
  });
}

function closeTimelineModal() {
  timelineModal.classList.remove("is-open");
  timelineModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  document.body.style.overflow = "";
  timelineHideTimer = window.setTimeout(() => {
    timelineModal.hidden = true;
  }, 750);
  lastFocusedElement?.focus?.();
}

function setupTimelineModal() {
  openTimeline.addEventListener("click", openTimelineModal);
  closeTimeline.addEventListener("click", closeTimelineModal);
  closeTimelineBackdrop.addEventListener("click", closeTimelineModal);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && timelineModal.classList.contains("is-open")) {
      closeTimelineModal();
    }
  });
}

function setupMusicToggle() {
  const setMusicState = (isPlaying) => {
    musicOn = isPlaying;
    musicIcon.textContent = musicOn ? "♫" : "♪";
    musicToggle.classList.toggle("is-playing", musicOn);
    musicToggle.setAttribute("aria-pressed", String(musicOn));
    musicToggle.setAttribute(
      "aria-label",
      musicOn ? "Pause music" : "Play music",
    );
  };

  backgroundMusic.addEventListener("ended", () => {
    setMusicState(false);
  });

  musicToggle.addEventListener("click", async () => {
    if (musicOn) {
      backgroundMusic.pause();
      setMusicState(false);
      return;
    }

    if (backgroundMusic.ended) {
      backgroundMusic.currentTime = 0;
    }

    try {
      await backgroundMusic.play();
      setMusicState(true);
    } catch (error) {
      setMusicState(false);
      console.error("Unable to play audio:", error);
    }
  });
}

function setupCursorGlow() {
  if (!cursorGlow || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursorGlow.style.opacity = "1";
  });

  function animateGlow() {
    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;
    cursorGlow.style.transform = `translate3d(${currentX - 160}px, ${currentY - 160}px, 0)`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

function setupTiltCards() {
  document.querySelectorAll(".tilt-card").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = (y / rect.height - 0.5) * -8;
      const rotateY = (x / rect.width - 0.5) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(var(--rotate)) translateY(-10px)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "rotate(var(--rotate))";
    });
  });
}

createStars();
renderTimeline();
renderLoveCards();
renderFinaleParticles();
setupLetterLines();
setupReveals();
setupSmoothScrollButtons();
setupTimelineModal();
setupMusicToggle();
setupCursorGlow();
setupTiltCards();

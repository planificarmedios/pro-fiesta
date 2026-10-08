/* =========================================================
   PARÁMETROS DE URL
========================================================= */

const params = new URLSearchParams(window.location.search);

const temaInicial = params.get("tema");

/* =========================================================
   EXPERIENCIAS
========================================================= */

const experiences = [
  {
    id: "casamiento",
    title: "Casamiento",
    phrase: "Se renueva una historia.",
    image: "assets/img/book/casamiento.webp",
  },
  {
    id: "cumple-8",
    title: "Cumple Temático",
    phrase: "Una nueva aventura comienza.",
    image: "assets/img/book/mario-rock-2.jpg",
    hoverImage: "assets/img/book/mario-greeting.png",
  },
  {
    id: "15",
    title: "Tus 15",
    phrase: "Una nueva etapa comienza.",
    image: "assets/img/book/15.webp",
  },
  {
    id: "bautismo",
    title: "Bautismo",
    phrase: "Un momento para recordar.",
    image: "assets/img/book/bautismo.jpg",
  },
  {
    id: "despedida",
    title: "Despedida",
    phrase: "Una noche que merece historia.",
    image: "assets/img/book/despedida.jpg",
  },
  {
    id: "asado",
    title: "Asado",
    phrase: "Amigos, fuego y buenos momentos.",
    image: "assets/img/book/asado.jpg",
  },
  {
    id: "egresados",
    title: "Egresados",
    phrase: "Todo lo vivido merece celebrarse.",
    image: "assets/img/book/egresados.jpg",
  },
  {
    id: "fiesta",
    title: "Fiesta",
    phrase: "Que empiece la noche.",
    image: "assets/img/book/fiesta.jpg",
  },
  {
    id: "nona",
    title: "La nona",
    phrase: "Una vida entera para celebrar.",
    image: "assets/img/book/nona.jpg",
  },
  {
    id: "divorcio",
    title: "Divorcio",
    phrase: "¿Terminó? Que empiece la fiesta.",
    image: "assets/img/book/divorcio.jpg",
  },
  {
    id: "club",
    title: "Club / Boliche",
    phrase: "La noche empieza acá.",
    image: "assets/img/book/club.jpeg",
  },
];

/* =========================================================
   ESTADO
========================================================= */

/*
  Por defecto comenzamos en Casamiento.

  Pero si la URL trae:
  
  index.html?tema=cumple-8

  buscamos ese tema y arrancamos directamente
  en su slide.
*/

let currentIndex = 0;

if (temaInicial) {
  const indexEncontrado = experiences.findIndex(
    (experience) => experience.id === temaInicial,
  );

  if (indexEncontrado !== -1) {
    currentIndex = indexEncontrado;
  }
}

let isChanging = false;

let dragging = false;

let dragStartX = 0;

let dragCurrentX = 0;

/* =========================================================
   ELEMENTOS
========================================================= */

const mainExperience = document.getElementById("mainExperience");

const mainImage = document.getElementById("mainImage");

const mainImageHover = document.getElementById("mainImageHover");

const mainTitle = document.getElementById("mainTitle");

const mainPhrase = document.getElementById("mainPhrase");

const sideLeft = document.getElementById("sideLeft");

const sideLeftImage = document.getElementById("sideLeftImage");

const sideLeftNumber = document.getElementById("sideLeftNumber");

const sideLeftTitle = document.getElementById("sideLeftTitle");

const sideRight = document.getElementById("sideRight");

const sideRightImage = document.getElementById("sideRightImage");

const sideRightNumber = document.getElementById("sideRightNumber");

const sideRightTitle = document.getElementById("sideRightTitle");

const headerCurrent = document.getElementById("headerCurrent");

const progressCurrent = document.getElementById("progressCurrent");

const progressFill = document.getElementById("progressFill");

const prevButton = document.getElementById("prevExperience");

const nextButton = document.getElementById("nextExperience");

const openButton = document.getElementById("openExperience");

const carousel = document.querySelector(".experience-carousel");

const worldLoader = document.getElementById("worldLoader");

const worldLoaderNumber = document.getElementById("worldLoaderNumber");

const worldLoaderText = document.getElementById("worldLoaderText");

const particleLayer = document.querySelector(".particle-layer");

const heroTitle = document.getElementById("heroTitle");

const heroPhrase = document.getElementById("heroPhrase");

const jumpAudio = new Audio("assets/audio/jump.mp3");
jumpAudio.preload = "auto";

/* =========================================
   EFECTOS POR EXPERIENCIA
========================================= */

const particleEffects = {
  casamiento: {
    colors: ["#d6ae5b", "#f3d58a", "#fff1c7"],
    types: ["bubble", "bubble", "dust"],
    amount: 6,
    spread: 52,
    duration: [1200, 2100],
    size: [4, 9],
  },

  "cumple-8": {
    colors: ["#6fae58", "#9bd47d", "#d8efc8"],
    types: ["dust", "dust", "bubble"],
    amount: 4,
    spread: 45,
    duration: [800, 1500],
    size: [3, 7],
  },

  15: {
    colors: ["#d89bb8", "#f2c6dc", "#f4df9a"],
    types: ["bubble", "dust"],
    amount: 3,
    spread: 42,
    duration: [900, 1600],
    size: [4, 8],
  },

  bautismo: {
    colors: ["#9ec9d8", "#d8f1f7", "#ffffff"],
    types: ["bubble", "dust"],
    amount: 3,
    spread: 40,
    duration: [1000, 1700],
    size: [4, 8],
  },

  despedida: {
    colors: ["#c8a0d8", "#e1c8eb", "#ffffff"],
    types: ["dust", "dust", "bubble"],
    amount: 4,
    spread: 45,
    duration: [800, 1500],
    size: [3, 7],
  },

  asado: {
    colors: ["#d88945", "#f1b56d", "#ffe0aa"],
    types: ["dust", "dust"],
    amount: 3,
    spread: 38,
    duration: [700, 1300],
    size: [3, 7],
  },

  egresados: {
    colors: ["#d6ae5b", "#f4d98d", "#ffffff"],
    types: ["bubble", "dust"],
    amount: 3,
    spread: 42,
    duration: [900, 1600],
    size: [4, 8],
  },

  fiesta: {
    colors: ["#b98ad1", "#e4b8f0", "#f4d98d"],
    types: ["dust", "bubble"],
    amount: 4,
    spread: 45,
    duration: [700, 1400],
    size: [3, 8],
  },

  nona: {
    colors: ["#d6ae5b", "#e7c987", "#fff1c7"],
    types: ["bubble", "dust"],
    amount: 2,
    spread: 35,
    duration: [1100, 1800],
    size: [4, 8],
  },

  divorcio: {
    colors: ["#d85c5c", "#f0a0a0", "#f5f2eb"],
    types: ["dust", "dust", "bubble"],
    amount: 4,
    spread: 48,
    duration: [600, 1300],
    size: [3, 7],
  },

  club: {
    colors: ["#7f8cff", "#b8bfff", "#e0e3ff"],
    types: ["dust", "bubble"],
    amount: 4,
    spread: 48,
    duration: [600, 1200],
    size: [3, 7],
  },
};

/* =========================================================
   MANTENER LA EXPERIENCIA DE ORIGEN
   AL VOLVER DESDE evento.html
========================================================= */

/*
  Si estamos en:

  evento.html?tema=cumple-8

  cualquier enlace que vuelva a index.html
  se transforma automáticamente en:

  index.html?tema=cumple-8
*/

if (temaInicial) {
  document
    .querySelectorAll('a[href="index.html"], a[href="./index.html"]')
    .forEach((link) => {
      link.href = `./index.html?tema=${encodeURIComponent(temaInicial)}`;
    });
}

/* =========================================================
   UTILIDADES
========================================================= */

function normalizeIndex(index) {
  if (index < 0) {
    return experiences.length - 1;
  }

  if (index >= experiences.length) {
    return 0;
  }

  return index;
}

function formatNumber(number) {
  return String(number + 1).padStart(2, "0");
}

function applyWorldTheme(experience) {
  if (!experience) return;

  document.body.classList.remove("world-casamiento", "world-cumple-8");

  document.body.classList.add(`world-${experience.id}`);
}

/* =========================================================
   ACTUALIZAR SLIDE LATERAL
========================================================= */

function updateSideCard(card, image, number, title) {
  image.src = card.image;

  image.alt = card.title;

  number.textContent = formatNumber(number);

  title.textContent = card.title;
}

const worldCopy = {
  casamiento: {
    titleFirst: "Tu evento",
    titleSecond: "es único.",

    phraseFirst: "y empieza",
    phraseSecond: "con una invitación única.",
  },

  "cumple-8": {
    titleFirst: "Tu invitación",
    titleSecond: "es una aventura.",

    phraseFirst: "Tu aventura también",
    phraseSecond: "merece empezar con estilo.",
  },
};

/* =========================================================
   RENDER
========================================================= */

function renderExperience(index) {
  const current = experiences[index];
  console.log(current.id);

  if (current.id === "cumple-8") {
    setTimeout(() => {
      jumpAudio.currentTime = 0;
      jumpAudio.play().catch(() => {});
    }, 1000);
  }

  applyWorldTheme(current);

  const copy = worldCopy[current.id] || worldCopy.casamiento;

  heroTitle.innerHTML = `
  <span>${copy.titleFirst}</span>
  <em>${copy.titleSecond}</em>
`;

  heroPhrase.innerHTML = `
  <em>${copy.phraseFirst}</em>
  <span>${copy.phraseSecond}</span>
`;

  const previousIndex = normalizeIndex(index - 1);

  const nextIndex = normalizeIndex(index + 1);

  const previous = experiences[previousIndex];

  const next = experiences[nextIndex];

  /* -------------------------------------------------------
     PRINCIPAL
  ------------------------------------------------------- */

  mainImage.src = current.image;

  mainImage.alt = current.title;

  if (current.hoverImage) {
    mainImageHover.src = current.hoverImage;
    mainImageHover.alt = current.title;
    mainImageHover.style.display = "block";
  } else {
    mainImageHover.removeAttribute("src");
    mainImageHover.style.display = "none";
  }

  mainTitle.textContent = current.title;

  mainPhrase.textContent = current.phrase;

  /* -------------------------------------------------------
     ANTERIOR
  ------------------------------------------------------- */

  sideLeftImage.src = previous.image;

  sideLeftImage.alt = previous.title;

  sideLeftNumber.textContent = formatNumber(previousIndex);

  sideLeftTitle.textContent = previous.title;

  /* -------------------------------------------------------
     SIGUIENTE
  ------------------------------------------------------- */

  sideRightImage.src = next.image;

  sideRightImage.alt = next.title;

  sideRightNumber.textContent = formatNumber(nextIndex);

  sideRightTitle.textContent = next.title;

  /* -------------------------------------------------------
     HEADER
  ------------------------------------------------------- */

  headerCurrent.textContent = formatNumber(index);

  /* -------------------------------------------------------
     PROGRESO
  ------------------------------------------------------- */

  progressCurrent.textContent = formatNumber(index);

  const progress = ((index + 1) / experiences.length) * 100;

  progressFill.style.width = `${progress}%`;
}

/* =========================================================
   CAMBIAR EXPERIENCIA
========================================================= */

function changeExperience(direction) {
  if (isChanging) return;

  isChanging = true;

  const nextIndex = normalizeIndex(currentIndex + direction);

  const nextExperience = experiences[nextIndex];

  /*
   * Comenzamos la transición
   */
  mainExperience.classList.add("changing");

  /*
   * Mostramos el universo que está entrando
   */
  applyWorldTheme(nextExperience);

  if (worldLoader) {
    worldLoaderNumber.textContent = formatNumber(nextIndex);

    worldLoaderText.textContent = "CARGANDO";

    worldLoader.classList.add("is-visible");
  }

  /*
   * Cambiamos realmente el contenido
   */
  setTimeout(() => {
    currentIndex = nextIndex;

    renderExperience(currentIndex);
  }, 280);

  /*
   * Ocultamos el loader
   */
  setTimeout(() => {
    if (worldLoader) {
      worldLoader.classList.remove("is-visible");
    }
  }, 650);

  /*
   * Terminamos la transición
   */
  setTimeout(() => {
    mainExperience.classList.remove("changing");

    isChanging = false;
  }, 900);
}

function openSelectedExperience() {
  const experience = experiences[currentIndex];

  if (!experience) return;

  /*
    Guardamos qué experiencia estaba viendo
    antes de entrar a evento.html.
  */
  sessionStorage.setItem("experienciaOrigen", experience.id);

  window.location.href = `./evento.html?tema=${encodeURIComponent(experience.id)}`;
}
/* =========================================================
   BOTONES
========================================================= */

prevButton.addEventListener("click", (event) => {
  event.stopPropagation();

  changeExperience(-1);
});

nextButton.addEventListener("click", (event) => {
  event.stopPropagation();

  changeExperience(1);
});

openButton.addEventListener("click", (event) => {
  event.stopPropagation();

  openSelectedExperience();
});

/* =========================================================
   CLICK EN EXPERIENCIA PRINCIPAL
========================================================= */

mainExperience.addEventListener("click", (event) => {
  /*
    Si hacemos click en el botón,
    el botón tiene su propia navegación.
  */

  if (event.target.closest("#openExperience")) {
    return;
  }

  openSelectedExperience();
});

/* =========================================================
   CLICK EN SLIDES LATERALES
========================================================= */

sideLeft.addEventListener("click", (event) => {
  event.stopPropagation();

  changeExperience(-1);
});

sideRight.addEventListener("click", (event) => {
  event.stopPropagation();

  changeExperience(1);
});

/* =========================================================
   TECLADO
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    event.preventDefault();

    changeExperience(1);
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();

    changeExperience(-1);
  }

  if (event.key === "Enter") {
    const tag = document.activeElement?.tagName;

    if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") {
      openSelectedExperience();
    }
  }
});

/* =========================================================
   DRAG / SWIPE
========================================================= */

carousel.addEventListener("pointerdown", (event) => {
  /*
    No iniciar drag sobre botones.
  */

  if (event.target.closest(".carousel-arrow, #openExperience")) {
    return;
  }

  dragging = true;

  dragStartX = event.clientX;

  dragCurrentX = event.clientX;

  carousel.classList.add("is-dragging");

  carousel.setPointerCapture(event.pointerId);
});

carousel.addEventListener("pointermove", (event) => {
  if (!dragging) return;

  dragCurrentX = event.clientX;

  const distance = dragCurrentX - dragStartX;

  /*
    Durante el drag hacemos que
    la tarjeta principal acompañe
    ligeramente el movimiento.
  */

  const resistance = 0.12;

  const movement = distance * resistance;

  mainExperience.style.transform = `translateX(${movement}px) scale(.985)`;
});

carousel.addEventListener("pointerup", (event) => {
  if (!dragging) return;

  dragging = false;

  carousel.classList.remove("is-dragging");

  try {
    carousel.releasePointerCapture(event.pointerId);
  } catch (error) {
    /* No hacemos nada */
  }

  const distance = dragCurrentX - dragStartX;

  mainExperience.style.transform = "";

  /*
    Umbral para cambiar.
  */

  if (distance < -70) {
    changeExperience(1);

    return;
  }

  if (distance > 70) {
    changeExperience(-1);

    return;
  }
});

carousel.addEventListener("pointercancel", () => {
  dragging = false;

  carousel.classList.remove("is-dragging");

  mainExperience.style.transform = "";
});

/* =========================================================
   MOUSE / TOUCH — CURSOR
========================================================= */

carousel.addEventListener("pointermove", (event) => {
  if (dragging) return;

  /*
    En escritorio mostramos cursor
    de navegación sobre los laterales.
  */

  const rect = carousel.getBoundingClientRect();

  const x = event.clientX - rect.left;

  const center = rect.width / 2;

  if (x < center - 180) {
    carousel.style.cursor = "w-resize";
  } else if (x > center + 180) {
    carousel.style.cursor = "e-resize";
  } else {
    carousel.style.cursor = "default";
  }
});

/* =========================================================
   SWIPE DESDE CUALQUIER PARTE DEL CARRUSEL
========================================================= */

carousel.addEventListener("dblclick", () => {
  /*
    Evitamos que el doble click
    produzca comportamientos raros
    del navegador.
  */

  return;
});

/* =========================================================
   RECUPERAR EXPERIENCIA ANTERIOR
========================================================= */

const experienciaOrigen = sessionStorage.getItem("experienciaOrigen");

if (experienciaOrigen) {
  const indexOrigen = experiences.findIndex(
    (experience) => experience.id === experienciaOrigen,
  );

  if (indexOrigen !== -1) {
    currentIndex = indexOrigen;
  }

  /*
    Una vez recuperada, la eliminamos.
    Así una nueva entrada directa a index.html
    vuelve a comenzar normalmente en Casamiento.
  */
  sessionStorage.removeItem("experienciaOrigen");
}

/* =========================================================
   INICIO
========================================================= */

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function createPointerParticle(x, y, tema) {
  if (!particleLayer) return;

  const config = particleEffects[tema] || particleEffects.casamiento;

  const particle = document.createElement("span");

  const color = config.colors[Math.floor(Math.random() * config.colors.length)];

  const type = config.types[Math.floor(Math.random() * config.types.length)];

  const angle = Math.random() * Math.PI * 2;

  const distance = randomBetween(config.spread * 0.35, config.spread);

  const offsetX = Math.cos(angle) * distance;

  const offsetY = Math.sin(angle) * distance - randomBetween(4, 18);

  const duration = randomBetween(config.duration[0], config.duration[1]);

  const size = randomBetween(config.size[0], config.size[1]);

  particle.className = `pointer-particle ${type}`;

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  particle.style.color = color;

  particle.style.setProperty("--particle-x", `${offsetX}px`);

  particle.style.setProperty("--particle-y", `${offsetY}px`);

  particle.style.setProperty("--particle-duration", `${duration}ms`);

  particle.style.setProperty("--particle-scale", randomBetween(0.5, 1.4));

  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particleLayer.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, duration + 100);
}

let lastParticleX = 0;
let lastParticleY = 0;
let lastParticleTime = 0;

mainExperience.addEventListener("pointermove", (event) => {
  if (event.pointerType !== "mouse") return;

  const rect = mainExperience.getBoundingClientRect();

  const x = event.clientX - rect.left;

  const y = event.clientY - rect.top;

  const now = performance.now();

  const distance = Math.hypot(x - lastParticleX, y - lastParticleY);

  /*
    Evitamos crear demasiadas partículas.
  */

  if (distance < 12 || now - lastParticleTime < 22) {
    return;
  }

  lastParticleX = x;
  lastParticleY = y;
  lastParticleTime = now;

  const experience = experiences[currentIndex];

  if (!experience) return;

  const config = particleEffects[experience.id] || particleEffects.casamiento;

  for (let i = 0; i < config.amount; i++) {
    createPointerParticle(
      x + randomBetween(-4, 4),
      y + randomBetween(-4, 4),
      experience.id,
    );
  }
});

mainExperience.addEventListener("pointerleave", () => {
  lastParticleX = 0;
  lastParticleY = 0;
});

renderExperience(currentIndex);

/* =========================================================
   EXPERIENCIAS
   BOOK EXPERIENCE ENGINE
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
    title: "Power Fiesta",
    phrase: "Una nueva aventura comienza.",
    image: "assets/img/book/cumple-8.png",
  },

  {
    id: "Power Cumple",
    title: "Baby Shower",
    phrase: "Una nueva historia comienza.",
    image: "assets/img/book/baby-shower.jpg",
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
    image: "assets/img/book/club.jpg",
  },

  {
    id: "otro",
    title: "Otro evento",
    phrase: "Imaginemos algo diferente.",
    image: "assets/img/book/otro.jpg",
  },
];

/* =========================================================
   PERSISTENCIA DEL ESTADO
========================================================= */

const BOOK_STATE_KEY = "experienciasBookState";

function saveBookState() {
  try {
    localStorage.setItem(
      BOOK_STATE_KEY,
      JSON.stringify({
        currentIndex: currentIndex,
      }),
    );
  } catch (error) {
    console.warn("No se pudo guardar el estado del libro:", error);
  }
}

function loadBookState() {
  try {
    const saved = localStorage.getItem(BOOK_STATE_KEY);

    /*
      Si nunca se guardó nada, devolvemos null.
      Esto es importante porque 0 es una posición válida.
    */

    if (!saved) {
      return null;
    }

    const data = JSON.parse(saved);

    if (
      Number.isInteger(data.currentIndex) &&
      data.currentIndex >= 0 &&
      data.currentIndex <= experiences.length
    ) {
      return data.currentIndex;
    }
  } catch (error) {
    console.warn("No se pudo recuperar el estado del libro:", error);
  }

  return null;
}

/* =========================================================
   ELEMENTOS
========================================================= */

const book = document.getElementById("book");
const openBook = document.getElementById("openBook");

const leftContent = document.getElementById("leftContent");

const rightContent = document.getElementById("rightContent");

const leftNumber = document.getElementById("leftNumber");

const rightNumber = document.getElementById("rightNumber");

const prevPage = document.getElementById("prevPage");

const nextPage = document.getElementById("nextPage");

const pageCurrent = document.getElementById("pageCurrent");

const pageTotal = document.getElementById("pageTotal");

const progressBar = document.getElementById("progressBar");

const bookHint = document.getElementById("bookHint");

/* =========================================================
   ESTADO
========================================================= */

let currentIndex = -1;
let isOpen = false;

let dragging = false;
let dragStartX = 0;
let dragCurrentX = 0;

/* =========================================================
   TOTAL
========================================================= */

pageTotal.textContent = String(experiences.length + 1).padStart(2, "0");

/* =========================================================
   CREAR EXPERIENCIA
========================================================= */

function createExperience(experience) {
  const isCumple8 = experience.id === "cumple-8";

  const specialClass = isCumple8 ? " experience-cumple-8" : "";

  return `
    <div
      class="experience-page${specialClass}"
      data-event="${experience.id}"
    >

      ${
        isCumple8
          ? `
            <div class="experience-game-scene">

              <img
                class="game-background"
                src="assets/img/book/mario-rock.jpg"
                alt=""
                draggable="false"
              >

              <div class="game-darkness"></div>

              <img
                class="game-character"
                src="assets/img/book/mario-greeting.png"
                alt="Cumple 8"
                draggable="false"
              >

              <div class="game-glow"></div>

              <div class="game-particles">

                <span class="particle particle-1">★</span>
                <span class="particle particle-2">✦</span>
                <span class="particle particle-3">●</span>
                <span class="particle particle-4">★</span>

              </div>

            </div>
          `
          : `
            <img
              class="experience-image"
              src="${experience.image}"
              alt="${experience.title}"
              draggable="false"
            >
          `
      }

      <div class="experience-info">

        <span class="experience-category">
          ${isCumple8 ? "POWER AVENTURA" : "Experiencia"}
        </span>

        <h2 class="experience-title">
          ${experience.title}
        </h2>

        <p class="experience-phrase">
          ${experience.phrase}
        </p>

        <button
          class="experience-open"
          type="button"
          data-event="${experience.id}"
        >
          <span>
            ${isCumple8 ? "Entrar a la aventura →" : "Vivir esta experiencia →"}
          </span>
        </button>

      </div>

    </div>
  `;
}

/* =========================================================
   MOSTRAR PÁGINAS
========================================================= */

function renderPage(index) {
  /*
    PORTADA
  */

  if (index < 0) {
    leftContent.innerHTML = "";
    rightContent.innerHTML = "";

    leftNumber.textContent = "02";
    rightNumber.textContent = "03";

    /*
      MUY IMPORTANTE:
      La portada NO modifica ni guarda currentIndex.
      De esta manera no pisa la última página visitada.
    */

    updateProgress();

    return;
  }

  const left = experiences[index - 1];

  const right = experiences[index];

  leftContent.innerHTML = left ? createExperience(left) : "";

  rightContent.innerHTML = right
    ? createExperience(right)
    : `
        <div class="simple-page">

          <span class="simple-number">
            FIN
          </span>

          <h2>
            Tu historia<br>
            puede ser la próxima.
          </h2>

          <p>
            Imaginemos juntos algo diferente.
          </p>

        </div>
      `;

  if (left) {
    leftNumber.textContent = String(index + 1).padStart(2, "0");
  }

  if (right) {
    rightNumber.textContent = String(index + 2).padStart(2, "0");
  }

  /*
    Actualizamos el estado DESPUÉS
    de preparar el contenido.
  */

  currentIndex = index;

  saveBookState();

  updateProgress();

  bindExperienceButtons();
}

/* =========================================================
   ABRIR LIBRO
========================================================= */

function openExperienceBook() {
  if (isOpen) return;

  isOpen = true;

  book.classList.add("open");
  book.classList.add("is-open");

  bookHint.classList.add("hidden");

  renderPage(0);
}

/* =========================================================
   SIGUIENTE
========================================================= */

function next() {
  if (!isOpen) {
    openExperienceBook();
    return;
  }

  if (currentIndex >= experiences.length) {
    return;
  }

  animatePageTurn("next");
}

/* =========================================================
   ANTERIOR
========================================================= */

function previous() {
  if (!isOpen) return;

  /*
    Estamos en la primera experiencia.
    Volvemos a la portada.
  */

  if (currentIndex <= 0) {
    book.classList.remove("open");
    book.classList.remove("is-open");

    isOpen = false;

    bookHint.classList.remove("hidden");

    /*
      NO modificamos currentIndex.
      Así el libro recuerda que estaba
      en la primera experiencia.
    */

    updateProgress();

    return;
  }

  animatePageTurn("previous");
}

/* =========================================================
   ANIMACIÓN DE PASAR PÁGINA
========================================================= */

function animatePageTurn(direction) {
  const nextIndex = direction === "next" ? currentIndex + 1 : currentIndex - 1;

  if (nextIndex < 0 || nextIndex > experiences.length) {
    return;
  }

  /*
    Guardamos la posición anterior
    para construir la hoja que gira.
  */

  const oldIndex = currentIndex;

  const currentExperience =
    direction === "next" ? experiences[oldIndex] : experiences[nextIndex];

  /*
    Primero preparamos el contenido nuevo.
    Esto evita que durante la transición
    aparezca el título anterior.
  */

  renderPage(nextIndex);

  /*
    Creamos la hoja que realiza el giro.
  */

  const page = document.createElement("div");

  page.className = "flip-page flipping";

  page.innerHTML = `
    <div class="flip-face flip-front">

      ${currentExperience ? createExperience(currentExperience) : ""}

    </div>

    <div class="flip-face flip-back"></div>
  `;

  book.appendChild(page);

  /*
    Forzamos al navegador a pintar
    la hoja antes de iniciar la animación.
  */

  page.getBoundingClientRect();

  requestAnimationFrame(() => {
    if (direction === "next") {
      page.style.transform = "rotateY(-180deg)";
    } else {
      page.style.transform = "rotateY(0deg)";
    }
  });

  /*
    Retiramos la hoja una vez
    terminada la animación.
  */

  setTimeout(() => {
    page.remove();
  }, 1000);
}

/* =========================================================
   PROGRESO
========================================================= */

function updateProgress() {
  const total = experiences.length + 1;

  const current = currentIndex < 0 ? 1 : currentIndex + 1;

  pageCurrent.textContent = String(current).padStart(2, "0");

  progressBar.style.width = `${(current / total) * 100}%`;
}

/* =========================================================
   ABRIR EXPERIENCIA
========================================================= */

function openSelectedExperience(eventType) {
  /*
    currentIndex ya fue guardado por renderPage().
    Simplemente navegamos a la categoría.
  */

  window.location.href = `evento.html?tema=${encodeURIComponent(eventType)}`;
}

/* =========================================================
   BOTONES DE LAS EXPERIENCIAS
========================================================= */

function bindExperienceButtons() {
  document.querySelectorAll(".experience-page").forEach((experience) => {
    if (experience.dataset.bound === "true") {
      return;
    }

    experience.dataset.bound = "true";

    experience.style.cursor = "pointer";

    experience.addEventListener("click", (event) => {
      event.stopPropagation();

      const eventType = experience.dataset.event;

      if (!eventType) return;

      openSelectedExperience(eventType);
    });
  });
}

/* =========================================================
   BOTONES PRINCIPALES
========================================================= */

openBook.addEventListener("click", openExperienceBook);

nextPage.addEventListener("click", next);

prevPage.addEventListener("click", previous);

/* =========================================================
   TECLADO
========================================================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    next();
  }

  if (event.key === "ArrowLeft") {
    previous();
  }
});

/* =========================================================
   MOUSE / DRAG
========================================================= */

const bookStage = document.querySelector(".book-stage");

bookStage.addEventListener("pointerdown", (event) => {
  if (!isOpen) return;

  /*
      Si estamos haciendo click
      sobre una experiencia,
      no iniciamos el drag.
    */

  if (event.target.closest(".experience-page")) {
    return;
  }

  dragging = true;

  dragStartX = event.clientX;

  dragCurrentX = event.clientX;

  bookStage.setPointerCapture(event.pointerId);
});

bookStage.addEventListener("pointermove", (event) => {
  if (!dragging) return;

  dragCurrentX = event.clientX;

  const distance = dragCurrentX - dragStartX;

  const page = book.querySelector(".flip-page");

  if (!page) return;

  const progress = Math.max(-1, Math.min(1, distance / 450));

  const rotation = -180 * Math.max(0, progress);

  page.style.transition = "none";

  page.style.transform = `rotateY(${rotation}deg)`;
});

bookStage.addEventListener("pointerup", () => {
  if (!dragging) return;

  dragging = false;

  const distance = dragCurrentX - dragStartX;

  if (distance < -100) {
    next();
  } else if (distance > 100) {
    previous();
  }
});

/* =========================================================
   MOVIMIENTO DE LUZ SOBRE LAS PÁGINAS
========================================================= */

document.addEventListener("pointermove", (event) => {
  const pages = document.querySelectorAll(".book-page, .flip-face");

  pages.forEach((page) => {
    const rect = page.getBoundingClientRect();

    if (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    ) {
      const x = ((event.clientX - rect.left) / rect.width) * 100;

      const y = ((event.clientY - rect.top) / rect.height) * 100;

      page.style.setProperty("--mouse-x", `${x}%`);

      page.style.setProperty("--mouse-y", `${y}%`);
    }
  });
});

/* =========================================================
   INICIO
========================================================= */

const savedBookIndex = loadBookState();

/*
  Si existe un estado guardado,
  incluso si es 0, recuperamos el libro.
*/

if (savedBookIndex !== null) {
  currentIndex = savedBookIndex;

  isOpen = true;

  book.classList.add("open");
  book.classList.add("is-open");

  bookHint.classList.add("hidden");

  renderPage(savedBookIndex);
} else {
  /*
    Primera visita:
    mostramos la portada.
  */

  currentIndex = -1;

  isOpen = false;

  book.classList.remove("open");
  book.classList.remove("is-open");

  bookHint.classList.remove("hidden");

  renderPage(-1);
}

updateProgress();

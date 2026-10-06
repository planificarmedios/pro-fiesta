const params = new URLSearchParams(window.location.search);
const tema = params.get("tema") || "casamiento";

const configuraciones = {
  casamiento: {
    nombre: "Casamiento",
    eyebrow: "UNA EXPERIENCIA PARA COMPARTIR",
    texto:
      "Una invitación puede ser mucho más que una fecha, un lugar y un nombre.",
  },

  cumpleanos: {
    nombre: "Cumpleaños",
    eyebrow: "UNA EXPERIENCIA PARA CELEBRAR",
    texto:
      "Una forma diferente de comenzar la celebración antes de que llegue el gran día.",
  },

  "cumple-8": {
    nombre: "Cumple 8",
    eyebrow: "UNA NUEVA AVENTURA COMIENZA",
    texto:
      "Es un día para una aventura enorme con una invitación que empieza hoy con tu fiesta.",
  },

  15: {
    nombre: "15 años",
    eyebrow: "UNA EXPERIENCIA PARA RECORDAR",
    texto:
      "Una invitación pensada para transformar una celebración en una experiencia.",
  },

  bautismo: {
    nombre: "Bautismo",
    eyebrow: "UNA EXPERIENCIA PARA COMPARTIR",
    texto:
      "Un momento especial merece una invitación tan especial como el recuerdo.",
  },

  comunion: {
    nombre: "Comunión",
    eyebrow: "UNA EXPERIENCIA PARA CELEBRAR",
    texto:
      "Una invitación delicada y personalizada para acompañar un día inolvidable.",
  },
};

const config = configuraciones[tema] || configuraciones.casamiento;

/* =========================================
   TEMA GENERAL
========================================= */

document.body.classList.add(`tema-${tema}`);

document.title = `${config.nombre} · Experiencias · Invitaciones digitales`;

document.getElementById("heroTitle").textContent = config.nombre;

document.getElementById("heroEyebrow").textContent = config.eyebrow;

document.getElementById("heroText").textContent = config.texto;

/* =========================================
   CUMPLE 8
   TRES UNIVERSOS
========================================= */

function construirCumple8() {
  const grid = document.querySelector(".design-grid");

  if (!grid) return;

  grid.innerHTML = `

    <!-- ================================
         DINOSAURIOS
    ================================= -->

    <a
      href="demo.html?tema=cumple-8&diseno=dinosaurios"
      class="design-card cumple8-card dinosaurios-card"
      data-universe="dinosaurios"
    >

      <div class="card-image">

        <div class="cumple8-preview dinosaurios-preview">

          <span class="cumple8-preview-number">
            01
          </span>

          <div class="dino-circle"></div>

          <div class="dino-symbol">
            🦖
          </div>

          <div class="dino-title">
            JURASSIC
          </div>

          <div class="dino-subtitle">
            ADVENTURE
          </div>

        </div>

      </div>

      <div class="card-info">

        <div>

          <span class="card-number">
            01
          </span>

          <h3>
            Dinosaurios
          </h3>

        </div>

        <span class="card-arrow">
          ↗
        </span>

        <p>
          Verde bosque, naturaleza y aventura.
          Un mundo perdido para comenzar una nueva historia.
        </p>

      </div>

    </a>


    <!-- ================================
         SELECCIÓN
    ================================= -->

    <a
      href="demo.html?tema=cumple-8&diseno=seleccion"
      class="design-card cumple8-card seleccion-card"
      data-universe="seleccion"
    >

      <div class="card-image">

        <div class="cumple8-preview seleccion-preview">

          <span class="cumple8-preview-number">
            02
          </span>

          <div class="seleccion-rays"></div>

          <div class="seleccion-ball">
            ⚽
          </div>

          <div class="seleccion-number">
            08
          </div>

          <div class="seleccion-title">
            SELECCIÓN
          </div>

          <div class="seleccion-subtitle">
            PASIÓN · FÚTBOL · FIESTA
          </div>

        </div>

      </div>

      <div class="card-info">

        <div>

          <span class="card-number">
            02
          </span>

          <h3>
            Selección
          </h3>

        </div>

        <span class="card-arrow">
          ↗
        </span>

        <p>
          Blanco, celeste y pasión.
          Una invitación inspirada en la emoción de la Selección.
        </p>

      </div>

    </a>


    <!-- ================================
         SUPERHÉROES
    ================================= -->

    <a
      href="demo.html?tema=cumple-8&diseno=superheroes"
      class="design-card cumple8-card superheroes-card"
      data-universe="superheroes"
    >

      <div class="card-image">

        <div class="cumple8-preview superheroes-preview">

          <span class="cumple8-preview-number">
            03
          </span>

          <div class="hero-rays"></div>

          <div class="hero-shield">
            ★
          </div>

          <div class="hero-title">
            HERO
          </div>

          <div class="hero-subtitle">
            LEVEL 08
          </div>

        </div>

      </div>

      <div class="card-info">

        <div>

          <span class="card-number">
            03
          </span>

          <h3>
            Superhéroes
          </h3>

        </div>

        <span class="card-arrow">
          ↗
        </span>

        <p>
          Rojo, amarillo y metal.
          Una invitación con energía de cómic y espíritu de protagonista.
        </p>

      </div>

    </a>

  `;

  /* =====================================
     CAMBIO DE UNIVERSO AL HACER HOVER
  ===================================== */

  const cards = grid.querySelectorAll(".cumple8-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      document.body.classList.remove(
        "cumple8-dinosaurios",
        "cumple8-seleccion",
        "cumple8-superheroes",
      );

      document.body.classList.add(`cumple8-${card.dataset.universe}`);
    });

    card.addEventListener("mouseleave", () => {
      document.body.classList.remove(
        "cumple8-dinosaurios",
        "cumple8-seleccion",
        "cumple8-superheroes",
      );
    });
  });
}

/* =========================================
   ACTIVAR CUMPLE 8
========================================= */

if (tema === "cumple-8") {
  construirCumple8();
}

/* =========================================
   LINKS DE LOS DISEÑOS
========================================= */

document.querySelectorAll(".design-card").forEach((card) => {
  const url = new URL(card.href, window.location.href);

  url.searchParams.set("tema", tema);

  card.href = url.toString();
});

/* =========================================
   NAVBAR AL HACER SCROLL
========================================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

/* =========================================
   MENÚ MOBILE
========================================= */

const menuToggle = document.getElementById("menuToggle");

const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú",
    );
  });

  /*
    Cerramos el menú automáticamente
    cuando el usuario selecciona una sección.
  */

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");

      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.setAttribute("aria-label", "Abrir menú");
    });
  });
}

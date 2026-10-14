/* =========================================================
   EXPERIENCIAS · EVENTO.JS
   Configuración de temas, tarjetas, navegación y transición
========================================================= */

(() => {
  "use strict";

  /* =======================================================
     1. TEMA ACTUAL
  ======================================================= */

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
      nombre: "Cumple 10",
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

  /* =======================================================
     2. APLICAR EL TEMA GENERAL
  ======================================================= */

  document.body.classList.add(`tema-${tema}`);

  document.title = `${config.nombre} · Experiencias · Invitaciones digitales`;

  const heroTitle = document.getElementById("heroTitle");
  const heroEyebrow = document.getElementById("heroEyebrow");
  const heroText = document.getElementById("heroText");

  if (heroTitle) heroTitle.textContent = config.nombre;
  if (heroEyebrow) heroEyebrow.textContent = config.eyebrow;
  if (heroText) heroText.textContent = config.texto;

  console.log("Tema activo:", tema);

  /* =======================================================
     3. TRANSICIÓN DE ENTRADA A LA INVITACIÓN

     Primer clic:
     - Intercepta el enlace de una tarjeta.
     - Muestra la capa de transición.

     Segundo clic:
     - Prepara la marca para el audio.
     - Activa la salida.
     - Espera 5 segundos.
     - Navega a la invitación seleccionada.
  ======================================================= */

  (() => {
    const overlay = document.getElementById("experience-transition");
    const enterButton = document.getElementById("transition-enter");
    const buttonLabel = document.getElementById("transition-button-label");
    const status = document.getElementById("transition-status");

    // Si el HTML no contiene la transición, no interrumpimos la página.
    if (!overlay || !enterButton || !buttonLabel || !status) {
      console.warn("No se encontraron todos los elementos de la transición.");
      return;
    }

    let destination = "";
    let navigating = false;
    let navigationTimer = null;

    const validPages = [
      "invitacion.html",
      "romantico.html",
      "custom.html",
      "demo.html",
    ];

    /* -------------------------------------------------------
       Identificar enlaces de tarjetas válidos
    ------------------------------------------------------- */

    function findCardLink(target) {
      if (!(target instanceof Element)) return null;

      const link = target.closest("a.design-card");

      if (!link) return null;

      const href = link.getAttribute("href");

      if (!href || href.startsWith("#")) return null;

      let url;

      try {
        url = new URL(href, window.location.href);
      } catch (error) {
        return null;
      }

      // Solo se interceptan enlaces del mismo sitio.
      if (url.origin !== window.location.origin) return null;

      const page = url.pathname.split("/").pop().toLowerCase();

      if (!validPages.includes(page)) return null;

      return link;
    }

    /* -------------------------------------------------------
       Mostrar la transición
    ------------------------------------------------------- */

    function openTransition(href) {
      destination = href;
      navigating = false;

      if (navigationTimer !== null) {
        clearTimeout(navigationTimer);
        navigationTimer = null;
      }

      buttonLabel.textContent = "Tocá para entrar";
      status.textContent = "Tu experiencia comienza acá.";

      enterButton.disabled = false;

      overlay.classList.remove("leaving");
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");

      document.body.classList.add("transition-active");

      enterButton.focus({ preventScroll: true });
    }

    /* -------------------------------------------------------
       Interceptar el clic de las tarjetas
    ------------------------------------------------------- */

    document.addEventListener("click", (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const link = findCardLink(event.target);

      if (!link) return;

      event.preventDefault();

      openTransition(link.href);
    });

    /* -------------------------------------------------------
       Iniciar la entrada a la invitación
    ------------------------------------------------------- */

    enterButton.addEventListener("click", () => {
      if (!destination || navigating) return;

      navigating = true;
      enterButton.disabled = true;

      buttonLabel.textContent = "Entrando a la fiesta…";
      status.textContent = "Preparando tu experiencia.";

      overlay.classList.add("leaving");

      // La página de destino usará esta marca para intentar
      // iniciar el audio después de la navegación.
      try {
        sessionStorage.setItem("proFiestaStartAudio", "1");
      } catch (error) {
        console.warn("No se pudo guardar la marca de audio.");
      }

      const target = destination;

      navigationTimer = window.setTimeout(() => {
        window.location.assign(target);
      }, 5000);
    });

    /* -------------------------------------------------------
       Escape: cerrar la transición antes de entrar
    ------------------------------------------------------- */

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        overlay.classList.contains("active") &&
        !navigating
      ) {
        overlay.classList.remove("active", "leaving");
        overlay.setAttribute("aria-hidden", "true");

        document.body.classList.remove("transition-active");

        destination = "";
      }
    });
  })();

  /* =======================================================
     4. CONSTRUIR LOS TRES UNIVERSOS DE CUMPLE 8
  ======================================================= */

  function construirCumple8() {
    const grid = document.querySelector(".design-grid");

    if (!grid) return;

    grid.innerHTML = `
      <!-- DINOSAURIOS -->
      <a
        href="demo.html?tema=cumple-8&diseno=dinosaurios"
        class="design-card cumple8-card dinosaurios-card"
        data-universe="dinosaurios"
      >
        <div class="card-image">
          <div class="cumple8-preview dinosaurios-preview">
            <span class="cumple8-preview-number">01</span>
            <div class="dino-circle"></div>
            <div class="dino-symbol">🦖</div>
            <div class="dino-title">JURASSIC</div>
            <div class="dino-subtitle">ADVENTURE</div>
          </div>
        </div>

        <div class="card-info">
          <div>
            <span class="card-number">01</span>
            <h3>Dinosaurios</h3>
          </div>

          <span class="card-arrow">↗</span>

          <p>
            Verde bosque, naturaleza y aventura.
            Un mundo perdido para comenzar una nueva historia.
          </p>
        </div>
      </a>

      <!-- SELECCIÓN -->
      <a
        href="demo.html?tema=cumple-8&diseno=seleccion"
        class="design-card cumple8-card seleccion-card"
        data-universe="seleccion"
      >
        <div class="card-image">
          <div class="cumple8-preview seleccion-preview">
            <span class="cumple8-preview-number">02</span>
            <div class="seleccion-rays"></div>
            <div class="seleccion-ball">⚽</div>
            <div class="seleccion-number">08</div>
            <div class="seleccion-title">SELECCIÓN</div>
            <div class="seleccion-subtitle">
              PASIÓN · FÚTBOL · FIESTA
            </div>
          </div>
        </div>

        <div class="card-info">
          <div>
            <span class="card-number">02</span>
            <h3>Selección</h3>
          </div>

          <span class="card-arrow">↗</span>

          <p>
            Blanco, celeste y pasión.
            Una invitación inspirada en la emoción de la Selección.
          </p>
        </div>
      </a>

      <!-- SUPERHÉROES -->
      <a
        href="demo.html?tema=cumple-8&diseno=superheroes"
        class="design-card cumple8-card superheroes-card"
        data-universe="superheroes"
      >
        <div class="card-image">
          <div class="cumple8-preview superheroes-preview">
            <span class="cumple8-preview-number">03</span>
            <div class="hero-rays"></div>
            <div class="hero-shield">★</div>
            <div class="hero-title">HERO</div>
            <div class="hero-subtitle">LEVEL 08</div>
          </div>
        </div>

        <div class="card-info">
          <div>
            <span class="card-number">03</span>
            <h3>Superhéroes</h3>
          </div>

          <span class="card-arrow">↗</span>

          <p>
            Rojo, amarillo y metal.
            Una invitación con energía de cómic y espíritu de protagonista.
          </p>
        </div>
      </a>
    `;

    /* -------------------------------------------------------
       Cambiar el universo visual al pasar el mouse
    ------------------------------------------------------- */

    const cards = grid.querySelectorAll(".cumple8-card");

    const universeClasses = [
      "cumple8-dinosaurios",
      "cumple8-seleccion",
      "cumple8-superheroes",
    ];

    function resetUniverse() {
      document.body.classList.remove(...universeClasses);
    }

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        resetUniverse();

        document.body.classList.add(`cumple8-${card.dataset.universe}`);
      });

      card.addEventListener("mouseleave", resetUniverse);

      card.addEventListener("focus", () => {
        resetUniverse();

        document.body.classList.add(`cumple8-${card.dataset.universe}`);
      });

      card.addEventListener("blur", resetUniverse);
    });
  }

  if (tema === "cumple-8") {
    construirCumple8();
  }

  document.querySelectorAll(".design-card").forEach((card) => {
    try {
      const url = new URL(card.href, window.location.href);

      url.searchParams.set("tema", tema);

      card.href = url.toString();
    } catch (error) {
      console.warn("No se pudo actualizar un enlace:", card);
    }
  });

  /* =======================================================
     6. NAVBAR AL HACER SCROLL
  ======================================================= */

  const navbar = document.querySelector(".navbar");

  if (navbar) {
    function updateNavbar() {
      navbar.classList.toggle("scrolled", window.scrollY > 80);
    }

    window.addEventListener("scroll", updateNavbar, {
      passive: true,
    });

    updateNavbar();
  }

  /* =======================================================
     7. MENÚ MÓVIL
  ======================================================= */

  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú",
      );
    });

    // Cerrar el menú cuando se selecciona una sección o enlace.
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
      });
    });
  }
})();

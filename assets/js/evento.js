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

document.body.classList.add(`tema-${tema}`);

document.title = `${config.nombre} · Experiencias · Invitaciones digitales`;

document.getElementById("heroTitle").textContent = config.nombre;

document.getElementById("heroEyebrow").textContent = config.eyebrow;

document.getElementById("heroText").textContent = config.texto;

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

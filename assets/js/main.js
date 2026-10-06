/**
 * Template Name: WeBuild
 * Template URL: https://bootstrapmade.com/free-bootstrap-coming-soon-template-countdwon/
 * Updated: Aug 08 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Countdown timer
   */
  function updateCountDown(countDownItem) {
    const timeleft =
      new Date(countDownItem.getAttribute("data-count")).getTime() -
      new Date().getTime();

    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    countDownItem.querySelector(".count-days").innerHTML = days;
    countDownItem.querySelector(".count-hours").innerHTML = hours;
    countDownItem.querySelector(".count-minutes").innerHTML = minutes;
    countDownItem.querySelector(".count-seconds").innerHTML = seconds;
  }

  document.querySelectorAll(".countdown").forEach(function (countDownItem) {
    updateCountDown(countDownItem);
    setInterval(function () {
      updateCountDown(countDownItem);
    }, 1000);
  });
})();

const canvas = document.getElementById("magic-cursor");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

canvas.width = width;
canvas.height = height;

const particles = [];

let mouseX = width / 2;
let mouseY = height / 2;

let lastX = mouseX;
let lastY = mouseY;

let time = 0;

/*--------------------------------------------------------------
# Resize
--------------------------------------------------------------*/

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width;
  canvas.height = height;
}

window.addEventListener("resize", resizeCanvas);

/*--------------------------------------------------------------
# Crear polvo dorado
--------------------------------------------------------------*/

function createParticle(x, y, intensity = 1) {
  const angle = Math.random() * Math.PI * 2;

  // Movimiento más suave y disperso
  const speed = Math.random() * 1.8 + 0.3;

  particles.push({
    x: x + (Math.random() - 0.5) * 16,
    y: y + (Math.random() - 0.5) * 16,

    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,

    size: Math.random() * 3.2 + 0.8,

    life: 1,

    decay: Math.random() * 0.012 + 0.006,

    // brillo
    glow: Math.random() * 25 + 15,

    // movimiento ondulante
    wave: Math.random() * Math.PI * 2,

    waveSpeed: Math.random() * 0.08 + 0.02,

    waveAmount: Math.random() * 1.5 + 0.5,

    // pequeñas partículas muy brillantes
    sparkle: Math.random() > 0.82,

    intensity,
  });
}

/*--------------------------------------------------------------
# Mouse
--------------------------------------------------------------*/

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  const dx = mouseX - lastX;
  const dy = mouseY - lastY;

  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance > 1.5) {
    // Mucho más polvo
    const amount = Math.min(Math.floor(distance / 2), 14);

    for (let i = 0; i < amount; i++) {
      const t = i / amount;

      const x = lastX + dx * t;
      const y = lastY + dy * t;

      createParticle(x, y);

      // Algunas zonas generan partículas extra
      if (Math.random() > 0.55) {
        createParticle(
          x + (Math.random() - 0.5) * 18,
          y + (Math.random() - 0.5) * 18,
          1.3,
        );
      }
    }

    lastX = mouseX;
    lastY = mouseY;
  }
});

/*--------------------------------------------------------------
# Dibujar partícula
--------------------------------------------------------------*/

function drawParticle(p) {
  const alpha = Math.max(p.life, 0);

  /*
   * Movimiento ondulante.
   * Esto evita que el polvo parezca una simple línea.
   */
  p.wave += p.waveSpeed;

  p.x += p.vx;
  p.y += p.vy;

  p.x += Math.sin(p.wave) * p.waveAmount;
  p.y += Math.cos(p.wave * 0.8) * p.waveAmount;

  p.vx *= 0.985;
  p.vy *= 0.985;

  p.life -= p.decay;

  if (p.life <= 0) {
    return false;
  }

  /*
   * Dorado principal
   */
  const gold = p.sparkle
    ? `rgba(255, 239, 150, ${alpha})`
    : `rgba(255, 205, 65, ${alpha * 0.85})`;

  ctx.beginPath();

  ctx.shadowBlur = p.sparkle ? p.glow + 15 : p.glow;

  ctx.shadowColor = `rgba(255, 190, 40, ${alpha})`;

  ctx.fillStyle = gold;

  ctx.arc(
    p.x,
    p.y,
    p.sparkle ? p.size * 1.5 * p.life : p.size * p.life,
    0,
    Math.PI * 2,
  );

  ctx.fill();

  /*
   * Pequeños destellos en algunas partículas
   */
  if (p.sparkle && p.life > 0.3) {
    ctx.beginPath();

    ctx.strokeStyle = `rgba(255, 235, 150, ${alpha * 0.7})`;

    ctx.lineWidth = 0.7;

    const sparkleSize = 4 * p.life;

    ctx.moveTo(p.x - sparkleSize, p.y);
    ctx.lineTo(p.x + sparkleSize, p.y);

    ctx.moveTo(p.x, p.y - sparkleSize);
    ctx.lineTo(p.x, p.y + sparkleSize);

    ctx.stroke();
  }

  return true;
}

/*--------------------------------------------------------------
# Animación
--------------------------------------------------------------*/

function animate() {
  time += 0.01;

  ctx.clearRect(0, 0, width, height);

  /*
   * Dibujar todas las partículas
   */
  for (let i = particles.length - 1; i >= 0; i--) {
    if (!drawParticle(particles[i])) {
      particles.splice(i, 1);
    }
  }

  ctx.shadowBlur = 0;

  requestAnimationFrame(animate);
}

animate();

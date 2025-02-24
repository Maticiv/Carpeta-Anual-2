import { trabajos } from "./trabajos.js";
window.abrirTab = abrirTab;

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navList = document.getElementById("nav-list");  

  menuIcon.addEventListener("click", function () {
    navList.classList.toggle("active");
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const splineViewer = document.querySelector("spline-viewer");
  if (splineViewer) {
    const shadowRoot = splineViewer.shadowRoot;
    const logo = shadowRoot.querySelector("#logo");
    if (logo) {
      logo.remove();
    }
  }
});

const navbar = document.querySelector(".navbar");
let lastScrollY = window.scrollY;

function handleScroll() {
  if (window.scrollY > lastScrollY) {
    navbar.style.top = "-60px";
  } else {
    navbar.style.top = "10px";
  }
  lastScrollY = window.scrollY;
}

function handleMouseMove(event) {
  if (event.clientY < 50) {
    navbar.style.top = "10px";
  }
}

function smoothScroll(event) {
  event.preventDefault();
  const targetId = this.getAttribute("href");
  document.querySelector(targetId).scrollIntoView({
    behavior: "smooth",
  });
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("mousemove", handleMouseMove);

document.querySelectorAll(".navbar a").forEach((anchor) => {
  anchor.addEventListener("click", smoothScroll);
});

document.querySelectorAll(".image-container").forEach((trabajo) => {
  const video = trabajo.querySelector("video");
  if (video) {
    trabajo.addEventListener("mouseenter", () => {
      video.play();
    });
    trabajo.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  }
});

let tabLinks = document.getElementsByClassName("tab-links");
let tabContenidos = document.getElementsByClassName("tab-contenido");

function abrirTab(nombretab, evento) {
  for (let i of tabLinks) {
    i.classList.remove("link-activo");
  }
  for (let j of tabContenidos) {
    j.classList.remove("tab-activa");
  }
  evento.currentTarget.classList.add("link-activo");
  document.getElementById(nombretab).classList.add("tab-activa");
}

document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");
  const seccionVideo = document.querySelector(".videoHeader");

  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(seccionVideo);
});

function cargarTrabajos() {
  const trabajosContainer = document.getElementById("trabajos-container");
  const mostrarMasBtn = document.getElementById("mostrar-mas");

  trabajosContainer.innerHTML = "";

  const trabajosVisibles =
    window.innerWidth <= 768
      ? window.innerWidth <= 480
        ? 2
        : 4
      : trabajos.length;

  trabajos.slice(0, trabajosVisibles).forEach((trabajo, index) => {
    const trabajoDiv = document.createElement("div");
    trabajoDiv.classList.add("image");
    if (index === 0 && window.innerWidth > 768) {
      trabajoDiv.classList.add("active");
    }

    let mediaElement;
    if (
      trabajo.fotos &&
      trabajo.fotos.length > 0 &&
      trabajo.fotos[0] !== ".png"
    ) {
      mediaElement = document.createElement("img");
      mediaElement.src = `./material/${trabajo.fotos[0]}`;
      mediaElement.alt = trabajo.nombre;
    } else if (trabajo.video) {
      mediaElement = document.createElement("video");
      mediaElement.src = `./material/${trabajo.video[0]}`;
      mediaElement.muted = true;
      mediaElement.loop = true;
      mediaElement.setAttribute("playsinline", "");
    }

    if (mediaElement) {
      trabajoDiv.appendChild(mediaElement);
    }

    const span = document.createElement("span");
    span.textContent = trabajo.nombre;
    trabajoDiv.appendChild(span);

    if (mediaElement) {
      mediaElement.addEventListener("click", (event) => {
        event.stopPropagation();
        if (trabajoDiv.classList.contains("active")) {
          window.location.href = `ampliacion.html?id=${trabajo.id}`;
        }
      });
    }

    trabajoDiv.addEventListener("click", () => {
      if (window.innerWidth > 768) {
        const active = document.querySelector(".active");
        if (active) {
          active.classList.remove("active");
        }
        trabajoDiv.classList.add("active");
      }
    });

    trabajosContainer.appendChild(trabajoDiv);
  });

  if (trabajos.length > trabajosVisibles) {
    mostrarMasBtn.style.display = "block";
  } else {
    mostrarMasBtn.style.display = "none";
  }

  mostrarMasBtn.addEventListener("click", () => {
    trabajos.slice(trabajosVisibles).forEach((trabajo) => {
      const trabajoDiv = document.createElement("div");
      trabajoDiv.classList.add("image");

      let mediaElement;
      if (
        trabajo.fotos &&
        trabajo.fotos.length > 0 &&
        trabajo.fotos[0] !== ".png"
      ) {
        mediaElement = document.createElement("img");
        mediaElement.src = `./material/${trabajo.fotos[0]}`;
        mediaElement.alt = trabajo.nombre;
      } else if (trabajo.video) {
        mediaElement = document.createElement("video");
        mediaElement.src = `./material/${trabajo.video[0]}`;
        mediaElement.muted = true;
        mediaElement.loop = true;
        mediaElement.setAttribute("playsinline", "");
      }

      if (mediaElement) {
        trabajoDiv.appendChild(mediaElement);
      }

      const span = document.createElement("span");
      span.textContent = trabajo.nombre;
      trabajoDiv.appendChild(span);

      trabajoDiv.addEventListener("click", () => {
        if (window.innerWidth > 768) {
          const active = document.querySelector(".active");
          if (active) {
            active.classList.remove("active");
          }
          trabajoDiv.classList.add("active");
        } else {
          window.location.href = `ampliacion.html?id=${trabajo.id}`;
        }
      });

      trabajosContainer.appendChild(trabajoDiv);
    });

    mostrarMasBtn.style.display = "none";
  });

  expandImage();
}

document.addEventListener("DOMContentLoaded", cargarTrabajos);

document.addEventListener("DOMContentLoaded", cargarTrabajos);

const expandImage = () => {
  const images = document.querySelectorAll(".image");
  images.forEach((image) => {
    image.addEventListener("mouseenter", () => {
      const active = document.querySelector(".active");
      if (active) {
        active.classList.remove("active");
      }
      image.classList.add("active");
    });
  });
};

document.addEventListener("DOMContentLoaded", cargarTrabajos);

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Nombre:", name);
    console.log("Correo electrónico:", email);
    console.log("Mensaje:", message);

    showToast("¡Mensaje enviado con éxito!");
  });

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

document.getElementById("cofre").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
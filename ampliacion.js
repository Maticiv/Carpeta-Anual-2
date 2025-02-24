import { trabajos } from "./trabajos.js";

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

document.addEventListener("DOMContentLoaded", function () {
  const menuIcon = document.getElementById("menu-icon");
  const navDetalle = document.getElementById("nav-detalle");

  menuIcon.addEventListener("click", function () {
    navDetalle.classList.toggle("active");
  });
});

const urlParams = new URLSearchParams(window.location.search);
const trabajoId = urlParams.get("id");

const trabajo = trabajos.find((t) => t.id == trabajoId);

if (trabajo) {
  document.getElementById("nombre-trabajo").textContent = trabajo.nombre;
  document.getElementById("descripcion-trabajo").textContent =
    trabajo.descripcion;
  document.getElementById("tecnologias-trabajo").textContent =
    trabajo.tecnologias;
  document.getElementById("materia-trabajo").textContent = trabajo.materia;
  document.getElementById("sector-trabajo").textContent = trabajo.sector;
  document.getElementById("consigna-trabajo").textContent = trabajo.consigna;
  document.getElementById("desarrollo-trabajo").textContent =
    trabajo.desarrollo;

  const sliderContent = document.getElementById("slider-content");

  if (trabajo.fotos && trabajo.fotos.length > 0) {
    trabajo.fotos.forEach((foto) => {
      if (foto !== ".png") {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        const img = document.createElement("img");
        img.src = `./material/${foto}`;
        img.alt = trabajo.nombre;
        slide.appendChild(img);
        sliderContent.appendChild(slide);
      }
    });
  }

  if (trabajo.video && trabajo.video.length > 0) {
    trabajo.video.forEach((video) => {
      if (video !== ".mp4") {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");
        const videoHtml = document.createElement("video");
        videoHtml.src = `./material/${video}`;
        videoHtml.controls = true;
        videoHtml.muted = true;
        videoHtml.loop = true;
        slide.appendChild(videoHtml);
        sliderContent.appendChild(slide);
      }
    });
  }

  const swiper = new Swiper(".swiper-container", {
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  mostrarTrabajosAleatorios(trabajoId);
}

function mostrarTrabajosAleatorios(trabajoActualId) {
  const trabajosContainer = document.getElementById(
    "trabajos-aleatorios-container"
  );
  trabajosContainer.innerHTML = "";

  const trabajosFiltrados = trabajos.filter((t) => t.id != trabajoActualId);

  const trabajosAleatorios = [];
  while (trabajosAleatorios.length < 4 && trabajosFiltrados.length > 0) {
    const randomIndex = Math.floor(Math.random() * trabajosFiltrados.length);
    trabajosAleatorios.push(trabajosFiltrados.splice(randomIndex, 1)[0]);
  }

  trabajosAleatorios.forEach((trabajo) => {
    const trabajoDiv = document.createElement("div");
    trabajoDiv.classList.add("trabajo-aleatorio");

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
      window.location.href = `ampliacion.html?id=${trabajo.id}`;
    });

    trabajosContainer.appendChild(trabajoDiv);
  });
}

document.getElementById("cofre").addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

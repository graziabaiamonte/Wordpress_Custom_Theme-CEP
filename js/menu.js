// POPUP MENU
const hamburgerMenu = document.querySelector(".hamburgerMenu");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");

// Mostra il popup quando clicchi sull'hamburger menu
hamburgerMenu.addEventListener("click", () => {
  console.log("clicco su hamburger");
  popup.classList.add("active");
  popup.classList.remove("closing");
});

// Chiudi il popup quando clicchi sul pulsante di chiusura
closeBtn.addEventListener("click", () => {
  // popup.classList.add('closing');
  popup.classList.remove("active");
});

// riappare payoff allo scroll top

let lastScrollTop = 0; // Salva la posizione dell'ultimo scroll

window.addEventListener("scroll", function () {
  var logo2 = document.querySelector(".logo-2"); // Seleziona il logo-2
  var currentScroll = window.scrollY; // La posizione attuale dello scroll

  // Se stai scorrendo verso il basso
  if (currentScroll > lastScrollTop) {
    if (currentScroll > 200) {
      // Quando si è scorsi più di 200px
      logo2.classList.add("hidden-logo"); // Nascondi il logo
    }
  } else {
    // Se stai scorrendo verso l'alto
    logo2.classList.remove("hidden-logo"); // Mostra immediatamente il logo
  }

  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Aggiorna la posizione dello scroll
});

// accordion pagina prodotto
let items = document.querySelectorAll(".contentBx");

items.forEach((item) => {
  let content = item.querySelector(".content");

  // Imposta la transizione iniziale
  content.style.transition =
    "max-height 0.5s ease-in-out, padding 0.3s ease-in-out";

  item.addEventListener("click", function () {
    let isActive = item.classList.contains("active");

    if (isActive) {
      content.style.maxHeight = content.scrollHeight + "px"; // Fissiamo altezza attuale
      requestAnimationFrame(() => {
        content.style.maxHeight = "0"; // Poi la chiudiamo
        content.style.padding = "0";
      });
    } else {
      content.style.maxHeight = "0"; // Reset per evitare glitch
      content.style.padding = "0"; // Reset padding
      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px"; // Apriamo
        content.style.padding = "10px 0"; // Aggiungiamo spazio per un effetto più morbido
      });
    }

    item.classList.toggle("active");
  });
});

// progress bar
function updateProgressBar() {
  const { scrollTop, scrollHeight } = document.documentElement;
  const scrollPercent =
    (scrollTop / (scrollHeight - window.innerHeight)) * 100 + "%";
  document
    .querySelector("#progress-bar")
    .style.setProperty("--progress", scrollPercent);
}

document.addEventListener("scroll", updateProgressBar);

// cursor
const cursor = document.querySelector(".cursor");
const hoverElements = document.querySelectorAll(".hover-this");

// Dimensioni in rem
const originalSize = { width: 1.4, height: 1.4 };
const enlargedSize = {
  width: originalSize.width * 5,
  height: originalSize.height * 5,
};

// Posizioni target e attuali
let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
const speed = 0.5; // Regola la fluidità

// Listener per aggiornare la posizione target
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animazione fluida del cursore
function animateCursor() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  const cursorWidth = cursor.offsetWidth;
  const cursorHeight = cursor.offsetHeight;

  cursor.style.left = `${currentX - cursorWidth / 2}px`;
  cursor.style.top = `${currentY - cursorHeight / 2}px`;

  requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover sugli elementii
hoverElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const { offsetX: x, offsetY: y } = e;
    const { offsetWidth: width, offsetHeight: height } = element;

    const move = 20;
    const xMove = (x / width) * (move * 2) - move;
    const yMove = (y / height) * (move * 2) - move;

    element.style.transform = `translate(${xMove}px, ${yMove}px)`;
  });

  element.addEventListener("mouseleave", () => {
    element.style.transform = "";
    cursor.style.width = `${originalSize.width}rem`;
    cursor.style.height = `${originalSize.height}rem`;
  });

  element.addEventListener("mouseenter", () => {
    cursor.style.width = `${enlargedSize.width}rem`;
    cursor.style.height = `${enlargedSize.height}rem`;
  });
});

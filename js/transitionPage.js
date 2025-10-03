// foto eventi in home
document.addEventListener("mousemove", (e) => {
  const images = document.querySelectorAll(".image");

  images.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const offsetX = (e.clientX - rect.left - rect.width / 2) * 0.1; // Regola l'intensità del movimento
    const offsetY = (e.clientY - rect.top - rect.height / 2) * 0.1;

    image.style.transform = `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`;
  });
});

// -------------------------------------------------

// Funzione per animare il count-up e formattare i numeri con separatori delle migliaia
// Funzione per animare il count-up e formattare i numeri con separatori delle migliaia
function countUp(element, start, end, duration) {
  let startTime = null;

  function animate(timestamp) {
    if (!startTime) startTime = timestamp;
    let progress = timestamp - startTime;
    let value = Math.min(start + (end - start) * (progress / duration), end);

    // Formatta il numero con separatori delle migliaia
    element.textContent = Math.floor(value).toLocaleString();

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      element.textContent = end.toLocaleString(); // Assicura che il numero finale sia preciso
    }
  }

  requestAnimationFrame(animate);
}

// Crea un observer per rilevare quando l'elemento è visibile
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const numberElement = entry.target;

        // Controlliamo che l'elemento abbia il data-count
        const endValue = numberElement.getAttribute("data-count");
        if (endValue) {
          countUp(numberElement, 0, parseInt(endValue), 2500); // velocità animazione
          numberElement.classList.add("visible"); // Aggiungi la classe "visible" per l'animazione di apparizione
          observer.unobserve(entry.target); // Interrompi l'osservazione una volta che è stato animato
        }
      }
    });
  },
  { threshold: 0.5 }
); // Si attiva quando almeno il 50% dell'elemento è visibile

// Osserva tutti gli elementi con la classe .primary
document.querySelectorAll(".primary").forEach((element) => {
  observer.observe(element);
});

// ------------------------------------------------

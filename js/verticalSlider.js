// const container = document.querySelector(".container");
// const rightBox = document.getElementById("rightBox");
// const leftBox = document.getElementById("leftBox");
// const cards = rightBox.querySelectorAll(".card");
// const leftParagraphs = leftBox.querySelectorAll("p");

// // Funzione per calcolare l'indice della card visibile nella colonna destra
// function getVisibleCardIndex() {
//   let index = 0;
//   let minDifference = Infinity;
//   cards.forEach((card, i) => {
//     const cardTop = card.offsetTop - rightBox.scrollTop;
//     const cardBottom = cardTop + card.offsetHeight;
//     const center = rightBox.clientHeight / 2;
//     const difference = Math.abs(center - (cardTop + cardBottom) / 2);
//     if (difference < minDifference) {
//       minDifference = difference;
//       index = i;
//     }
//   });
//   return index;
// }

// //Funzione per sincronizzare lo scroll tra rightBox e leftBox
// function updateScroll() {
//   const currentCardIndex = getVisibleCardIndex();

//   // Sincronizza il leftBox
//   const leftParagraph = leftParagraphs[currentCardIndex];
//   leftBox.scrollTo({
//     top: leftParagraph.offsetTop - leftBox.clientHeight / 2 + leftParagraph.clientHeight / 2,
//     behavior: "smooth",
//   });

//   //Controlla se l'ultima card è stata completamente visualizzata
//   if (currentCardIndex === cards.length - 1) {
//     rightBoxCompleted = true;
//    document.body.classList.remove("no-scroll"); // Riabilita lo scroll della pagina
//   }
// }

// let debounceTimeout;
// // Evento di scroll per il rightBox con debounce
// rightBox.addEventListener("scroll", () => {
//   clearTimeout(debounceTimeout);
//   debounceTimeout = setTimeout(updateScroll, 50); // Delay di 50ms per migliorare la performance
// });

// //Blocca lo scroll della pagina durante lo scroll del rightBox finché non è completato
// rightBox.addEventListener("wheel", (e) => {
//   if (!rightBoxCompleted) {
//     e.preventDefault(); // Blocca lo scroll della pagina
//     rightBox.scrollTop += e.deltaY; // Consenti lo scroll solo nel rightBox
//   }
// });

// let rightBoxCompleted = false; // Variabile per tracciare il completamento dello scroll
// container.addEventListener("mouseenter", () => {
//   if (!rightBoxCompleted) {
//     document.body.classList.add("no-scroll"); // Disabilita lo scroll della pagina
//   }
// });

// container.addEventListener("mouseleave", () => {
//   if (!rightBoxCompleted) {
//     document.body.classList.remove("no-scroll"); // Riabilita lo scroll della pagina
//   }
// });

// Funzione che aggiorna il numero e anima il cambio di numero
function updateNumber() {
  const cards = document.querySelectorAll(".card");
  const numbers = document.querySelectorAll(".box.left .number-container p");

  cards.forEach((card, index) => {
    const cardRect = card.getBoundingClientRect();
    const cardTop = cardRect.top;

    // Se la card è al top della pagina (un po' di margine per non essere troppo sensibile)
    if (
      cardTop <= window.innerHeight / 4 &&
      cardTop >= -card.offsetHeight / 4
    ) {
      // Animare il numero corrente
      numbers.forEach((num, numIndex) => {
        if (numIndex === index) {
          num.style.transform = "translateY(0)"; // Numero corrente in posizione visibile
        } else if (numIndex < index) {
          num.style.transform = "translateY(-100%)"; // Numero precedente scomparire sopra
        } else if (numIndex > index) {
          num.style.transform = "translateY(100%)"; // Numero successivo entra dal basso
        }
      });
    }
  });
}

// Aggiungi un listener per il scroll
window.addEventListener("scroll", updateNumber);

// Esegui subito per la posizione iniziale
updateNumber();

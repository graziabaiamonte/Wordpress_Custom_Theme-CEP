// gsap.registerPlugin(ScrollTrigger);

// // Funzione per cambiare dinamicamente la velocità
// function animateBand(selector, baseSpeed, scrollSpeedBoost) {
//   let speed = gsap.quickTo(selector, "x", { duration: 0.5, ease: "power1.out" });

//   gsap.to(selector, {
//     x: baseSpeed,
//     ease: "linear",
//     duration: 5,
//     repeat: -1,
//     yoyo: true,
//   });

//   ScrollTrigger.create({
//     trigger: ".boxLoopMarquee",
//     start: "top bottom",
//     end: "bottom top",
//     scrub: 2,
//     onUpdate: (self) => {
//       let velocity = self.getVelocity(); // Velocità dello scroll
//       let newSpeed = baseSpeed + (velocity / 300) * scrollSpeedBoost; // Incremento dinamico
//       speed(newSpeed); // Applica la nuova velocità senza scatti
//     }
//   });
// }

// // Applichiamo la funzione a ogni banda con valori diversi
// animateBand(".banda-1", "-3%", 5);
// animateBand(".banda-2", "4%", 6);
// animateBand(".banda-3", "-6%", 7);

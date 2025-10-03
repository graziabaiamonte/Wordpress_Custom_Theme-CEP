// Controlla se il preloader è già stato mostrato
const preloaderShown = localStorage.getItem("preloaderShown");

if (!preloaderShown) {
  // Mostra il preloader e salva lo stato
  const tl = gsap.timeline();

  tl.to("body", {
    overflow: "hidden",
  })
    .to(".preloader .text-container", {
      duration: 0,
      opacity: 1,
      ease: "Power3.easeOut",
    })
    .fromTo(
      ".preloaderGif",
      {
        y: 50,
        opacity: 0,
      },
      {
        duration: 0.3,
        y: 0,
        opacity: 1,
        ease: "Power3.easeOut",
      }
    )
    .to({}, { duration: 0.5 })
    .from(".preloader .text-container h1", {
      duration: 1,
      y: 200,
      ease: "Power3.easeOut",
    })
    .to({}, { duration: 1.8 })
    .to(".preloader .text-container h1", {
      duration: 1.8,
      y: 200,
      ease: "Power3.easeOut",
    })
    .to(".preloaderGif", {
      duration: 1.5,
      y: 200,
      ease: "Power3.easeOut",
    })
    .to(".preloader", {
      duration: 0.8,
      height: "0vh",
      ease: "Power3.easeOut",
    })
    .to(
      "body",
      {
        overflow: "auto",
      },
      "-=1"
    )
    .to(".preloader", {
      display: "none",
      onComplete: () => {
        // Segna il preloader come mostrato
        localStorage.setItem("preloaderShown", "true");
      },
    });
} else {
  // Se il preloader è già stato mostrato, nascondilo subito
  gsap.set(".preloader", { display: "none" });
  gsap.set("body", { overflow: "auto" });
}

// CODICE OTTIMO IN MOBILE, qualche problemino in desktop
//
// document.addEventListener("DOMContentLoaded", function () {
//   const isMobile =
//     /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
//     window.innerWidth <= 768;

//   const section = document.getElementById("heroBlu_3d");
//   const video = document.getElementById(
//     isMobile ? "stickyVideo_mobile" : "stickyVideo_desktop"
//   );

//   if (!section || !video) {
//     console.error("Video o Section mancante");
//     return;
//   }

//   gsap.registerPlugin(ScrollTrigger);

//   let scrollProgress = 0;
//   let targetTime = 0;
//   let currentTime = 0;
//   let videoDuration = 1; // Durata iniziale provvisoria
//   const lerpEase = 0.1;
//   let isScrolling = false;
//   let scrollTimeout;
//   let lastScrollTime = 0;

//   // Blocco autoplay: video fermo a 0
//   video.pause();
//   video.currentTime = 0;

//   // Quando i metadata sono caricati, aggiorno la durata reale
//   video.addEventListener("loadedmetadata", () => {
//     videoDuration = video.duration;
//   });

//   // Creo SUBITO lo ScrollTrigger (senza aspettare metadata)
//   ScrollTrigger.create({
//     trigger: section,
//     start: "top top",
//     end: `+=${window.innerHeight * 3}`,
//     scrub: false,
//     pin: true,
//     anticipatePin: 1,
//     onUpdate: (self) => {
//       const newProgress = self.progress;
//       const progressDiff = Math.abs(newProgress - scrollProgress);

//       if (progressDiff > 0.005) {
//         scrollProgress = newProgress;
//         isScrolling = true;
//         lastScrollTime = Date.now();

//         clearTimeout(scrollTimeout);
//         scrollTimeout = setTimeout(() => {
//           isScrolling = false;
//         }, 300);

//         targetTime = scrollProgress * videoDuration;
//       }
//     },
//   });

//   // Aggiornamento fluido del tempo del video
//   function smoothUpdate() {
//     const diff = Math.abs(targetTime - currentTime);
//     const timeSinceLastScroll = Date.now() - lastScrollTime;

//     if (isScrolling) {
//       currentTime += (targetTime - currentTime) * lerpEase;
//     } else {
//       if (diff < 0.002) {
//         currentTime = targetTime;
//       } else {
//         const decelerationFactor = Math.min(1, timeSinceLastScroll / 100);
//         const adjustedEase = lerpEase * (1 - decelerationFactor);
//         currentTime += (targetTime - currentTime) * adjustedEase;
//       }
//     }

//     if (video.readyState >= 2) {
//       video.currentTime = currentTime;
//     }

//     requestAnimationFrame(smoothUpdate);
//   }

//   smoothUpdate();
// });

// ----------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const isMobile =
    /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    window.innerWidth <= 768;

  // Codice invariato per mobile
  if (isMobile) {
    const section = document.getElementById("heroBlu_3d");
    const video = document.getElementById("stickyVideo_mobile");

    if (!section || !video) {
      console.error("Video o Section mancante");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let scrollProgress = 0;
    let targetTime = 0;
    let currentTime = 0;
    let videoDuration = 1;
    const lerpEase = 0.1;
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTime = 0;

    video.pause();
    video.currentTime = 0;

    video.addEventListener("loadedmetadata", () => {
      videoDuration = video.duration;
    });

    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 3}`,
      scrub: false,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        const newProgress = self.progress;
        const progressDiff = Math.abs(newProgress - scrollProgress);

        if (progressDiff > 0.005) {
          scrollProgress = newProgress;
          isScrolling = true;
          lastScrollTime = Date.now();

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 300);

          targetTime = scrollProgress * videoDuration;
        }
      },
    });

    function smoothUpdate() {
      const diff = Math.abs(targetTime - currentTime);
      const timeSinceLastScroll = Date.now() - lastScrollTime;

      if (isScrolling) {
        currentTime += (targetTime - currentTime) * lerpEase;
      } else {
        if (diff < 0.002) {
          currentTime = targetTime;
        } else {
          const decelerationFactor = Math.min(1, timeSinceLastScroll / 100);
          const adjustedEase = lerpEase * (1 - decelerationFactor);
          currentTime += (targetTime - currentTime) * adjustedEase;
        }
      }

      if (video.readyState >= 2) {
        video.currentTime = currentTime;
      }

      requestAnimationFrame(smoothUpdate);
    }

    smoothUpdate();
  } else {
    // Codice ottimizzato per desktop -------------------------------------------------------
    const section = document.getElementById("heroBlu_3d");
    const video = document.getElementById("stickyVideo_desktop");

    if (!section || !video) {
      console.error("Video o Section mancante per desktop");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    let scrollProgress = 0.3;
    let targetTime = 0;
    let currentTime = 0;
    let videoDuration = 1;
    const lerpEase = 0.75;
    let isScrolling = false;
    let scrollTimeout;
    let lastScrollTime = 0;
    let lastFrameTime = 0;

    // Forza il precaricamento del video
    video.preload = "auto";
    video.load();

    video.addEventListener("loadedmetadata", () => {
      videoDuration = video.duration;
      console.log("Durata video desktop:", videoDuration);
    });

    // Inizializzazione video
    video.pause();
    video.currentTime = 0;

    // Ottimizzazione ScrollTrigger
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: `+=${window.innerHeight * 5}`, // fine dopo 5 volte l’altezza della finestra
      scrub: false,
      pin: true,
      anticipatePin: 1,
      fastScrollEnd: true, // aiuta a rilevare la fine di uno scroll rapido, migliorando reattività quando l’utente smette di scrollare. Serve a ridurre jitter nei casi di scroll molto veloce.
      onUpdate: (self) => {
        const newProgress = self.progress;
        const progressDiff = Math.abs(newProgress - scrollProgress);

        if (progressDiff > 0.0001) {
          //(soglia minima  >> aumentata per maggiore reattività ed evitare scatti)

          scrollProgress = newProgress;
          isScrolling = true;
          lastScrollTime = Date.now();

          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => {
            isScrolling = false;
          }, 100);
          targetTime = scrollProgress * videoDuration;
        }
      },
    });

    //  smoothUpdate qui prende il timestamp (fornito da requestAnimationFrame) e throttla l’esecuzione: se sono passati meno di 16 ms dall’ultimo frame (≈ 1000/60 ≈ 16.67 ms), salta l’update e richiede un nuovo frame. Questo limita il loop a ~60 fps per risparmiare CPU
    function smoothUpdate(timestamp) {
      if (timestamp - lastFrameTime < 16) {
        // Limita a ~60fps
        requestAnimationFrame(smoothUpdate);
        return;
      }
      lastFrameTime = timestamp;

      const diff = Math.abs(targetTime - currentTime);
      const timeSinceLastScroll = Date.now() - lastScrollTime;

      if (isScrolling) {
        currentTime += (targetTime - currentTime) * lerpEase;
      } else {
        if (diff < 0.002) {
          currentTime = targetTime;
        } else {
          const decelerationFactor = Math.min(1, timeSinceLastScroll / 100);
          const adjustedEase = lerpEase * (1 - decelerationFactor);
          currentTime += (targetTime - currentTime) * adjustedEase;
        }
      }

      if (video.readyState >= 2) {
        video.currentTime = currentTime;
      }

      requestAnimationFrame(smoothUpdate);
    }

    // Avvia l'aggiornamento
    requestAnimationFrame(smoothUpdate);
  }
});

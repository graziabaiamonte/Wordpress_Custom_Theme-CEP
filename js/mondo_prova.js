// codice completo , ottimizzato per il mobile

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls as OrbitControls_new } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene_new = new THREE.Scene();

const camera_new = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);

// Salva la posizione iniziale della camera per il reset
const initialCameraPosition = new THREE.Vector3();
if (window.innerWidth <= 768) {
  initialCameraPosition.set(0, 0.5, 4);
  camera_new.position.set(0, 0.5, 4);
} else {
  initialCameraPosition.set(0.5, 1.5, 2.3);
  camera_new.position.set(0.5, 1.5, 2.3);
}

const renderer_new = new THREE.WebGLRenderer({ antialias: true });
renderer_new.setSize(window.innerWidth, window.innerHeight);
renderer_new.setPixelRatio(window.devicePixelRatio);
renderer_new.setClearColor(0xe6e6e6);

const container_new = document.querySelector("#scene-container_globe");
if (container_new) {
  container_new.appendChild(renderer_new.domElement);
}

const orbitCtrl_new = new OrbitControls_new(
  camera_new,
  renderer_new.domElement
);
orbitCtrl_new.enableDamping = true;
orbitCtrl_new.enableZoom = false;
orbitCtrl_new.maxPolarAngle = Math.PI / 2;
orbitCtrl_new.minPolarAngle = Math.PI / 2.5;
orbitCtrl_new.enablePan = false;

// Salva il target iniziale per il reset
const initialTarget = orbitCtrl_new.target.clone();

// Crea il pulsante di reset per mobile
function createResetButton() {
  const resetButton = document.createElement("button");
  resetButton.id = "globe-reset-btn";
  resetButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="white">
      <path d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4l4.9 4.9-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 1 0 1.4-1.4l-4.9-4.9 4.9-4.9a1 1 0 0 0 0-1.4z"/>
    </svg>
  `;

  resetButton.style.cssText = `
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.7);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.3s ease;
  `;

  resetButton.addEventListener("click", resetGlobeView);

  // Aggiungi il pulsante al container del globe
  if (container_new) {
    container_new.style.position = "relative";
    container_new.appendChild(resetButton);
  }

  return resetButton;
}

const resetButton = createResetButton();

// Funzione per resettare la vista del globo
function resetGlobeView() {
  const duration = 1000;
  const startPosition = camera_new.position.clone();
  const startTarget = orbitCtrl_new.target.clone();
  const startTime = performance.now();

  orbitCtrl_new.enabled = false;

  function animateReset(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easeOut = t * (2 - t);

    camera_new.position.lerpVectors(
      startPosition,
      initialCameraPosition,
      easeOut
    );
    orbitCtrl_new.target.lerpVectors(startTarget, initialTarget, easeOut);

    orbitCtrl_new.update();
    renderer_new.render(scene_new, camera_new);

    if (t < 1) {
      requestAnimationFrame(animateReset);
    } else {
      orbitCtrl_new.enabled = true;
      hasZoomed = false; // Reset dello stato zoom
      isInteracting_new = false; // Riabilita rotazione automatica

      // Nascondi il pulsante reset su mobile
      if (window.innerWidth <= 768) {
        resetButton.style.display = "none";
      }
    }
  }

  requestAnimationFrame(animateReset);
}

let touchStartY_new = 0;
let touchStartX_new = 0;
let isInteracting_new = false;

renderer_new.domElement.addEventListener("touchstart", (event_new) => {
  touchStartY_new = event_new.touches[0].clientY;
  touchStartX_new = event_new.touches[0].clientX;
});

renderer_new.domElement.addEventListener(
  "touchmove",
  (event_new) => {
    const touch = event_new.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartX_new);
    const deltaY = Math.abs(touch.clientY - touchStartY_new);

    if (deltaX > deltaY) {
      // Orizzontale → abilita rotazione
      isInteracting_new = true;
      orbitCtrl_new.enabled = true;
    } else {
      // Verticale → lascia Lenis lavorare
      isInteracting_new = false;
      orbitCtrl_new.enabled = false;
    }

    // NON usare preventDefault, lascia che Lenis gestisca lo scroll
  },
  { passive: true } // <<< Questo è fondamentale
);

const textureLoader_new = new THREE.TextureLoader();
const colorMap_new = textureLoader_new.load(
  "https://www.cepsrl.it/nuovo/wp-content/uploads/2025/02/8k_earth_specular_map-2-1-scaled.webp"
);
const globeGroup_new = new THREE.Group();
globeGroup_new.rotation.y = -Math.PI / 4;
scene_new.add(globeGroup_new);

const globeRadius = window.innerWidth <= 768 ? 0.7 : 1;
const geo_new = new THREE.SphereGeometry(globeRadius, 60, 60);

const mat_new = new THREE.MeshBasicMaterial({ map: colorMap_new });
const globe_new = new THREE.Mesh(geo_new, mat_new);
globeGroup_new.add(globe_new);

const markerGeometry_new = new THREE.SphereGeometry(0.05, 50, 50);

function createMarker_new(lat_new, lon_new, name_new, iconUrl_new) {
  const textureLoader_new2 = new THREE.TextureLoader();
  const iconTexture_new = textureLoader_new2.load(
    "https://www.cepsrl.it/wp-content/uploads/2025/04/mondino.webp"
  );
  const spriteMaterial_new = new THREE.SpriteMaterial({ map: iconTexture_new });
  const marker_new = new THREE.Sprite(spriteMaterial_new);

  // Aumenta la dimensione dei marker su mobile per facilitare il tocco
  const markerSize = window.innerWidth <= 768 ? 0.06 : 0.03;
  marker_new.scale.set(markerSize, markerSize, markerSize);

  const markerDistance = globeRadius * 1.03; // leggermente sopra la superficie
  const position_new = latLongToVector3_new(lat_new, lon_new, markerDistance);

  marker_new.position.copy(position_new);
  marker_new.lookAt(camera_new.position);
  marker_new.userData = { name: name_new };

  // Aggiungi una sfera invisibile più grande per facilitare il click su mobile
  if (window.innerWidth <= 768) {
    const clickHelperGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const clickHelperMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0,
      visible: false,
    });
    const clickHelper = new THREE.Mesh(
      clickHelperGeometry,
      clickHelperMaterial
    );
    clickHelper.position.copy(position_new);
    clickHelper.userData = { name: name_new, isClickHelper: true };
    globeGroup_new.add(clickHelper);

    // Salva il riferimento per il cleanup
    marker_new.userData.clickHelper = clickHelper;
  }

  globeGroup_new.add(marker_new);
  return marker_new;
}

function latLongToVector3_new(lat_new, lon_new, radius_new) {
  const phi_new = ((90 - lat_new) * Math.PI) / 180;
  const theta_new = ((lon_new + 180) * Math.PI) / 180;
  const x_new = -radius_new * Math.sin(phi_new) * Math.cos(theta_new);
  const y_new = radius_new * Math.cos(phi_new);
  const z_new = radius_new * Math.sin(phi_new) * Math.sin(theta_new);
  return new THREE.Vector3(x_new, y_new, z_new);
}

// Lista di marker con latitudine, longitudine e nome
const markerData_new = [
  { lat: -25, lon: 133, name: "Australia" },
  { lat: -40, lon: 174, name: "Nuova Zelanda" },
  { lat: 17, lon: -4, name: "Mali" },
  { lat: -1.94, lon: 29.87, name: "Rwanda" },
  { lat: -1.2921, lon: 36.8219, name: "Kenya" },
  { lat: -30, lon: 25, name: "Sud Africa" },
  { lat: -20.2, lon: 57.5, name: "Mauritius" },
  { lat: 51.5074, lon: -0.1278, name: "Regno Unito" }, // Londra
  { lat: 46.6034, lon: 1.8883, name: "Francia" }, // Francia centrale
  { lat: 40.4637, lon: -3.7492, name: "Spagna" }, // Madrid
  { lat: 39.3999, lon: -8.2245, name: "Portogallo" }, // Lisbona
  { lat: 41.9028, lon: 12.4964, name: "Italia" }, // Roma
  { lat: 46.8182, lon: 8.2275, name: "Svizzera" }, // Zurigo
  { lat: 51.1657, lon: 10.4515, name: "Germania" }, // Berlino
  { lat: 60.472, lon: 8.4689, name: "Norvegia" }, // Oslo
  { lat: 52.3676, lon: 4.9041, name: "Paesi Bassi" }, // Amsterdam
  { lat: 47.1625, lon: 19.5033, name: "Ungheria" }, // Budapest
  { lat: 51.9194, lon: 19.1451, name: "Polonia" }, // Varsavia
  { lat: 48.3794, lon: 31.1656, name: "Ucraina" }, // Kiev
  { lat: 37.9838, lon: 23.7275, name: "Grecia" }, // Atene
  { lat: 26.8206, lon: 30.8025, name: "Egitto" }, // Cairo
  { lat: 23.8859, lon: 45.0792, name: "Arabia Saudita" }, // Riyadh
  { lat: 31.7683, lon: 35.2137, name: "Israele" }, // Gerusalemme
  { lat: 31.9634, lon: 35.9304, name: "Giordania" }, // Amman
  { lat: 32.4279, lon: 53.688, name: "Iran" }, // Teheran
  { lat: 29.3759, lon: 47.9774, name: "Kuwait" }, // Kuwait City
  { lat: 48.0196, lon: 66.9237, name: "Kazakistan" }, // Almaty
  { lat: 46.8625, lon: 103.8467, name: "Mongolia" }, // Ulaanbaatar
  { lat: 21.9134, lon: 95.956, name: "Myanmar" }, // Naypyidaw
  { lat: 14.0583, lon: 108.2772, name: "Vietnam" }, // Hanoi
  { lat: 4.2105, lon: 101.9758, name: "Malesia" }, // Kuala Lumpur
  { lat: 1.3521, lon: 103.8198, name: "Singapore" }, // Singapore
  { lat: 12.8797, lon: 121.774, name: "Filippine" }, // Manila
  { lat: 37.0902, lon: -95.7129, name: "USA" }, // Washington D.C.
  { lat: 13.9094, lon: -83.7362, name: "Honduras" }, // Tegucigalpa
  { lat: 13.7942, lon: -88.8965, name: "El Salvador" }, // San Salvador
  { lat: -1.8312, lon: -78.1834, name: "Ecuador" }, // Quito
  { lat: -0.7776, lon: -90.2283, name: "Galapagos" }, // Galapagos Islands
  { lat: -33.4489, lon: -70.6693, name: "Cile" }, // Santiago
  { lat: -38.4161, lon: -63.6167, name: "Argentina" }, // Buenos Aires
  { lat: -14.235, lon: -51.9253, name: "Brasile" }, // Brasilia
  { lat: 18.7357, lon: -70.1627, name: "Repubblica Dominicana" }, // Santo Domingo
  { lat: 21.5218, lon: -77.7812, name: "Cuba" }, // L'Avana
  { lat: 25.0343, lon: -77.3963, name: "Bahamas" }, // Nassau
  { lat: 12.5211, lon: -69.9683, name: "Aruba" }, // Oranjestad
  { lat: 12.1696, lon: -68.99, name: "Curaçao" }, // Willemstad
  { lat: 12.2268, lon: -68.2482, name: "Antille" }, // Saint Martin
  { lat: 17.4871, lon: -62.9895, name: "Saint Eustatius" }, // Oranjestad
  { lat: 13.9094, lon: -60.978, name: "Saint Lucia" }, // Castries
  { lat: 17.3026, lon: -62.7177, name: "Saint Kitts" }, // Basseterre
  { lat: 17.6375, lon: -63.245, name: "Saba Islands" },
  { lat: 36.2048, lon: 138.2529, name: "Giappone" },
];

function addMarkers_new(markerData_new) {
  markerData_new.forEach((data_new) => {
    const marker_new = createMarker_new(
      data_new.lat,
      data_new.lon,
      data_new.name
    );
    markers_new.push(marker_new);

    // Aggiungi anche gli helper invisibili per il click su mobile
    if (marker_new.userData.clickHelper) {
      markers_new.push(marker_new.userData.clickHelper);
    }
  });
}

const markers_new = [];
addMarkers_new(markerData_new);

const tooltip_new = document.querySelector(".tooltipProva");

const raycaster_new = new THREE.Raycaster();
raycaster_new.params.Points.threshold = 0.2;
// Aumenta la soglia per i Sprite su mobile
raycaster_new.params.Sprite = {
  threshold: window.innerWidth <= 768 ? 0.3 : 0.01,
};
const mouse_new = new THREE.Vector2();

function updateTooltip_new(event_new, obj_new) {
  tooltip_new.innerHTML = obj_new.userData.name;
  const isMobile_new = window.innerWidth <= 768;
  const offset_new = isMobile_new ? -100 : -82;
  tooltip_new.style.left = event_new.clientX + offset_new + "px";
  tooltip_new.style.top = event_new.clientY + offset_new + "px";
  tooltip_new.style.display = "block";
}

function onMouseMove_new(event_new) {
  const rect_new = renderer_new.domElement.getBoundingClientRect();
  mouse_new.x = ((event_new.clientX - rect_new.left) / rect_new.width) * 2 - 1;
  mouse_new.y = -((event_new.clientY - rect_new.top) / rect_new.height) * 2 + 1;
  raycaster_new.setFromCamera(mouse_new, camera_new);
  const intersects_new = raycaster_new.intersectObjects(markers_new, true);
  if (intersects_new.length > 0) {
    const clickedMarker_new = intersects_new[0].object;
    updateTooltip_new(
      { clientX: event_new.clientX, clientY: event_new.clientY },
      clickedMarker_new
    );

    // SOLO su mobile blocchiamo la rotazione automatica al passaggio hover
    if (window.innerWidth <= 768) {
      isInteracting_new = true; // blocca rotazione automatica solo su mobile
    }

    // Rimuovo lo zoom al passaggio (se vuoi farlo solo al click)
    // zoomToMarker(clickedMarker_new); // COMMENTATO, così zoom solo al click
  } else {
    tooltip_new.style.display = "none";

    // su mobile riattiva la rotazione automatica se non si sta interagendo
    if (window.innerWidth <= 768) {
      isInteracting_new = false;
    }
  }
}

let hasZoomed = false; // all'inizio del file

function onMouseClick_new(event_new) {
  const rect_new = renderer_new.domElement.getBoundingClientRect();
  let clientX_new, clientY_new;

  if (event_new.touches) {
    clientX_new = event_new.touches[0].clientX;
    clientY_new = event_new.touches[0].clientY;
  } else {
    clientX_new = event_new.clientX;
    clientY_new = event_new.clientY;
  }

  mouse_new.x = ((clientX_new - rect_new.left) / rect_new.width) * 2 - 1;
  mouse_new.y = -((clientY_new - rect_new.top) / rect_new.height) * 2 + 1;

  raycaster_new.setFromCamera(mouse_new, camera_new);
  const intersects_new = raycaster_new.intersectObjects(markers_new, true);

  if (intersects_new.length > 0) {
    const clickedObject = intersects_new[0].object;

    // Se è un click helper, trova il marker corrispondente
    let targetMarker = clickedObject;
    if (clickedObject.userData.isClickHelper) {
      targetMarker = markers_new.find(
        (marker) =>
          marker.userData.name === clickedObject.userData.name &&
          !marker.userData.isClickHelper
      );
    }

    if (targetMarker) {
      updateTooltip_new(
        { clientX: clientX_new, clientY: clientY_new },
        targetMarker
      );

      // Zoom SOLO se siamo su mobile (viewport ≤ 768px)
      if (!hasZoomed && window.innerWidth <= 768) {
        zoomToMarker(targetMarker);
        hasZoomed = true;
        isInteracting_new = true;

        if (window.innerWidth <= 768) {
          resetButton.style.display = "flex";
        }
      }
    }
  } else {
    tooltip_new.style.display = "none";
  }
}

// Invece di window, usa il container specifico
if (container_new) {
  container_new.addEventListener("mousemove", onMouseMove_new);
  container_new.addEventListener("click", onMouseClick_new);
  container_new.addEventListener("touchstart", onMouseClick_new);
}

function animate_new(time) {
  requestAnimationFrame(animate_new);

  // ✅ Usa lenis solo se esiste
  if (typeof lenis !== "undefined" && lenis) {
    lenis.raf(time);
  }

  if (!isInteracting_new) {
    globeGroup_new.rotation.y += 0.00061;
  }

  orbitCtrl_new.update();
  renderer_new.render(scene_new, camera_new);
}

animate_new(); // Chiama l'animazione

function resizeRenderer_new() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // oppure fisso su mobile:
  const isMobile = window.innerWidth <= 768;
  const stableHeight = isMobile ? screen.height : height;

  renderer_new.setSize(width, stableHeight);
  camera_new.aspect = width / stableHeight;
  camera_new.updateProjectionMatrix();

  // Aggiorna la posizione iniziale della camera su resize
  if (isMobile) {
    initialCameraPosition.set(0, 0.5, 4);
  } else {
    initialCameraPosition.set(0.5, 1.5, 2.3);
    // Nascondi il pulsante reset su desktop
    resetButton.style.display = "none";
  }
}

resizeRenderer_new();
window.visualViewport.addEventListener("resize", resizeRenderer_new);

// Alla fine del tuo codice, aggiungi:
function cleanup_new() {
  if (container_new) {
    container_new.removeEventListener("mousemove", onMouseMove_new);
    container_new.removeEventListener("click", onMouseClick_new);
    container_new.removeEventListener("touchstart", onMouseClick_new);
  }
  window.visualViewport.removeEventListener("resize", resizeRenderer_new);

  // Rimuovi il pulsante reset
  if (resetButton && resetButton.parentNode) {
    resetButton.parentNode.removeChild(resetButton);
  }
}

// Cleanup automatico quando la pagina viene scaricata
window.addEventListener("beforeunload", cleanup_new);

// Cleanup quando la pagina perde il focus (utile per SPA)
window.addEventListener("pagehide", cleanup_new);

function zoomToMarker(marker) {
  const duration = 1000; // Durata animazione in ms
  const targetPosition = marker.position
    .clone()
    .normalize()
    .multiplyScalar(2.2);
  const startPosition = camera_new.position.clone();
  const startTarget = orbitCtrl_new.target.clone();
  const endTarget = orbitCtrl_new.target.clone();

  const startTime = performance.now();

  orbitCtrl_new.enabled = false;
  orbitCtrl_new.enableDamping = true; // <<<<< DISABILITA l'inerzia

  function animateZoom(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    const easeOut = t * (2 - t);

    camera_new.position.lerpVectors(startPosition, targetPosition, easeOut);
    orbitCtrl_new.target.lerpVectors(startTarget, endTarget, easeOut); // <<<<< questa è la linea cruciale

    orbitCtrl_new.update();
    renderer_new.render(scene_new, camera_new);

    if (t < 1) {
      requestAnimationFrame(animateZoom);
    } else {
      orbitCtrl_new.enabled = true;
    }
  }

  requestAnimationFrame(animateZoom);
}

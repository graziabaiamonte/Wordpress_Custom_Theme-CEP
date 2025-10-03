// codice funzionante in desktop ma non ottimizzato per mobile

import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Crea una camera prospettica con un angolo di campo di 45 gradi, rapporto di aspetto e range di visibilità
const camera = new THREE.PerspectiveCamera(
  45,
  innerWidth / innerHeight,
  0.1,
  1000
);

// Imposta la posizione della camera in base alla larghezza dello schermo (mobile o non)
if (window.innerWidth <= 768) {
  camera.position.set(0, 0.5, 4); // Posizione per schermi piccoli (mobile)
} else {
  camera.position.set(0.5, 1.5, 2.3); // Posizione per schermi grandi (desktop)
}

// Crea il renderer WebGL e attiva l'anti-aliasing per una qualità migliore
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Imposta la dimensione del renderer in base alla finestra del browser
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

// Imposta il colore di sfondo della scena (grigio chiaro)
renderer.setClearColor(0xe6e6e6);

// Aggiunge il renderer al DOM nella sezione con id 'scene-container'
const container = document.querySelector("#scene-container");
if (container) {
  container.appendChild(renderer.domElement);
} else {
  console.error("Elemento .scene-container non trovato");
}

// Aggiunge i controlli orbitali per navigare nella scena con il mouse o il touch
const orbitCtrl = new OrbitControls(camera, renderer.domElement);
orbitCtrl.enableDamping = true; // Abilita il damping per un movimento più fluido

orbitCtrl.enableZoom = false; // Disabilita lo zoom
orbitCtrl.maxPolarAngle = Math.PI / 2; // Limita l'angolo polare massimo (nessuna rotazione oltre la parte superiore della sfera)
orbitCtrl.minPolarAngle = Math.PI / 2.5; // Limita l'angolo polare minimo (nessuna rotazione oltre la parte inferiore della sfera)

orbitCtrl.enablePan = false; // Disabilita il pan (spostamento laterale)

// orbitCtrl.domElement.addEventListener("touchmove", (event) => {

//     if (Math.abs(event.touches[0].movementX) > Math.abs(event.touches[0].movementY)) {

//     event.preventDefault(); // Blocca lo scroll verticale solo se il movimento è orizzontale

//     }

//     }, { passive: false });

// Variabili per rilevare il tocco e il movimento del touch
let touchStartY = 0;
let touchStartX = 0;
let isInteracting = false; // Flag per determinare se l'utente sta interagendo con il globo

// Rileva il movimento del tocco e attiva/disattiva l'interazione con il globo
renderer.domElement.addEventListener("touchstart", (event) => {
  touchStartY = event.touches[0].clientY;
  touchStartX = event.touches[0].clientX;
});

renderer.domElement.addEventListener(
  "touchmove",
  (event) => {
    let touchCurrentY = event.touches[0].clientY;
    let touchCurrentX = event.touches[0].clientX;

    let deltaY = Math.abs(touchCurrentY - touchStartY);
    let deltaX = Math.abs(touchCurrentX - touchStartX);

    if (deltaX > deltaY) {
      // Se il movimento è orizzontale, permetti di ruotare il globo
      isInteracting = true;
      orbitCtrl.enabled = true;
      orbitCtrl.enableRotate = true;
      event.preventDefault(); // Impedisce lo scroll solo se il movimento è orizzontale
    } else {
      // Se il movimento è verticale, abilita lo scroll della pagina
      isInteracting = false;
      orbitCtrl.enableRotate = true;
    }
  },
  { passive: false }
); // Modificato a false per permettere preventDefault()

renderer.domElement.addEventListener(
  "wheel",
  (event) => {
    // Non fare nulla per mantenere la dimensione del globo fissa

    event.stopPropagation(); // Evita che OrbitControls intercetti lo scroll
  },
  { passive: false }
);

renderer.domElement.addEventListener("touchend", () => {
  // Dopo il tocco, riattiva OrbitControls dopo un breve timeout
  setTimeout(() => {
    if (!isInteracting) {
      orbitCtrl.enabled = false;
    }
  }, 300);
});

// Carica una texture per il globo (mappa speculare della Terra)
const textureLoader = new THREE.TextureLoader();
const colorMap = textureLoader.load(
  "https://www.cepsrl.it/nuovo/wp-content/uploads/2025/02/8k_earth_specular_map-2-1-scaled.webp"
);
const globeGroup = new THREE.Group(); // Gruppo che conterrà il globo

globeGroup.rotation.y = -Math.PI / 4; // Ruota il globo lungo l'asse Y

scene.add(globeGroup); // Aggiungi il gruppo alla scena

// Crea una geometria a sfera con 60 segmenti per migliorare la precisione
const geo = new THREE.SphereGeometry(1, 60, 60);
const mat = new THREE.MeshBasicMaterial({ map: colorMap }); // Materiale con la mappa di colore
const globe = new THREE.Mesh(geo, mat); // Crea il globo
globeGroup.add(globe); // Aggiungi il globo al gruppo

// Crea una geometria per i marker (sfere piccole)
const markerGeometry = new THREE.SphereGeometry(0.05, 50, 50);

// Funzione per creare un marker sulla superficie del globo in base a latitudine e longitudine
function createMarker(lat, lon, name, iconUrl) {
  const textureLoader = new THREE.TextureLoader();
  const iconTexture = textureLoader.load(
    "https://www.cepsrl.it/wp-content/uploads/2025/04/mondino.webp"
  ); // Carica un'icona per il marker
  const spriteMaterial = new THREE.SpriteMaterial({ map: iconTexture });
  const marker = new THREE.Sprite(spriteMaterial); // Crea il marker come sprite
  marker.scale.set(0.03, 0.03, 0.03); // Imposta la dimensione del marker

  const position = latLongToVector3(lat, lon, 1.02); // Calcola la posizione 3D dal lat/lon
  marker.position.copy(position); // Posiziona il marker
  marker.lookAt(camera.position); // Fa guardare il marker verso la camera
  marker.userData = { name }; // Aggiunge il nome come dato utente
  globeGroup.add(marker); // Aggiungi il marker al gruppo del globo
  return marker;
}

// Funzione per convertire latitudine e longitudine in coordinate 3D
function latLongToVector3(lat, lon, radius) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lon + 180) * Math.PI) / 180; // Correzione longitudine

  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z); // Ritorna le coordinate 3D
}

// Lista di marker con latitudine, longitudine e nome
const markerData = [
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

// Funzione per aggiungere tutti i marker alla scena
function addMarkers(markerData) {
  markerData.forEach((data) => {
    const marker = createMarker(data.lat, data.lon, data.name);
    markers.push(marker); // Aggiungi ogni marker alla lista di marker
  });
}

// Aggiungi i marker alla scena
const markers = [];
addMarkers(markerData);

// Tooltip per mostrare il nome del marker quando si passa sopra
const tooltip = document.querySelector(".tooltipProva");

// Crea un raycaster per rilevare l'interazione con i marker
const raycaster = new THREE.Raycaster();
raycaster.params.Points.threshold = 0.2; // Distanza minima per rilevare un'intersezione
const mouse = new THREE.Vector2();
let previousHoveredMarker = null;

// Funzione per aggiornare il tooltip quando il mouse si muove sopra un marker
function updateTooltip(event, obj) {
  tooltip.innerHTML = obj.userData.name; // Mostra il nome del marker

  // Verifica se siamo su un dispositivo mobile
  const isMobile = window.innerWidth <= 768;
  const offset = isMobile ? -100 : -12;

  tooltip.style.left = event.clientX + offset + "px";
  tooltip.style.top = event.clientY + offset + "px";
  tooltip.style.display = "block";
}

// Funzione per gestire il movimento del mouse
function onMouseMove(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera); // Imposta il raycaster in base alla posizione del mouse
  const intersects = raycaster.intersectObjects(markers, true); // Rileva gli oggetti con cui il raycaster interseca
  if (intersects.length > 0) {
    updateTooltip(event, intersects[0].object); // Aggiorna il tooltip
  } else {
    tooltip.style.display = "none";
  }
}

// Funzione per gestire il click del mouse
function onMouseClick(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  let clientX, clientY;

  // Verifica se è un tocco o un click
  if (event.touches) {
    clientX = event.touches[0].clientX;
    clientY = event.touches[0].clientY;
  } else {
    clientX = event.clientX;
    clientY = event.clientY;
  }

  mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(markers, true); // Controlla se il click ha intersecato un marker
  if (intersects.length > 0) {
    const clickedMarker = intersects[0].object;
    updateTooltip({ clientX, clientY }, clickedMarker); // Mostra il nome nel tooltip
  } else {
    tooltip.style.display = "none";
  }
}

// Aggiungi gli event listeners per mousemove, click e touch
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("click", onMouseClick);
window.addEventListener("touchstart", onMouseClick); // Per il mobile

// Nel loop di animazione, forza la rotazione attorno all'asse Y
function animate() {
  requestAnimationFrame(animate);

  if (!isInteracting) {
    globeGroup.rotation.y += 0.001; // Ruota automaticamente il globo sull'asse Y
  }

  orbitCtrl.update(); // Aggiorna i controlli orbitali
  renderer.render(scene, camera);
}

animate();

// Gestisce il ridimensionamento della finestra del browser
function resizeRenderer() {
  const stableHeight = document.documentElement.clientHeight;
  renderer.setSize(window.innerWidth, stableHeight);
  camera.aspect = window.innerWidth / stableHeight;
  camera.updateProjectionMatrix();
}

// Chiama la funzione immediatamente per garantire un valore iniziale corretto
resizeRenderer();

// Ascolta l'evento di ridimensionamento
window.visualViewport.addEventListener("resize", resizeRenderer);

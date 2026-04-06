// --- Données ---
const images = {
  olive_drab: [
    { src: "oro-quilt-apex-olive-drab-01.webp", srcFull: "oro-quilt-apex-olive-drab-01.webp", alt: "Quilt Oro vert olive" },
    { src: "oro-quilt-apex-olive-drab-02.webp", srcFull: "oro-quilt-apex-olive-drab-02.webp", alt: "Quilt Oro vert olive" },
    { src: "oro-quilt-apex-olive-drab-03.webp", srcFull: "oro-quilt-apex-olive-drab-03.webp", alt: "ZIP YKK du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-apex-olive-drab-04.webp", srcFull: "oro-quilt-apex-olive-drab-04.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau du cou" },
    { src: "oro-quilt-apex-olive-drab-05.webp", srcFull: "oro-quilt-apex-olive-drab-05.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-pad-straps.webp", srcFull: "oro-quilt-pad-straps.webp", alt: "Cordon élastique avec attaches pour maintenir la couette au matelas" }
  ],
  crimson: [
    { src: "oro-quilt-apex-crimson-01.webp", srcFull: "oro-quilt-apex-crimson-01.webp", alt: "Quilt Oro rouge" },
    { src: "oro-quilt-apex-crimson-02.webp", srcFull: "oro-quilt-apex-crimson-02.webp", alt: "Quilt Oro rouge" },
    { src: "oro-quilt-apex-crimson-03.webp", srcFull: "oro-quilt-apex-crimson-03.webp", alt: "ZIP YKK du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-apex-crimson-04.webp", srcFull: "oro-quilt-apex-crimson-04.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau du cou" },
    { src: "oro-quilt-apex-crimson-05.webp", srcFull: "oro-quilt-apex-crimson-05.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-pad-straps.webp", srcFull: "oro-quilt-pad-straps.webp", alt: "Cordon élastique avec attaches pour maintenir la couette au matelas" }
  ],
  royal_blue: [
    { src: "oro-quilt-apex-royal-blue-01.webp", srcFull: "oro-quilt-apex-royal-blue-01.webp", alt: "Quilt Oro bleu royal" },
    { src: "oro-quilt-apex-royal-blue-02.webp", srcFull: "oro-quilt-apex-royal-blue-02.webp", alt: "Quilt Oro bleu royal" },
    { src: "oro-quilt-apex-royal-blue-03.webp", srcFull: "oro-quilt-apex-royal-blue-03.webp", alt: "ZIP YKK du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-apex-royal-blue-04.webp", srcFull: "oro-quilt-apex-royal-blue-04.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau du cou" },
    { src: "oro-quilt-apex-royal-blue-05.webp", srcFull: "oro-quilt-apex-royal-blue-05.webp", alt: "Cordon de serrage du Quilt Oro pour fermer la couette au niveau des pieds" },
    { src: "oro-quilt-pad-straps.webp", srcFull: "oro-quilt-pad-straps.webp", alt: "Cordon élastique avec attaches pour maintenir la couette au matelas" }
  ]
};

// --- Variables ---
let currentColor = "olive_drab";
let currentIndex = 0;

const main = document.getElementById("main-image");
const mainLink = document.getElementById("main-link");
const thumbsContainer = document.querySelector(".product-thumbnails");

// --- Afficher image principale et active thumbnail ---
function showImage(index) {
  currentIndex = index;
  const imgObj = images[currentColor][currentIndex];
  main.src = `assets/img/${imgObj.src}`;
  main.alt = imgObj.alt;

  // mettre à jour miniature active
  thumbsContainer.querySelectorAll("img").forEach((img, i) => {
    img.classList.toggle("active", i === currentIndex);
  });
}

// --- Mettre à jour les thumbnails ---
function updateThumbnails() {
  thumbsContainer.innerHTML = "";

  images[currentColor].forEach((imgObj, i) => {
    const img = document.createElement("img");
    img.src = `assets/img/${imgObj.src}`;
    img.alt = imgObj.alt;
    img.dataset.index = i;
    if (i === 0) img.classList.add("active");

    // click → juste changer main image
    img.addEventListener("click", () => showImage(i));
    thumbsContainer.appendChild(img);
  });

  // afficher première image
  showImage(0);

  // initialiser lightbox pour la couleur actuelle
  initLightbox();
}

// --- Prev / Next ---
document.getElementById("prev").addEventListener("click", () => {
  const nextIndex = (currentIndex - 1 + images[currentColor].length) % images[currentColor].length;
  showImage(nextIndex);
});

document.getElementById("next").addEventListener("click", () => {
  const nextIndex = (currentIndex + 1) % images[currentColor].length;
  showImage(nextIndex);
});

// --- Boutons couleurs ---
const colorButtons = document.querySelectorAll(".color-btn");

function updateActiveColorButton() {
  colorButtons.forEach(btn => {
    // btn.classList.toggle("active", btn.dataset.color === currentColor);
    btn.classList.toggle("active", btn.value === currentColor);
  });
}


// Changement de couleur
colorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        // currentColor = btn.dataset.color;
        currentColor = btn.value;
        updateThumbnails();          // met à jour thumbnails, main image et lightbox
        updateActiveColorButton();   // met à jour le bouton actif
    });
});

// --- Initialiser GLightbox sur main image avec toutes les images de la couleur ---
let glightboxInstance;
function initLightbox() {
    if (glightboxInstance) glightboxInstance.destroy();
    
    const galleryElements = images[currentColor].map(imgObj => ({
    href: `assets/img/${imgObj.srcFull}`,
    type: 'image',
    title: imgObj.alt
}));

glightboxInstance = GLightbox({ elements: galleryElements });

// clic sur main image → ouvre lightbox
mainLink.addEventListener("click", e => {
    e.preventDefault();
    glightboxInstance.openAt(currentIndex);
});
}

// --- Initialisation ---
updateThumbnails();
updateActiveColorButton();
initLightbox();


GLightbox({
  selector: '.glightbox-single'
});
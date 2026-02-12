const tulips = document.querySelectorAll('.tulip');
const petals = document.querySelectorAll('.petal');

const modal = document.getElementById('modal');
const dynamicContent = document.getElementById('dynamic-content');
const closeBtn = document.getElementById('close');

const finalScreen = document.getElementById('final-screen');
const restartBtn = document.getElementById('restart');
const closeFinalBtn = document.getElementById('close-final');

modal.style.display = "none";
finalScreen.style.display = "none";

let viewedPetals = 0;
const totalPetals = petals.length;

let shouldShowFinal = false;

tulips.forEach(tulip => {
  const flowerPetals = tulip.querySelectorAll('.petal');
  let openedCount = 0;

  // Abrir pétalos progresivamente
  tulip.addEventListener('click', (e) => {

    // Si pulsa directamente en un pétalo abierto,
    // dejamos que el evento del pétalo lo maneje
    if (e.target.classList.contains('petal')) return;

   if (openedCount < flowerPetals.length) {
      flowerPetals[openedCount].classList.add('open');
      openedCount++;
    }
  });

  // Ver contenido
  flowerPetals.forEach(petal => {
    petal.addEventListener('click', (e) => {
      e.stopPropagation();

      if (!petal.classList.contains('open')) return;

      const type = petal.dataset.type;
      const content = petal.dataset.content;
      if (!content) return;

      if (type === "image") {
        dynamicContent.innerHTML = `<img src="${content}">`;
      } else {
        dynamicContent.innerHTML = `<p>${content}</p>`;
      }

      modal.style.display = "flex";

      // Marcar como visto solo la primera vez
      if (!petal.classList.contains('viewed')) {
        petal.classList.add('viewed');
        viewedPetals++;

        if (viewedPetals === totalPetals) {
          shouldShowFinal = true;
        }
      }
    });
  });
});

// Cerrar modal normal
closeBtn.addEventListener('click', () => {
  modal.style.display = "none";

  // Si ya vio todos y estaba pendiente mostrar final
  if (shouldShowFinal) {
    shouldShowFinal = false;
    document.body.style.transition = "background 0.5s ease";
    document.body.style.background = "#162538";

    setTimeout(() => {
      finalScreen.style.display = "flex";
  }, 300);
  }
});

// Cerrar pantalla final
closeFinalBtn.addEventListener('click', () => {
  finalScreen.style.display = "none";
});

// Reiniciar experiencia
restartBtn.addEventListener('click', () => {
  finalScreen.style.display = "none";

  petals.forEach(petal => {
    petal.classList.remove('open');
    petal.classList.remove('viewed');
  });

  viewedPetals = 0;
  shouldShowFinal = false;
});

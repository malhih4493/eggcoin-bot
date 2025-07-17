let eggCount = 0;
let chickenCount = 1;

const chicken = document.getElementById("chicken");
const eggCounter = document.getElementById("eggCount");
const chickenCounter = document.getElementById("chickenCount");
const animationContainer = document.getElementById("eggAnimationContainer");

function updateEggCount(amount = 1) {
  eggCount += amount;
  eggCounter.textContent = eggCount;
  animateEgg();
}

function animateEgg() {
  const egg = document.createElement("div");
  egg.classList.add("flying-egg");
  egg.textContent = "🥚";
  const x = chicken.getBoundingClientRect().left + chicken.offsetWidth / 2;
  const y = chicken.getBoundingClientRect().top + window.scrollY;
  egg.style.left = `${x}px`;
  egg.style.top = `${y}px`;
  animationContainer.appendChild(egg);
  setTimeout(() => animationContainer.removeChild(egg), 1000);
}

function handleTap(e) {
  e.preventDefault();
  updateEggCount(chickenCount);
}

// 💥 Multi-touch: каждый палец = один тап
chicken.addEventListener("touchstart", (e) => {
  e.preventDefault();
  for (let i = 0; i < e.touches.length; i++) {
    updateEggCount(chickenCount);
  }
}, { passive: false });

// 🖱 ПК-клик
chicken.addEventListener("click", handleTap);

// 🛒 Купить курицу
function buyChicken() {
  if (eggCount >= 10000) {
    eggCount -= 10000;
    chickenCount++;
    eggCounter.textContent = eggCount;
    chickenCounter.textContent = chickenCount;
  }
}
document.getElementById("buyButton").addEventListener("click", buyChicken);

// 📤 Поделиться
document.getElementById("shareButton").addEventListener("click", () => {
  const message = document.getElementById("shareMessage");
  if (navigator.share) {
    navigator.share({
      title: "EGGCoin Farm",
      text: "Тапай по курице и зарабатывай яйца!",
      url: "http://eggcoinfarm.online"
    }).then(() => {
      eggCount += 10000;
      eggCounter.textContent = eggCount;
      message.textContent = "Спасибо! Ты получил 10 000 яиц 🥚";
    }).catch(() => {
      message.textContent = "Не удалось поделиться.";
    });
  } else {
    message.textContent = "Скопируй ссылку и отправь другу: eggcoinfarm.online";
  }
});

// Визуальный эффект нажатия
chicken.addEventListener("touchstart", () => {
  chicken.classList.add("tapped");
});

chicken.addEventListener("touchend", () => {
  chicken.classList.remove("tapped");
});

chicken.addEventListener("mousedown", () => {
  chicken.classList.add("tapped");
});

chicken.addEventListener("mouseup", () => {
  chicken.classList.remove("tapped");
});

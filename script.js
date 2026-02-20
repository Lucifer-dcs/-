alert("Welcome to the 𝕷𝖚𝖈𝖎𝖋𝖊𝖗 ⸸");
const ropeHandle = document.getElementById("ropeHandle");
const pullRope = document.getElementById("pullRope");
const loginForm = document.getElementById("loginForm");
const lampContainer = document.getElementById("lampContainer");

let isDragging = false;
let startY = 0;
let pull = 0;
let velocity = 0;

let lampOn = false;
let hasTriggered = false;

const maxPull = 140;
const springStrength = 0.08;
const damping = 0.88;
const swingStrength = 0.15;

let swingAngle = 0;
let swingVelocity = 0;

loginForm.classList.add("hidden");

ropeHandle.addEventListener("mousedown", startDrag);
ropeHandle.addEventListener("touchstart", startDrag, { passive: false });

function startDrag(e) {
  e.preventDefault();
  isDragging = true;
  hasTriggered = false;
  startY = getY(e);

  document.addEventListener("mousemove", drag);
  document.addEventListener("touchmove", drag, { passive: false });
  document.addEventListener("mouseup", stopDrag);
  document.addEventListener("touchend", stopDrag);
}

function drag(e) {
  if (!isDragging) return;
  e.preventDefault();

  const currentY = getY(e);
  let delta = currentY - startY;
  pull = Math.max(0, Math.min(maxPull, delta));

  if (pull > 80 && !hasTriggered) {
    lampOn = !lampOn;
    hasTriggered = true;
    updateLoginState();
  }
}

function stopDrag() {
  isDragging = false;

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("touchmove", drag);
  document.removeEventListener("mouseup", stopDrag);
  document.removeEventListener("touchend", stopDrag);
}

function getY(e) {
  return e.type.includes("touch") ? e.touches[0].clientY : e.clientY;
}

function updateLoginState() {
  if (lampOn) {
    loginForm.classList.remove("hidden");
    loginForm.classList.add("visible");
    lampContainer.classList.add("lamp-on");
  } else {
    loginForm.classList.remove("visible");
    loginForm.classList.add("hidden");
    lampContainer.classList.remove("lamp-on");
  }
}

function animate() {
  if (!isDragging) {
    let force = -pull * springStrength;
    velocity += force;
    velocity *= damping;
    pull += velocity;

    if (Math.abs(pull) < 0.2) {
      pull = 0;
      velocity = 0;
    }
}
}
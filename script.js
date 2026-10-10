const root = document.documentElement;
const mathLayer = document.getElementById("mathLayer");

const symbols = [
    "∫",
    "∑",
    "√",
    "∀",
    "∃",
    "∈",
    "∉",
    "⊆",
    "⊂",
    "∅",
    "∞",
    "∇",
    "∂",
    "≈",
    "≠",
    "≤",
    "≥",
    "→",
    "↔",
    "⇒",
    "⇔",
    "λ",
    "π",
    "θ",
    "α",
    "β",
    "δ",
    "ε",
    "φ",
    "ψ",
    "Γ",
    "Δ",
    "Ω",
    "ℕ",
    "ℤ",
    "ℚ",
    "ℝ",
    "O(n)",
    "2ᵏ",
    "x²",
    "n!",
    "log n",
    "|V|",
    "|E|",
    "33"
];


/* ---------------------------------------------------------
   Generate background mathematical symbols
--------------------------------------------------------- */

function generateMathBackground() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    const area = width * height;

    /*
        Enough symbols to make the cursor reveal interesting,
        but sparse enough not to look like wallpaper.
    */

    const count = Math.min(
        95,
        Math.max(45, Math.floor(area / 22000))
    );

    mathLayer.innerHTML = "";

    for (let i = 0; i < count; i++) {

        const span = document.createElement("span");

        span.className = "math-symbol";

        span.textContent =
            symbols[
                Math.floor(Math.random() * symbols.length)
            ];

        span.style.left =
            `${Math.random() * 100}%`;

        span.style.top =
            `${Math.random() * 100}%`;

        span.style.fontSize =
            `${18 + Math.random() * 30}px`;

        span.style.opacity =
            `${0.45 + Math.random() * 0.55}`;

        span.style.transform =
            `translate(-50%, -50%)
             rotate(${Math.random() * 28 - 14}deg)`;

        mathLayer.appendChild(span);
    }
}


generateMathBackground();


/* Regenerate if screen geometry changes considerably */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(
        generateMathBackground,
        250
    );

});


/* ---------------------------------------------------------
   Smooth mouse spotlight
--------------------------------------------------------- */

let targetX = window.innerWidth / 2;
let targetY = window.innerHeight / 2;

let currentX = targetX;
let currentY = targetY;

const isTouch = window.matchMedia("(hover: none)").matches;
let lastTouch = -Infinity;


document.addEventListener("mousemove", (event) => {

    targetX = event.clientX;
    targetY = event.clientY;

});


/* On phones the light follows the finger */

function setTouchTarget(event) {

    const touch = event.touches[0];

    if (!touch) return;

    targetX = touch.clientX;
    targetY = touch.clientY;
    lastTouch = performance.now();

}

document.addEventListener("touchstart", setTouchTarget, { passive: true });
document.addEventListener("touchmove", setTouchTarget, { passive: true });


function updateCursor(now) {

    /* With no finger on screen, the light drifts slowly by itself */

    if (isTouch && now - lastTouch > 2500) {

        const w = window.innerWidth;
        const h = window.innerHeight;

        targetX = w / 2 + Math.sin(now / 3200) * w * 0.38;
        targetY = h / 2 + Math.sin(now / 2300 + 1) * h * 0.32;

    }

    /*
        Small interpolation creates a smoother,
        less "gaming cursor" feeling.
    */

    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    root.style.setProperty("--mouse-x", `${currentX}px`);
    root.style.setProperty("--mouse-y", `${currentY}px`);

    requestAnimationFrame(updateCursor);
}


requestAnimationFrame(updateCursor);


/* ---------------------------------------------------------
   Research-card cursor lighting
--------------------------------------------------------- */

document
    .querySelectorAll(".research-card")
    .forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                card.style.setProperty(
                    "--card-x",
                    `${x}px`
                );

                card.style.setProperty(
                    "--card-y",
                    `${y}px`
                );

            }
        );

    });

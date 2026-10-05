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
    "|E|"
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


document.addEventListener("mousemove", (event) => {

    targetX = event.clientX;
    targetY = event.clientY;

});


function updateCursor() {

    /*
        Small interpolation creates a smoother,
        less "gaming cursor" feeling.
    */

    currentX += (targetX - currentX) * 0.14;
    currentY += (targetY - currentY) * 0.14;

    root.style.setProperty(
        "--mouse-x",
        `${currentX}px`
    );

    root.style.setProperty(
        "--mouse-y",
        `${currentY}px`
    );

    requestAnimationFrame(updateCursor);
}


updateCursor();


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

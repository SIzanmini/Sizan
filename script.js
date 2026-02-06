var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = 400;
var starArray = [];
var hearts = []; // Floating hearts array

// Initialize Stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random()
    });
}

// Initialize Floating Hearts
function createHeart() {
    return {
        x: Math.random() * canvas.width,
        y: canvas.height + 20,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3
    };
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonContainer = document.getElementById("buttonContainer");
const kitty = document.getElementById("kitty");

// --- YES CLICK: ULTRA MAGIC ---
yesButton.addEventListener("click", () => {
    alert("YAY! I love you so much! 💖✨");
    // Confetti + Flying Hearts
    for(let i=0; i<150; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.innerHTML = Math.random() > 0.5 ? "💖" : "🌸"; // Hearts and Flowers
        c.style.left = Math.random() * 100 + "vw";
        c.style.fontSize = Math.random() * 20 + 10 + "px";
        c.style.position = "fixed";
        c.style.top = "-20px";
        c.style.zIndex = "1000";
        c.style.transition = "transform 3s linear, opacity 3s";
        document.body.appendChild(c);
        
        setTimeout(() => {
            c.style.transform = `translateY(110vh) rotate(${Math.random() * 360}deg)`;
            c.style.opacity = "0";
        }, 10);
        setTimeout(() => c.remove(), 3000);
    }
});

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        context.fill();
        if (Math.random() > 0.98) star.opacity = Math.random();
    });
}

function drawFloatingHearts() {
    if (frameNumber % 20 === 0) hearts.push(createHeart());
    
    hearts.forEach((h, index) => {
        h.y -= h.speed;
        context.font = h.size + "px serif";
        context.fillStyle = `rgba(255, 105, 180, ${h.opacity})`;
        context.fillText("❤️", h.x, h.y);
        if (h.y < -20) hearts.splice(index, 1);
    });
}

function drawText() {
    var fontSize = Math.min(26, window.innerWidth / 22);
    context.font = fontSize + "px 'Comic Sans MS', cursive";
    context.textAlign = "center";
    context.shadowBlur = 15;
    context.shadowColor = "rgba(0, 100, 255, 0.5)";

    if(frameNumber < 300) {
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("poritidin ami believe korte pari na je how lucky I am", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    } else if(frameNumber < 600) {
        opacity -= 0.01;
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("poritidin ami believe korte pari na je how lucky I am", canvas.width/2, canvas.height/2);
    }

    if(frameNumber > 650) {
        context.fillStyle = `rgba(255, 182, 193, ${secondOpacity})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", canvas.width/2, canvas.height/2 - 40);
        if(secondOpacity < 1) secondOpacity += 0.01;
    }

    if(frameNumber > 950) {
        context.fillStyle = `rgba(255, 255, 255, ${thirdOpacity})`;
        context.fillText("I hope we can stay together forever :333 🌸", canvas.width/2, canvas.height/2 + 20);
        if(thirdOpacity < 1) thirdOpacity += 0.01;
    }

    if(frameNumber > 1250) {
        context.fillStyle = "#ff4d6d";
        context.font = "bold " + (fontSize + 5) + "px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", canvas.width/2, canvas.height/2 + 110);
        buttonContainer.style.display = "flex";
        kitty.style.display = "block";
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    if(frameNumber > 1000) drawFloatingHearts(); // Hearts start appearing later
    drawText();
    frameNumber++;
    requestAnimationFrame(draw);
}

draw();

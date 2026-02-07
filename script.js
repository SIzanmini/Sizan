var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var starArray = [];
var petals = []; // For falling petals
var kittyImg = new Image();
kittyImg.src = "https://i.pinimg.com/originals/e3/3e/3a/e33e3a8904e5482613b9f36f9202a00c.png"; // Hello Kitty link

// Initialize Stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random()
    });
}

// Initialize Petals
for (var i = 0; i < 30; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 2 + 1,
        angle: Math.random() * 360
    });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

function drawStars() {
    starArray.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        context.fill();
        if (Math.random() > 0.98) star.opacity = Math.random();
    });
}

function drawPetals() {
    context.fillStyle = "rgba(255, 182, 193, 0.8)"; // Pinkish petals
    petals.forEach(p => {
        context.beginPath();
        context.ellipse(p.x, p.y, p.size, p.size / 2, p.angle, 0, Math.PI * 2);
        context.fill();
        p.y += p.speed;
        p.angle += 0.02;
        if (p.y > canvas.height) p.y = -10;
    });
}

function drawHelloKitty() {
    // Draws Kitty at the bottom right corner
    context.drawImage(kittyImg, canvas.width - 120, canvas.height - 120, 100, 100);
}

function drawText() {
    var fontSize = Math.min(28, window.innerWidth / 25);
    context.font = fontSize + "px 'Comic Sans MS', cursive";
    context.textAlign = "center";
    context.shadowBlur = 10;
    context.shadowColor = "#ffb6c1";

    // Sequence 1: The New Lines (Trillions of stars...)
    if (frameNumber > 50 && frameNumber < 450) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("amongst trillions and trillions of stars,", canvas.width / 2, canvas.height / 2 - 20);
        context.fillText("over billions of years...", canvas.width / 2, canvas.height / 2 + 20);
        if (frameNumber < 250) opacity += 0.01; else opacity -= 0.01;
    }

    if (frameNumber == 450) opacity = 0;

    // Sequence 2: Time Spend Line
    if (frameNumber > 450 && frameNumber < 850) {
        context.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e.", canvas.width / 2, canvas.height / 2);
        if (frameNumber < 650) opacity += 0.01; else opacity -= 0.01;
    }

    if (frameNumber == 850) opacity = 0;

    // Final Setup: Love & Question
    if (frameNumber > 850) {
        context.fillStyle = `rgba(255, 182, 193, ${opacity})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", canvas.width / 2, canvas.height / 2 - 50);
        if (opacity < 1) opacity += 0.01;
    }

    if (frameNumber > 1000) {
        context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
        context.fillText("I hope we can stay together forever :333 🌸", canvas.width / 2, canvas.height / 2);
        if (secondOpacity < 1) secondOpacity += 0.01;
    }

    if (frameNumber > 1200) {
        context.font = "bold " + (fontSize + 10) + "px 'Comic Sans MS'";
        context.fillStyle = `rgba(255, 77, 109, ${thirdOpacity})`;
        context.fillText("Will u be my Valentine? 💖", canvas.width / 2, canvas.height / 2 + 80);
        if (thirdOpacity < 1) thirdOpacity += 0.01;
        document.getElementById("buttonContainer").style.display = "flex";
    }
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height); // Clear frame
    drawStars();
    drawPetals();
    drawHelloKitty();
    drawText();
    frameNumber++;
    requestAnimationFrame(draw);
}

// Button Handling
document.getElementById("yesButton").addEventListener("click", () => {
    alert("YAY! I'm the luckiest person in the world! ❤️✨");
});

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

draw();

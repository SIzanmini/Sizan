var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = 500;
var starArray = [];
var petalArray = [];
var kittyImg = new Image();
kittyImg.src = "https://i.postimg.cc/8P9Xm8Z2/hello-kitty.png"; // Direct working link

// Star initialization
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random(),
        blinkSpeed: Math.random() * 0.02
    });
}

// Petal initialization
for (var i = 0; i < 40; i++) {
    petalArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 1.5 + 0.5,
        swing: Math.random() * 2
    });
}

var frameNumber = 0;
var opacity = 0;

function draw() {
    // Clear canvas every frame
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blinkSpeed;
        if (s.opacity > 1 || s.opacity < 0) s.blinkSpeed = -s.blinkSpeed;
    });

    // 2. Draw Falling Petals (Gulaap er papri)
    context.fillStyle = "#ffb6c1";
    petalArray.forEach(p => {
        context.beginPath();
        context.arc(p.x + Math.sin(frameNumber/20) * p.swing, p.y, p.size, 0, Math.PI * 2);
        context.fill();
        p.y += p.speed;
        if (p.y > canvas.height) p.y = -10;
    });

    // 3. Draw Hello Kitty
    if (kittyImg.complete) {
        context.drawImage(kittyImg, canvas.width - 120, canvas.height - 120, 100, 100);
    }

    // 4. Draw Text Logic
    var fontSize = Math.min(26, window.innerWidth / 22);
    context.font = fontSize + "px 'Comic Sans MS'";
    context.textAlign = "center";
    context.fillStyle = "white";

    if (frameNumber < 300) {
        // Line 1
        drawFadingText("amongst trillions and trillions of stars,", canvas.width/2, canvas.height/2, 300);
    } else if (frameNumber < 600) {
        // Line 2
        drawFadingText("over billions of years beche asi jate", canvas.width/2, canvas.height/2, 600);
    } else if (frameNumber < 900) {
        // Line 3
        drawFadingText("tmr sathe time spend korte parbo ei life e.", canvas.width/2, canvas.height/2, 900);
    } else {
        // Final Message
        context.fillStyle = "#ff85a1";
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", canvas.width/2, canvas.height/2 - 40);
        context.fillStyle = "white";
        context.fillText("I hope we can stay together forever :333 🌸", canvas.width/2, canvas.height/2 + 10);
        
        context.fillStyle = "#ff4d6d";
        context.font = "bold " + (fontSize + 5) + "px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", canvas.width/2, canvas.height/2 + 80);
        
        document.getElementById("buttonContainer").style.display = "flex";
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

function drawFadingText(txt, x, y, endFrame) {
    let localFrame = frameNumber % 300;
    let alpha = localFrame < 150 ? localFrame / 150 : (300 - localFrame) / 150;
    context.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    context.fillText(txt, x, y);
}

// Button Hover Logic (No button runs away)
const noBtn = document.getElementById("noButton");
if(noBtn) {
    noBtn.addEventListener("mouseover", () => {
        noBtn.style.position = "absolute";
        noBtn.style.left = Math.random() * (window.innerWidth - 100) + "px";
        noBtn.style.top = Math.random() * (window.innerHeight - 50) + "px";
    });
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

draw();

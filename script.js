var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
var btnContainer = document.getElementById("buttonContainer");
var startOverlay = document.getElementById("startOverlay");
var startButton = document.getElementById("startButton");

var isStarted = false;
var frameNumber = 0;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

// Start Button Click
startButton.addEventListener("click", () => {
    startOverlay.style.display = "none";
    isStarted = true;
    frameNumber = 0; // Reset frames
    draw(); 
});

var stars = 500;
var starArray = [];
var petals = [];

// Initialize Stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.015
    });
}

// Initialize Falling Petals
for (var i = 0; i < 35; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 0.8 + 0.4,
        drift: Math.random() * 1 - 0.5,
        angle: Math.random() * Math.PI
    });
}

function drawPetal(x, y, size, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle + frameNumber * 0.01);
    context.fillStyle = "#ffb6c1";
    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(-size, -size, -size, size, 0, size);
    context.bezierCurveTo(size, size, size, -size, 0, 0);
    context.fill();
    context.restore();
}

function draw() {
    if (!isStarted) return;

    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size, p.angle);
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) p.y = -20;
    });

    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(26, window.innerWidth / 22) + "px 'Comic Sans MS'";

    // Text Sequence
    if (frameNumber < 600) {
        let alpha = Math.min(frameNumber / 200, (600 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("everyday I cannot believe how lucky I am", x, y);
    } 
    else if (frameNumber < 1200) {
        let alpha = Math.min((frameNumber - 600) / 200, (1200 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("amongst trillions and trillions of stars, over billions of years", x, y);
    } 
    else if (frameNumber < 1800) {
        let alpha = Math.min((frameNumber - 1200) / 200, (1800 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e.", x, y);
    } 
    else {
        let fAlpha = Math.min((frameNumber - 1800) / 200, 1);
        context.fillStyle = `rgba(255, 133, 161, ${fAlpha})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 60);
        
        if (frameNumber > 2000) {
            let a2 = Math.min((frameNumber - 2000) / 200, 1);
            context.fillStyle = `rgba(255, 255, 255, ${a2})`;
            context.fillText("I hope we can stay together forever :333 🌸", x, y - 10);
        }
        
        if (frameNumber > 2200) {
            let a3 = Math.min((frameNumber - 2200) / 200, 1);
            context.fillStyle = `rgba(255, 77, 109, ${a3})`;
            context.font = "bold 32px 'Comic Sans MS'";
            context.fillText("Will u be my Valentine? 💖", x, y + 70);
            
            btnContainer.style.display = "flex";
            btnContainer.style.opacity = a3;
        }
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// "No" Button Runaway and Reset Logic
const noBtn = document.getElementById("noButton");
if (noBtn) {
    const moveAndReset = (e) => {
        e.preventDefault();
        // Move button
        const padding = 100;
        const randomX = Math.random() * (window.innerWidth - padding * 2) + padding;
        const randomY = Math.random() * (window.innerHeight - padding * 2) + padding;
        noBtn.style.position = "absolute";
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";

        // Secret Reset: "No" এ ক্লিক করলে আবার শুরুতে নিয়ে যাবে
        if(e.type === "click") {
            isStarted = false;
            btnContainer.style.display = "none";
            startOverlay.style.display = "block";
            frameNumber = 0;
        }
    };

    noBtn.addEventListener("mouseover", moveAndReset);
    noBtn.addEventListener("click", moveAndReset);
}

// "Yes" Button Alert
document.getElementById("yesButton").addEventListener("click", () => {
    alert("YAY! I'm the luckiest person in the world! ❤️✨");
});

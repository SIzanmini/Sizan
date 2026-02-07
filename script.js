var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
var btnContainer = document.getElementById("buttonContainer");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

var stars = 500;
var starArray = [];
var petals = [];

// Stars logic
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.015
    });
}

// Petals initialization (Flower shape)
for (var i = 0; i < 35; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 0.8 + 0.4, // Slow and steady fall
        drift: Math.random() * 1 - 0.5,
        angle: Math.random() * Math.PI
    });
}

var frameNumber = 0;

// Function to draw petal shape instead of circles
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
    // Force clear every frame to fix text overlapping
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // Draw Falling Flowers/Petals
    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size, p.angle);
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) p.y = -20;
    });

    // Text Display Logic (Sequential & Smooth)
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(26, window.innerWidth / 22) + "px 'Comic Sans MS'";

    // Sequence (600 frames = ~10 seconds per line)
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
        // Final screen stays until the end
        let fAlpha = Math.min((frameNumber - 1800) / 200, 1);
        
        context.fillStyle = `rgba(255, 133, 161, ${fAlpha})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 60);
        
        if (frameNumber > 2000) {
            let a2 = Math.min((frameNumber - 2000) / 200, 1);

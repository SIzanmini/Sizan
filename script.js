var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");
var btnContainer = document.getElementById("buttonContainer");

// ইমেজ ডিলিট করে দিয়েছি, তাই ওই আইডি আর লাগবে না
var kitty = document.getElementById("kitty");
if(kitty) kitty.style.display = "none"; 

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

var stars = 500;
var starArray = [];
var petals = [];

// Initialize stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.015
    });
}

// Initialize petals (Flowers)
for (var i = 0; i < 35; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 1 - 0.5,
        angle: Math.random() * Math.PI
    });
}

var frameNumber = 0;

// Function to draw petal shape (গোল নয়, পাপড়ির মতো)
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
    // Canvas clear প্রতি ফ্রেমে
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // 2. Draw Petals
    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size, p.angle);
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) p.y = -20;
    });

    // 3. Sequential Text Logic (একটার পর একটা আসবে)
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(26, window.innerWidth / 22) + "px 'Comic Sans MS'";

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
        // Final Screen
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
            
            // Show Buttons
            btnContainer.style.display = "flex";
            btnContainer.style.opacity = a3;
        }
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// No button behavior (মাউস নিলে পালাবে)
const noBtn = document.getElementById("noButton");
noBtn.onmouseover = function() {
    this.style.position = "absolute";
    this.style.left = Math.random() * (window.innerWidth - 120) + "px";
    this.style.top = Math.random() * (window.innerHeight - 60) + "px";
};

draw();

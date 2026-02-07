var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = 500;
var starArray = [];
var petals = [];
var kittyImg = new Image();
// Directly using a reliable Hello Kitty link
kittyImg.src = "https://i.postimg.cc/8P9Xm8Z2/hello-kitty.png"; 

// Initialize stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.01
    });
}

// Initialize petals (Using a bit more counts for better look)
for (var i = 0; i < 40; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 4,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 1 - 0.5,
        angle: Math.random() * Math.PI * 2
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
    // 1. Force clear background to prevent overlapping text
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if(s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // 3. Petals
    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size, p.angle);
        p.y += p.speed;
        p.x += p.drift;
        if(p.y > canvas.height) p.y = -20;
    });

    // 4. Hello Kitty (Bottom Left)
    if (kittyImg.complete) {
        context.drawImage(kittyImg, 40, canvas.height - 140, 100, 100);
    }

    // 5. Text Logic (Strictly Sequential)
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(26, window.innerWidth / 24) + "px 'Comic Sans MS'";

    // Time slots (Each line gets 800 frames ~ 13 seconds)
    if (frameNumber < 800) {
        let alpha = Math.min(frameNumber / 200, (800 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("everyday I cannot believe how lucky I am", x, y);
    } 
    else if (frameNumber < 1600) {
        let alpha = Math.min((frameNumber - 800) / 200, (1600 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("amongst trillions and trillions of stars, over billions of years", x, y);
    } 
    else if (frameNumber < 2400) {
        let alpha = Math.min((frameNumber - 1600) / 200, (2400 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e.", x, y);
    } 
    else {
        // Final Message - Static
        let fAlpha = Math.min((frameNumber - 2400) / 200, 1);
        
        context.fillStyle = `rgba(255, 133, 161, ${fAlpha})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 50);
        
        context.fillStyle = `rgba(255, 255, 255, ${fAlpha})`;
        context.fillText("I hope we can stay together forever :333 🌸", x, y);
        
        context.fillStyle = `rgba(255, 77, 109, ${fAlpha})`;
        context.font = "bold 32px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", x, y + 80);

        // Show buttons at the very end
        const btnContainer = document.getElementById("buttonContainer");
        if(btnContainer) {
            btnContainer.style.display = "flex";
            btnContainer.style.opacity = fAlpha;
        }
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// Button Hover Logic
const noBtn = document.getElementById("noButton");
if (noBtn) {
    noBtn.onmouseover = function() {
        this.style.position = "absolute";
        this.style.left = Math.random() * (window.innerWidth - 120) + "px";
        this.style.top = Math.random() * (window.innerHeight - 60) + "px";
    };
}

draw();

var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];
var petalArray = [];
var kittyImg = new Image();
// Working Hello Kitty link
kittyImg.src = "https://i.postimg.cc/8P9Xm8Z2/hello-kitty.png"; 

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Init stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        hue: colorrange[getRandom(0, colorrange.length - 1)],
        sat: getRandom(50, 100),
        opacity: Math.random(),
        blink: Math.random() * 0.01
    });
}

// Init petals (Gula)
for (var i = 0; i < 25; i++) {
    petalArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 1 + 0.5, // Shlower fall
        drift: Math.random() * 1 - 0.5
    });
}

var frameNumber = 0;
var opacity = 0;

function draw() {
    // Background clear (Black space)
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Stars logic
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `hsla(${s.hue}, ${s.sat}%, 88%, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if(s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // 2. Falling Petals logic
    context.fillStyle = "#ffb6c1";
    petalArray.forEach(p => {
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
        p.y += p.speed;
        p.x += p.drift;
        if(p.y > canvas.height) p.y = -10;
    });

    // 3. Hello Kitty (Bottom left)
    if (kittyImg.complete) {
        context.drawImage(kittyImg, 20, canvas.height - 110, 90, 90);
    }

    // 4. Text Animation Logic (Slowed down by increasing frame ranges)
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(28, window.innerWidth / 22) + "px 'Comic Sans MS'";

    // Line 1: 0 to 600 (Much slower)
    if (frameNumber < 600) {
        let alpha = frameNumber < 300 ? frameNumber / 300 : (600 - frameNumber) / 300;
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("everyday I cannot believe how lucky I am", x, y);
    } 
    // Line 2: 600 to 1200
    else if (frameNumber < 1200) {
        let alpha = (frameNumber - 600) < 300 ? (frameNumber - 600) / 300 : (1200 - frameNumber) / 300;
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("amongst trillions and trillions of stars, over billions of years", x, y);
    }
    // Line 3: 1200 to 1800
    else if (frameNumber < 1800) {
        let alpha = (frameNumber - 1200) < 300 ? (frameNumber - 1200) / 300 : (1800 - frameNumber) / 300;
        context.fillStyle = `rgba(173, 216, 230, ${alpha})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e.", x, y);
    }
    // Final Scene: Stay on screen
    else {
        let finalAlpha = Math.min((frameNumber - 1800) / 300, 1);
        
        context.fillStyle = `rgba(255, 133, 161, ${finalAlpha})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 40);
        
        context.fillStyle = `rgba(255, 255, 255, ${finalAlpha})`;
        context.fillText("I hope we can stay together forever :333 🌸", x, y + 10);
        
        context.fillStyle = `rgba(255, 77, 109, ${finalAlpha})`;
        context.font = "bold 32px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", x, y + 90);
        
        // Button container show
        const btn = document.getElementById("buttonContainer") || document.getElementById("valentinesButton");
        if(btn) btn.style.display = "flex";
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

draw();

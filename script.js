var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

var stars = 500;
var starArray = [];
var petals = [];
var kittyImg = new Image();
// Tested stable Hello Kitty link
kittyImg.src = "https://i.postimg.cc/8P9Xm8Z2/hello-kitty.png"; 

// Initialize stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        speed: Math.random() * 0.01
    });
}

// Initialize petals (Flowers)
for (var i = 0; i < 25; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 3,
        speed: Math.random() * 0.8 + 0.3,
        drift: Math.random() * 1 - 0.5
    });
}

var frameNumber = 0;

function draw() {
    // Clear the canvas every frame to prevent overlapping
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, " + s.opacity + ")";
        context.fill();
        s.opacity += s.speed;
        if (s.opacity > 1 || s.opacity < 0) s.speed = -s.speed;
    });

    // Draw Petals
    context.fillStyle = "#ffb6c1";
    petals.forEach(p => {
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) p.y = -10;
    });

    // Draw Hello Kitty (Bottom Left)
    if (kittyImg.complete) {
        context.drawImage(kittyImg, 30, canvas.height - 120, 90, 90);
    }

    // Text Animation Logic (Slow & Smooth)
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = Math.min(26, window.innerWidth / 24) + "px 'Comic Sans MS'";

    // Timing Control (Slower transitions)
    if (frameNumber < 600) {
        let alpha = Math.min(frameNumber / 200, (600 - frameNumber) / 200);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("everyday I cannot believe how lucky I am", x, y);
    } 
    else if (frameNumber < 1200) {
        let alpha = Math.min((frameNumber - 600) / 200, (1200 - frameNumber) / 200);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("amongst trillions and trillions of stars, over billions of years", x, y);
    } 
    else if (frameNumber < 1800) {
        let alpha = Math.min((frameNumber - 1200) / 200, (1800 - frameNumber) / 200);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e.", x, y);
    } 
    else {
        // Final screen: Shows everything and keeps it there
        let finalAlpha = Math.min((frameNumber - 1800) / 200, 1);
        
        context.fillStyle = "rgba(255, 133, 161, " + finalAlpha + ")";
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 50);
        
        context.fillStyle = "rgba(255, 255, 255, " + finalAlpha + ")";
        context.fillText("I hope we can stay together forever :333 🌸", x, y);
        
        context.fillStyle = "rgba(255, 77, 109, " + finalAlpha + ")";
        context.font = "bold 32px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", x, y + 80);

        // Make buttons visible
        const btnContainer = document.getElementById("buttonContainer");
        if(btnContainer) {
            btnContainer.style.display = "flex";
            btnContainer.style.opacity = finalAlpha;
        }
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// "No" button logic (It will run away)
const noBtn = document.getElementById("noButton");
if (noBtn) {
    noBtn.addEventListener("mouseover", function() {
        this.style.position = "absolute";
        this.style.left = Math.random() * (window.innerWidth - 120) + "px";
        this.style.top = Math.random() * (window.innerHeight - 60) + "px";
    });
}

// "Yes" button logic
const yesBtn = document.getElementById("yesButton");
if (yesBtn) {
    yesBtn.addEventListener("click", () => {
        alert("YAY! I'm the luckiest person in the world! ❤️✨");
    });
}

draw();

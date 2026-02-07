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
kittyImg.src = "https://i.ibb.co/Y7y7Y8p/hello-kitty.png"; // Direct fallback link

// Init Stars
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        factor: Math.random() > 0.5 ? 1 : -1
    });
}

// Init Petals (Full gula portese)
for (var i = 0; i < 30; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 2 + 1,
        velX: Math.random() * 1 - 0.5
    });
}

var frameNumber = 0;

function draw() {
    // Background clear kora jate text gola overlap na hoy
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Stars Draw & Twinkle
    starArray.forEach(s => {
        s.opacity += 0.01 * s.factor;
        if (s.opacity > 1 || s.opacity < 0) s.factor *= -1;
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(255, 255, 255, " + s.opacity + ")";
        context.fill();
    });

    // Petals (Flowers) falling logic
    context.fillStyle = "#ffb6c1"; 
    petals.forEach(p => {
        p.y += p.speed;
        p.x += p.velX;
        if (p.y > canvas.height) p.y = -10;
        context.beginPath();
        context.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        context.fill();
    });

    // Hello Kitty Draw (Bottom Left/Right)
    if (kittyImg.complete) {
        context.drawImage(kittyImg, 20, canvas.height - 120, 100, 100);
    }

    // Text Logic
    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    context.font = "24px 'Comic Sans MS'";

    if (frameNumber < 400) {
        // Line 1: Fading In & Out
        var alpha = Math.min(frameNumber / 100, (400 - frameNumber) / 100);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("amongst trillions and trillions of stars,", x, y);
    } 
    else if (frameNumber < 800) {
        // Line 2: Fading In & Out
        var alpha = Math.min((frameNumber - 400) / 100, (800 - frameNumber) / 100);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("over billions of years beche asi jate", x, y);
    } 
    else if (frameNumber < 1200) {
        // Line 3: Fading In & Out
        var alpha = Math.min((frameNumber - 800) / 100, (1200 - frameNumber) / 100);
        context.fillStyle = "rgba(173, 216, 230, " + alpha + ")";
        context.fillText("tmr sathe time spend korte parbo ei life e.", x, y);
    } 
    else {
        // Final Show: Question & Buttons
        context.fillStyle = "#ff85a1";
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 40);
        context.fillStyle = "white";
        context.fillText("I hope we can stay together forever :333 🌸", x, y + 10);
        
        context.fillStyle = "#ff4d6d";
        context.font = "bold 30px 'Comic Sans MS'";
        context.fillText("Will u be my Valentine? 💖", x, y + 80);
        
        document.getElementById("buttonContainer").style.display = "flex";
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// Button Hover (No run away)
document.getElementById("noButton").addEventListener("mouseover", function() {
    this.style.position = "absolute";
    this.style.left = Math.random() * (window.innerWidth - 100) + "px";
    this.style.top = Math.random() * (window.innerHeight - 50) + "px";
});

document.getElementById("yesButton").addEventListener("click", () => {
    alert("YAY! I'm the luckiest person in the world! ❤️✨");
});

draw();

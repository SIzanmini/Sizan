var canvas = document.getElementById("starfield");
var context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = 500;
var starArray = [];
var petals = [];
var kittyImg = new Image();

// Use this reliable URL for Hello Kitty
kittyImg.src = "https://i.postimg.cc/8P9Xm8Z2/hello-kitty.png"; 

// Star Initialization
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.01
    });
}

// Falling Petals Initialization
for (var i = 0; i < 30; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 7 + 5,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() * 1 - 0.5
    });
}

var frameNumber = 0;

function drawPetal(x, y, size) {
    // Making it look like a petal instead of a circle
    context.save();
    context.translate(x, y);
    context.rotate(frameNumber * 0.02);
    context.fillStyle = "#ffb6c1";
    context.beginPath();
    context.moveTo(0, 0);
    context.bezierCurveTo(-size, -size, -size, size/2, 0, size);
    context.bezierCurveTo(size, size/2, size, -size, 0, 0);
    context.fill();
    context.restore();
}

function draw() {
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Stars
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if(s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // 2. Flowers/Petals
    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size);
        p.y += p.speed;
        p.x += p.drift;
        if(p.y > canvas.height) p.y = -20;
    });

    // 3. Hello Kitty Image
    if (kittyImg.complete) {
        context.drawImage(kittyImg, 30, canvas.height - 130, 100, 100);
    }

    // 4. Text Logic - One by one
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
        // Final Message - Everything appears now
        let finalAlpha = Math.min((frameNumber - 1800) / 200, 1);
        
        context.fillStyle = `rgba(255, 133, 161, ${finalAlpha})`;
        context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", x, y - 50);
        
        if (frameNumber > 2000) {
            let a2 = Math.min((frameNumber - 2000) / 200, 1);
            context.fillStyle = `rgba(255, 255, 255, ${a2})`;
            context.fillText("I hope we can stay together forever :333 🌸", x, y);
        }
        
        if (frameNumber > 2200) {
            let a3 = Math.min((frameNumber - 2200) / 200, 1);
            context.fillStyle = `rgba(255, 77, 109, ${a3})`;
            context.font = "bold 32px 'Comic Sans MS'";
            context.fillText("Will u be my Valentine? 💖", x, y + 80);
            
            // Show buttons
            const btn = document.getElementById("buttonContainer");
            if(btn) { 
                btn.style.display = "flex";
                btn.style.opacity = a3;
            }
        }
    }

    frameNumber++;
    requestAnimationFrame(draw);
}

// "No" button escaping
document.getElementById("noButton").onmouseover = function() {
    this.style.position = "absolute";
    this.style.left = Math.random() * (window.innerWidth - 100) + "px";
    this.style.top = Math.random() * (window.innerHeight - 50) + "px";
};

draw();

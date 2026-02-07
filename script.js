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

// স্টার্ট বাটনে ক্লিক করলে এনিমেশন শুরু হবে
startButton.addEventListener("click", function() {
    startOverlay.style.display = "none";
    isStarted = true;
    frameNumber = 0;
    animate(); 
});

var stars = 500;
var starArray = [];
var petals = [];

// স্টারস ইনিশিয়ালাইজেশন
for (var i = 0; i < stars; i++) {
    starArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.2,
        opacity: Math.random(),
        blink: Math.random() * 0.015
    });
}

// পাপড়ি (Flowers) ইনিশিয়ালাইজেশন
for (var i = 0; i < 40; i++) {
    petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 5,
        speed: Math.random() * 0.8 + 0.5,
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

function animate() {
    if (!isStarted) return;

    // ক্লিয়ার স্ক্রিন
    context.fillStyle = "#0b0d17";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // ড্রয়িং স্টারস
    starArray.forEach(s => {
        context.beginPath();
        context.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
        context.fill();
        s.opacity += s.blink;
        if (s.opacity > 1 || s.opacity < 0) s.blink = -s.blink;
    });

    // ড্রয়িং পাপড়ি
    petals.forEach(p => {
        drawPetal(p.x, p.y, p.size, p.angle);
        p.y += p.speed;
        p.x += p.drift;
        if (p.y > canvas.height) p.y = -20;
    });

    var x = canvas.width / 2;
    var y = canvas.height / 2;
    context.textAlign = "center";
    
    // টেক্সট সিকোয়েন্স লজিক (সব আপডেট করা হয়েছে)
    if (frameNumber < 600) {
        context.font = "bold " + Math.min(28, window.innerWidth / 20) + "px 'Comic Sans MS'";
        let alpha = Math.min(frameNumber / 200, (600 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${Math.max(0, alpha)})`;
        context.fillText("everyday I cannot believe how lucky I am.", x, y); 
    } 
    else if (frameNumber < 1200) {
        context.font = "bold " + Math.min(28, window.innerWidth / 20) + "px 'Comic Sans MS'";
        let alpha = Math.min((frameNumber - 600) / 200, (1200 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${Math.max(0, alpha)})`;
        context.fillText("amongst trillions and trillions of stars,", x, y - 20);
        context.fillText("over billions of years.", x, y + 30);
    } 
    else if (frameNumber < 1800) {
        context.font = "bold " + Math.min(28, window.innerWidth / 20) + "px 'Comic Sans MS'";
        let alpha = Math.min((frameNumber - 1200) / 200, (1800 - frameNumber) / 200);
        context.fillStyle = `rgba(173, 216, 230, ${Math.max(0, alpha)})`;
        context.fillText("so glad tmk paise ei universe babyy^^", x, y); 
    } 
    else {
        let fAlpha = Math.min((frameNumber - 1800) / 200, 1);
        
        // I love you lines
        context.font = "bold " + Math.min(28, window.innerWidth / 20) + "px 'Comic Sans MS'";
        context.fillStyle = `rgba(255, 133, 161, ${fAlpha})`;
        context.fillText("I love you so much Junie,", x, y - 80);
        context.fillText("more than anything in the world.", x, y - 30); 
        
        // Together forever line
        if (frameNumber > 2000) {
            let a2 = Math.min((frameNumber - 2000) / 200, 1);
            context.font = Math.min(22, window.innerWidth / 25) + "px 'Comic Sans MS'";
            context.fillStyle = `rgba(255, 255, 255, ${a2})`;
            context.fillText("I hope we can stay together forever princess ;33", x, y + 20);
        }
        
        // Valentine Question
        if (frameNumber > 2300) {
            let a3 = Math.min((frameNumber - 2300) / 200, 1);
            context.font = "bold " + Math.min(35, window.innerWidth / 15) + "px 'Comic Sans MS'";
            context.fillStyle = `rgba(255, 77, 109, ${a3})`;
            context.fillText("Will u be my Valentine? 💖", x, y + 100);
            
            btnContainer.style.display = "flex";
            btnContainer.style.opacity = a3;
        }
    }

    frameNumber++;
    requestAnimationFrame(animate);
}

// --- "NO" BUTTON RUNAWAY LOGIC ---
const noBtn = document.getElementById("noButton");
if (noBtn) {
    noBtn.addEventListener("mouseover", () => {
        const buttonWidth = noBtn.offsetWidth;
        const buttonHeight = noBtn.offsetHeight;
        const randomX = Math.floor(Math.random() * (window.innerWidth - buttonWidth));
        const randomY = Math.floor(Math.random() * (window.innerHeight - buttonHeight));
        
        noBtn.style.position = "fixed"; 
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
        noBtn.style.zIndex = "999";
    });
}

// "Yes" বাটনে সাকসেস মেসেজ
document.getElementById("yesButton").addEventListener("click", () => {
    alert("I knew it ❤️ Dont forget to tell me princess ;33 ❤️✨");
});

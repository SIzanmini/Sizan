var canvas = document.getElementById("starfield");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext("2d");
var stars = 500;
var colorrange = [0, 60, 240];
var starArray = [];

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

for (var i = 0; i < stars; i++) {
    var x = Math.random() * canvas.offsetWidth;
    var y = Math.random() * canvas.offsetHeight;
    var radius = Math.random() * 1.2;
    var hue = colorrange[getRandom(0, colorrange.length - 1)];
    var sat = getRandom(50, 100);
    var opacity = Math.random();
    starArray.push({ x, y, radius, hue, sat, opacity });
}

var frameNumber = 0;
var opacity = 0;
var secondOpacity = 0;
var thirdOpacity = 0;

var baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);

function drawStars() {
    for (var i = 0; i < stars; i++) {
        var star = starArray[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 360);
        context.fillStyle = "hsla(" + star.hue + ", " + star.sat + "%, 88%, " + star.opacity + ")";
        context.fill();
    }
}

function updateStars() {
    for (var i = 0; i < stars; i++) {
        if (Math.random() > 0.99) {
            starArray[i].opacity = Math.random();
        }
    }
}

// --- BUTTON LOGIC ---
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const buttonContainer = document.getElementById("buttonContainer");

if(yesButton) {
    yesButton.addEventListener("click", () => {
        alert("YAY! I'm the luckiest person in the world! ❤️✨");
    });
}

if(noButton) {
    noButton.addEventListener("mouseover", () => {
        const x = Math.random() * (window.innerWidth - 150);
        const y = Math.random() * (window.innerHeight - 100);
        noButton.style.position = "absolute";
        noButton.style.left = x + "px";
        noButton.style.top = y + "px";
    });
}

function drawTextWithLineBreaks(lines, x, y, fontSize, lineHeight) {
    lines.forEach((line, index) => {
        context.fillText(line, x, y + index * (fontSize + lineHeight));
    });
}

function drawText() {
    var fontSize = Math.min(30, window.innerWidth / 24); 
    var lineHeight = 8;

    context.font = fontSize + "px Comic Sans MS";
    context.textAlign = "center";
    context.shadowColor = "rgba(45, 45, 255, 1)";
    context.shadowBlur = 8;

    // Line 1: 0 to 500 frames
    if(frameNumber < 250){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("poritidin ami believe korte pari na je how lucky I am", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 250 && frameNumber < 500){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("poritidin ami believe korte pari na je how lucky I am", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 500) opacity = 0;

    // Line 2: 500 to 1000 frames
    if(frameNumber > 500 && frameNumber < 750){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years..."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years...", canvas.width/2, canvas.height/2);
        }
        opacity += 0.01;
    }
    if(frameNumber >= 750 && frameNumber < 1000){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["amongst trillions and trillions of stars,", "over billions of years..."], canvas.width / 2, canvas.height / 2, fontSize, lineHeight);
        } else {
            context.fillText("amongst trillions and trillions of stars, over billions of years...", canvas.width/2, canvas.height/2);
        }
        opacity -= 0.01;
    }

    if(frameNumber == 1000) opacity = 0;

    // Line 3: 1000 to 1500 frames
    if(frameNumber > 1000 && frameNumber < 1250){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e", canvas.width/2, canvas.height/2);
        opacity += 0.01;
    }
    if(frameNumber >= 1250 && frameNumber < 1500){
        context.fillStyle = `rgba(173, 216, 230, ${opacity})`;
        context.fillText("beche asi jate tmr sathe time spend korte parbo ei life e", canvas.width/2, canvas.height/2);
        opacity -= 0.01;
    }

    if(frameNumber == 1500) opacity = 0;

    // Line 4: Final Love Confession (Stay on screen)
    if(frameNumber > 1500){
        context.fillStyle = `rgba(255, 182, 193, ${opacity})`;
        if (window.innerWidth < 600) {
            drawTextWithLineBreaks(["I love you so much Junie, more than", "sobar theke besi valobasi!"], canvas.width / 2, canvas.height / 2 - 20, fontSize, lineHeight);
        } else {
            context.fillText("I love you so much Junie, more than sobar theke besi valobasi!", canvas.width/2, canvas.height/2 - 20);
        }
        if(opacity < 1) opacity += 0.01;
    }

    if(frameNumber >= 1800){
        context.fillStyle = `rgba(255, 255, 255, ${secondOpacity})`;
        context.fillText("I hope we can stay together forever :333", canvas.width/2, (canvas.height/2 + 40));
        if(secondOpacity < 1) secondOpacity += 0.01;
    }

   // Final Question and Buttons
    if(frameNumber >= 2100){
        context.fillStyle = `rgba(255, 77, 109, ${thirdOpacity})`;
        // Lekha-ta ektu upore rakhlam jate niche button-er jayga hoy
        context.fillText("Will u be my Valentine? 💖", canvas.width/2, (canvas.height/2 + 100));
        
        if(thirdOpacity < 1) thirdOpacity += 0.01;
        
        // Buttons show kora
        if(buttonContainer) buttonContainer.style.display = "flex";
    }

function draw() {
    context.putImageData(baseFrame, 0, 0);
    drawStars();
    updateStars();
    drawText();
    if (frameNumber < 99999) {
        frameNumber++;
    }
    window.requestAnimationFrame(draw);
}

window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    baseFrame = context.getImageData(0, 0, window.innerWidth, window.innerHeight);
});

window.requestAnimationFrame(draw);

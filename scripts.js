const svgNS = "http://www.w3.org/2000/svg";
let svg = document.createElementNS(svgNS, "svg");
svg.style.position = "absolute";
svg.style.top = "0";
svg.style.left = "0";
svg.style.width = "100%";
svg.style.height = "100%";
svg.style.pointerEvents = "none";
document.body.appendChild(svg);

let lastX = null;
let lastY = null;
let lastTime = Date.now();
let currentColor = "#ffde17"; 

function createLine(x, y) {
    const currentTime = Date.now();
    if (lastX !== null && lastY !== null) {
        const distance = Math.sqrt(Math.pow(x - lastX, 2) + Math.pow(y - lastY, 2));
        const timeDiff = currentTime - lastTime;
        const speed = distance / timeDiff;

        let line = document.createElementNS(svgNS, "line");
        line.setAttribute("x1", lastX);
        line.setAttribute("y1", lastY);
        line.setAttribute("x2", x);
        line.setAttribute("y2", y);

        const strokeWidth = Math.min(Math.max(5 / speed, 2), 10);
        line.setAttribute("stroke", currentColor); 
        line.setAttribute("stroke-width", strokeWidth);

        svg.appendChild(line);
    }
    lastX = x;
    lastY = y;
    lastTime = currentTime;
}

let scheduled = false;

function scheduleLineCreation(x, y) {
    if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(() => {
            createLine(x, y);
            scheduled = false;
        });
    }
}

document.addEventListener('mousemove', function(e) {
    scheduleLineCreation(e.clientX, e.clientY);
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    scheduleLineCreation(e.touches[0].clientX, e.touches[0].clientY);
});

document.addEventListener('click', function() {
    currentColor = getRandomColor();
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

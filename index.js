function init() {
    let canvas = document.querySelector("#chen");
    let ctx = canvas.getContext("2d");
    draw(ctx);
}
function draw(ctx) {
    requestAnimationFrame(function step() {
        drawDial(ctx);
        drawAllHands(ctx);
        requestAnimationFrame(step)
    })
}
function drawAllHands(ctx) {
    let time = new Date();
    let s = time.getSeconds();
    let m = time.getMinutes();
    let h = time.getHours();
    let pi = Math.PI;
    let sAngle = pi/180*(6*s);
    let mAngle = pi/180*(6*m);
    let hAngle = pi/180*(30*h);
    drawHand(hAngle, 60, 6, "black", ctx);
    drawHand(mAngle, 106, 4, "black", ctx);
    drawHand(sAngle, 129, 2, "grey", ctx);
}

function drawHand(angle,len,width,color,ctx) {
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,-len)
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.lineCap = "round";
    ctx.stroke();
    ctx.restore();
}

function drawDial(ctx) {
    let pi = Math.PI;
    ctx.clearRect(0,0,300,300);
    ctx.save();
    ctx.beginPath();
    ctx.translate(150,150);
    ctx.arc(0,0,148,0,pi/180*360);
    ctx.lineWidth = 4
    ctx.stroke();
    for(let i=0; i<60; i++){
        ctx.save()
        ctx.rotate(pi/180*(i*6));
        ctx.beginPath();
        ctx.moveTo(110,0);
        ctx.lineTo(140,0);
        ctx.strokeStyle = i % 5 ? "black":"red";
        ctx.lineWidth = i % 5 ? 2 : 4;
        ctx.stroke();
        ctx.restore();
    }
    let hour = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];
    hour.forEach(function (num,i) {
        var rad = Math.PI / 180 * (i*30);
        var x = Math.cos(rad) * (150 - 60);
        var y = Math.sin(rad) * (150 - 60);
        ctx.font = "18px sans-serif"
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(num, x, y);
    })
    ctx.restore();
}

init()
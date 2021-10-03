
const canv = document.getElementById("pong");

const colorControl = canv.getContext('2d');



const pongball = {
    x : canv.width/2,
    y : canv.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "RED"
}


const controlPaddle = {
    x : 0, 
    y : (canv.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "RED"
}


const computerPaddle = {
    x : canv.width - 10, 
    y : (canv.height - 100)/2, 
    width : 10,
    height : 100,
    score : 0,
    color : "RED"
}


const goal = {
    x : (canv.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "RED"
}


function rectancle(x, y, w, h, color){
    colorControl.fillStyle = color;
    colorControl.fillRect(x, y, w, h);
}

function circle(x, y, r, color){
    colorControl.fillStyle = color;
    colorControl.beginPath();
    colorControl.arc(x,y,r,0,Math.PI*2,true);
    colorControl.closePath();
    colorControl.fill();
}

canv.addEventListener("mousemove", getMousePosition);

function getMousePosition(evt){
    let rect = canv.getBoundingClientRect();
    
    controlPaddle.y = evt.clientY - rect.top - controlPaddle.height/2;
}

function resetPongBall(){
    pongball.x = canv.width/2;
    pongball.y = canv.height/2;
    pongball.velocityX = -pongball.velocityX;
    pongball.speed = 7;
}

function drawGoal(){
    for(let i = 0; i <= canv.height; i+=15){
        rectancle(goal.x, goal.y + i, goal.width, goal.height, goal.color);
    }
}

function text(text,x,y){
    colorControl.fillStyle = "#FFF";
    colorControl.font = "75px fantasy";
    colorControl.fillText(text, x, y);
}

function collide(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;
    
    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}


function update(){
    
    if( pongball.x - pongball.radius < 0 ){
        computerPaddle.score++;
        
        resetPongBall();
    }else if( pongball.x + pongball.radius > canv.width){
        controlPaddle.score++;
        
        resetPongBall();
    }
    
    pongball.x += pongball.velocityX;
    pongball.y += pongball.velocityY;
    
    computerPaddle.y += ((pongball.y - (computerPaddle.y + computerPaddle.height/2)))*0.1;
    
    if(pongball.y - pongball.radius < 0 || pongball.y + pongball.radius > canv.height){
        pongball.velocityY = -pongball.velocityY;
        
    }
    
    let person = (pongball.x + pongball.radius < canv.width/2) ? controlPaddle : computerPaddle;
    
    if(collide(pongball,person)){
        
        let collisionPt = (pongball.y - (person.y + person.height/2));

        collisionPt = collisionPt / (person.height/2);
        
        let angle = (Math.PI/4) * collisionPt;
        
        let movement = (pongball.x + pongball.radius < canv.width/2) ? 1 : -1;
        pongball.velocityX = movement * pongball.speed * Math.cos(angle);
        pongball.velocityY = pongball.speed * Math.sin(angle);
        
        pongball.speed += 0.1;
    }
}


function render(){
    
    rectancle(0, 0, canv.width, canv.height, "#000");
    
    text(controlPaddle.score,canv.width/4,canv.height/5);
    
    text(computerPaddle.score,3*canv.width/4,canv.height/5);
    
    drawGoal();
    
    rectancle(controlPaddle.x, controlPaddle.y, controlPaddle.width, controlPaddle.height, controlPaddle.color);
    
    rectancle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height, computerPaddle.color);
    
    circle(pongball.x, pongball.y, pongball.radius, pongball.color);
}
function game(){
    update();
    render();
}

let frames = 45;

let run = setInterval(game,1000/frames);

const canv = document.getElementById("pong");

const colorControl = canv.getContext('2d');





const controlPaddle = {
    x : 0, 
    y : (canv.height - 100)/2, 
    width : 10,
    height : 100,
   
    color : "RED"
}



const pongball = {
    x : canv.width/2,
    y : canv.height/2,
    radius : 16,
    velocityY : 8,
    velocityX : 8,
    
    speed : 11,
    color : "RED"
}



const goal = {
    x : (canv.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "RED"
}



const computerPaddle = {
    x : canv.width - 10, 
    y : (canv.height - 100)/2, 
    width : 10,
    height : 100,
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

function drawGoal(){
    for(let j = 0; j <= canv.height; j+=15){
        rectancle(goal.x, goal.y + j, goal.width, goal.height, goal.color);
    }
}


function resetPongBall(){
    pongball.x = canv.width/2;
    pongball.y = canv.height/2;
    pongball.velocityX = -pongball.velocityX;
    pongball.speed = 11;
}







function update(){
    
    if( pongball.x - pongball.radius < 0 ){
       
        
        resetPongBall();
    }else if( pongball.x + pongball.radius > canv.width){
        
        
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


function collide(c,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;
    
    c.top = c.y - c.radius;
    c.bottom = c.y + c.radius;
    c.left = c.x - c.radius;
    c.right = c.x + c.radius;
    
    return p.left < c.right && p.top < c.bottom && p.right > c.left && p.bottom > c.top;
}

function render(){
    
    rectancle(0, 0, canv.width, canv.height, "#000");
    
    drawGoal();
    
    rectancle(controlPaddle.x, controlPaddle.y, controlPaddle.width, controlPaddle.height, controlPaddle.color);
    
    rectancle(computerPaddle.x, computerPaddle.y, computerPaddle.width, computerPaddle.height, computerPaddle.color);
    
    circle(pongball.x, pongball.y, pongball.radius, pongball.color);
}

function game(){
    update();
    render();
}


let run = setInterval(game,1000/45);
let a;
let background = new Image()
background.src = 'images/background.webp'
let goodShip;
let badShips = [];
let laser;
let score = 0;
let lives = 5;
let heartImg = new Image()
let badLasers = []
let over;
let won;
let speed;
let heart;
let speedLaser = 0;
let speedImg;
let bunker1;
let bunker2;
let bunker1Life = 5;
let bunker2Life = 5;
let shieldPower; 
let bombPower; 
let shieldWall;
let shieldWallLives = 10;
let bombActive = false;
let bombImg;

function startAnimation(){
    animate()
    showPowerUp()
    document.getElementById("start").disabled = true;
}
function stopAnimation(){
    cancelAnimationFrame(a)
}

let gameOver = false;
function animate() {
    a = requestAnimationFrame(animate)
    if(!gameOver){
        drawBackground()
        checkCollision()
        drawText()
        drawSpeedLaser()
        moveShip()
        moveLaser()
        moveBadLaser()
       // moveSpeed()
       // moveHeartPower()
        drawGoodShip()
        drawSpeed()
        drawHeartPower()
        drawBadShip()
        drawLaser()
        drawHeart()
        drawBadLasers()
        drawBunker()
        drawBunkerProgress()
        drawShield()
        drawBomb()
        drawBigWall()
        moveBomb()
    }
    else{
        gOver();
    }

}

function initialize(){
    drawBackground()
    createStuff()
}

function drawBackground(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(background,0,0,1500,800)
}

function createStuff(){
    goodShip = createImage('/images/goodShip.png',20,250,0)
    for(k = 1; k <= 4; k++){
        for(i = 1; i <= 3; i++){
            badShips.push(createImage('/images/badShip.png',1000 + 100*i, -50 + k*150, 3,true))
        }
    }
    for(i = 1; i <= 5; i++){
        badLasers.push(createImage('/images/badLaser.png',1500 + (Math.random() * 700),150*i,6,true))
    }
    laser = createImage('/images/laser.png',100,250,10,false)
    over = createImage('/images/gameOver.jpg',0,0,0,true)
    won = createImage('/images/gameWon.jpg',0,0,0,true)
    speed = createImage('/images/speed.png',(Math.random() * 500) + 300,(Math.random() * 600) + 100,4,false)
    heart = createImage('/images/heart.png',(Math.random() * 500) + 300,(Math.random() * 600) + 100,5,false)
    speedImg = createImage('/images/speed.png',380,15,0,true)
    bunker1 = createImage('/images/brickWall.png',120,250,0,true)
    bunker2 = createImage('/images/brickWall.png',120,550,0,true)
    shieldPower = createImage('/images/shield.png',(Math.random() * 500) + 300,(Math.random() * 600) + 100,4,false)
    bombPower = createImage('/images/bomb.png',(Math.random() * 500) + 300,(Math.random() * 600) + 100,4,false)
    shieldWall = createImage('/images/bigWall.png',200,0,0,false)
    bombImg = createImage('/images/missile.png',100,250,10,false)
}

function drawBigWall(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(shieldWall.visible){
        ctx.drawImage(shieldWall,shieldWall.left,shieldWall.top,100,1000)
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.rect(shieldWall.left+10,shieldWall.top + 670,shieldWallLives * 8,10)
        ctx.fill()
        ctx.beginPath()
        ctx.lineWidth = '2'
        ctx.strokeStyle = 'white'
        ctx.rect(shieldWall.left+10,shieldWall.top + 670,80,10)
        ctx.stroke()
    }
}

function drawBunker(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(bunker1.visible){
        ctx.drawImage(bunker1,bunker1.left,bunker1.top,50,120)
    }
    if(bunker2.visible){
        ctx.drawImage(bunker2,bunker2.left,bunker2.top,50,120)
    }
}

function drawBunkerProgress(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(bunker1.visible){
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.rect(bunker1.left,bunker1.top + 130,bunker1Life * 10,10)
        ctx.fill()
        ctx.beginPath()
        ctx.lineWidth = '2'
        ctx.strokeStyle = 'white'
        ctx.rect(bunker1.left,bunker1.top + 130,50,10)
        ctx.stroke()
    }
    if(bunker2.visible){
        ctx.beginPath()
        ctx.fillStyle = 'green'
        ctx.rect(bunker2.left,bunker2.top + 130,bunker2Life * 10,10)
        ctx.fill()
        ctx.beginPath()
        ctx.lineWidth = '2'
        ctx.strokeStyle = 'white'
        ctx.rect(bunker2.left,bunker2.top + 130,50,10)
        ctx.stroke()
    }
}

function drawSpeedLaser(){
    if(speedLaser > 0){
        let ctx = document.getElementById("myCanvas").getContext("2d");
        ctx.fillText('Speed Laser: ',180,50,1000)
        for(i = 0; i < speedLaser; i++){
            ctx.drawImage(speedImg,speedImg.left + (50*i),speedImg.top,50,50)
        }
    }
}

function drawSpeed(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(speed.visible){
        ctx.drawImage(speed,speed.left,speed.top,50,50)
    }
}

function drawHeartPower(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(heart.visible){
        ctx.drawImage(heart,heart.left,heart.top,50,50)
    }
}

function drawShield(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(shieldPower.visible){
        ctx.drawImage(shieldPower,shieldPower.left,shieldPower.top,50,50)
    }
}

function drawBomb(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(bombPower.visible){
        ctx.drawImage(bombPower,bombPower.left,bombPower.top,50,50)
    }
}

function showPowerUp(choice){
    //Math.floor(Math.random() * 20000) + 5000
    if(choice == null){
    setTimeout(()=>{
            heart.visible = true
    },Math.floor(Math.random() * 10000) + 5000)
    setTimeout(()=>{
        speed.visible = true
    },Math.floor(Math.random() * 10000) + 5000)
    setTimeout(()=>{
        shieldPower.visible = true
    },Math.floor(Math.random() * 20000) + 10000)
    setTimeout(()=>{
        bombPower.visible = true
    },Math.floor(Math.random() * 20000) + 10000)
    }else if(choice == 'heart'){
        setTimeout(()=>{
            heart.visible = true
        },Math.floor(Math.random() * 10000) + 5000)
    }else if(choice == 'speed'){
        setTimeout(()=>{
            speed.visible = true
        },Math.floor(Math.random() * 10000) + 5000)
    }else if(choice == 'shield'){
        setTimeout(()=>{
            shieldPower.visible = true
        },Math.floor(Math.random() * 20000) + 5000)
    }else if(choice == 'bomb'){
        setTimeout(()=>{
            bombPower.visible = true
        },Math.floor(Math.random() * 20000) + 5000)
    }
}



function drawHeart(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    heartImg.src = '/images/' + lives + '.png'
    ctx.drawImage(heartImg,1250,-60,400,400)
}

function drawBadLasers(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    for(i = 0; i < badLasers.length; i++){
        ctx.drawImage(badLasers[i],badLasers[i].left,badLasers[i].top,50,10)
    }
}

function moveBadLaser(){
    for(i = 0; i < badLasers.length; i++){
        if(badLasers[i].left < -50){
            let ship = Math.floor(Math.random() * 11)
            while(!badShips[ship].visible){
                ship = Math.floor(Math.random() * 11)
            }
            badLasers[i].left = badShips[ship].left + 50
        }
    }
    for(i = 0; i < badLasers.length; i++){
        badLasers[i].left -= badLasers[i].velo
    }
}

function drawLaser(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(!bombActive){
        if(laser.visible){
            ctx.drawImage(laser,laser.left,laser.top + 25,100,50)
        }
        if(laser.left > 1500){
            speedLaser--;
            laser.visible = false
            laser.left = 100
        }
    }else{
        if(bombImg.visible){  
            ctx.drawImage(bombImg,bombImg.left,bombImg.top + 25,100,50)
        }
    }

}

function moveBomb(){
    if(bombImg.visible){
        bombImg.left += bombImg.velo
    }
}

function moveLaser(){
    if(laser.visible){
        if(speedLaser > 0){
            laser.left += 30
        }else{
            laser.left += laser.velo
        }
    }
}

function reset(){
    score = 0;
    speedLaser = 0;
    lives = 5;
    gameOver = false;
    badLasers = []
    badShips = []
    bunker1Life = 5;
    bunker2Life = 5;
    createStuff()
}


function drawGoodShip(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(goodShip,goodShip.left,goodShip.top,70,70)
}

function drawBadShip(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    for(i = 0; i < badShips.length; i++){
        if(badShips[i].visible){
            ctx.drawImage(badShips[i],badShips[i].left,badShips[i].top, 80,80)
        }
    }
}

function moveShip(){
    let maxTop = -20
    let maxBottom = 720
    let move = false
    if(!badShips[0].visible && !badShips[1].visible && !badShips[2].visible){
        maxTop = -120
    }

    if(badShips[0].top < maxTop || badShips[11].top > maxBottom){
            for(k = 0; k < badShips.length; k++){
                badShips[k].velo *= -1
                move = true
            }
    }
    for(i = 0; i < badShips.length; i++){
        badShips[i].top += badShips[i].velo
        if(move) badShips[i].left -= 10
    }
}

function drawText(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#fff"
    ctx.font = 'normal 30px Pixelify Sans';
    ctx.fillText('Score: ' + score,20,50,1000)
}


function checkCollision(){
    for(i = 0; i < badShips.length; i++){
        if(laser.left + 100 > badShips[i].left && laser.top > badShips[i].top - 25 && laser.top + 50 < badShips[i].top + 105 && badShips[i].visible){
            badShips[i].visible = false
            laser.visible = false
            laser.left = 100
            score++
            speedLaser--;
            if(score == 12){
                gameOver = true
            }
        }
        if(bombImg.left + 100 > badShips[i].left && bombImg.top > badShips[i].top - 25 && bombImg.top + 50 < badShips[i].top + 105 && badShips[i].visible && bombActive){
            badShips[i].visible = false
            badShips[i - 3].visible = false
            badShips[i + 3].visible = false
            bombActive = false
            bombImg.left = 100
            score += 3
            bombImg.visible = false
            if(score == 12){
                gameOver = true
            }
        }
    }
    for(i = 0; i < badLasers.length; i++){
        if(badLasers[i].left < goodShip.left + 70 && badLasers[i].top > goodShip.top && badLasers[i].top < goodShip.top + 70){
            lives--;
            let ship = Math.floor(Math.random() * 11)
            while(!badShips[ship].visible){
                ship = Math.floor(Math.random() * 11)
            }
            badLasers[i].left = badShips[ship].left + 50
            if(lives == 0){
                gameOver = true
            }
        }
        if(badLasers[i].left < 300 && shieldWall.visible){
            shieldWallLives--;
            let ship = Math.floor(Math.random() * 11)
            while(!badShips[ship].visible){
                ship = Math.floor(Math.random() * 11)
            }
            badLasers[i].left = badShips[ship].left + 50
            if(shieldWallLives == 0){
                shieldWall.visible = false
            }
        }
    }
    if(heart.left < laser.left + 70 && heart.top > laser.top - 20 && heart.top < laser.top + 70 && heart.visible){
        if(lives != 5){
            lives++
        }
        heart.visible = false
        showPowerUp('heart')
        laser.visible = false
        laser.left = 100
        speedLaser--;
    }
    if(speed.left < laser.left + 70 && speed.top > laser.top - 20 && speed.top < laser.top + 70 && speed.visible){
        speedLaser = 3;
        speed.visible = false
        showPowerUp('speed')
        laser.visible = false
        laser.left = 100
    }
    if(bombPower.left < laser.left + 70 && bombPower.top > laser.top - 20 && bombPower.top < laser.top + 70 && bombPower.visible){
        bombPower.visible = false
        showPowerUp('bomb')
        bombActive = true
        laser.visible = false
        laser.left = 100
        bombImg.visible = false
    }
    if(shieldPower.left < laser.left + 70 && shieldPower.top > laser.top - 20 && shieldPower.top < laser.top + 70 && shieldPower.visible){
        shieldPower.visible = false
        showPowerUp('shield')
        laser.visible = false
        laser.left = 100
        shieldWall.visible = true
        shieldWallLives = 10
    }
    for(i = 0; i < badLasers.length; i++){
        if(badLasers[i].left < bunker1.left + 50 && badLasers[i].top > bunker1.top && badLasers[i].top < bunker1.top + 120 && bunker1.visible){
            bunker1Life -= 1
            let ship = Math.floor(Math.random() * 11)
            while(!badShips[ship].visible){
                ship = Math.floor(Math.random() * 11)
            }
            badLasers[i].left = badShips[ship].left + 50
            if(bunker1Life == 0){
                bunker1.visible = false
            }
        }
    }
    for(i = 0; i < badLasers.length; i++){
        if(badLasers[i].left < bunker2.left + 50 && badLasers[i].top > bunker2.top && badLasers[i].top < bunker2.top + 120 && bunker2.visible){
            bunker2Life -= 1
            let ship = Math.floor(Math.random() * 11)
            while(!badShips[ship].visible){
                ship = Math.floor(Math.random() * 11)
            }
            badLasers[i].left = badShips[ship].left + 50
            if(bunker2Life == 0){
                bunker2.visible = false
            }
        }
    }
}


function gOver(){
    let ctx = document.getElementById("myCanvas").getContext("2d");
    if(lives == 0){
        ctx.drawImage(over, over.left, over.top, 1500, 800)
    }else if(gameOver){
        ctx.drawImage(won, won.left, won.top, 1500, 800)
    }
}


let createImage = function(src, xcoord, ycoord, velo, vis){
    let img = new Image()
    img.src = src;
    img.left = xcoord;
    img.top = ycoord;
    img.velo = velo;
    img.visible = vis;

    return img;
}



$(document).keydown((event) => {  //jQuery code to recognize a keydown event
    let keycode = (event.keyCode ? event.keyCode : event.which);

    if(keycode == 87){
        if(goodShip.top > -0){
            goodShip.top -= 7
        }
    }

    if(keycode == 83){
        if(goodShip.top < 730){
            goodShip.top += 7
        }
    }

    if(keycode == 32 && !laser.visible){ //spacebar
        if(!bombActive){
            laser.visible = true
            laser.top = goodShip.top
        }else{
        bombImg.top = goodShip.top
        bombImg.visible = true
        }

    }

});
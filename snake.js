
let loop;
let losed= false;
let coordinate = [];
let fullSnake= [];
let score=0;
var speed = 20;
let snakeFood;
let snakeHead;
let direction = "right";
let border= document.getElementById("border");
let changedSpeed = false;
let delay = 300;
let foodOnSnake=false;
function play() {
    snakeHead=document.createElement('div');
    snakeHead.classList.add("tail");
    snakeHead.style.left=border.offsetLeft+ 100+ "px";
    snakeHead.style.top=border.offsetTop + 100 + 'px';
    document.body.appendChild(snakeHead);
    saveCoordinates();
    createTail();
    randmoFood();
    giveDirections();
    loop = setInterval(move, delay);
    let startButton = document.getElementById("start");
    startButton.remove();
    console.log(snakeHead.offsetTop);
}
function saveCoordinates(){

    let coordinates = [snakeHead.offsetLeft, snakeHead.offsetTop];
    coordinate[0]=coordinates;
    fullSnake[0] = snakeHead;
}

function createTail() {
    for (let i = 0; i < 5; i++) {
        addTail(i);
    }
}
function addTail(i)
{
    let tailObject = document.createElement('div');
    tailObject.classList.add("tail");
    let tailX = coordinate[i][0] - 20;
    let tailY = coordinate[i][1];
    tailObject.style.left = tailX + 'px';
    tailObject.style.top = tailY + 'px';
    fullSnake[i + 1] = tailObject;
    let tailCoordinates = [tailX, tailY];
    coordinate[i + 1] = [tailX, tailY];
    document.body.appendChild(tailObject);
}
function changeCoordinates(){
    for(let i=coordinate.length-1; i>0; i--){
        coordinate[i][0] = coordinate[i-1][0];
        coordinate[i][1]= coordinate [i-1][1];
    }
    coordinate[0]= [snakeHead.offsetLeft, snakeHead.offsetTop];
}
function moveSnake(){
    for(let i=1; i<fullSnake.length; i++){
        fullSnake[i].style.left=coordinate[i][0] +'px';
        fullSnake[i].style.top=coordinate[i][1] +'px';
    }
}
function onSnake(X,Y){
    for(let i=0; i<coordinate.length; i++){
        if(coordinate[i][0]==X) return true;
        else if(coordinate[i][1] == Y) return true;
    }
}
function randmoFood() {
    minX=0;
    maxX=border.offsetWidth -20;
    minY=0;
    maxY=border.offsetHeight -20;
    let foodX = Math.floor(Math.random() * ( (maxX - minX)/ 20)) * 20;
    let foodY = Math.floor(Math.random() * ((maxY- minY) / 20) ) * 20;
    snakeFood = document.createElement("div");
    snakeFood.classList.add("food");
    onSnake(foodX+border.offsetLeft, foodY+border.offsetTop);
    snakeFood.style.left = foodX + border.offsetLeft+ 'px';
    snakeFood.style.top = foodY + border.offsetTop + 'px';
    document.body.appendChild(snakeFood);
}

function giveDirections() {
    document.onkeydown = function (e) {
        if (!losed) {

            switch (e.keyCode) {
                case 37:
                    direction = "left";
                    moveLeft();
                    break;
                case 38:
                    direction = "up";
                    moveUp();
                    break;
                case 39:
                    direction = "right";
                    moveRight();
                    break;
                case 40:
                    direction = "down";
                    moveDown();
                    break;
            }
        }
    }
}
function move(){
    saveCoordinates();
    if(direction == "right"){
        moveRight();
    }
    else if(direction== "left"){
        moveLeft();
    }
    else if(direction == "up") {
        moveUp();
    }
    else if(direction == "down"){
        moveDown();
    }
    eat();
    checkLose();
}
function moveLeft() {
    let left = snakeHead.offsetLeft;
    left -= speed;
    snakeHead.style.left = left + 'px';
    changeCoordinates();
    moveSnake();
    eat();
    checkLose();
}
function moveUp() {
    let up = snakeHead.offsetTop;
    up -= speed;
    snakeHead.style.top = up + 'px';
    changeCoordinates();
    moveSnake();
    eat();
    checkLose();
}

function moveRight() {
    let right = snakeHead.offsetLeft;
    right += speed;
    snakeHead.style.left = right + 'px';
    changeCoordinates();
    moveSnake();
    eat();
    checkLose();
}

function moveDown() {
    let down = snakeHead.offsetTop;
    down += speed;
    snakeHead.style.top = down + 'px';
    changeCoordinates();
    moveSnake();
    eat();
    checkLose();
}
function eat(){
    if(snakeFood.offsetLeft==snakeHead.offsetLeft && snakeFood.offsetTop==snakeHead.offsetTop ){
        document.getElementById("score").innerHTML = ++score;
        snakeFood.remove();
        randmoFood();
        while(foodOnSnake){
            randmoFood();
        }
    }

    if(score% 2 == 1 && !changedSpeed){
        addTail(fullSnake.length-1);
        changedSpeed=true;
    }
    else if(score% 2 == 0) changedSpeed= false;
}
function checkLose(){
    let headCoordinates=coordinate[0];
    let border=document.getElementById("border");
    if(headCoordinates[0] < border.offsetLeft || headCoordinates[1] < border.offsetTop
        || headCoordinates[0] >= border.offsetLeft+border.offsetWidth -20
        || headCoordinates[1]>=border.offsetTop + border.offsetHeight -20) lose();

    for(let i=1; i<coordinate.length; i++){
        if(headCoordinates[0]== coordinate[i][0] && headCoordinates[1]== coordinate[i][1]){
            lose();
        }
    }
}
function lose(){
    clearInterval(loop);
    let lose =document.createElement('h1');
    lose.classList.add("loser");
    lose.innerHTML= "Loserr!!!  " + score + "<br>" + "Press space to start again!";
    document.onkeydown = function (e) {
        if(e.keyCode == 32) location.reload();
    }
    document.body.appendChild(lose);
    losed=true;
    snakeHead.remove();
}

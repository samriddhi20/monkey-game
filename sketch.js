
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground;
var rocks,rockImage,banana,bananasImage;
var survivalTime,mp3;
var rockGroup,bananaGroup;
var score,bscore;
var gameState ="PLAY";

function preload(){
  
  gif_createimg = createImg("background-1.gif");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
rockImage = loadImage("obstacle.png");
bananasImage = loadImage("banana.png");
mp3 = loadSound("mixkit-punch-with-short-whistle-2049.wav")
  
}

function setup() {
createCanvas(400,400);

monkey = createSprite(60,300,20,20);
monkey.addAnimation("monkey",monkey_running);
monkey.scale = 0.2;
 
survivalTime = 0;
bscore = 0;
  
bananaGroup = new Group();
rockGroup = new Group();

monkey.debug = false;

 score = createSprite(40,20,20,20);
 score.addImage(bananasImage);
 score.scale = 0.1;
}

function draw() {
 
background("white"); 
  
if(gameState === "PLAY"){
 
 if (monkey.isTouching(rockGroup)){
  gameState = "END"
 }
if(monkey.isTouching(bananaGroup )||monkey.scale < 0.2){
  bscore=bscore+1;
 bananaGroup.destroyEach();
}   

  monkey.velocityY = monkey.velocityY+0.9;  
  
survivalTime = survivalTime + Math.round(getFrameRate()/60);
textSize(20);
  
text("survivalTime: "+ survivalTime, 230,20); 
  
text(":"+bscore, 70,25);
  
ground = createSprite(300,362,900,10);
ground.velocityX = -2;
  
if(ground.x<0){
  ground.x = 300;
}
  
make_rocks();
bananas();  

monkey.collide(ground); 
if(keyDown("space")&& monkey.y >= 80) {
monkey.velocityY = -12;
} 
drawSprites();
}
else if (gameState === "END"){
    background("green")
  fill("yellow");
    textSize(30);
    text("!GAME OVER!",100,220);
   
}
}
function make_rocks(){
var rocks = Math.round(random(1));

if (frameCount % 200 === 0) {  
rocks = createSprite(600,300,10,40);
rocks.velocityX = -(6+(survivalTime/30));
rocks.addImage(rockImage);
rocks.scale = 0.3;
rocks.lifetime = 105;
rockGroup.add(rocks);
} 
}
function bananas(){
  var banana = Math.round(random(1));

if (frameCount % 90 === 0) {  
banana = createSprite(600,50,10,40);
banana.velocityX = -(6+(survivalTime/30));
banana.addImage(bananasImage);
banana.scale = 0.1;
banana.lifetime = 99;
bananaGroup.add(banana);
} 

}




var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var newImage;
var PLAY=1;
var END=0;
var gameState= PLAY;
var obstaclesGroup;
var gamover,gameoverimg;
var restart,restartimg;
var score=0;



function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");

  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  jumpsound=loadSound("jump.mp3");
  diesound=loadSound("die.mp3");
  checkpoint=loadSound("checkpoint.mp3");


  gameoverimg=loadImage("gameOver.png");
  restartimg=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  console.log("Hello"+ 5)
  cloudsGroup=new Group();
  obstacleGroup=new Group();


  gameover=createSprite(294,102,300,50);
  gameover.addImage("gameover",gameoverimg);
  restart=createSprite(300,56,50,50);
  restart.addImage("restart",restartimg);

  gameover.visible = false
  restart.visible = false


}

function draw() {
  
    
  
  
  
  background(180);
  text (mouseX+","+mouseY,mouseX,mouseY)
  textSize(20)
  text("score "+score,500,30);
if(gameState===PLAY) {
  ground.velocityX = -(4+score/100);
  


  score=score+ Math.round(frameCount/60)

  if(score%500===0 && score>0){
    checkpoint.play();
  }
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
    jumpsound.play();
  }

  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  spawnClouds();
  spawnobstacle ();

if(obstacleGroup.isTouching(trex)){
  gameState=END;
  diesound.play();

  
}

}

else if(gameState===END){
ground.velocityX=0;
trex.velocityY=0
;obstacleGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
trex.changeAnimation("collided",trex_collided);
text("HI "+score,409,30);
obstacleGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);


gameover.visible= true;
restart.visible = true;

if (mousePressedOver(restart)){
  reset()
}
}

  
  
  
  
  
  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  
  
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;

    
    
    //assigning lifetime to the variable
    cloud.lifetime = 250
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    }
}

function spawnobstacle(){
if(frameCount % 90=== 0) {
  obstacle=createSprite(600,160,10,10);
  obstacle.velocityX = -(4+score/100);
  var cact=Math.round(random(1,6));
  switch(cact){
    case 1:obstacle.addImage(obstacle1);
    break;
    case 2:obstacle.addImage(obstacle2);
    break;
    case 3:obstacle.addImage(obstacle3);
    break;
    case 4:obstacle.addImage(obstacle4);
    break;
    case 5:obstacle.addImage(obstacle5);
    break;
    case 6:obstacle.addImage(obstacle6);
    break;
    default:break
    
  }
  obstacle.scale=0.5  
  obstacle.lifetime=250;
  obstacleGroup.add(obstacle);
}

}



function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudsGroup.destroyEach();
gameover.visible=false;
restart.visible=false;
trex.changeAnimation("running", trex_running);
score=0;
ground.velocityX=-4;
}
const Engine = Matter.Engine
const World = Matter.World
const Bodies = Matter.Bodies
const Constraint = Matter.Constraint



var PLAY = 1;
var END = 0;
var gameState = PLAY;

var parrotFlying
var ground, invisibleGround, groundImage;

var birdsGroup;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score=0;

var gameOver, restart;

var tree
var stone;


function preload(){
 parrotFlying = loadAnimation("parrot21.png","parrot22.png","parrot23.png","parrot24.png","parrot25.png","parrot26.png","parrot27.png","parrot28.png","parrot29.png")
 treeImage = loadImage("tree.png")
}

function setup() {
 createCanvas(displayWidth,displayHeight);
 engine = Engine.create()
 world  = engine.world

 

 //tree = createSprite(displayWidth/1.2,displayHeight/2,20,20);
 //tree.addImage(treeImage);

 grape1 = new Grape(1100,300);
 grape2=new Grape(1050,400);
 grape3=new Grape(1200,330);
 grape4=new Grape(900,350);
 grape5=new Grape(875,430)
 tree=new Tree(1050,780)
 stone = new Stone(200,50);
 slingshot = new SlingShot(stone.body,{x:200, y:650});

 //console.log(tree.depth)


 birdsGroup = new Group();
 
}

function draw() {
 background(255);
 tree.display(); 
 grape1.display();
 grape2.display();
 grape3.display();
 grape4.display();
 grape5.display();
 stone.display();
 slingshot.display();
 spawnBird();
 drawSprites();
}

function spawnBird() {
 //write code here to spawn the clouds
 if (frameCount % 60 === 0) {
 var bird = createSprite(displayWidth,displayHeight/4,40,10);
 bird.y = Math.round(random(displayHeight/4,displayHeight/2));
 bird.addAnimation("flying",parrotFlying);
 bird.scale = 0.8;
 bird.velocityX = -3;
 
 //assign lifetime to the variable
 bird.lifetime = 500;
 
 //adjust the depth
 //cloud.depth = trex.depth;
// trex.depth = trex.depth + 1;
 
 //add each cloud to the group
 birdsGroup.add(bird);
 }
 
}

function spawnObstacles() {
 if(frameCount % 60 === 0) {
 var obstacle = createSprite(camera.position.x,camera.position.y+60,10,40);
 obstacle.velocityX = -(6 + 3*score/100);
 
 //generate random obstacles
 var rand = Math.round(random(1,6));
 switch(rand) {
 case 1: obstacle.addImage(obstacle1);
 break;
 case 2: obstacle.addImage(obstacle2);
 break;
 case 3: obstacle.addImage(obstacle3);
 break;
 case 4: obstacle.addImage(obstacle4);
 break;
 case 5: obstacle.addImage(obstacle5);
 break;
 case 6: obstacle.addImage(obstacle6);
 break;
 default: break;
 }
 
 //assign scale and lifetime to the obstacle 
 obstacle.scale = 0.5;
 obstacle.lifetime = 300;
 //add each obstacle to the group
 obstaclesGroup.add(obstacle);
 }
}

function reset(){
 gameState = PLAY;
 ground.velocityX = -(6 + 3*score/100);
 gameOver.visible = false;
 restart.visible = false;
 
 obstaclesGroup.destroyEach();
 cloudsGroup.destroyEach();
 
 trex.changeAnimation("running",trex_running);
 
 score = 0;
 
}

function detectCollision(lstone,lgrape){
    grapeBodyPosition=lgrape.body.position
    stoneBodyPosition=lstone.body.position
    var distance = dist(stoneBodyPosition.x,stoneBodyPosition.y,grapeBodyPosition.x,grapeBodyPosition.y,)
    if (distance<=lgrape.r+lstone.r){
        Matter.Body.setStatic(lgrape.body,false);
    }
}
function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(stone.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    //gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32){
        //bird.trajectory = [];
        Matter.Body.setPosition(stone.body,{x:200,y:50});
        slingshot.attach(stone.body);
    }
}



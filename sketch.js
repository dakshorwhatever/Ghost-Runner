var PLAY = 1;
var END = 0;
var gameState = PLAY;
var ghost, ghostImage, tower, towerImage, edges;
var door, invisibleBlock, climber;
var climberGroup, invisibleBlockGroup, doorGroup;
function preload() {
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
}

function setup() {
  createCanvas(500, 500);
  tower = createSprite(250, 250);
  tower.addImage(towerImage);
  tower.scale = 0.9;
  tower.velocityY = 4;

  ghost = createSprite(250, 200, 40, 40);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  
  
  invisibleBlockGroup = new Group();  
  doorGroup = new Group();
  climberGroup = new Group();
}

function draw() {
 // background("black")
  if (gameState === PLAY){
  if (tower.y > 500) {
    tower.y = 100;
  }
  if (keyDown("space")) {
    ghost.velocityY = -6;
  }
  ghost.velocityY = ghost.velocityY + 0.5;
  edges = createEdgeSprites();
  ghost.collide(edges)
 //ghost.debug = true;
  ghost.setCollider("rectangle",0,0,80,280)
  if (climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  
  }
  
if (invisibleBlockGroup.isTouching(ghost)){
  gameState = END;
  ghost.destroy();
  
}
  if (keyDown("left")) {
    ghost.x = ghost.x - 6;
  }
  if (keyDown("right")) {
    ghost.x = ghost.x + 6;
  }
  spawnDoors();
  drawSprites();
  }
  else if (gameState === END){
    stroke("yellow");
    textSize(20);
    text("GAME OVER",250,250)
    
    
  }
  

}

function spawnDoors() {
  if (frameCount % 60 === 0) {
    door = createSprite(0, 0, 30, 30)
    door.addImage(doorImage)
    door.x = Math.round(random(50, 450))
    door.velocityY = 4;
    door.scale = 0.8;
    door.lifetime = 125
    
    climber = createSprite(0, 40, 30, 30)
    climber.addImage(climberImage)
    climber.x = door.x;
    climber.velocityY = 4;
    climber.scale = 0.6;
    climber.lifetime = 125
    
    invisibleBlock = createSprite(0, 47, 35, 2)
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 4;
    invisibleBlock.visible = false;
    invisibleBlock.lifetime = 125
    
    invisibleBlockGroup.add(invisibleBlock);
    climberGroup.add(climber);
    doorGroup.add(door);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1
  }
}
//game states
var PLAY=1;
var END=0;
var gameState=1;


var knife;
var knifeImage;



var fruit1,fruit2,fruit3,fruit4;

var fruitGroup,enemyGroup;

var alien1,alien2;

var monsterImage;

var gameOverImage;

function preload(){
  //loading sword image
  knifeImage = loadImage("knife.png");
  
  
  //loading fruits image
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  //loading aliens image
  monsterImage = loadAnimation("alien1.png","alien2.png");
  //alien2 = loadImage("alien2.png");
 
  gameOverImage = loadImage("gameover.png");
  
}
function setup(){
  createCanvas(600,600);
  

  
//creating sword
  knife=createSprite(400,200,20,20);
  knife.addImage(knifeImage);
  knife.scale=0.7;
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);
  
  //score variables and groups
  score=0;
  fruitGroup = createGroup();
  enemyGroup = createGroup();
  
  
}

function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
  
   //call fruits and enemy function
  fruits();
  Enemy(); 
    
  //move sword with mouse
  knife.y = World.mouseY;
  knife.x = World.mouseX;
    

    
  //increase score when sword touch fruit
    if(fruitGroup.isTouching(knife)){
      fruitGroup.destroyEach();
      score=score+2;
      
  }
     else 
  {     
       if(knife.isTouching(enemyGroup)){
          gameState=END;
          
          fruitGroup.destroyEach();
          enemyGroup.destroyEach();
          fruitGroup.setVelocityXEach(0);
          enemyGroup.setVelocityXEach(0);
          
          
          //change sword to game over
          knife.addImage(gameOverImage);
          knife.x=200;
          knife.y=200;
          
          
          
        } 
  }
  }    
  drawSprites();
  
  //display score
  text("score : "+score,300,30);
  
}

function fruits(){
 if(World.frameCount%80===0){
   fruit = createSprite(400,200,20,20);
   fruit.scale=0.2;
   //fruit.debug=true;
   r=Math.round(random(1,4))
   if(r == 1){
     fruit.addImage(fruit1);
   }else if (r == 2){
     fruit.addImage(fruit2);
   }else if (r == 3){
     fruit.addImage(fruit2);
   }else if (r == 4){
     fruit.addImage(fruit2); 
   }
   fruit.y=Math.round(random(50,340))
   fruit.velocityX=-7;
   fruit.setLifetime=100;
   fruitGroup.add(fruit);
   fruit.velocityX=-(8+(score/4));
 }

}
  function Enemy(){
    if(World.frameCount%200===0){
      monster=createSprite(400,200,20,20);
      monster.addAnimation("moving",monsterImage);
      monster.y=Math.round(random(100,300));
      monster.velocityX=-8;
      monster.setLifetime=50;
      monster.velocityX=-(8+(score/10));
      
      enemyGroup.add(monster);
    }
    
    
  }
  
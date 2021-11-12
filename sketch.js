var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boy_running, boy_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  boy_running = loadAnimation("boy-1.png","boy-2.png");
  boy_collided = loadImage("boy-2.png");
  bgimg = loadImage("background.jpg")
  
  
  arrow = loadImage("arrow.png");
  
  resetImg = loadImage("reset.jpg")
  
  
  jumpSound = loadSound("mixkit-video-game-spin-jump-2648.wav")
  dieSound = loadSound("mixkit-fast-small-sweep-transition-166.wav")
  checkPointSound = loadSound("mixkit-arcade-score-interface-217.wav")
}

function setup() {
  createCanvas(600, 600);

  //creating background
  bg = createSprite (160,160,180,70);
  bg.addImage(bgimg);
  bg.scale = 2.5
  bg.velocityX = -3

  var message = "This is a message";
 console.log(message)
  
  boy = createSprite(50,160,20,50);
  boy.addAnimation("running", boy_running);
  boy.addAnimation("collided", boy_collided);
  

  boy.scale = 0.1;
  
  
  
  restart = createSprite(300,140);
  restart.addImage(resetImg);
  restart.visible = false;
 
  
  restart.scale = 0.1;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  
  //create arrowGroups
  arrowGroup = createGroup();
  

  
  
  
  score = 0;
  
}

function draw() {
  
  background(180)
  //displaying score
  text("Score: "+ score, 500,50);

  
  
  
  if(gameState === PLAY){

    
    restart.visible = false;
    
    
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    
    
    
    //jump when the space key is pressed
    if(keyDown("space")&& boy.y >= 100) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    boy.velocityY = boy.velocityY + 0.8
  

  
    //spawn arrow on the ground
    spawnArrow();
    
    if(arrowGroup.isTouching(boy)){
        //boy.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
   else if (gameState === END) {
      
      restart.visible = true;
   
     //change the boy animation
      boy.changeAnimation("collided", boy_collided);
    
     
     
      ground.velocityX = 0;
      boy.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    arrrowGroup.setLifetimeEach(-1);
    
     
     arrowGroup.setVelocityXEach(0);
        
   }
  if(mousePressedOver(restart)){
    reset();
  }
 
  
  if(mousePressedOver(restart)) {
      reset();
    }


  drawSprites();
}

function reset(){
  gameState=PLAY;
  arrowGroup.destroyEach();
  score=0
}


function spawnArrow(){
 if (frameCount % 60 === 0){
   var arrow = createSprite(600,165,60,40);
   arrow.velocityX = -(6 + score/100);
   
    //generate random arrow
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: arrow.addImage(arrow);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the arrow        
    arrow.scale = 0.5;
    arrow.lifetime = 300;
   
   //add each obstacle to the group
    arrowGroup.add(arrow)











    
 } 
}
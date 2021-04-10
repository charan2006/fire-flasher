

var fireball, fireballImg;
var ground, boy, boyImg;
var backgroundImg;
var background1
var gamestate = 0;
var fireGroup;
var reset, resetimg;
var gameoverimg, gameover;
var hw, hwimg;
var sp, sp2;
var b1, b2, b3, b4;
var score = 0;
var srp;
localStorage["HighestScore"] = 0;
localStorage["testing"] = "test";
var ibell, ibellimg;
var menu, menuimg;
var info, infoimg;
var spr2;



// createEdgeSprites();
function preload() {
  fireballImg = loadImage("fireball2.png");
  boyImg = loadImage("boy.png");
  backgroundImg = loadImage("background.png");
  gameoverimg = loadImage("game over.png");
  resetimg = loadImage("reset.png");
  hwimg = loadImage("play.png");
  ibellimg = loadImage("ibell.png");
  menuimg = loadImage("menu.png");
  infoimg = loadImage("info.png");

}

function setup() {
  createCanvas(600, 500);
  background1 = createSprite(300, 250, 600, 500);
  background1.addImage(backgroundImg)
  // ground = createSprite(300,450,800,20);
  boy = createSprite(300, 400, 20, 20);
  
  boy.addImage(boyImg);
  boy.scale = 0.4;
  
  fireGroup = new Group();
  b1 = createSprite(300, 5, 600, 10);
  b1.visible = false;
  b2 = createSprite(5, 250, 10, 500);
  b2.visible = false;
  b3 = createSprite(300, 495, 600, 10);
  b3.visible = false;
  b4 = createSprite(595, 250, 10, 500);
  b4.visible = false;
  srp = createSprite(300, 250, 300, 500);
  srp.shapeColor = "lightblue";
  srp.visible = false
  hw = createSprite(290, 400, 50, 50);
  hw.addImage(hwimg);
  hw.scale = 0.06;
  hw.visible = false;
  menu = createSprite(210, 300, 50, 50);
  menu.addImage(menuimg);
  menu.scale = 0.12;
  menu.visible = false;
  ibell = createSprite(370, 300, 50, 50);
  ibell.addImage(ibellimg);
  ibell.scale = 0.06;
  ibell.visible = false;
  info = createSprite(270, 120, 50, 50);
  info.addImage(infoimg);
  info.scale = 0.5;
  info.visible = false;

  sp = createSprite(300, 150, 300, 150);
  sp.shapeColor = "pink"
  sp.visible = false;

  sp2 = createSprite(300, 150, 300, 150);
  sp2.shapeColor = "pink"
  sp2.visible = false;
  spr2 = createSprite(300, 250, 300, 500);
  spr2.shapeColor  = "red";
  spr2.visible = false;
  gameover = createSprite(300, 250, 20, 20);
  gameover.addImage(gameoverimg);
  reset = createSprite(300, 320, 50, 50);
  reset.addImage(resetimg);
  reset.scale = 0.1;

}

function draw() {
  if (gamestate === 1) {
    score = score + Math.round(getFrameRate() / 60);
  }
  
  // console.log(localStorage["HighestScore"])
  // console.log(score)
  background(backgroundImg);
  boy.collide(b1);
  boy.collide(b2);
  boy.collide(b3);
  boy.collide(b4);
  // boy.bounceOff(Edges);
  // fireballs();
  fires();
  // console.log(gamestate);


  if (fireGroup.isTouching(boy)) {
    gamestate = 2;
  }


  if (gamestate === 1) {

    if (keyDown(UP_ARROW)) {
      boy.y = boy.y - 5;
    }

    if (keyDown(DOWN_ARROW)) {
      boy.y = boy.y + 5;
    }

    if (keyDown(LEFT_ARROW)) {
      boy.x = boy.x - 5;
    }

    if (keyDown(RIGHT_ARROW)) {
      boy.x = boy.x + 5;
    }
  }

  if (mousePressedOver(reset)) {
    reset2();
  }

  drawSprites();
  if(gamestate === 2 && score > localStorage["HighestScore"]){
    fill("black")
    textFont("Arial Rounded MT Bold");
    textSize(30)
    text("You scored Highest",180,60);
    text("score",260,90);
    text(" "+score,270,120);

    text("Highest score = "+ localStorage["HighestScore"],180,150)
  }
  if (gamestate === 2) {
    gameover.visible = true;
    reset.visible = true;
    fireGroup.destroyEach();
    boy.x = 300;
    boy.y = 400;
    spr2.visible = true;
    fill("black")
    textFont("Arial Rounded MT Bold");
    textSize(30)
    text("Your Score = "+ score,200,190);
    
    // srv = 0 

  }
  else {
    spr2.visible = false;
  }
  if (gamestate === 0) {
    // srv = 0
    srp.visible = true
    gameover.visible = false;
    reset.visible = false;
    hw.visible = true;
    info.visible = true;
    ibell.visible = true;
    menu.visible = true;


    textFont("Calibri");
    textSize(15);
    fill("black");
    text("How to play", 180, 330);
    text("score", 355, 330)
    fill("black");
    textFont("Algerian");
    textSize(30);
    text("Fire", 260, 230);
    text("Flaser", 240, 260)
    textFont("Times New Roman")
    textSize(30);
    text("Click here to start", 190, 370);
    if (mousePressedOver(hw)) {
      gamestate = 1;
    }
  }
  else {
    srp.visible = false;
    hw.visible = false;
    ibell.visible = false;
    menu.visible = false;
    info.visible = false;
  }

  if (mousePressedOver(menu)) {
    sp.visible = true;
    textFont("Calibri")
    textSize(20)
    text("*Use arrow keys to move the boy", 155, 140);
    text("*More time you survive the more", 155, 160);
    text("the more points you gain.", 157, 180)
  }
  else {
    sp.visible = false;
  }
  if (mousePressedOver(ibell)) {
    sp2.visible = true;
    textSize(30)
    textFont("Arial Rounded MT Bold")
    text("Highest Score = " + localStorage["HighestScore"], 190, 160)
  }
  else {
    sp2.visible = false;
  }
  if (gamestate === 1) {
    textFont("Calibri")
    textSize(30);
    text("survival : " + score, 50, 30);
  }


}
function fires() {
  if (gamestate === 1) {
    reset.visible = false;
    // gameover.visible = false;
    if (frameCount % 20 === 0) {
      fireball = createSprite(random(800), -10, 10, 10);
      fireball.addImage(fireballImg);
      fireball.scale = 0.15;
      fireball.velocityY = 3;
      fireball.lifetime = 160;
      fireGroup.add(fireball);
    }
  }
}
function reset2() {
  gamestate = 0;
  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;

  }
  score = 0
}

var helicopter,helicopterImg,heli_sound,frame=0
var aim,aimImg,bg,bgImg,burst,blast_Ani,laserImg,laser
var c=0,backg,play,backgr,back,life=5,shoot,winImg,won,lost,lostImg
var gamestate=0,laser_group
var time=0
var shooter,shooter_Ani
var bgm,shootsound
var runner,runner_Ani
function preload()
{
  helicopterImg=loadAnimation("frame_00_delay-0.03s.png","frame_01_delay-0.03s.png","frame_02_delay-0.03s.png","frame_03_delay-0.03s.png","frame_04_delay-0.03s.png","frame_05_delay-0.03s.png","frame_06_delay-0.03s.png","frame_07_delay-0.03s.png","frame_08_delay-0.03s.png","frame_09_delay-0.03s.png","frame_10_delay-0.03s.png")
  heli_sound=loadSound("Helicopter Sound.mp3")
  aimImg=loadImage("aim.png")
  bgImg=loadImage("bgimg.jpg")
  burst=loadSound("explosion.wav")
  blast_Ani=loadAnimation("tile000.png","tile001.png","tile002.png","tile003.png","tile004.png","tile005.png","tile006.png","tile007.png","tile008.png","tile009.png","tile010.png","tile011.png")
  backg=loadImage("bg_shoot.png")
  bgm=loadSound("bgm.mp3")
  shoot=loadSound("shootsound.wav")
  shootsound=loadSound("Gun shot.mp3")
  backgr=loadImage("background.png")
  runner_Ani=loadAnimation("run1.png","run2.png","run3.png","run4.png","run5.png","run6.png","run7.png","run8.png","run9.png","run10.png","run11.png","run12.png")
  shooter_Ani=loadAnimation("runs1.png","runs2.png","runs3.png","runs4.png","runs5.png","runs6.png","runs7.png","runs8.png","runs9.png","runs10.png","runs11.png","runs12.png","runs13.png","runs14.png","runs15.png","runs16.png","runs17.png",)
  laserImg=loadImage("laser.png")
  winImg=loadImage("win.png")
  lostImg=loadImage("lose.png")
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  laser_group=createGroup();
  helicopter=createSprite(200,150,50,50)
  this.playButton = createButton("Get started")
  this.playButton.position(width/2,height/2+100)
  helicopter.setCollider("rectangle", helicopter.x-200, helicopter.y-150, 400, 120, 0)
  helicopter.addAnimation("helicopter_Arriving",helicopterImg)
  heli_sound.loop();
  aim=createSprite(width/2,height/2,100,100)
  aim.addImage(aimImg)
  aim.setCollider("circle",mouseX,mouseY,100)
  runner=createSprite(width/2+150,height/2,100,150)
  runner.addAnimation("running",runner_Ani)
  shooter=createSprite(width/2-500,height/2+250,100,150)
  shooter.addAnimation("running",shooter_Ani)
  shooter.scale=0.65
  runner.visible=false
  collider=createSprite(width/2,height/2+400,width,50)
  runner.setCollider("rectangle",0,0, 200, 200, 0 )
  collider.visible=false
  bg = createSprite(width/2+500,windowHeight/2)
  bg.addImage(bgImg)
  bg.scale=2.5
  bg.velocityX =-3;
  bgm.loop();
  back=createSprite(width/2-750,windowHeight/2)
  back.addImage(backgr)
  back.scale=2.7
  back.visible=false
  shootsound.play()
}

function draw()
{
  laser=createSprite(shooter.x+100,shooter.y)
  laser.visible=false
  if(gamestate==0)
  {
    background(backg)
    heli_sound.setVolume(0)
    bgm.setVolume(100)
    this.playButton.mousePressed(()=>
    {
      this.playButton.hide();
      gamestate=1
      bgm.setVolume(0)
    })
    textSize(50)
    fill("red")
    textFont("Bold")
    text("Level 1:shoot the helicopter-EASY",width/2,this.playButton.y+100)
    text("As level increases task increases",width/2,this.playButton.y+200)
    text("Get Ready!",width/2-250,height/2)
    text("Space button - for firing",100,100)
    text("Aim handling - mouse",100,200)
    shootsound.setVolume(0)
  }

  if(gamestate==1)
  {
  background("black")
  heli_sound.setVolume(100)
 if(bg.x<width/2)
 {
    bg.x = width/2+500;
    bg.velocityX =-3;
 }
 if(helicopter.x>width)
 {
  gamestate=0
  this.playButton.show()
 }
 if(aim.isTouching(helicopter))
  {
    if(keyDown("space"))
    {
       
      heli_sound.stop();
      bg.velocityX=0;
      burst.play()
      helicopter.changeAnimation("helicopter_blast")
      helicopter.addAnimation("helicopter_blast",blast_Ani)
      helicopter.velocityX=0.9
      helicopter.velocityY=7
      shootsound.setVolume(100)
    }
  }
      c=c+1
      if(c>=150)
      {
      gamestate=2
      }
  helicopter.velocityX=1
  aim.x=mouseX
  aim.y=mouseY
  helicopter.depth=bg.depth+1
  helicopter.depth = aim.depth
  aim.depth=bg.depth+1
  aim.depth=helicopter.depth+5
  drawSprites();
  textSize(50)
  fill("red")
  text("Level 1:Demo",width/2,aim.y-275)
  }

  if(gamestate==2)
  {
    bg.destroy();
    helicopter.destroy()
    background(backg)
    shootsound.setVolume(0)
    bgm.setVolume(100)
    this.playButton.show()
    aim.visible = false;
    heli_sound.setVolume(0)
    this.playButton.mousePressed(()=>
    {
      this.playButton.hide();
      runner.visible=true
      gamestate=3
      bgm.stop();
    })
    textSize(50)
    fill("red")
    textFont("Bold")
    text("Level 2:survive for 30s",width/2+150,height/2)
    text("As level increases task increases",width/2,this.playButton.y+200)
    text("Get Ready!",width/2-250,height/2)
    text("Space button - to jump and escape from the bullet",100,100)
    
  }

  if(gamestate==3)
  {
    background("black")
    back.visible=true
    back.velocityX=-10
    runner.depth=back.depth+0.25
    //runner.velocityX=2
    //camera.y=mouseY
    shooter.depth=runner.depth
    runner.velocityY=runner.velocityY + 9.8;
    runner.collide(collider)
    if(frameCount%100==0)
    {
      laser.visible=true
      laser.addImage(laserImg)
      laser.velocityX=35
      laser.depth=runner.depth
      shoot.play();
    }
    frame=frame+1
    if(frame%30==0)
    {
      time=time+1
    }
    if(time>=30)
    {
      time=30
    }
    if(time>=30 && life>0)
    {
      time=30
      gamestate="won"
      runner.destroy();
      shooter.destroy();
      back.destroy();
    }
    if(life<=0)
    {
      life=0
      gamestate="lost"
      runner.destroy();
      shooter.destroy();
      back.destroy();
    }
    //console.log(life)
    if(laser_group.isTouching(runner))
    {
      laser_group.destroyEach()
      life=life-1
    }
    if(keyDown("space") && runner.y>width/3-100)
    {
      runner.velocityY=-50 
    }
    if(back.x<width/3+100)
    {
    back.x = width/2+150;
    back.velocityX =-3;
    
    }
 collider.depth=back.depth+2

    drawSprites();
    textSize(50)
    fill("red")
    textFont("latin")
    text("level:2:survive for 30s",width/2,35)
    text("Time:"+time+'s',width-175,35)
    text("LIFE:"+life,75,75)
  }

  if(gamestate=="won")
  {
    background("black")
    won=createSprite(width/2,height/2,200,200)
    won.addImage(winImg)
    drawSprites();
  }

  if(gamestate=="lost")
  {
    background("black")
    lost=createSprite(width/2,height/2,200,200)
    lost.addImage(lostImg)
    drawSprites();
  }
  laser_group.add(laser)
console.log(gamestate)
}


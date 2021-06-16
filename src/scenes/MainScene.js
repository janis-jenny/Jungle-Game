import Phaser from 'phaser';
import sceneoptions from '../config/sceneoptions';
import bg from '../assets/bg.png'
import gamoraWalk from '../assets/gamora_walk.png'
import platform1 from '../assets/bigplatform1.png'
import platform2 from '../assets/platform2.png'
import platform3 from '../assets/platform3.png'
import coin from '../assets/coin.png'
import tresure from '../assets/chest.png'
import orc1 from '../assets/orc.png'

const gameState = { 
  score: 0,
  speed: 240,
  ups: 380,
  width: 2332,
  height: 585,
 };

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
    this.heights = [null, 5, 2, 6, 4, 3, 5, 2, 8, 6];
    this.levelKey = MainScene
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('bigplatform1', platform1);
    this.load.image('platform2', platform2);
    this.load.image('platform3', platform3);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 30, frameHeight: 36 });
    this.load.spritesheet('coin', coin, { frameWidth: 9.5, frameHeight: 10 });
    this.load.spritesheet('chest', tresure, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('orc1', orc1, { frameWidth: 48, frameHeight: 64 });

  }
  // 
  create() {

    gameState.active = true;
    this.add.image(630, 292, 'bg');
 
    const platforms = this.physics.add.staticGroup();
    gameState.platforms = this.physics.add.staticGroup();

    const plat1Positions = [
      { x: 340, y: 585 }, { x: 580, y: 585 }, { x: 1010, y: 585 }, { x: 1250, y:  585 },
      { x: 1660, y: 585 }, { x: 1900, y:  585 }, { x: 2200, y: 330 },
    ];
    plat1Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'bigplatform1').setScale(.4).refreshBody();
    });

 /*    const plat2Positions = [
      { x: 320, y: 330 }, { x: 530, y: 200 }, { x: 820, y: 395 },
    ];
    plat2Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform2').setScale(.3).refreshBody();
    }); */

    const plat3Positions = [
      { x: 70, y: 585 },
    ];
    plat3Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform3').setScale(.6).refreshBody();
    });

    gameState.player = this.physics.add.sprite(90, 420, 'gamora_walk').setScale(1.5);

    gameState.exit = this.physics.add.sprite(2250, 200, 'chest').setScale(1.5);

    gameState.enemy1 = this.physics.add.sprite(320, 400, 'orc1');
    
    this.createAnimations();
    this.levelSetup();

    // set Cameras here
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
 
    gameState.player.setCollideWorldBounds(true);
    
    // Makes a collision between the character and the platforms
    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.enemy1, platforms);  
    
    gameState.player.body.bounce.y = 0.2;

    gameState.cursors = this.input.keyboard.createCursorKeys();

    const coins = this.physics.add.group({
      key: 'coin',
      repeat: 36,
      setXY: { x: 250, y: 0, stepX: 50 }
    });

    coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(2.3);
      child.anims.play('rotate');
    });
       
    // Displays initial Score: 0 text
    gameState.scoreText = this.add.text(1150, 30, 'Score: 0', { fontFamily: 'Arial', fontSize: '24px', fill: '#000000' });

    this.physics.add.collider(coins, platforms);
    this.physics.add.collider(coins, gameState.platforms);
    this.physics.add.collider(gameState.exit, platforms);
    
    gameState.exit.anims.play('movement');
    gameState.enemy1.anims.play('orc1Alert');
    
    // makes an overlap event for when the player gets an item
    this.physics.add.overlap(gameState.player, coins, this.collectCoin, null, this);
    
    this.physics.add.overlap(gameState.player, gameState.exit, function() {
      // Add in the collider that will fade out to the next level here
      this.cameras.main.fade(800, 0, 0, 0, false, function(camera, progress) { 
        if (progress > .9) {
          this.scene.restart(this.levelKey)
        }
      })
    }, null, this)
    // Adding events to interact with the character
    this.input.keyboard.on('keydown-UP', this.jump, this);
    this.input.on('pointerdown', this.jump, this);

    // Sets the jumps to 0 for the double jump
    this.jumps = 0;

    gameState.moveTween = this.tweens.add({
      targets: gameState.enemy1,
      x: 500,
      duration: 3000,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });
    
  }

  createPlatform(xIndex, yIndex) {
    // Creates a platform evenly spaced along the two indices.
    // If either is not a number it won't make a platform
      if (typeof yIndex === 'number' && typeof xIndex === 'number') {
        gameState.platforms.create((205 * xIndex),  yIndex * 70, 'platform2').setOrigin(0, 0.5).setScale(.3).refreshBody();
      } 
  }

  createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'idle',
      frames:  [ { key: 'gamora_walk', frame: 4 } ],
      frameRate: .4,
      repeat: -1
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    // setting coin animation
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
          start: 0,
          end: 3
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1
    });
    this.anims.create({
      key: 'movement',
      frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 3 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1
    });

    this.anims.create({
      key: 'orc1Alert',
      frames: this.anims.generateFrameNumbers('orc1', { start: 3, end: 5 }),
      frameRate: 4,
      repeat: -1
    });
  }
  
  levelSetup() {
    for (const [xIndex, yIndex] of this.heights.entries()) {
      // call createPlatform here with xIndex and yIndex
    this.createPlatform(xIndex, yIndex) 
    } 
  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-280);
		  	gameState.player.anims.play('left', true);
      } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(280);
        gameState.player.anims.play('right', true);
      } else {
        gameState.player.setVelocityX(0);
        gameState.player.anims.play('idle', true);
      }
    }
    
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down)
    { 
      gameState.player.setVelocityY(-350);
      this.jumps = 0;
    }
    
 
    if (gameState.player.y === gameState.height ) {
      gameState.player.velocity.y = 300; 
      if (gameState.player.y > gameState.height) {
        this.cameras.main.shake(240, .01, false, function(camera, progress) {
          if (progress > .9) {
            this.scene.restart(this.levelKey);
          }
        });
      }
    }
  }

  jump() {
    if (gameState.player.body.touching.down || this.jumps < 2) {
      gameState.player.setVelocityY(sceneoptions.jumpForce * -1);
      this.jumps += 1;
    }
  }
   
  collectCoin (player, coin) {
    coin.disableBody(true, true);
    player.refreshBody;
    gameState.score += 10;
    gameState.scoreText.setText(`Score: ${gameState.score}`) 
  } 
}


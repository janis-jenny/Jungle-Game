import Phaser from 'phaser';
import sceneoptions from '../config/sceneoptions';
import bg from '../assets/bg.png'
import gamoraWalk from '../assets/gamora_walk.png'
import platform1 from '../assets/platform1.png'
import platform2 from '../assets/platform2.png'
import platform3 from '../assets/platform3.png'
import coin from '../assets/Coin.png'

const gameState = {};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('platform1', platform1);
    this.load.image('platform2', platform2);
    this.load.image('platform3', platform3);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 30, frameHeight: 36 });
  
    this.load.spritesheet('coin', coin, { frameWidth: 9, frameHeight: 10 });
  }

  create() {

    gameState.active = true;
    this.add.image(630, 292, 'bg');
    
    const platforms = this.physics.add.staticGroup();
    const plat1Positions = [
      { x: 280, y: 580 }, { x: 430, y: 580 }, { x: 750, y: 580 }, { x: 900, y: 580 },
    ];
    plat1Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform1').setScale(.3).refreshBody();
    });

    const plat2Positions = [
      { x: 320, y: 330 }, { x: 530, y: 200 }, { x: 820, y: 395 },
    ];
    plat2Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform2').setScale(.3).refreshBody();
    });

    const plat3Positions = [
      { x: 70, y: 585 },
    ];
    plat3Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform3').setScale(.6).refreshBody();
    });

    gameState.player = this.physics.add.sprite(90, 420, 'gamora_walk').setScale(1.5);
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

    // Makes a collision between the character and the platforms
    this.physics.add.collider(gameState.player, platforms);
    
    // this.physics.add.overlap(gameState.player, this.activeItems, this.collectCoin, null, this);    

    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

    const coins = this.physics.add.group({
      key: 'coin',
      repeat: 10,
      setXY: { x: 300, y: 0, stepX: 70 }
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
    /* this.anims.create({
      key: 'movement',
      frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    }) */
    
    coins.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)).setScale(2.3);
    });
   
    this.physics.add.collider(coins, platforms);
    // makes an overlap event for when the player gets an item
    this.physics.add.overlap(gameState.player, coins, this.collectCoin, null, this);

    // Adding events to interact with the character
    this.input.keyboard.on('keydown-UP', this.jump, this);
    this.input.on('pointerdown', this.jump, this);

    // Sets the jumps to 0 for the double jump
    this.jumps = 0;
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

      gameState.player.setVelocityY(-250);
      this.jumps = 0;
    }
    
  }

  jump() {
    if (this.player.body.touching.down || this.jumps < 2) {
      this.player.setVelocityY(sceneoptions.jumpForce * -1);
      this.jumps += 1;
    }
  }
   
  collectCoin (player, coin) {
    coin.disableBody(true, true);
    player.refreshBody;
  } 
}


import Phaser from 'phaser';
import bg from '../assets/bg.png'
import gamoraWalk from '../assets/gamora_walk.png'
import platform1 from '../assets/platform1.png'
import platform2 from '../assets/platform2.png'
import platform3 from '../assets/platform3.png'

const gameState = {};

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // load images
    
    this.load.image('bg', bg);
    this.load.image('platform', platform1);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 30, frameHeight: 36 });
  }


  create() {
    gameState.active = true;
    this.add.image(630, 292, 'bg');
    
    
    const platforms = this.physics.add.staticGroup();
    platforms.create(160, 580, 'platform').setScale(.3).refreshBody();
    
    
      /* , function(){
 
      // play "run" animation if the player is on a platform
      if(!this.player.anims.isPlaying){
          this.player.anims.play('run');
      }
    }, null, this */
 
    gameState.player = this.physics.add.sprite(60, 400, 'gamora_walk').setScale(1.5);
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

  /* this.anims.create({
      key: 'turn',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('gamora_walk', { start: 6, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
     */
    this.physics.add.collider(gameState.player, platforms);
    gameState.player.setCollideWorldBounds(true);
    gameState.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (gameState.active) {
      if (gameState.cursors.left.isDown) {
        gameState.player.setVelocityX(-280);
        // Add your code below:
		  	gameState.player.anims.play('left', true);
      } else if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(280);
        gameState.player.anims.play('right', true);
/*         // Add your code for step 1 below:
				gameState.player.flipX = true; */
        
      } else {
        gameState.player.setVelocityX(0);
        // Plays the idle animation if no arrow keys are pressed
        gameState.player.anims.play('idle', true);
      }
    }
    
    if (gameState.cursors.up.isDown && gameState.player.body.touching.down)
    {
      gameState.player.setVelocityY(-250);
    }
    
  }
}
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
    this.load.image('platform1', platform1);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 30, frameHeight: 36 });
  }


  create() {
    gameState.active = true;
    this.add.image(0, 0, 'bg');
    
    
    const platforms = this.physics.add.staticGroup();
    platforms.create(160, 580, 'platform1').setScale(.5);
    
    
      /* , function(){
 
      // play "run" animation if the player is on a platform
      if(!this.player.anims.isPlaying){
          this.player.anims.play('run');
      }
    }, null, this */
 
    gameState.player = this.physics.add.sprite(100, 420, 'gamora_walk').setScale(1.5);
    this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('gamora_walk', { start: 6, end: 9 }),
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
    // Add your conditional statements below:
    /* if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    } */

    if (gameState.active) {
      if (gameState.cursors.right.isDown) {
        gameState.player.setVelocityX(350);
        // Add your code below:
		  	gameState.player.anims.play('run', true);
      }
    }
    
  }
}
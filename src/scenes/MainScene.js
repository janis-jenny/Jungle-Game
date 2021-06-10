import Phaser from 'phaser';
import bg from '../assets/bg.png'
import gamoraWalk from '../assets/gamora_walk.png'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // load images
    
    this.load.image('bg', bg);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 32, frameHeight: 48 });
    this.load.crossOrigin = true;
  }


  create() {
    // super.create();
    this.add.image(400, 300, 'bg');
    this.player = this.physics.add.image(0, 480, 'gamora_walk').setOrigin(0, 0);

    this.cursors = this.input.keyboard.createCursorKeys();

   

  }

  update() {
    // Add your conditional statements below:
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160);
    } else {
      this.player.setVelocityX(0);
    }
    this.anims.create({
      key: 'gamora_walk',
      frames: this.anims.generateFrameNumbers('gamora'),
      frameRate: 20,
      repeat: -1,
    });
  }
}
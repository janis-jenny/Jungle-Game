import Phaser from 'phaser';
import bg from '../assets/bg.png'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // load images
    /* this.load.spritesheet('tyga', 
        'assets/tyga_walk.png',
        { frameWidth: 32, frameHeight: 48 }
    ); */
    this.load.image('bg', bg);
    // this.load.crossOrigin = true;
  }

  create() {
    // super.create();
    this.add.image(400, 300, 'bg');

    /* this.anims.create({
      key: 'tyga',
      frames: this.anims.generateFrameNumbers('dude'),
      frameRate: 20,
      repeat: -1,
    }); */

  }
}
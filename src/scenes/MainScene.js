import Phaser from 'phaser';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload() {
    // load images
    /* this.load.image('logo', '');
    this.load.spritesheet('tyga', 
        'assets/tyga_walk.png',
        { frameWidth: 32, frameHeight: 48 }
    ); */
    this.load.image('bg', 'assets/bg.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
    this.add.sprite(40, 80, 'tyga');
    this.add.image(200, 200, 'bg');
  }
}
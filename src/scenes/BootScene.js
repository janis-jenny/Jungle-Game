import Phaser from 'phaser';
// import sceneoptions from '../config/sceneoptions';
import bg from '../assets/boot-background.png';
// import gamoraBoot from '../assets/boot_gamora.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'Boot' });
  }

  preload() {
    this.load.image('boot-background', bg);
  }

  create() {
    this.add.image(0, 0, 'boot-background').setScale(2.5);
    this.scene.start('MainScene');
  }
}
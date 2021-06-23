import Phaser from 'phaser';
import bg from '../assets/boot-background.png';
import { gameState } from './MainScene';
import gamoraBoot from '../assets/boot_gamora.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'Boot',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
    });
  }

  preload() {
    this.load.image('boot-background', bg);
    this.load.spritesheet('boot_gamora', gamoraBoot, { frameWidth: 40, frameHeight: 36 });
  }

  create() {
    this.add.image(690, 290, 'boot-background').setScale(2.5);
    const playerNameInput = document.querySelector('#playerName');
    playerNameInput.classList.add('hide');
    gameState.player = this.physics.add.sprite(320, 450, 'boot_gamora').setScale(2.8);
    gameState.player.setVelocityY(0);

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers('boot_gamora', { start: 0, end: 11 }),
      frameRate: 4,
      repeat: 0,
    });
    gameState.player.play('walk');
    this.tweens.add({
      targets: gameState.player,
      x: 920,
      duration: 3000,
      ease: 'Linear',
      delay: 1000,
    });

    this.input.manager.enabled = true;
    this.input.once('pointerdown', function () {
      this.scene.start('Preloader');
      playerNameInput.classList.remove('hide');
    }, this);
  }
}
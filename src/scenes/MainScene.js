import Phaser from 'phaser';
import bg from '../assets/bg.png'
import gamoraWalk from '../assets/gamora_walk.png'
import platform1 from '../assets/platform1.png'
import platform2 from '../assets/platform2.png'
import platform3 from '../assets/platform3.png'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  preload() {
    // load images
    
    this.load.image('bg', bg);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 32, frameHeight: 48 });
    this.load.image('platform1', platform1);

  }


  create() {
    // super.create();
    this.add.image(400, 300, 'bg');
    this.player = this.physics.add.image(250, 380, 'gamora_walk').setScale(2);
    

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(160, 580, 'platform1').setScale(.5).refreshBody();
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

  /* this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });

  this.anims.create({
      key: 'turn',
      frames: [ { key: 'gamora_walk', frame: 4 } ],
      frameRate: 20
  }); */

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: -1
  });
    
    

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
    
  }
}
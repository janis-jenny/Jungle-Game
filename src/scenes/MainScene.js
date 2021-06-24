/* eslint-disable class-methods-use-this */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
import Phaser from 'phaser';
import sceneoptions from '../config/sceneoptions';
import bg from '../assets/bg.png';
import gamoraWalk from '../assets/gamora_walk.png';
import platform1 from '../assets/bigplatform1.png';
import platform2 from '../assets/platform2.png';
import platform3 from '../assets/platform3.png';
import coin from '../assets/coin.png';
import tresure from '../assets/chest.png';
import orc1 from '../assets/orc.png';
import orc2 from '../assets/orcHunter.png';
import orc3 from '../assets/orcWarrior.png';
import tree1 from '../assets/tree1.png';
import tree2 from '../assets/tree2.png';
import tree3 from '../assets/tree3.png';
import tree4 from '../assets/tree4.png';
import tree5 from '../assets/tree5.png';
import tree6 from '../assets/tree6.png';
import bush1 from '../assets/bush1.png';
import bush2 from '../assets/bush2.png';
import bush3 from '../assets/bush3.png';
import flower from '../assets/flower.png';
import sign from '../assets/sign.png';
import stone from '../assets/sign.png';

export const gameState = {
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
    this.levelKey = MainScene;
  }

  preload() {
    this.load.image('bg', bg);
    this.load.image('bigplatform1', platform1);
    this.load.image('platform2', platform2);
    this.load.image('platform3', platform3);
    this.load.spritesheet('gamora_walk', gamoraWalk, { frameWidth: 30, frameHeight: 32 });
    this.load.spritesheet('coin', coin, { frameWidth: 9.5, frameHeight: 10 });
    this.load.spritesheet('chest', tresure, { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('orc1', orc1, { frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet('orc2', orc2, { frameWidth: 48, frameHeight: 64 });
    this.load.spritesheet('orc3', orc3, { frameWidth: 48, frameHeight: 64 });
    this.load.image('tree1', tree1);
    this.load.image('tree2', tree2);
    this.load.image('tree3', tree3);
    this.load.image('tree4', tree4);
    this.load.image('tree5', tree5);
    this.load.image('tree6', tree6);
    this.load.image('bush1', bush1);
    this.load.image('bush2', bush2);
    this.load.image('bush3', bush3);
  }

  create() {
    gameState.active = true;
    this.add.image(630, 292, 'bg');

    const platforms = this.physics.add.staticGroup();
    gameState.platforms = this.physics.add.staticGroup();

    const trees = this.physics.add.staticGroup();
    trees.create(450, 430, 'tree1').setScale(0.5).refreshBody();
    trees.create(1100, 430, 'tree2').setScale(0.5).refreshBody();
    trees.create(1690, 430, 'tree3').setScale(0.5).refreshBody();

    const bush = this.physics.add.staticGroup();

    const trees1Positions = [
      { x: 1190, y: 470 }, { x: 1620, y: 480 }, { x: 1760, y: 470 },
    ];
    trees1Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree4').setScale(0.3).refreshBody();
    });

    const trees2Positions = [
      { x: 490, y: 480 }, { x: 1160, y: 487 }, { x: 1670, y: 480 },
    ];
    trees2Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree5').setScale(0.2).refreshBody();
    });

    const trees3Positions = [
      { x: 530, y: 477 }, { x: 400, y: 482 }, { x: 1050, y: 485 },
    ];
    trees3Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree6').setScale(0.3).refreshBody();
    });

    const trees4Positions = [
      { x: 230, y: 290 }, { x: 340, y: 290 }, { x: 440, y: 75 }, { x: 630, y: 375 },
      { x: 870, y: 220 }, { x: 1060, y: 160 }, { x: 1240, y: 290 }, { x: 1450, y: 75 },
      { x: 1870, y: 375 },
    ];
    trees4Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree5').setScale(0.3).refreshBody();
    });

    const trees5Positions = [
      { x: 250, y: 296 }, { x: 530, y: 75 }, { x: 660, y: 367 }, { x: 840, y: 228 },
      { x: 1350, y: 289 }, { x: 1972, y: 370 }, { x: 1526, y: 89 },
    ];
    trees5Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree4').setScale(0.3).refreshBody();
    });

    const trees6Positions = [
      { x: 497, y: 87 }, { x: 735, y: 367 }, { x: 950, y: 228 }, { x: 1150, y: 160 },
      { x: 1280, y: 295 }, { x: 1560, y: 80 },
    ];
    trees6Positions.forEach(plat => {
      trees.create(plat.x, plat.y, 'tree6').setScale(0.3).refreshBody();
    });

    const bush1Positions = [
      { x: 76, y: 438 }, { x: 960, y: 490 }, { x: 1100, y: 180 },
    ];
    bush1Positions.forEach(plat => {
      bush.create(plat.x, plat.y, 'bush1').setScale(0.4).refreshBody();
    });

    const bush2Positions = [
      { x: 296, y: 490 }, { x: 2150, y: 245 },
    ];
    bush2Positions.forEach(plat => {
      bush.create(plat.x, plat.y, 'bush2').setScale(0.4).refreshBody();
    });

    const bush3Positions = [
      { x: 576, y: 495 }, { x: 1260, y: 490 }, { x: 1950, y: 490 },
    ];
    bush3Positions.forEach(plat => {
      bush.create(plat.x, plat.y, 'bush3').setScale(0.4).refreshBody();
    });

    const plat1Positions = [
      { x: 340, y: 585 }, { x: 580, y: 585 }, { x: 1010, y: 585 }, { x: 1250, y: 585 },
      { x: 1660, y: 585 }, { x: 1900, y: 585 }, { x: 2200, y: 330 },
    ];
    plat1Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'bigplatform1').setScale(0.4).refreshBody();
    });

    const plat3Positions = [
      { x: 70, y: 585 },
    ];
    plat3Positions.forEach(plat => {
      platforms.create(plat.x, plat.y, 'platform3').setScale(0.6).refreshBody();
    });

    gameState.player = this.physics.add.sprite(90, 420, 'gamora_walk').setScale(1.5);
    gameState.player.body.debug = true;

    gameState.exit = this.physics.add.sprite(2250, 200, 'chest').setScale(1.5);

    gameState.enemy1 = this.physics.add.sprite(320, 400, 'orc1');
    gameState.enemy2 = this.physics.add.sprite(990, 400, 'orc2');
    gameState.enemy3 = this.physics.add.sprite(1640, 400, 'orc3');

    this.createAnimations();
    this.levelSetup();

    // set Cameras here
    this.cameras.main.setBounds(0, 0, gameState.width, gameState.height, true, true, true, false);
    this.physics.world.setBounds(0, 0, gameState.width, gameState.height, true, true, true, false);
    this.cameras.main.startFollow(gameState.player, true, 0.5, 0.5);
    gameState.player.setCollideWorldBounds(true, true, true, false);

    // Makes a collision between the character and the platforms
    this.physics.add.collider(gameState.player, platforms);
    this.physics.add.collider(gameState.player, gameState.platforms);
    this.physics.add.collider(gameState.enemy1, platforms);
    this.physics.add.collider(gameState.enemy2, platforms);
    this.physics.add.collider(gameState.enemy3, platforms);

    gameState.player.body.bounce.y = 0.2;

    gameState.cursors = this.input.keyboard.createCursorKeys();

    const coins = this.physics.add.group({
      key: 'coin',
      repeat: 48,
      setXY: { x: 200, y: 0, stepX: 39 },
    });

    coins.children.iterate((child) => {
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
    gameState.enemy2.anims.play('orc2Alert');
    gameState.enemy3.anims.play('orc3Alert');

    // makes an overlap event for when the player gets an item
    this.physics.add.overlap(gameState.player, coins, this.collectCoin, null, this);

    this.physics.add.overlap(gameState.player, gameState.exit, () => {
      // Add in the collider that will fade out to the next level here
      this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
        if (progress > 0.9) {
          this.scene.restart(this.levelKey);
        }
      });
    }, null, this);
    // Adding events to interact with the character
    this.input.keyboard.on('keydown-UP', this.jump, this);
    this.input.on('pointerdown', this.jump, this);

    // Sets the jumps to 0 for the double jump
    this.jumps = 0;

    gameState.moveTween = this.tweens.add({
      targets: [gameState.enemy1, gameState.enemy2, gameState.enemy3],
      props: {
        x: { value: '+=250', duration: 3000, ease: 'Power2' },
      },
      yoyo: true,
      repeat: -1,
    });

    this.physics.add.overlap(gameState.player,
      [gameState.enemy1, gameState.enemy2, gameState.enemy3], function () {
      // Add in the collider that will fade out to the next level here
        this.cameras.main.shake(290, 0.01, false);
        this.add.text(1120, 100, 'Game Over', { fontSize: '24px', fill: '#000000' });
        this.cameras.main.fade(800, 0, 0, 0, false, function (camera, progress) {
          if (progress > 0.9) {
            this.scene.start('GameOver');
          } else {
            gameState.player.body.setVelocityY(-200);
            gameState.player.setTint(0xff0000);
            gameState.player.anims.play('idle');
          }
        });
      }, null, this);
  }

  createPlatform(xIndex, yIndex) {
    // Creates a platform evenly spaced along the two indices.
    // If either is not a number it won't make a platform
    if (typeof yIndex === 'number' && typeof xIndex === 'number') {
      gameState.platforms.create((205 * xIndex), yIndex * 70, 'platform2').setOrigin(0, 0.5).setScale(0.3).refreshBody();
    }
  }

  createAnimations() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: [{ key: 'gamora_walk', frame: 4 }],
      frameRate: 0.4,
      repeat: -1,
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('gamora_walk', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('coin', {
        start: 0,
        end: 3,
      }),
      frameRate: 15,
      yoyo: true,
      repeat: -1,
    });
    this.anims.create({
      key: 'movement',
      frames: this.anims.generateFrameNumbers('chest', { start: 0, end: 3 }),
      frameRate: 10,
      yoyo: true,
      repeat: -1,
    });
    this.anims.create({
      key: 'orc1Alert',
      frames: this.anims.generateFrameNumbers('orc1', { start: 3, end: 5 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'orc2Alert',
      frames: this.anims.generateFrameNumbers('orc2', { start: 3, end: 5 }),
      frameRate: 4,
      repeat: -1,
    });
    this.anims.create({
      key: 'orc3Alert',
      frames: this.anims.generateFrameNumbers('orc3', { start: 3, end: 5 }),
      frameRate: 4,
      repeat: -1,
    });
  }

  levelSetup() {
    for (const [xIndex, yIndex] of this.heights.entries()) {
      // call createPlatform here with xIndex and yIndex
      this.createPlatform(xIndex, yIndex);
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

    if (gameState.cursors.up.isDown && gameState.player.body.touching.down) {
      gameState.player.setVelocityY(-350);
      this.jumps = 0;
    }

    if (gameState.player.y > gameState.height) {
      this.cameras.main.shake(240, 0.01, false, function (camera, progress) {
        if (progress > 0.9) {
          this.scene.start('GameOver');
        }
      });
    }
  }

  jump() {
    if (gameState.player.body.touching.down || this.jumps < 2) {
      gameState.player.setVelocityY(sceneoptions.jumpForce * -1);
      this.jumps += 1;
    }
  }

  collectCoin(player, coin) {
    coin.disableBody(true, true);
    player.refreshBody();
    this.sys.game.globals.score += 100;
    gameState.scoreText.setText(`Score: ${this.sys.game.globals.score}`);
  }
}

export default class GamoraBoot {
  static dinoRunPreload(obj) {
    obj.load.image('run1', run1);
    obj.load.image('run2', run2);
    obj.load.image('run3', run3);
    obj.load.image('run4', run4);
    obj.load.image('run5', run5);
    obj.load.image('run6', run6);
    obj.load.image('run7', run7);
    obj.load.image('run8', run8);
  }

  static dinoRunAnimation(obj) {
    obj.anims.create({
      key: 'run',
      frames: [
        { key: 'run1', frame: null },
        { key: 'run2', frame: null },
        { key: 'run3', frame: null },
        { key: 'run4', frame: null },
        { key: 'run5', frame: null },
        { key: 'run6', frame: null },
        { key: 'run7', frame: null },
        { key: 'run8', frame: null },
      ],
      repeat: -1,
      frameRate: 8,
    });
  }
}
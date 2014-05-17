var Player = require('../prefabs/player');
var InputKeyboard = require('../prefabs/inputKeyboard');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var config = {
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN
    };
    var config2 = {
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S
    };
    this.command = new InputKeyboard(this.game, 0, 0,config);
    this.player = new Player(this.command, this.game, 0,0, undefined);
    this.command2 = new InputKeyboard(this.game, 0, 0,config2);
    this.player2 = new Player(this.command2, this.game, 100,100, undefined);


    this.game.add.existing(this.player);
    this.game.add.existing(this.command);
    this.game.add.existing(this.player2);
    this.game.add.existing(this.command2);

  },
  update: function() {
    
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
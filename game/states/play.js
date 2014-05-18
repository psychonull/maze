var Player = require('../prefabs/player'),
  InputKeyboard = require('../prefabs/inputKeyboard'),
  keyboardKeys = require('../data/keyboard'), 
  Maze = require('../prefabs/maze');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#FFFFFF';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var keys = keyboardKeys();
    var ships = ["green", "blue", "red", "yellow", "pink"];

    for(var i=0; i<ships.length; i++){
      var comm = new InputKeyboard(this.game, 0, 0, keys[i]);
      this.game.add.existing(comm);
      this.game.add.existing(new Player(comm, this.game, i*10, i*10, 'players', ships[i]));
    }

    this.maze = new Maze(this.game, 11, 11, 64, 1);//this.game.height / 50, this.game.width / 50);
    this.game.add.existing(this.maze);
  },
  update: function() {
    
  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
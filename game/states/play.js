var Player = require('../prefabs/player'),
  InputKeyboard = require('../prefabs/inputKeyboard'),
  InputGamePad = require('../prefabs/inputGamePad'),
  keyboardKeys = require('../data/keyboard'), 
  Gamepad = require('../data/gamepad'),
  Maze = require('../prefabs/maze');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#FFFFFF';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var keys = keyboardKeys();
    var pads = Gamepad();
    var ships = ["green", "blue", "red", "yellow", "pink"];
    this.players = [];

    this.maze = new Maze(this.game, 11, 11, 64, 1);//this.game.height / 50, this.game.width / 50);
    this.game.add.existing(this.maze);

    //Game pad controllers
    // var comm = new InputGamePad(this.game,0,0,pads[0]);
    // this.game.add.existing(comm);
    // this.players.push(this.game.add.existing(new Player(comm, this.game, 0, 0, 'players', ships[0])));

    // var comm2 = new InputGamePad(this.game,0,0,pads[1]);
    // this.game.add.existing(comm2);
    // this.players.push(this.game.add.existing(new Player(comm2, this.game, 0, 0, 'players', ships[1])));
    

    for(var i=0; i<ships.length; i++){
      var comm = new InputKeyboard(this.game, 0, 0, keys[i]);
      this.game.add.existing(comm);
      this.players.push(
        this.game.add.existing(new Player(comm, this.game, i*10, i*10, 'players', ships[i]))
      );
    }

    
  },
  update: function() {
    this.game.physics.arcade.collide(this.players[0], this.maze);
    this.game.physics.arcade.collide(this.players[1], this.maze);
    this.game.physics.arcade.collide(this.players[2], this.maze);
    this.game.physics.arcade.collide(this.players[3], this.maze);
    this.game.physics.arcade.collide(this.players[4], this.maze);
  },
  clickListener: function() {
    this.game.state.start('gameover');
  },
  render: function(){
    /*
    var self = this;
      this.maze.children.forEach(function(x){
        self.game.debug.body(x);

      });
*/
  }
};

module.exports = Play;
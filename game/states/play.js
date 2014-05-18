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
    this.players = this.game.add.group();

    for(var i=0; i<ships.length; i++){
      var comm = new InputKeyboard(this.game, 0, 0, keys[i]);
      this.game.add.existing(comm);
      this.players.add(new Player(comm, this.game, i*10, i*10, 'players', ships[i]));
    }

    this.maze = new Maze(this.game, 22, 22, 64, 1);
    this.game.add.existing(this.maze);
  },
  update: function() {
    this.game.physics.arcade.collide(this.players, this.maze, function(){}, this.collidePlayerVsMaze);
    this.game.physics.arcade.collide(this.players, this.players, function(){}, this.collidePlayerVsPlayer);
  },
  clickListener: function() {
    this.game.state.start('gameover');
  },
  render: function(){

  },

  collidePlayerVsMaze: function(p, m){
    var pCollisionCircle = new Phaser.Circle(p.body.center.x, p.body.center.y, 28);
    var mCollisionRectangle = new Phaser.Rectangle(
      m.x + m.body.offset.x, 
      m.y + m.body.offset.y,
      m.body.width,
      m.body.height
    );
    return Phaser.Circle.intersectsRectangle(pCollisionCircle, mCollisionRectangle);
  },
  collidePlayerVsPlayer: function(p1, p2){
    var p1CollisionCircle = new Phaser.Circle(p1.body.center.x, p1.body.center.y, 28);
    var p2CollisionCircle = new Phaser.Circle(p2.body.center.x, p2.body.center.y, 28);
    return Phaser.Circle.intersects(p1CollisionCircle, p2CollisionCircle);
  }
  
};

module.exports = Play;
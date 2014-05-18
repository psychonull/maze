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
    this.players = this.game.add.group();

    this.maze = new Maze(this.game, 10, 10, 64, 1);//this.game.height / 50, this.game.width / 50);
    this.game.add.existing(this.maze);
    var endingPosition = this.maze.getEndingPoint();
    this.gameGoal = this.game.add.sprite(endingPosition.x, endingPosition.y,'yeoman');
    this.game.add.existing(this.gameGoal);
    this.game.physics.arcade.enable(this.gameGoal);
    this.gameGoal.physicsBodyType = Phaser.Physics.ARCADE;
    this.gameGoal.body.immovable = true;
    //Game pad controllers
    // var comm = new InputGamePad(this.game,0,0,pads[0]);
    // this.game.add.existing(comm);
    // this.players.push(this.game.add.existing(new Player(comm, this.game, 0, 0, 'players', ships[0])));

    // var comm2 = new InputGamePad(this.game,0,0,pads[1]);
    // this.game.add.existing(comm2);
    // this.players.push(this.game.add.existing(new Player(comm2, this.game, 0, 0, 'players', ships[1])));
    

    for(var i=1; i<3; i++){
      var comm = new InputKeyboard(this.game, 0, 0, keys[i]);
      this.game.add.existing(comm);
      this.players.add(new Player(comm, this.game, i*10, i*10, 'players', ships[i]));
    }

  },
  update: function() {
    this.game.physics.arcade.collide(this.players, this.maze, function(){}, this.collidePlayerVsMaze);
    this.game.physics.arcade.collide(this.players, this.players, function(){}, this.collidePlayerVsPlayer);
    this.game.physics.arcade.collide(this.players, this.gameGoal, this.gameEnd.bind(this))
  },
  gameEnd: function() {
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
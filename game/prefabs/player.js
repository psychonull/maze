'use strict';

var Player = function(command, game, x, y, index) {
  Phaser.Sprite.call(this, game, x, y, 'players' , 0);

  var bugs = ["black", "green", "brown", "violet", "red"];

  this.command = command;
  this.game = game;
  this.game.physics.arcade.enable(this);

  this.scale.x = 0.5;
  this.scale.y = 0.5;

  var anims = [];
  var idx = index*4;
  for(var i=idx; i<idx+4; i++){
    anims.push(i);
  }

  this.animations.add('moving', anims, true);
  this.animations.play('moving', 10, true);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {  
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.body.angularVelocity = 0;
  this.anchor.setTo(0.5,0.5);

  this.game.physics.arcade.velocityFromAngle(this.angle, 100, this.body.velocity);

  if (this.command.Left)
  {
      this.body.angularVelocity = -300;
      this.command.Left = false;
  }
  if (this.command.Right)
  {
      this.body.angularVelocity = 300;
      this.command.Right = false;
  }

   if (this.command.Down)
  {
       this.game.physics.arcade.velocityFromAngle(this.angle, 50, this.body.velocity);
       this.command.Down = false;
  }

  if (this.command.Up)
  {
  	  this.game.physics.arcade.velocityFromAngle(this.angle, 200, this.body.velocity);
  	  this.command.Up = false;
  }


};

Player.prototype.render = function(){
  //this.game.debug.body(this);
};

module.exports = Player;
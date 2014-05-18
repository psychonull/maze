'use strict';

var Player = function(command, game, x, y, key, frame) {
  Phaser.Sprite.call(this, game, x, y, key, frame);
  this.command = command;
  this.game = game;
  this.game.physics.arcade.enable(this);

  this.scale.x = 0.35;
  this.scale.y = 0.35;
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


};

Player.prototype.render = function(){
  //this.game.debug.body(this);
};

module.exports = Player;
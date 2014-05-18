'use strict';

var Player = function(command, game, x, y, res) {
  Phaser.Sprite.call(this, game, x, y, res);
  this.command = command;
  this.game = game;
  this.game.physics.arcade.enable(this);
  
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {  
  this.body.velocity.x = 0;
  this.body.velocity.y = 0;
  this.body.angularVelocity = 0;
  this.anchor.setTo(0.5,0.5);

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

  if (this.command.Up)
  {
       this.game.physics.arcade.velocityFromAngle(this.angle, 100, this.body.velocity);
       this.command.Up = false;
  }

   if (this.command.Down)
  {
       this.game.physics.arcade.velocityFromAngle(this.angle, -100, this.body.velocity);
       this.command.Down = false;
  }


};

module.exports = Player;
'use strict';

var InputGamePad = function(game, x, y, config, frame) {
  Phaser.Sprite.call(this, game, x, y, '', frame);
  //this.config = config;
  this.Up = false;
  this.Down = false;
  this.Left = false;
  this.Rigth = false;
  
  game.input.gamepad.start();

  // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
  if(config.pad == "pad1")
    this.pad = game.input.gamepad.pad1;

  if(config.pad == "pad2")
    this.pad = game.input.gamepad.pad2;


  
};

InputGamePad.prototype = Object.create(Phaser.Sprite.prototype);
InputGamePad.prototype.constructor = InputGamePad;

InputGamePad.prototype.update = function() {
  this.Up = false;
  this.Down = false;
  this.Left = false;
  this.Rigth = false;

  if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
  {
      this.Left = true;
  }
  else if (this.pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
  {
      this.Right = true;
  }

  if (this.pad.justPressed(Phaser.Gamepad.XBOX360_A))
  {
      this.Up = true;
  }

   if (this.pad.justPressed(Phaser.Gamepad.XBOX360_B))
  {
      this.Down = true;
  }  
  
};

module.exports = InputGamePad;
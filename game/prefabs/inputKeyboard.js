'use strict';

var InputKeyboard = function(game, x, y, config, frame) {
  Phaser.Sprite.call(this, game, x, y, '', frame);
  this.config = config;
  this.Up = false;
  this.Down = false;
  this.Left = false;
  this.Rigth = false;
  

  
};

InputKeyboard.prototype = Object.create(Phaser.Sprite.prototype);
InputKeyboard.prototype.constructor = InputKeyboard;

InputKeyboard.prototype.update = function() {
  this.Up = false;
  this.Down = false;
  this.Left = false;
  this.Rigth = false;

  if (this.game.input.keyboard.isDown(this.config.left))
  {
      this.Left = true;
  }
  else if (this.game.input.keyboard.isDown(this.config.right))
  {
      this.Right = true;
  }

  if (this.game.input.keyboard.isDown(this.config.up))
  {
      this.Up = true;
  }

   if (this.game.input.keyboard.isDown(this.config.down))
  {
      this.Down = true;
  }
  
  
};

module.exports = InputKeyboard;
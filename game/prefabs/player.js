'use strict';

var Player = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'yeoman', frame);

  // initialize your prefab here
  
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

module.exports = Player;
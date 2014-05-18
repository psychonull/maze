'use strict';
var generator = require('../utils/maze');

var Maze = function(game, width, height, tileSize, scaleSprites) {
  Phaser.Group.call(this, game);
  this.width = width;
  this.height = height;
  this.tileSize = tileSize;
  this.scaleSprites = scaleSprites;
  this.initialize();

};

Maze.prototype = Object.create(Phaser.Group.prototype);
Maze.prototype.constructor = Maze;

Maze.prototype.update = function() {
};

Maze.prototype.initialize = function(){
  this.raw = generator(this.width, this.height);
  var m = this.raw;
  for (var j= 0; j<m.x+1; j++) 
  {   
    for (var k=0; k<m.y+1; k++) 
    {
      var type = '';
      if ( !m.horiz[j][k] && m.verti[j][k] )
      {   
        // only verti is true, so place horizontal line tile
        //map.putTile(2, j+1, k+1);
        type = 'bottom';
        // this.game.add.sprite(j * size, k * size, 'maze', 'bottom');
      }
      else if ( m.horiz[j][k] && !m.verti[j][k] )
      {
        // only horiz is true, so place vertical line tile
        //map.putTile(3, j+1, k+1);
        type = 'right';
        // this.game.add.sprite(j * size, k * size, 'maze', 'right');

      }
      else if ( !m.horiz[j][k] && !m.verti[j][k] && (j<m.x && k<m.y) )
      {
        // both are false, so place horizontal/vertical line tile
        //map.putTile(4, j+1, k+1);
        type = 'corner';
        // this.game.add.sprite(j * size, k * size, 'maze', 'corner');

      }
      else if ( !m.horiz[j][k] && !m.verti[j][k] )
      {
        // both are false outside the maze boundary
        //map.putTile(1, j+1, k+1);
        //this.game.add.sprite(j * size, k * size, 'maze', 'vertical');

      }           
      else
      {
        // both are true, so place empty tile (with corner filled for looks)
        //map.putTile(5, j+1, k+1);
        type = 'cube';
        // this.game.add.sprite(j * size, k * size, 'maze', 'cube');
      }
      if(type){
        //this.add(this.game.add.sprite(j * size, k * size, 'maze', type));
        var sprite = this.create(j * this.tileSize, k * this.tileSize, 'maze', type);
        sprite.scale.x = this.scaleSprites;
        sprite.scale.y = this.scaleSprites;

      }
    }

  }
};

module.exports = Maze;
'use strict';
var generator = require('../utils/maze');

var Maze = function(game, width, height, tileSize, scaleSprites) {
  Phaser.Group.call(this, game);
  this.width = width;
  this.height = height;
  this.tileSize = tileSize;
  this.scaleSprites = scaleSprites;
  this.enableBody = true;
  this.physicsBodyType = Phaser.Physics.ARCADE;
  this.initialize();

};

Maze.prototype = Object.create(Phaser.Group.prototype);
Maze.prototype.constructor = Maze;

Maze.prototype.update = function() {
};

Maze.prototype.render = function(){
  alert(a);

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
        var sprite = this.create((j * this.tileSize) + 16, (k * this.tileSize) + 16, 'maze', type);
        sprite.scale.x = this.scaleSprites;
        sprite.scale.y = this.scaleSprites;
        var col = this.getCollisionByType(type);
        this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        sprite.body.setSize(col.w, col.h, col.x, col.y);
        sprite.body.immovable = true;
        if(type === 'corner'){
          var fixSprite = this.create((j * this.tileSize) + 16, (k * this.tileSize) + 16, '', type);
          this.game.physics.enable(fixSprite, Phaser.Physics.ARCADE);
          var fixCol = this.getCollisionByType('bottom');
          fixSprite.body.setSize(fixCol.w, fixCol.h, fixCol.x, fixCol.y);
          fixSprite.body.immovable = true;
        }
        if(j==0)
        {
          var sprite = this.create((j * this.tileSize) - 48, (k * this.tileSize) + 16, 'maze', 'right');
          sprite.scale.x = this.scaleSprites;
          sprite.scale.y = this.scaleSprites;
          var col = this.getCollisionByType('right');
          this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
          sprite.body.setSize(col.w, col.h, col.x, col.y);
          sprite.body.immovable = true;
        }
        if(k==0)
        {
          var sprite = this.create((j * this.tileSize) + 16, (k * this.tileSize) - 48, 'maze', 'bottom');
          sprite.scale.x = this.scaleSprites;
          sprite.scale.y = this.scaleSprites;
          var col = this.getCollisionByType('bottom');
          this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
          sprite.body.setSize(col.w, col.h, col.x, col.y);
          sprite.body.immovable = true;
        }
        if(j==0 && k==0)
        {
          var sprite = this.create((j * this.tileSize) - 48, (k * this.tileSize) - 48, 'maze', 'cube');
          sprite.scale.x = this.scaleSprites;
          sprite.scale.y = this.scaleSprites;
          var col = this.getCollisionByType('cube');
          this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
          sprite.body.setSize(col.w, col.h, col.x, col.y);
          sprite.body.immovable = true;
        }

      }
    }

  }
};

Maze.prototype.getCollisionByType = function(type){
  if (type === 'right' || type === 'corner'){ // hackin :-{D
    return {
      x: 48,
      y: 0,
      w: 16,
      h: 64
    };
  }
  else if (type === 'bottom'){
    return {
      x: 0,
      y: 48,
      w: 64,
      h: 15
    };
  }
  else if (type === 'cube'){
    return {
      x: 48,
      y: 48,
      w: 16,
      h: 16
    };
  }
  else {
    throw new Error('fuck off');
  }
};



module.exports = Maze;
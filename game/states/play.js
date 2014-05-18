var Player = require('../prefabs/player'),
  InputKeyboard = require('../prefabs/inputKeyboard'),
  keyboardKeys = require('../data/keyboard'), 
  maze = require('../utils/maze');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.stage.backgroundColor = '#FFFFFF';
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    var keys = keyboardKeys();
    var ships = ["green", "blue", "red", "yellow", "pink"];

    for(var i=0; i<ships.length; i++){
      var comm = new InputKeyboard(this.game, 0, 0, keys[i]);
      this.game.add.existing(comm);
      this.game.add.existing(new Player(comm, this.game, i*10, i*10, 'players', ships[i]));
    }

    //var m = maze(Math.floor(this.game.width / 32), Math.floor(this.game.height / 32));//this.game.height / 50, this.game.width / 50);
    var m = maze(11, 11);//this.game.height / 50, this.game.width / 50);
    this.showMaze(m);
  },
  update: function() {
    
  },
  clickListener: function() {
    this.game.state.start('gameover');
  },
  showMaze: function(m){
    console.log(m);
    var sp;
    var scale = 1;
    var size = 64 * scale;
    // loop through horiz and verti arrays to find wall openings for each maze cell
    // for display, the walls are oriented on the bottom/right sides of the tile square
    for (var j= 0; j<m.x+1; j++) 
    {   
      for (var k=0; k<m.y+1; k++) 
      {
        if ( !m.horiz[j][k] && m.verti[j][k] )
        {   
          // only verti is true, so place horizontal line tile
          //map.putTile(2, j+1, k+1);
          sp = this.game.add.sprite(j * size, k * size, 'maze', 'bottom');
        }
        else if ( m.horiz[j][k] && !m.verti[j][k] )
        {
          // only horiz is true, so place vertical line tile
          //map.putTile(3, j+1, k+1);
          sp = this.game.add.sprite(j * size, k * size, 'maze', 'right');
        }
        else if ( !m.horiz[j][k] && !m.verti[j][k] && (j<m.x && k<m.y) )
        {
          // both are false, so place horizontal/vertical line tile
          //map.putTile(4, j+1, k+1);
          sp = this.game.add.sprite(j * size, k * size, 'maze', 'corner');
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
          sp = this.game.add.sprite(j * size, k * size, 'maze', 'cube');
        }     

        if (sp){
          sp.scale.x = scale;
          sp.scale.y = scale;
        }
      }
    }

  }
};

module.exports = Play;
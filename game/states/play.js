var Player = require('../prefabs/player'),
  InputKeyboard = require('../prefabs/inputKeyboard'),
  maze = require('../utils/maze');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    var config = {
      left: Phaser.Keyboard.LEFT,
      right: Phaser.Keyboard.RIGHT,
      up: Phaser.Keyboard.UP,
      down: Phaser.Keyboard.DOWN
    };
    var config2 = {
      left: Phaser.Keyboard.A,
      right: Phaser.Keyboard.D,
      up: Phaser.Keyboard.W,
      down: Phaser.Keyboard.S
    };
    this.command = new InputKeyboard(this.game, 0, 0,config);
    this.player = new Player(this.command, this.game, 0,0, undefined);
    this.command2 = new InputKeyboard(this.game, 0, 0,config2);
    this.player2 = new Player(this.command2, this.game, 100,100, undefined);

    this.game.add.existing(this.player);
    this.game.add.existing(this.command);
    this.game.add.existing(this.player2);
    this.game.add.existing(this.command2);

    //var m = maze(Math.floor(this.game.width / 32), Math.floor(this.game.height / 32));//this.game.height / 50, this.game.width / 50);
    var m = maze(12, 12);//this.game.height / 50, this.game.width / 50);
    this.showMaze(m);
  },
  update: function() {
    
  },
  clickListener: function() {
    this.game.state.start('gameover');
  },
  showMaze: function(m){
    console.log(m);
    var size = 32;
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
          this.game.add.sprite(j * size, k * size, 'maze', 'bottom');
        }
        else if ( m.horiz[j][k] && !m.verti[j][k] )
        {
          // only horiz is true, so place vertical line tile
          //map.putTile(3, j+1, k+1);
          this.game.add.sprite(j * size, k * size, 'maze', 'left');

        }
        else if ( !m.horiz[j][k] && !m.verti[j][k] && (j<m.x && k<m.y) )
        {
          // both are false, so place horizontal/vertical line tile
          //map.putTile(4, j+1, k+1);
          this.game.add.sprite(j * size, k * size, 'maze', 'corner');

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
          this.game.add.sprite(j * size, k * size, 'maze', 'cube');
        }     
      }
    }

  }
};

module.exports = Play;
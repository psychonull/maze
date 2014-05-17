var Player = require('../prefabs/player'),
  maze = require('../utils/maze');

'use strict';
function Play() {}
Play.prototype = {
  create: function() {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.player = new Player(this.game, 0,0);
    this.game.add.existing(this.player);
    this.game.physics.arcade.enable(this.player);
    
    //  This gets it moving
    this.player.body.velocity.setTo(200, 200);
    //  This makes the game world bounce-able
    this.player.body.collideWorldBounds = true;
    //  This sets the this.player bounce energy for the horizontal  and vertical vectors (as an x,y point). "1" is 100% energy return
    this.player.body.bounce.set(0.8);
    this.player.body.gravity.set(0, 180);

    this.sprite = this.game.add.sprite(this.game.width/2, this.game.height/2, 'yeoman');
    this.sprite.inputEnabled = true;
    
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.setTo(1,1);
    this.sprite.body.velocity.x = this.game.rnd.integerInRange(-500,500);
    this.sprite.body.velocity.y = this.game.rnd.integerInRange(-500,500);

    this.sprite.events.onInputDown.add(this.clickListener, this);
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
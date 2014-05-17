var Player = require('../prefabs/player');

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
  },
  update: function() {

  },
  clickListener: function() {
    this.game.state.start('gameover');
  }
};

module.exports = Play;
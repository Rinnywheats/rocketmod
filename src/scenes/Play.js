class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //this.load.image('bullet', './assets/fireball.png');
        this.load.image('bush', './assets/bushe.png');
        this.load.image('bat', './assets/battychan.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('frame', './assets/Frame.png');
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.spritesheet('srollin', './assets/walkin.png', {frameWidth: 70, frameHeight: 95, startFrame: 0, endFrame: 3});
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {

        this.starfield = this.add.tileSprite(
            0,0,640,480, 'starfield'
        ).setOrigin(0,0);

        this.bush = this.add.tileSprite(
            0,0,640,480, 'bush'
        ).setOrigin(0,0);


        this.ship1 = new Ship(
            this,
            100,
            200,
            'spaceship'
        );

        this.batship = new batship(
            this,
            100,
            125,
            'bat'
        )

        this.ship2 = new Ship(
            this,
            300,
            240,
            'spaceship'
        );

        this.ship3 = new Ship(
            this,
            380,
            300,
            'spaceship'
        );

        
        this.frame = this.add.tileSprite(
            0,0,640,480, 'frame'
        ).setOrigin(0,0);

        
        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - 25,
            'rocket'
        );


        // green UI background
        this.add.rectangle(
            0,
            borderUISize + borderPadding,
            game.config.width,
            borderUISize * 2,
            0x00FF00,
            ).setOrigin(0,0);

        // white borders
	 //   this.add.rectangle(0, 0, game.config.width, borderUISize, 0x006400).setOrigin(0 ,0);
	//    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0x006400).setOrigin(0 ,0);
	//    this.add.rectangle(0, 0, borderUISize, game.config.height, 0x006400).setOrigin(0 ,0);
	 //   this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0x006400).setOrigin(0 ,0);

        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);      

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
            frameRate: 30

});
    // animation walking config
    this.anims.create({
        key: 'sroll',
        frames: this.anims.generateFrameNumbers('srollin', { start: 0, end: 2, first: 0}),
        frameRate: 10,
        repeat: -1
    });

        // initialize score
        this.p1Score = 0;

         // display score
            let scoreConfig = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#afeeee',
                color: '#228B22',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 100
            }
            this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(60000, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
        this.ship1.play('sroll');
        this.ship2.play('sroll');
        this.ship3.play('sroll');
    }

    update() {
          // check key input for restart
         if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
        this.scene.restart();
}
        this.starfield.tilePositionX -= 1;
        this.bush.tilePositionX -= 3;
        if (!this.gameOver) {
        this.p1Rocket.update();
        this.ship1.update();
        this.ship2.update();
        this.ship3.update();
        this.batship.update();
    }
        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);
        this.checkCollisionbat(this.p1Rocket, this.batship);

    }

    checkCollision(rocket, ship) {
        if( rocket.x + rocket.width > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height) {
                ship.alpha = 0;
                this.shipExplode(ship)
                rocket.reset();
                ship.reset();  
        }
    }    
    checkCollisionbat(rocket, ship) {
        if( rocket.x + rocket.width > ship.x &&
            rocket.x < ship.x + ship.width &&
            rocket.y + rocket.height > ship.y &&
            rocket.y < ship.y + ship.height) {
                ship.alpha = 0;
                this.batshipExplode(ship)
                rocket.reset();
                ship.reset();  
        }
    }

    batshipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += 5;
        this.scoreLeft.text = this.p1Score;       
        this.sound.play('sfx_explosion');

        
      }
      
      shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after ani completes
          ship.reset();                       // reset ship position
          ship.alpha = 1;                     // make ship visible again
          boom.destroy();                     // remove explosion sprite
        });
        // score add and repaint
        this.p1Score += 1;
        this.scoreLeft.text = this.p1Score;       
        this.sound.play('sfx_explosion');

        
      }

              //walkin
              shipWalk(ship) {                     
                // create walk sprite at ship's position
                let walkin = this.add.sprite(ship.x, ship.y, 'srollin').setOrigin(0, 0);
                walkin.anims.play('sroll');             // play  animation
                walkin.destroy();
                walkin.on('animationcomplete', () => {    // callback after ani completes
                    walkin.destroy();                     // remove explosion sprite
                  });
          }
}

//POINTS:
//60: Redesigned art, UI, and sound
//10: Parralaxing!
//10: animated shipe
//20: new ship! Batty-chan!
//dragon and sfx Oracle of Seasons, nintendo
//bat, Castlevania, Konami
//player sprite: myself

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyLEFT, keyRIGHT, keyF, keyR;

//My name is Ashley Chapp! This is Rocket Patrol Mod, 4/16!
// This took me roughly ten hours.
//POINTS:
//60: Redesigned art, UI, and sound
//10: Parralaxing!
//10: animated shipe
//20: new ship! Batty-chan!
//dragon and sfx Oracle of Seasons, nintendo
//bat, Castlevania, Konami
//player sprite: myself



class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {
        // load audio
        this.load.audio('sfx_explosion', './assets/explosionsfx.wav');
      }
     create() {
        this.add.text(210,20, "Rocket Patrol Main Menu");
        this.add.text(120,220, "Use the arrow keys to move, and F to fire!");
        this.add.text(250,250, "Shoot to start!");
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.start('playScene');
         }
    }
}
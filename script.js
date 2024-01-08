
class Game extends Phaser.Scene {
    player
    cursors
    spaceKey

    constructor() {
        super({ key: "game" });
    };
    preload() {
        this.load.spritesheet('player', './male.png', { frameWidth: 80, frameHeight: 110 });
    }
    create() {
        this.player = this.physics.add.sprite(100, 300, 'player');
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
			key: 'up',
			frames: [ { key: 'player', frame: 1 } ] ,
			frameRate: 20,
		})

        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update() {
        if (this.player.body.velocity.x < 0) {
			this.player.flipX = true; // Sola hareket ederken görüntüyü aynala
		} else if (this.player.body.velocity.x > 0) {
			this.player.flipX = false; // Sağa hareket ederken görüntüyü eski haline getir
		}

        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.player.body.blocked.down && this.spaceKey.isDown || this.player.body.blocked.down && this.cursors.up.isDown) {
			this.player.setVelocityY(-330);
            this.player.anims.play('up', true);
		}
    }
};

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    scene: [Game]
};

const game = new Phaser.Game(config);

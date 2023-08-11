

class TestScene extends Phaser.Scene {

    constructor() {
        super({ key: "TestScene" });
    }

    preload() {
        //this.load.image("logo", "src/assets/images/obst/bush1.png");

    }

    create() {
        let loadData = null;

        //this.image = this.add.image(400, 300, "logo");

        this.label = this.add.text(640, 360, "", { fontFamily: "Arial", fontSize: 24, color: "white" });

        this.input.on("pointerdown", function() {
            console.log("Clicked");

            saveGame({hello: "world"}, null);

        }, this);

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.spaceKey.on("down", function() {
            console.log("Clicked");

            loadGame({hello: "world"}, function(_data) {
                loadData = _data;

                console.log(loadData);
            });

        }, this);
    }
}
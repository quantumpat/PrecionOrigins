
const keys = [
    {
        key: "backspace",
        code: 8
    },
    {
        key: "tab",
        code: 9
    },
    {
        key: "enter",
        code: 13
    },
    {
        key: "shift",
        code: 16
    },
    {
        key: "ctrl",
        code: 17
    },
    {
        key: "alt",
        code: 18
    },
    {
        key: "pause/break",
        code: 19
    },
    {
        key: "caps-lock",
        code: 20
    },
    {
        key: "escape",
        code: 27
    },
    {
        key: "page-up",
        code: 33
    },
    {
        key: "page-down",
        code: 34
    },
    {
        key: "end",
        code: 35
    },
    {
        key: "home",
        code: 36
    },
    {
        key: "left-arrow",
        code: 37
    },
    {
        key: "up-arrow",
        code: 38
    },
    {
        key: "right-arrow",
        code: 39
    },
    {
        key: "down-arrow",
        code: 40
    },
    {
        key: "insert",
        code: 45
    },
    {
        key: "delete",
        code: 46
    },
    {
        key: "0",
        code: 48
    },
    {
        key: "1",
        code: 49
    },
    {
        key: "2",
        code: 50
    },
    {
        key: "3",
        code: 51
    },
    {
        key: "4",
        code: 52
    },
    {
        key: "5",
        code: 53
    },
    {
        key: "6",
        code: 54
    },
    {
        key: "7",
        code: 55
    },
    {
        key: "8",
        code: 56
    },
    {
        key: "9",
        code: 57
    },
    {
        key: "a",
        code: 65
    },
    {
        key: "b",
        code: 66
    },
    {
        key: "c",
        code: 67
    },
    {
        key: "d",
        code: 68
    },
    {
        key: "e",
        code: 69
    },
    {
        key: "f",
        code: 70
    },
    {
        key: "g",
        code: 71
    },
    {
        key: "h",
        code: 72
    },
    {
        key: "i",
        code: 73
    },
    {
        key: "j",
        code: 74
    },
    {
        key: "k",
        code: 75
    },
    {
        key: "l",
        code: 76
    },
    {
        key: "m",
        code: 77
    },
    {
        key: "n",
        code: 78
    },
    {
        key: "o",
        code: 79
    },
    {
        key: "p",
        code: 80
    },
    {
        key: "q",
        code: 81
    },
    {
        key: "r",
        code: 82
    },
    {
        key: "s",
        code: 83
    },
    {
        key: "t",
        code: 84
    },
    {
        key: "u",
        code: 85
    },
    {
        key: "v",
        code: 86
    },
    {
        key: "w",
        code: 87
    },
    {
        key: "x",
        code: 88
    },
    {
        key: "y",
        code: 89
    },
    {
        key: "z",
        code: 90
    }
];

    /*left window key     91
right window key    92
select key  93
numpad 0    96
numpad 1    97
numpad 2    98
numpad 3    99
numpad 4    100
numpad 5    101
numpad 6    102
numpad 7    103
numpad 8    104
numpad 9    105
multiply    106
add     107
subtract    109
decimal point   110
divide  111
num lock    144
scroll lock     145
semi-colon  186
equal sign  187
comma   188
dash    189
period  190
forward slash   191
grave accent    192
open bracket    219
back slash  220
close braket    221
single quote    222
]
*/


class GameControls {

    /*
     * Constructor
     */
    constructor(scene, controlledSprite) {

        this.scene = scene;

        this.controlsEnabled = false;

        this.controlledSprite = controlledSprite;

        this.hasSprintEverBeenPressed = false;

        this.moveUp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.moveDown = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.moveLeft = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.moveRight = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.sprint = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.lamp = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.talk = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        this.controlHintBar = scene.uiScene.add.image(0, 720, "img-ui-bottom-bar");
        this.controlHintBar.setOrigin(0, 1);
        this.controlHintBar.setScrollFactor(0);
        this.controlHintBar.setDepth(10000000);
        this.controlHintBar.setAlpha(0.5);
        this.controlHintBar.setVisible(false);

        this.controlHintLabel = scene.uiScene.add.text(640, 706, "", { fontFamily: "pixel1", fontSize: 16, color: "#f0f0f0", align: "right" });
        this.controlHintLabel.setOrigin(0.5, 1);
        this.controlHintLabel.setScrollFactor(0);
        this.controlHintLabel.setDepth(100000001);
        this.controlHintLabel.setVisible(false);

        scene.input.keyboard.on("keydown", event => {
            if (!this.controlsEnabled) {
                return;
            }

            if (event.keyCode == this.lamp.keyCode) {
                this.controlledSprite.setLampOn(!this.controlledSprite.isLampOn);
            }

            if (event.keyCode == this.talk.keyCode) {

                if (this.scene.conversations.getNearestNpc() != null) {

                    this.scene.conversations.start();
                    this.controlledSprite.onTalk(scene);
                    this.hideHint();

                }
            }

        });

    }


    /*
     * Methods
     */
    update() {

        if (!this.controlsEnabled) {
            return;
        }

        if (this.controlledSprite == null) {
            return;
        }

        if (this.sprint.isDown) {
            this.controlledSprite.sprint();
            this.hasSprintEverBeenPressed = true;
        }else {
            this.controlledSprite.walk();
        }

        //move up
        if (this.moveUp.isDown && this.moveDown.isUp && this.moveLeft.isUp && this.moveRight.isUp) {
            this.controlledSprite.moveUp();
        }

        //move down
        if (this.moveUp.isUp && this.moveDown.isDown && this.moveLeft.isUp && this.moveRight.isUp) {
            this.controlledSprite.moveDown();
        }

        //move left
        if (this.moveUp.isUp && this.moveDown.isUp && this.moveLeft.isDown && this.moveRight.isUp) {
            this.controlledSprite.moveLeft();
        }

        //move right
        if (this.moveUp.isUp && this.moveDown.isUp && this.moveLeft.isUp && this.moveRight.isDown) {
            this.controlledSprite.moveRight();
        }
        
        //move up-left
        if (this.moveUp.isDown && this.moveDown.isUp && this.moveLeft.isDown && this.moveRight.isUp) {
            this.controlledSprite.moveUpLeft();
        }

        //move up-right
        if (this.moveUp.isDown && this.moveDown.isUp && this.moveLeft.isUp && this.moveRight.isDown) {
            this.controlledSprite.moveUpRight();
        }

        //move down-left
        if (this.moveUp.isUp && this.moveDown.isDown && this.moveLeft.isDown && this.moveRight.isUp) {
            this.controlledSprite.moveDownLeft();
        }

        //move down-right
        if (this.moveUp.isUp && this.moveDown.isDown && this.moveLeft.isUp && this.moveRight.isDown) {
            this.controlledSprite.moveDownRight();
        }

        //All up
        if (this.moveUp.isUp && this.moveDown.isUp && this.moveLeft.isUp && this.moveRight.isUp) {
            this.controlledSprite.stopMovement();
        }

        //move up-down
        if (this.moveUp.isDown && this.moveDown.isDown && this.moveLeft.isUp && this.moveRight.isUp) {
            this.controlledSprite.stopMovement();
        }

        //move left-right
        if (this.moveUp.isUp && this.moveDown.isUp && this.moveLeft.isDown && this.moveRight.isDown) {
            this.controlledSprite.stopMovement();
        }

    }

    showHint(hint) {

        if (hint == "talk") {

            if (this.controlledSprite.getTalking()) {
                return;
            }

            let key = "NULL";

            for (let i = 0; i < keys.length; i++) {
                if (keys[i].code == this.talk.keyCode) {
                    key = keys[i].key;
                    break;
                }
            }


            this.controlHintLabel.setText("To talk press the \"" + key + "\" key");

            this.controlHintBar.setVisible(true);
            this.controlHintLabel.setVisible(true);

        }

    }

    hideHint() {
        this.controlHintBar.setVisible(false);
        this.controlHintLabel.setVisible(false);
    }


    /*
     * Getters & Setters
     */
    getScene() {
        return this.scene;
    }

    setScene(scene) {
        this.scene = scene;
    }

    getControlsEnabled() {
        return this.controlsEnabled;
    }

    setControlsEnabled(enabled) {
        this.controlsEnabled = enabled;

        if (!enabled) {
            this.controlledSprite.stopMovement();
        }
    }

    getControlledSprite() {
        return this.controlledSprite;
    }

    setControlledSprite(sprite) {
        this.controlledSprite = sprite;
    }

    getHasSprintEverBeenPressed() {
        return this.hasSprintEverBeenPressed;
    }

    getControlHintLabel() {
        return this.controlHintLabel;
    }

}
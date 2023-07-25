
class Item {

    constructor(scene, char, type, name, handImage, iconFrame) {

        this.scene = scene;
        this.char = char;
        this.type = type;
        this.name = name;
        this.handImage = handImage;
        this.iconFrame = iconFrame;

        this.frameUpDown = 0;
        this.frameLeftRight = 0;

        this.isActive = false;

        this.offsetsUp = {
            x: 0,
            y: 0
        };

        this.offsetsDown = {
            x: 0,
            y: 0
        };

        this.offsetsLeft = {
            x: 0,
            y: 0
        };

        this.offsetsRight = {
            x: 0,
            y: 0
        };

        this.image = this.scene.add.sprite(this.char.x, this.char.y, this.handImage, 0);
        this.image.setVisible(false);
        this.image.setScale(scene.worldScale);

    }

    update() {

        if (!this.isActive) {
            return;
        }

        if (this.char.direction == "up" || this.char.direction == "left") {
            this.image.setDepth(this.char.depth - 1);
        }else {
            this.image.setDepth(this.char.depth + 1);
        }

        if (this.char.direction == "up") {
            this.image.setFrame(this.frameUpDown);
            this.image.x = this.char.x + this.offsetsUp.x;
            this.image.y = this.char.y + this.offsetsUp.y;
        }else if (this.char.direction == "down") {
            this.image.setFrame(this.frameUpDown);
            this.image.x = this.char.x + this.offsetsDown.x;
            this.image.y = this.char.y + this.offsetsDown.y;
        }else if (this.char.direction == "left") {
            this.image.setFrame(this.frameLeftRight);
            this.image.x = this.char.x + this.offsetsLeft.x;
            this.image.y = this.char.y + this.offsetsLeft.y;
        }else if (this.char.direction == "right") {
            this.image.setFrame(this.frameLeftRight);
            this.image.x = this.char.x + this.offsetsRight.x;
            this.image.y = this.char.y + this.offsetsRight.y;
        }

    }

    off() {
        this.image.setVisible(false);
        this.isActive = false;
    }

    on() {
        this.image.setVisible(true);
        this.isActive = true;
    }

    setOffsetsUp(x, y) {
        this.offsetsUp.x = x;
        this.offsetsUp.y = y;
    }

    setOffsetsDown(x, y) {
        this.offsetsDown.x = x;
        this.offsetsDown.y = y;
    }

    setOffsetsLeft(x, y) {
        this.offsetsLeft.x = x;
        this.offsetsLeft.y = y;
    }

    setOffsetsRight(x, y) {
        this.offsetsRight.x = x;
        this.offsetsRight.y = y;
    }

    setFrameUpDown(frame) {
        this.frameUpDown = frame;
    }

    setFrameLeftRight(frame) {
        this.frameLeftRight = frame;
    }

}
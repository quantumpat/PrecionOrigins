
class Item {

    constructor(itemManager) {

        this.itemManager = itemManager;
        this.scene = this.itemManager.scene;
        this.char = this.itemManager.char;
        this.type = null;
        this.name = null;
        this.handImage = null;
        this.iconFrame = 0;

        this.frameUpDown = 0;
        this.frameLeftRight = 0;

        this.data = {};

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


    /*
     * Getters & Setters
     */
    getScene() {
        return this.scene;
    }

    setScene(scene) {
        this.scene = scene;
    }

    getChar() {
        return this.char;
    }

    setChar(char) {
        this.char = char;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getHandImage() {
        return this.handImage;
    }

    setHandImage(image) {
        this.handImage = image;
        this.image.setTexture(this.handImage);
    }

    getIconFrame() {
        return this.iconFrame;
    }

    setIconFrame(frame) {
        this.iconFrame = frame;
    }

    getFrameUpDown() {
        return this.frameUpDown;
    }

    setFrameUpDown(frame) {
        this.frameUpDown = frame;
    }

    getFrameLeftRight() {
        return this.frameLeftRight;
    }

    setFrameLeftRight(frame) {
        this.frameLeftRight = frame;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getActive() {
        return this.isActive;
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
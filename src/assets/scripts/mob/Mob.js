

class Mob extends Phaser.Physics.Arcade.Sprite {

    /*
     * Constructor
     */

    constructor(name, scene, x, y, texture) {
        super(scene, x, y);

        this.name = name;

        this.setTexture(texture);
        this.setPosition(x, y);

        this.movements = [];

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.setImmovable(true);

        this.animsKey = "none";

        this.type = "passive";

        this.items = [];

        this.directionalBody = false;
        this.directionalBodyOffsets = {
            leftRight: {
                x: 0,
                y: 0
            },
            upDown: {
                x: 0,
                y: 0
            }
        };
        this.directionalBodySizes = {
            leftRight: {
                width: 0,
                height: 0
            },
            upDown: {
                width: 0,
                height: 0
            }
        };


        this.hasIdleAnimation = false;

        this.walkSpeed = 10;

        this.direction = "down";

        this.isWalking = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.currentMovement = null;
        this.movements = [];

        this.isAttacking = false;

        //Lights
        this.setPipeline("Light2D");

        scene.add.existing(this);

    }


    /*
     * Methods
     */

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.setDepth(this.y);

        if (this.directionalBody) {
            if (this.direction === "left" || this.direction === "right") {
                this.body.setSize(this.directionalBodySizes.leftRight.width, this.directionalBodySizes.leftRight.height);
                this.body.setOffset(this.directionalBodyOffsets.leftRight.x, this.directionalBodyOffsets.leftRight.y);
            }else {
                this.body.setSize(this.directionalBodySizes.upDown.width, this.directionalBodySizes.upDown.height);
                this.body.setOffset(this.directionalBodyOffsets.upDown.x, this.directionalBodyOffsets.upDown.y);
            }
        }

        if (!this.isAttacking && !this.scene.uiScene.isSaving) {
            this.updateWalking();

            this.updateAnimations();
        }else {
            this.body.setVelocity(0, 0);
            this.anims.pause();
        }

    }

    startMovement(name) {

        if (name == null) {
            return;
        }

        for (let i = 0; i < this.movements.length; i++) {
            if (this.movements[i].getName() === name) {
                this.currentMovement = this.movements[i];
                this.currentMovement.start();
            }
        }

    }

    updateWalking() {
        if (this.currentMovement != null) {
            this.currentMovement.update();
        }

        if (this.isWalking.left) {
            this.direction = "left";
            this.body.setVelocityX(-this.walkSpeed);
            this.body.setVelocityY(0);
        }else if (this.isWalking.right) {
            this.direction = "right";
            this.body.setVelocityX(this.walkSpeed);
            this.body.setVelocityY(0);
        }else if (this.isWalking.up) {
            this.direction = "up";
            this.body.setVelocityY(-this.walkSpeed);
            this.body.setVelocityX(0);
        }else if (this.isWalking.down) {
            this.direction = "down";
            this.body.setVelocityY(this.walkSpeed);
            this.body.setVelocityX(0);
        }else if (this.isWalking.left && this.isWalking.up) {
            this.direction = "left";
            this.body.setVelocity(-this.walkSpeed);
        }else if (this.isWalking.left && this.isWalking.down) {
            this.direction = "left";
            this.body.setVelocity(-this.walkSpeed, this.walkSpeed);
        }else if (this.isWalking.right && this.isWalking.up) {
            this.direction = "right";
            this.body.setVelocity(this.walkSpeed, -this.walkSpeed);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.right && this.isWalking.down) {
            this.direction = "right";
            this.body.setVelocity(this.walkSpeed);
        }else {
            this.body.setVelocity(0, 0);
        }
    }

    updateAnimations() {

        if (this.hasIdleAnimation) {

            this.anims.play(this.getAnimationKey(), true);

        }else {
            this.stop();
        }

    }


    /*
     * Getters & Setters
     */

    getAnimationKey() {

        let str = this.animsKey + "-";

        if (this.hasIdleAnimation) {
            if (this.isWalking.left === true || this.isWalking.right === true || this.isWalking.up === true || this.isWalking.down === true) {
                str += "walk-";
            }else {
                str += "idle-";
            }
        }

        str += this.direction;

        return str;

    }

    getAnimsKey() {
        return this.animsKey;
    }

    setAnimsKey(key) {
        this.animsKey = key;
    }

    getType() {
        return this.type;
    }

    setType(type) {
        this.type = type;
    }

    getItems() {
        return this.items;
    }

    setItems(items) {
        this.items = items;
    }

    getDirectionalBody() {
        return this.directionalBody;
    }

    setDirectionBody(value) {
        this.directionalBody = value;
    }

    setDirectionalOffsets(x1 = 0, y1 = 0, x2 = 0, y2 = 0) {
        this.directionalBody = true;
        this.directionalBodyOffsets = {
            leftRight: {
                x: x1,
                y: y1
            },
            upDown: {
                x: x2,
                y: y2
            }
        };
    }

    setDirectionalBodySizes(w1, h1, w2, h2) {
        this.directionalBody = true;
        this.directionalBodySizes = {
            leftRight: {
                width: w1,
                height: h1
            },
            upDown: {
                width: w2,
                height: h2
            }
        };
    }

    getHasIdleAnimation() {
        return this.hasIdleAnimation;
    }

    setHasIdleAnimation(value) {
        this.hasIdleAnimation = value;
    }

    getWalkSpeed() {
        return this.walkSpeed;
    }

    setWalkSpeed(speed) {
        this.walkSpeed = speed;
    }

    getDirection() {
        return this.direction;
    }

    setDirection(dir, updateFrame = false) {
        if (!updateFrame) {
            this.direction = dir;
        }
    }

    getWalking() {
        return this.isWalking;
    }

    setWalking(data) {
        this.isWalking = data;
    }

    getWalkingLeft() {
        return this.isWalking.left;
    }

    setWalkingLeft(left) {
        this.isWalking.left = left;
    }

    getWalkingRight() {
        return this.isWalking.right;
    }

    setWalkingRight(right) {
        this.isWalking.right = right;
    }

    getWalkingUp() {
        return this.isWalking.up;
    }

    setWalkingUp(up) {
        this.isWalking.up = up;
    }

    getWalkingDown() {
        return this.isWalking.down;
    }

    setWalkingDown(down) {
        this.isWalking.down = down;
    }

    getCurrentMovement() {
        return this.currentMovement;
    }

    getAttacking() {
        return this.isAttacking;
    }

}


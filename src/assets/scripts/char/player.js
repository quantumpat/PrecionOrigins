
class Player extends Phaser.Physics.Arcade.Sprite {

    /*
     * Constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y);

        this.setTexture("img-char-player");
        this.setPosition(x, y);
        this.setScale(scene.worldScale);

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        //Body offset & size
        this.body.setSize(10, 3);
        this.body.setOffset(11, 29);

        this.direction = "down";

        this.walkSpeed = 60;
        this.sprintSpeed = 180;
        this.currentSpeed = this.walkSpeed;
        this.distanceMoved = 0;
        this.isSprinting = false;
        this.isStanding = true;

        this.firstName = "Henry";
        this.lastName = "Hartoni";

        this.isLampOn = false;

        this.items = [
            new HandLamp(this.scene, this)
        ];

        this.handItem = null;

        this.currentAnimationKey = "walk-down";

        this.isTalking = false;
        this.onTalk = function(scene) {};

        //Lights
        this.setPipeline("Light2D");
        this.light = scene.lights.addLight(x, y, 250).setIntensity(0.9);
        this.light.setVisible(this.isLampOn);

        //Add to scene
        scene.add.existing(this);
        scene.cameras.main.startFollow(this);

    }

    preUpdate(time, delta) {

        super.preUpdate(time, delta);

        this.scene.gameControls.update();

        this.scene.sound.setListenerPosition(this.x, this.y);

        this.setDepth(Math.round(this.y));

        this.light.setPosition(this.x, this.y + 40);

        if (this.handItem != null) {
            this.handItem.update();
        }

    }

    /*
     * Movement (required by GameControl class)
     */
    sprint() {
        this.isSprinting = true;
        this.currentSpeed = this.sprintSpeed;

        this.hasSprintEverBeenPressed = true;
    }
    walk() {
        this.isSprinting = false;
        this.currentSpeed = this.walkSpeed;
    }
    stopMovement() {

        this.isStanding = true;

        this.setPosition(Math.round(this.x), Math.round(this.y));
        this.setFrame(this.getFrameAltKey());

        this.body.setVelocity(0, 0);

        this.stop();

    }
    moveUp() {
        if (this.isSprinting) {
            this.distanceMoved += 3;
        }else {
            this.distanceMoved += 1;
        }

        this.direction = "up";

        this.body.setVelocity(0, -this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }
    moveDown() {
        if (this.isSprinting) {
            this.distanceMoved += 3;
        }else {
            this.distanceMoved += 1;
        }

        this.direction = "down";

        this.body.setVelocity(0, this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }
    moveLeft() {
        if (this.isSprinting) {
            this.distanceMoved += 3;
        }else {
            this.distanceMoved += 1;
        }

        this.direction = "left";

        this.body.setVelocity(-this.currentSpeed, 0);

        this.play(this.getAnimationKey(), true);

    }
    moveRight() {
        if (this.isSprinting) {
            this.distanceMoved += 3;
        }else {
            this.distanceMoved += 1;
        }

        this.direction = "right";

        this.body.setVelocity(this.currentSpeed, 0);

        this.play(this.getAnimationKey(), true);
    }
    moveUpLeft() {
        if (this.isSprinting) {
            this.distanceMoved += 6;
        }else {
            this.distanceMoved += 2;
        }

        this.direction = "left";

        this.body.setVelocity(-this.currentSpeed, -this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }
    moveUpRight() {
        if (this.isSprinting) {
            this.distanceMoved += 6;
        }else {
            this.distanceMoved += 2;
        }

        this.direction = "right";

        this.body.setVelocity(this.currentSpeed, -this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }
    moveDownLeft() {
        if (this.isSprinting) {
            this.distanceMoved += 6;
        }else {
            this.distanceMoved += 2;
        }

        this.direction = "left";

        this.body.setVelocity(-this.currentSpeed, this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }
    moveDownRight() {
        if (this.isSprinting) {
            this.distanceMoved += 6;
        }else {
            this.distanceMoved += 2;
        }

        this.direction = "right";

        this.body.setVelocity(this.currentSpeed, this.currentSpeed);

        this.play(this.getAnimationKey(), true);
    }


    /*
     * Getters & Setters
     */
    getAnimationKey() {

        let str = "";

        if (this.isSprinting) {
            str = "sprint-";
        }else {
            str = "walk-";
        }

        str += this.direction;

        if (this.handItem != null) {
            if (this.handItem.type == "TOOL") {
                str += "-tool";
            }
        }

        this.currentAnimationKey = str;

        return str;

    }

    getFrameAltKey() {

        if (this.handItem == null) {

            if (this.direction == "up") {
                return 4;
            }else if (this.direction == "down") {
                return 0;
            }else if (this.direction == "left") {
                return 8;
            }else if (this.direction == "right") {
                return 12;
            }

        }else {

            if (this.direction == "up") {
                return 40;
            }else if (this.direction == "down") {
                return 36;
            }else if (this.direction == "left") {
                return 44;
            }else if (this.direction == "right") {
                return 48;
            }

        }

    }

    getDirection() {
        return this.direction;
    }

    setDirection(direction) {
        this.direction = direction;
    }

    getWalkSpeed() {
        return this.walkSpeed;
    }

    getSprintSpeed() {
        return this.sprintSpeed;
    }

    getCurrentSpeed() {
        return this.currentSpeed;
    }

    getDistanceMoved() {
        return this.distanceMoved;
    }

    getSprinting() {
        return this.isSprinting;
    }

    getStanding() {
        return this.isStanding;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getLampOn() {
        return this.isLampOn;
    }

    setLampOn(val) {
        if (val) {
            this.scene.sound.play("audio-item-equip", {
                loop: false,
                volume: 0.6,
                source: {
                    x: 0,
                    y: 0,
                    refDistance: 1000000
                }
            });
            this.setHandItem(this.items[0]);
        }else {
            if (this.handItem != null) {
                this.scene.sound.play("audio-item-equip", {
                    loop: false,
                    volume: 0.6,
                    source: {
                        x: 0,
                        y: 0,
                        refDistance: 1000000
                    }
                });
            }

            this.setHandItem(null);
        }

        this.isLampOn = val;
        this.light.setVisible(this.isLampOn);
    }

    getItems() {
        return this.items;
    }

    setHandItem(item) {
        if (this.handItem != null) {
            this.handItem.off();
        }

        this.handItem = item;

        if (this.handItem != null) {
            this.handItem.on();
        }
    }

    getHandItem() {
        return handItem;
    }

    getCurrentAnimationKey() {
        return this.currentAnimationKey;
    }

    getGameControls() {
        return this.gameControls;
    }

    getTalking() {
        return this.isTalking;
    }

    setTalking(talking) {
        this.isTalking = talking;
    }

    getOnTalk() {
        return this.onTalk;
    }

    setOnTalk(callback) {
        this.onTalk = callback;
    }

    getLight() {
        return this.light;
    }

}



class Player extends Phaser.Physics.Arcade.Sprite {

    /*
     * Constructor
     */
    constructor(scene, x, y) {

        super(scene, x, y);

        this.setTexture("img-char-player");
        this.setPosition(x, y);

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);

        this.setMass(1);

        this.setVisible(false);

        //Always scale the player a little
        this.setScale(1.25);

        //Body offset & size
        this.body.setSize(10, 3);
        this.body.setOffset(11, 29);

        this.direction = "down";

        this.walkSpeed = 20;
        this.sprintSpeed = 60;
        this.currentSpeed = this.walkSpeed;

        this.distanceMoved = 0;

        this.health = 1000;
        this.attackedBy = [];

        this.isSprinting = false;
        this.isStanding = true;

        //Name
        this.firstName = "Henry";
        this.lastName = "Hartoni";

        //Items
        this.isLampOn = false;
        this.items = new ItemManager(this);
        this.handItem = null;

        this.currentAnimationKey = "walk-down";

        this.isTalking = false;
        this.onTalk = function(scene) {};

        //Lights
        this.setPipeline("Light2D");

        //Add to scene
        scene.add.existing(this);
        scene.cameras.main.startFollow(this);

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {

        super.preUpdate(time, delta);

        this.scene.sound.setListenerPosition(this.x, this.y);

        this.setDepth(Math.round(this.y));

        //Controls
        if (this.scene.gameControls != null) {
            if (this.isTalking) {
                this.scene.gameControls.setControlsEnabled(false);
            }else {
                this.scene.gameControls.setControlsEnabled(true);
            }
        }
        this.scene.gameControls.update();

        //Hand item
        if (this.handItem != null) {
            this.handItem.update();
        }

    }

    load(data) {

        this.setVisible(false);

        this.setPosition(data.x, data.y);
        this.setDirection(data.direction);
        this.setLampOn(data.isLampOn);
        this.setHealth(data.health);
        this.setDistanceMoved(data.distanceMoved);
        this.items.generateFromSave(data.items);
        this.setHandItem(this.items.getItem(data.handItem), false);

        this.setVisible(true);

    }

    generateSave() {
        let playerData = {
            x: this.x,
            y: this.y,
            direction: this.direction,
            isLampOn: this.isLampOn,
            health: this.health,
            distanceMoved: this.distanceMoved,
            hasSprinted: this.hasSprintEverBeenPressed,
            items: this.items.generateSaveData(),
            handItem: null
        };

        if (this.handItem != null) {
            playerData.handItem = this.handItem.getName();
        }

        return playerData;
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
            if (this.handItem.type == "tool") {
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

    setDistanceMoved(distance) {
        this.distanceMoved = distance;
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
            this.isLampOn = true;
            this.setHandItem(this.items.getItem("hand-lamp"));
        }else {
            this.isLampOn = false;
            this.setHandItem(null);
        }
    }

    getItems() {
        return this.items;
    }

    getHandItem() {
        return this.handItem;
    }

    setHandItem(item, playNoise = true) {
        if (this.handItem != null) {
            this.handItem.off();
            this.handItem.update();
        }

        this.handItem = item;

        if (playNoise) {
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

        if (this.handItem != null) {
            this.handItem.on();
        }
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

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

}



class NPC extends Phaser.Physics.Arcade.Sprite {

    /*
     * Constructor
     */
    constructor(name, scene, x, y, texture) {
        super(scene, x, y);

        this.name = name;

        this.setTexture(texture);
        this.setPosition(x, y);

        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        scene.add.existing(this);

        this.body.setSize(6, 3);
        this.body.setOffset(13, 29);
        this.setImmovable(true);

        //Always scale the npc's a little
        this.setScale(1.25);

        this.walkSpeed = 20;
        this.isWalking = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.animsKey = "";

        this.movements = [];
        this.currentMovement = null;

        this.talkRadius = 80;
        this.isTalking = false;
        this.canTalk = true;
        this.onTalk = function() {};

        this.direction = "down";
        this.setFrame(8);

        this.isStanding = true;

        this.firstName = "John";
        this.lastName = "Doe";

        this.setPipeline("Light2D");

        this.dialogues = [];
        this.currentDialogueIndex = 0;

        this.items = new ItemManager(this);
        this.items.addItem(new HandLamp(this.items));
        this.handItem = null;

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.setDepth(Math.round(this.y));

        if (this.handItem != null) {
            this.handItem.update();
        }

        if (!this.isTalking && !this.scene.uiScene.isSaving) {
            this.updateWalking();
        }else {
            this.body.setVelocity(0, 0);
            this.anims.pause();
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
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.right) {
            this.direction = "right";
            this.body.setVelocityX(this.walkSpeed);
            this.body.setVelocityY(0);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.up) {
            this.direction = "up";
            this.body.setVelocityY(-this.walkSpeed);
            this.body.setVelocityX(0);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.down) {
            this.direction = "down";
            this.body.setVelocityY(this.walkSpeed);
            this.body.setVelocityX(0);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.left && this.isWalking.up) {
            this.direction = "left";
            this.body.setVelocity(-this.walkSpeed);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.left && this.isWalking.down) {
            this.direction = "left";
            this.body.setVelocity(-this.walkSpeed, this.walkSpeed);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.right && this.isWalking.up) {
            this.direction = "right";
            this.body.setVelocity(this.walkSpeed, -this.walkSpeed);
            this.play(this.getAnimationKey(), true);
        }else if (this.isWalking.right && this.isWalking.down) {
            this.direction = "right";
            this.body.setVelocity(this.walkSpeed);
            this.play(this.getAnimationKey(), true);
        }else {
            this.body.setVelocity(0, 0);
            this.stop();
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

    addDialogue(dialogue, callback) {

        let dia = dialogue;
        dia.onComplete = callback;

        this.dialogues.push(dia);

    }

    nextDialogue() {
        this.currentDialogueIndex += 1;
    }


    /*
     * Getters & Setters
     */

    getAnimationKey() {

        let str = this.animsKey + "-";

        if (this.isWalking.left || this.isWalking.right || this.isWalking.up || this.isWalking.down) {
            str += "walk-";
        }

        str += this.direction;

        if (this.handItem != null) {
            if (this.handItem.type === "tool") {
                str += "-tool";
            }
        }

        return str;

    }

    getWalkSpeed() {
        return this.walkSpeed;
    }

    setWalkSpeed(speed) {
        this.walkSpeed = speed;
    }

    getWalking() {
        return this.isWalking;
    }

    setWalking(walking) {
        this.isWalking = walking;
    }

    setWalkingLeft(left) {
        if (this.isWalking.right) {
            return -1;
        }

        this.isWalking.left = left;
    }

    setWalkingRight(right) {
        if (this.isWalking.left) {
            return -1;
        }

        this.isWalking.right = right
    }

    setWalkingUp(up) {
        if (this.isWalking.down) {
            return -1;
        }

        this.isWalking.up = up;
    }

    setWalkingDown(down) {
        if (this.isWalking.up) {
            return -1;
        }

        this.isWalking.down = down;
    }

    getAnimsKey() {
        return this.animsKey;
    }

    setAnimsKey(key) {
        this.animsKey = key;
    }

    getCurrentMovement() {
        return this.currentMovement;
    }

    setCurrentMovement(movement) {
        this.currentMovement = movement;
    }

    getTalkRadius() {
        return this.talkRadius;
    }

    setTalkRadius(radius) {
        this.talkRadius = radius;
    }

    getTalking() {
        return this.isTalking;
    }

    setTalking(talking) {
        this.isTalking = talking;
    }

    getCanTalk() {
        return this.canTalk;
    }

    setCanTalk(canTalk) {
        this.canTalk = canTalk;
    }

    getOnTalk() {
        return this.onTalk;
    }

    getDirection() {
        return this.direction;
    }

    setDirection(dir, updateFrame = true) {

        this.direction = dir;

        if (updateFrame) {
            if (this.handItem == null) {
                if (dir == "up") {
                    this.setFrame(4);
                }else if (dir == "down") {
                    this.setFrame(0);
                }else if (dir == "left") {
                    this.setFrame(8);
                }else if (dir == "right") {
                    this.setFrame(12);
                }
            }else {
                if (dir == "up") {
                    this.setFrame(20);
                }else if (dir == "down") {
                    this.setFrame(16);
                }else if (dir == "left") {
                    this.setFrame(24);
                }else if (dir == "right") {
                    this.setFrame(28);
                }
            }
        }

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

    getDialogues() {
        return this.dialogues;
    }

    getCurrentDialogue() {
        return this.dialogues[this.currentDialogueIndex];
    }

    getCurrentDialogueIndex() {
        return this.currentDialogueIndex;
    }

    setCurrentDialogueIndex(index) {
        this.currentDialogueIndex = index;
    }

    getItems() {
        return this.items;
    }

    getHandItem() {
        return this.handItem;
    }

    setHandItem(item) {
        if (this.handItem != null) {
            this.handItem.off();
            this.handItem.update();
        }

        this.handItem = item;

        if (this.handItem != null) {
            this.handItem.on();
        }
    }

}
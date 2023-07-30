
class Kiro extends NPC {

    /*
     * Constructor
     */
    constructor(scene, x, y) {
        super(scene, x, y, "img-char-kiro");

        this.setTexture("img-char-kiro");
        this.setPosition(x, y);
        this.setScale(scene.worldScale);

        scene.physics.add.existing(this);
        scene.add.existing(this);

        this.body.setSize(6, 3);
        this.body.setOffset(13, 29);
        this.setImmovable(true);

        this.walkSpeed = 60;
        this.isWalking = {
            left: false,
            right: false,
            up: false,
            down: false
        };

        this.movements = [
            new Movement("kiro-0", this, 1650, this.y, { faceDownWhenDone: true })
        ];
        this.currentMovement = null;

        this.talkRadius = 80;
        this.isTalking = false;
        this.canTalk = true;
        this.onTalk = function() {};

        this.direction = "down";
        this.setFrame(8);

        this.isStanding = true;

        this.firstName = "Kiro";
        this.lastName = "Kenito";

        this.setPipeline("Light2D");

        this.dialogues = [];
        this.currentDialogueIndex = 0;

    }


    /*
     * Methods
     */
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        this.setDepth(Math.round(this.y));

        if (!this.isTalking && !this.scene.isSaving) {
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
            this.body.setVelocityX(-this.walkSpeed);
            this.body.setVelocityY(0);
            this.play("kiro-walk-left", true);
        }else if (this.isWalking.right) {
            this.body.setVelocityX(this.walkSpeed);
            this.body.setVelocityY(0);
            this.play("kiro-walk-right", true);
        }else if (this.isWalking.up) {
            this.body.setVelocityY(-this.walkSpeed);
            this.body.setVelocityX(0);
            this.play("kiro-walk-up", true);
        }else if (this.isWalking.down) {
            this.body.setVelocityY(this.walkSpeed);
            this.body.setVelocityX(0);
            this.play("kiro-walk-down", true);
        }else if (this.isWalking.left && this.isWalking.up) {
            this.body.setVelocity(-this.walkSpeed);
            this.play("kiro-walk-left", true);
        }else if (this.isWalking.left && this.isWalking.down) {
            this.body.setVelocity(-this.walkSpeed, this.walkSpeed);
            this.play("kiro-walk-left", true);
        }else if (this.isWalking.right && this.isWalking.up) {
            this.body.setVelocity(this.walkSpeed, -this.walkSpeed);
            this.play("kiro-walk-right", true);
        }else if (this.isWalking.right && this.isWalking.down) {
            this.body.setVelocity(this.walkSpeed);
            this.play("kiro-walk-right", true);
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

        if (this.dialogues.length == 1) {
            this.currentDialogueIndex = 0;
        }

        this.dialogues.push(dia);

    }


    /*
     * Getters & Setters
     */

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

    setDirection(dir) {
        if (dir == "up") {
            this.direction = dir;
            this.setFrame(4);
        }else if (dir == "down") {
            this.direction = dir;
            this.setFrame(0);
        }else if (dir == "left") {
            this.direction = dir;
            this.setFrame(8);
        }else if (dir == "right") {
            this.direction = dir;
            this.setFrame(12);
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

}
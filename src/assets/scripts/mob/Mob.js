

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

        this.setPushable(false);

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

        //Taming
        this.isTamed = false;
        this.isTamedBy = null;

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

        //Attacking
        this.health = 100;
        this.isHostile = false;
        this.isAttacking = false;
        this.attackTarget = null;
        this.attackDamage = 10;
        this.attackRadius = 30;
        this.canMoveAtTarget = true;
        this.attackMovement = null;
        this.inAttackRadius = false;
        this.attackDelay = 1000;

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

        this.updateAttacking();

        if (!this.isAttacking && !this.scene.uiScene.isSaving) {
            this.updateWalking();
        }else {
            this.body.setVelocity(0, 0);
        }

        this.updateAnimations();

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

    updateAttacking() {

        if (!this.isHostile) {
            return;
        }

        let changeX = this.x - this.attackTarget.x;
        let changeY = this.y - this.attackTarget.y;

        let dist = Math.sqrt(Math.pow(changeX, 2) + Math.pow(changeY, 2));

        if (dist <= this.attackRadius) {

            this.inAttackRadius = true;

            this.attack();

        }else {
            this.inAttackRadius = false;
        }

        if (this.attackMovement != null) {
            if (!this.inAttackRadius && this.canMoveAtTarget) {
                if (!this.attackMovement.inProgress) {
                    this.attackMovement.start();
                }
                this.attackMovement.update();
            }else {
                this.attackMovement.end();
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

        if (this.scene.uiScene.isSaving) {
            this.anims.pause();
            return;
        }

        if (this.hasIdleAnimation && !this.isAttacking) {

            this.anims.play(this.getAnimationKey(), true);

        }else if (!this.isAttacking) {
            this.anims.stop();
        }

    }

    startAttacking(target) {

        this.setAttackTarget(target);
        this.attackMovement = new Movement("mob-" + this.name + "-attack", this, this.attackTarget.x, this.attackTarget.y, { atTarget: this.attackTarget });
        this.isHostile = true;
        this.attackMovement.start();

    }

    attack() {
        if (this.isAttacking) {
            return;
        }

        this.isAttacking = true;

        this.attackTarget.health -= this.attackDamage;

        this.anims.play(this.getAnimationKey(), true);

        this.scene.time.addEvent({
            delay: this.attackDelay,
            callback: function() {
                this.isAttacking = false;
            },
            callbackScope: this,
            loop: false
        });
        console.log(this.attackTarget.health);
    }


    /*
     * Getters & Setters
     */

    getAnimationKey() {

        let str = this.animsKey + "-";

        if (this.hasIdleAnimation) {
            if (this.isAttacking) {
                str += "attack-";
            }else if (this.isWalking.left === true || this.isWalking.right === true || this.isWalking.up === true || this.isWalking.down === true) {
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
        this.direction = dir;

        if (updateFrame) {
            if (dir === "down") {
                this.setFrame(0);
            }else if (dir === "up") {
                this.setFrame(4);
            }else if (dir === "left") {
                this.setFrame(8);
            }else if (dir === "right") {
                this.setFrame(12);
            }
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

    getHealth() {
        return this.health;
    }

    setHealth(health) {
        this.health = health;
    }

    getHostile() {
        return this.isHostile;
    }

    setHostile(hostile) {
        this.isHostile = hostile;
    }

    getAttacking() {
        return this.isAttacking;
    }

    setAttacking(attacking) {
        this.isAttacking = attacking;
    }

    getAttackTarget() {
        return this.attackTarget;
    }

    setAttackTarget(target) {
        this.attackTarget = target;
    }

    getAttackRadius() {
        return this.attackRadius;
    }

    setAttackRadius(radius) {
        this.attackRadius = radius;
    }

    getAttackDamage() {
        return this.attackDamage;
    }

    setAttackDamage(damage) {
        this.attackDamage = damage;
    }

    getCanMoveAtTarget() {
        return this.canMoveAtTarget;
    }

    setCanMoveAtTarget(canMove) {
        this.canMoveAtTarget = canMove;
    }

    getAttackMovement() {
        return this.attackMovement;
    }

    setAttackMovement(movement) {
        this.attackMovement = movement;
    }

    getInAttackRadius() {
        return this.inAttackRadius;
    }

    getAttackLoop() {
        return this.attackLoop;
    }

    getAttackDelay() {
        return this.attackDelay;
    }

    setAttackDelay(ms) {
        this.attackDelay = ms;
    }

}


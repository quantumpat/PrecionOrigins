
class Movement {

    /*
     * Constructor
     */
    constructor(name, sprite, finalX, finalY, data) {

        this.name = name;

        this.sprite = sprite;

        this.finalX = finalX;
        this.finalY = finalY;

        this.changeX = 0;
        this.changeY = 0;

        this.data = data;

        this.inProgress = false;

        this.hasCompleted = false;

    }


    /*
     * Methods
     */
    start() {

        if (this.inProgress) {
            return;
        }

        if (this.sprite == null) {
            console.error("No sprite to start movement with!");
            return;
        }

        this.changeX = Math.round(this.finalX) - Math.round(this.sprite.x);
        this.changeY = Math.round(this.finalY) - Math.round(this.sprite.y);

        this.inProgress = true;

        if (this.data.canTalk != null) {
            if (!this.data.canTalk) {
                this.sprite.setCanTalk(false);
            }
        }

        this.updateSprite();

    }

    updateSprite() {

        this.changeX = Math.round(this.finalX) - Math.round(this.sprite.x);
        this.changeY = Math.round(this.finalY) - Math.round(this.sprite.y);

        if (this.changeX == 0 && this.changeY == 0) {
            //No movement
            this.sprite.setWalking({
                left: false,
                right: false,
                up: false,
                down: false
            });

            this.end();
            return;
        }else if (this.changeX == 0 && this.changeY != 0) {
            //Up/Down movement
            if (this.changeY > 0) {
                //Move down
                this.sprite.setDirection("down", false);
                this.sprite.setWalking({
                    left: false,
                    right: false,
                    down: true,
                    up: false
                });

            }else {
                //Move up
                this.sprite.setDirection("up", false);
                this.sprite.setWalking({
                    left: false,
                    right: false,
                    down: false,
                    up: true
                });
            }
        }else if (this.changeX != 0 && this.changeY == 0) {
            //Left/Right movement
            if (this.changeX > 0) {
                //Move right
                this.sprite.setDirection("right", false);
                this.sprite.setWalking({
                    left: false,
                    right: true,
                    down: false,
                    up: false
                });
            }else {
                //Move left
                this.sprite.setDirection("left", false);
                this.sprite.setWalking({
                    left: true,
                    right: false,
                    down: false,
                    up: false
                });
            }
        }else {
            if (this.changeX > 0 && this.changeY < 0) {
                //Right/Up
                this.sprite.setDirection("right", false);
                this.sprite.setWalking({
                    left: false,
                    right: true,
                    up: true,
                    down: false
                });
            }else if (this.changeX > 0 && this.changeY > 0) {
                //Right/Down
                this.sprite.setDirection("right", false);
                this.sprite.setWalking({
                    left: false,
                    right: true,
                    up: false,
                    down: true
                });
            }else if (this.changeX < 0 && this.changeY < 0) {
                //Left/Up
                this.sprite.setDirection("left", false);
                this.sprite.setWalking({
                    left: true,
                    right: false,
                    up: true,
                    down: false
                });
            }else {
                //Left/Down
                this.sprite.setDirection("left", false);
                this.sprite.setWalking({
                    left: true,
                    right: false,
                    up: false,
                    down: true
                });
            }

        }
    }

    update() {

        if (this.sprite == null) {
            return;
        }

        if (this.inProgress) {

            if (this.data.canTalk != null) {
                if (!this.data.canTalk) {
                    this.sprite.setCanTalk(false);
                }
            }

            if (Math.round(this.sprite.x) == this.finalX && Math.round(this.sprite.y) == this.finalY) {
                this.end();
            }
            this.updateSprite();

        }

    }

    end() {

        this.hasCompleted = true;

        this.inProgress = false;

        if (this.data.canTalk != null) {
            if (!this.data.canTalk) {
                this.sprite.setCanTalk(true);
            }
        }

        this.sprite.setWalking({
            left: false,
            right: false,
            up: false,
            down: false
        });

        if (this.data != null) {
            if (this.data.faceWhenDone != null) {
                this.sprite.setDirection(this.data.faceWhenDone, true);
            }
        }

    }


    /*
     * Getters & Setters
     */
    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getSprite() {
        return this.sprite;
    }

    setSprite(sprite) {
        this.sprite = sprite;
    }

    getFinalX() {
        return this.finalX;
    }

    setFinalX(x) {
        this.finalX = x;
    }

    getFinalY() {
        return this.finalY;
    }

    setFinalY(y) {
        this.finalY = y;
    }

    getChangeX() {
        return this.changeX;
    }

    getChangeY() {
        return this.changeY;
    }

    getData() {
        return this.data;
    }

    setData(data) {
        this.data = data;
    }

    getInProgress() {
        return this.inProgress;
    }

    getHasCompleted() {
        return this.hasCompleted;
    }

}
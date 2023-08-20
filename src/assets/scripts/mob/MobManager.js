
class MobManager {

    /*
     * Constructor
     */
    constructor(scene) {

        this.scene = scene;

        this.mobs = [];

    }


    /*
     * Methods
     */
    //Generates all mobs from the save file
    generateMobs(mobData) {

        for (let i = 0; i < mobData.length; i++) {

            this.createMob(mobData[i].name, mobData[i].data);

        }

    }

    //Creates individual mobs based on name (really the type of mob that should be spawned) and data
    createMob(name, data) {

        if (name === "panda") {

            let mob = new Panda(this.scene, data.x, data.y);
            mob.setDirection(data.direction, true);
            mob.startMovement(data.currentMovementName);
            mob.setHealth(data.health);
            if (data.attackTarget === "player") {
                mob.startAttack(this.scene.player);
            }
            if (data.followTarget === "player") {
                mob.startFollow(this.scene.player);
            }

            this.mobs.push(mob);

        }

    }

    //Turns all the active mobs in the current scene into savable data
    generateSave() {

        let mobArray = [];

        for (let i = 0; i < this.mobs.length; i++) {
            let mob = this.mobs[i];

            let mobData = {
                name: mob.name,
                data: {
                    x: mob.x,
                    y: mob.y,
                    health: mob.health,
                    attackTarget: null,
                    followTarget: null,
                    direction: mob.direction,
                    currentMovementName: null,
                    items: mob.items.generateSaveData(),
                    handItem: null
                }
            };

            if (mob.getCurrentMovement() != null) {
                mobData.data.currentMovementName = mob.getCurrentMovement().getName();
            }

            if (mob.getAttackTarget() === this.scene.player) {
                mobData.data.attackTarget = "player";
            }

            if (mob.getFollowTarget() === this.scene.player) {
                mobData.data.followTarget = "player";
            }

            if (mob.getHandItem() != null) {
                mobData.data.handItem = mob.getHandItem().getName();
            }

            mobArray.push(mobData);

        }

        return mobArray;

    }

    //Makes all the mobs physically interact with a certain sprite
    addPhysics(sprite, ignoredSprites = []) {

        for (let i = 0; i < this.mobs.length; i++) {

            let canAdd = true;
            for (let j = 0; j < ignoredSprites.length; j++) {
                if (this.mobs[i] === ignoredSprites[j]) {
                    canAdd = false;
                }
            }

            if (canAdd) {
                this.scene.physics.add.collider(sprite, this.mobs[i]);
            }

        }

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

    getMob() {
        return this.mobs;
    }

    getMob(name) {

        for (let i = 0; i < this.mobs.length; i++) {
            if (this.mobs[i].name === name) {
                return this.mobs[i];
            }
        }

        return null;

    }

}
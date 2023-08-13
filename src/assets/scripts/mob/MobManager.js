
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
    generateMobs(mobData) {

        for (let i = 0; i < mobData.length; i++) {

            this.createMob(mobData[i].name, mobData[i].data);

        }

    }

    createMob(name, data) {

        if (name === "panda") {

            let mob = new Panda(this.scene, data.x, data.y);
            mob.setDirection(data.direction, true);
            mob.startMovement(data.currentMovementName);
            mob.setHealth(data.health);
            if (data.attackTarget === "player") {
                mob.startAttack(this.scene.player);
            }

            this.mobs.push(mob);

        }

    }

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
                    direction: mob.direction,
                    currentMovementName: null,
                    handItem: null,
                    items: []
                }
            };

            console.log(mob.x);

            if (mob.getCurrentMovement() != null) {
                mobData.data.currentMovementName = mob.getCurrentMovement().getName();
            }

            if (mob.getAttackTarget() === this.scene.player) {
                mobData.data.attackTarget = "player";
            }

            mobArray.push(mobData);

        }

        return mobArray;

    }

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

    getNpcs() {
        return this.npcs;
    }

    getNpc(name) {

        for (let i = 0; i < this.npcs.length; i++) {
            if (this.npcs[i].name === name) {
                return this.npcs[i];
            }
        }

    }

}
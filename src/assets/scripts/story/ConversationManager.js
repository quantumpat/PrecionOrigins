
class ConversationManager {

    /*
     * Constructor
     */
    constructor(scene) {

        this.scene = scene;

        this.talkRadius = 80;

        this.player = null;
        this.npcs = [];

        this.nearestNpc = null;
        this.activeNpc = null;

        this.conversationActive = false;

    }


    /*
     * Methods
     */
    registerNpc(npc) {

        this.npcs.push(npc);

    }

    inRadius(npc) {
        if (this.player == null) {
            return false;
        }else {
            const dist = Math.sqrt(Math.pow(this.player.x - npc.x, 2) + Math.pow(this.player.y - npc.y, 2));

            if (dist < this.talkRadius) {
                //player.setInTalkRadius(true);
                this.scene.gameControls.showHint("talk");

                return true;
            }else {
                //player.setInTalkRadius(false);
                this.scene.gameControls.hideHint();

                return false;
            }
        }
    }

    start() {

        if (this.activeNpc != null) {
            return;
        }

        console.log("A");

        this.activeNpc = this.nearestNpc;

        this.scene.gameControls.setControlsEnabled(false);
        this.scene.player.setTalking(true);

        if (this.activeNpc.getCurrentDialogue() != null) {
            this.activeNpc.currentDialogue.start();
        }else {
            this.stop();
        }

    }

    stop() {

        this.activeNpc = null;
        this.scene.player.setTalking(false);
        this.scene.gameControls.setControlsEnabled(true);

    }

    checkNpcs() {
        for (let i = 0; i < this.npcs.length; i++) {

            if (this.inRadius(this.npcs[i])) {

                if (this.npcs[i].getDialogues().length > 0) {
                    this.nearestNpc = this.npcs[i];
                    return;
                }

            }

        }

        this.nearestNpc = null;
    }

    update() {

        this.checkNpcs();

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

    getTalkRadius() {
        return this.talkRadius;
    }

    setTalkRadius(radius) {
        this.talkRadius = radius;
    }

    getPlayer() {
        return this.player;
    }

    setPlayer(player) {
        this.player = player;
    }

    getNpcs() {
        return this.npcs;
    }

    setNpcs(npcs) {
        this.npcs = npcs;
    }

    getNearestNpc() {
        return this.nearestNpc;
    }

    getActiveNpc() {
        return this.activeNpc;
    }

    getConversationActive() {
        return this.conversationActive;
    }

}
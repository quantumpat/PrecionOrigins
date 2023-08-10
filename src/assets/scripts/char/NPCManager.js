
class NPCManager {

    /*
     * Constructor
     */
    constructor(scene) {

        this.scene = scene;

        this.npcs = [];

    }


    /*
     * Methods
     */
    generateNpcs(charData) {

        for (let i = 0; i < charData.length; i++) {

            this.createNpc(charData[i].name, charData[i].data);

        }

    }

    createNpc(name, data) {

        if (name === "kiro") {

            let npc = new Kiro(this.scene, data.x, data.y);
            npc.setDirection(data.direction, true);
            npc.setCurrentDialogueIndex(data.currentDialogueIndex);
            npc.startMovement(data.currentMovementName);
            npc.items.generateFromSave(data.items);
            npc.setHandItem(npc.items.getItem(data.handItem.name));
            this.scene.conversations.registerNpc(npc);

            this.npcs.push(npc);

        }

    }

    generateSave() {

        let charArray = [];

        for (let i = 0; i < this.npcs.length; i++) {
            let npc = this.npcs[i];

            let charData = {
                name: npc.name,
                data: {
                    x: npc.x,
                    y: npc.y,
                    direction: npc.direction,
                    currentDialogueIndex: npc.currentDialogueIndex,
                    canTalk: npc.canTalk,
                    currentMovementName: null,
                    handItem: {
                        name: ""
                    },
                    items: npc.items.generateSaveData()
                }
            };

            if (npc.getCurrentMovement() == null) {
                charData.data.currentMovementName = null;
            }else {
                charData.data.currentMovementName = npc.getCurrentMovement().getName();
            }

            if (npc.getHandItem() != null) {
                charData.data.handItem.name = npc.getHandItem().getName();
                charData.data.handItem.data = npc.getHandItem().getData();
            }

            charArray.push(charData);

        }

        return charArray;

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
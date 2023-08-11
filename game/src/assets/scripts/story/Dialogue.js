
class Dialogue {

    /*
     * Constructor
     */
    constructor(dialogueManager, dialogueParts) {

        this.dialogueManager = dialogueManager;
        this.dialogueParts = dialogueParts;

        this.currentPart = -1;
        this.currentPartData = null;

        this.isActive = false;

        this.hasBeenCompleted = false;

        this.onComplete = function() {};

    }


    /*
     * Methods
     */
    start() {
        this.isActive = true;
    }

    stop() {
        this.isActive = false;
    }

    addDialoguePart(dialoguePart) {
        if (dialoguePart != null) {
            this.dialogueParts.push(dialoguePart);
        }
    }


    /*
     * Getters & Setters
     */

    getDialogueManager() {
        return this.dialogueManager;
    }

    setDialogueManager(manager) {
        this.dialogueManager = manager;
    }

    getDialogueParts() {
        return this.dialogueParts;
    }

    setDialogueParts(parts) {
        this.dialogueParts = parts;
    }

    getCurrentPart() {
        return this.currentPart;
    }

    getCurrentPartData() {
        return this.currentPartData;
    }

    getActive() {
        return this.isActive;
    }

    getHasBeenCompleted() {
        return this.hasBeenCompleted;
    }

    getOnComplete() {
        return this.onComplete;
    }

    setOnComplete(onComplete) {
        this.onComplete = onComplete;
    }

}
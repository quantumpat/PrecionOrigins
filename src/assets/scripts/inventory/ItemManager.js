
class ItemManager {

    constructor(char) {

        this.char = char;
        this.scene = char.scene;

        this.items = [];

    }


    /*
     * Methods
     */
    generateFromSave(saveData) {

        for (let i = 0; i < saveData.length; i++) {

            let data = saveData[i];
            let item = null;

            if (data.name === "hand-lamp") {

                item = new HandLamp(this);

            }

            for (let j = 0; j < this.items.length; j++) {
                if (this.items[j].name === data.name) {
                    if (this.items[j].amount < this.items[j].maxStack) {
                        this.items[j].amount += 1;
                    }
                }else {
                    this.items.push(item);
                }
            }

        }

    }

    generateSaveData() {

        let saveData = [];

        for (let i = 0; i < this.items.length; i++) {

            let obj = {
                name: this.items[i].name,
                data: this.items[i].data
            };

            saveData.push(obj);

        }

        return saveData;

    }

    addItem(item) {

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].getName() === item.getName()) {
                return;
            }
        }

        this.items.push(item);

    }


    /*
     * Getters & Setters
     */
    getChar() {
        return this.char;
    }

    getScene() {
        return this.scene;
    }

    getItems() {
        return this.items;
    }

    getItem(name) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].getName() === name) {
                return this.items[i];
            }
        }
    }

}
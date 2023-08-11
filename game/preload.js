
const fs = require("fs");

window.addEventListener("DOMContentLoaded", () => {
    window.setInterval(function() {
        if (document.getElementById("_save-data").innerText != "") {
            saveGame(document.getElementById("_save-data").innerText);
            document.getElementById("_save-data").innerText = "";
        }else if (document.getElementById("_get-load-data").innerText != "") {
            loadGame();
            document.getElementById("_get-load-data").innerText = "";
        }
    }, 100);

});

function saveGame(data) {

    const _data = JSON.parse(data);

    if (data != null) {
        fs.writeFileSync("_precion_save_0.json", JSON.stringify(_data));

        console.log("Game Saved!");
    }

}

function loadGame() {
    if (fs.existsSync("_precion_save_0.json")) {
        fs.readFile("_precion_save_0.json", "utf8", (error, jsonString) => {

            if (error) {
                console.log("File read failed:", error);
                return;
            }

            document.getElementById("_load-data").innerText = jsonString;

            console.log("Game Loaded!");

        });
    }
}

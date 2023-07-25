
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("close-window-btn").onclick = function() {
        window.close();
    }
});

/*
 * Precion Origins - A Space Odyssey by Patrick Carroll
 */

const gameConfig = {
    width: 1280,
    height: 720,
    pixelArt: true,
    title: "Precion Origins - A Space Odyssey",
    version: "0.0.4",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [
        StartMenuScene
        //TestScene
    ]
};

const game = new Phaser.Game(gameConfig);
//game.scene.start("TestScene");
game.scene.start("StartMenu", { startAnims: true });

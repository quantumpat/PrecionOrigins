


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("close-window-btn").onclick = function() {
        window.close();
    }
});


/*
 * Precion Origins - A Space Odyssey by Patrick Carroll
 */

const gameConfig = {
    pixelArt: true,
    title: "Precion Origins - A Space Odyssey",
    version: "0.0.6",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [
        StartMenuScene
    ]
};

const game = new Phaser.Game(gameConfig);
game.scene.start("StartMenu", { startAnims: true });

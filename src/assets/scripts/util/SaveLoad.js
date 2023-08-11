
function saveGame(data, onComplete) {
    document.getElementById("_save-data").innerText = JSON.stringify(data);

    if (onComplete != null) {
        onComplete();
    }
}

function loadGame(onComplete) {
    document.getElementById("_get-load-data").innerText = "[Get]";

    let interval = window.setInterval(function() {
        if (document.getElementById("_load-data").innerText != "") {
            const data = JSON.parse(document.getElementById("_load-data").innerText);
            
            if (onComplete != null) {
                onComplete(data);
            }

            window.clearInterval(interval);
            document.getElementById("_load-data").innerText = "";
        }
    }, 1000);
}

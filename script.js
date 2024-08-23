function playAudio(id) {
    var audio = document.getElementById(id);
    audio.play();
}

function pauseAudio(id) {
    var audio = document.getElementById(id);
    audio.pause();
}

function stopAudio(id) {
    var audio = document.getElementById(id);
    audio.pause();
    audio.currentTime = 0;
}

function dimBox(id) {
    var box = document.getElementById(id);
    box.classList.toggle('dimmed');
}

function toggleFullscreen(id) {
    var element = document.getElementById(id);
    if (!document.fullscreenElement) {
        element.requestFullscreen().catch(err => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
}

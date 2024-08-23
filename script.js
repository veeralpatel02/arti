let currentAudio = null;
let currentBox = null;

function togglePlayPause(audioId, boxId) {
    const audio = document.getElementById(audioId);
    const box = document.getElementById(boxId);

    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentBox.classList.remove('dimmed');
    }

    if (audio.paused) {
        audio.play();
        box.classList.add('dimmed');
        currentAudio = audio;
        currentBox = box;
    } else {
        audio.pause();
        box.classList.remove('dimmed');
        currentAudio = null;
        currentBox = null;
    }
}

function stopAudio(audioId, event) {
    event.stopPropagation(); // Prevents click from toggling play/pause
    const audio = document.getElementById(audioId);
    const box = document.getElementById(audioId.replace('audio', 'box'));
    audio.pause();
    audio.currentTime = 0; // Reset audio to start
    box.classList.remove('dimmed');
    currentAudio = null;
    currentBox = null;
}

function toggleFullscreen(boxId) {
    const box = document.getElementById(boxId);
    const fullscreenContainer = document.getElementById('fullscreen-container');
    fullscreenContainer.classList.add('active');
    fullscreenContainer.appendChild(box); // Move the box into fullscreen container
    fullscreenContainer.style.zIndex = 1000; // Ensure it's above other elements
}

function exitFullscreen() {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const box = fullscreenContainer.firstElementChild;
    if (box) {
        document.body.appendChild(box); // Move the box back to body
        fullscreenContainer.classList.remove('active');
        fullscreenContainer.style.zIndex = -1; // Reset z-index
    }
}

// Add event listeners for all boxes to handle play/pause
document.querySelectorAll('.box').forEach(box => {
    const audioId = box.getAttribute('data-audio');
    box.addEventListener('click', () => togglePlayPause(audioId, box.id));
});

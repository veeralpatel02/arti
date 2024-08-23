let currentAudio = null;
let currentBox = null;

function togglePlayPause(audioId, boxId) {
    const audio = document.getElementById(audioId);
    const box = document.getElementById(boxId);

    if (!audio || !box) {
        console.error('Audio or box element not found');
        return;
    }

    // If there's another audio playing, pause it
    if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        if (currentBox) {
            currentBox.classList.remove('dimmed');
        }
    }

    // Handle the play/pause toggle
    if (audio.paused) {
        audio.play().then(() => {
            box.classList.add('dimmed');
            currentAudio = audio;
            currentBox = box;
        }).catch(error => {
            console.error('Error playing audio:', error);
        });
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

    if (!audio || !box) {
        console.error('Audio or box element not found');
        return;
    }

    audio.pause();
    audio.currentTime = 0; // Reset audio to start
    box.classList.remove('dimmed');
    currentAudio = null;
    currentBox = null;
}

function toggleFullscreen(boxId) {
    const box = document.getElementById(boxId);
    
    if (!box) {
        console.error('Box element not found');
        return;
    }

    if (box.requestFullscreen) {
        box.requestFullscreen();
    } else if (box.mozRequestFullScreen) { /* Firefox */
        box.mozRequestFullScreen();
    } else if (box.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        box.webkitRequestFullscreen();
    } else if (box.msRequestFullscreen) { /* IE/Edge */
        box.msRequestFullscreen();
    }
}

// Add event listeners for all boxes to handle play/pause
document.querySelectorAll('.box').forEach(box => {
    const audioId = box.getAttribute('data-audio');
    box.addEventListener('click', () => togglePlayPause(audioId, box.id));
});

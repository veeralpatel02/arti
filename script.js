let currentAudio = null;
let currentBox = null;

function togglePlayPause(audioId, boxId) {
    const audio = document.getElementById(audioId);
    const box = document.getElementById(boxId);

    if (currentAudio && currentAudio !== audio) {
        // Pause the currently playing audio
        currentAudio.pause();
        currentBox.classList.remove('dimmed');
    }

    if (audio.paused) {
        // Play the selected audio
        audio.play();
        box.classList.add('dimmed');
        currentAudio = audio;
        currentBox = box;
    } else {
        // Pause the selected audio
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

// Add event listeners for all boxes to handle play/pause
document.querySelectorAll('.box').forEach(box => {
    const audioId = box.getAttribute('data-audio');
    box.addEventListener('click', () => togglePlayPause(audioId, box.id));
});

// Add event listeners for stop buttons inside each box
document.querySelectorAll('.stop-button').forEach(button => {
    const audioId = button.getAttribute('data-audio');
    button.addEventListener('click', (event) => stopAudio(audioId, event));
});

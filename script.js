document.addEventListener('DOMContentLoaded', () => {
    let currentAudio = null;
    let currentBox = null;

    function togglePlayPause(audioId, boxId) {
        const audio = document.getElementById(audioId);
        const box = document.getElementById(boxId);

        if (!audio || !box) {
            console.error('Audio or box element not found');
            return;
        }

        // If there's another audio playing, stop it
        if (currentAudio && currentAudio !== audio) {
            stopAudio(currentAudio.id, null);
        }

        // Toggle play/pause
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
        if (event) event.stopPropagation(); // Prevents click from toggling play/pause

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
        } else if (box.mozRequestFullScreen) { // Firefox
            box.mozRequestFullScreen();
        } else if (box.webkitRequestFullscreen) { // Chrome, Safari & Opera
            box.webkitRequestFullscreen();
        } else if (box.msRequestFullscreen) { // IE/Edge
            box.msRequestFullscreen();
        }
    }

    // Function to update the slider and time displays
    function updateSliderAndTime(box, audio, slider, currentTimeDisplay, durationDisplay) {
        audio.addEventListener('loadedmetadata', () => {
            slider.max = audio.duration;
            updateDuration();
        });

        audio.addEventListener('timeupdate', () => {
            slider.value = audio.currentTime;
            updateCurrentTime();
        });

        slider.addEventListener('input', () => {
            audio.currentTime = slider.value;
        });

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        }

        function updateCurrentTime() {
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
        }

        function updateDuration() {
            durationDisplay.textContent = formatTime(audio.duration);
        }

        audio.addEventListener('loadedmetadata', updateDuration);
    }

    // Set up event listeners for boxes
    document.querySelectorAll('.box').forEach(box => {
        const audioId = box.getAttribute('data-audio');
        const audio = document.getElementById(audioId);
        const slider = box.querySelector('input[type="range"]');
        const currentTimeDisplay = box.querySelector('.current-time');
        const durationDisplay = box.querySelector('.duration');

        const playPauseHandler = () => togglePlayPause(audioId, box.id);
        const stopHandler = (event) => stopAudio(audioId, event);

        // Initialize slider and time displays
        if (audio && slider) {
            updateSliderAndTime(box, audio, slider, currentTimeDisplay, durationDisplay);
        }

        box.addEventListener('click', playPauseHandler);

        // Find stop and fullscreen buttons
        const stopButton = box.querySelector('.stop');
        const fullscreenButton = box.querySelector('.fullscreen');

        if (stopButton) stopButton.addEventListener('click', stopHandler);
        if (fullscreenButton) fullscreenButton.addEventListener('click', () => toggleFullscreen(box.id));
    });
});

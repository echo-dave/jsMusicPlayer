import {togglePlay, currentTrackIndex} from './audio.js';
function keyboardControlListener() { document.addEventListener('keyup', e => {
    keyboardControls(e.code);
})}

function nextTrack() {
    console.log(`currentIndex: ${currentTrackIndex}`);
    if (currentTrackIndex >= 0) {
        loadAudio(currentTrackIndex+1)
    } else loadAudio(0);
}

function previousTrack() {
    loadAudio(currentTrackIndex-1)
}

function keyboardControls (code) {
    switch (code) {
        case "Space": togglePlay();
            break;
        case "ArrowRight": nextTrack();
            break;

        case "ArrowLeft": previousTrack();
            break;

        default:
            break;
    }
}

export {keyboardControlListener};
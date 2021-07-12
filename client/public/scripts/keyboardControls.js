import {togglePlay, currentTrackIndex} from './audio.js';
import { trackData } from './tracklist.js';
function keyboardControlListener() { document.addEventListener('keyup', e => {
    keyboardControls(e.code);
})}

function nextTrack() {
    console.log(`currentIndex: ${currentTrackIndex}`);
    if (currentTrackIndex >= 0 && currentTrackIndex < trackData.length - 1) {
        loadAudio(currentTrackIndex+1)
    } else if (typeof(currentTrackIndex) == "undefined") loadAudio(0);
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
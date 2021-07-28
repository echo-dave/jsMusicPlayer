import {togglePlay, currentTrackIndex} from './audio.js';
import { trackData } from './tracklist.js';
import {changeVolume} from './audio.js';
function keyboardControlListener() { document.addEventListener('keyup', e => {
    keyboardControls(e.altKey? `${e.code} ${e.altKey}` : e.code);
    console.log(e.altKey? `${e.code} ${e.altKey}` : e.code);
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
       
        case "ArrowDown true": volumeKey('down');
            break;

        case "ArrowUp true": volumeKey('up');
            break;
        
        default:
            break;
    }
}



export {keyboardControlListener};
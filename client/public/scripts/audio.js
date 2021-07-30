import {keyboardControlListener} from './keyboardControls.js';
import {buildTracklist, trackData} from './tracklist.js';
import * as scrollingTitle from './scrollingSongTitle.js';

let player = document.getElementById('player');
let audio = {};
let currentTrackIndex;
let continuousPlayback = 0;
let initializeContext = 0;
let artwork = "../imgs/helloCat.jpeg";

//setup audioContext for volume control
let audioCtx;
let sourceAudio = {};
let gainNode;

buildPlayer();
buildTracklist();
keyboardControlListener();
trackListListener();
listenforContinuousPlayback();

function buildPlayer () {
    let jsMusicPlayer = 
    `<figure>
        <figcaption style="text-align: center;">
            <span id="songTitle">--------</span>
        </figcaption>
        <audio preload="auto" type="audio/mpeg">Your browser can't play this! We need Javascript enabled and a modern browser.</audio>       
        <div id="controls">
            <div id="playPause" class="play"></div>
            <div id="playheadContainer" class="center">
                <input type="range" name="playhead" id="playhead" min="0" max="100" step="1" value="0">
                <span id="timeRemaining">0:00</span>
            </div>
            <div id="wrapVolume">
                <input type="range" name="volume" id="volume" min="0" max="1" step=".01" value="1" >
            </div>
            <div class="controlsBg"></div>

        </div>
       
        <button id="continousPlaybackToggle" >&#8734;</button>
    </figure>`

    player.innerHTML = jsMusicPlayer;
    audio = document.querySelector("audio")

    const volume = document.querySelector("#volume");
    volume.addEventListener('input', () => changeVolume(audio));

    const playPause = document.querySelector("#playPause");
    playPause.addEventListener("click", () => {
      togglePlay(); 
    })
}
    const loadAudio = (id) => {
        document.querySelector('#songTitle').style.visibility = 'hidden';
        console.log('onload');
        const url = trackData[id].url;
        const title = trackData[id].title;
        currentTrackIndex = id;

        audio = document.querySelector("audio");
        stopPlay(audio);
        audio.src = url;
        audio.load();
        if (initializeContext === 0) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = audioCtx.createGain();
            gainNode.connect(audioCtx.destination);
            sourceAudio = audioCtx.createMediaElementSource(audio);
            sourceAudio.connect(gainNode);
            gainNode.gain.value = document.querySelector("#volume").value;
            initializeContext = 1;
        }
        
        //Make sure the listener for the playhead only gets added once
        if (!audio["data-time"]) {
            audio.addEventListener("timeupdate", () => {
                audio["data-time"] = true;
                //move playead with playback
                document.querySelector("#playhead").value = audio.currentTime;
                //calculate time remaining and update
                let remainingTime = audio.duration - audio.currentTime;
                timeRemaining(remainingTime);
        }) 
        }

        //reset the playhead on file change
        document.querySelector("#playhead").value = 0;

        //Make sure we have the needed metadata available before trying to apply title, length of audio
        
        // runApplyAudioMetadata = () => applyAudioMetadata(audio, title);
        if (audio.readyState > 0 ) {
            applyAudioMetadata(audio, title)
        } else {
            audio.addEventListener('loadedmetadata', () => applyAudioMetadata(audio, title), {once:true});
        }
    }

    window.loadAudio = loadAudio;

    function setPlayheadMax(audio) {
        const playhead = document.querySelector("#playhead");
        playhead.max =  Math.floor(audio.duration);
        playhead.addEventListener("input", () => {
        setPlayheadTime(audio, playhead);
        })
     }
     
     
     function timeRemaining(remainingTime) {
        let currentRemainingTime = convertSecsToMinutes(remainingTime);
        document.querySelector("#timeRemaining").innerText = `-${currentRemainingTime}`;
     }

     function changeVolume() {
        // document.querySelector("audio").volume = volume.value;
        typeof(gainNode) !== 'undefined' ? gainNode.gain.value = document.querySelector("#volume").value : null; //volume change through audioContext for mobile

    }

    function applyAudioMetadata(audio, title) {
        console.log('metta apply');
        const songTitle = document.querySelector("#songTitle")
        setPlayheadMax(audio);
        timeRemaining(audio.duration);
        songTitle.innerText = title;
        const songTitleParrent = document.querySelector('#player figcaption')
        scrollingTitle.scroll(songTitle, songTitleParrent);
        startPlay(audio);
        // audio.removeEventListener('loadedmetadata', () => applyAudioMetadata(audio, title));

    }

    function setPlayheadTime(audio, playhead) {
        audio.currentTime = playhead.value;
    }

    function startPlay() {
        console.log('audio: ', audio);
        console.log('ready?', audio.readyState);
        if (audio.readyState == 4){
            playStart();
        } else {
            audio.addEventListener('canplaythrough', playStart, {once:true});
        }
        const continuePlayback = function(){
            if (continuousPlayback === 1 && currentTrackIndex < trackData.length -1) {
                console.log(`next track: ${currentTrackIndex + 1}`);
                loadAudio(Number(currentTrackIndex) + 1)
            } else stopPlay()
        }
        audio.addEventListener('ended', continuePlayback, {once:true});

        function playStart () {
            console.log('playthrough'); 
            audio.play();
        };

        playPause.className = "pause";
        playPause.style.visibility = "visible";
    }

    function stopPlay() {
        console.log('stopped');
        audio.pause();
        playPause.className="play";
        playPause.style.visibility = "visible";
    }

    function convertSecsToMinutes(input) {
        const minutes = Math.floor(input / 60);
        let secs = Math.floor(input) % 60;
        secs = secs.toString().padStart(2,'0');
        return `${minutes}:${secs}`
    }

    function togglePlay() {
        if (Object.keys(audio).length > 0) {
            audio.paused ? startPlay(audio) : stopPlay(audio); 
       } else {
           loadAudio(0);
       }
    }

    function trackListListener(){
        const trackList = document.querySelector("#trackList");
        trackList.onclick = e => {
            let target = e.target;
            if (target.closest('.track')){
                loadAudio(target.dataset.trackid)
            }
        }
    }

    function toggleContinuousPlayback() {
        const toggleButton = document.getElementById('continousPlaybackToggle')

        const startContinousPlayback = () => {
            continuousPlayback = 1
            toggleButton.style.background = 'var(--accent-color)';
            toggleButton.style.border = '1px solid black';
            toggleButton.style.color = 'black';
        }
        const stopContinousPlayback = () => {
            continuousPlayback = 0
            toggleButton.style.background = 'var(--continousPlayOff)';
            toggleButton.style.border = '2px solid var(--accent-color)';
            toggleButton.style.color = '#eee'
        }

        continuousPlayback === 0 ? startContinousPlayback() : stopContinousPlayback();
        console.log('continuous status: ' + continuousPlayback);

    }
    
    function listenforContinuousPlayback(){
        document.getElementById('continousPlaybackToggle').onclick = toggleContinuousPlayback
    }


    export {loadAudio, togglePlay, currentTrackIndex, changeVolume, artwork};
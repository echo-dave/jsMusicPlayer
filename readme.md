# JS Music Player

## The Story So Far:
I startd of working with the `<audio>` element and then realized that volume changes wouldn't work on mobile (or at least iOS). I'd looked at AudioContext a little previous and pieced that together the some odd quirks with Chrome and then Safari due to sturcturing and when AudioContext has to be intantiated. While there, I worked on converting everything ove to the Web Audio API. First off was working out out the fetch and node routes for streaming - except apparently fetch won't read as a stream (in Safari at least). After a lot of work had already gone into the conversion I concluded that it just wasn't going to work for mobile / slower network connections. In the end I went back to the `<audio>` element as source for the AudioContext. 

Sound audio bugs sill come across on occasion. I went through and converted all the audio to the same sample rate and bitrate which I think helped (only the sample rate should be relevant to AudioContext). Checks were put in place to try to only play once there's enough data already cached with current datarate.
## Scope:
The initial scope: a simple static mp3 player working with vanilla JS / HTML5 Audio api. The intent is for the musically inclined to have a simple way to share their creations via streaming. CSS variables allow for some simple quick color and font customizations.

## Tech:
The initial static version is build with vanilla JS and the HTML5 audio element.

## The future:
The future is not yet clear, but an expansion into a dynamic application would be built on an ExpressJS server with MongoDB and S3 compatible storage. It's possible I might go the ReactJS route for scalability and build out a platform.

## Usage:
### html:
```html
<script type="module" src="./scripts/audio.js"></script>
<script src="./scripts/changeTheme.js"></script>
```

You'll need entry point with these ids for build nodes and 2 column formatting of css:
```html
<div id="trackListContainer">
    <div id="trackList"></div>
</div>
<div id="player"><div>
```

The keyboard control is a separate module and can be excluded if desired. Just remove
```javascript
import {keyboardControlListener} from './keyboardControls.js';
```
from `audio.js`

![JS Music Player blue](./blue.jpg) ![JS MusicPlayer magenta](./magenta.jpg)
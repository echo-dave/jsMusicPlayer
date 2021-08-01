import {changeArtwork} from './audio.js';
const incomingArt = new Event('newArt');

export default async (trackTitle) => {
    try {
        let data = await fetch(`/api/artwork/${trackTitle}`);
        if (data.status === 200) {
            let artJpeg = await data.blob();
            let artJpegUrl = URL.createObjectURL(artJpeg)
            changeArtwork(artJpegUrl);
        }
        if (data.sttaus === 204) {
            let artJpegUrl = ""
            document.querySelector('#player').dispatchEvent(incomingArt);
        }
    } catch (err) {
        // console.log('get err: ', err);
    } 


}
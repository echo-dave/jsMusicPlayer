import {changeArtwork} from './audio.js';
const incomingArt = new Event('newArt');

export default async (trackTitle) => {
    try {
        if (window.artJpegUrl)window.URL.revokeObjectURL(window.artJpegUrl);
        let artJpeg = "";
        let artJpegUrl;
        
        const updateArtwork = function () {
            changeArtwork(artJpegUrl);
            document.querySelector('#player').dispatchEvent(incomingArt);
        }

        let data = await fetch(`/api/artwork/${trackTitle}`);
        if (data.status === 200) {
            artJpeg = await data.blob();
            artJpegUrl = URL.createObjectURL(artJpeg)
            console.log('url', artJpegUrl );
            window.artJpegUrl = artJpegUrl;
            updateArtwork()
        } else if (data.status === 204) updateArtwork();
    } catch (err) {
        console.log('get err: ', err);
    } 


}
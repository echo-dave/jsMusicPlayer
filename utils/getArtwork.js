const fs = require('fs/promises');
const path = require('path');
module.exports = async (trackName) => {
    const defaultImage = path.resolve(process.env.MUSICDIR +'/defaultImage.jpg')
    const trackPath = path.resolve(process.env.MUSICDIR +'/'+ trackName);
    try {
        await fs.stat(trackPath);
            return trackPath
    } catch (err) {
        try {
            await fs.stat(defaultImage)
            return defaultImage
        } catch (err) {
            function NoArtwork (message) {
                this.message = message;
                this.status = 204;
                this.name = "ArtError";
            }
            if (err.code == 'ENOENT') {
                throw new NoArtwork ("no artwork");
            }
            else return err
        }
    }
}
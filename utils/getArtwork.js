const fs = require('fs/promises');
const path = require('path');
module.exports = async (trackName) => {
    const defaultImage = path.resolve(process.env.MUSICDIR +'/defaultImage.jpg')
    const trackPath = path.resolve(process.env.MUSICDIR +'/'+ trackName);
    try {
    const exists = await fs.stat(trackPath);
    if (exists.isFile()) {return trackPath}
    else {
        const defaultExists = await fs.stat(defaultImage)
        if (defaultExists.isFile()) {
            return defaultImage
        }
    }
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
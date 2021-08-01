const fs = require('fs/promises');
const path = require('path');
module.exports = async (trackName) => {
    const trackPath = path.resolve(process.env.MUSICDIR +'/'+ trackName);
    try {
    exists = await fs.stat(trackPath);
    if (exists.isFile()) return trackPath
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
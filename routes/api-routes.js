const fs = require('fs');
const readMusicDir = require("../utils/readMusicDir.js");
const getArtwork = require("../utils/getArtwork.js");


module.exports = function(app) {
    app.get("/api/music", async (req,res) => {
        try {
        console.log(`req: \n`, process.env.MUSICDIR);
        let music = await readMusicDir(process.env.MUSICDIR);
        console.log(`server res:`, music);
        res.json(music);
        }
        catch (err) {
            console.log(`error: `, error);
            res.status(404).json({message: err.message})
        }
        
    })

    app.get("/api/artwork/:name", async (req,res) => {
        try {
        console.log(`art request name: ${req.params.name}`);
        let artwork = await getArtwork(req.params.name + '.jpg');
        console.log('artwork res: ', artwork);
        res.set({'content-type': 'image/jpeg'}).status('200');
        fs.createReadStream(artwork).pipe(res);

        // res.sendFile(artwork, {dotfiles: "ignore"});
        }
        catch (error) {
            console.log('Server error: \n', error);
            if (error.status === 204) res.status(204).send(error.message)
            else res.status(500).send(error)
        }

    })
    
}
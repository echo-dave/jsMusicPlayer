const readMusicDir = require("../utils/readMusicDir.js");
// const getArtwork = require("../utils/getArtwork.js");

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
        let artwork = await getArtwork(process.env.MUSICDIR);
        console.log('artwork res: ', artwork);
        res.json(artwork)
        }
        catch (error) {
            console.log('Server error: \n', error);
            res.status(404).json({message: error.message})
        }

    })
    
}
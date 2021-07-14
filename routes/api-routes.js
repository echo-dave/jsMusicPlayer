const readMusicDir = require("../utils/readMusicDir.js");
const fs = require('fs');

module.exports = function(app) {
    app.get("/api/music", async (req,res) => {
        console.log(`music request`);
        console.log('dir ', process.env.MUSICDIR);
        let music = await readMusicDir(process.env.MUSICDIR);
        console.log(`server res:`, music);
        res.json(music);
        
    })

    app.get('/api/streamdata/:trackTitle', async (req,res) => {

        console.log('params: ', req.params);
        res.setHeader("content-type", "bufferarray");
        fs.createReadStream(`${process.env.MUSICDIR}/${req.params.trackTitle}`).pipe(res);

    })
    
}
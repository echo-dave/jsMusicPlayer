const readMusicDir = require("../utils/readMusicDir.js");

module.exports = function(app) {
    app.get("/api/music", async (req,res) => {
        console.log(`req: \n`, process.env.MUSICDIR);
        let music = await readMusicDir(process.env.MUSICDIR);
        console.log(`server res:`, music);
        res.json(music);
        
    })
    
}
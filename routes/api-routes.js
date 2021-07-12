const readMusicDir = require("../utils/readMusicDir.js");

module.exports = function(app) {
    app.post("/api/music", async (req,res) => {
        console.log(`req: \n`, req.body);
        if (req.body) {
        let music = await readMusicDir(req.body.dir);
        console.log(`server res:`, music);
        res.json(music);
        }
    })
    
}
const fs = require('fs/promises');

const musicdir = '../jsMusicPlayer/public/music/';

let files;
let musicFiles = [];
const playbackDir = '/music/';
module.exports = async (dir)  => {
    if (musicFiles.length === 0) {
    try { 
        files = await fs.readdir(dir,{withFileTypes:true});
        console.log(`files: ${files} \n`);

        files.forEach((file,index) => {
            console.log(`--- \n`, file, `\n ---`);

            if (file.isFile()) {
                console.log(`${file.name} is a file to process`)
                musicFiles.push({url: playbackDir+file.name,title: file.name.slice(0,-4), id: index})
            } else {
                console.log(`${file.name} is not a file`);
            }             
        })
    } catch (err) {
    console.error(err);
    }
    }
    console.log(`music ${musicFiles}\n`);
    return musicFiles;


  }

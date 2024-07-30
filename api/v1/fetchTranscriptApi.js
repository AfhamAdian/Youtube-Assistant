const fs = require('fs');
const path = require('path');
const { YoutubeTranscript } = require("youtube-transcript");


async function fetchTranscript( videoLink ) {
    let transcript;
    try{
        transcript = await YoutubeTranscript.fetchTranscript(videoLink);
    } catch (error) {
        console.log(error);
        return -1;
    }

    let text = "";
    for( line of transcript ) {
      text += line.text + " ";
    }
    
    const newDirectory = "D:\\Programming\\VS_code\\NodeJS\\Gemini_Tryout\\assets";
    process.chdir(newDirectory);

    fs.writeFileSync('transcription.txt', text.replace(/\n/g, ''), 'utf8');
}


module.exports = { fetchTranscript } ;
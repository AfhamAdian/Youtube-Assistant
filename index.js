const express = require('express');
const cookieParser = require('cookie-parser'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')

const chatApi = require('./api/v1/ChatApi');
const fetchTranscriptApi = require('./api/v1/fetchTranscriptApi');

const app = express();
app.set("view engine","ejs");
// app.use(express.static(path.join(__dirname, 'views/public')));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));




// creating Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('server started to listening at port 3000'));


// global chat var;
let chatObject;
let chatInitiated = false;
let allReplies = ""; 

app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/404', async (req, res) => {
  res.sendFile(__dirname + '/404.html');
});

app.post('/submitVideoLink', async ( req, res ) => {
  chatInitiated = false;
  try {
      const videoLink = req.body.videoLink;
      console.log(videoLink);

      let flag = await fetchTranscriptApi.fetchTranscript(videoLink);
      if( flag == -1 ){
        console.log( 'Transcription not availabe');
        res.status(500).json({payLoad : 'Transcription not availabe'});
        return;
      }
      chatObject = await chatApi.initiateBot();

      res.status(200).json({payLoad : 'Transcript fetched and chat initiated'});
      chatInitiated = true;
  } catch (error) {
      console.log(error);
      res.status(500).redirect('/404');
  }
});


app.post('/sendMessage', async ( req, res ) => {
  
    try {
        console.log("Message submitted");
  
        if( chatInitiated == false ){
          console.log( 'Chat not initiated');
          res.status(500).json({payLoad : 'Chat not initiated'});
          return;
        }
  
        const message = req.body.message;
        const userQues = message;
        console.log(message);
  
        let reply = await chatApi.sendMessageReturnsResponseText(chatObject, message);
        console.log(reply);
  
        allReplies = reply;
        res.status(200).json({payLoad : allReplies, userQues : userQues});
    } catch (error) {
        console.log(error);
        res.status(500).redirect('/404');
    } 
});

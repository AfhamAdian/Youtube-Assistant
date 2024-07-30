# YouTube-Assistant

# Introduction 
This is a youtube video assistant that uses the transcript from the video and answers questions related to the video.
With help of this you dont need to watch the whole video to get your questions answered.


# How to run the webapp:
#### 1. First clone the repository
```
git clone https://github.com/AfhamAdian/Youtube-Assistant.git
```
#### 2. Open the Directory on VS Code a ies with these commands.
```
npm i
```
```
npm start
```
#### 4. Create a .env file and copy the following in the file. Change the API_KEY with your own gemini api key.
```
API_KEY = "Your-GEMINI-API-KEY"
PORT = 3000
```
#### 5. Head to localhost:3000


# How to use the Assistant:
1.Submit your YouTube video link in the "Video Link" section.

![image](https://github.com/user-attachments/assets/01fc898b-4512-4d73-89bd-b09708e85c00)


2.If the video has a transcript, it will be fetched automatically, and the chat will begin.

![image](https://github.com/user-attachments/assets/d77ce6bd-7691-44cc-9182-043c4a801e15)


3.Enter your queries in the "Message" section, and you're all set!

![image](https://github.com/user-attachments/assets/89f3682f-e577-4af0-bc0c-aa15c17a2c43)

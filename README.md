## Demo to start and stop video preview using Amazon Chime SDK for JavaScript in an React application.

This demo uses routing to show case how one can clear-up the video being previewed when routing to a different route inside a single page application. The application shows two routes:
1. About: Just shows "About" as heading.
2. "Home": When you come to "/home", your video gets previewed. When you move to "/about", you should no longer see a red icon or video being used issue.

Running Steps:
```
git clone <this repo URL>

cd video-preview-demo-app

npm install

npm run start
```
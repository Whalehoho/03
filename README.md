# Project Title
03

## Description

## Features
- Responsive web design
- Interactive 3D elements with Three.js
- Modern, sleek UI/UX

## To Build
- [x] HomePage with a 3D model
- [ ] Overall front-end design
- [ ] Database management
- [ ] Adding features from previous project: ***Project based on mediapipe***
- [x] Live room for multiple users to join

## Preview
![Home](https://github.com/Whalehoho/03/blob/deploy/assets/Media_240330_044829.gif)

![Live Lobby light](https://github.com/Whalehoho/03/blob/deploy/assets/Screenshot_2024-03-31_211159.png)

![Live Lobby dark](https://github.com/Whalehoho/03/blob/deploy/assets/Screenshot_2024-03-31_210752.png)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install:
- Node.js
- Vite
- Three.js

### Clone
First, clone the repository to your local machine:

`git clone https://github.com/Whalehoho/03.git`

Navigate to the project directory:

`cd your-project-name`

Install the required dependencies:

`npm install`

Install mkcert independently:

`npm install mkcert -g`

`mkcert create-ca`

`mkcert create-cert`

Launch:

`npm run dev -- --host`

## Built With
- HTML - The markup language used
- CSS - The style sheet language
- JavaScript - The programming language used
- Three.js - 3D library used

## Issues
* scene.gltf & scene.bin 404 not found. (Solution: put them in public folder under root folder. Use new URL(path) to load model. Set path to "/scene.gltf")
* During local development, use Express server for backend logic. When deploying to Vercel, typically don't need to set up an Express server explicitly for your backend logic, especially if you're leveraging Vercel's serverless functions. Vercel abstracts away the traditional server setup and automatically handles requests to your API endpoints defined within the /api directory of your project.

**Key Points:**
 - Serverless Functions: In the Vercel environment, backend logic can be implemented through serverless functions. Each JavaScript or TypeScript file inside the /api directory automatically becomes an API endpoint. Vercel invokes these functions in response to incoming HTTP requests, and don't have to manage a server or listen on a port manually.
 - Local Development: For local development, use Express to mimic serverless API locally.
 - Transitioning to Vercel:
     1. **Organize API Endpoints:** 
      Place server-side code in files within the /api directory at the root of your Vercel project. Each file in this directory becomes an endpoint named after the file. For example, code in /api/generate-token.js is accessible at https://your-vercel-project.vercel.app/api/generate-token.
     2. **Example Serverless Function (/api/generate-token.js):**
     ```
     // This file is placed in the /api directory of your project.
     const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

     module.exports = (req, res) => {
        const { channelName } = req.query;
        const appId = process.env.AGORA_APP_ID;
        const appCertificate = process.env.AGORA_APP_CERTIFICATE;
        const role = RtcRole.PUBLISHER;
        const expirationTimeInSeconds = 3600 * 24; // Token expires in 24 hours
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
        const uid = 0; // Pass 0 if you want Agora to assign a UID for you

        const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpiredTs);

        res.json({ token });
     };
     
     ```


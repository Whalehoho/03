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
- [ ] Live room for multiple users to join

## Preview
![Preview](https://github.com/Whalehoho/03/blob/deploy/assets/Media_240330_044829.gif)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
What things you need to install:
- Node.js
- Vite
- Three.js

### Clone
First, clone the repository to your local machine:

`git clone https://github.com/yourusername/your-project-name.git`

Navigate to the project directory:

`cd your-project-name`

Install the required dependencies:

`npm install`

`npm run dev -- --host`

## Built With
- HTML - The markup language used
- CSS - The style sheet language
- JavaScript - The programming language used
- Three.js - 3D library used

## Encountered Problem
* scene.gltf & scene.bin 404 not found. (Solution: put them in public folder under root folder. Use new URL(path) to load model. Set path to "/scene.gltf")

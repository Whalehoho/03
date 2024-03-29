import * as THREE from 'three' 
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Canvas
const canvas = document.querySelector('canvas.webgl')

// scene
const scene = new THREE.Scene();
// scene.background = new THREE.Color(0xe3e7ed); 


// sizes
const sizes = {
    width: innerWidth,
    height: innerHeight
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,2000)
camera.position.set(0,-0.5,1.75);



// renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0); 
renderer.render(scene, camera);

// control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableZoom = false;

const clock = new THREE.Clock();

// update
controls.update();

// Add lighting to the scene
const ambientLight = new THREE.AmbientLight(0x00fffc, 0.4);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 1);
directionalLight.position.set(5, 5, 5); // Adjust the light's position as needed
scene.add(directionalLight);

// Additional Point Light: 0xff9000
const pointLight = new THREE.PointLight("purple", 2); // Intensity set to 1, decay over 100 units
pointLight.position.set(0, -0.5, -0.1); // Position it above and in front of the model
scene.add(pointLight);

document.getElementById('theme-toggle').addEventListener('click', function() {
    // Define the SVG HTML you want to add
    const svgHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 18V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 4.93L7.04993 7.05" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 16.95L19.0697 19.07" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.92993 19.07L7.04993 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16.9497 7.05L19.0697 4.93" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    // Check the current theme and toggle it
    if (document.body.getAttribute('data-theme') === 'dark') {
      document.body.setAttribute('data-theme', 'light');
        this.innerHTML = "Dark Mode";
        pointLight.color.set("purple");
    } else {
      document.body.setAttribute('data-theme', 'dark');
        this.innerHTML = "Light Mode";
        pointLight.color.set(0x00ff00);
    }
});

const spotLight = new THREE.SpotLight(0xffffff,1,0,Math.PI/2,0.1,2); // White light
scene.add(spotLight);

// const spotLight2 = new THREE.SpotLight("blue",5,0,Math.PI/4,0.1,2); // White light
// scene.add(spotLight2);



let myModel = null; // Scoped outside

// Instantiate the loader
const loader = new GLTFLoader();
loader.load('./discobolus_the_discus_thrower/scene.gltf', function (gltf) {
    // const skinMaterial = new THREE.MeshStandardMaterial({ color: 0xffd1a9 });
    const skinMaterial = new THREE.MeshStandardMaterial({ color: "white" });
    skinMaterial.roughness = 1;
    gltf.scene.traverse(function (object) {
        if (object.isMesh) {
            object.material = skinMaterial;
            // object.material.map = colorTexture; // Apply the texture
            object.material.needsUpdate = true; // Ensure the material updates
        }
    });
    gltf.scene.position.set(0, -0.9, 0);
    gltf.scene.scale.set(1.15, 1.15, 1.15);
    scene.add(gltf.scene);
    myModel = gltf.scene; // Assign the model for global access
}, undefined, function (error) {
    console.error(error);
});

// const textureLoader = new THREE.TextureLoader();
// textureLoader.load(
//     './media/vintage_card.png', 
//   function(texture) {
//     scene.background = texture; 
//   },
//   undefined,
//   function(err) {
//     console.error('An error happened during loading the texture.', err);
//   }
// );


// animate
function animate(){
    const elapsedTime = clock.getElapsedTime();

    if (myModel) {
        // myModel.rotation.x += 0.01;
        myModel.rotation.y -= 0.015; // Rotate if model is loaded
    }
    
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();

// Responsive design: Update the camera and renderer size when the window is resized
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Update camera aspect ratio and projection matrix
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(width, height);
});

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

renderer.domElement.addEventListener('click', onClick, false);

function onClick(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObject(myModel, true);

    if (intersects.length > 0) {
        // Hit detected, change the light to a random color
        const randomColor = Math.floor(Math.random() * 0xffffff);
        ambientLight.color.setHex(randomColor);
        directionalLight.color.setHex(randomColor);
    }
}








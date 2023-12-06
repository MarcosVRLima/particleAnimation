import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const values = {
    1: [100, -6, -5.5, -2, 2, -5, -5.5],
    2: [40, -5.5, -4, 2, 1.5, -5, -5.5],
    3: [40, -4, -4.5, 2, 0, -5, -5.5],
    4: [40, -5.5, -4, 0, 0.5, -5, -5.5],

    5: [100, -6 + 3, -5.5 + 3, -2, 2, -5, -5.5],
    6: [40, -5.5 + 3, -4 + 3, 2, 1.5, -5, -5.5],
    7: [40, -4 + 3, -4.5 + 3, 2, 0, -5, -5.5],
    8: [40, -5.5 + 3, -4 + 3, 0, 0.5, -5, -5.5],

    9: [100, -6 + 6, -5.5 + 6, -2, 2, -5, -5.5],
    10: [40, -5.5 + 6, -4 + 6, 2, 1.5, -5, -5.5],
    11: [20, -4 + 6, -4.5 + 6, 2, 1, -5, -5.5],
    12: [40, -5.5 + 6, -4 + 6, -2, -1.5, -5, -5.5],
    13: [40, -4 + 6, -4.5 + 6, 0, -1.5, -5, -5.5],
    14: [20, -5 + 6, -4 + 6, 0, -0.5, -5, -5.5],

    15: [100, -6 + 9, -5.5 + 9, -2, 2, -5, -5.5],
    16: [40, -5.5 + 9, -4 + 9, 2, 1.5, -5, -5.5],
    17: [40, -5.5 + 9, -4 + 9, 0.25, -0.25, -5, -5.5],
    18: [40, -5.5 + 9, -4 + 9, -2, -1.5, -5, -5.5],

    19: [100, -6 + 12, -5.5 + 12, -2, 2, -5, -5.5],
    20: [40, -5.5 + 12, -4 + 12, 2, 1.5, -5, -5.5],
    21: [40, -5.5 + 12, -4 + 12, 0.25, -0.25, -5, -5.5],
    22: [40, -5.5 + 12, -4 + 12, -2, -1.5, -5, -5.5],

    23: [100, -6 + 15, -5.5 + 15, -2, 2, -5, -5.5],
    24: [40, -5.5 + 15, -4 + 15, 2, 1.5, -5, -5.5],
    25: [40, -5.5 + 15, -4 + 15, -2, -1.5, -5, -5.5],
    26: [20, -4 + 15, -4.5 + 15, 2, 1, -5, -5.5],
}

const createParticles = (
    num_particles,
    min_x,
    max_x,
    min_y,
    max_y,
    min_z,
    max_z) => {

        const particles = new THREE.Group();

        for (let i = 0; i < num_particles; i++) {
            const particle = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 8, 8),
                new THREE.MeshBasicMaterial({ color: 0xffffff })
            );

            // Set random positions within the specified range
            particle.position.x = Math.random() * (max_x - min_x) + min_x;
            particle.position.y = Math.random() * (max_y - min_y) + min_y;
            particle.position.z = Math.random() * (max_z - min_z) + min_z;

            particles.add(particle);
        }

        scene.add(particles);

        return particles;
    }
;

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//orbit controls configuration
const controls = new OrbitControls( camera, renderer.domElement );

//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 0, 5);
controls.update();
let time = 0
// Animation loop
const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;

    // Atualize as posições das partículas para criar uma animação
    vetorDeParticulas.forEach(particles => {
        particles.children.forEach(particle => {
            particle.position.x += time;
            particle.position.y += time;
        });
    });

    // Render the scene
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Vetor para armazenar os arrays de partículas
const vetorDeParticulas = [];

let keys = Object.keys(values).length

for(let i = 1; i <= keys; i++){
    vetorDeParticulas.push(createParticles(values[i][0], values[i][1], values[i][2], values[i][3], values[i][4], values[i][5], values[i][6]));
}

console.log(vetorDeParticulas)
// Start the animation
animate();
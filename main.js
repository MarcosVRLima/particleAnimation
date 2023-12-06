import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Função para obter uma cor aleatória em formato hexadecimal
function getRandomColor() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + "0".repeat(6 - randomColor.length) + randomColor;
}

// Array de posições e características das partículas
const POS = [
    [200, -6, -5.5, -2, 2, -5.5, -5],
    [40, -5.5, -4, 1.5, 2, -5.5, -5],
    [40, -4.5, -4, 0, 2, -5.5, -5],
    [40, -5.5, -4, 0, 0.5, -5.5, -5],

    [200, -6 + 3, -5.5 + 3, -2, 2, -5.5, -5],
    [40, -5.5 + 3, -4 + 3, 1.5, 2, -5.5, -5],
    [40, -4.5 + 3, -4 + 3, 0, 2, -5.5, -5],
    [40, -5.5 + 3, -4 + 3, 0, 0.5, -5.5, -5],

    [200, -6 + 6, -5.5 + 6, -2, 2, -5.5, -5],
    [50, -5.5 + 6, -4 + 6, 1.5, 2, -5.5, -5],
    [50, -4.5 + 6, -4 + 6, 1, 2, -5.5, -5],
    [50, -5.5 + 6, -4 + 6, -2, -1.5, -5.5, -5],
    [50, -4.5 + 6, -4 + 6, -1.5, 0, -5.5, -5],
    [50, -5 + 6, -4 + 6, -0.5, 0, -5.5, -5],

    [200, -6 + 9, -5.5 + 9, -2, 2, -5.5, -5],
    [50, -5.5 + 9, -4 + 9, 1.5, 2, -5.5, -5],
    [50, -5.5 + 9, -4 + 9, -0.25, 0.25, -5.5, -5],
    [50, -5.5 + 9, -4 + 9, -2, -1.5, -5.5, -5],

    [200, -6 + 12, -5.5 + 12, -2, 2, -5.5, -5],
    [50, -5.5 + 12, -4 + 12, 1.5, 2, -5.5, -5],
    [50, -5.5 + 12, -4 + 12, -0.25, 0.25, -5.5, -5],
    [50, -5.5 + 12, -4 + 12, -2, -1.5, -5.5, -5],
    [200, -6 + 15, -5.5 + 15, -2, 2, -5.5, -5],
    [50, -5.5 + 15, -4 + 15, 1.5, 2, -5.5, -5],
    [50, -5.5 + 15, -4 + 15, -2, -1.5, -5.5, -5],
    [50, -4.5 + 15, -4 + 15, 1, 2, -5.5, -5],
    [50, -4.5 + 15, -4 + 15, -2, -1, -5.5, -5],
];

// Função para criar partículas
const createParticles = (
    num_particles,
    min_x,
    max_x,
    min_y,
    max_y,
    min_z,
    max_z
) => {
    const particles = new THREE.Group();

    for (let i = 0; i < num_particles; i++) {
        const particle = new THREE.Mesh(
            new THREE.SphereGeometry(0.1, 8, 8),
            new THREE.MeshStandardMaterial(new THREE.MeshStandardMaterial({
                color: getRandomColor(),
                metalness: 0.2, // Totalmente metálico
                roughness: 0, // Ajuste conforme necessário
            }))
        );

        // Define posições aleatórias dentro do intervalo especificado
        particle.position.x = Math.random() * (max_x - min_x) + min_x;
        particle.position.y = Math.random() * (max_y - min_y) + min_y;
        particle.position.z = Math.random() * (max_z - min_z) + min_z;

        particles.add(particle);
    }

    scene.add(particles);
    return particles;
};

// Função para animar as partículas
const animateParticles = (particles) => {
    let i = 0;
    let max_movement = 0.03;
    particles.forEach((group) => {
        group.children.forEach((particle) => {
            // Move as partículas aleatoriamente dentro do intervalo especificado
            particle.position.x += Math.random() * max_movement * 2 - max_movement;
            particle.position.y += Math.random() * max_movement * 2 - max_movement;
            particle.position.z += Math.random() * max_movement * 2 - max_movement;
            
            // Limita as posições das partículas aos limites especificados
            let x_min = POS[i][1];
            let x_max = POS[i][2];
            let y_min = POS[i][3];
            let y_max = POS[i][4];
            let z_min = POS[i][5];
            let z_max = POS[i][6];

            particle.position.x = Math.max(x_min, Math.min(x_max, particle.position.x));
            particle.position.y = Math.max(y_min, Math.min(y_max, particle.position.y));
            particle.position.z = Math.max(z_min, Math.min(z_max, particle.position.z));
        });
        i++;
    });
}

// Configuração da cena, câmera e renderizador
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

// Posicionamento inicial da câmera
camera.position.z = 5;
camera.position.y = -2;
camera.position.x = 2.5;

// Adiciona luz direcional à cena
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 0, 1).normalize();
scene.add(directionalLight);

// Trata o redimensionamento da janela
window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Criação de todas as partículas conforme as posições especificadas
const all_particles = [];
POS.forEach((pos) => {
    all_particles.push(createParticles(pos[0], pos[1], pos[2], pos[3], pos[4], pos[5], pos[6]));
});

// Carrega uma textura de fundo
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./background.jpg'); // Substitua pelo caminho da sua textura
scene.background = texture;

// Ambient light (default)
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Input select for lighting effects
const lightingOptions = document.createElement('select');

// Add options to the select element
const options = [
    { name: 'Default', ambient: { intensity: 1 }, directional: { intensity: 1 } },
    { name: 'Dim', ambient: { intensity: 0.5 }, directional: { intensity: 0.5 } },
    { name: 'Bright', ambient: { intensity: 1.5 }, directional: { intensity: 1.5} },
];

options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.name;
    optionElement.text = option.name;
    lightingOptions.add(optionElement);
});

// Event listener for lighting options changes
lightingOptions.addEventListener('change', (event) => {
    const selectedOption = options.find((option) => option.name === event.target.value);

    // Update ambient light intensity
    ambientLight.intensity = selectedOption.ambient.intensity;

    // Update directional light intensity
    directionalLight.intensity = selectedOption.directional.intensity;
});

// Append lighting options to the body
document.body.appendChild(lightingOptions);

// Função de animação
const animate = () => {
    requestAnimationFrame(animate);

    // Anima as partículas
    animateParticles(all_particles);
    
    // Adiciona movimento e rotação à câmera para uma animação mais dinâmica
    camera.rotation.x = 0.2 * Math.sin(Date.now() * 5e-4) + 0.1;
    camera.position.z = 5 * Math.sin(Date.now() * 1e-3) + 10;

    // Renderiza a cena
    renderer.render(scene, camera);
};

// Inicia a animação
animate();

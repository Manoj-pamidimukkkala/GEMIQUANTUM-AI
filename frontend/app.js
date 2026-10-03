// Holographic 3D Globe with Three.js
const container = document.getElementById('hologram-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// Central Holographic Core (Icosahedron)
const coreGeo = new THREE.IcosahedronGeometry(2, 2);
const coreMat = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.7
});
const coreMesh = new THREE.Mesh(coreGeo, coreMat);
scene.add(coreMesh);

// Outer Rotating Arc Ring
const ringGeo = new THREE.TorusGeometry(3.2, 0.03, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });
const ringMesh = new THREE.Mesh(ringGeo, ringMat);
ringMesh.rotation.x = Math.PI / 3;
scene.add(ringMesh);

// Ambient Particle Wave
const particleGeo = new THREE.BufferGeometry();
const particleCount = 600;
const posArray = new Float32Array(particleCount * 3);

for(let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 12;
}

particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particleMat = new THREE.PointsMaterial({ size: 0.04, color: 0x00f3ff });
const particles = new THREE.Points(particleGeo, particleMat);
scene.add(particles);

camera.position.z = 7;

// Render Loop
function animate() {
    requestAnimationFrame(animate);
    coreMesh.rotation.y += 0.005;
    coreMesh.rotation.x += 0.003;
    ringMesh.rotation.z -= 0.008;
    particles.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Resize listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Command Execution Handler
document.getElementById('send-btn').addEventListener('click', async () => {
    const input = document.getElementById('command-input');
    const terminal = document.getElementById('terminal-out');
    if (!input.value.trim()) return;

    terminal.innerHTML += `<div>> ${input.value}</div>`;
    const prompt = input.value;
    input.value = '';

    try {
        const res = await fetch('http://localhost:8080/api/system/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        terminal.innerHTML += `<div style="color: #ffd700;">[GEMINI-QUANTUM]: ${data.response}</div>`;
        terminal.scrollTop = terminal.scrollHeight;
    } catch (err) {
        terminal.innerHTML += `<div style="color: #ff4444;">[ERROR]: Offline mode / API unreachable.</div>`;
    }
});

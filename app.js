let scene, camera, renderer, coreGroup, ring1, ring2;

function init() {
  const container = document.getElementById('canvas-container');
  scene = new THREE.Scene();
  
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  coreGroup = new THREE.Group();

  // Core Sphere
  const sphereGeo = new THREE.IcosahedronGeometry(1, 2);
  const sphereMat = new THREE.MeshBasicMaterial({
    color: 0x00f3ff,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });
  const coreSphere = new THREE.Mesh(sphereGeo, sphereMat);
  coreGroup.add(coreSphere);

  // Outer Ring 1
  const ringGeo1 = new THREE.TorusGeometry(1.6, 0.02, 16, 100);
  const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xffd700, wireframe: true });
  ring1 = new THREE.Mesh(ringGeo1, ringMat1);
  coreGroup.add(ring1);

  // Outer Ring 2
  const ringGeo2 = new THREE.TorusGeometry(2.1, 0.01, 16, 100);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true });
  ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  coreGroup.add(ring2);

  scene.add(coreGroup);

  window.addEventListener('resize', onWindowResize);
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  coreGroup.rotation.y += 0.005;
  ring1.rotation.x += 0.01;
  ring1.rotation.y += 0.01;
  ring2.rotation.z += 0.008;

  renderer.render(scene, camera);
}

function triggerQuantumPulse() {
  const log = document.getElementById('terminal-log');
  log.innerHTML += `<br>[QUANTUM] State Vector collapse triggered...`;
  coreGroup.scale.set(1.2, 1.2, 1.2);
  setTimeout(() => coreGroup.scale.set(1, 1, 1), 300);
}

function toggleHUDTheme() {
  document.documentElement.style.setProperty('--primary', '#ff3366');
  document.getElementById('terminal-log').innerHTML += `<br>[SYS] Switched to High-Alert Red Mode.`;
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = init;

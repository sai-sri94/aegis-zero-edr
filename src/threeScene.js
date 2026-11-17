import * as THREE from 'three';

export function initThreeScene() {
  const canvas = document.getElementById('webgl-stage');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 26;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // Outer Wireframe Architectural Mesh
  let currentGeo = new THREE.IcosahedronGeometry(8.5, 2);
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0x3B82F6,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });
  const wireMesh = new THREE.Mesh(currentGeo, wireMat);
  mainGroup.add(wireMesh);

  // Inner Glowing Endpoint Core
  const innerGeo = new THREE.OctahedronGeometry(4.8, 1);
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0x14B8A6,
    wireframe: true,
    transparent: true,
    opacity: 0.7
  });
  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
  mainGroup.add(innerMesh);

  // Orbital Endpoint Telemetry Nodes
  const nodeCount = 160;
  const pGeo = new THREE.BufferGeometry();
  const pos = new Float32Array(nodeCount * 3);
  for (let i = 0; i < nodeCount; i++) {
    const r = 10 + Math.random() * 4;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i * 3 + 2] = r * Math.cos(phi);
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x60A5FA, size: 0.35 });
  const points = new THREE.Points(pGeo, pMat);
  mainGroup.add(points);

  // Interactive Mouse Rotation inside the 3D Stage
  let targetRotX = 0;
  let targetRotY = 0;
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    targetRotY = ((e.clientX - rect.left) / rect.width - 0.5) * 2.5;
    targetRotX = ((e.clientY - rect.top) / rect.height - 0.5) * 2.5;
  });

  // 3D Mode Switcher Buttons (Fleet Globe / Zero-Day Shield / MD5 Helix)
  document.querySelectorAll('.stage-mode-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.stage-mode-btn').forEach((b) => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800', 'text-slate-300');
      });
      btn.classList.remove('bg-slate-800', 'text-slate-300');
      btn.classList.add('bg-blue-600', 'text-white');

      const mode = btn.dataset.mode;
      wireMesh.geometry.dispose();
      if (mode === 'globe') {
        wireMesh.geometry = new THREE.IcosahedronGeometry(8.5, 2);
        wireMat.color.setHex(0x3B82F6);
      } else if (mode === 'shield') {
        wireMesh.geometry = new THREE.TorusKnotGeometry(5.8, 1.5, 100, 16);
        wireMat.color.setHex(0x10B981);
      } else if (mode === 'helix') {
        wireMesh.geometry = new THREE.DodecahedronGeometry(8.5, 1);
        wireMat.color.setHex(0x8B5CF6);
      }
    });
  });

  window.addEventListener('resize', () => {
    if (!canvas.clientWidth) return;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  });

  function animate() {
    requestAnimationFrame(animate);
    wireMesh.rotation.y += 0.004;
    innerMesh.rotation.x -= 0.006;
    points.rotation.y -= 0.002;

    mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.06;
    mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.06;

    renderer.render(scene, camera);
  }
  animate();
}
const btnGalaxy = document.getElementById('btn-galaxy');
const musica = document.getElementById('musicaAmor');
const phrases = ["Te amo", "Mi vida", "Mi refugio", "Siempre juntos", "Eres magia", "Mi paz"];

let scene, camera, renderer, galaxyParticles, clock;

function initGalaxy() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('galaxy-container').appendChild(renderer.domElement);
    clock = new THREE.Clock();

    const geo = new THREE.BufferGeometry();
    const pos = [];
    for (let i = 0; i < 15000; i++) {
        pos.push((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({ size: 0.02, color: 0xff4d6d });
    galaxyParticles = new THREE.Points(geo, mat);
    scene.add(galaxyParticles);

    const overlay = document.getElementById('love-phrases-overlay');
    phrases.forEach((txt, i) => {
        const div = document.createElement('div');
        div.className = 'love-phrase';
        div.innerText = txt;
        div.style.left = Math.random() * 80 + '%';
        div.style.top = Math.random() * 80 + '%';
        div.style.animationDelay = i + 's';
        overlay.appendChild(div);
    });
}

function animate() {
    requestAnimationFrame(animate);
    galaxyParticles.rotation.y += 0.002;
    renderer.render(scene, camera);
}

function mostrarRazones() { document.getElementById('modal-razones').classList.remove('hidden'); }
function mostrarRecuerdos() { document.getElementById('modal-recuerdos').classList.remove('hidden'); }
function cerrarModales() { 
    document.getElementById('modal-razones').classList.add('hidden'); 
    document.getElementById('modal-recuerdos').classList.add('hidden');
}

btnGalaxy.addEventListener('click', () => {
    musica.play().catch(() => {});
    document.getElementById('view-card').classList.add('hidden');
    document.getElementById('view-galaxy').classList.remove('hidden');
    initGalaxy();
    animate();
});

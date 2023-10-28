var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer({ alpha: true }); // Set alpha to true
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Raycaster und Mausvektor hinzufügen
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

// Laden Sie die Textur
var textureLoader = new THREE.TextureLoader();
textureLoader.load('/bilder/earth.jpeg', function(texture) {
    var geometry = new THREE.SphereGeometry(1, 32, 32);
    var material = new THREE.MeshBasicMaterial({map: texture});
    var sphere = new THREE.Mesh(geometry, material);
    sphere.name = "earth"; // Name der Erdkugel festlegen
    scene.add(sphere);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y -= 0.01;
        renderer.render(scene, camera);
    }
    animate();
});

// Event-Listener für Mausklicks hinzufügen
window.addEventListener('click', function(event) {
    // Normalisierte Koordinaten des Mausklicks berechnen
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster aktualisieren
    raycaster.setFromCamera(mouse, camera);

    // Überprüfen, ob die Erde angeklickt wurde
    var intersects = raycaster.intersectObjects(scene.children);
    for (var i = 0; i < intersects.length; i++) {
        if (intersects[i].object.name === "earth") {
            window.location.href = "main.html"; // Zur main.html-Seite navigieren
        }
    }
}, false);

// Event-Listener für Fenstergrößenänderungen hinzufügen
window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);

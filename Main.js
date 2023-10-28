const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const projectContainer = document.querySelector('.project-container');
const projects = projectContainer.querySelectorAll('.project');
let currentProjectIndex = 0;

prevButton.addEventListener('click', () => {
  projects[currentProjectIndex].classList.remove('active');
  currentProjectIndex = (currentProjectIndex - 1 + projects.length) % projects.length;
  projects[currentProjectIndex].classList.add('active');
});

nextButton.addEventListener('click', () => {
  projects[currentProjectIndex].classList.remove('active');
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  projects[currentProjectIndex].classList.add('active');
});

// Funktion zum Anzeigen des aktuellen Projekts und Aktivieren der Slide-Buttons
function showCurrentProject() {
  for (let i = 0; i < projects.length; i++) {
    if (i === currentProjectIndex) {
      projects[i].classList.add('active');
    } else {
      projects[i].classList.remove('active');
    }
  }
}

// Event-Listener hinzufügen, um das Menü zu schließen und das Projekt anzuzeigen
document.getElementById('menuToggle').addEventListener('click', function() {
    var nav = document.querySelector('nav');
    var overlay = document.getElementById('overlay');
    if (nav.style.transform === 'translateX(-100%)') {
        nav.style.transform = 'translateX(0)';
        overlay.style.display = 'block'; // Overlay anzeigen
    } else {
        nav.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none'; // Overlay ausblenden
        showCurrentProject(); // Aktuelles Projekt anzeigen
    }
});

// Event-Listener hinzufügen, um das Menü zu schließen, wenn auf das Overlay geklickt wird
document.getElementById('overlay').addEventListener('click', function() {
    var nav = document.querySelector('nav');
    var overlay = document.getElementById('overlay');
    nav.style.transform = 'translateX(-100%)';
    overlay.style.display = 'none'; // Overlay ausblenden
    showCurrentProject(); // Aktuelles Projekt anzeigen
});

// Event-Listener hinzufügen, um das Menü zu schließen, wenn außerhalb des Menüs geklickt wird
window.addEventListener('click', function(event) {
    var nav = document.querySelector('nav');
    var menuToggle = document.getElementById('menuToggle');
    var overlay = document.getElementById('overlay');
    if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.style.transform === 'translateX(0)') {
        nav.style.transform = 'translateX(-100%)';
        overlay.style.display = 'none'; // Overlay ausblenden
        showCurrentProject(); // Aktuelles Projekt anzeigen
    }
});

// Standardmäßig das erste Projekt anzeigen
showCurrentProject();

// Skills section dynamic
document.addEventListener('DOMContentLoaded', () => {
  const skillsWidths = [65, 65, 65, 65, 50, 50];
  const skillElements = document.querySelectorAll('.dark-grey');

  skillElements.forEach((element, index) => {
      setTimeout(() => {
          element.style.width = skillsWidths[index] + '%';
      }, index * 1000);
  });
});

// Projects slider
setInterval(() => {
  projects[currentProjectIndex].classList.remove('active');
  currentProjectIndex = (currentProjectIndex + 1) % projects.length;
  projects[currentProjectIndex].classList.add('active');
}, 5000);



    //toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar =  document.querySelector('.navbar');

menuIcon.onclick = () =>  {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active')
}


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () =>{
    sections.forEach(sec => {
        let top = window.scrollyY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id')

        if(top >= offset && top  < + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    //sticky nabar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100); 


    //remove toggle icon and navbar when click navbar link (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active')
};

//scroll reveal
ScrollReveal({ 
    //reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
 });

 ScrollReveal().reveal('.home-content, .heading', { origin: 'top'});
 ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form',
  { origin: 'bottom'});

ScrollReveal().reveal('.home-content h1, .about-img, .shtml, .css, .bst, .php, .decontainer', { origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content, .sql, .cpp, .py, .js, .bx ', { origin: 'right'});

//typed js
const typed = new Typed('.multiple-text', {
    strings:[ "Fullstack Website Developer", "Aspiring Software Engineer","Youtuber"],
    typeSpeed: 100,
    backSpedd: 100,
    backDelay: 1000,
    loop: true
})

// Light/Dark mode toggle
const modeToggle = document.getElementById('modeToggle');
const body = document.body;

function setMode(mode) {
  if (mode === 'light') {
    body.classList.add('light-mode');
    modeToggle.textContent = '☀️';
  } else {
    body.classList.remove('light-mode');
    modeToggle.textContent = '🌙';
  }
  localStorage.setItem('colorMode', mode);
}

modeToggle.addEventListener('click', () => {
  const isLight = body.classList.contains('light-mode');
  setMode(isLight ? 'dark' : 'light');
});

// On load, set mode from localStorage or system preference
(function() {
  const saved = localStorage.getItem('colorMode');
  if (saved) {
    setMode(saved);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    setMode('light');
  } else {
    setMode('dark');
  }
})();

// Advanced theme switcher
const themeSwitcher = document.getElementById('themeSwitcher');
const themeSwatches = document.querySelectorAll('.theme-swatch');
const customAccent = document.getElementById('customAccent');

function setTheme(theme) {
  // Remove all theme-* classes
  document.body.classList.remove(
    'theme-ocean', 'theme-sunset', 'theme-emerald', 'theme-classic-dark', 'theme-minimal-light'
  );
  if (theme) {
    document.body.classList.add('theme-' + theme);
    localStorage.setItem('theme', theme);
  } else {
    localStorage.removeItem('theme');
  }
  // Highlight selected swatch
  themeSwatches.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.theme === theme);
  });
}

themeSwatches.forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(btn.dataset.theme);
  });
});

// Custom accent color
customAccent.addEventListener('input', (e) => {
  const color = e.target.value;
  document.documentElement.style.setProperty('--accent-color', color);
  document.documentElement.style.setProperty('--main-color', color);
  localStorage.setItem('customAccent', color);
});

// On load, restore theme and custom accent
(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
  const savedAccent = localStorage.getItem('customAccent');
  if (savedAccent) {
    document.documentElement.style.setProperty('--accent-color', savedAccent);
    document.documentElement.style.setProperty('--main-color', savedAccent);
    customAccent.value = savedAccent;
  }
})();
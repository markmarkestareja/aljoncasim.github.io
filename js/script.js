document.addEventListener("DOMContentLoaded", function() {
    const pageContent = document.querySelector('.page-content');

    // Combine both sets of links into an array (use classes or IDs)
    const allLinks = {
        home: ['#home-link-top', '#home-link-sidebar'],
        about: ['#about-link-top', '#about-link-sidebar'],
        projects: ['#projects-link-top', '#projects-link-sidebar'],
        certificates: ['#certificates-link-top', '#certificates-link-sidebar'],
        contact: ['#contact-link-top', '#contact-link-sidebar']
    };

    // Function to load content into page-content
    function loadContent(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                pageContent.innerHTML = data;
            })
            .catch(error => {
                console.error('Error loading page:', error);
                pageContent.innerHTML = '<p>Sorry, there was an error loading the content.</p>';
            });
    }

    // Function to set active link in both topNav and sidebar
    function setActiveLink(activePage) {
        // Remove 'active' class from all links
        Object.values(allLinks).forEach(linkSet => {
            linkSet.forEach(linkSelector => {
                const link = document.querySelector(linkSelector);
                if (link) {
                    link.parentElement.classList.remove('active');
                }
            });
        });

        // Add 'active' class to both topNav and sidebar links for the active page
        allLinks[activePage].forEach(linkSelector => {
            const link = document.querySelector(linkSelector);
            if (link) {
                link.parentElement.classList.add('active');
            }
        });
    }

    // Function to handle link clicks and load appropriate content
    function handleLinkClick(page, activePage) {
        loadContent(`html/${page}.html`);
        setActiveLink(activePage);
        localStorage.setItem('activePage', activePage);

        if (activePage === 'home') {
            typewriterEffect();  // Call the typewriter effect for the home page
        }
    }

    // Event delegation for link clicks
    document.addEventListener('click', function(e) {
        const target = e.target;

        // Check if the clicked element is a navigation link
        Object.keys(allLinks).forEach(page => {
            allLinks[page].forEach(linkSelector => {
                if (target.matches(linkSelector)) {
                    e.preventDefault();
                    handleLinkClick(page, page);
                }
            });
        });
    });

    // Check localStorage for the active page and load it
    const activePage = localStorage.getItem('activePage') || 'home';

    switch(activePage) {
        case 'home':
            handleLinkClick('home', 'home');
            break;
        case 'about':
            handleLinkClick('about', 'about');
            break;
        case 'projects':
            handleLinkClick('projects', 'projects');
            break;
        case 'certificates':
            handleLinkClick('certificates', 'certificates');
            break;
        case 'contact':
            handleLinkClick('contact', 'contact');
            break;
        default:
            handleLinkClick('home', 'home');
    }
});




// ==============T Y P E  W R I T E R
const words = ["graphic designer?", "data entry clerk?"];
let wordIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const eraseSpeed = 50;
const delayBetweenWords = 500; // Delay between words

function typewriterEffect() {
    wordIndex = 0; // Reset word index to start from the first word
    charIndex = 0; // Reset char index to start from the beginning

    function type() {
        const typewriterSpan = document.querySelector(".typewriter");
        if (typewriterSpan) {
            if (charIndex < words[wordIndex].length) {
                typewriterSpan.textContent += words[wordIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(erase, delayBetweenWords);
            }
        }
    }

    function erase() {
        const typewriterSpan = document.querySelector(".typewriter");
        if (typewriterSpan) {
            if (charIndex > 0) {
                typewriterSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, eraseSpeed);
            } else {
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, typeSpeed);
            }
        }
    }

    setTimeout(type, delayBetweenWords + 250);
}


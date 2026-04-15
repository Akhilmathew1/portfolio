// Intersection Observer for scroll animations (fade-up instead of fade-in)
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

function initAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach(el => fadeObserver.observe(el));
}

// Ensure elements in initial viewport animate immediately
window.addEventListener('load', () => {
    initAnimations();
    checkInitialVisibility();
});

function checkInitialVisibility() {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        const elements = activePage.querySelectorAll('.fade-up');
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }
}

// Page Navigation Logic
function showPage(pageId) {
    if(event) event.preventDefault();

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if(event && event.target) {
        event.target.classList.add('active');
    }

    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
        // Reset animations on hide so they run again when page is shown
        const fadedInElems = page.querySelectorAll('.fade-up.visible');
        fadedInElems.forEach(el => el.classList.remove('visible'));
    });
    
    const activePage = document.getElementById(pageId);
    activePage.classList.add('active');

    // Scroll to top
    window.scrollTo(0, 0);

    // Re-trigger observer visibility check
    setTimeout(() => {
        checkInitialVisibility();
    }, 50);
}

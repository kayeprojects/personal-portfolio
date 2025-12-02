document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projectsGrid && typeof projects !== 'undefined') {
        projects.forEach(project => {
            const card = document.createElement('div');
            card.classList.add('project-card');
            
            const tagsHtml = project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('');
            
            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}" class="project-image">
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tags">${tagsHtml}</div>
                    <div class="project-links">
                        <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo">GITHUB</a>
                        <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo">DEMO</a>
                    </div>
                </div>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // 2. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        const toggleMenu = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
        
        hamburger.addEventListener('click', toggleMenu);
        
        // Keyboard support for hamburger
        hamburger.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMenu();
            }
        });
        
        // Close menu when clicking a nav link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    // 3. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section'); // Add class for CSS to handle
        observer.observe(section);
    });
});

// Add fade-in styles dynamically if not in CSS
const style = document.createElement('style');
style.textContent = `
    .fade-in-section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

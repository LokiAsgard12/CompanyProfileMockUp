// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Dynamic Services Load
const servicesData = [
    { icon: 'fas fa-code', title: 'Web Development', desc: 'Pembangunan website profesional dengan teknologi terkini' },
    { icon: 'fas fa-mobile-alt', title: 'Mobile Apps', desc: 'Pengembangan aplikasi mobile cross-platform' },
    { icon: 'fas fa-palette', title: 'UI/UX Design', desc: 'Desain antarmuka pengguna yang modern dan intuitif' }
];

const servicesGrid = document.querySelector('.services-grid');
servicesData.forEach(service => {
    servicesGrid.innerHTML += `
        <div class="service-item">
            <i class="${service.icon} fa-3x"></i>
            <h3>${service.title}</h3>
            <p>${service.desc}</p>
        </div>
    `;
});

// Portfolio Filter
const portfolioData = [
    { category: 'web', image: 'project1.jpg', title: 'E-commerce Platform' },
    { category: 'mobile', image: 'project2.jpg', title: 'Fitness Mobile App' },
    { category: 'design', image: 'project3.jpg', title: 'Brand Identity' }
];

const portfolioGrid = document.querySelector('.portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

function loadPortfolio(filter = 'all') {
    portfolioGrid.innerHTML = '';
    const filteredData = filter === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filter);
    
    filteredData.forEach(item => {
        portfolioGrid.innerHTML += `
            <div class="portfolio-item">
                <img src="images/projects/${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h4>${item.title}</h4>
                </div>
            </div>
        `;
    });
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadPortfolio(btn.dataset.filter);
    });
});

// Initial Load
loadPortfolio();

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Scroll Animation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
            const currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(currentId)) {
                    link.classList.add('active');
                }
            });
        }
    });
});

//Update Tambahan

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check localStorage for theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) body.classList.add(savedTheme);

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
});

// Testimonial Slider
const testimonials = [
    {
        text: "Pelayanan sangat profesional dan hasilnya melebihi ekspektasi!",
        name: "Budi Santoso",
        company: "PT Maju Jaya"
    },
    {
        text: "Tim yang responsif dan solutif. Sangat direkomendasikan!",
        name: "Ani Wijaya",
        company: "Startup Tech"
    },
    {
        text: "Hasil kerja cepat dan berkualitas tinggi. Terima kasih!",
        name: "Rina Permata",
        company: "UKM Kreatif"
    }
];

const track = document.querySelector('.testimonial-track');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function renderTestimonials() {
    track.innerHTML = testimonials.map((testi, index) => `
        <div class="testimonial-item ${index === currentIndex ? 'active' : ''}">
            <p>"${testi.text}"</p>
            <h4>${testi.name}</h4>
            <small>${testi.company}</small>
        </div>
    `).join('');
}

function updateSlider(direction) {
    currentIndex = (currentIndex + direction + testimonials.length) % testimonials.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    renderTestimonials();
}

prevBtn.addEventListener('click', () => updateSlider(-1));
nextBtn.addEventListener('click', () => updateSlider(1));
renderTestimonials();

// Form Validation
const form = document.getElementById('contactForm');
const messageInput = document.getElementById('message');
const charCounter = document.querySelector('.char-counter span');

form.addEventListener('input', (e) => {
    if (e.target.id === 'message') {
        const count = e.target.value.length;
        charCounter.textContent = count;
        e.target.parentElement.querySelector('.char-counter').style.color = 
            count > 500 ? 'red' : '#666';
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Simpan ke localStorage (simulasi)
    const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
    };
    
    localStorage.setItem('contactForm', JSON.stringify(formData));
    
    // Tampilkan feedback
    const submitBtn = form.querySelector('button');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
    
    setTimeout(() => {
        submitBtn.innerHTML = 'Terkirim! <i class="fas fa-check"></i>';
        form.reset();
        charCounter.textContent = '0';
        setTimeout(() => {
            submitBtn.innerHTML = 'Kirim Pesan <i class="fas fa-paper-plane"></i>';
        }, 2000);
    }, 1500);
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('section, .service-item, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Hover Animation
document.querySelectorAll('.service-item, .portfolio-item').forEach(item => {
    item.classList.add('scale-in');
});

// Auto-rotate slider
setInterval(() => updateSlider(1), 5000);
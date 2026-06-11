/* ==========================================================================
   THE ROW LANDMARK - JavaScript Functionality
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. DOM Elements
    const body = document.body;
    const mainNav = document.getElementById('main-nav');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const quickThemeToggle = document.getElementById('quick-theme-toggle');
    
    // Gallery Elements
    const toggleBtns = document.querySelectorAll('.gallery-toggle-btn');
    const daytimeGrid = document.getElementById('daytime-grid');
    const nighttimeGrid = document.getElementById('nighttime-grid');
    
    // Lightbox Elements
    const lightbox = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const lightboxClose = document.getElementById('lightbox-close-btn');
    const lightboxPrev = document.getElementById('lightbox-prev-btn');
    const lightboxNext = document.getElementById('lightbox-next-btn');

    // Contact Form Elements
    const inquiryForm = document.getElementById('inquiry-form');
    const formSuccess = document.getElementById('form-success');

    // 2. Data Arrays for Lightbox
    const dayImages = [
        {
            src: 'الواجهه الشاملة.jpeg',
            title: 'الواجهة الشاملة للمشروع نهاراً',
            desc: 'لقطة كاملة تبرز التفاصيل الهندسية للكتل والخطوط العمودية من المنظور العام للمارة.'
        },
        {
            src: 'عين طائر.jpeg',
            title: 'عين الطائر - منظور جوي عام نهاراً',
            desc: 'رؤية علوية تبيّن توزيع الكتلة المعمارية وتكاملها مع الحديقة والشارع العام.'
        },
        {
            src: 'لقطة المنظور الواسع.jpeg',
            title: 'لقطة المنظور الواسع للمبنى والبيئة المحيطة',
            desc: 'تكامل ديناميكي يبرز علاقة المشروع بالشارع الرئيسي والأرصفة والمساحات الخضراء.'
        },
        {
            src: 'عين نملة.jpeg',
            title: 'عين نملة - منظور سفلي شاهق نهاراً',
            desc: 'زاوية درامية تبرز فخامة الارتفاع وضخامة الكتل الحجرية وألواح الترافرتين الفاخرة.'
        },
        {
            src: 'التفاصيل السكنية .jpeg',
            title: 'التفاصيل والشرائح السكنية',
            desc: 'تقريب بصري يوضح النوافذ والشرائح اللوفرية المانعة للشمس بأناقتها وتماشيها مع الواجهة.'
        },
        {
            src: 'لقطة مقربة للشطفة التجارية.jpeg',
            title: 'لقطة مقربة للشطفة التجارية',
            desc: 'تفاصيل الزاوية التجارية المائلة والشاشات الخارجية لعرض العلامات والماركات الراقية.'
        },
        {
            src: 'لقطة مقربة للمدخل المزدوج (Close-Up Double-Height Grand Entrance.jpeg',
            title: 'المدخل المزدوج الفاخر',
            desc: 'مدخل سكني بارتفاع طابقين يمنح الساكنين تجربة وصول ملوكية وفخامة متميزة.'
        },
        {
            src: 'عين طائر 2.jpeg',
            title: 'عين الطائر 2 - منظور جوي خلفي نهاراً',
            desc: 'لقطة علوية ممتازة تبرز تصميم السطح، المناطق المشتركة والتشجير العلوي.'
        },
        {
            src: '2 عين نملة.jpeg',
            title: 'عين نملة 2 - دراما الكتل نهاراً',
            desc: 'رؤية عمودية من أسفل توضح الانحناءات الهندسية وكسوة الحجر الطبيعي نهاراً.'
        }
    ];

    const nightImages = [
        {
            src: 'render ✅ - night/عين طائر.jpeg',
            title: 'عين الطائر - منظور جوي عام ليلاً',
            desc: 'منظور جوي يظهر الإضاءة العمرانية الذكية وتألق المبنى كمنارة في سماء المدينة.'
        },
        {
            src: 'render ✅ - night/شارع.jpeg',
            title: 'مشهد الواجهة والشارع العام ليلاً',
            desc: 'حيوية الأرصفة المحيطة وتكامل خطوط الإنارة الليد الدافئة الممتدة على طول البرج.'
        },
        {
            src: 'render ✅ - night/مدخل.jpeg',
            title: 'المدخل السكني الرئيسي ليلاً',
            desc: 'أثر التباين الضوئي الدافئ الخارج من بهو المدخل مزدوج الارتفاع ليرحب بالقادمين.'
        },
        {
            src: 'render ✅ - night/الشارع جاني.jpeg',
            title: 'الواجهة الجانبية والشارع الفرعي ليلاً',
            desc: 'امتداد التفاصيل البصرية وتنسيق الإنارة الخافتة على المداخل والممرات الجانبية.'
        }
    ];

    let currentGalleryMode = 'day';
    let currentImageIndex = 0;

    // 3. Navigation Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.classList.add('scrolled');
        } else {
            mainNav.classList.remove('scrolled');
        }
    });

    // 4. Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = mobileNavToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-xmark');
        } else {
            icon.classList.replace('fa-xmark', 'fa-bars');
        }
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            mobileNavToggle.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
        });
    });

    // 5. Global Theme Toggle (Day / Night Theme for whole page)
    quickThemeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');
        const icon = quickThemeToggle.querySelector('i');
        const span = quickThemeToggle.querySelector('span');

        if (isLight) {
            icon.classList.replace('fa-moon', 'fa-sun');
            span.textContent = 'عرض نهاري';
            // Sync gallery to Day if theme switched to light
            switchGalleryMode('day');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            span.textContent = 'عرض ليلي';
            // Sync gallery to Night if theme switched to dark
            switchGalleryMode('night');
        }
    });

    // 6. Gallery Mode Switcher
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            switchGalleryMode(mode);
        });
    });

    function switchGalleryMode(mode) {
        currentGalleryMode = mode;
        
        // Update Active Button
        toggleBtns.forEach(btn => {
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Toggle Grids with fade
        if (mode === 'day') {
            nighttimeGrid.classList.remove('active');
            daytimeGrid.classList.add('active');
        } else {
            daytimeGrid.classList.remove('active');
            nighttimeGrid.classList.add('active');
        }
    }

    // 7. Lightbox System
    function getActiveImageArray() {
        return currentGalleryMode === 'day' ? dayImages : nightImages;
    }

    function openLightbox(index) {
        const images = getActiveImageArray();
        currentImageIndex = index;
        
        lightboxImg.src = images[currentImageIndex].src;
        lightboxTitle.textContent = images[currentImageIndex].title;
        lightboxDesc.textContent = images[currentImageIndex].desc;
        
        lightboxCurrent.textContent = currentImageIndex + 1;
        lightboxTotal.textContent = images.length;
        
        lightbox.classList.add('active');
        body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        body.style.overflow = ''; // Restore scrolling
        lightboxImg.src = ''; // Clear source to prevent ghost image on reopen
    }

    function nextImage() {
        const images = getActiveImageArray();
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateLightboxContent(images);
    }

    function prevImage() {
        const images = getActiveImageArray();
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateLightboxContent(images);
    }

    function updateLightboxContent(images) {
        lightboxImg.style.animation = 'none';
        // Trigger reflow to restart animation
        void lightboxImg.offsetWidth; 
        lightboxImg.src = images[currentImageIndex].src;
        lightboxImg.style.animation = 'zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
        
        lightboxTitle.textContent = images[currentImageIndex].title;
        lightboxDesc.textContent = images[currentImageIndex].desc;
        lightboxCurrent.textContent = currentImageIndex + 1;
    }

    // Attach Event Listeners to Gallery Cards
    document.querySelectorAll('#daytime-grid .gallery-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    document.querySelectorAll('#nighttime-grid .gallery-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Lightbox Controls Event Listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Close Lightbox clicking on backdrop
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard controls for Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            // Since direction is RTL, Right arrow goes to Previous visually, or Next in array
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    });

    // 8. Reveal on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Animates once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 9. ScrollSpy - Active Navbar Links on Scroll
    const sections = document.querySelectorAll('header, section');
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120; // offset navbar height

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // 10. Form Submission Handling (Simulation)
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values just to simulate validation
            const name = document.getElementById('form-name').value.trim();
            const phone = document.getElementById('form-phone').value.trim();
            const email = document.getElementById('form-email').value.trim();
            
            if (name && phone && email) {
                // Animate Form fading out
                inquiryForm.style.opacity = '0';
                setTimeout(() => {
                    inquiryForm.style.display = 'none';
                    formSuccess.style.display = 'flex';
                }, 400);
            }
        });
    }
});

        // Mobile Menu Toggle
        const mobileMenu = document.getElementById('mobileMenu');
        const navLinks = document.getElementById('navLinks');

        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navLinks.classList.remove('active');
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Fade in animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(44, 62, 80, 0.95)';
            } else {
                header.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
            }
        });

        // Gallery hover effects
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
            });
        });

        // Add click effect to buttons
        document.querySelectorAll('.btn, .org-card, .stat-card').forEach(element => {
            element.addEventListener('click', function(e) {
                // Create ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Counter animation for statistics
        function animateCounters() {
            const counters = document.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.textContent);
                const increment = target / 200;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
            });
        }

        // Trigger counter animation when about section is visible
        const aboutSection = document.querySelector('.about');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterObserver.observe(aboutSection);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Typing effect for hero title
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero h1');
            if (heroTitle) {
                const originalText = heroTitle.textContent;
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 50);
                }, 1000);
            }
        });

        // Back to top button
        const backToTopButton = document.createElement('button');
        backToTopButton.innerHTML = '↑';
        backToTopButton.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #e74c3c;
            color: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(backToTopButton);

        // Show/hide back to top button
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.opacity = '1';
                backToTopButton.style.visibility = 'visible';
            } else {
                backToTopButton.style.opacity = '0';
                backToTopButton.style.visibility = 'hidden';
            }
        });

        // Back to top functionality
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Add hover effect to back to top button
        backToTopButton.addEventListener('mouseenter', () => {
            backToTopButton.style.background = '#c0392b';
            backToTopButton.style.transform = 'scale(1.1)';
        });

        backToTopButton.addEventListener('mouseleave', () => {
            backToTopButton.style.background = '#e74c3c';
            backToTopButton.style.transform = 'scale(1)';
        });

        // Loading screen
        window.addEventListener('load', () => {
            const loader = document.createElement('div');
            loader.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #2c3e50;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                transition: opacity 0.5s ease;
            `;
            
            loader.innerHTML = `
                <div style="text-align: center; color: white;">
                    <div style="width: 50px; height: 50px; border: 3px solid #3498db; border-top: 3px solid #e74c3c; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
                    <h3>Memuat Desa Sukamaju...</h3>
                </div>
            `;
            
            // Add spinning animation
            const spinStyle = document.createElement('style');
            spinStyle.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(spinStyle);
            
            document.body.appendChild(loader);
            
            // Remove loader after 2 seconds
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }, 2000);
        });

        // Modal Galeri
        function openModal(element) {
            const modal = document.getElementById('galleryModal');
            const modalImage = document.getElementById('modalImage');

            // Ambil konten dari elemen yang diklik (placeholder)
            const clonedContent = element.querySelector('.placeholder-image').cloneNode(true);
            modalImage.innerHTML = '';
            modalImage.appendChild(clonedContent);

            modal.style.display = 'block';
        }

        function closeModal() {
            const modal = document.getElementById('galleryModal');
            modal.style.display = 'none';
        }

        // Tutup modal jika klik di luar kontennya
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('galleryModal');
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });


        console.log('🏘️ Website Desa Sukamaju berhasil dimuat!');
        console.log('📞 Hubungi kami di: info@desasukamaju.id');
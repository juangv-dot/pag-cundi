
// JavaScript Document

        // Interactive Pricing Calculator
        //const teamSlider = document.getElementById('teamSlider');
        //const storageSlider = document.getElementById('storageSlider');
        const teamSizeDisplay = document.getElementById('teamSize');
        const storageSizeDisplay = document.getElementById('storageSize');
        
        const starterPriceEl = document.getElementById('starterPrice');
        const proPriceEl = document.getElementById('proPrice');
        const enterprisePriceEl = document.getElementById('enterprisePrice');

        function calculatePricing() {
            //const teamSize = parseInt(teamSlider.value);
            //const storageSize = parseInt(storageSlider.value);
            
            // Update displays
            teamSizeDisplay.textContent = teamSize;
            storageSizeDisplay.textContent = storageSize + ' GB';
            
            // Calculate prices based on team size and storage
            const baseStarterPrice = 29;
            const baseProPrice = 149;
            const baseEnterprisePrice = 299;
            
            // Price per additional team member
            const teamMultiplier = Math.max(1, teamSize / 10);
            const storageMultiplier = Math.max(1, storageSize / 500);
            
            const starterPrice = Math.round(baseStarterPrice * Math.min(teamMultiplier, 2) * Math.min(storageMultiplier, 1.5));
            const proPrice = Math.round(baseProPrice * Math.min(teamMultiplier, 3) * Math.min(storageMultiplier, 2));
            const enterprisePrice = Math.round(baseEnterprisePrice * teamMultiplier * storageMultiplier);
            
            // Animate price changes
            animatePrice(starterPriceEl, starterPrice);
            animatePrice(proPriceEl, proPrice);
            animatePrice(enterprisePriceEl, enterprisePrice);
        }

        function animatePrice(element, newPrice) {
            const currentPrice = parseInt(element.textContent);
            const difference = newPrice - currentPrice;
            const steps = 20;
            const stepValue = difference / steps;
            let step = 0;
            
            const interval = setInterval(() => {
                step++;
                element.textContent = Math.round(currentPrice + (stepValue * step));
                
                if (step >= steps) {
                    element.textContent = newPrice;
                    clearInterval(interval);
                }
            }, 20);
        }

		// Pricing Sliders (solo si existen)
		//const teamSlider = document.getElementById('teamRange');
		//const storageSlider = document.getElementById('storageRange');

		//if (teamSlider && storageSlider) {
		//	teamSlider.addEventListener('input', calculatePricing);
		//	storageSlider.addEventListener('input', calculatePricing);
		//}


        // Scroll animations
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.padding = '0.5rem 2rem';
                nav.style.background = 'rgba(15, 23, 42, 0.95)';
            } else {
                nav.style.padding = '1rem 2rem';
                nav.style.background = 'rgba(15, 23, 42, 0.8)';
            }
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Close mobile menu if open
                    mobileNav.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });

        // Mobile menu functionality
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const mobileNav = document.getElementById('mobileNav');

        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });

        // Contact form handling
		const contactForm = document.getElementById('contactForm');

		if (contactForm) {
			contactForm.addEventListener('submit', function(e) {

            e.preventDefault();
            
            // Get form values
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                company: document.getElementById('company').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simulate form submission
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                submitButton.textContent = 'Message Sent! ✓';
                submitButton.style.background = 'var(--secondary)';
                
                // Reset form
                this.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }, 1500);
		});
}

        // Animate stats on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe stat cards
        document.querySelectorAll('.stat-card').forEach(card => {
            observer.observe(card);
        });

        // Hero background image rotation
        const heroBackgrounds = document.querySelectorAll('.hero-bg');
        let currentBgIndex = 0;

        function rotateBackgrounds() {
            // Remove active class from all backgrounds
            heroBackgrounds.forEach(bg => bg.classList.remove('active'));
            
            // Add active class to current background
            heroBackgrounds[currentBgIndex].classList.add('active');
            
            // Move to next background
            currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
        }

        // Start with first image
        heroBackgrounds[0].classList.add('active');

        // Rotate every 5 seconds
        setInterval(rotateBackgrounds, 5000);

		document.querySelectorAll(".toggle-btn").forEach(btn => {
			btn.addEventListener("click", () => {
				const card = btn.closest(".feature-card-large"); // Contenedor correcto
				const text = card.querySelector(".text-collapse");

				text.classList.toggle("expanded");

				btn.textContent = text.classList.contains("expanded")
					? "Leer menos"
					: "Leer más";
			});
		});

		// 🔄 Carrusel de Línea del Tiempo
		const track = document.querySelector(".carousel-track");
		const prevBtn = document.querySelector(".prev");
		const nextBtn = document.querySelector(".next");

		let index = 0;

		function updateCarousel() {
			const itemWidth = document.querySelector(".timeline-item").offsetWidth + 16;
			track.style.transform = `translateX(-${index * itemWidth}px)`;
		}

		nextBtn.addEventListener("click", () => {
			if (index < track.children.length - 1) {
				index++;
				updateCarousel();
			}
		});

		prevBtn.addEventListener("click", () => {
			if (index > 0) {
				index--;
				updateCarousel();
			}
		});

		// Swipe en móviles
		let startX = 0;

		track.addEventListener("touchstart", e => {
			startX = e.touches[0].clientX;
		});

		track.addEventListener("touchend", e => {
			let endX = e.changedTouches[0].clientX;
			if (startX - endX > 50 && index < track.children.length - 1) {
				index++;
				updateCarousel();
			}
			if (endX - startX > 50 && index > 0) {
				index--;
				updateCarousel();
			}
		});

		// === Carrusel de la línea del tiempo
		document.addEventListener('DOMContentLoaded', () => {
		  const track = document.querySelector(".carousel-track");
		  if (!track) return;

		  const items = Array.from(track.querySelectorAll(".timeline-item"));
		  const prevBtn = document.querySelector(".prev");
		  const nextBtn = document.querySelector(".next");
		  if (items.length === 0) return;

		  let index = 0;
		  let autoplayIntervalId = null;
		  const AUTOPLAY_DELAY = 3000; // 3s

		  function getItemWidth() {
			const first = items[0];
			const style = getComputedStyle(first);
			const marginRight = parseFloat(style.marginRight) || 0;
			return first.offsetWidth + marginRight;
		  }

		  function updateCarousel(animate = true) {
			const itemWidth = getItemWidth();
			if (animate) track.style.transition = 'transform 0.4s ease';
			else track.style.transition = 'none';
			track.style.transform = `translateX(-${index * itemWidth}px)`;
		  }

		  function goNext() {
			index = (index + 1) % items.length;
			updateCarousel();
			resetAutoplay();
		  }

		  function goPrev() {
			index = (index - 1 + items.length) % items.length;
			updateCarousel();
			resetAutoplay();
		  }

		  if (nextBtn) nextBtn.addEventListener('click', goNext);
		  if (prevBtn) prevBtn.addEventListener('click', goPrev);

		  let startX = 0;
		  track.addEventListener('touchstart', e => {
			startX = e.touches[0].clientX;
		  }, {passive: true});

		  track.addEventListener('touchend', e => {
			const endX = e.changedTouches[0].clientX;
			const dx = startX - endX;
			if (dx > 50) { // swipe left
			  goNext();
			} else if (dx < -50) { // swipe right
			  goPrev();
			}
		  });

		  function startAutoplay() {
			stopAutoplay();
			autoplayIntervalId = setInterval(() => {
			  index = (index + 1) % items.length;
			  updateCarousel();
			}, AUTOPLAY_DELAY);
		  }

		  function stopAutoplay() {
			if (autoplayIntervalId !== null) {
			  clearInterval(autoplayIntervalId);
			  autoplayIntervalId = null;
			}
		  }

		  function resetAutoplay() {
			stopAutoplay();
			startAutoplay();
		  }


		  const carouselWrapper = track.parentElement || track;
		  carouselWrapper.addEventListener('mouseenter', stopAutoplay);
		  carouselWrapper.addEventListener('mouseleave', startAutoplay);


		  window.addEventListener('resize', () => {
			updateCarousel(false);
		  });


		  updateCarousel(false);
		  startAutoplay();
		});

		// === Carrusel ARPANET
		document.addEventListener("DOMContentLoaded", () => {
			const track = document.querySelector(".arpanet-track");
			if (!track) return;

			const items = Array.from(track.querySelectorAll(".timeline-item"));
			const prevBtn = document.querySelector(".arpanet-prev");
			const nextBtn = document.querySelector(".arpanet-next");

			let index = 0;
			let autoplayInterval = null;
			const AUTOPLAY_DELAY = 3000; // 3 segundos

			function getItemWidth() {
				const first = items[0];
				const style = getComputedStyle(first);
				const marginRight = parseFloat(style.marginRight) || 16;
				return first.offsetWidth + marginRight;
			}

			function update(animate = true) {
				const width = getItemWidth();
				track.style.transition = animate ? "transform 0.4s ease" : "none";
				track.style.transform = `translateX(-${index * width}px)`;
			}

			function goNext() {
				index = (index + 1) % items.length;
				update();
				resetAutoplay();
			}

			function goPrev() {
				index = (index - 1 + items.length) % items.length;
				update();
				resetAutoplay();
			}

			nextBtn.addEventListener("click", goNext);
			prevBtn.addEventListener("click", goPrev);

			let startX = 0;

			track.addEventListener("touchstart", e => {
				startX = e.touches[0].clientX;
			}, { passive: true });

			track.addEventListener("touchend", e => {
				const endX = e.changedTouches[0].clientX;
				const diff = startX - endX;

				if (diff > 50) goNext();
				else if (diff < -50) goPrev();
			});

			function startAutoplay() {
				stopAutoplay();
				autoplayInterval = setInterval(() => {
					goNext();
				}, AUTOPLAY_DELAY);
			}

			function stopAutoplay() {
				if (autoplayInterval) clearInterval(autoplayInterval);
			}

			function resetAutoplay() {
				stopAutoplay();
				startAutoplay();
			}

			const wrapper = track.parentElement;
			wrapper.addEventListener("mouseenter", stopAutoplay);
			wrapper.addEventListener("mouseleave", startAutoplay);

			window.addEventListener("resize", () => update(false));

			update(false);
			startAutoplay();
		});

export default function mobileAppSectionEffects() {
  // Only run if the mobile app section exists
  const mobileSection = document.querySelector('.mobile-app-section');
  if (!mobileSection) return;

  // Auto Screen Slider
  let currentSlide = 0;
  const slides = mobileSection.querySelectorAll('.screen-slide');
  const indicators = mobileSection.querySelectorAll('.indicator');
  const slider = mobileSection.querySelector<HTMLElement>('#screen-slider');

  function showSlide(index: number) {
    currentSlide = index;
    if (!slider) return;
    const offset = -index * 100;
    slider.style.transform = `translateX(${offset}%)`;
    indicators.forEach((indicator, i) => {
      if (i === index) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  if (slides.length && indicators.length && slider) {
    // Auto slide every 4 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }, 4000);

    // Manual indicator click
    indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => {
        showSlide(index);
      });
    });

    // Show first slide
    showSlide(0);
  }

  // Store Button Click Handlers
  const appStoreBtn = mobileSection.querySelector('.app-store-btn');
  const playStoreBtn = mobileSection.querySelector('.play-store-btn');

  if (appStoreBtn) {
    appStoreBtn.addEventListener('click', function () {
      alert('🍎 Redirecting to App Store...\n\nThe TennisFinder app will be available soon!');
    });
    appStoreBtn.addEventListener('click', () => trackInteraction('Download Click', 'App Store'));
  }
  if (playStoreBtn) {
    playStoreBtn.addEventListener('click', function () {
      alert('📱 Redirecting to Google Play...\n\nThe TennisFinder app will be available soon!');
    });
    playStoreBtn.addEventListener('click', () => trackInteraction('Download Click', 'Google Play'));
  }

  // Animate stats on scroll
  const statsSection = mobileSection.querySelector('.app-stats');
  if (statsSection) {
    const observerOptions = { threshold: 0.5, rootMargin: '0px' };
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          statsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    statsObserver.observe(statsSection);
  }

  function animateStats() {
    const statNumbers = mobileSection.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = stat.textContent || '';
      const isDecimal = target.includes('.');
      const numericPart = parseFloat(target);
      const suffix = target.replace(/[\d.]/g, '');
      let current = 0;
      const increment = numericPart / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= numericPart) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          if (isDecimal) {
            stat.textContent = current.toFixed(1) + suffix;
          } else {
            stat.textContent = Math.floor(current).toLocaleString() + suffix;
          }
        }
      }, 30);
    });
  }

  // Floating elements enhanced animation
  const floatingElements = mobileSection.querySelectorAll('.floating-element');
  floatingElements.forEach((element, index) => {
    (element as HTMLElement).style.animation = `float 3s ease-in-out infinite`;
    (element as HTMLElement).style.animationDelay = `${index}s`;
    element.addEventListener('mouseenter', function () {
      (this as HTMLElement).style.transform = 'scale(1.1) rotate(5deg)';
      (this as HTMLElement).style.transition = 'transform 0.3s ease';
    });
    element.addEventListener('mouseleave', function () {
      (this as HTMLElement).style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Feature badges hover effect
  const featureBadges = mobileSection.querySelectorAll('.feature-badge');
  featureBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function () {
      (this as HTMLElement).style.transform = 'scale(1.05) translateY(-3px)';
      (this as HTMLElement).style.transition = 'all 0.3s ease';
      (this as HTMLElement).style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.15)';
    });
    badge.addEventListener('mouseleave', function () {
      (this as HTMLElement).style.transform = 'scale(1) translateY(0)';
      (this as HTMLElement).style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    });
  });

  // Phone mockup tilt effect on mouse move
  const phoneMockup = mobileSection.querySelector<HTMLElement>('.phone-mockup');
  const phoneContainer = mobileSection.querySelector<HTMLElement>('.phone-container');
  if (phoneContainer && phoneMockup) {
    phoneContainer.addEventListener('mousemove', function (e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;
      phoneMockup.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      phoneMockup.style.transition = 'transform 0.1s ease';
    });
    phoneContainer.addEventListener('mouseleave', function () {
      phoneMockup.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      phoneMockup.style.transition = 'transform 0.5s ease';
    });
  }

  // QR Code interaction
  const qrSection = mobileSection.querySelector('.qr-section');
  if (qrSection) {
    qrSection.addEventListener('click', function () {
      alert('📱 Scan this QR code with your phone camera to download the app!\n\nAvailable on both iOS and Android.');
    });
    (qrSection as HTMLElement).style.cursor = 'pointer';
  }

  // Testimonial cards animation on scroll
  const testimonialCards = mobileSection.querySelectorAll('.testimonial-card');
  const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }, index * 150);
        testimonialObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  testimonialCards.forEach(card => {
    (card as HTMLElement).style.opacity = '0';
    (card as HTMLElement).style.transform = 'translateY(30px)';
    (card as HTMLElement).style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    testimonialObserver.observe(card);
  });

  // Feature items scroll animation
  const featureItems = mobileSection.querySelectorAll('.feature-item');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateX(0)';
        }, index * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  featureItems.forEach(item => {
    (item as HTMLElement).style.opacity = '0';
    (item as HTMLElement).style.transform = 'translateX(-20px)';
    (item as HTMLElement).style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    featureObserver.observe(item);
  });

  // Download buttons pulse animation
  function pulseDownloadButtons() {
    const buttons = mobileSection.querySelectorAll('.store-button');
    buttons.forEach(button => {
      (button as HTMLElement).style.animation = 'pulse 2s infinite';
    });
  }

  // Add pulse keyframe
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
  `;
  document.head.appendChild(style);

  // Start pulse after 3 seconds
  setTimeout(pulseDownloadButtons, 3000);

  // Smooth scroll for anchor links (global, not scoped)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Log console message
  console.log('%c🎾 TennisFinder Mobile App Section Loaded! ', 'background: #16a34a; color: white; font-size: 16px; padding: 10px; border-radius: 5px;');
  console.log('%cDownload our app to get started! ', 'color: #16a34a; font-size: 14px; font-weight: bold;');

  // Track user interactions (analytics placeholder)
  function trackInteraction(action: string, label: string) {
    console.log(`User Action: ${action} - ${label}`);
    // Here you would typically send to analytics
    // gtag('event', action, { 'event_label': label });
  }
}
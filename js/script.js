/* 
  Project: Saroj Jawa - Professional Numerologist
  Description: Main JavaScript for UI interactions
*/

document.addEventListener('DOMContentLoaded', () => {

  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('active')) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        } else {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      }
    });

    // Close menu when a navigation link is clicked (excluding dropdown toggles)
    const links = navMenu.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        // Do not close mobile menu if clicking a dropdown toggle on mobile
        const isDropdownToggle = link.classList.contains('dropdown-toggle') || 
                                (link.parentElement.classList.contains('dropdown') && (link.getAttribute('href') === '#' || window.innerWidth <= 992));
        if (isDropdownToggle) {
          return;
        }
        navMenu.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 2. Sticky Header & Shadow on Scroll
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.style.boxShadow = 'var(--shadow-md)';
        header.style.backgroundColor = 'rgba(253, 251, 247, 0.98)';
      } else {
        header.style.boxShadow = 'var(--shadow-sm)';
        header.style.backgroundColor = 'rgba(253, 251, 247, 0.95)';
      }
    });
  }

  // 3. Fade-in Animation Observer with safe instant fallback
  const fadeElements = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const fadeObserverOptions = {
      root: null,
      threshold: 0,
      rootMargin: "0px"
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, fadeObserverOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Immediate fallback if IntersectionObserver is unsupported
    fadeElements.forEach(el => el.classList.add('visible'));
  }

  // 4. Testimonial Slider
  const track = document.querySelector('.testimonial-track');
  if (track) {
    const slides = Array.from(track.children);
    const dots = document.querySelectorAll('.slider-dot');
    let currentIndex = 0;

    const updateSlider = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach(d => d.classList.remove('active'));
      if (dots[index]) dots[index].classList.add('active');
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider(currentIndex);
      });
    });

    // Auto slide
    if (slides.length > 0) {
      setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider(currentIndex);
      }, 5000);
    }
  }

  // 5. Active Link Highlighting (Fixed duplicate variable issue)
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const pageNavLinks = document.querySelectorAll('.nav-link');
  pageNavLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // FAQ Accordion Toggle Logic
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answerDiv = item.querySelector('.faq-answer');
    
    if (questionBtn && answerDiv) {
      // Set initial accessibility state
      questionBtn.setAttribute('aria-expanded', 'false');
      
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close other open FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherBtn = otherItem.querySelector('.faq-question');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          // Add a small buffer for padding to scrollHeight
          answerDiv.style.maxHeight = answerDiv.scrollHeight + 50 + 'px';
        } else {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answerDiv.style.maxHeight = null;
        }
      });
    }
  });

  // Dropdown Click Handling (Desktop & Mobile)
  const dropdownElements = document.querySelectorAll('.dropdown');
  dropdownElements.forEach(dropdown => {
    const toggle = dropdown.querySelector(':scope > .nav-link, :scope > a');
    const menu = dropdown.querySelector('.dropdown-menu');

    if (toggle && menu) {
      toggle.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 992;
        const href = toggle.getAttribute('href');
        const isHash = !href || href === '#' || href === 'javascript:void(0);';

        // On mobile, or if the link is a hash placeholder (like Tools), toggle the dropdown menu
        if (isMobile || isHash) {
          e.preventDefault();
          const isShowing = menu.classList.contains('show');

          // Close all other dropdowns
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.remove('show');
          });

          if (!isShowing) {
            menu.classList.add('show');
            toggle.setAttribute('aria-expanded', 'true');
          } else {
            menu.classList.remove('show');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
        // On desktop, if it has a real URL (like services.html), allow normal navigation to that page!
      });
    }
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.dropdown > a').forEach(toggle => {
        toggle.setAttribute('aria-expanded', 'false');
      });
    }
  });

});

/* ==================================================
   Dual-Tool Tabbed Panel Logic
   (Kundli Generator & Numerology Calculator)
================================================== */
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switcher
    const tabBtns = document.querySelectorAll('.tab-nav-btn');
    const tabCards = document.querySelectorAll('.tab-tool-card');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabCards.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const targetId = btn.getAttribute('data-target');
        const targetCard = document.getElementById(targetId);
        if (targetCard) targetCard.classList.add('active');
      });
    });

    // 2. Kundli Generator Client-Side Integration
    const handleKundliSubmit = async (nameId, dobId, timeId, placeId, spinnerId, resultViewId, resultTitleId, prefix) => {
      const elName = document.getElementById(nameId);
      const elDob = document.getElementById(dobId);
      const elTime = document.getElementById(timeId);
      const elPlace = document.getElementById(placeId);

      const nameInput = elName ? elName.value.trim() : '';
      const dobInput = elDob ? elDob.value : '';
      const timeInput = elTime ? elTime.value : '';
      const placeInput = elPlace ? elPlace.value.trim() : '';

      if (!nameInput || !dobInput || !timeInput || !placeInput) {
        alert('Please fill in all details (Name, DOB, Time, Place).');
        return;
      }

      const spinner = document.getElementById(spinnerId);
      const resultView = document.getElementById(resultViewId);
      const resultTitle = document.getElementById(resultTitleId);

      if (spinner) spinner.style.display = 'inline-block';
      if (resultView) resultView.style.display = 'none';

      try {
        if (!window.KundliCalculator) {
            throw new Error("KundliCalculator library not loaded");
        }
        const data = await window.KundliCalculator.generateKundliData(nameInput, dobInput, timeInput, placeInput);

        if (data.status === 'success' && data.data) {
          const kundliData = data.data;
          const lagnaNo = kundliData.lagna.rashi_no;

          // Render Houses 1 to 12
          for (let i = 1; i <= 12; i++) {
            let rashiNo = ((lagnaNo - 1 + (i - 1)) % 12) + 1;

            const rashiEl = document.getElementById(`${prefix}h${i}-rashi`);
            if (rashiEl) rashiEl.textContent = rashiNo;

            const planetsEl = document.getElementById(`${prefix}h${i}-planets`);
            if (planetsEl && kundliData.houses_grid && kundliData.houses_grid[i]) {
              planetsEl.textContent = kundliData.houses_grid[i].join(', ');
            } else if (planetsEl) {
              planetsEl.textContent = '';
            }
          }

          // Update Summary Badge
          const summaryEl = document.getElementById(prefix ? `${prefix}kundli-summary` : 'kundli-summary');
          if (summaryEl) {
            summaryEl.innerHTML = `<h5 style="margin-bottom: 5px; color: var(--color-primary);">Ascendant: ${kundliData.lagna.rashi} (Lord: ${kundliData.lagna.lord})</h5>`;
            summaryEl.style.display = 'block';
          }

          if (resultTitle) {
            resultTitle.textContent = prefix ? nameInput : `Generated for ${nameInput}`;
          }
          if (resultView) {
            resultView.style.display = 'block';
            resultView.classList.add('fade-in', 'visible');
            resultView.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          alert('Failed to generate Kundli: ' + (data.message || 'Please try again.'));
        }
      } catch (error) {
        console.error('Error generating kundli:', error);
        alert('Error generating Kundli: ' + error.message);
      } finally {
        if (spinner) spinner.style.display = 'none';
      }
    };

    // Attach to index.html Form
    const btnKundli = document.getElementById('btn-generate-kundli');
    if (btnKundli) {
      btnKundli.addEventListener('click', () => {
        handleKundliSubmit('kundli-name', 'kundli-dob', 'kundli-time', 'kundli-place', 'kundli-spinner', 'kundli-result', 'kundli-result-title', '');
      });
    }

    // Attach to kundli-checker.html Form
    const formKundli = document.getElementById('kundliForm');
    if (formKundli) {
      formKundli.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('genBtn');
        let loaderId = null;
        if (btn) {
          const loader = btn.querySelector('.loader');
          if (loader) {
            loader.id = 'chk-spinner';
            loaderId = 'chk-spinner';
          }
        }
        handleKundliSubmit('chk-name', 'chk-dob', 'chk-time', 'chk-place', loaderId, 'kundliResult', 'resName', 'c-');
      });
    }

    // 3. Numerology Calculator Engine
    const btnNum = document.getElementById('btn-calc-num');
    if (btnNum) {
      btnNum.addEventListener('click', () => {
        const elDob = document.getElementById('num-dob');
        if (!elDob || !elDob.value) {
          alert('Please select a valid Date of Birth.');
          return;
        }

        const dobInput = elDob.value;
        const dateParts = dobInput.split('-');
        if (dateParts.length !== 3) {
          alert('Invalid date format.');
          return;
        }

        const [yStr, mStr, dStr] = dateParts;
        const year = parseInt(yStr, 10);
        const month = parseInt(mStr, 10);
        const day = parseInt(dStr, 10);

        if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12) {
          alert('Invalid or impossible date entered.');
          return;
        }

        const daysInMonth = new Date(year, month, 0).getDate();
        if (day < 1 || day > daysInMonth) {
          alert('Invalid or impossible date entered.');
          return;
        }

        const reduceToSingleDigit = (num) => {
          while (num > 9) {
            num = String(num).split('').reduce((acc, curr) => acc + parseInt(curr, 10), 0);
          }
          return num;
        };

        // Mulank is calculated ONLY from the day of birth.
        const mulank = reduceToSingleDigit(day);

        // Bhagyank is calculated from EVERY digit in the full date string.
        let totalSum = 0;
        for (let i = 0; i < dobInput.length; i++) {
          const char = dobInput[i];
          if (char >= '0' && char <= '9') {
            totalSum += parseInt(char, 10);
          }
        }
        const bhagyank = reduceToSingleDigit(totalSum);

        const PLANET_TRAITS = {
          1: { planet: "Sun (Surya)", nature: "Leadership, Pioneer, Confidence", color: "Gold/Orange" },
          2: { planet: "Moon (Chandra)", nature: "Intuition, Harmony, Creativity", color: "White/Silver" },
          3: { planet: "Jupiter (Guru)", nature: "Wisdom, Communication, Ambition", color: "Yellow" },
          4: { planet: "Rahu", nature: "Strategy, Discipline, Unconventional", color: "Grey/Blue" },
          5: { planet: "Mercury (Budh)", nature: "Business, Adaptability, Networking", color: "Green" },
          6: { planet: "Venus (Shukra)", nature: "Luxury, Love, Artistic, Glamour", color: "Light Blue/Pink" },
          7: { planet: "Ketu", nature: "Spirituality, Analysis, Research", color: "White/Smoky" },
          8: { planet: "Saturn (Shani)", nature: "Hard work, Authority, Wealth Management", color: "Dark Blue/Black" },
          9: { planet: "Mars (Mangal)", nature: "Energy, Courage, Humanitarian", color: "Red/Coral" }
        };

        const getTraitHTML = (num) => {
          const trait = PLANET_TRAITS[num];
          if (!trait) return '';
          return `<br><strong>Planet:</strong><br>${trait.planet}<br><br><strong>Nature:</strong><br>${trait.nature}<br><br><strong>Color:</strong><br>${trait.color}`;
        };

        const mulankVal = document.getElementById('mulank-val');
        const mulankTrait = document.getElementById('mulank-trait');
        const bhagyankVal = document.getElementById('bhagyank-val');
        const bhagyankTrait = document.getElementById('bhagyank-trait');

        if (mulankVal) mulankVal.textContent = mulank;
        if (mulankTrait) mulankTrait.innerHTML = getTraitHTML(mulank);
        if (bhagyankVal) bhagyankVal.textContent = bhagyank;
        if (bhagyankTrait) bhagyankTrait.innerHTML = getTraitHTML(bhagyank);

        const numResult = document.getElementById('num-result');
        if (numResult) {
          numResult.style.display = 'flex';
          numResult.classList.add('fade-in', 'visible');
        }
      });
    }
  });
})();

// Force-trigger Hero Video Playback
document.addEventListener('DOMContentLoaded', () => {
  const heroVideo = document.getElementById('mainHeroVideo');
  const fallbackImg = document.getElementById('heroFallbackImg');

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(error => {
      console.warn('Autoplay prevented or video failed to load:', error);
      if (fallbackImg) {
        fallbackImg.style.display = 'block';
        heroVideo.style.display = 'none';
      }
    });
  }
});

// Blog Category Filter & Table of Contents
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.category-filter-nav .filter-btn');
  const blogCards = document.querySelectorAll('.blog-grid .blog-card');
  const resultsCount = document.getElementById('blogResultsCount');
  const noResults = document.getElementById('blogNoResults');

  if (filterBtns.length > 0 && blogCards.length > 0) {
    const filterArticles = (category) => {
      let visibleCount = 0;
      blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        const cardCategories = cardCategory.split(',').map(s => s.trim().toLowerCase());
        const targetCategory = category.toLowerCase();

        if (targetCategory === 'all' || cardCategories.includes(targetCategory)) {
          card.style.display = 'flex';
          card.classList.add('visible');
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (resultsCount) {
        if (category === 'all') {
          resultsCount.textContent = `Showing all ${visibleCount} articles`;
        } else {
          resultsCount.textContent = `Showing ${visibleCount} article${visibleCount === 1 ? '' : 's'} in ${category}`;
        }
      }

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    };

    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        filterBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        const selectedCategory = btn.getAttribute('data-filter') || 'all';
        filterArticles(selectedCategory);
      });
    });

    // Check URL parameters for pre-selected filter (e.g. ?category=numerology)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get('category');
      if (categoryParam) {
        const matchingBtn = Array.from(filterBtns).find(b => 
          (b.getAttribute('data-filter') || '').toLowerCase() === categoryParam.toLowerCase()
        );
        if (matchingBtn) {
          matchingBtn.click();
        }
      }
    } catch (e) {
      // URL parsing fallback
    }
  }

  // Smooth scroll for Table of Contents with sticky header offset
  const tocLinks = document.querySelectorAll('.table-of-contents a[href^="#"]');
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        if (history.pushState) {
          history.pushState(null, null, `#${targetId}`);
        }
      }
    });
  });
});
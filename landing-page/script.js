/**
 * Landing Page Interactive Script
 * - Smooth scroll triggers
 * - Interactive FAQ accordion
 * - Toast notification for '아직 준비 중입니다.'
 * - Sticky navigation highlights
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Toast Notification Setup
  const toastModal = document.getElementById('toast-modal');
  let toastTimer = null;

  function showToast(message = '아직 준비 중입니다.') {
    if (!toastModal) return;
    
    const toastText = toastModal.querySelector('.toast-text');
    if (toastText) toastText.textContent = message;

    toastModal.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastModal.classList.remove('show');
    }, 2500);
  }

  // 2. CTA Click Event Listener (Preparation Stage)
  const ctaButtons = document.querySelectorAll('[data-cta-btn]');
  ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button instanceof HTMLAnchorElement && button.href) return;
      e.preventDefault();
      const buttonType = button.getAttribute('data-cta-btn') || button.id;
      console.log(`[CTA Clicked] ${buttonType}`);
      showToast('아직 준비 중입니다. (쿠팡 링크 연동 예정)');
    });
  });

  // 3. Smooth Scroll Trigger for Nudge Button
  const scrollTrigger = document.getElementById('scroll-trigger');
  if (scrollTrigger) {
    scrollTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector('#features');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // 4. Smooth Navigation Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        const targetSection = document.querySelector(href);
        if (targetSection) {
          e.preventDefault();
          targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // 5. FAQ Accordion Interaction
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const collapse = item.querySelector('.accordion-collapse');

    if (header && collapse) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherCollapse = otherItem.querySelector('.accordion-collapse');
            if (otherCollapse) otherCollapse.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          collapse.style.maxHeight = null;
        } else {
          item.classList.add('active');
          collapse.style.maxHeight = collapse.scrollHeight + 'px';
        }
      });
    }
  });

  // Initialize first FAQ item as open
  const firstAccordion = document.querySelector('.accordion-item.active .accordion-collapse');
  if (firstAccordion) {
    firstAccordion.style.maxHeight = firstAccordion.scrollHeight + 'px';
  }
});

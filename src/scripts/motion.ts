// Restrained, premium GSAP motion. Safe for static build: this only runs in the
// browser. Respects prefers-reduced-motion (disables all motion if set).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function heroIntro() {
  const items = gsap.utils.toArray<HTMLElement>('[data-hero]');
  if (!items.length) return;
  // Sort by the numeric data-hero value for a clean stagger order.
  items.sort((a, b) => Number(a.dataset.hero) - Number(b.dataset.hero));
  gsap.set(items, { opacity: 0, y: 22 });
  gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.7,
    ease: 'power3.out',
    stagger: 0.09,
    delay: 0.05,
  });
}

function scrollReveals() {
  const items = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  items.forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
          onEnter: () => el.classList.add('is-in'),
        },
      }
    );
  });
}

function readingProgress() {
  const bar = document.getElementById('reading-progress');
  if (!bar) return;
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const ratio = max > 0 ? Math.min(1, doc.scrollTop / max) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update, { passive: true });
}

function init() {
  if (reduceMotion) {
    // Make sure nothing stays hidden if motion is disabled.
    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll<HTMLElement>('[data-hero]').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    readingProgress();
    return;
  }
  heroIntro();
  scrollReveals();
  readingProgress();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

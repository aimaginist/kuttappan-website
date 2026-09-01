import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionStorageKey = 'kuttappan-motion';
const dataSaver = Boolean((navigator as Navigator & {connection?: {saveData?: boolean}}).connection?.saveData);

function readMotionSetting() {
  try {
    return window.localStorage.getItem(motionStorageKey);
  } catch {
    return null;
  }
}

function writeMotionSetting(value: 'paused' | 'playing') {
  try {
    window.localStorage.setItem(motionStorageKey, value);
  } catch {
    // Motion still works when storage is unavailable.
  }
}

const storedMotion = readMotionSetting();
let motionPaused = reduceMotion.matches || storedMotion === 'paused' || (dataSaver && storedMotion !== 'playing');

const allVideos = () => Array.from(document.querySelectorAll<HTMLVideoElement>('video'));

function pauseVideos() {
  allVideos().forEach((video) => video.pause());
}

function playVisibleVideos() {
  if (motionPaused || document.hidden) return;
  document.querySelectorAll<HTMLVideoElement>('[data-film-sequence].is-in-view .is-current, video[data-scroll-video].is-in-view').forEach((video) => {
    video.play().catch(() => {});
  });
}

function syncMotionControls() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach((button) => {
    button.classList.toggle('is-paused', motionPaused);
    button.setAttribute('aria-label', motionPaused ? 'Play motion' : 'Pause motion');
    button.setAttribute('aria-pressed', String(motionPaused));
    button.title = motionPaused ? 'Play motion' : 'Pause motion';
  });

  if (motionPaused) {
    pauseVideos();
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
    playVisibleVideos();
  }
}

function setSequenceStep(section: HTMLElement, index: number) {
  const videos = Array.from(section.querySelectorAll<HTMLVideoElement>('[data-sequence-video]'));
  const captions = Array.from(section.querySelectorAll<HTMLElement>('[data-sequence-caption]'));

  videos.forEach((video, videoIndex) => {
    const current = videoIndex === index;
    video.classList.toggle('is-current', current);
    if (!current) {
      video.pause();
      video.currentTime = 0;
    }
  });
  captions.forEach((caption, captionIndex) => caption.classList.toggle('is-current', captionIndex === index));
}

document.querySelectorAll<HTMLElement>('[data-film-sequence]').forEach((section) => {
  const videos = Array.from(section.querySelectorAll<HTMLVideoElement>('[data-sequence-video]'));
  videos.forEach((video, index) => {
    video.addEventListener('ended', () => {
      const nextIndex = (index + 1) % videos.length;
      setSequenceStep(section, nextIndex);
      if (section.classList.contains('is-in-view') && !motionPaused && !document.hidden) videos[nextIndex].play().catch(() => {});
    });
  });
  setSequenceStep(section, 0);
});

document.querySelectorAll<HTMLButtonElement>('[data-motion-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    motionPaused = !motionPaused;
    writeMotionSetting(motionPaused ? 'paused' : 'playing');
    syncMotionControls();
    buildMotion();
  });
});

const siteHeader = document.querySelector<HTMLElement>('[data-site-header]');
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');

function closeMenu({restoreFocus = false} = {}) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
  document.body.classList.remove('menu-open');
  if (restoreFocus) menuButton.focus();
}

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  if (open) {
    closeMenu({restoreFocus: true});
    return;
  }

  menuButton.setAttribute('aria-expanded', 'true');
  menuButton.setAttribute('aria-label', 'Close navigation');
  if (mobileNav) {
    mobileNav.hidden = false;
    window.requestAnimationFrame(() => mobileNav.querySelector<HTMLElement>('a')?.focus());
  }
  document.body.classList.add('menu-open');
});

mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => closeMenu()));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && document.body.classList.contains('menu-open')) {
    closeMenu({restoreFocus: true});
    return;
  }

  if (event.key === 'Tab' && document.body.classList.contains('menu-open') && mobileNav) {
    const focusable = Array.from(mobileNav.querySelectorAll<HTMLElement>('a:not([hidden])'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const syncHeaderState = () => siteHeader?.classList.toggle('is-scrolled', window.scrollY > 20);
window.addEventListener('scroll', syncHeaderState, {passive: true});
window.addEventListener('resize', () => {
  if (window.innerWidth > 820 && document.body.classList.contains('menu-open')) closeMenu();
}, {passive: true});
syncHeaderState();

const scrollVideos = Array.from(document.querySelectorAll<HTMLVideoElement>('video[data-scroll-video]'));
const filmSequences = Array.from(document.querySelectorAll<HTMLElement>('[data-film-sequence]'));

function setVideoVisibility(video: HTMLVideoElement, visible: boolean) {
  video.classList.toggle('is-in-view', visible);
  if (visible && !motionPaused && !document.hidden) video.play().catch(() => {});
  else video.pause();
}

function setSequenceVisibility(section: HTMLElement, visible: boolean) {
  section.classList.toggle('is-in-view', visible);
  const videos = Array.from(section.querySelectorAll<HTMLVideoElement>('[data-sequence-video]'));
  if (visible && !motionPaused && !document.hidden) section.querySelector<HTMLVideoElement>('.is-current')?.play().catch(() => {});
  else videos.forEach((video) => video.pause());
}

const hasIntersectionObserver = typeof (window as unknown as {IntersectionObserver?: unknown}).IntersectionObserver === 'function';

if (hasIntersectionObserver) {
  const scrollVideoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setVideoVisibility(entry.target as HTMLVideoElement, entry.isIntersecting));
  }, {threshold: 0.42});

  const sequenceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => setSequenceVisibility(entry.target as HTMLElement, entry.isIntersecting));
  }, {threshold: 0.08});

  scrollVideos.forEach((video) => scrollVideoObserver.observe(video));
  filmSequences.forEach((section) => sequenceObserver.observe(section));
} else {
  let visibilityFrame = 0;
  const refreshFallbackVisibility = () => {
    visibilityFrame = 0;
    scrollVideos.forEach((video) => {
      const rect = video.getBoundingClientRect();
      setVideoVisibility(video, rect.bottom > 0 && rect.top < window.innerHeight);
    });
    filmSequences.forEach((section) => {
      const rect = section.getBoundingClientRect();
      setSequenceVisibility(section, rect.bottom > 0 && rect.top < window.innerHeight);
    });
  };
  const queueFallbackVisibility = () => {
    if (visibilityFrame) return;
    visibilityFrame = window.requestAnimationFrame(refreshFallbackVisibility);
  };
  window.addEventListener('scroll', queueFallbackVisibility, {passive: true});
  window.addEventListener('resize', queueFallbackVisibility);
  refreshFallbackVisibility();
}

document.querySelectorAll<HTMLElement>('[data-youtube-facade]').forEach((facade) => {
  const button = facade.querySelector<HTMLButtonElement>('button');
  button?.addEventListener('click', () => {
    const videoId = facade.dataset.videoId;
    const title = facade.dataset.videoTitle || 'Kuttappan episode';
    if (!videoId) return;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    facade.replaceChildren(iframe);
    iframe.focus();
  }, {once: true});
});

document.querySelectorAll<HTMLButtonElement>('[data-share]').forEach((button) => {
  const status = button.parentElement?.querySelector<HTMLElement>('[data-share-status]');
  let statusTimer = 0;
  const announce = (message: string) => {
    if (!status) return;
    window.clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = window.setTimeout(() => { status.textContent = ''; }, 4000);
  };

  const copyUrl = async () => {
    if (!navigator.clipboard?.writeText) return false;
    await navigator.clipboard.writeText(window.location.href);
    return true;
  };

  button.addEventListener('click', async () => {
    const shareData = {title: document.title, url: window.location.href};
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        announce('Shared.');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          announce('Sharing cancelled.');
          return;
        }
        announce('Sharing is unavailable.');
      }
      return;
    }

    try {
      announce(await copyUrl() ? 'Episode link copied.' : 'Copy the address from your browser.');
    } catch {
      announce('Copy the address from your browser.');
    }
  });
});

function buildMotion() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  gsap.killTweensOf('[data-reveal], [data-hero-line]');

  if (motionPaused) {
    gsap.set('[data-reveal], [data-hero-line]', {opacity: 1, y: 0, clearProps: 'transform'});
    return;
  }

  gsap.from('[data-hero-line]', {
    opacity: 0,
    y: 30,
    duration: 1.15,
    stagger: 0.11,
    ease: 'power3.out',
    delay: 0.2,
  });

  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
    gsap.fromTo(element, {opacity: 0, y: 42}, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {trigger: element, start: 'top 96%', once: true},
    });
  });

  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
    const amount = Number(element.dataset.parallax || 0.12) * 100;
    const target = element.querySelector('img, video') || element;
    gsap.fromTo(target, {yPercent: -amount / 2}, {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: {trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8},
    });
  });

  document.querySelectorAll<HTMLElement>('[data-reel]').forEach((reel) => {
    const track = reel.querySelector<HTMLElement>('[data-reel-track]');
    if (!track || window.innerWidth < 900) return;
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 100);
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: reel,
        start: 'top top',
        end: () => `+=${distance() + window.innerHeight * 0.65}`,
        scrub: 0.7,
        pin: true,
        invalidateOnRefresh: true,
      },
    });
  });

  document.querySelectorAll<HTMLElement>('[data-scene-scale]').forEach((scene) => {
    const media = scene.querySelector('img, video');
    if (!media) return;
    gsap.fromTo(media, {scale: 1.06}, {
      scale: 1,
      ease: 'none',
      scrollTrigger: {trigger: scene, start: 'top bottom', end: 'bottom top', scrub: 0.8},
    });
  });
}

const handleMotionPreference = (event: MediaQueryListEvent | MediaQueryList) => {
  const setting = readMotionSetting();
  motionPaused = event.matches || setting === 'paused' || (dataSaver && setting !== 'playing');
  syncMotionControls();
  buildMotion();
};

const mediaQueryEvents = reduceMotion as unknown as {
  addEventListener?: (type: 'change', listener: (event: MediaQueryListEvent) => void) => void;
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

if (typeof mediaQueryEvents.addEventListener === 'function') mediaQueryEvents.addEventListener('change', handleMotionPreference);
else mediaQueryEvents.addListener?.(handleMotionPreference);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseVideos();
  else playVisibleVideos();
});

window.addEventListener('load', () => ScrollTrigger.refresh(), {once: true});

syncMotionControls();
buildMotion();
playVisibleVideos();

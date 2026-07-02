import { mountNav } from './nav.js'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* ---------------- smooth scroll ---------------- */
if (!reduced) {
  const lenis = new Lenis({ lerp: 0.11 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
}

/* ---------------- mount shared header ---------------- */
mountNav(document.body.dataset.navGroup || null)

/* ---------------- nav state ---------------- */
const nav = document.getElementById('nav')
const setNav = () => nav.classList.toggle('scrolled', window.scrollY > 24)
setNav()
window.addEventListener('scroll', setNav, { passive: true })

/* ---------------- hero title rise ---------------- */
const lines = document.querySelectorAll('.hero-title .line-in')
if (lines.length && !reduced) {
  gsap.to(lines, {
    y: 0,
    duration: 1.15,
    ease: 'power4.out',
    stagger: 0.09,
    delay: 0.15,
  })
} else {
  lines.forEach((l) => (l.style.transform = 'none'))
}

/* hero-level rises fire on load, not on scroll */
document.querySelectorAll('.hero [data-rise]').forEach((el, i) => {
  setTimeout(() => el.classList.add('in'), 450 + i * 120)
})

/* ---------------- scroll reveals ---------------- */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in')
        io.unobserve(e.target)
      }
    })
  },
  { threshold: 0.18 }
)
document
  .querySelectorAll('main [data-rise]:not(.hero [data-rise]), [data-clip]')
  .forEach((el) => io.observe(el))

/* ---------------- gentle image parallax ---------------- */
if (!reduced) {
  document.querySelectorAll('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: img.closest('figure') || img,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    )
  })
}

/* ---------------- scroll choreography ----------------
   Scrub-linked, not one-shot: the page responds continuously to the
   scroll. Restraint is the brief, settle, don't perform. */
if (!reduced) {
  /* hero exit: the video eases back into a framed block while the
     copy lifts away, the page visibly takes over from the film */
  const heroMedia = document.querySelector('.hero .hero-media')
  if (heroMedia) {
    gsap.to(heroMedia, {
      scale: 0.92, ease: 'none', transformOrigin: '50% 50%',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom 25%', scrub: true },
    })
    gsap.to('.hero-inner, .hero-hint', {
      opacity: 0, yPercent: -8, ease: 'none',
      scrollTrigger: { trigger: '.hero', start: '12% top', end: '55% top', scrub: true },
    })
  }
  /* the team photo settles out of a gentle zoom and its frame breathes open */
  const peopleFrame = document.querySelector('.people-media')
  if (peopleFrame) {
    gsap.fromTo(peopleFrame.querySelector('img'), { scale: 1.1 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: peopleFrame, start: 'top 96%', end: 'top 32%', scrub: true },
    })
    gsap.fromTo(peopleFrame, { scale: 0.95 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: peopleFrame, start: 'top 92%', end: 'top 30%', scrub: true },
    })
  }

  /* chapters rail: pin the wrap, drive Build → Connect → Transform sideways.
     Each image drifts against the rail for depth. Desktop only, the
     stacked layout stays untouched on small screens. */
  const track = document.querySelector('.chapters-track')
  if (track) {
    gsap.matchMedia().add('(min-width: 901px)', () => {
      const panels = gsap.utils.toArray('.chapters-track .chapter')
      const rail = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: '.chapters-wrap', pin: true, scrub: 1, anticipatePin: 1,
          end: () => '+=' + (track.scrollWidth - window.innerWidth),
          invalidateOnRefresh: true,
          /* refresh after the eras pin (priority 2) but before unpinned
             triggers further down the page, keeps pin starts accurate */
          refreshPriority: 1,
        },
      })
      panels.forEach((panel) => {
        const img = panel.querySelector('.chapter-media img')
        if (!img) return
        gsap.fromTo(img, { xPercent: -5 }, {
          xPercent: 5, ease: 'none',
          scrollTrigger: { trigger: panel, containerAnimation: rail, start: 'left right', end: 'right left', scrub: true },
        })
      })
    })
  }

  /* closing: the final image expands out of a centred card into full bleed */
  const closingMedia = document.querySelector('.closing-media')
  if (closingMedia) {
    gsap.fromTo(closingMedia, { scale: 0.42 }, {
      scale: 1, ease: 'none',
      scrollTrigger: { trigger: '.closing', start: 'top 85%', end: 'top 12%', scrub: true },
    })
  }

  /* subpage hero: the image settles as you arrive, the copy lifts as you leave */
  const pageHero = document.querySelector('.page-hero')
  if (pageHero) {
    const phImg = pageHero.querySelector('.page-hero-media img')
    if (phImg) {
      gsap.fromTo(phImg, { scale: 1.12 }, {
        scale: 1, ease: 'none',
        scrollTrigger: { trigger: pageHero, start: 'top top', end: 'bottom 45%', scrub: true },
      })
    }
    const phInner = pageHero.querySelector('.page-hero-inner')
    if (phInner) {
      gsap.to(phInner, {
        yPercent: -12, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: pageHero, start: '45% top', end: 'bottom top', scrub: true },
      })
    }
  }
}

/* ---------------- subpage assembly (all pages) ----------------
   Facet illustrations build polygon by polygon; card grids stagger in.
   Delays are cleared after the first reveal so hovers stay instant. */
document.querySelectorAll('.facet-art').forEach((svg) => {
  svg.querySelectorAll('polygon').forEach((p, i) => (p.style.transitionDelay = `${i * 70}ms`))
})
document.querySelectorAll('.card .card-icon').forEach((svg) => {
  svg.querySelectorAll('polygon').forEach((p, i) => (p.style.transitionDelay = `${150 + i * 80}ms`))
})
document.querySelectorAll('.cards').forEach((grid) => {
  grid.querySelectorAll('.card').forEach((c, i) => {
    c.style.transitionDelay = `${i * 90}ms`
    c.addEventListener('transitionend', () => (c.style.transitionDelay = '0ms'), { once: true })
  })
})

/* ---------------- placeholder pictures ----------------
   Each frame names the asset it wants (data-src). If that file exists
   in /assets, the photo replaces the dashed frame automatically. */
document.querySelectorAll('.ph-media[data-src]').forEach((fig) => {
  const img = new Image()
  img.onload = () => {
    img.alt = ''
    fig.classList.add('ph-loaded')
    fig.prepend(img)
  }
  img.src = fig.dataset.src
})

/* ---------------- civilization sequence (pinned) ---------------- */
const eras = document.getElementById('eras')
if (eras) {
  const items = eras.querySelectorAll('[data-era]')
  const progress = document.getElementById('eras-progress')

  if (reduced || items.length === 0) {
    eras.classList.add('static')
  } else {
    const steps = items.length
    let current = 0
    const show = (i) => {
      if (i === current) return
      items[current].classList.remove('is-on')
      items[i].classList.add('is-on')
      current = i
    }
    ScrollTrigger.create({
      trigger: eras,
      start: 'top top',
      end: `+=${steps * 90}%`,
      pin: '.eras-pin',
      scrub: true,
      refreshPriority: 2,
      onUpdate: (self) => {
        const i = Math.min(steps - 1, Math.floor(self.progress * steps))
        show(i)
        if (progress) progress.style.height = `${self.progress * 100}%`
      },
    })
  }
}

const io2 = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io2.unobserve(e.target) } }),
  { threshold: 0.3 }
)

/* ---------------- word-by-word reveal (Scale AnimatedText pattern:
   split into overflow-hidden masks, rise with cubic-bezier(.16,1,.3,1)) */
document.querySelectorAll('[data-words]').forEach((el) => {
  const walk = (node) => {
    ;[...node.childNodes].forEach((n) => {
      if (n.nodeType === 3 && n.textContent.trim()) {
        const frag = document.createDocumentFragment()
        n.textContent.split(/(\s+)/).forEach((piece) => {
          if (!piece.trim()) { frag.appendChild(document.createTextNode(piece)); return }
          const w = document.createElement('span'); w.className = 'w'
          const wi = document.createElement('span'); wi.className = 'wi'
          wi.textContent = piece
          w.appendChild(wi); frag.appendChild(w)
        })
        n.replaceWith(frag)
      } else if (n.nodeType === 1) walk(n)
    })
  }
  if (!reduced) walk(el)
  el.querySelectorAll('.wi').forEach((wi, i) => (wi.style.transitionDelay = `${Math.min(i * 28, 700)}ms`))
  io2.observe(el)
})

/* ---------------- count-up numbers (stats bands) ---------------- */
const countIO = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return
    countIO.unobserve(e.target)
    const el = e.target
    const target = parseFloat(el.dataset.count)
    const dec = parseInt(el.dataset.dec || '0', 10)
    if (reduced) { el.textContent = target.toFixed(dec); return }
    const t0 = performance.now()
    const dur = 1400
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 4)
      el.textContent = (target * eased).toFixed(dec)
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })
}, { threshold: 0.5 })
document.querySelectorAll('[data-count]').forEach((el) => countIO.observe(el))

/* Shared header, one source of truth for all pages.
   Architecture from Scale's nav (button triggers → wide panels with
   verb-phrase column headers + featured column); content model from
   musubi's layout.js (every item = title + one-line description). */

const MENU = [
  {
    label: 'What we do',
    group: 'what',
    media: { src: '/assets/picture-2.jpg', alt: '' },
    panel: {
      cols: [
        {
          head: 'Build',
          links: [
            { href: '/build.html', title: 'Overview', desc: 'The intelligence behind the intelligence' },
            { href: '/build.html#annotation', title: 'Annotation', desc: 'Labelled at production accuracy' },
            { href: '/build.html#evaluation', title: 'Evaluation', desc: 'Expert judgment on model output' },
            { href: '/build.html#feedback', title: 'Human feedback', desc: 'Preference data and red-teaming' },
            { href: '/build.html#monitoring', title: 'Monitoring', desc: 'Oversight of autonomous systems' },
          ],
        },
        {
          head: 'Connect',
          links: [
            { href: '/connect.html', title: 'Overview', desc: 'Every conversation, elevated' },
            { href: '/connect.html#layers', title: 'The three layers', desc: 'Instant · intelligent · expert' },
            { href: '/inside.html', title: 'Inside KONT', desc: 'The controller behind the loop' },
          ],
        },
        {
          head: 'Transform',
          links: [
            { href: '/transform.html', title: 'Overview', desc: 'The back office that runs itself' },
            { href: '/transform.html#pricing', title: 'How we price', desc: 'Pay for completed work only' },
          ],
        },
      ],
    },
  },
  {
    label: 'Work',
    group: 'work',
    media: { src: '/assets/picture-3.jpg', alt: '' },
    panel: {
      cols: [
        {
          head: 'Stories',
          links: [
            { href: '/work.html', title: 'All the work', desc: 'Six stories from the frontier' },
            { href: '/work.html', title: 'Wearables', desc: 'The eyes of smart glasses' },
            { href: '/work.html', title: 'Autonomy', desc: 'Teaching cars to read the road' },
            { href: '/work.html', title: 'AI labs', desc: 'Raising the frontier-model bar' },
          ],
        },
      ],
      feature: {
        kicker: 'Featured',
        line: 'Watching over a robotic warehouse, around the clock.',
        tag: 'Robotics · Monitoring',
        href: '/work.html',
      },
    },
  },
  {
    label: 'Company',
    group: 'company',
    media: { src: '/assets/picture-5.png', alt: '' },
    panel: {
      cols: [
        {
          head: 'Hugo',
          links: [
            { href: '/about.html', title: 'About', desc: 'A different kind of partner' },
            { href: '/careers.html', title: 'Careers', desc: 'Work on the impossible' },
            { href: '/inside.html', title: 'Inside', desc: 'How the loop works' },
            { href: 'mailto:hello@hugo.inc', title: 'Contact', desc: 'Start a conversation' },
          ],
        },
      ],
    },
  },
]

export function mountNav(pageGroup) {
  const items = MENU.map((m) => {
    const cols = m.panel.cols
      .map(
        (c) => `
        <div class="panel-col">
          <p class="pc-head">${c.head}</p>
          ${c.links
            .map((l) => `<a class="menu-link" href="${l.href}"><span class="ml-title">${l.title}</span></a>`)
            .join('')}
        </div>`
      )
      .join('')

    const media = m.media
      ? `<figure class="panel-media"><img src="${m.media.src}" alt="${m.media.alt}" loading="lazy" /></figure>`
      : ''

    return `
      <div class="menu" data-group="${m.group}">
        <button class="menu-trigger" type="button" aria-expanded="false" aria-haspopup="true">${m.label}</button>
        <div class="menu-panel" role="menu">
          <div class="menu-panel-inner">
            <div class="panel-cols">${cols}</div>
            ${media}
          </div>
        </div>
      </div>`
  }).join('')

  /* mobile: one group per panel column, headed by the column's verb */
  const mobile = MENU.flatMap((m) =>
    m.panel.cols.map(
      (c) => `
    <div class="nm-group">
      <p class="nm-head">${m.label === c.head ? c.head : m.panel.cols.length > 1 ? c.head : m.label}</p>
      ${c.links.map((l) => `<a href="${l.href}">${l.title}</a>`).join('')}
    </div>`
    )
  ).join('')

  const header = document.createElement('header')
  header.className = 'nav'
  header.id = 'nav'
  header.innerHTML = `
    <a class="wordmark" href="/"><img class="wordmark-logo" src="/assets/logo.png" alt="" />HUGO</a>
    <nav class="nav-links" aria-label="Primary">
      ${items}
      <a class="nav-cta" href="mailto:hello@hugo.inc">Start a conversation</a>
    </nav>
    <button class="nav-burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span></button>
    <div class="nav-mobile" id="navMobile">${mobile}
      <a class="btn btn-solid" href="mailto:hello@hugo.inc">Start a conversation</a>
    </div>`
  document.body.prepend(header)

  if (pageGroup) header.querySelector(`[data-group="${pageGroup}"] .menu-trigger`)?.classList.add('active')

  /* --- open/close behavior: hover with grace on desktop, click on touch --- */
  const menus = [...header.querySelectorAll('.menu')]
  let closeTimer = null
  const closeAll = () => {
    header.classList.remove('panel-open')
    menus.forEach((m) => {
      m.classList.remove('open')
      m.querySelector('.menu-trigger').setAttribute('aria-expanded', 'false')
    })
  }
  const open = (m) => {
    closeAll()
    m.classList.add('open')
    header.classList.add('panel-open')
    m.querySelector('.menu-trigger').setAttribute('aria-expanded', 'true')
  }
  menus.forEach((m) => {
    m.addEventListener('mouseenter', () => { clearTimeout(closeTimer); open(m) })
    m.addEventListener('mouseleave', () => { closeTimer = setTimeout(closeAll, 180) })
    m.querySelector('.menu-trigger').addEventListener('click', () => {
      m.classList.contains('open') ? closeAll() : open(m)
    })
  })
  document.addEventListener('click', (e) => { if (!header.contains(e.target)) closeAll() })
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll() })

  /* --- mobile burger --- */
  const burger = header.querySelector('#burger')
  const mobilePanel = header.querySelector('#navMobile')
  burger.addEventListener('click', () => {
    const on = mobilePanel.classList.toggle('open')
    burger.setAttribute('aria-expanded', String(on))
    burger.classList.toggle('open', on)
    document.documentElement.classList.toggle('locked', on)
  })
}

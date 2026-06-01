
const { useState, useEffect, useRef } = React;

/* ━━━━━━━━━━━━━━━━━━━━━━━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PORT = {
  name: 'Ezequiel Burdios',
  email: 'red.ezequiel@gmail.com',
  github: 'https://github.com/Shiroyasha21',
  notion: 'https://ezequielbportfolio.notion.site',
  location: 'General Santos City, Philippines',
  tagline: 'I turn messy, repetitive workflows into clean, reliable systems.',
};

const PROJECTS = [
  { id:'dtx',     featured:true,  accent:'#4d9de0', cat:'Web App',
    title:'DTX Dispatch',              sub:'Field Operations Tool',
    desc:'Map-based dispatch tool for a handyman service across the Dallas–Fort Worth metroplex. Manages technician schedules, job routing, zip code lookups, and service area coverage — all in the browser, zero backend.',
    tags:['Next.js 14','Leaflet.js','Tailwind CSS','OpenStreetMap'],
    github:'https://github.com/Shiroyasha21/dtx-dispatch', live:null },
  { id:'gmail',   featured:true,  accent:'#c9896c', cat:'Automation',
    title:'Gmail Inbox Automation',    sub:'Smart Email Manager',
    desc:'Automated Gmail system that surfaces brand emails, handles initial replies with cooldown + anti-loop detection, and keeps the inbox organized without manual intervention. Deployed in a live freelance engagement.',
    tags:['Apps Script','Gmail API','Google People API','Triggers'],
    github:null, live:null },
  { id:'jobs',    featured:true,  accent:'#5a9e7a', cat:'Automation',
    title:'Job Market Research Tool',  sub:'Crawler + Alert System',
    desc:'Automated crawler that collects remote job data into a searchable Google Sheet — deduplication, archiving, salary normalization, and real-time email alerts that fire within 15–20 minutes of a new post.',
    tags:['Node.js','Google Sheets API','Apps Script','Gmail'],
    github:null, live:null },
  { id:'bot',     featured:false, accent:'#7c6fb0', cat:'Automation',
    title:'DailyLog Bot',              sub:'Telegram → Sheets',
    desc:'Telegram bot that accepts structured daily reports from remote workers and logs them to Google Sheets. Validates fields, timestamps entries, surfaces per-worker stats via bot commands.',
    tags:['Apps Script','Telegram API','Google Sheets','Webhooks'],
    github:null, live:null },
  { id:'lesson',  featured:false, accent:'#4d9de0', cat:'Productivity',
    title:'Lesson Plan Builder',       sub:'Sheets → Docs',
    desc:'Google Sheets tool that generates a formatted lesson plan document in one click using Apps Script. No new tools, no learning curve — just fields and a button.',
    tags:['Apps Script','Google Sheets','Google Docs'],
    github:null, live:'https://docs.google.com/spreadsheets/d/1KJIkrE4u-xSnAzkZ4j9__bpPbCUif4WbZCYQN1tXPwE/' },
  { id:'scraper', featured:false, accent:'#c9896c', cat:'Automation',
    title:'Article Scraper',           sub:'Puppeteer Tool',
    desc:'Config-driven scraper that discovers game articles by keyword and exports to Google Sheets. Adding new sites requires zero code changes.',
    tags:['Node.js','Puppeteer','Google Sheets API'],
    github:'https://github.com/Shiroyasha21/scraper-article', live:null },
  { id:'vlog',    featured:false, accent:'#d4694a', cat:'Creative',
    title:'Vlog Editing',              sub:'Travel Series',
    desc:'Edited travel footage into polished vlogs using Final Cut Pro — including Dahilayan Adventure Park and an Intramuros walking video shot on DJI Osmo Pocket 3.',
    tags:['Final Cut Pro','DJI Osmo Pocket 3','Video Editing'],
    github:null, live:'https://www.youtube.com/watch?v=zlfLqllHMjM' },
  { id:'blender', featured:false, accent:'#5a8aae', cat:'Creative',
    title:'Blender: Snowman',          sub:'3D Modelling',
    desc:'First Blender project — mesh editing, materials, modifiers, lighting, and compositing. Groundwork for an eventual dive into 3D printing.',
    tags:['Blender','3D Modelling','Rendering'],
    img:'assets/snowman.jpg', github:null, live:null },
];

const EXPERIENCE = [
  { role:'Virtual Assistant / Operations Coordinator',
    company:'Freelance', sub:'Telus International · Clickworker', period:'2023 — Present',
    bullets:[
      'Remote ops support: content moderation, data annotation, and workflow coordination for international clients.',
      'Used Claude, ChatGPT, and Geelark to automate and scale social media management across multi-account setups.',
      'Built custom automation tools with Apps Script and Node.js to eliminate manual steps in client workflows.',
    ]},
  { role:'Online Non-Voice Tutor', company:'Course Hero', period:null,
    bullets:[
      'Wrote study guides and detailed explanations for students seeking academic support.',
      'Focused on English language, writing technique, and research methodology.',
    ]},
  { role:'Office Clerk', company:'Dr. Jorge P. Royeca Hospital', period:null,
    bullets:[
      'Managed and submitted health insurance documents to support timely hospital claims.',
      'Maintained organized records and coordinated administrative paperwork.',
    ]},
];

const SKILLS = {
  'Operations & Workflow':['Google Sheets','Apps Script','Google Workspace','Microsoft Office','Geelark'],
  'AI & Automation':      ['Claude','ChatGPT','OpenAI API','Telegram Bot API','Prompt Engineering'],
  'Development':          ['JavaScript','Node.js','Ruby','Next.js','React','Tailwind CSS','Puppeteer'],
  'Content & Creative':   ['WordPress','Canva','Adobe Creative Suite','Final Cut Pro','Blender'],
};

const JOURNEY = [
  { year:'Pre-2023', note:'Learning web dev independently — HTML, CSS, JS, backend basics. No AI tools, just docs.' },
  { year:'2023',     note:'Started freelancing: data entry, research, documentation, WordPress sites.' },
  { year:'2024',     note:'AI prompts, Sheets automation, Telegram bot, Lesson Plan Builder.' },
  { year:'2025',     note:'Geelark multi-account management. Gmail automation, job crawler, DailyLog bot.' },
  { year:'2026',     note:'Exploring Blender for 3D modelling — 3D printing on the horizon.' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HELPERS ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function navTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.05, rootMargin: '0px 0px -24px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ICONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function IcoGithub() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12"/>
    </svg>
  );
}
function IcoMail() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  );
}
function IcoExt() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/>
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SIDEBAR ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Sidebar({ active }) {
  const nav = [
    { id:'about', label:'About' },
    { id:'experience', label:'Experience' },
    { id:'projects', label:'Projects' },
    { id:'skills', label:'Skills' },
    { id:'contact', label:'Contact' },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-top">
        <div className="sb-avatar">EZ</div>
        <div className="sb-name">Ezequiel<br />Burdios</div>
        <div className="sb-role">VA · Automation Builder</div>
        <div className="sb-avail"><span className="avail-dot"></span>Available for work</div>
      </div>

      <nav className="sb-nav">
        {nav.map(({ id, label }) => (
          <button
            key={id}
            className={`sb-btn${active === id ? ' active' : ''}`}
            onClick={() => navTo(id)}
          >
            <span className="sb-pip"></span>
            {label}
          </button>
        ))}
      </nav>

      <div className="sb-foot">
        <a href={PORT.github} target="_blank" rel="noopener" className="sb-link">
          <IcoGithub /> <span>GitHub</span>
        </a>
        <a href={`mailto:${PORT.email}`} className="sb-link">
          <IcoMail /> <span>Email</span>
        </a>
        <a href="uploads/Resume - Ezequiel Burdios.pdf" download className="sb-dl">
          Resume ↓
        </a>
      </div>
    </aside>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-dots"></div>
      <div className="hero-inner">
        <div className="hero-loc">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          {PORT.location}
        </div>
        <h1 className="hero-name">{PORT.name}</h1>
        <p className="hero-tagline">{PORT.tagline}</p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => navTo('projects')}>View Projects</button>
          <a href="uploads/Resume - Ezequiel Burdios.pdf" download className="btn-ghost">Download Resume</a>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ABOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AboutSection() {
  return (
    <section id="about" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">01</span>
          <h2 className="sec-title">About</h2>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div className="about-grid">
          <div className="about-bio">
            <p>I'm a Virtual Assistant with 3 years of remote experience in operations, social media systems, and workflow automation.</p>
            <p>I started with the usual VA work — research, data entry, documentation. Over time I found myself drawn to the part most people skip: building the systems behind the work. I've managed complex multi-account environments, built tracking tools from scratch in Google Sheets, and integrated AI to cut repetitive tasks.</p>
            <p>Outside of client work, I build automations using Apps Script, OpenAI, and Telegram bots — not because I have to, but because I genuinely enjoy figuring out how things can run better.</p>
            <div className="about-creds">
              <div className="cred"><span className="cred-k">Education</span><span className="cred-v">BA English · Mindanao State University · 2019</span></div>
              <div className="cred"><span className="cred-k">License</span><span className="cred-v">Professional Teaching License · 88.20</span></div>
              <div className="cred"><span className="cred-k">Eligibility</span><span className="cred-v">Career Service Professional · 81.1</span></div>
            </div>
          </div>
          <div className="about-photo">
            <div className="photo-ph">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{opacity:0.25}}>
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              <span>Photo</span>
              <span className="photo-hint">Upload yours</span>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="journey">
          <div className="journey-lbl">My Journey</div>
          <div className="journey-row">
            {JOURNEY.map((j, i) => (
              <div key={i} className="jstep">
                <div className="jstep-yr">{j.year}</div>
                <div className="jstep-dot"></div>
                <p className="jstep-note">{j.note}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━ */
function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">02</span>
          <h2 className="sec-title">Experience</h2>
        </div>
      </FadeIn>
      <div className="tl">
        {EXPERIENCE.map((e, i) => (
          <FadeIn key={i} delay={i * 70}>
            <div className="tl-item">
              <div className="tl-dot"></div>
              <div className="tl-body">
                <div className="tl-top">
                  <div>
                    <div className="tl-role">{e.role}</div>
                    <div className="tl-co">{e.company}{e.sub ? ' · ' + e.sub : ''}</div>
                  </div>
                  {e.period && <div className="tl-period">{e.period}</div>}
                </div>
                <ul className="tl-list">
                  {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ PROJECTS ━━━━━━━━━━━━━━━━━━━━━━━━ */
function PCard({ p, variant }) {
  return (
    <div className={`pcard pcard-${variant || 'sm'}`} style={{'--acc': p.accent}}>
      <div className="pcard-top">
        <div className="pcard-icon" style={{background: p.accent + '22'}}>
          <div style={{width:18,height:18,borderRadius:4,background:p.accent,opacity:.75}}></div>
        </div>
        <div className="pcard-info">
          <div className="pcard-title">{p.title}</div>
          <div className="pcard-sub">{p.sub}</div>
        </div>
        <div className="pcard-actions">
          {p.github && <a href={p.github} target="_blank" rel="noopener" className="pcard-action" title="GitHub"><IcoGithub /></a>}
          {p.live && <a href={p.live} target="_blank" rel="noopener" className="pcard-action" title="View"><IcoExt /></a>}
        </div>
      </div>
      {p.img && (
        <div className="pcard-img-wrap">
          <img src={p.img} alt={p.title} className="pcard-img" />
        </div>
      )}
      <p className="pcard-desc">{p.desc}</p>
      <div className="pcard-foot">
        <div className="pcard-tags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
        <span className="pcard-cat">{p.cat}</span>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const featured = PROJECTS.filter(p => p.featured);
  const others   = PROJECTS.filter(p => !p.featured);
  return (
    <section id="projects" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">03</span>
          <h2 className="sec-title">Projects</h2>
        </div>
      </FadeIn>
      <FadeIn delay={60}>
        <div className="proj-featured">
          <PCard p={featured[0]} variant="lg" />
          <div className="proj-col">
            <PCard p={featured[1]} variant="md" />
            <PCard p={featured[2]} variant="md" />
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={120}>
        <p className="proj-more-lbl">More projects</p>
        <div className="proj-grid">
          {others.map(p => <PCard key={p.id} p={p} variant="sm" />)}
        </div>
      </FadeIn>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SKILLS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SkillsSection() {
  return (
    <section id="skills" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">04</span>
          <h2 className="sec-title">Skills</h2>
        </div>
      </FadeIn>
      <div className="skills-grid">
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 55}>
            <div className="skill-grp">
              <div className="skill-cat">{cat}</div>
              <div className="skill-pills">
                {items.map(s => <span key={s} className="spill">{s}</span>)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ LAB ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LabSection() {
  return (
    <section id="lab" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">05</span>
          <h2 className="sec-title">Learning Lab</h2>
        </div>
        <div className="lab-card">
          <div className="lab-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
          </div>
          <div className="lab-text">
            <strong>Experiments, scripts, and half-baked ideas.</strong>
            <span>AI tools, Sheets scripts, APIs I'm testing, and workflow insights — documented as they happen. Messy on purpose.</span>
          </div>
          <a href={PORT.notion} target="_blank" rel="noopener" className="lab-link">
            Open Lab <IcoExt />
          </a>
        </div>
      </FadeIn>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ContactSection() {
  const [f, setF] = useState({ name:'', email:'', message:'' });
  const [sent, setSent] = useState(false);
  const upd = (k, v) => setF(p => ({ ...p, [k]: v }));

  const submit = e => {
    e.preventDefault();
    window.location.href = `mailto:${PORT.email}?subject=Hello from ${encodeURIComponent(f.name)}&body=${encodeURIComponent(f.message)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">06</span>
          <h2 className="sec-title">Get In Touch</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-lede">Open to remote opportunities, freelance projects, and interesting collaborations.</p>
            <div className="cd"><span className="cd-k">Email</span><a href={`mailto:${PORT.email}`}>{PORT.email}</a></div>
            <div className="cd"><span className="cd-k">GitHub</span><a href={PORT.github} target="_blank" rel="noopener">Shiroyasha21</a></div>
            <div className="cd"><span className="cd-k">Location</span><span>{PORT.location}</span></div>
            <div className="cd"><span className="cd-k">Notion</span><a href={PORT.notion} target="_blank" rel="noopener">ezequielbportfolio.notion.site</a></div>
          </div>
          <div className="contact-form-side">
            {sent ? (
              <div className="form-sent">Your email client should open — talk soon!</div>
            ) : (
              <form className="cform" onSubmit={submit}>
                <div className="cf-row"><label>Name</label><input type="text" value={f.name} onChange={e => upd('name', e.target.value)} required placeholder="Your name" /></div>
                <div className="cf-row"><label>Email</label><input type="email" value={f.email} onChange={e => upd('email', e.target.value)} required placeholder="your@email.com" /></div>
                <div className="cf-row"><label>Message</label><textarea value={f.message} onChange={e => upd('message', e.target.value)} required rows={4} placeholder="What's on your mind?" /></div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ TWEAKS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#4d9de0",
  "warm":   "#c9896c",
  "font":   "Space Grotesk"
}/*EDITMODE-END*/;

function PortfolioTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEffect(() => {
    const r = document.documentElement.style;
    r.setProperty('--blue', t.accent);
    r.setProperty('--blue-glow', t.accent + '22');
    r.setProperty('--warm', t.warm);
    r.setProperty('--font-head', `'${t.font}', sans-serif`);
  }, [t]);
  return (
    <TweaksPanel>
      <TweakSection label="Colors" />
      <TweakColor label="Accent" value={t.accent}
        options={['#4d9de0','#5a9e7a','#7c6fb0','#c9896c']}
        onChange={v => setTweak('accent', v)} />
      <TweakColor label="Warm" value={t.warm}
        options={['#c9896c','#e07a4d','#c8a060','#b08060']}
        onChange={v => setTweak('warm', v)} />
      <TweakSection label="Typography" />
      <TweakSelect label="Heading font" value={t.font}
        options={['Space Grotesk','DM Serif Display','Syne','Outfit']}
        onChange={v => setTweak('font', v)} />
    </TweaksPanel>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function App() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const ids = ['about','experience','projects','skills','contact'];
    const onScroll = () => {
      let cur = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) cur = id;
      }
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="layout">
      <Sidebar active={active} />
      <main className="main">
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <LabSection />
        <ContactSection />
        <footer className="footer">
          <span>© 2026 Ezequiel Burdios</span>
          <span>{PORT.location}</span>
        </footer>
      </main>
      <PortfolioTweaks />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

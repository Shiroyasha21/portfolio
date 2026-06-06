
const { useState, useEffect, useRef } = React;

/* ━━━━━━━━━━━━━━━━━━━━━━━━ DATA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const PORT = {
  name:      'Ezequiel Burdios',
  email:     'red.ezequiel@gmail.com',
  github:    'https://github.com/Shiroyasha21',
  notion:    'https://ezequielbportfolio.notion.site/Ezequiel-Burdios-Work-Projects-223d9c77fe7e80339fadce215b319255',
  resumeUrl: 'https://drive.google.com/file/d/1YAbkiXKtp0qMJXWtaNNpObiXWq6O_6L_/view?usp=drive_link',
  location:  'General Santos City, Philippines',
};

const WEB3FORMS_KEY = 'YOUR_ACCESS_KEY'; // Get free key at web3forms.com — enter your email, copy the key

const PROJECTS = [
  {
    id: 'dtx', featured: true, accent: '#4d9de0', cat: 'Web App',
    title: 'Handyman Dispatch', sub: 'Field Operations Tool',
    desc: 'Map-based dispatch tool for a handyman service across the Dallas-Fort Worth metroplex. Manages technician schedules, job routing, and service area coverage. Runs entirely in the browser with zero backend.',
    details: 'Handyman Dispatch was built to solve a real coordination problem. A handyman business operating across the Dallas-Fort Worth metroplex was managing technician schedules, zip code coverage, and daily job routing manually, across text messages, a whiteboard, and memory. Enterprise dispatch software was either overkill or too expensive. The goal was a tool purpose-built for this operation, with zero hosting costs and no backend to maintain.\n\nEverything runs in the browser. All data lives in localStorage: technician profiles, zone assignments, and the full job schedule. Dispatchers get an interactive map with color-coded service zones, a lookup that instantly identifies who covers a given area, and a daily schedule builder that generates shareable Google Maps route links for each technician\'s job sequence.',
    highlights: [
      'Interactive DFW map with color-coded zones: see at a glance which technician covers each zip code',
      'Instant zip code lookup: paste any zip, get the assigned technician and an estimated drive distance',
      'Daily schedule builder: add, edit, and delete jobs per technician with auto-generated Google Maps route links',
      'Zero backend: all data in localStorage means zero cloud costs and full data ownership',
      'PIN-protected settings to prevent accidental changes to technician or zone configuration',
      'JSON export and import for backup, handoff, or moving data between machines',
    ],
    img: 'assets/dtx-screenshot.png',
    tags: ['Next.js 14', 'Leaflet.js', 'Tailwind CSS', 'OpenStreetMap'],
    githubReq: true, github: null, live: 'https://dtx-dispatch.vercel.app/',
  },
  {
    id: 'whatsapp', featured: true, accent: '#25d366', cat: 'Automation',
    title: 'WhatsApp Support Bot', sub: 'Customer Support Demo',
    desc: 'Chatbot that simulates an enterprise customer support flow through WhatsApp. Handles warranty checks and service ticket submission via natural conversation, with automated email confirmations. Built entirely with free tools.',
    details: 'A portfolio demonstration of what a real customer support pipeline looks like using entirely free tools. Complete flow from intake to email confirmation. No official API, no backend costs.',
    sections: [
      {
        heading: 'Conversation Flow',
        body: 'The bot opens with a greeting and walks the user through support intake one step at a time, collecting name, email address, contact number, and product serial number through natural back-and-forth. Once it has the serial, it queries the Google Sheets product database and returns the warranty status immediately: active coverage, expired, or unrecognized. The user then selects a ticket type (RMA for returns and replacements, or Tech Service for on-site support) and the bot confirms the submission.',
        gif: { src: 'assets/WhatsApp focus - GIF.gif', label: 'WhatsApp conversation' },
        gifAbove: false,
      },
      {
        heading: 'Under the Hood',
        gif: { src: 'assets/CMD  focus - GIF.gif', label: 'Terminal output' },
        gifAbove: true,
        body: 'Every message is logged to the terminal in real time. The bot receives input, determines conversation state, queries the Sheets API for warranty data, routes to the correct ticket path, writes the ticket row directly to Google Sheets, and calls the Apps Script endpoint, which sends an automated email confirmation via MailApp. No paid backend, no OAuth complexity: a Node.js process, a Google Sheet, and an Apps Script web app URL.',
      },
    ],
    img: 'assets/WhatsApp focus - GIF.gif',
    youtube: 'qZN-ZeTcFd8',
    tags: ['Node.js', 'whatsapp-web.js', 'Google Sheets API', 'Apps Script', 'Gmail'],
    github: 'https://github.com/Shiroyasha21/whatsapp-support-bot',
    live: 'https://youtu.be/qZN-ZeTcFd8',
    liveLinks: [
      { label: 'Watch Full Demo', url: 'https://youtu.be/qZN-ZeTcFd8' },
    ],
  },
  {
    id: 'gmail', featured: true, accent: '#c9896c', cat: 'Automation',
    title: 'Gmail Inbox Automation', sub: 'Smart Email Manager',
    desc: 'Automated Gmail system that surfaces brand emails, handles initial replies with cooldown and anti-loop detection, and keeps the inbox organized without manual intervention. Deployed in a live freelance engagement.',
    details: 'Built and deployed as part of a live freelance VA engagement. The system runs on a 6-hour trigger, processes unread emails from a configurable brand list, moves them to Primary inbox, adds senders to Google Contacts, and sends replies from a randomized pool. A cooldown layer and auto-reply detection prevent reply loops.',
    highlights: [
      'Runs every 6 hours via time-based trigger with no manual intervention',
      'Rules and reply templates live in a Google Sheet, editable without touching code',
      'Detects auto-replies and bounces before attempting any response',
      '12-hour per-domain cooldown prevents reply loops as a hard backstop',
      'Collaboration keyword detection triggers a formal reply instead of a random one',
    ],
    snippet: `// Detect auto-replies before responding
const isAutoReply = /auto.?reply|out of office|no.?reply/i
  .test(subject);

// 12-hour cooldown per domain
function hasRepliedRecently(domain) {
  const key = "replied_" + domain.replace("@", "");
  const last = PROPS.getProperty(key);
  if (!last) return false;
  return Date.now() - parseInt(last) < 43200000;
}`,
    tags: ['Apps Script', 'Gmail API', 'Google People API', 'Triggers'],
    githubReq: true, github: null, live: null,
    stats: [
      { val: '500+', label: 'accounts monitored' },
      { val: '4',    label: 'brands tracked' },
      { val: '4×',   label: 'daily runs' },
      { val: '0',    label: 'manual sorts needed' },
    ],
  },
  {
    id: 'jobs', featured: true, accent: '#5a9e7a', cat: 'Automation',
    title: 'Job Market Research Tool', sub: 'Crawler + Alert System',
    desc: 'Automated crawler collecting remote job listing data into a searchable Google Sheet, with deduplication, archiving, salary normalization, and real-time email alerts firing within 15-20 minutes of a new post.',
    details: 'This project started as a research problem: understanding the remote job market takes time. Browsing listings one by one gives a rough feel but not real data. The crawler solves that: it pulls structured listing data into Google Sheets with salary normalization, deduplication, and archiving so the sheet always reflects current data and grows over time.\n\nThe alert system came after. In remote job hunting, timing matters. A posting a few hours old already has a pile of applicants. Instead of checking the sheet manually, the alert system runs every 15–20 minutes and watches the timestamps of the top three listings. If something new appears, an email fires immediately. No scanning every ID on every run, just detecting a shift in the top three, which is a reliable signal that a fresh post landed.',
    highlights: [
      'Captures title, salary (raw and normalized), skills, work type, hours, and apply link per listing',
      'Deduplication by job ID: new rows bolded, updated listings archive the old row before replacing it',
      'Alert system watches top 3 post timestamps; fires an email within 15–20 min of a new listing',
      'Double-click .bat launcher runs everything from Windows with no terminal knowledge needed',
      'Full version control with Git throughout; rolled back freely as the deduplication logic grew',
    ],
    snippet: `for (const j of jobs) {
  const existing = idMap.get(j.jobId);
  if (existing) {
    const newer = new Date(j.dateUpdated)
                > new Date(existing.dateUpdated);
    if (newer) {
      archives.push([...existing.rowData]);
      updates.push({ rowNum: existing.rowNum,
                     values: buildRow(j) });
    }
  } else {
    appends.push(buildRow(j));
  }
}`,
    tags: ['Node.js', 'Google Sheets API', 'Apps Script', 'Gmail'],
    githubReq: true, github: null, live: null,
  },
  {
    id: 'bot', featured: false, accent: '#7c6fb0', cat: 'Automation',
    title: 'DailyLog Bot', sub: 'Telegram to Sheets',
    desc: 'Telegram bot that accepts structured daily reports from remote workers and logs them to Google Sheets. Validates fields, timestamps entries, and surfaces per-worker stats via bot commands.',
    details: 'End-of-day reporting in remote setups is usually a mess. A VA or remote worker sends a message, it gets buried in a chat thread, and the client either misses it or copies it manually into a spreadsheet. This bot fixes that pipeline.\n\nWorkers submit a structured daily report via Telegram. No spreadsheet access required on their end. The bot validates every field, catches missing or invalid entries with a clear error message before logging, and writes everything with a timestamp to a Google Sheet the client can check anytime. Workers can also pull their own stats on demand: total entries, total minutes logged, and average pace per row.\n\nBuilt on Google Apps Script deployed as a Web App and connected to Telegram via webhook. The first project that pushed me into real API work outside of Sheets automation.',
    highlights: [
      'Workers send a filled template via Telegram, bot validates all fields',
      'Catches missing or invalid entries with clear error messages before logging',
      'Calculates and logs average minutes per row automatically',
      'Workers can pull their own stats via bot command: total entries, total minutes, average pace',
    ],
    tags: ['Apps Script', 'Telegram API', 'Google Sheets', 'Webhooks'],
    githubReq: true, github: null, live: null,
  },
  {
    id: 'lesson', featured: false, accent: '#4d9de0', cat: 'Productivity',
    title: 'Lesson Plan Builder', sub: 'Sheets to Docs',
    desc: 'Google Sheets tool that generates a formatted lesson plan document in one click using Apps Script. No new tools, no learning curve. Just fields and a button.',
    details: 'Teachers already know Google Sheets. That was the whole starting point.\n\nThe problem is simple: lesson plans are repetitive. The structure is almost always the same, the sections are the same, yet teachers still retype everything from scratch each time. Instead of asking them to learn a new tool, this was built around what they already use.\n\nThe Sheet acts as the full database. Every part of a lesson plan has its own column: objectives, activities, materials, assessment. Teachers fill in the relevant fields, hit a menu button, and Apps Script reads the data row by row and merges it into a properly formatted Google Doc. One click, one complete document. An older project, but it represents something I still think about: automation doesn\'t have to be complex to be useful.',
    highlights: [
      'Entirely within Google Workspace: no new tools, no installation, no learning curve for teachers',
      'Menu button inside the sheet triggers generation: one click produces a fully formatted Google Doc',
      'Stores past lesson materials in the sheet for easy reference and reuse across lessons',
      'Sample output available: an actual generated document showing exactly what the tool produces',
    ],
    tags: ['Apps Script', 'Google Sheets', 'Google Docs'],
    github: null, live: 'https://docs.google.com/spreadsheets/d/1KJIkrE4u-xSnAzkZ4j9__bpPbCUif4WbZCYQN1tXPwE/',
  },
  {
    id: 'vlog', featured: false, accent: '#d4694a', cat: 'Creative',
    title: 'Vlog Editing', sub: 'Travel Series',
    desc: 'Edited travel footage into polished vlogs using Final Cut Pro, including a trip to Dahilayan Adventure Park and an Intramuros walking video shot on DJI Osmo Pocket 3.',
    details: 'Most of my editing before this was in Adobe Premiere. The travel series was a chance to properly explore Final Cut Pro using footage that actually mattered: our own trips.\n\nThe edit process follows two passes. The first is a rough cut: pull all clips in, remove the obvious dead weight, establish the sequence. The second is where the real editing happens: tightening transitions, fixing pacing, layering in music and ambient sound, making sure nothing overstays its welcome. The goal is always the same: make it enjoyable for someone who wasn\'t there.\n\nTwo videos in this series: a trip to Dahilayan Adventure Park in Bukidnon, and a walking vlog through Intramuros shot on a DJI Osmo Pocket 3. The Intramuros one was shot solo; the idea was to let the place carry it, minimal narration, just the footage.',
    tags: ['Final Cut Pro', 'DJI Osmo Pocket 3', 'Video Editing'],
    github: null, live: 'https://www.youtube.com/watch?v=zlfLqllHMjM',
    liveLinks: [
      { label: 'Dahilayan Adventure Park', url: 'https://www.youtube.com/watch?v=zlfLqllHMjM' },
      { label: 'Intramuros Walking Vlog',  url: 'https://drive.google.com/file/d/1AXWyTFf6cYKM_d12qM1chlg6J3d4EcLX/view?usp=sharing' },
    ],
  },
  {
    id: 'blender', featured: false, accent: '#5a8aae', cat: 'Creative',
    title: 'Blender: Snowman', sub: '3D Modelling',
    desc: 'First Blender project: mesh editing, materials, modifiers, lighting, and compositing. Groundwork for an eventual dive into 3D printing.',
    details: 'Started with Blender because of where I want to take it eventually: 3D printing. Before investing in hardware, learning the software first was the smarter move.\n\nThis snowman was my first real project, following a 14-part tutorial by Ryan King Art. The focus wasn\'t just button familiarity. It was understanding the thinking behind how 3D work is structured: how you build a scene, how materials layer, how lighting changes everything. By the end I had hands-on experience with the full workflow from mesh editing through to compositing a final render.\n\nStill in the foundation-building phase, working toward designing original models for 3D printing.',
    highlights: [
      'Mesh modeling from scratch: shaping geometry by editing vertices, edges, and faces',
      'Materials and nodes: adding surface detail, color, and visual complexity through the node editor',
      'Modifiers: non-destructive tools for adding geometry and detail without altering base mesh',
      'Camera and lighting setup for a clean, intentional composition',
      'Compositing the final render inside Blender\'s compositor',
    ],
    tags: ['Blender', '3D Modelling', 'Rendering'],
    img: 'assets/snowman.jpg', github: null, live: null,
  },
];

const EXPERIENCE = [
  {
    role: 'Virtual Assistant — Operations Coordinator',
    company: 'Freelance', period: '2023 – Present',
    bullets: [
      'Coordinate technician scheduling and dispatching; provide real-time assistance to field techs to ensure every job is completed.',
      'Receive inbound calls, book customers, and maintain warm, professional communication throughout the service lifecycle.',
      'Maintain accurate and up-to-date job pages in HouseCall Pro.',
      'Managed 9 Geelark virtual profiles across TikTok, Instagram, YouTube, X, and Reddit, keeping posting schedules and account health consistent.',
      'Built a Google Sheets influencer outreach tracker for a TikTok Shop campaign, covering reply categorization, creator grading, and the full sample dispatch lifecycle.',
    ],
  },
  {
    role: 'Contract & Quality Work',
    company: 'Telus International · Clickworker', period: '2022 – 2023',
    bullets: [
      'Performed quality assessments on online advertisements at Telus International, evaluating accuracy, relevance, and compliance against established quality thresholds.',
      'Completed structured online tasks at Clickworker including data verification, content tagging, and information research, maintaining consistency and accuracy across all assignments.',
    ],
  },
  {
    role: 'Online Non-Voice Tutor', company: 'Course Hero', period: '2021 – 2023',
    bullets: [
      'Answered academic questions with clear, well-researched responses in English across a broad range of subject areas.',
    ],
  },
  {
    role: 'Office Clerk', company: 'Dr. Jorge P. Royeca Hospital', period: '2019 – 2021',
    bullets: [
      'Managed and submitted health insurance documents to support timely hospital claims.',
      'Audited consignment records, checked for discrepancies, and prepared monthly reports by reconciling hospital and consignment inventories.',
    ],
  },
];

const SKILLS = {
  'Operations & Workflow': ['HouseCall Pro', 'Google Sheets', 'Apps Script', 'Google Workspace', 'Microsoft Office', 'Geelark'],
  'AI & Automation':       ['Claude', 'ChatGPT', 'GitHub Copilot', 'OpenAI API', 'Telegram Bot API', 'Prompt Engineering'],
  'Development':           ['JavaScript', 'Node.js', 'Ruby', 'Next.js', 'React', 'Tailwind CSS', 'Puppeteer'],
  'Content & Creative':    ['WordPress', 'Canva', 'Adobe Creative Suite', 'Final Cut Pro', 'Blender'],
};

const LAB_ENTRIES = [
  // Add entries here as experiments get documented.
  // Format: { date: 'Mar 2026', title: '...', body: '...', tags: ['AI', 'API'] }
];

const JOURNEY = [
  { year: 'Pre-2023', note: 'Learning web dev independently. HTML, CSS, JS, backend basics. No AI tools, just docs.' },
  { year: '2023',     note: 'Started freelancing: data entry, research, documentation, WordPress sites.' },
  { year: '2024',     note: 'AI prompts, Sheets automation, Telegram bot, Lesson Plan Builder.' },
  { year: '2025',     note: 'Geelark multi-account management. Gmail automation, job crawler, DailyLog bot.' },
  { year: '2026',     note: 'Exploring Blender for 3D modelling. 3D printing is on the horizon.' },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HELPERS ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function navTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: 'smooth' });
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect(); }
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="fade-in" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Sec({ id, num, title, children }) {
  return (
    <section id={id} className="section">
      <div className="sec-deco" aria-hidden="true">0{num}</div>
      <FadeIn>
        <div className="sec-head">
          <span className="sec-num">0{num}</span>
          <h2 className="sec-title">{title}</h2>
        </div>
      </FadeIn>
      {children}
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ICONS ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Ico({ n, size = 14 }) {
  const fill = n === 'github';
  const paths = {
    github: <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12" />,
    mail:   <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></>,
    ext:    <><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7,7 17,7 17,17"/></>,
    x:      <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    loc:    <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></>,
    pencil: <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill={fill ? 'currentColor' : 'none'}
      stroke={fill ? 'none' : 'currentColor'}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[n]}
    </svg>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SIDEBAR ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function Sidebar({ active }) {
  const nav = [
    { id: 'about',      label: 'About'      },
    { id: 'experience', label: 'Experience' },
    { id: 'projects',   label: 'Projects'   },
    { id: 'skills',     label: 'Skills'     },
    { id: 'contact',    label: 'Contact'    },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-top">
        <div className="sb-avatar">
          <img src="assets/profile.png" alt="Ezequiel Burdios" className="sb-avatar-img"
            onError={e => { e.currentTarget.style.display = 'none'; }} />
          <span>EZ</span>
        </div>
        <div className="sb-name">Ezequiel<br />Burdios</div>
        <div className="sb-role">Operations &amp; Automation</div>
        <div className="sb-avail"><span className="avail-dot"></span>Available for work</div>
      </div>
      <nav className="sb-nav">
        {nav.map(({ id, label }) => (
          <button key={id} className={`sb-btn${active === id ? ' active' : ''}`} onClick={() => navTo(id)}>
            <span className="sb-pip"></span>{label}
          </button>
        ))}
      </nav>
      <div className="sb-mid">
        <div className="sb-stats">
          <div className="sb-stat">
            <span className="sb-stat-val">3+</span>
            <span className="sb-stat-k">yrs remote</span>
          </div>
          <div className="sb-stat">
            <span className="sb-stat-val">{PROJECTS.length}</span>
            <span className="sb-stat-k">projects</span>
          </div>
        </div>
        <div className="sb-now">
          <span className="sb-now-k">Current Work</span>
          <span className="sb-now-v">Operations Coordinator</span>
        </div>
      </div>
      <div className="sb-foot">
        <a href={PORT.github} target="_blank" rel="noopener" className="sb-link"><Ico n="github" /><span>GitHub</span></a>
        <a href={`mailto:${PORT.email}`} className="sb-link"><Ico n="mail" /><span>Email</span></a>
        <a href={PORT.resumeUrl} target="_blank" rel="noopener" className="sb-dl">Resume ↓</a>
      </div>
    </aside>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ TYPED TEXT ━━━━━━━━━━━━━━━━━━━━━━ */
function TypedText({ text, startDelay = 900, speed = 44 }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    let tick;
    const start = setTimeout(() => {
      let i = 0;
      const next = () => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i < text.length) tick = setTimeout(next, speed);
        else setDone(true);
      };
      next();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(tick); };
  }, []);
  return (
    <span className="tagline-accent">
      {displayed}
      {!done && <span className="cursor-blink" aria-hidden="true">|</span>}
    </span>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HERO CIRCUIT ━━━━━━━━━━━━━━━━━━━━━ */
function HeroCircuit() {
  return (
    <div className="hero-circuit" aria-hidden="true">
      <svg viewBox="0 0 580 500" fill="none" width="100%" height="100%">
        <g stroke="rgba(255,255,255,0.055)" strokeWidth="1" strokeLinecap="round">
          <line x1="40" y1="140" x2="100" y2="140"/>
          <line x1="40" y1="220" x2="100" y2="220"/>
          <line x1="100" y1="220" x2="100" y2="300"/>
          <line x1="40" y1="360" x2="100" y2="360"/>
          <line x1="100" y1="360" x2="100" y2="300"/>
          <line x1="260" y1="80" x2="260" y2="40"/>
          <line x1="260" y1="40" x2="380" y2="40"/>
          <line x1="380" y1="40" x2="380" y2="80"/>
          <line x1="480" y1="80" x2="480" y2="40"/>
          <line x1="480" y1="40" x2="560" y2="40"/>
          <line x1="560" y1="40" x2="560" y2="160"/>
          <line x1="560" y1="160" x2="560" y2="300"/>
          <line x1="560" y1="300" x2="480" y2="300"/>
          <line x1="160" y1="140" x2="160" y2="220"/>
          <line x1="100" y1="220" x2="160" y2="220"/>
          <line x1="260" y1="200" x2="260" y2="300"/>
          <line x1="160" y1="300" x2="260" y2="300"/>
          <line x1="260" y1="300" x2="380" y2="300"/>
          <line x1="380" y1="300" x2="380" y2="380"/>
          <line x1="160" y1="380" x2="380" y2="380"/>
          <line x1="160" y1="300" x2="160" y2="380"/>
          <line x1="380" y1="380" x2="480" y2="380"/>
          <line x1="480" y1="380" x2="480" y2="300"/>
          <line x1="320" y1="160" x2="320" y2="200"/>
          <line x1="320" y1="200" x2="380" y2="200"/>
          <line x1="380" y1="160" x2="380" y2="200"/>
          <line x1="380" y1="200" x2="480" y2="200"/>
          <line x1="480" y1="200" x2="480" y2="300"/>
        </g>
        <g stroke="rgba(77,157,224,0.3)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="100" y1="140" x2="260" y2="140"/>
          <line x1="260" y1="140" x2="260" y2="80"/>
          <line x1="260" y1="80" x2="480" y2="80"/>
          <line x1="480" y1="80" x2="480" y2="160"/>
          <line x1="480" y1="160" x2="260" y2="160"/>
          <line x1="260" y1="160" x2="260" y2="200"/>
        </g>
        <g stroke="rgba(201,137,108,0.22)" strokeWidth="1.5" strokeLinecap="round">
          <line x1="260" y1="200" x2="380" y2="200"/>
          <line x1="380" y1="200" x2="380" y2="300"/>
          <line x1="380" y1="300" x2="480" y2="300"/>
        </g>
        <path d="M100,140 L260,140 L260,80 L480,80 L480,160 L260,160 L260,200 L380,200 L380,300"
          stroke="rgba(77,157,224,0.75)" strokeWidth="1.5" strokeLinecap="round"
          strokeDasharray="40 1100" className="circuit-signal"/>
        <g fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1">
          {[[40,140],[40,220],[40,360],[100,300],[160,220],[160,380],[260,40],[380,40],[380,80],[480,40],[560,40],[560,160],[560,300],[480,300],[320,160],[320,200],[380,200],[480,200],[480,380],[380,380],[160,300]].map(([cx,cy],i) => (
            <circle key={i} cx={cx} cy={cy} r="2.5"/>
          ))}
        </g>
        <circle cx="260" cy="140" r="5"  fill="rgba(77,157,224,0.5)"   className="cn cn-d0"/>
        <circle cx="260" cy="140" r="11" fill="rgba(77,157,224,0.07)"  className="cn cn-d0"/>
        <circle cx="260" cy="80"  r="4"  fill="rgba(77,157,224,0.4)"   className="cn cn-d1"/>
        <circle cx="260" cy="80"  r="9"  fill="rgba(77,157,224,0.06)"  className="cn cn-d1"/>
        <circle cx="480" cy="80"  r="4"  fill="rgba(77,157,224,0.35)"  className="cn cn-d2"/>
        <circle cx="480" cy="80"  r="8"  fill="rgba(77,157,224,0.05)"  className="cn cn-d2"/>
        <circle cx="480" cy="160" r="4"  fill="rgba(201,137,108,0.45)" className="cn cn-d3"/>
        <circle cx="480" cy="160" r="9"  fill="rgba(201,137,108,0.07)" className="cn cn-d3"/>
        <circle cx="260" cy="200" r="3.5" fill="rgba(77,157,224,0.35)" className="cn cn-d4"/>
        <circle cx="380" cy="200" r="3.5" fill="rgba(201,137,108,0.3)" className="cn cn-d1"/>
        <circle cx="380" cy="300" r="3"  fill="rgba(201,137,108,0.25)" className="cn cn-d3"/>
        <circle cx="160" cy="140" r="3"  fill="rgba(77,157,224,0.25)"  className="cn cn-d2"/>
        <circle cx="260" cy="160" r="3.5" fill="rgba(77,157,224,0.3)"  className="cn cn-d4"/>
      </svg>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-glow"></div>
      <div className="hero-dots"></div>
      <HeroCircuit />
      <div className="hero-inner">
        <div className="hero-loc"><Ico n="loc" size={11} />{PORT.location}</div>
        <h1 className="hero-name">Ezequiel<br />Burdios</h1>
        <p className="hero-tagline">
          I turn messy, repetitive workflows into<br />
          <TypedText text="clean, reliable systems." startDelay={900} />
        </p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={() => navTo('projects')}>View Projects</button>
          <a href={PORT.resumeUrl} target="_blank" rel="noopener" className="btn-ghost">Download Resume</a>
        </div>
      </div>
    </section>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ ABOUT ━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function AboutSection() {
  const journeyRef = useRef(null);
  useEffect(() => {
    const el = journeyRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('line-visible'); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Sec id="about" num={1} title="About">
      <FadeIn delay={80}>
        <div className="about-grid">
          <div className="about-bio">
            <p>Virtual Assistant turned Operations Coordinator, with 3+ years of remote experience in automation, research, and client support. Now managing technician dispatch, customer bookings, and service operations day to day.</p>
            <p>I started with the usual VA work: research, data entry, documentation. Over time I found myself drawn to the part most people skip — building the systems behind the work. I've managed complex multi-account environments, built tracking tools from scratch in Google Sheets, and integrated AI to cut repetitive tasks.</p>
            <blockquote className="pullquote">
              "Not because I have to, but because I genuinely enjoy figuring out how things can run better."
            </blockquote>
            <div className="about-creds">
              <div className="cred"><span className="cred-k">Education</span><span className="cred-v">BA English · Mindanao State University · 2019</span></div>
              <div className="cred"><span className="cred-k">License</span><span className="cred-v">Professional Teaching License · 88.20</span></div>
              <div className="cred"><span className="cred-k">Eligibility</span><span className="cred-v">Career Service Professional · 81.1</span></div>
            </div>
          </div>
          <div className="about-photo">
            <img src="assets/profile.png" alt="Ezequiel Burdios" className="profile-img" />
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={150}>
        <div className="journey">
          <div className="journey-lbl">My Journey</div>
          <div className="journey-row" ref={journeyRef}>
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
    </Sec>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ EXPERIENCE ━━━━━━━━━━━━━━━━━━━━━━ */
function ExperienceSection() {
  return (
    <Sec id="experience" num={2} title="Experience">
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
    </Sec>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ LAB MODAL ━━━━━━━━━━━━━━━━━━━━━━━ */
function LabModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <Ico n="x" size={15} />
        </button>

        <div className="modal-hd">
          <div className="modal-hd-icon" style={{ background: 'rgba(77,157,224,0.13)', color: 'var(--blue)' }}>
            <Ico n="pencil" size={20} />
          </div>
          <div className="modal-hd-text">
            <div className="modal-title">Learning Lab</div>
            <div className="modal-sub">Experiments &amp; running notes</div>
          </div>
        </div>

        <div className="lab-modal-intro">
          This is where experiments, scripts, and half-baked ideas get documented. AI tools, Sheets scripts, APIs being tested, workflow insights. Messy on purpose.
        </div>

        {LAB_ENTRIES.length === 0 ? (
          <div className="lab-empty">No entries logged yet.</div>
        ) : (
          <div className="lab-entries">
            {LAB_ENTRIES.map((entry, i) => (
              <div key={i} className="lab-entry">
                <div className="lab-entry-head">
                  <span className="lab-entry-date">{entry.date}</span>
                  <span className="lab-entry-title">{entry.title}</span>
                </div>
                <p className="lab-entry-body">{entry.body}</p>
                {entry.tags && (
                  <div className="pcard-tags">
                    {entry.tags.map(t => <span key={t} className="ptag">{t}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ PROJECT MODAL ━━━━━━━━━━━━━━━━━━━ */
function ProjectModal({ p, onClose }) {
  const [lightbox, setLightbox] = useState(null);
  const ytRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.key !== 'Escape') return;
      if (lightbox) { setLightbox(null); return; }
      onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, onClose]);

  return (
    <div className="modal-bg" onClick={onClose}>
      {lightbox && (
        <div className="lightbox-bg" onClick={e => { e.stopPropagation(); setLightbox(null); }}>
          <img src={lightbox} alt="" className="lightbox-img" onClick={e => e.stopPropagation()} />
        </div>
      )}
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <button className="modal-x" onClick={onClose} aria-label="Close">
          <Ico n="x" size={15} />
        </button>

        <div className="modal-hd">
          <div className="modal-hd-icon" style={{ background: p.accent + '22' }}>
            <div style={{ width: 22, height: 22, borderRadius: 6, background: p.accent, opacity: 0.75 }}></div>
          </div>
          <div className="modal-hd-text">
            <div className="modal-title">{p.title}</div>
            <div className="modal-sub">{p.sub}</div>
          </div>
          <span className="modal-cat" style={{ color: p.accent, borderColor: p.accent + '50' }}>{p.cat}</span>
        </div>

        {p.live && !p.liveLinks && (
          <a href={p.live} target="_blank" rel="noopener" className="modal-demo-banner"
            style={{ background: p.accent }}>
            <span>Try the Live Demo</span>
            <Ico n="ext" size={15} />
          </a>
        )}

        {p.youtube && p.sections && (
          <button
            className="modal-demo-banner modal-scroll-banner"
            style={{ background: p.accent }}
            onClick={() => ytRef.current && ytRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
            <span>See it in Action</span>
            <span>↓</span>
          </button>
        )}

        {p.sections && p.details && (
          <div className="modal-body">
            {p.details.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        )}

        {p.img && !p.sections && (
          <div className="modal-img-wrap" role="button" tabIndex={0}
            onClick={() => setLightbox(p.img)}
            onKeyDown={e => e.key === 'Enter' && setLightbox(p.img)}>
            <img src={p.img} alt={p.title} className="modal-img" />
            <div className="modal-img-hint">Click to enlarge</div>
          </div>
        )}

        {p.stats && p.stats.length > 0 && (
          <div className="modal-stats">
            {p.stats.map((s, i) => (
              <div key={i} className="modal-stat">
                <span className="modal-stat-val">{s.val}</span>
                <span className="modal-stat-k">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {p.sections && p.sections.map((sec, i) => (
          <div key={i} className="modal-story-sec">
            {sec.gif && sec.gifAbove && (
              <div className="modal-story-gif" role="button" tabIndex={0}
                onClick={() => setLightbox(sec.gif.src)}
                onKeyDown={e => e.key === 'Enter' && setLightbox(sec.gif.src)}>
                <img src={sec.gif.src} alt={sec.gif.label} />
                <div className="modal-img-hint">Click to enlarge</div>
              </div>
            )}
            <div className="modal-section-lbl">{sec.heading}</div>
            <p className="modal-story-body">{sec.body}</p>
            {sec.gif && !sec.gifAbove && (
              <div className="modal-story-gif" role="button" tabIndex={0}
                onClick={() => setLightbox(sec.gif.src)}
                onKeyDown={e => e.key === 'Enter' && setLightbox(sec.gif.src)}>
                <img src={sec.gif.src} alt={sec.gif.label} />
                <div className="modal-img-hint">Click to enlarge</div>
              </div>
            )}
          </div>
        ))}

        {p.youtube && (
          <div className="modal-section" ref={ytRef}>
            <div className="modal-section-lbl">Full Demo</div>
            <div className="modal-yt-wrap">
              <iframe
                src={'https://www.youtube.com/embed/' + p.youtube}
                title={p.title + ' demo'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen={true}
              />
            </div>
            <a href={p.live} target="_blank" rel="noopener" className="modal-yt-foot">
              Watch on YouTube ↗
            </a>
          </div>
        )}

        {!p.sections && (
          <div className="modal-body">
            {(p.details || p.desc).split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        )}

        {p.highlights && p.highlights.length > 0 && (
          <div className="modal-section">
            <div className="modal-section-lbl">How it works</div>
            <ul className="modal-bullets">
              {p.highlights.map((h, i) => <li key={i}>{h}</li>)}
            </ul>
          </div>
        )}

        {p.snippet && (
          <div className="modal-section">
            <div className="modal-section-lbl">Code snippet</div>
            <pre className="modal-pre"><code>{p.snippet}</code></pre>
          </div>
        )}

        <div className="modal-tags-row">
          {p.tags.map(t => <span key={t} className="ptag">{t}</span>)}
        </div>

        {(p.github || p.githubReq || p.live || p.liveLinks) && (
          <div className="modal-links">
            {p.github && <a href={p.github} target="_blank" rel="noopener" className="modal-link"><Ico n="github" /> GitHub</a>}
            {p.githubReq && !p.github && <span className="modal-link modal-link-req"><Ico n="github" /> Source available on request</span>}
            {p.liveLinks
              ? p.liveLinks.map((l, i) => (
                  <a key={i} href={l.url} target="_blank" rel="noopener" className="modal-link modal-link-accent" style={{ borderColor: p.accent + '40', color: p.accent }}>
                    <Ico n="ext" /> {l.label}
                  </a>
                ))
              : p.live && <a href={p.live} target="_blank" rel="noopener" className="modal-link modal-link-accent" style={{ borderColor: p.accent + '40', color: p.accent }}><Ico n="ext" /> Open Project</a>
            }
          </div>
        )}
      </div>
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ PROJECT CARDS ━━━━━━━━━━━━━━━━━━━ */
function PCard({ p, variant, onOpen }) {
  return (
    <div
      className={`pcard pcard-${variant || 'sm'}`}
      style={{ '--acc': p.accent }}
      onClick={() => onOpen(p)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onOpen(p)}
    >
      <div className="pcard-top">
        <div className="pcard-icon" style={{ background: p.accent + '22' }}>
          <div style={{ width: 18, height: 18, borderRadius: 4, background: p.accent, opacity: 0.75 }}></div>
        </div>
        <div className="pcard-info">
          <div className="pcard-title">{p.title}</div>
          <div className="pcard-sub">{p.sub}</div>
        </div>
        <div className="pcard-links" onClick={e => e.stopPropagation()}>
          {p.github && <a href={p.github} target="_blank" rel="noopener" className="pcard-link" title="GitHub"><Ico n="github" /></a>}
          {p.githubReq && !p.github && <span className="pcard-link pcard-req" title="Source available on request"><Ico n="github" /></span>}
          {p.live   && <a href={p.live}   target="_blank" rel="noopener" className="pcard-link" title="View"><Ico n="ext" /></a>}
        </div>
      </div>
      {p.img && <div className="pcard-img-wrap"><img src={p.img} alt={p.title} className="pcard-img" /></div>}
      <p className="pcard-desc">{p.desc}</p>
      <div className="pcard-foot">
        <div className="pcard-tags">{p.tags.map(t => <span key={t} className="ptag">{t}</span>)}</div>
        <div className="pcard-foot-r">
          <span className="pcard-cat">{p.cat}</span>
          {(p.details || p.highlights) && <span className="pcard-peek">Details</span>}
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [selected, setSelected] = useState(null);
  const featured = PROJECTS.filter(p => p.featured);
  const others   = PROJECTS.filter(p => !p.featured);
  return (
    <Sec id="projects" num={3} title="Projects">
      <FadeIn delay={60}>
        <div className="proj-featured">
          <PCard p={featured[0]} variant="lg" onOpen={setSelected} />
          <PCard p={featured[1]} variant="lg" onOpen={setSelected} />
        </div>
        <div className="proj-mid">
          <PCard p={featured[2]} variant="md" onOpen={setSelected} />
          <PCard p={featured[3]} variant="md" onOpen={setSelected} />
        </div>
      </FadeIn>
      <FadeIn delay={120}>
        <p className="proj-more-lbl">More projects</p>
        <div className="proj-grid">
          {others.map(p => <PCard key={p.id} p={p} variant="sm" onOpen={setSelected} />)}
        </div>
      </FadeIn>
      {selected && <ProjectModal p={selected} onClose={() => setSelected(null)} />}
    </Sec>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ SKILLS ━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SkillsSection() {
  return (
    <Sec id="skills" num={4} title="Skills">
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
    </Sec>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ LAB ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function LabSection() {
  const [open, setOpen] = useState(false);
  return (
    <Sec id="lab" num={5} title="Learning Lab">
      <FadeIn>
        <div className="lab-card lab-card-btn"
          role="button" tabIndex={0}
          onClick={() => setOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setOpen(true)}>
          <div className="lab-icon"><Ico n="pencil" size={20} /></div>
          <div className="lab-text">
            <strong>Experiments, scripts, and half-baked ideas.</strong>
            <span>AI tools, Sheets scripts, APIs I'm testing, and workflow insights. Documented as they happen. Messy on purpose.</span>
          </div>
          <span className="lab-link">Open Lab</span>
        </div>
      </FadeIn>
      {open && <LabModal onClose={() => setOpen(false)} />}
    </Sec>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ CONTACT ━━━━━━━━━━━━━━━━━━━━━━━━━ */
function ContactSection() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [formError, setFormError] = useState('');
  const upd = (k, v) => setF(p => ({ ...p, [k]: v }));
  const submit = async e => {
    e.preventDefault();
    if (WEB3FORMS_KEY === 'YOUR_ACCESS_KEY') {
      // Fallback: open mailto if key not configured
      window.location.href = `mailto:${PORT.email}?subject=Hello from ${encodeURIComponent(f.name)}&body=${encodeURIComponent(f.message)}`;
      setSent(true); return;
    }
    setSending(true); setFormError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: f.name, email: f.email, message: f.message,
          subject: `Portfolio contact from ${f.name}`,
        }),
      });
      const data = await res.json();
      if (data.success) setSent(true);
      else setFormError('Something went wrong. Email me directly.');
    } catch { setFormError('Could not send. Email me directly.'); }
    setSending(false);
  };
  return (
    <Sec id="contact" num={6} title="Get In Touch">
      <FadeIn>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-lede">Open to remote opportunities, freelance projects, and interesting collaborations.</p>
            <div className="cd"><span className="cd-k">Email</span><a href={`mailto:${PORT.email}`}>{PORT.email}</a></div>
            <div className="cd"><span className="cd-k">GitHub</span><a href={PORT.github} target="_blank" rel="noopener">Shiroyasha21</a></div>
            <div className="cd"><span className="cd-k">Location</span><span>{PORT.location}</span></div>
            <div className="cd"><span className="cd-k">Notion</span><a href={PORT.notion} target="_blank" rel="noopener">ezequielbportfolio.notion.site</a></div>
          </div>
          <div>
            {sent ? (
              <div className="form-sent">Message sent. I'll get back to you soon.</div>
            ) : (
              <form className="cform" onSubmit={submit}>
                <div className="cf-row"><label>Name</label><input type="text" value={f.name} onChange={e => upd('name', e.target.value)} required placeholder="Your name" /></div>
                <div className="cf-row"><label>Email</label><input type="email" value={f.email} onChange={e => upd('email', e.target.value)} required placeholder="your@email.com" /></div>
                <div className="cf-row"><label>Message</label><textarea value={f.message} onChange={e => upd('message', e.target.value)} required rows={4} placeholder="What's on your mind?" /></div>
                {formError && <p style={{ fontSize: 13, color: 'var(--warm)', margin: 0 }}>{formError}</p>}
                <button type="submit" className="btn-primary" disabled={sending}>{sending ? 'Sending…' : 'Send Message'}</button>
              </form>
            )}
          </div>
        </div>
      </FadeIn>
    </Sec>
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
      <TweakColor label="Accent" value={t.accent} options={['#4d9de0','#5a9e7a','#7c6fb0','#c9896c']} onChange={v => setTweak('accent', v)} />
      <TweakColor label="Warm"   value={t.warm}   options={['#c9896c','#e07a4d','#c8a060','#b08060']} onChange={v => setTweak('warm', v)} />
      <TweakSection label="Typography" />
      <TweakSelect label="Heading font" value={t.font} options={['Space Grotesk','DM Serif Display','Syne','Outfit']} onChange={v => setTweak('font', v)} />
    </TweaksPanel>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━ APP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function App() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const ids = ['about','experience','projects','skills','contact'];
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 120;
      let cur = ids[0];
      if (nearBottom) {
        cur = 'contact';
      } else {
        for (const id of ids) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= 80) cur = id;
        }
      }
      setActive(cur);
      document.querySelectorAll('.sec-deco').forEach(deco => {
        const s = deco.closest('.section'); if (!s) return;
        const pct = s.getBoundingClientRect().top / window.innerHeight;
        deco.style.transform = `translateY(${pct * -28}px)`;
      });
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

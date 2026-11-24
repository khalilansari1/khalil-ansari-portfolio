import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const projects = [
  { id: '01', name: 'Sonder®', type: 'Digital flagship · 2025', tags: ['Art direction', 'E-commerce'], className: 'project-sonder', mark: 'sonder', detail: 'A new kind of presence.' },
  { id: '02', name: 'Orbit Finance', type: 'Product design · 2024', tags: ['Product', 'Fintech'], className: 'project-orbit', mark: 'orbit', detail: 'Money, in a new orbit.' },
  { id: '03', name: 'Aether / 01', type: 'Creative experiment · 2024', tags: ['WebGL', 'Interaction'], className: 'project-aether', mark: 'aether', detail: 'A space to get lost in.' },
];

const skills = [
  { name: 'Creative development', detail: 'React · Next.js · TypeScript', value: 94 },
  { name: 'Interaction & motion', detail: 'Framer Motion · GSAP · WebGL', value: 88 },
  { name: 'Digital product design', detail: 'Figma · Prototyping · Systems', value: 84 },
  { name: 'Creative technology', detail: 'Three.js · GLSL · AI', value: 78 },
];

function Reveal({ children, className = '', delay = 0, ...props }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }} {...props}>{children}</motion.div>;
}

function Navigation() {
  return <header className="nav-wrap"><a className="wordmark" href="#home" aria-label="Khalil Ansari home">KA<span className="wordmark-dot">.</span></a><nav className="nav-glass" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#expertise">Expertise</a></nav><a className="nav-contact" href="mailto:hello@khalilansari.dev">Let’s talk <span>↗</span></a></header>;
}

function Orb() {
  const orbRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [12, -12]), { stiffness: 90, damping: 22 });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-16, 16]), { stiffness: 90, damping: 22 });
  const move = (event) => {
    const rect = orbRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };
  return <div className="orb-stage" ref={orbRef} onPointerMove={move} onPointerLeave={reset} aria-label="Interactive luminous 3D orb">
    <div className="orb-halo" />
    <motion.div className="orb-core" style={{ rotateX, rotateY }}>
      <div className="orb-surface"><span className="orb-shimmer" /></div><div className="orb-rim" /><div className="orb-orbit orbit-one" /><div className="orb-orbit orbit-two" />
    </motion.div>
    <span className="orb-crosshair crosshair-a">+</span><span className="orb-crosshair crosshair-b">+</span>
    <span className="orb-caption">A LITTLE BIT OF<br />UNIVERSE, BUILT BY HAND</span>
  </div>;
}

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const px = useMotionValue(0); const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 18 });
  const onMove = (e) => { const r = ref.current.getBoundingClientRect(); px.set((e.clientX-r.left)/r.width-.5); py.set((e.clientY-r.top)/r.height-.5); };
  const onLeave = () => { px.set(0); py.set(0); };
  return <Reveal className={`project-card ${project.className}`} delay={index * 0.1}>
    <motion.a ref={ref} href={`mailto:hello@khalilansari.dev?subject=${encodeURIComponent(`Let's talk about ${project.name}`)}`} className="project-link" onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }} aria-label={`Discuss ${project.name} project`}>
      <div className="project-art"><div className="art-grid" /><div className={`art-composition ${project.className}-composition`}><span className="art-mark">{project.mark}</span><span className="art-detail">{project.detail}</span><span className="art-orb" /></div><span className="project-open">↗</span><span className="project-index">SELECTED WORK&nbsp; / &nbsp;{project.id}</span></div>
      <div className="project-meta"><div><h3>{project.name}</h3><p>{project.type}</p></div><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
    </motion.a>
  </Reveal>;
}

function App() {
  return <div className="site-shell"><div className="noise" aria-hidden="true" /><Navigation />
    <main>
      <section className="hero section-wrap" id="home">
        <div className="hero-copy"><Reveal><div className="eyebrow"><span className="status-dot" /> INDEPENDENT CREATIVE DEVELOPER <span className="eyebrow-line" /> AVAILABLE FOR SELECT PROJECTS</div></Reveal>
          <Reveal delay={0.1}><h1>Digital worlds,<br /><span className="headline-accent">made human.</span></h1></Reveal>
          <Reveal delay={0.2}><p className="hero-intro">I’m Khalil — a creative developer and digital designer turning ambitious ideas into thoughtful, immersive experiences.</p></Reveal>
          <Reveal delay={0.3}><div className="hero-actions"><a className="button-primary" href="#work">Explore selected work <span>↓</span></a><a className="text-link" href="mailto:hello@khalilansari.dev">Start a conversation <span>↗</span></a></div></Reveal>
        </div>
        <div className="hero-visual"><Orb /><motion.span className="float-badge badge-react" animate={{ y: [0, -9, 0], rotate: [-3, 2, -3] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>React <i>✳</i></motion.span><motion.span className="float-badge badge-three" animate={{ y: [0, 8, 0], rotate: [2, -2, 2] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>Three.js <i>◈</i></motion.span><motion.span className="float-badge badge-motion" animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}>Motion <i>↗</i></motion.span></div>
        <div className="hero-foot"><span>DESIGN-LED DEVELOPMENT<br />FOR A MORE INTERESTING WEB.</span><a href="#work" className="scroll-hint">SCROLL TO EXPLORE <span>↓</span></a><span className="hero-coords">37°46'49.7"N<br />122°25'09.7"W</span></div>
      </section>

      <section className="work section-wrap" id="work"><Reveal className="section-heading"><div><span className="section-kicker">01 / A FEW THINGS I’VE MADE</span><h2>Selected <span>work</span></h2></div><p>A collection of digital experiences built with curiosity, care, and a healthy obsession with the details.</p></Reveal>
        <div className="project-grid">{projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}</div>
        <Reveal className="work-note"><span className="note-star">✳</span><p>Good work happens when <em>bold ideas</em> meet thoughtful execution.</p><span className="note-index">A NOTE TO SELF · 001</span></Reveal>
      </section>

      <section className="about section-wrap" id="about"><div className="about-aside"><Reveal><span className="section-kicker">02 / A LITTLE ABOUT ME</span><div className="about-mark">KA<span>®</span></div><p className="aside-caption">CURIOUS BY NATURE.<br />DETAIL-ORIENTED BY CHOICE.</p></Reveal></div>
        <Reveal className="about-main"><h2>I build the kind<br />of internet <span>you can feel.</span></h2><p className="about-copy">Part designer, part engineer, fully invested in making the web a more beautiful and meaningful place. I work at the intersection of precise craft and playful experimentation — partnering with people who believe the details are the whole point.</p><a className="text-link" href="mailto:hello@khalilansari.dev">A little more about working together <span>↗</span></a></Reveal></section>

      <section className="expertise section-wrap" id="expertise"><Reveal className="section-heading"><div><span className="section-kicker">03 / THE TOOLKIT</span><h2>Good at the <span>details.</span></h2></div><p>Tools are just the beginning. The real craft is knowing what to make, and why.</p></Reveal>
        <div className="skills-layout"><div className="skills-label"><span className="mini-spark">✳</span><h3>Where design<br />meets the browser.</h3><span className="skills-caption">A PRACTICE, NOT A CHECKLIST.</span></div><div className="skills-list">{skills.map((skill, i) => <Reveal className="skill-row" key={skill.name} delay={i * 0.08}><div className="skill-top"><div><h4>{skill.name}</h4><p>{skill.detail}</p></div><span>0{i + 1}</span></div><div className="skill-track"><motion.div className="skill-fill" initial={{ scaleX: 0 }} whileInView={{ scaleX: skill.value / 100 }} viewport={{ once: true }} transition={{ duration: 1.15, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }} /></div></Reveal>)}</div></div>
      </section>

      <section className="contact section-wrap" id="contact"><Reveal className="contact-panel"><div className="contact-top"><span className="section-kicker">04 / HAVE SOMETHING GOOD IN MIND?</span><span className="contact-orbit">✳</span></div><h2>Let’s make<br /><span>it matter.</span></h2><div className="contact-bottom"><p>For projects, collaborations, or just a very good link — my inbox is open.</p><a className="contact-link" href="mailto:hello@khalilansari.dev">hello@khalilansari.dev <span>↗</span></a></div></Reveal></section>
    </main>
    <footer className="footer section-wrap"><a className="wordmark footer-mark" href="#home">KA<span className="wordmark-dot">.</span></a><span>DESIGNED & BUILT WITH INTENTION <i>✳</i> © 2025 KHALIL ANSARI</span><div><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LINKEDIN ↗</a><a href="https://github.com/" target="_blank" rel="noreferrer">GITHUB ↗</a></div></footer>
  </div>;
}

export default App;

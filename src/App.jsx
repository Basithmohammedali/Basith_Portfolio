import { useState, useEffect } from "react";

/* =========================================================
   Typewriter effect for the rotating role line.
   Falls back to a static first word if the user has
   prefers-reduced-motion enabled.
========================================================= */
function useTypewriter(words, { typingSpeed = 55, deletingSpeed = 28, pause = 1600 } = {}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    if (!deleting && subIndex === words[index].length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => setSubIndex((prev) => prev + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, reduceMotion, typingSpeed, deletingSpeed, pause]);

  if (reduceMotion) return words[0];
  return words[index].substring(0, subIndex);
}

/* =========================================================
   Scroll-reveal: watches every [data-reveal] element and
   adds .in-view the first time it enters the viewport.
   One quiet, consistent effect — not a different animation
   per section.
========================================================= */
function useScrollReveal() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("in-view"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const roles = [
    "SOC Analyst",
    "Security Operations Analyst",
    "Cybersecurity Analyst",
    "Penetration Tester",
  ];

  const roleText = useTypewriter(roles);
  useScrollReveal();

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (

    <div className="portfolio">

      {/* =========================
          NAVBAR
      ========================= */}

      <header className="navbar">
        <div className="navbar-inner">

          <a href="#home" className="logo" onClick={closeMenu}>
            <span className="logo-icon">B</span>
            <span className="logo-name">
              BASITH<span>.</span>
            </span>
          </a>

          <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#skills" onClick={closeMenu}>Skills</a>
            <a href="#projects" onClick={closeMenu}>Projects</a>
            <a href="#experience" onClick={closeMenu}>Experience</a>
            <a href="#reports" onClick={closeMenu}>Reports</a>
            <a href="#education" onClick={closeMenu}>Education</a>
          </nav>

          <a href="#contact" className="nav-button" onClick={closeMenu}>
            Contact Me
            <span>↗</span>
          </a>

          <button
            className="mobile-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "×" : "☰"}
          </button>

        </div>
      </header>


      {/* =========================
          HERO
      ========================= */}

      <main>

        <section id="home" className="hero">

          <div className="hero-container">

            {/* LEFT SIDE */}

            <div className="hero-content">

              <div className="hero-status hero-anim" style={{ animationDelay: "0ms" }}>
                <span className="status-dot" aria-hidden="true"></span>
                AVAILABLE FOR SOC OPPORTUNITIES
              </div>

              <p className="hero-eyebrow hero-anim" style={{ animationDelay: "80ms" }}>
                SECURITY OPERATIONS
              </p>

              <h1 className="hero-name hero-anim" style={{ animationDelay: "150ms" }}>
                <span>Basith</span>
                <span>Mohammed Ali</span>
              </h1>

              <div className="hero-role hero-anim" style={{ animationDelay: "260ms" }}>
                <span className="terminal-symbol" aria-hidden="true">&gt;_</span>
                <span className="role-text">{roleText}</span>
                <span className="role-cursor" aria-hidden="true">|</span>
              </div>

              <p className="hero-description hero-anim" style={{ animationDelay: "340ms" }}>
                I build and operate hands-on security environments
                focused on threat detection, alert investigation,
                SIEM monitoring, and automated incident response.
              </p>

              <div className="hero-actions hero-anim" style={{ animationDelay: "420ms" }}>
                <a href="#projects" className="hero-button primary">
                  View Projects ↗
                </a>
                <a
                  href="https://github.com/Basithmohammedali"
                  target="_blank"
                  rel="noreferrer"
                  className="hero-button secondary"
                >
                  GitHub ↗
                </a>
                <a
                  href="/basith.pdf"
                  download="Basith-Mohammed-Ali-Resume.pdf"
                  className="hero-button secondary"
                >
                  Download Resume ↓
                </a>
              </div>

              <div className="hero-stats hero-anim" style={{ animationDelay: "500ms" }}>
                <div className="hero-stat">
                  <strong>SIEM</strong>
                  <span>Monitoring</span>
                </div>
                <div className="hero-stat">
                  <strong>SOAR</strong>
                  <span>Automation</span>
                </div>
                <div className="hero-stat">
                  <strong>IR</strong>
                  <span>Investigation</span>
                </div>
              </div>

            </div>


            {/* RIGHT SIDE — SOC VISUAL */}

            <div className="soc-visual hero-anim" style={{ animationDelay: "220ms" }}>

              <div className="visual-glow"></div>

              <div className="soc-card">

                <div className="soc-card-header">
                  <div>
                    <p className="soc-label">SECURITY OPERATIONS CENTER</p>
                    <h2>Live Monitor</h2>
                  </div>
                  <div className="live-indicator">
                    <span aria-hidden="true"></span>
                    LIVE
                  </div>
                </div>

                <div className="terminal">
                  <div className="terminal-top">
                    <div className="terminal-dots" aria-hidden="true">
                      <span></span><span></span><span></span>
                    </div>
                    <span>soc-monitor</span>
                  </div>

                  <div className="terminal-body">
                    <p><span className="terminal-green">basith@soc</span>:~$ monitoring --status</p>
                    <p className="terminal-success">✓ Security monitoring active</p>
                    <p><span className="terminal-green">basith@soc</span>:~$ detection-engine --run</p>
                    <p className="terminal-success">✓ Detection rules loaded</p>
                    <p><span className="terminal-green">basith@soc</span>:~$ incident-response --ready</p>
                    <p className="terminal-success">✓ Response pipeline ready</p>
                    <span className="terminal-cursor" aria-hidden="true">_</span>
                  </div>
                </div>

                <div className="soc-metrics">
                  <div className="metric-card">
                    <span>EVENTS</span>
                    <strong>1,284</strong>
                    <small>↑ 12.4%</small>
                  </div>
                  <div className="metric-card">
                    <span>ALERTS</span>
                    <strong>24</strong>
                    <small className="metric-warn">Active</small>
                  </div>
                  <div className="metric-card">
                    <span>THREATS</span>
                    <strong>03</strong>
                    <small className="metric-warn">Investigating</small>
                  </div>
                </div>

                <div className="activity">
                  <div className="activity-header">
                    <span>DETECTION ACTIVITY</span>
                    <span>LAST 24H</span>
                  </div>
                  <div className="activity-bars" aria-hidden="true">
                    <span style={{ height: "35%" }}></span>
                    <span style={{ height: "52%" }}></span>
                    <span style={{ height: "42%" }}></span>
                    <span style={{ height: "68%" }}></span>
                    <span style={{ height: "48%" }}></span>
                    <span style={{ height: "78%" }}></span>
                    <span style={{ height: "55%" }}></span>
                    <span style={{ height: "88%" }}></span>
                    <span style={{ height: "62%" }}></span>
                    <span style={{ height: "73%" }}></span>
                    <span style={{ height: "92%" }}></span>
                    <span style={{ height: "64%" }}></span>
                    <span style={{ height: "82%" }}></span>
                    <span style={{ height: "58%" }}></span>
                    <span style={{ height: "70%" }}></span>
                  </div>
                </div>

              </div>

              <div className="floating-badge badge-one">
                <span className="badge-icon" aria-hidden="true">✓</span>
                <div>
                  <strong>Detection Active</strong>
                  <small>SIEM Monitoring</small>
                </div>
              </div>

              <div className="floating-badge badge-two">
                <span className="badge-icon purple" aria-hidden="true">⚡</span>
                <div>
                  <strong>Automation</strong>
                  <small>SOAR Pipeline</small>
                </div>
              </div>

            </div>

          </div>

          <div className="scroll-indicator" aria-hidden="true">
            <span></span>
            Scroll to explore
          </div>

        </section>

        {/* =========================
            ABOUT
        ========================= */}

        <section id="about" className="about-section">
          <div className="about-container">

            <div className="section-heading" data-reveal>
              <p className="section-label">ABOUT</p>
              <h2 className="section-title">Who I am</h2>
            </div>

            <div className="about-grid">

              <div className="about-intro" data-reveal>
                <p className="about-kicker">SOC ANALYST · SECURITY OPERATIONS</p>
                <p className="about-main-text">
                  I am Basith Mohammed Ali, a cybersecurity
                  professional focused on Security Operations,
                  threat detection, investigation, and incident
                  response.
                </p>
                <p className="about-secondary-text">
                  My approach is hands-on. I build security labs,
                  generate attack activity, collect telemetry,
                  investigate alerts, and automate response
                  workflows using real-world security tooling.
                </p>
              </div>

              <div className="about-workflow" data-reveal>
                <div className="workflow-header">
                  <span>SOC WORKFLOW</span>
                  <span className="workflow-status">● OPERATIONAL</span>
                </div>

                <div className="workflow-list">
                  <div className="workflow-item">
                    <div className="workflow-number">01</div>
                    <div>
                      <strong>Collect</strong>
                      <span>Endpoint & network telemetry</span>
                    </div>
                  </div>
                  <div className="workflow-line"></div>

                  <div className="workflow-item">
                    <div className="workflow-number">02</div>
                    <div>
                      <strong>Detect</strong>
                      <span>Rules, alerts & threat signals</span>
                    </div>
                  </div>
                  <div className="workflow-line"></div>

                  <div className="workflow-item">
                    <div className="workflow-number">03</div>
                    <div>
                      <strong>Investigate</strong>
                      <span>IOC analysis & alert triage</span>
                    </div>
                  </div>
                  <div className="workflow-line"></div>

                  <div className="workflow-item">
                    <div className="workflow-number">04</div>
                    <div>
                      <strong>Respond</strong>
                      <span>Automated & manual response</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* =========================
            SKILLS
        ========================= */}

        <section id="skills" className="skills-section">
          <div className="skills-container">

            <div className="section-heading skills-heading" data-reveal>
              <p className="section-label">SKILLS</p>
              <h2 className="section-title">What I work with</h2>
              <p className="skills-intro">
                A practical security stack built through hands-on
                labs, detection engineering, investigation, and
                automation workflows.
              </p>
            </div>

            <div className="skills-grid">

              {[
                {
                  num: "01", symbol: "◉", title: "SIEM & Monitoring",
                  desc: "Security telemetry collection, centralized monitoring, alert management and endpoint visibility.",
                  tags: ["Splunk", "Elastic Security", "Kibana", "Wazuh", "Elasticsearch", "Fleet"],
                },
                {
                  num: "02", symbol: "◈", title: "Detection Engineering",
                  desc: "Creating security detections from Windows, Linux and network telemetry with an investigation-focused approach.",
                  tags: ["Windows Events", "Sysmon", "Linux Logs", "Custom Rules", "MITRE ATT&CK"],
                },
                {
                  num: "03", symbol: "⚡", title: "SOC Automation",
                  desc: "Automating alert enrichment, notification, investigation and response workflows across security platforms.",
                  tags: ["n8n", "Shuffle", "TheHive", "Python", "VirusTotal", "Slack"],
                },
                {
                  num: "04", symbol: "⌕", title: "Threat Investigation",
                  desc: "Investigating alerts, analyzing indicators, correlating events and building timelines during security investigations.",
                  tags: ["Alert Triage", "IOC Analysis", "Hash Analysis", "IP Investigation", "Timeline Analysis"],
                },
                {
                  num: "05", symbol: "⬡", title: "Windows & Active Directory",
                  desc: "Understanding Windows security events, Active Directory attack paths and common credential-based attack techniques.",
                  tags: ["Active Directory", "Kerberos", "BloodHound", "Mimikatz", "Rubeus", "Impacket"],
                },
                {
                  num: "06", symbol: "◎", title: "Network Security",
                  desc: "Network reconnaissance, traffic analysis, firewall monitoring and attack-defense lab environments.",
                  tags: ["Nmap", "Wireshark", "pfSense", "SSH", "Network Monitoring"],
                },
              ].map((skill, i) => (
                <div
                  className="skill-card"
                  key={skill.title}
                  data-reveal
                  style={{ transitionDelay: `${(i % 3) * 70}ms` }}
                >
                  <div className="skill-top">
                    <span className="skill-number">{skill.num}</span>
                    <span className="skill-symbol" aria-hidden="true">{skill.symbol}</span>
                  </div>
                  <h3>{skill.title}</h3>
                  <p>{skill.desc}</p>
                  <div className="skill-tags">
                    {skill.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>


        {/* =========================
            PROJECTS
        ========================= */}

        <section className="projects" id="projects">

          <div className="section-heading" data-reveal>
            <span className="section-label">SECURITY PROJECTS</span>
            <h2 className="section-title">Selected work</h2>
            <p>
              Practical cybersecurity projects built around detection,
              investigation, automation, threat intelligence, and network defense.
            </p>
          </div>

          <div className="projects-grid">

            {[
              {
  video: `${import.meta.env.BASE_URL}videos/wazuh.mp4`,
  poster: `${import.meta.env.BASE_URL}thumbnails/wazuh.jpg`,
  tag: "SOC DEMO · 01",
  category: "SOC AUTOMATION",
  title: "Wazuh SOC Automation",
  desc: "End-to-end SOC automation lab detecting Mimikatz activity with Wazuh and Sysmon, enriching the alert with VirusTotal, creating an alert in TheHive, and notifying the analyst by email.",
  flow: ["Wazuh", "Sysmon", "Shuffle", "VirusTotal", "TheHive"],
  focus: ["Detection", "Threat Intel", "SOAR", "Case Management"],
  github: "https://github.com/Basithmohammedali/soc-automation-lab",
  medium: "https://medium.com/@basithmohammedali7/building-a-home-soc-lab-wazuh-sysmon-thehive-shuffle-virustotal-mimikatz-detection-to-53d97148a692",
},
{
  video: `${import.meta.env.BASE_URL}videos/ELK.mp4`,
  poster: `${import.meta.env.BASE_URL}thumbnails/elastic.jpg`,
  tag: "SOC DEMO · 02",
  category: "SIEM + SOAR",
  title: "Elastic SOC Automation",
  desc: "Automated security workflow using Elastic Security to detect SSH brute-force activity, forward alerts through Python and Shuffle, enrich the source IP with VirusTotal, and create an investigation-ready alert in TheHive.",
  flow: ["Elastic", "Python", "Shuffle", "VirusTotal", "TheHive"],
  focus: ["SIEM", "Detection", "Enrichment", "Automation"],
  github: "https://github.com/Basithmohammedali/ELK-SOAR-Automation-Lab",
  medium: "https://medium.com/@basithmohammedali7/building-an-automated-soc-lab-with-elastic-siem-shuffle-virustotal-and-thehive-6cbd8d8724ea",
},
{
  video: `${import.meta.env.BASE_URL}videos/splunk.mp4`,
  poster: `${import.meta.env.BASE_URL}thumbnails/splunk.jpg`,
  tag: "SOC DEMO · 03",
  category: "AI-ASSISTED SOC",
  title: "Splunk AI-Assisted SOC",
  desc: "A local AI-assisted SOC pipeline where Splunk detects failed Windows logins, n8n orchestrates the workflow, Ollama performs first-pass alert summarization, and Slack delivers the result to the analyst automatically.",
  flow: ["Splunk", "n8n", "Ollama", "Slack", "Windows"],
  focus: ["Event 4625", "AI Triage", "Automation", "Alerting"],
  github: "https://github.com/Basithmohammedali/Splunk-n8n-SOC-Automation",
  medium: "https://medium.com/@basithmohammedali7/building-a-home-soc-lab-with-splunk-n8n-ollama-and-slack-eaa4c0f2f138",
},
{
  video: `${import.meta.env.BASE_URL}videos/firewall_noaudio.mp4`,
  poster: `${import.meta.env.BASE_URL}thumbnails/pfsense.jpg`,
  tag: "LAB DEMO · 04",
  category: "NETWORK SECURITY",
  title: "pfSense Attack & Defense Lab",
  desc: "Network security lab using Kali Linux, pfSense, and Ubuntu to simulate reconnaissance and SSH brute-force activity, implement NAT and firewall controls, inspect logs, and block malicious traffic.",
  flow: ["Kali Linux", "pfSense", "Ubuntu", "Nmap", "Hydra"],
  focus: ["Firewall", "NAT", "Recon", "Attack Defense"],
  github: "https://github.com/Basithmohammedali/pfsense-firewall-attack-defense-lab",
  medium: "https://medium.com/@basithmohammedali7/building-a-pfsense-firewall-attack-simulation-lab-with-kali-linux-and-ubuntu-0f56c403c9ee",
},
            ].map((p, i) => (
              <article className="project-card" key={p.title} data-reveal style={{ transitionDelay: `${(i % 2) * 90}ms` }}>

                <div className="project-video">
                  <video src={p.video} poster={p.poster} controls preload="metadata" playsInline title={p.title} />
                  <div className="project-video-label">{p.tag}</div>
                </div>

                <div className="project-body">
                  <div className="project-top">
                    <span className="project-index">{String(i + 1).padStart(2, "0")}</span>
                    <span className="project-category">{p.category}</span>
                  </div>

                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>

                  <div className="project-flow">
                    {p.flow.map((f) => <span key={f}>{f}</span>)}
                  </div>

                  <div className="project-focus">
                    {p.focus.map((f) => <span key={f}>{f}</span>)}
                  </div>

                  <div className="project-actions">
                    <a href={p.github} target="_blank" rel="noreferrer" className="project-button secondary">GitHub ↗</a>
                    <a href={p.medium} target="_blank" rel="noreferrer" className="project-button secondary">Medium ↗</a>
                    <a href={p.video} target="_blank" rel="noreferrer" className="project-button primary">Watch Demo ↗</a>
                  </div>
                </div>

              </article>
            ))}

          </div>
        </section>


        {/* =========================
            EXPERIENCE
        ========================= */}

        <section id="experience" className="experience-section">
          <div className="experience-container">

            <div className="section-heading experience-heading" data-reveal>
              <p className="section-label">EXPERIENCE</p>
              <h2 className="section-title">Where I've worked</h2>
            </div>

            <div className="experience-layout">

              <div className="experience-timeline">
                <div className="timeline-line"></div>
                <div className="timeline-dot"></div>
              </div>

              <article className="experience-card" data-reveal>

                <div className="experience-header">
                  <div>
                    <p className="experience-type">VAPT INTERNSHIP</p>
                    <h3>Vulnerability Assessment & Penetration Testing Intern</h3>
                    <p className="experience-company">Hackware Security Solutions LLP</p>
                  </div>
                  <div className="experience-date">
                    <span>06/2025</span>
                    <span>—</span>
                    <span>07/2025</span>
                  </div>
                </div>

                <p className="experience-description">
                  Worked on hands-on security testing across web
                  applications, APIs, networks, Active Directory
                  environments and mobile applications, with a
                  focus on identifying vulnerabilities and
                  documenting security findings.
                </p>

                <div className="experience-areas">
                  <div className="experience-area">
                    <span>01</span>
                    <div>
                      <strong>Web Application Security</strong>
                      <p>Application security testing and vulnerability identification.</p>
                    </div>
                  </div>
                  <div className="experience-area">
                    <span>02</span>
                    <div>
                      <strong>API Security</strong>
                      <p>Testing API endpoints and identifying security weaknesses.</p>
                    </div>
                  </div>
                  <div className="experience-area">
                    <span>03</span>
                    <div>
                      <strong>Network Security</strong>
                      <p>Reconnaissance and security testing across network environments.</p>
                    </div>
                  </div>
                  <div className="experience-area">
                    <span>04</span>
                    <div>
                      <strong>Active Directory Security</strong>
                      <p>Security assessment of Windows and Active Directory environments.</p>
                    </div>
                  </div>
                  <div className="experience-area">
                    <span>05</span>
                    <div>
                      <strong>Mobile Application Security</strong>
                      <p>Hands-on testing of Android applications.</p>
                    </div>
                  </div>
                  <div className="experience-area">
                    <span>06</span>
                    <div>
                      <strong>Reporting & Evidence</strong>
                      <p>Documenting findings, evidence and remediation recommendations.</p>
                    </div>
                  </div>
                </div>

                <div className="experience-footer">
                  <span>SECURITY TOOLING</span>
                  <div className="experience-tags">
                    <span>Burp Suite</span>
                    <span>Nmap</span>
                    <span>Wireshark</span>
                    <span>Metasploit</span>
                    <span>BloodHound</span>
                    <span>Impacket</span>
                  </div>
                </div>

              </article>

            </div>
          </div>
        </section>


        {/* =========================
            REPORTS
        ========================= */}

        <section className="reports" id="reports">
          <div className="section-heading" data-reveal>
            <span className="section-label">REPORTS</span>
          
            <p>
              Selected security assessment reports documenting vulnerability
              identification, exploitation, evidence collection, and reporting.
            </p>
          </div>

          <div className="reports-grid">

            {[
              { type: "ACTIVE DIRECTORY", title: "Active Directory VAPT Report",
                desc: "Security assessment report focused on Active Directory environment testing and vulnerability assessment.",
                href: "/reports/Hackware_Active_Directory_VAPT_Report_v1.0.pdf" },
              { type: "WEB APPLICATION", title: "Tokyo Store VAPT Report",
                desc: "Web application security assessment documenting identified vulnerabilities and security testing results.",
                href: "/reports/Hackware_Internship_VAPT_Report_Tokyo_Store_v1.1.pdf" },
              { type: "SECURITY ASSESSMENT", title: "VulnShop Security Assessment",
                desc: "Security assessment report documenting application security testing and identified vulnerabilities.",
                href: "/reports/VulnShop_Security_Assessment_Report_v1.0.pdf" },
              { type: "WEB APPLICATION", title: "MS e-Gov Portal VAPT Report",
                desc: "Vulnerability assessment and penetration testing report documenting security findings and assessment results.",
                href: "/reports/Hackware_Internship_VAPT_Report_MS_e-Gov_Portal_v1.1.pdf" },
              { type: "SECURITY ASSESSMENT", title: "Offenso Bank Vulnerability Assessment",
                desc: "Vulnerability assessment report documenting security testing, findings, and assessment evidence.",
                href: "/reports/Offenso_Bank_Vulnerability_Assessment_Report_v1.0.pdf" },

              {
  type: "SECURITY INVESTIGATION",
  title: "MYDFIR Wazuh Security Investigation Report",
  desc: "Security investigation report documenting a Wazuh-based investigation, alert analysis, evidence review, and security findings.",
  href: "/reports/MYDFIR_Basith_Wazuh_Security_Investigation_Report.pdf"
},

            ].map((r, i) => (
              <article className="report-card" key={r.title} data-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <div className="report-number">{String(i + 1).padStart(2, "0")}</div>
                <div className="report-content">
                  <span className="report-type">{r.type}</span>
                  <h3>{r.title}</h3>
                  <p>{r.desc}</p>
                  <a href={r.href} target="_blank" rel="noreferrer">View Report ↗</a>
                </div>
              </article>
            ))}

          </div>
        </section>


        {/* =========================
            EDUCATION
        ========================= */}

        <section className="education" id="education">
          <div className="section-heading" data-reveal>
            <span className="section-label">EDUCATION & CERTIFICATIONS</span>
            <h2 className="section-title">Learning path</h2>
            <p>
              Academic background and professional security training supporting
              my journey in cybersecurity and SOC operations.
            </p>
          </div>

          <div className="education-list">

            <article className="education-card" data-reveal>
              <div className="education-year">2026<span>— PRESENT</span></div>
              <div className="education-content">
                <span className="education-type">DEGREE</span>
                <h3>Bachelor of Computer Applications</h3>
                <p className="education-institute">Yenepoya University</p>
                <p>Building a strong foundation in computer applications, programming, systems, and information technology.</p>
              </div>
            </article>

            <article className="education-card" data-reveal style={{ transitionDelay: "80ms" }}>
              <div className="education-year">2025<span>— 2026</span></div>
              <div className="education-content">
                <span className="education-type">ADVANCED DIPLOMA</span>
                <h3>Advanced Diploma in Information Security</h3>
                <p className="education-institute">Offenso Hackers Academy</p>
                <p>Practical security training covering penetration testing, vulnerability assessment, network security, and cybersecurity operations.</p>
              </div>
            </article>

            <article className="education-card" data-reveal style={{ transitionDelay: "160ms" }}>
              <div className="education-year">2026<span>— IN PROGRESS</span></div>
              <div className="education-content">
                <span className="education-type">CERTIFICATION</span>
                <h3>CompTIA Security+</h3>
                <p className="education-institute">Professional Cybersecurity Certification</p>
                <p>Currently preparing for the CompTIA Security+ certification to strengthen core cybersecurity knowledge.</p>
              </div>
            </article>

          </div>
        </section>


        {/* =========================
            CONTACT
        ========================= */}

        <section className="contact" id="contact">
          <div className="contact-glow"></div>

          <div className="contact-content" data-reveal>
            <span className="section-label">GET IN TOUCH</span>
            <h2>Let's build something<span> secure.</span></h2>
            <p>
              Interested in cybersecurity, SOC operations, detection engineering,
              or security projects? Feel free to connect with me.
            </p>

            <div className="contact-actions">
              <a href="mailto:basithmohammedali7@gmail.com" className="contact-primary">Email Me ↗</a>
              <a href="https://github.com/Basithmohammedali" target="_blank" rel="noreferrer" className="contact-secondary">GitHub ↗</a>
              <a href="https://medium.com/@basithmohammedali7" target="_blank" rel="noreferrer" className="contact-secondary">Medium ↗</a>
              <a href="https://www.linkedin.com/in/basith-mohammed-ali" target="_blank" rel="noreferrer" className="contact-secondary">LinkedIn ↗</a>
            </div>
          </div>
        </section>


        <footer className="site-footer">
          <div className="footer-inner">

            <div className="footer-brand">
              <a href="#home" className="footer-logo">BM<span>.</span></a>
              <p>SOC Analyst & Cybersecurity Professional focused on detection, investigation, and security automation.</p>
            </div>

            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#skills">Skills</a>
              <a href="#projects">Projects</a>
              <a href="#experience">Experience</a>
              <a href="#education">Education</a>
              <a href="#reports">Reports</a>
              <a href="#contact">Contact</a>
            </div>

            <div className="footer-socials">
              <a href="https://github.com/Basithmohammedali" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://www.linkedin.com/in/basith-mohammed-ali" target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href="https://medium.com/@basithmohammedali7" target="_blank" rel="noreferrer">Medium ↗</a>
              <a href="mailto:basithmohammedali7@gmail.com">Email ↗</a>
            </div>

          </div>

          <div className="footer-bottom">
            <span>© 2026 Basith Mohammed Ali</span>
            <span>Built with React · Focused on Security</span>
          </div>
        </footer>

      </main>

    </div>
  );
}

export default App;
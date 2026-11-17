export function initAiAgent() {
  const drawer = document.getElementById('ai-drawer');
  const openBtn = document.getElementById('open-ai-drawer');
  const closeBtn = document.getElementById('close-ai-drawer');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-user-input');
  const log = document.getElementById('ai-chat-log');
  const quickBtns = document.querySelectorAll('.ai-quick-btn');

  if (!drawer || !form || !input || !log) return;

  const toggleDrawer = (isOpen) => {
    if (isOpen) {
      drawer.classList.remove('translate-x-full');
      setTimeout(() => input.focus(), 150);
    } else {
      drawer.classList.add('translate-x-full');
    }
  };

  openBtn?.addEventListener('click', () => toggleDrawer(true));
  closeBtn?.addEventListener('click', () => toggleDrawer(false));

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.classList.contains('translate-x-full')) {
      toggleDrawer(false);
    }
  });

  quickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      input.value = btn.innerText.trim();
      form.dispatchEvent(new Event('submit'));
    });
  });

  const knowledgeCorpus = [
    {
      tokens: ['edr', 'cyber 2.0', 'scale', 'rollout', 'endpoints', '6000', 'deployment'],
      topic: 'ENTERPRISE_EDR_FLEET',
      response:
        "At Cyber 2.0 (Dec 2021 – Present), Vijjapurapu Sai Srikanth led architecture planning, pre-installation infrastructure assessments, and production rollouts across 10+ enterprise client organizations, securing 6,000+ hybrid servers and workstations (Windows, Linux, macOS)."
    },
    {
      tokens: ['zero-day', 'zero day', 'smb', 'whitelist', 'whitelisting', 'ransomware', 'lateral'],
      topic: 'ZERO_DAY_AND_SMB_HARDENING',
      response:
        "Srikanth engineers customized behavioral security policies and strict application whitelisting controls to lock down network shared folders (SMB), blocking unauthorized executable execution and neutralizing zero-day ransomware and lateral movement."
    },
    {
      tokens: ['siem', 'soar', 'splunk', 'log', 'syslog', 'port', 'ip', 'ticketing'],
      topic: 'SIEM_SOCKET_PIPELINES',
      response:
        "He integrates Cyber 2.0 EDR with client SIEM, SOAR, and ticketing platforms via direct IP/Port log-forwarding channels (Syslog/CEF) for real-time alert correlation. He is also certified in Splunk 7.x Fundamentals (Part 1)."
    },
    {
      tokens: ['malware', 'forensic', 'emotet', 'remcos', 'ida', 'wireshark', 'virustotal', 'hash', 'md5', 'autopsy'],
      topic: 'THREAT_HUNTING_AND_FORENSICS',
      response:
        "Srikanth executes proactive endpoint threat hunting by harvesting active process MD5 hashes and cross-referencing VirusTotal threat intelligence. His forensic toolkit includes IDA Pro, Sysinternals Procmon, Wireshark, FTK Toolkit, and Autopsy (certified by Basis Technology), with sandbox research on Emotet and Remcos malware families."
    },
    {
      tokens: ['education', 'degree', 'nfsu', 'gfsu', 'mtech', 'm.tech', 'btech', 'certification'],
      topic: 'ACADEMIC_AND_CERTIFICATIONS',
      response:
        "Srikanth holds an M.Tech in Cyber Security from National Forensic Sciences University (NFSU / Formerly GFSU, 2019–2021) with Cyber Range specialization, and a B.Tech in CSE from DIET. Certifications include Splunk 7.x Fundamentals (Part 1) and Autopsy Digital Forensics."
    },
    {
      tokens: ['contact', 'email', 'phone', 'hire', 'location', 'visakhapatnam', 'linkedin'],
      topic: 'DIRECT_CHANNELS',
      response:
        "Location: Visakhapatnam, India\nEmail: Srikanthsai001@gmail.com\nPhone: +91 9032677042\nLinkedIn: linkedin.com/in/sai-srikanth"
    }
  ];

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = input.value.trim();
    if (!query) return;

    appendMessage('RECRUITER', query, 'text-rose-400');
    input.value = '';

    const thinking = appendMessage('AEGIS COPILOT', 'Verifying deployment telemetry...', 'text-zinc-500 animate-pulse');

    setTimeout(() => {
      thinking.remove();
      const lower = query.toLowerCase();
      const match = knowledgeCorpus.find((item) =>
        item.tokens.some((t) => lower.includes(t))
      );

      const answer = match
        ? `[${match.topic}]\n${match.response}`
        : `[DOSSIER_SUMMARY]\nVijjapurapu Sai Srikanth brings 4.5+ years of Cybersecurity Professional Services experience securing 6,000+ hybrid endpoints across 10+ enterprise clients, backed by an M.Tech in Cyber Security from NFSU. Reach him at Srikanthsai001@gmail.com or +91 9032677042.`;

      appendMessage('AEGIS COPILOT', answer, 'text-amber-400');
    }, 380);
  });

  function appendMessage(sender, text, headerClass) {
    const div = document.createElement('div');
    div.className = 'p-3 rounded-lg bg-aegis-surfaceAlt border border-aegis-border leading-relaxed text-zinc-300 font-mono text-xs whitespace-pre-line';

    const title = document.createElement('span');
    title.className = `${headerClass} font-bold block mb-1`;
    title.textContent = `${sender}:`;

    const body = document.createElement('span');
    body.textContent = text;

    div.appendChild(title);
    div.appendChild(body);
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }
}
document.addEventListener('DOMContentLoaded', () => {
  // 1. Desktop Cursor Spotlight (Ignored automatically on touchscreens)
  const glow = document.getElementById('cursor-glow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      glow.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(37, 99, 235, 0.10), transparent 80%)`;
    });
  }

  // 2. One-Click Clipboard Copy + Toast Notification
  const toast = document.getElementById('copy-toast');
  const toastText = document.getElementById('copy-toast-text');
  let toastTimeout;

  document.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.dataset.copy;
      const label = btn.dataset.label || 'Copied!';
      if (!value) return;

      try {
        await navigator.clipboard.writeText(value);
        if (toast && toastText) {
          toastText.textContent = label;
          toast.classList.remove('translate-y-20', 'opacity-0');
          clearTimeout(toastTimeout);
          toastTimeout = setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
          }, 2400);
        }
      } catch {
        window.location.href = value.includes('@') ? `mailto:${value}` : `tel:${value}`;
      }
    });
  });

  // 3. Domain-Rich EDR Pipeline Stages + Sanitized Production Artifacts
  const pipelineStages = [
    {
      layer: 'LAYER 01 // HYBRID FLEET ARCHITECTURE',
      desc: 'Pre-installation infrastructure audits and zero-downtime production agent rollouts across 6,000+ Windows Server, Active Directory, Ubuntu/RHEL Linux, and macOS endpoints across 10+ enterprise organizations.',
      tech: 'Stack: Windows Server • Active Directory • Linux (RHEL/Ubuntu) • macOS',
      artifactLabel: 'FLEET READINESS & TELEMETRY HEARTBEAT (SANITIZED)',
      artifactCode: `{
  "deployment_scope": "10+ Enterprise Client Fleets",
  "managed_endpoints": 6240,
  "os_distribution": {
    "windows_server_workstation": "74%",
    "linux_rhel_ubuntu": "21%",
    "macos_enterprise": "5%"
  },
  "pre_install_audit": "PASSED (Kernel/AV Coexistence Verified)"
}`
    },
    {
      layer: 'LAYER 02 // ZERO-DAY & SMB CONTAINMENT',
      desc: 'Engineered strict Cyber 2.0 Application Whitelisting policies and behavioral write-locks across network shared folders (SMB), blocking unauthorized binaries and neutralizing zero-day ransomware lateral movement.',
      tech: 'Stack: Cyber 2.0 Whitelisting • SMB Write-Lock • Zero-Day Prevention',
      artifactLabel: 'BLOCKED ZERO-DAY SMB EXECUTION EVENT (SANITIZED)',
      artifactCode: `[POLICY_ENFORCEMENT] Action=BLOCKED_ZERO_DAY
Vector: SMBv3 Lateral Binary Execution (\\\\FIN-SRV02\\SharedDocs\\invoice_upd.exe)
Rule: Cyber2.0_Strict_App_Whitelist + SMB_Share_Lockdown
Outcome: Process terminated prior to disk encryption; host isolated.`
    },
    {
      layer: 'LAYER 03 // SIEM & SOAR SOCKET PIPELINE',
      desc: 'Configured direct IP/Port log-forwarding channels (Syslog/CEF) connecting Cyber 2.0 EDR into client Splunk SIEM, SOAR, and ticketing queues for sub-second alert correlation and automated triage.',
      tech: 'Stack: IP/Port Socket Routing • Syslog/CEF • Splunk SIEM • SOAR',
      artifactLabel: 'DIRECT IP:PORT SYSLOG/CEF SOCKET PAYLOAD (SANITIZED)',
      artifactCode: `CEF:0|Cyber2.0|EDR_Engine|4.8|104|Unauthorized_SMB_Binary_Blocked|9|
src=10.24.18.42 dst=10.24.10.15 dpt=445 proto=TCP
cs1Label=ForwardingChannel cs1=Direct_IP_Port_Socket_514
cs2Label=SIEM_Target cs2=Splunk_Enterprise_SOC_Queue`
    },
    {
      layer: 'LAYER 04 // MD5 THREAT HUNT & FORENSIC RCA',
      desc: 'Proactive fleet-wide MD5 cryptographic hash harvesting cross-referenced with VirusTotal intelligence, paired with IDA Pro, Sysinternals Procmon, and Wireshark sandbox analysis for L2/L3 RCA reports.',
      tech: 'Stack: VirusTotal MD5 • IDA Pro • Sysinternals Procmon • Wireshark • Autopsy',
      artifactLabel: 'L3 EXECUTIVE RCA & VIRUSTOTAL MD5 TRIAGE (SANITIZED)',
      artifactCode: `INCIDENT_RCA_SUMMARY // TICKET #EDR-4092
1. Harvested MD5: 44d88612fea8a8f36de82e1278abb02f (Matched 58/72 VT Engines)
2. Sandbox Findings (Procmon + IDA Pro): Attempted HKCU\\Run persistence & C2 beacon
3. Containment: Fleet-wide MD5 hash blocklist pushed + SOC analyst playbook updated`
    }
  ];

  const nodes = Array.from(document.querySelectorAll('.pipeline-node'));
  const layerEl = document.getElementById('node-layer');
  const descEl = document.getElementById('node-desc');
  const techEl = document.getElementById('node-tech');
  const artifactLabelEl = document.getElementById('artifact-label');
  const artifactCodeEl = document.getElementById('artifact-code');
  const simBtn = document.getElementById('simulate-attack-btn');

  // Inspector View Switcher (Overview vs Sanitized Artifact)
  const tabOverview = document.getElementById('tab-overview');
  const tabArtifact = document.getElementById('tab-artifact');
  const viewOverview = document.getElementById('view-overview');
  const viewArtifact = document.getElementById('view-artifact');

  function setInspectorTab(mode) {
    if (mode === 'artifact') {
      tabArtifact?.classList.replace('bg-slate-800', 'bg-blue-600');
      tabArtifact?.classList.replace('text-slate-300', 'text-white');
      tabOverview?.classList.replace('bg-blue-600', 'bg-slate-800');
      tabOverview?.classList.replace('text-white', 'text-slate-300');
      viewOverview?.classList.add('hidden');
      viewArtifact?.classList.remove('hidden');
    } else {
      tabOverview?.classList.replace('bg-slate-800', 'bg-blue-600');
      tabOverview?.classList.replace('text-slate-300', 'text-white');
      tabArtifact?.classList.replace('bg-blue-600', 'bg-slate-800');
      tabArtifact?.classList.replace('text-white', 'text-slate-300');
      viewArtifact?.classList.add('hidden');
      viewOverview?.classList.remove('hidden');
    }
  }

  tabOverview?.addEventListener('click', () => setInspectorTab('overview'));
  tabArtifact?.addEventListener('click', () => setInspectorTab('artifact'));

  function activateStage(index) {
    const data = pipelineStages[index];
    if (!data) return;

    nodes.forEach((n, i) => {
      if (i === index) {
        n.className = 'pipeline-node min-h-[58px] text-left p-3.5 rounded-xl bg-blue-600/15 border-2 border-blue-500 transition flex flex-col justify-between';
      } else {
        n.className = 'pipeline-node min-h-[58px] text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/70 border border-slate-800 transition flex flex-col justify-between';
      }
    });

    if (layerEl) layerEl.textContent = data.layer;
    if (descEl) descEl.textContent = data.desc;
    if (techEl) techEl.textContent = data.tech;
    if (artifactLabelEl) artifactLabelEl.textContent = data.artifactLabel;
    if (artifactCodeEl) artifactCodeEl.textContent = data.artifactCode;
  }

  // Initialize Stage 0
  activateStage(0);

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      const idx = parseInt(node.dataset.index, 10);
      activateStage(idx);
    });
  });

  // Automated 4-Stage Threat Containment Trace (Switches automatically to Sanitized Artifact view!)
  let isSimulating = false;
  simBtn?.addEventListener('click', () => {
    if (isSimulating) return;
    isSimulating = true;
    simBtn.textContent = '⚡ Tracing Packet...';
    setInspectorTab('artifact');

    pipelineStages.forEach((_, idx) => {
      setTimeout(() => {
        activateStage(idx);
        if (idx === pipelineStages.length - 1) {
          setTimeout(() => {
            simBtn.textContent = '✓ Threat Contained (Replay)';
            isSimulating = false;
          }, 1100);
        }
      }, idx * 1100);
    });
  });

  // 4. Interactive Technical Arsenal Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.filter;
      filterBtns.forEach((b) => {
        b.className = 'filter-btn min-h-[36px] px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-blue-500 transition';
      });
      btn.className = 'filter-btn min-h-[36px] px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold transition';

      skillCards.forEach((card) => {
        if (target === 'all' || card.dataset.category === target) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Smooth Scroll-Reveal Observer
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal-block').forEach((el) => revealObserver.observe(el));

  // 6. Animated Metric Counters on Load
  document.querySelectorAll('.count-up').forEach((el) => {
    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 35));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = current.toLocaleString();
      }
    }, 25);
  });
});
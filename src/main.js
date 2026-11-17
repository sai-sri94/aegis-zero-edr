document.addEventListener('DOMContentLoaded', () => {
  // 1. Subtle Executive Cursor Spotlight
  const glow = document.getElementById('cursor-glow');
  window.addEventListener('mousemove', (e) => {
    if (!glow) return;
    glow.style.background = `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(37, 99, 235, 0.10), transparent 80%)`;
  });

  // 2. Interactive EDR Defense Pipeline Inspector
  const nodes = document.querySelectorAll('.pipeline-node');
  const layerEl = document.getElementById('node-layer');
  const descEl = document.getElementById('node-desc');
  const techEl = document.getElementById('node-tech');

  nodes.forEach((node) => {
    node.addEventListener('click', () => {
      nodes.forEach((n) => {
        n.className = 'pipeline-node w-full text-left p-3.5 rounded-xl bg-slate-950 hover:bg-slate-800/70 border border-slate-800 transition flex items-center justify-between';
      });
      node.className = 'pipeline-node w-full text-left p-3.5 rounded-xl bg-blue-600/15 border-2 border-blue-500 transition flex items-center justify-between';

      if (layerEl) layerEl.textContent = node.dataset.layer;
      if (descEl) descEl.textContent = node.dataset.desc;
      if (techEl) techEl.textContent = `Stack: ${node.dataset.tech}`;
    });
  });
});
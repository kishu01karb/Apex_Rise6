// Prevent flip when clicking links
const card = document.getElementById("card");
card.addEventListener("click", (e) => {
  if (e.target.closest("a")) return;
  card.classList.toggle("is-flipped");
});

/* Molecular background */
const canvas = document.getElementById("moleculeCanvas");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
window.addEventListener("resize", resize);
resize();

const nodes = Array.from({ length: 26 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.25,
  vy: (Math.random() - 0.5) * 0.25,
  r: Math.random() * 2 + 1
}));

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  nodes.forEach((n, i) => {
    n.x += n.vx;
    n.y += n.vy;

    if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
    if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    ctx.fillStyle = "rgba(234,217,182,0.25)";
    ctx.beginPath();
    ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
    ctx.fill();

    for (let j = i + 1; j < nodes.length; j++) {
      const m = nodes[j];
      const d = Math.hypot(n.x - m.x, n.y - m.y);
      if (d < 120) {
        ctx.strokeStyle = "rgba(234,217,182,0.08)";
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }
    }
  });

  requestAnimationFrame(animate);
}
animate();

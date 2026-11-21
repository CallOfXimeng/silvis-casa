const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const CosmosEngine = (function () {
  const canvas = document.getElementById('cosmos-canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  let width, height, dpr;
  let physMode = 'lens'; // 'lens' | 'well' | 'stars'
  let isWarping = false;
  let warpProgress = 0; // 0 -> 1 曲速跃迁速度系数
  let warpCenter = { x: 0, y: 0 };

  const spacing = 42;
  const mass = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, active: false };
  const ripples = [];

  // 恒星光谱颜色表（O/B蓝白, A纯白, G暖黄, K/M橙红）
  const STAR_SPECTRA = [
    { r: 186, g: 214, b: 255 }, // 蓝白恒星
    { r: 248, g: 250, b: 252 }, // 纯白恒星
    { r: 253, g: 230, b: 138 }, // 太阳型暖黄恒星
    { r: 251, g: 191, b: 36 }   // 橙红恒星
  ];

  // 预生成 220 颗三维深空星点 (x, y 为屏幕偏移坐标, z 为深度 0.1~1.0)
  const STAR_COUNT = 220;
  const stars = [];

  function initStars() {
    stars.length = 0;
    for (let i = 0; i < STAR_COUNT; i++) {
      const spec = STAR_SPECTRA[Math.floor(Math.random() * STAR_SPECTRA.length)];
      stars.push({
        // 归一化三维坐标 (-0.5 ~ 0.5)
        nx: Math.random() - 0.5,
        ny: Math.random() - 0.5,
        z: Math.random() * 0.9 + 0.1,
        prevSx: null,
        prevSy: null,
        size: Math.random() * 1.6 + 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.025,
        color: spec
      });
    }
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    warpCenter = { x: width / 2, y: height / 2 };
  }

  window.addEventListener('resize', resize);
  resize();
  initStars();

  // 鼠标交互
  window.addEventListener('mousemove', (e) => {
    mass.targetX = e.clientX;
    mass.targetY = e.clientY;
    mass.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => { mass.active = false; });

  window.addEventListener('mousedown', (e) => {
    if (isWarping) return;
    ripples.push({
      x: e.clientX,
      y: e.clientY,
      radius: 8,
      maxRadius: Math.max(width, height) * 0.65,
      amplitude: 15
    });
  }, { passive: true });

  // 切换背景物理模式
  document.querySelectorAll('[data-phys]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-phys]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      physMode = btn.dataset.phys;
    });
  });

  // 计算网格弯曲
  function transformGridPoint(x0, y0) {
    let dx = 0, dy = 0, intensity = 0;

    if (mass.x > -500) {
      const rx = mass.x - x0;
      const ry = mass.y - y0;
      const r2 = rx * rx + ry * ry;
      const r = Math.sqrt(r2) || 1;

      if (physMode === 'well') {
        const pull = Math.min(4200 / (r2 + 4500), 0.44);
        dx += rx * pull;
        dy += ry * pull + pull * 34;
        intensity += pull * 2.1;
      } else if (physMode === 'lens') {
        const einsteinR = 90;
        const deflection = (einsteinR * einsteinR) / (r2 + 1600);
        const clamped = Math.min(deflection, 0.85);
        dx -= rx * clamped * 0.65;
        dy -= ry * clamped * 0.65;
        intensity += Math.exp(-Math.pow((r - einsteinR) / 36, 2)) * 0.95;
      }
    }

    for (let i = 0; i < ripples.length; i++) {
      const rp = ripples[i];
      const rx = x0 - rp.x;
      const ry = y0 - rp.y;
      const dist = Math.sqrt(rx * rx + ry * ry) || 1;
      const band = Math.abs(dist - rp.radius);
      if (band < 68) {
        const decay = 1 - rp.radius / rp.maxRadius;
        const wave = Math.cos((band / 68) * (Math.PI / 2)) * rp.amplitude * decay;
        dx += (rx / dist) * wave;
        dy += (ry / dist) * wave;
        intensity += Math.abs(wave) * 0.045;
      }
    }

    return { x: x0 + dx, y: y0 + dy, intensity };
  }

  // 主渲染循环
  function render() {
    if (!reducedMotion.matches) requestAnimationFrame(render);
    if (document.hidden) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // 曲速跃迁时使用半透明拖尾清空画布，增强光轨残影感；平时完全清空
    if (isWarping) {
      warpProgress = Math.min(warpProgress + 0.032, 1);
      ctx.fillStyle = isDark ? 'rgba(5, 8, 17, 0.28)' : 'rgba(246, 247, 249, 0.28)';
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    // 平滑更新鼠标位置
    if (mass.active) {
      mass.x += (mass.targetX - mass.x) * 0.14;
      mass.y += (mass.targetY - mass.y) * 0.14;
    } else {
      mass.x += (-1000 - mass.x) * 0.05;
      mass.y += (-1000 - mass.y) * 0.05;
    }

    // 更新涟漪
    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].radius += 7.5;
      if (ripples[i].radius > ripples[i].maxRadius) ripples.splice(i, 1);
    }

    // 1. 绘制时空度规网格（仅在 lens 或 well 模式下，且未进入全速跃迁时）
    if ((physMode === 'lens' || physMode === 'well') && warpProgress < 0.4) {
      const gridAlphaScale = 1 - warpProgress * 2.5;
      const baseRGB = isDark ? '148, 163, 184' : '30, 41, 59';
      const glowRGB = isDark ? '96, 165, 250' : '37, 99, 235';

      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      const grid = [];

      for (let r = 0; r < rows; r++) {
        const rowArr = [];
        const y0 = (r - 1) * spacing;
        for (let c = 0; c < cols; c++) {
          const x0 = (c - 1) * spacing;
          rowArr.push(transformGridPoint(x0, y0));
        }
        grid.push(rowArr);
      }

      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = grid[r][c], p2 = grid[r][c + 1];
          const lvl = Math.min((p1.intensity + p2.intensity) * 0.5, 1);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lvl > 0.04
            ? `rgba(${glowRGB}, ${(0.06 + lvl * 0.36) * gridAlphaScale})`
            : `rgba(${baseRGB}, ${(isDark ? 0.065 : 0.055) * gridAlphaScale})`;
          ctx.stroke();
        }
      }
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 1; r++) {
          const p1 = grid[r][c], p2 = grid[r + 1][c];
          const lvl = Math.min((p1.intensity + p2.intensity) * 0.5, 1);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = lvl > 0.04
            ? `rgba(${glowRGB}, ${(0.06 + lvl * 0.36) * gridAlphaScale})`
            : `rgba(${baseRGB}, ${(isDark ? 0.065 : 0.055) * gridAlphaScale})`;
          ctx.stroke();
        }
      }
    }

    // 2. 绘制深空星点、引力透镜爱因斯坦弧 & 超光速星轨拉丝
    const cx = isWarping ? warpCenter.x : width * 0.5;
    const cy = isWarping ? warpCenter.y : height * 0.5;
    // 平时极慢漂移 (0.00025)，跃迁时指数级加速到 0.065
    const speedZ = isWarping ? (0.003 + Math.pow(warpProgress, 2.2) * 0.085) : 0.00022;

    for (let i = 0; i < stars.length; i++) {
      const s = stars[i];
      s.z -= speedZ;
      s.twinklePhase += s.twinkleSpeed;

      // 恒星飞出屏幕后在远景深处重生
      if (s.z <= 0.02) {
        s.nx = Math.random() - 0.5;
        s.ny = Math.random() - 0.5;
        s.z = 1.0;
        s.prevSx = null;
        s.prevSy = null;
      }

      // 透视投影：将三维坐标映射到二维屏幕
      const fov = Math.max(width, height) * 0.85;
      let sx = cx + (s.nx / s.z) * fov;
      let sy = cy + (s.ny / s.z) * fov;

      // 平时加入微弱的鼠标视差偏移
      if (!isWarping && mass.active && mass.x > -200) {
        sx += (mass.x - width * 0.5) * 0.025 * (1 - s.z);
        sy += (mass.y - height * 0.5) * 0.025 * (1 - s.z);
      }

      const alphaBase = isDark ? (0.35 + (1 - s.z) * 0.65) : (0.25 + (1 - s.z) * 0.45);
      const twinkle = 0.78 + 0.22 * Math.sin(s.twinklePhase);
      const alpha = Math.min(alphaBase * twinkle, 1);
      const rgb = isDark ? `${s.color.r}, ${s.color.g}, ${s.color.b}` : `37, 99, 235`;

      if (isWarping && s.prevSx !== null) {
        // 【科幻超光速星轨模式】：连接上一帧与当前帧位置，拉成放射状光束
        const grad = ctx.createLinearGradient(s.prevSx, s.prevSy, sx, sy);
        grad.addColorStop(0, `rgba(${rgb}, 0)`);
        grad.addColorStop(1, `rgba(${rgb}, ${Math.min(alpha + warpProgress * 0.4, 1)})`);

        ctx.beginPath();
        ctx.moveTo(s.prevSx, s.prevSy);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size * (1.1 - s.z * 0.6) * (1 + warpProgress * 1.4);
        ctx.lineCap = 'round';
        ctx.stroke();
      } else if (!isWarping && physMode === 'lens' && mass.active && mass.x > -200) {
        // 【引力透镜星弧模式】：靠近鼠标势阱的星点被切向拉成爱因斯坦弧
        const dx = sx - mass.x;
        const dy = sy - mass.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const einsteinR = 90;

        if (dist < 175) {
          // 透镜偏折向外推开
          const push = (einsteinR * einsteinR) / (dist * dist + 1400);
          const lensedX = sx + dx * Math.min(push, 0.75);
          const lensedY = sy + dy * Math.min(push, 0.75);

          // 越靠近爱因斯坦半径，星点切向拉伸越明显
          const arcStrength = Math.exp(-Math.pow((dist - einsteinR) / 38, 2));
          if (arcStrength > 0.15) {
            const angle = Math.atan2(lensedY - mass.y, lensedX - mass.x);
            const arcSpan = arcStrength * 0.42; // 弧度张角
            const lensedDist = Math.sqrt(Math.pow(lensedX - mass.x, 2) + Math.pow(lensedY - mass.y, 2));

            ctx.beginPath();
            ctx.arc(mass.x, mass.y, lensedDist, angle - arcSpan, angle + arcSpan);
            ctx.strokeStyle = `rgba(${rgb}, ${Math.min(alpha + arcStrength * 0.4, 1)})`;
            ctx.lineWidth = s.size * 1.4;
            ctx.lineCap = 'round';
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.arc(lensedX, lensedY, s.size * (1.15 - s.z * 0.5), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
            ctx.fill();
          }
        } else {
          ctx.beginPath();
          ctx.arc(sx, sy, s.size * (1.15 - s.z * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
          ctx.fill();
        }
      } else {
        // 【常规深空星点模式】
        ctx.beginPath();
        ctx.arc(sx, sy, s.size * (1.15 - s.z * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${alpha})`;
        ctx.fill();
      }

      // 记录上一帧坐标供下一帧拉丝使用（跃迁初期保留微小拖尾起点）
      if (isWarping) {
        if (s.prevSx === null) {
          s.prevSx = sx;
          s.prevSy = sy;
        } else {
          // 让星轨尾部以略慢的速度追赶头部，形成越来越长的光丝
          s.prevSx += (sx - s.prevSx) * 0.35;
          s.prevSy += (sy - s.prevSy) * 0.35;
        }
      } else {
        s.prevSx = sx;
        s.prevSy = sy;
      }
    }
  }

  render();

  // 对外暴露触发超光速跃迁的接口
  return {
    startWarp(originX, originY, onComplete) {
      if (isWarping) return;
      warpCenter = { x: originX || width / 2, y: originY || height / 2 };
      warpProgress = 0.05;
      isWarping = true;
      document.body.classList.add('warping');

      // 560ms 后完成跃迁
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 560);
    },
    stopWarp() {
      isWarping = false;
      warpProgress = 0;
      stars.forEach(s => { s.prevSx = null; s.prevSy = null; });
      document.body.classList.remove('warping');
    }
  };
})();

/* =========================================================================
   2. 绑定文章点击 -> 触发超光速跃迁动画
   ========================================================================= */
document.querySelectorAll('.warp-link').forEach(link => {
  link.addEventListener('click', event => {
    if (!CosmosEngine || reducedMotion.matches || event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey) return;
    event.preventDefault();
    CosmosEngine.startWarp(event.clientX, event.clientY, () => location.assign(link.href));
  });
});
addEventListener('pageshow', () => CosmosEngine?.stopWarp());
const themeRoot = document.documentElement;
try {
  if (localStorage.getItem('cosmos-theme') === 'light') themeRoot.dataset.theme = 'light';
} catch {}
document.getElementById('themeToggle').addEventListener('click', () => {
  themeRoot.dataset.theme = themeRoot.dataset.theme === 'light' ? 'dark' : 'light';
  try { localStorage.setItem('cosmos-theme', themeRoot.dataset.theme); } catch {}
  document.dispatchEvent(new Event('cosmos-theme-change'));
});

const titleGlyphs = [];
document.querySelectorAll('[data-jumping-title]').forEach(title => {
  const textNodes = [];
  const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
const fragment = document.createDocumentFragment();
// Keep Latin words together so they can still wrap at their normal boundaries.
for (const part of node.data.match(/\s+|(?:[A-Za-z0-9]+|[^\s])[，。！？；：、）】》」』,.!?;:)]*/gu) || []) {
  if (!part.trim()) {
    fragment.append(part);
  } else {
    const glyph = document.createElement('span');
    glyph.className = 'title-glyph';
    glyph.textContent = part;
    titleGlyphs.push(glyph);
    fragment.append(glyph);
  }
}
node.replaceWith(fragment);
  });
});
if (titleGlyphs.length) {
  function jumpTitle() {
if (!reducedMotion.matches && !document.hidden && !document.body.classList.contains('warping')) {
  const glyph = titleGlyphs[Math.floor(Math.random() * titleGlyphs.length)];
  glyph.animate([
    { transform: 'translateY(0)' },
    { transform: 'translateY(-0.28em)', offset: 0.42 },
    { transform: 'translateY(0)' }
  ], { duration: 460, easing: 'ease-in-out' });
}
setTimeout(jumpTitle, 1100 + Math.random() * 1600);
  }
  setTimeout(jumpTitle, 1000);
}

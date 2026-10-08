import { lessons, tracks, productionSteps } from './data.js';
import { art, arrow, icon } from './art.js';

const main = document.querySelector('#main');
const namespace = 'boyi-liuan-prototype-v1';
let selected = readStorage('selected', []).filter(id => lessons.some(l => l.id === id));
let player = null;
let frame = null;
let quizAnswers = {};
let toastTimer;
const searchDialog = document.querySelector('#search-dialog');
const globalSearch = document.querySelector('#global-search');
const escape = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const lessonUrl = id => `${location.href.split('#')[0]}#lesson/${encodeURIComponent(id)}`;
const lessonById = id => lessons.find(l => l.id === id);

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(`${namespace}:${key}`));
    if (Array.isArray(fallback)) return Array.isArray(value) ? value.filter(x => typeof x === 'string') : fallback;
    return typeof value === typeof fallback ? value : fallback;
  } catch { return fallback; }
}

function saveStorage(key, value) {
  try { localStorage.setItem(`${namespace}:${key}`, JSON.stringify(value)); return true; }
  catch { toast('当前浏览器无法保存，关闭页面后选择可能丢失。'); return false; }
}

function toast(text) {
  const el = document.querySelector('#toast');
  clearTimeout(toastTimer);
  el.textContent = text;
  el.classList.add('visible');
  toastTimer = setTimeout(() => el.classList.remove('visible'), 3300);
}

function updateBag() {
  const badge = document.querySelector('#bag-count');
  badge.textContent = selected.length;
  badge.hidden = !selected.length;
}

function markButton(l) {
  const exists = selected.includes(l.id);
  return `<button type="button" class="button ${exists ? 'selected-button' : 'button-outline'}" data-action="select" data-id="${l.id}" aria-pressed="${exists}">${icon(exists ? 'check' : 'bookmark')}<span>${exists ? '已加入课包' : '加入我的课包'}</span></button>`;
}

function card(l, index = 0) {
  return `<article class="content-card ${l.track}" style="--order:${index}"><a href="#lesson/${l.id}" class="card-cover" aria-label="打开${escape(l.shortTitle)}">${art(l.icon)}<span class="cover-index">${String(index + 1).padStart(2, '0')}</span><span class="cover-arrow">${arrow()}</span></a><div class="card-copy"><div class="card-meta"><span>${escape(l.topic)}</span><span>${escape(l.readTime)}</span></div><h3><a href="#lesson/${l.id}">${escape(l.title).replace(/\n/g, '<br>')}</a></h3><p>${escape(l.description)}</p><div class="card-bottom"><span class="draft-label">示范${l.track === 'health' ? '微课' : '故事'}</span><button type="button" class="icon-button card-save ${selected.includes(l.id) ? 'is-selected' : ''}" data-action="select" data-id="${l.id}" aria-label="${selected.includes(l.id) ? '移出' : '加入'}课包 ${escape(l.shortTitle)}" aria-pressed="${selected.includes(l.id)}">${icon(selected.includes(l.id) ? 'check' : 'bookmark')}</button></div></div></article>`;
}

function home() {
  return `<section class="hero container"><div class="hero-copy reveal"><p class="eyebrow"><span></span>BOYI · YOUTH · LU’AN</p><h1>把医学讲清楚，<br>把医者的故事<br><em>讲给青春听。</em></h1><p class="hero-lead">一个生活里的问题，一段走近医者的旅程。<br>在这里，读懂健康，也读懂责任。</p><div class="hero-actions"><a class="button button-dark" href="#health">探索云上白大褂 ${arrow()}</a><a class="text-link" href="#stories">走进大师故事 ${arrow()}</a></div><div class="hero-footnote"><span class="tiny-cross">+</span>面向青少年 · 微课与故事 · 可带进课堂</div></div><div class="hero-art reveal" style="--order:1"><div class="art-grid"></div><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-note note-health"><span>01 / 云上白大褂</span><strong>每个问题，<br>都值得认真回答。</strong></div><div class="hero-diagram">${art('microbe')}</div><div class="hero-mini-book">${art('book')}<span>科学 · 人文</span></div><div class="hero-caption"><span class="capsule"></span><span>HEALTH & HUMANITIES</span><span>↗</span></div></div></section>
  <section class="track-section container"><div class="section-heading"><div><p class="eyebrow">TWO WAYS TO EXPLORE</p><h2>两条线，同一个起点。</h2></div><p>让专业知识易于理解，<br>让精神价值有具体的故事。</p></div><div class="track-panels"><a href="#health" class="track-panel health"><div class="track-panel-top"><span>01</span><span class="pill">健康科普</span></div><h3>云上白大褂</h3><p>从感冒用药到医学影像，<br>把身边的问题变成看得懂的微课堂。</p><div class="track-panel-bottom"><span>进入健康科普</span>${arrow()}</div><div class="panel-art">${art('scanner')}</div></a><a href="#stories" class="track-panel stories"><div class="track-panel-top"><span>02</span><span class="pill">网络思政 · 医学人文</span></div><h3>医学大师故事</h3><p>从一个人物、一段经历出发，<br>认识医者的求真、关怀与担当。</p><div class="track-panel-bottom"><span>走进人物故事</span>${arrow()}</div><div class="panel-art">${art('archive')}</div></a></div></section>
  <section class="featured-section container"><div class="section-heading"><div><p class="eyebrow">START WITH CURIOSITY</p><h2>从好奇开始。</h2></div><a href="#teacher" class="text-link">为课堂选一份内容 ${arrow()}</a></div><div class="content-grid home-grid">${lessons.map(card).join('')}</div></section>
  <section class="teacher-invite container"><span class="invite-icon">✳</span><div><p class="eyebrow">FOR THE CLASSROOM</p><h2>一份内容，可以打开一次讨论。</h2><p>挑选微课和故事，组合成你自己的课堂材料。</p></div><a href="#teacher" class="button button-dark">打开教师选材 ${arrow()}</a></section>
  <section class="process-section container"><div><p class="eyebrow">HOW GOOD CONTENT GROWS</p><h2>好内容，认真打磨。</h2><p>拟以“摇篮计划”科普物料和《医源传奇》等史料为基础。<br>当前为公开资料示范稿，正式材料接入与审核待确认。</p></div><ol class="production-steps">${productionSteps.map((s, i) => `<li><span>0${i + 1}</span>${s}</li>`).join('')}</ol></section>`;
}

function catalog(track) {
  const t = tracks[track];
  const topics = [...new Set(lessons.filter(l => l.track === track).map(l => l.topic))];
  return `<section class="catalog-header container ${track}"><a class="breadcrumb" href="#home">首页 / ${t.name}</a><p class="eyebrow">${t.eyebrow}</p><h1>${t.name}<span>${track === 'health' ? '让健康知识，走近日常。' : '让医学精神，走进故事。'}</span></h1><p>${t.intro}</p><div class="catalog-decoration">${art(track === 'health' ? 'cross' : 'book')}</div></section><section class="catalog-content container"><div class="catalog-toolbar"><div class="filter-buttons" aria-label="按主题筛选"><button class="filter active" data-action="filter" data-topic="all" aria-pressed="true">全部内容</button>${topics.map(t => `<button class="filter" data-action="filter" data-topic="${escape(t)}" aria-pressed="false">${escape(t)}</button>`).join('')}</div><label class="catalog-search">${icon('search')}<input type="search" id="catalog-query" placeholder="搜索${track === 'health' ? '健康主题' : '人物与故事'}" aria-label="搜索本栏目"></label></div><div id="catalog-grid" class="content-grid two-column">${lessons.filter(l => l.track === track).map(card).join('')}</div><p class="content-note">${track === 'health' ? '正式内容拟承接“摇篮计划”科普物料；当前示范稿根据公开医学资料整理，待专业审核。' : '正式故事拟结合《医源传奇》及医学史、校史资料；当前示范稿来源于公开纪念资料，待史料与教学审核。'}</p></section>`;
}

function playerMarkup(l) {
  const first = l.scenes[0];
  return `<div class="player ${l.track}" id="micro-player"><div class="player-header"><span>${l.track === 'health' ? '动态微课堂' : '人物故事导览'}</span><span>01 / 04</span></div><div class="scene" id="scene"><div class="scene-copy"><p class="scene-kicker">${escape(first.kicker)}</p><h3>${escape(first.title).replace(/\n/g, '<br>')}</h3><p>${escape(first.text)}</p><div class="scene-labels">${first.labels.map(x => `<span>${escape(x)}</span>`).join('')}</div></div><div class="scene-art">${art(first.visual)}</div></div><div class="player-controls"><button class="play-button" data-action="play" aria-label="播放动态微课" type="button">${icon('play')}</button><span id="player-time">00:00 / 01:00</span><input type="range" id="player-seek" min="0" max="60" value="0" step=".1" aria-label="微课播放进度"><button class="restart-button" data-action="restart" type="button">重播</button></div><p class="player-note">60 秒网页动效演示 · 无配音</p></div>`;
}

function articleMarkup(l) {
  return `<section id="article" class="article-section"><p class="eyebrow">${l.track === 'health' ? 'READ & UNDERSTAND' : 'A STORY TO REMEMBER'}</p><h2>${l.track === 'health' ? '再多懂一点。' : '把故事读近一点。'}</h2>${l.article.map(p => `<div class="article-block"><h3>${escape(p.heading)}</h3><p>${escape(p.text)}</p></div>`).join('')}<p class="takeaway">${escape(l.takeaway)}</p></section>`;
}

function quizMarkup(l) {
  return `<section id="quiz" class="quiz-section"><div class="section-heading"><div><p class="eyebrow">THINK IT THROUGH</p><h2>换你来判断。</h2></div><span class="small-note">${l.quiz.length} 道情境题 · 答后查看解释</span></div><form id="quiz-form" novalidate>${l.quiz.map((q, i) => `<fieldset><legend><span>0${i + 1}</span>${escape(q.question)}</legend>${q.options.map((a, j) => `<label class="answer-option"><input type="radio" name="q${i}" value="${j}"><span class="answer-letter">${String.fromCharCode(65 + j)}</span><span>${escape(a)}</span></label>`).join('')}<div class="question-explanation" data-explanation="${i}" hidden></div></fieldset>`).join('')}<p id="quiz-error" class="form-error" role="alert" hidden></p><div class="quiz-actions"><button type="submit" class="button button-dark">查看我的理解 ${arrow()}</button><button type="button" class="text-link" data-action="retry" hidden>重新作答 ↻</button></div><div id="quiz-result" class="quiz-result" role="status" hidden></div></form></section>`;
}

function questionMarkup(l) {
  return `<section id="questions" class="questions-section"><p class="eyebrow">KEEP ASKING</p><h2>好奇，可以继续。</h2><p class="section-intro">从本节材料中寻找依据。</p><div class="faq-list">${l.questions.map(q => `<details><summary>${escape(q.q)}<span>+</span></summary><div><p>${escape(q.a)}</p><a href="${escape(l.sources[q.source].url)}" target="_blank" rel="noopener noreferrer">查看资料依据 ↗</a></div></details>`).join('')}</div><form id="question-form" class="question-form"><label for="lesson-question">还有其他问题？</label><div><input id="lesson-question" maxlength="180" placeholder="输入与本节内容有关的问题" autocomplete="off"><button class="button button-dark" type="submit">查找依据 ${arrow()}</button></div><p class="small-note">本节资料检索 · 不提供个人诊疗建议</p></form><div class="question-response" id="question-response" role="status" hidden></div></section>`;
}

function detail(l) {
  const related = lessons.filter(item => item.track === l.track && item.id !== l.id);
  return `<div class="lesson-page ${l.track}"><section class="lesson-heading container"><a href="#${l.track}" class="breadcrumb">${tracks[l.track].name} / ${escape(l.shortTitle)}</a><div class="lesson-heading-row"><div><p class="eyebrow">${escape(l.topic)} ${l.person ? `· ${l.years}` : '· 青少年通用演示'}</p><h1>${escape(l.title).replace(/\n/g, '<br>')}</h1><p>${escape(l.subtitle)}</p><div class="lesson-meta"><span>${escape(l.duration)}</span><span>${escape(l.readTime)}</span><span class="draft-label">演示稿 · 待审核</span></div></div><div class="lesson-heading-actions">${markButton(l)}<button type="button" class="text-link" data-action="share" data-id="${l.id}">${icon('link')}复制本节链接</button></div></div></section><div class="lesson-layout container"><div class="lesson-main">${playerMarkup(l)}<nav class="jump-bar" aria-label="内容导航"><button data-action="jump" data-target="article">${l.track === 'health' ? '图文解读' : '人物故事'}</button>${l.timeline ? '<button data-action="jump" data-target="timeline">人物时间轴</button>' : ''}<button data-action="jump" data-target="quiz">情境小测</button><button data-action="jump" data-target="sources">资料来源</button></nav>${l.timeline ? `<section id="timeline" class="timeline-section"><p class="eyebrow">FOLLOW THE FOOTSTEPS</p><h2>在时间里，认识一个人。</h2><div class="timeline-buttons">${l.timeline.map((t, i) => `<button type="button" class="timeline-item ${i === 0 ? 'active' : ''}" data-action="timeline" data-index="${i}" aria-pressed="${i === 0}"><strong>${t.year}</strong><span>${escape(t.title)}</span></button>`).join('')}</div><div class="timeline-panel" aria-live="polite"><span id="timeline-year">${l.timeline[0].year}</span><div><h3 id="timeline-title">${escape(l.timeline[0].title)}</h3><p id="timeline-text">${escape(l.timeline[0].text)}</p></div></div></section>` : ''}${articleMarkup(l)}${quizMarkup(l)}${l.reflection ? `<section class="reflection-section"><p class="eyebrow">YOUR OWN THOUGHTS</p><h2>故事之后，想一想。</h2><label for="reflection">${escape(l.reflection)}</label><textarea id="reflection" maxlength="800" placeholder="用自己的话写下想法…">${escape(readStorage(`reflection-${l.id}`, ''))}</textarea><div><button class="button button-outline" data-action="reflection" data-id="${l.id}" type="button">保存我的想法</button><p class="small-note">仅保存在当前浏览器，不对外提交。</p></div></section>` : ''}${questionMarkup(l)}<section id="sources" class="sources-section"><p class="eyebrow">KNOW WHERE IT COMES FROM</p><h2>每一份内容，都有来处。</h2><ul>${l.sources.map(s => `<li><a href="${escape(s.url)}" target="_blank" rel="noopener noreferrer">${escape(s.title)} ${arrow()}</a></li>`).join('')}</ul><p class="content-note">根据公开资料整理的原型演示稿，未完成正式课程审核。图像为原创图示；${l.track === 'stories' ? '不作为人物真实肖像或历史影像。价值讨论为编辑引导。' : '不用于个体诊断或用药指导。'}</p></section></div><aside class="lesson-aside"><div class="aside-card"><p class="eyebrow">TAKE IT TO CLASS</p><h3>让一次阅读，<br>成为一次讨论。</h3><p>把这节内容加入课包，组合你自己的课堂材料。</p><a href="#teacher" class="text-link">打开教师选材 ${arrow()}</a></div><div class="aside-related"><h3>继续探索</h3>${related.map(r => `<a href="#lesson/${r.id}">${escape(r.shortTitle)} ${arrow()}</a>`).join('')}</div></aside></div></div>`;
}

function teacher() {
  const chosen = lessons.filter(l => selected.includes(l.id));
  return `<section class="teacher-heading container"><p class="eyebrow">FOR TEACHERS & FACILITATORS</p><h1>把好内容，<br>带进你的课堂。</h1><p>选一节微课，再搭配一个医者故事。<br>从知识到讨论，组成一次有准备的交流。</p><span class="teacher-flower">✳</span></section><div class="teacher-layout container"><section class="teacher-materials"><div class="section-heading"><h2>挑选课堂材料</h2><span class="small-note">选择保存在当前浏览器</span></div>${Object.entries(tracks).map(([key, t]) => `<h3 class="teacher-track-heading"><span>${key === 'health' ? '01' : '02'}</span>${t.name}</h3><div class="teacher-items">${lessons.filter(l => l.track === key).map(l => `<article class="teacher-item"><button type="button" class="choose-box ${selected.includes(l.id) ? 'checked' : ''}" data-action="select" data-id="${l.id}" aria-label="${selected.includes(l.id) ? '取消选择' : '选择'} ${escape(l.shortTitle)}" aria-pressed="${selected.includes(l.id)}">${selected.includes(l.id) ? icon('check') : '<span></span>'}</button><div><h4>${escape(l.shortTitle)}</h4><p>${escape(l.description)}</p><span>${escape(l.readTime)} · 演示稿待审核</span></div><a href="#lesson/${l.id}" class="icon-button" aria-label="预览 ${escape(l.shortTitle)}">${arrow()}</a></article>`).join('')}</div>`).join('')}<div class="teacher-guidance"><h3>从内容到课堂</h3><ol><li><strong>打开一个问题。</strong>从生活情境或人物选择开始。</li><li><strong>读一份材料。</strong>一起观看动态导览，再核对资料来源。</li><li><strong>留下一个讨论。</strong>用情境题或开放问题交流理解。</li></ol><p>本原型帮助演示选材和使用流程。正式教学前，需要完成素材授权、医学与史实审核，并根据学段调整表达。</p></div></section><aside class="lesson-package"><div class="package-title"><p class="eyebrow">YOUR CLASSROOM PACK</p><h2>我的课堂课包 <span>${chosen.length}</span></h2></div><label for="package-name">给这次课堂取个名字</label><input id="package-name" maxlength="70" value="${escape(readStorage('package-name', '认识健康 读懂责任'))}"><div class="package-content">${chosen.length ? chosen.map((l, i) => `<div class="package-item"><span>0${i + 1}</span><div><strong>${escape(l.shortTitle)}</strong><small>${tracks[l.track].name}</small></div><button type="button" class="icon-button" data-action="select" data-id="${l.id}" aria-label="移出 ${escape(l.shortTitle)}">${icon('close')}</button></div>`).join('') : '<div class="package-empty"><span>+</span><h3>从左侧选一份内容</h3><p>你的微课和故事会出现在这里。</p></div>'}</div><button type="button" class="button button-dark full-width" data-action="download" ${!chosen.length ? 'disabled' : ''}>${icon('download')}下载课堂选材单</button><button type="button" class="button button-outline full-width" data-action="share-pack" ${!chosen.length ? 'disabled' : ''}>${icon('link')}复制所选内容链接</button><p class="package-note">选材单包含内容提要、互动题与资料来源。<br>下载为可编辑文本，不含个人学习数据。</p></aside></div>`;
}

function route() {
  if (frame !== null) cancelAnimationFrame(frame);
  frame = null; player = null; quizAnswers = {};
  const parts = location.hash.slice(1).split('/');
  const view = parts[0] || 'home';
  let active = view;
  if (view === 'lesson') {
    const l = lessonById(parts[1]);
    if (!l) { main.innerHTML = '<section class="empty-state container"><h1>这份内容还没有上线。</h1><p>先回到首页，探索当前的示范内容。</p><a class="button button-dark" href="#home">返回首页</a></section>'; active = ''; }
    else {
      main.innerHTML = detail(l); active = l.track;
      player = { lesson: l, time: 0, playing: false, scene: 0, last: 0 };
      document.querySelector('#player-seek').addEventListener('input', e => { player.time = Number(e.target.value); updatePlayer(); });
      document.querySelector('#quiz-form').addEventListener('submit', e => { e.preventDefault(); submitQuiz(l); });
      document.querySelector('#question-form').addEventListener('submit', e => { e.preventDefault(); answerQuestion(l); });
    }
  } else if (view === 'health' || view === 'stories') {
    main.innerHTML = catalog(view);
    main.dataset.topic = 'all'; main.dataset.track = view;
    document.querySelector('#catalog-query').addEventListener('input', filterCatalog);
  } else if (view === 'teacher') {
    main.innerHTML = teacher();
    document.querySelector('#package-name').addEventListener('input', e => saveStorage('package-name', e.target.value));
  } else {
    main.innerHTML = home(); active = 'home';
  }
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.dataset.nav === active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  updateBag();
  document.title = `${view === 'lesson' ? (lessonById(parts[1])?.shortTitle || '内容未找到') : ({ home: '医路云伴', health: '云上白大褂', stories: '医学大师故事', teacher: '教师选材' }[active] || '医路云伴')} · 青春健康六安`;
  window.scrollTo({ top: 0, behavior: 'instant' });
  main.focus({ preventScroll: true });
}

function filterCatalog() {
  const query = document.querySelector('#catalog-query').value.trim().toLowerCase();
  const filtered = lessons.filter(l => l.track === main.dataset.track && (main.dataset.topic === 'all' || l.topic === main.dataset.topic) && `${l.title} ${l.description} ${l.keywords.join(' ')}`.toLowerCase().includes(query));
  document.querySelector('#catalog-grid').innerHTML = filtered.length ? filtered.map(card).join('') : '<div class="empty-results"><h3>还没有找到这个主题。</h3><p>换一个关键词，或回到全部内容。</p></div>';
}

function updatePlayer() {
  if (!player) return;
  const index = Math.min(3, Math.floor(player.time / 15));
  if (index !== player.scene) {
    player.scene = index;
    const s = player.lesson.scenes[index];
    document.querySelector('#scene').innerHTML = `<div class="scene-copy"><p class="scene-kicker">${escape(s.kicker)}</p><h3>${escape(s.title).replace(/\n/g, '<br>')}</h3><p>${escape(s.text)}</p><div class="scene-labels">${s.labels.map(t => `<span>${escape(t)}</span>`).join('')}</div></div><div class="scene-art">${art(s.visual)}</div>`;
    document.querySelector('.player-header span:last-child').textContent = `0${index + 1} / 04`;
  }
  const seconds = Math.floor(player.time);
  document.querySelector('#player-time').textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')} / 01:00`;
  document.querySelector('#player-seek').value = player.time;
  const button = document.querySelector('.play-button');
  button.innerHTML = icon(player.playing ? 'pause' : 'play');
  button.setAttribute('aria-label', player.playing ? '暂停动态微课' : '播放动态微课');
  document.querySelector('#micro-player').classList.toggle('is-playing', player.playing);
}

function tick(timestamp) {
  if (!player?.playing) { frame = null; return; }
  // Hidden tabs pause, so no scene silently disappears while the viewer is elsewhere.
  if (document.hidden) { player.playing = false; updatePlayer(); frame = null; return; }
  if (player.last) player.time = Math.min(60, player.time + (timestamp - player.last) / 1000);
  player.last = timestamp;
  if (player.time >= 60) player.playing = false;
  updatePlayer();
  if (player.playing) frame = requestAnimationFrame(tick); else frame = null;
}

function togglePlayer(restart = false) {
  if (!player) return;
  if (frame !== null) cancelAnimationFrame(frame);
  if (restart || player.time >= 60) player.time = 0;
  player.playing = restart || !player.playing;
  player.last = 0;
  updatePlayer();
  if (player.playing) frame = requestAnimationFrame(tick); else frame = null;
}

function submitQuiz(l) {
  const form = document.querySelector('#quiz-form');
  const values = new FormData(form);
  const error = document.querySelector('#quiz-error');
  if (l.quiz.some((_, i) => values.get(`q${i}`) === null)) {
    error.textContent = '请先完成每一道题，再查看解释。'; error.hidden = false; return;
  }
  error.hidden = true;
  let correct = 0;
  l.quiz.forEach((q, i) => {
    const answer = Number(values.get(`q${i}`)); quizAnswers[i] = answer;
    if (answer === q.correct) correct++;
    const explanation = document.querySelector(`[data-explanation="${i}"]`);
    explanation.innerHTML = `<strong>${answer === q.correct ? '理解正确' : '再想一想'} · 参考答案 ${String.fromCharCode(65 + q.correct)}</strong><p>${escape(q.explanation)}</p>`;
    explanation.hidden = false;
    explanation.classList.toggle('needs-review', answer !== q.correct);
    form.querySelectorAll(`[name="q${i}"]`).forEach(input => {
      input.disabled = true;
      input.closest('.answer-option').classList.toggle('correct-option', Number(input.value) === q.correct);
      input.closest('.answer-option').classList.toggle('wrong-option', input.checked && Number(input.value) !== q.correct);
    });
  });
  const result = document.querySelector('#quiz-result');
  result.innerHTML = `<strong>${correct} / ${l.quiz.length} 道理解正确</strong><p>${correct === l.quiz.length ? '把你的理解带进下一次讨论。' : '看看逐题解释，知识来自一次次认真核对。'}</p>`; result.hidden = false;
  form.querySelector('[type="submit"]').hidden = true;
  form.querySelector('[data-action="retry"]').hidden = false;
}

function retryQuiz() {
  const form = document.querySelector('#quiz-form'); form.reset(); quizAnswers = {};
  form.querySelectorAll('input').forEach(input => { input.disabled = false; input.closest('.answer-option').classList.remove('correct-option', 'wrong-option'); });
  form.querySelectorAll('.question-explanation').forEach(el => { el.hidden = true; });
  document.querySelector('#quiz-result').hidden = true; document.querySelector('#quiz-error').hidden = true;
  form.querySelector('[type="submit"]').hidden = false; form.querySelector('[data-action="retry"]').hidden = true;
}

function answerQuestion(l) {
  const query = document.querySelector('#lesson-question').value.trim();
  const output = document.querySelector('#question-response');
  output.hidden = false;
  if (!query) { output.textContent = '请先输入一个与本节内容有关的问题。'; return; }
  // Deliberately conservative matching, not generated answers or individual medical advice.
  if (/我|本人|孩子|几片|剂量|吃什么|诊断|处方|胸痛|急救|治疗方案|得了/.test(query)) {
    output.innerHTML = '<strong>这类问题需要专业判断。</strong><p>本原型不判断个人病情或推荐用药。请向医务人员咨询；紧急情况应及时寻求当地急救帮助。</p>'; return;
  }
  const normalized = query.toLowerCase().replace(/[？?\s，,。]/g, '');
  const match = l.questions.find(q => q.q.toLowerCase().replace(/[？?\s，,。]/g, '') === normalized);
  if (!match) {
    output.innerHTML = '<strong>当前材料未覆盖这个问题。</strong><p>可以先查看上方已有问题与资料来源，或把问题带给教师讨论。这里不会生成没有依据的回答。</p>'; return;
  }
  output.innerHTML = `<strong>${escape(match.q)}</strong><p>${escape(match.a)}</p><a href="${escape(l.sources[match.source].url)}" target="_blank" rel="noopener noreferrer">查看资料依据 ↗</a>`;
}

function toggleSelection(id) {
  if (!lessonById(id)) return;
  const added = !selected.includes(id);
  selected = added ? [...selected, id] : selected.filter(x => x !== id);
  saveStorage('selected', selected); updateBag();
  if (location.hash === '#teacher') {
    const y = window.scrollY;
    main.innerHTML = teacher();
    document.querySelector('#package-name').addEventListener('input', e => saveStorage('package-name', e.target.value));
    window.scrollTo({ top: y, behavior: 'instant' });
    main.querySelector(`.choose-box[data-id="${id}"]`)?.focus({ preventScroll: true });
  } else {
    main.querySelectorAll(`[data-action="select"][data-id="${id}"]`).forEach(b => {
      b.setAttribute('aria-pressed', added);
      if (b.classList.contains('card-save')) { b.innerHTML = icon(added ? 'check' : 'bookmark'); b.classList.toggle('is-selected', added); b.setAttribute('aria-label', `${added ? '移出' : '加入'}课包 ${lessonById(id).shortTitle}`); }
      else { b.innerHTML = `${icon(added ? 'check' : 'bookmark')}<span>${added ? '已加入课包' : '加入我的课包'}</span>`; b.classList.toggle('selected-button', added); }
    });
  }
  toast(added ? '已加入课堂课包' : '已从课堂课包移出');
}

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); toast('已复制链接'); }
  catch {
    const field = document.createElement('textarea'); field.value = text; field.setAttribute('aria-label', '请手动复制的链接');
    field.className = 'copy-fallback'; main.append(field); field.focus(); field.select();
    toast('浏览器未允许自动复制，链接已选中，请手动复制。');
  }
}

function exportPack() {
  const chosen = lessons.filter(l => selected.includes(l.id));
  if (!chosen.length) return;
  const title = readStorage('package-name', '认识健康 读懂责任');
  const parts = [title, '医路云伴 · 课堂选材单', '原型演示材料，正式教学前需完成内容与素材审核。', ''];
  chosen.forEach((l, i) => {
    parts.push(`${i + 1}. ${l.shortTitle}`, `栏目：${tracks[l.track].name}`, `主题：${l.topic}`, `链接：${lessonUrl(l.id)}`, `提要：${l.description}`, ...l.article.map(p => `${p.heading}\n${p.text}`), l.takeaway, '');
    l.quiz.forEach((q, j) => parts.push(`讨论题 ${j + 1}：${q.question}`, ...q.options.map((a, k) => `${String.fromCharCode(65 + k)}. ${a}`), `参考答案：${String.fromCharCode(65 + q.correct)}。${q.explanation}`));
    if (l.reflection) parts.push(`开放讨论：${l.reflection}`);
    parts.push('资料来源：', ...l.sources.map(s => `${s.title}\n${s.url}`), '');
  });
  const url = URL.createObjectURL(new Blob(['\uFEFF' + parts.join('\r\n')], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a'); link.href = url; link.download = '医路云伴_课堂选材单.txt'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

main.addEventListener('click', async e => {
  const button = e.target.closest('[data-action]'); if (!button) return;
  switch (button.dataset.action) {
    case 'select': toggleSelection(button.dataset.id); break;
    case 'share': await copyText(lessonUrl(button.dataset.id)); break;
    case 'share-pack': await copyText(lessons.filter(l => selected.includes(l.id)).map(l => `${l.shortTitle}\n${lessonUrl(l.id)}`).join('\n\n')); break;
    case 'download': exportPack(); break;
    case 'play': togglePlayer(); break;
    case 'restart': togglePlayer(true); break;
    case 'retry': retryQuiz(); break;
    case 'jump': document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); break;
    case 'filter':
      main.dataset.topic = button.dataset.topic;
      main.querySelectorAll('.filter').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', b === button); });
      filterCatalog(); break;
    case 'timeline': {
      const index = Number(button.dataset.index); const item = player.lesson.timeline[index];
      document.querySelector('#timeline-year').textContent = item.year;
      document.querySelector('#timeline-title').textContent = item.title;
      document.querySelector('#timeline-text').textContent = item.text;
      main.querySelectorAll('.timeline-item').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', b === button); });
      player.time = index * 15; player.playing = false; if (frame !== null) cancelAnimationFrame(frame); frame = null; updatePlayer(); break;
    }
    case 'reflection': if (saveStorage(`reflection-${button.dataset.id}`, document.querySelector('#reflection').value)) toast('已保存在当前浏览器'); break;
  }
});

function search() {
  const query = globalSearch.value.trim().toLowerCase();
  const found = lessons.filter(l => `${l.title} ${l.description} ${l.keywords.join(' ')}`.toLowerCase().includes(query));
  document.querySelector('#search-results').innerHTML = found.length ? found.map(l => `<a href="#lesson/${l.id}"><span>${tracks[l.track].name}</span><strong>${escape(l.shortTitle)}</strong>${arrow()}</a>`).join('') : '<p class="empty-search">没有找到匹配内容，换个关键词试试。</p>';
}
document.querySelector('.search-toggle').addEventListener('click', () => { globalSearch.value = ''; search(); searchDialog.showModal(); globalSearch.focus(); });
document.querySelector('.close-search').addEventListener('click', () => searchDialog.close());
globalSearch.addEventListener('input', search);
searchDialog.addEventListener('click', e => { if (e.target.closest('a')) searchDialog.close(); if (e.target === searchDialog) { const r = searchDialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) searchDialog.close(); } });
window.addEventListener('hashchange', route);
document.addEventListener('visibilitychange', () => { if (document.hidden && player?.playing) { player.playing = false; if (frame !== null) cancelAnimationFrame(frame); frame = null; updatePlayer(); } });
route();

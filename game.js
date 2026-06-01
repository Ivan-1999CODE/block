// 拼磚塊大冒險 - 遊戲核心邏輯

// ==========================================
// 1. 題庫資料集
// ==========================================
const WORD_DATABASE = {
  vowels_single: [
    { word: "cat", missing: "a", clue: ["c", "t"] },
    { word: "hat", missing: "a", clue: ["h", "t"] },
    { word: "map", missing: "a", clue: ["m", "p"] },
    { word: "pen", missing: "e", clue: ["p", "n"] },
    { word: "red", missing: "e", clue: ["r", "d"] },
    { word: "bed", missing: "e", clue: ["b", "d"] },
    { word: "pig", missing: "i", clue: ["p", "g"] },
    { word: "fish", missing: "i", clue: ["f", "sh"] },
    { word: "sit", missing: "i", clue: ["s", "t"] },
    { word: "hot", missing: "o", clue: ["h", "t"] },
    { word: "dog", missing: "o", clue: ["d", "g"] },
    { word: "box", missing: "o", clue: ["b", "x"] },
    { word: "cup", missing: "u", clue: ["c", "p"] },
    { word: "bus", missing: "u", clue: ["b", "s"] },
    { word: "sun", missing: "u", clue: ["s", "n"] }
  ],
  vowels_double: [
    { word: "cloud", missing: "ou", clue: ["cl", "d"] },
    { word: "house", missing: "ou", clue: ["h", "se"] },
    { word: "mouth", missing: "ou", clue: ["m", "th"] },
    { word: "cow", missing: "ow", clue: ["c", ""] },
    { word: "town", missing: "ow", clue: ["t", "n"] },
    { word: "flower", missing: "ow", clue: ["fl", "er"] },
    { word: "autumn", missing: "au", clue: ["", "tumn"] },
    { word: "sauce", missing: "au", clue: ["s", "ce"] },
    { word: "draw", missing: "aw", clue: ["dr", ""] },
    { word: "paw", missing: "aw", clue: ["p", ""] },
    { word: "straw", missing: "aw", clue: ["str", ""] },
    { word: "book", missing: "oo", clue: ["b", "k"] },
    { word: "foot", missing: "oo", clue: ["f", "t"] },
    { word: "zoo", missing: "oo", clue: ["z", ""] },
    { word: "tree", missing: "ee", clue: ["tr", ""] },
    { word: "bee", missing: "ee", clue: ["b", ""] },
    { word: "meet", missing: "ee", clue: ["m", "t"] },
    { word: "leaf", missing: "ea", clue: ["l", "f"] },
    { word: "tea", missing: "ea", clue: ["t", ""] },
    { word: "meat", missing: "ea", clue: ["m", "t"] },
    { word: "coin", missing: "oi", clue: ["c", "n"] },
    { word: "point", missing: "oi", clue: ["p", "nt"] },
    { word: "soil", missing: "oi", clue: ["s", "l"] },
    { word: "toy", missing: "oy", clue: ["t", ""] },
    { word: "boy", missing: "oy", clue: ["b", ""] },
    { word: "joy", missing: "oy", clue: ["j", ""] }
  ],
  consonants: [
    { word: "ship", missing: "sh", clue: ["", "ip"] },
    { word: "shop", missing: "sh", clue: ["", "op"] },
    { word: "dish", missing: "sh", clue: ["di", ""] },
    { word: "chip", missing: "ch", clue: ["", "ip"] },
    { word: "chair", missing: "ch", clue: ["", "air"] },
    { word: "peach", missing: "ch", clue: ["pea", ""] },
    { word: "three", missing: "th", clue: ["", "ree"] },
    { word: "thin", missing: "th", clue: ["", "in"] },
    { word: "bath", missing: "th", clue: ["ba", ""] },
    { word: "phone", missing: "ph", clue: ["", "one"] },
    { word: "photo", missing: "ph", clue: ["", "oto"] },
    { word: "dolphin", missing: "ph", clue: ["dol", "in"] },
    { word: "whale", missing: "wh", clue: ["", "ale"] },
    { word: "wheel", missing: "wh", clue: ["", "eel"] },
    { word: "white", missing: "wh", clue: ["", "ite"] },
    { word: "tree", missing: "tr", clue: ["", "ee"] },
    { word: "truck", missing: "tr", clue: ["", "uck"] },
    { word: "train", missing: "tr", clue: ["", "ain"] },
    { word: "drum", missing: "dr", clue: ["", "um"] },
    { word: "dress", missing: "dr", clue: ["", "ess"] },
    { word: "drink", missing: "dr", clue: ["", "ink"] },
    { word: "bread", missing: "br", clue: ["", "ead"] },
    { word: "brown", missing: "br", clue: ["", "own"] },
    { word: "brush", missing: "br", clue: ["", "ush"] },
    { word: "crab", missing: "cr", clue: ["", "ab"] },
    { word: "cry", missing: "cr", clue: ["", "y"] },
    { word: "crown", missing: "cr", clue: ["", "own"] }
  ]
};

const QUESTIONS_PER_GAME = 10;

// ==========================================
// 自然拼讀發音與教學資料
// ==========================================
const PHONICS_DATA = {
  vowels_single: {
    title: "單母音組 📖 學習樂園",
    tips: "單母音 (a, e, i, o, u) 就像是注音符號的母音。每個字母在單字裡發出短而輕的聲音喔！例如 <b>a</b> 發 /æ/（嘴巴張大，像貓咪 cat），<b>e</b> 發 /ɛ/（像筆 pen），<b>i</b> 發 /ɪ/（像小豬 pig），<b>o</b> 發 /ɑ/（像熱 hot），<b>u</b> 發 /ʌ/（像杯子 cup）。",
    sounds: {
      a: "a",
      e: "eh",
      i: "ih",
      o: "ah",
      u: "uh"
    }
  },
  vowels_double: {
    title: "雙母音組 📖 學習樂園",
    tips: "雙母音是兩個母音字母<b>「手牽手在一起」</b>發出的新發音喔！例如：<br>• <b>ou</b> 與 <b>ow</b> 發 /aʊ/（大聲說『凹』的音，如 cloud, cow）<br>• <b>au</b> 與 <b>aw</b> 發 /ɔ/（像嘴巴張圓發『歐』，如 sauce, draw）<br>• <b>oo</b> 發 /ʊ/ 或 /u/（像『屋』，如 book, zoo）<br>• <b>ee</b> 與 <b>ea</b> 發長音 /i/（拉長音『衣』，如 tree, leaf）<br>• <b>oi</b> 與 <b>oy</b> 發 /ɔɪ/（『歐義』連著發音，如 coin, toy）",
    sounds: {
      ou: "ou",
      ow: "ow",
      au: "au",
      aw: "aw",
      oo: "oo",
      ee: "ee",
      ea: "ea",
      oi: "oi",
      oy: "oy"
    }
  },
  consonants: {
    title: "子音與輔音群 📖 學習樂園",
    tips: "子音組合有時會<b>發出一個全新的音</b>（如 sh, ch, th, ph, wh），有時則是兩個字母的<b>發音快速滑過去</b>（如 tr, dr, br, cr）。例如：<br>• <b>sh</b> 發 /ʃ/（像叫人安靜的『噓』，如 ship）<br>• <b>ch</b> 發 /tʃ/（像火車『七』，如 chip）<br>• <b>th</b> 發 /θ/（要把舌頭夾在牙齒中間發音喔，如 three）<br>• <b>ph</b> 發 /f/（發『夫』的音，如 phone）<br>• <b>wh</b> 發 /w/ (發『烏』，如 whale)<br>• <b>tr</b> /tr/, <b>dr</b> /dr/, <b>br</b> /br/, <b>cr</b> /cr/ 則是把兩個聲母連著快速唸出來！",
    sounds: {
      sh: "sh",
      ch: "ch",
      th: "th",
      ph: "ph",
      wh: "wh",
      tr: "tr",
      dr: "dr",
      br: "br",
      cr: "cr"
    }
  }
};

// ==========================================
// 2. 遊戲狀態變數
// ==========================================
let currentCategory = "";
let selectedCategory = ""; // 大廳選取的類別，用於模式選擇分流
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;
let combo = 0;
let isCurrentQuestionAnswered = false;

// 儲存至本地的資料
let highScores = { vowels_single: 0, vowels_double: 0, consonants: 0 };
let starRatings = { vowels_single: 0, vowels_double: 0, consonants: 0 };

// 音效控制
let soundEnabled = true;
let audioCtx = null;

// ==========================================
// 3. Web Audio API 音效合成器
// ==========================================
function initAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  const now = audioCtx.currentTime;

  switch (type) {
    case "click":
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
      break;

    case "correct":
      // C5 -> E5 -> G5 -> C6 快速和弦上升
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.07); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.14); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.21); // C6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
      break;

    case "wrong":
      // 沮喪滑音
      osc.type = "triangle";
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.35); // A2
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
      break;

    case "tick":
      // 倒數滴答聲
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc.start(now);
      osc.stop(now + 0.03);
      break;

    case "clear":
      // 勝利小喇叭
      osc.type = "triangle";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(523.25, now + 0.1);
      osc.frequency.setValueAtTime(523.25, now + 0.2);
      osc.frequency.setValueAtTime(659.25, now + 0.3); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.4); // G5
      osc.frequency.setValueAtTime(1046.50, now + 0.5); // C6
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
      osc.start(now);
      osc.stop(now + 0.9);
      break;

    case "gameover":
      // 悲傷曲調
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(293.66, now); // D4
      osc.frequency.setValueAtTime(349.23, now + 0.15); // F4
      osc.frequency.setValueAtTime(440.00, now + 0.3); // A4
      osc.frequency.setValueAtTime(220.00, now + 0.45); // A3
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      osc.start(now);
      osc.stop(now + 0.8);
      break;
  }
}

// ==========================================
// 4. Web Speech API (TTS 發音)
// ==========================================
function speakWord(word, callback) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel(); // 停止目前所有發音

  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-US";
  utterance.rate = 0.8; // 稍微放慢速度，讓小朋友聽得清楚
  utterance.pitch = 1.1; // 稍微拉高音調，聽起來更活潑

  if (callback) {
    utterance.onend = callback;
  }
  window.speechSynthesis.speak(utterance);
}

// ==========================================
// 5. 粒子特效系統 (Canvas Star & Confetti Burst)
// ==========================================
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 8 + 4;
    this.speedX = Math.random() * 12 - 6;
    this.speedY = Math.random() * -14 - 4; // 往上噴射
    this.gravity = 0.4;
    this.color = `hsl(${Math.random() * 360}, 100%, 65%)`;
    this.alpha = 1;
    this.decay = Math.random() * 0.015 + 0.01;
    this.type = Math.floor(Math.random() * 3); // 圓形、星星、方形
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.alpha -= this.decay;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    if (this.type === 0) {
      // 圓形
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    } else if (this.type === 1) {
      // 星星
      drawStar(ctx, this.x, this.y, 5, this.size, this.size / 2);
    } else {
      // 方形
      ctx.rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
    ctx.fill();
    ctx.restore();
  }
}

function drawStar(context, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  context.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    context.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    context.lineTo(x, y);
    rot += step;
  }
  context.lineTo(cx, cy - outerRadius);
  context.closePath();
}

function createCelebrationBurst() {
  // 在螢幕中間下方，或雲朵四周噴灑
  const dropZone = document.getElementById("drop-zone");
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2 - 50;

  if (dropZone) {
    const rect = dropZone.getBoundingClientRect();
    targetX = rect.left + rect.width / 2;
    targetY = rect.top + rect.height / 2;
  }

  // 噴射多個方向的粒子
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(targetX, targetY));
  }
}

function updateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.alpha > 0);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(updateParticles);
}
requestAnimationFrame(updateParticles);

// ==========================================
// 6. 拖拉與觸控機制 (Drag & Drop + Touch Support)
// ==========================================
let draggedLetter = "";
let draggedElement = null;
let activeTouchProxy = null;

function setupDragEvents(block) {
  // 桌機滑鼠拖拉
  block.addEventListener("dragstart", (e) => {
    if (isCurrentQuestionAnswered) return;
    draggedLetter = block.getAttribute("data-letter");
    draggedElement = block;
    block.classList.add("dragging");
    e.dataTransfer.setData("text/plain", draggedLetter);
  });

  block.addEventListener("dragend", () => {
    block.classList.remove("dragging");
    draggedElement = null;
  });

  // 手機平板觸控支援
  block.addEventListener("touchstart", (e) => {
    if (isCurrentQuestionAnswered) return;
    initAudioContext();
    const touch = e.touches[0];
    draggedLetter = block.getAttribute("data-letter");
    draggedElement = block;
    block.classList.add("dragging");

    // 建立拖拉視覺分身 (Proxy)
    createTouchProxy(block, touch.clientX, touch.clientY);
    e.preventDefault(); // 避免滑動視窗
  }, { passive: false });

  block.addEventListener("touchmove", (e) => {
    if (!activeTouchProxy) return;
    const touch = e.touches[0];
    
    // 更新分身位置
    activeTouchProxy.style.left = `${touch.clientX}px`;
    activeTouchProxy.style.top = `${touch.clientY}px`;

    // 檢測是否與放置區碰撞
    const dropZone = document.getElementById("drop-zone");
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        dropZone.classList.add("drag-over");
      } else {
        dropZone.classList.remove("drag-over");
      }
    }
  });

  block.addEventListener("touchend", (e) => {
    if (!draggedElement) return;
    block.classList.remove("dragging");
    
    // 移除視覺分身
    if (activeTouchProxy) {
      document.body.removeChild(activeTouchProxy);
      activeTouchProxy = null;
    }

    const dropZone = document.getElementById("drop-zone");
    if (dropZone) {
      const rect = dropZone.getBoundingClientRect();
      const touch = e.changedTouches[0];

      // 檢查是否放置在 drop-zone 內
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        handleDrop(draggedLetter);
      }
      dropZone.classList.remove("drag-over");
    }
    draggedElement = null;
  });
}

function createTouchProxy(sourceElement, x, y) {
  if (activeTouchProxy) return;
  const proxy = document.createElement("div");
  proxy.className = "drag-proxy";
  proxy.textContent = sourceElement.textContent;
  
  // 複製底色樣式
  const style = window.getComputedStyle(sourceElement);
  proxy.style.background = style.background;
  proxy.style.boxShadow = style.boxShadow;
  
  proxy.style.left = `${x}px`;
  proxy.style.top = `${y}px`;
  
  document.body.appendChild(proxy);
  activeTouchProxy = proxy;
}

function setupDropZone() {
  const dropZone = document.getElementById("drop-zone");
  if (!dropZone) return;

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    if (isCurrentQuestionAnswered) return;
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    if (isCurrentQuestionAnswered) return;
    const letter = e.dataTransfer.getData("text/plain");
    handleDrop(letter);
  });
}

// ==========================================
// 7. 遊戲核心邏輯控制
// ==========================================

// 初始化並載入儲存的分數與關卡狀態
function init() {
  loadStats();
  setupLobbyEvents();
  setupGameControlEvents();
}

function loadStats() {
  try {
    const savedHigh = localStorage.getItem("block_puzzle_highscores");
    if (savedHigh) {
      highScores = JSON.parse(savedHigh);
    }
    const savedStars = localStorage.getItem("block_puzzle_stars");
    if (savedStars) {
      starRatings = JSON.parse(savedStars);
    }
  } catch (e) {
    console.error("無法載入本地存檔:", e);
  }

  // 更新大廳 UI 數值
  const categories = ["vowels_single", "vowels_double", "consonants"];
  categories.forEach((cat) => {
    const highEl = document.getElementById(`high-${cat}`);
    if (highEl) highEl.textContent = highScores[cat] || 0;

    const starsEl = document.getElementById(`stars-${cat}`);
    if (starsEl) {
      const activeStars = starRatings[cat] || 0;
      let starsHtml = "";
      for (let i = 1; i <= 3; i++) {
        starsHtml += `<span>${i <= activeStars ? "★" : "☆"}</span>`;
      }
      starsEl.innerHTML = starsHtml;
    }
  });
}

function saveStats() {
  try {
    localStorage.setItem("block_puzzle_highscores", JSON.stringify(highScores));
    localStorage.setItem("block_puzzle_stars", JSON.stringify(starRatings));
  } catch (e) {
    console.error("無法儲存本地存檔:", e);
  }
}

// 設定大廳事件
function setupLobbyEvents() {
  const cards = document.querySelectorAll(".category-card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      playSound("click");
      selectedCategory = card.getAttribute("data-category");
      showModeSelect();
    });
  });
}

function showModeSelect() {
  const overlay = document.getElementById("modal-overlay");
  const modalModeSelect = document.getElementById("modal-mode-select");
  overlay.classList.remove("hidden");
  modalModeSelect.classList.remove("hidden");
}

// 設定遊戲按鈕與視窗事件
function setupGameControlEvents() {
  // 返回首頁
  document.getElementById("btn-home").addEventListener("click", () => {
    playSound("click");
    exitToLobby();
  });

  // 音效開關
  const btnSound = document.getElementById("btn-sound");
  btnSound.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    btnSound.textContent = soundEnabled ? "🔊" : "🔇";
    playSound("click");
  });

  // 雲朵發音按鈕
  document.getElementById("btn-speak").addEventListener("click", () => {
    const currentQ = currentQuestions[currentQuestionIndex];
    if (currentQ) {
      speakWord(currentQ.word);
    }
  });

  // 模式選擇彈窗按鈕
  document.getElementById("btn-mode-learn").addEventListener("click", () => {
    playSound("click");
    hideModal();
    startStudy(selectedCategory);
  });

  document.getElementById("btn-mode-play").addEventListener("click", () => {
    playSound("click");
    hideModal();
    startGame(selectedCategory);
  });

  // 學習模式中的導覽按鈕
  document.getElementById("btn-study-home").addEventListener("click", () => {
    playSound("click");
    exitStudyToLobby();
  });

  document.getElementById("btn-study-start-game").addEventListener("click", () => {
    playSound("click");
    exitStudyToGame();
  });

  // 彈窗按鈕
  document.getElementById("btn-clear-retry").addEventListener("click", () => {
    playSound("click");
    hideModal();
    startGame(currentCategory);
  });

  document.getElementById("btn-clear-lobby").addEventListener("click", () => {
    playSound("click");
    hideModal();
    exitToLobby();
  });

  document.getElementById("btn-fail-retry").addEventListener("click", () => {
    playSound("click");
    hideModal();
    startGame(currentCategory);
  });

  document.getElementById("btn-fail-lobby").addEventListener("click", () => {
    playSound("click");
    hideModal();
    exitToLobby();
  });
}

// 開始遊戲
function startGame(category) {
  currentCategory = category;
  score = 0;
  lives = 3;
  combo = 0;
  currentQuestionIndex = 0;
  
  // 隨機選出 10 題
  const allQuestions = WORD_DATABASE[category];
  currentQuestions = shuffleArray([...allQuestions]).slice(0, QUESTIONS_PER_GAME);

  // 切換畫面
  document.getElementById("lobby-screen").classList.add("hidden");
  document.getElementById("game-hud").classList.remove("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  // 更新 HUD
  updateHUD();

  // 載入第一題
  loadQuestion();
}

// 載入題目
function loadQuestion() {
  isCurrentQuestionAnswered = false;
  clearInterval(timerInterval);
  
  const currentQ = currentQuestions[currentQuestionIndex];
  
  // 更新進度條
  const progressPercent = (currentQuestionIndex / QUESTIONS_PER_GAME) * 100;
  document.getElementById("game-progress").style.width = `${progressPercent}%`;

  // 生成雲朵單字結構
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = `
    <span class="word-letter">${currentQ.clue[0]}</span>
    <div id="drop-zone" class="drop-zone">?</div>
    <span class="word-letter">${currentQ.clue[1]}</span>
  `;

  // 設定放置區事件監聽
  setupDropZone();

  // 生成選項積木
  generateOptions(currentQ);

  // 自動發音
  setTimeout(() => {
    speakWord(currentQ.word);
  }, 300);

  // 計時器初始化
  timer = 30;
  document.getElementById("timer-text").textContent = `${timer}s`;
  document.getElementById("timer-text").style.color = "";
  
  timerInterval = setInterval(() => {
    timer--;
    document.getElementById("timer-text").textContent = `${timer}s`;
    
    if (timer <= 5) {
      document.getElementById("timer-text").style.color = "var(--color-danger)";
      playSound("tick");
    }

    if (timer <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

// 產生選項積木 (含混淆字母)
function generateOptions(question) {
  const container = document.getElementById("options-container");
  container.innerHTML = "";

  const correctAnswer = question.missing;
  const optionsSet = new Set([correctAnswer]);

  // 根據不同分類，撈取合適的混淆字母
  const allWords = WORD_DATABASE[currentCategory];
  const possibleAnswers = allWords.map((q) => q.missing);

  // 補足至 5 個選項
  while (optionsSet.size < Math.min(5, possibleAnswers.length + 1)) {
    const randomAnswer = possibleAnswers[Math.floor(Math.random() * possibleAnswers.length)];
    optionsSet.add(randomAnswer);
  }

  // 轉成陣列並洗牌
  const options = shuffleArray([...optionsSet]);

  // 渲染積木
  options.forEach((letter) => {
    const block = document.createElement("div");
    block.className = "block";
    block.setAttribute("draggable", "true");
    block.setAttribute("data-letter", letter);
    block.textContent = letter;
    
    // 綁定拖曳事件
    setupDragEvents(block);
    
    container.appendChild(block);
  });
}

// 處理放置判斷
function handleDrop(letter) {
  if (isCurrentQuestionAnswered) return;
  const currentQ = currentQuestions[currentQuestionIndex];
  const dropZone = document.getElementById("drop-zone");

  if (letter === currentQ.missing) {
    // 答對了！
    isCurrentQuestionAnswered = true;
    clearInterval(timerInterval);
    combo++;
    
    // 計算分數：基本 10 分 + 賸餘時間加成，連擊達 3 次以上加倍
    const pts = (10 + timer) * (combo >= 3 ? 2 : 1);
    score += pts;

    // 播放音效與粒子特效
    playSound("correct");
    createCelebrationBurst();

    // 更新 UI 狀態
    dropZone.textContent = letter;
    dropZone.className = "drop-zone correct";
    updateHUD();

    // 觸發 Combo 動畫
    const comboBadge = document.getElementById("combo-badge");
    if (combo >= 3) {
      comboBadge.textContent = `Combo x${combo}! 🔥`;
      comboBadge.classList.add("show");
    }

    // 播放發音
    speakWord(currentQ.word);

    // 延遲 1.8 秒進入下一題
    setTimeout(() => {
      comboBadge.classList.remove("show");
      nextQuestion();
    }, 1800);

  } else {
    // 答錯了！
    combo = 0; // 中斷連擊
    lives--;
    playSound("wrong");

    // 扣命紅框特效
    dropZone.className = "drop-zone wrong";
    setTimeout(() => {
      if (!isCurrentQuestionAnswered) {
        dropZone.className = "drop-zone";
      }
    }, 500);

    updateHUD();
    
    // 檢查生命值
    if (lives <= 0) {
      clearInterval(timerInterval);
      setTimeout(showGameOver, 800);
    }
  }
}

// 時間到未答
function handleTimeout() {
  if (isCurrentQuestionAnswered) return;
  combo = 0;
  lives--;
  playSound("wrong");
  updateHUD();

  const dropZone = document.getElementById("drop-zone");
  if (dropZone) {
    dropZone.className = "drop-zone wrong";
    dropZone.textContent = "⏰";
  }

  setTimeout(() => {
    if (lives <= 0) {
      showGameOver();
    } else {
      nextQuestion();
    }
  }, 1200);
}

// 下一題
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= QUESTIONS_PER_GAME) {
    showLevelClear();
  } else {
    loadQuestion();
  }
}

// 更新 HUD
function updateHUD() {
  // 分數
  document.getElementById("score-text").textContent = score;

  // 生命值 Hearts
  const heartsContainer = document.getElementById("hearts-container");
  heartsContainer.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const heart = document.createElement("span");
    heart.className = `heart ${i > lives ? "lost" : ""}`;
    heart.textContent = "❤️";
    heartsContainer.appendChild(heart);
  }
}

// ==========================================
// 8. 結算與彈窗畫面
// ==========================================

function showLevelClear() {
  playSound("clear");
  const overlay = document.getElementById("modal-overlay");
  const modalClear = document.getElementById("modal-clear");
  
  overlay.classList.remove("hidden");
  modalClear.classList.remove("hidden");

  // 本地紀錄更新
  let previousHigh = highScores[currentCategory] || 0;
  if (score > previousHigh) {
    highScores[currentCategory] = score;
  }

  // 星等判定：
  // 3 顆星：剩餘 3 條命且得分高 (或是答對所有題目)
  // 2 顆星：剩餘 2 條命
  // 1 顆星：剩餘 1 條命
  let stars = 1;
  if (lives === 3) stars = 3;
  else if (lives === 2) stars = 2;

  if (stars > (starRatings[currentCategory] || 0)) {
    starRatings[currentCategory] = stars;
  }

  saveStats();

  // 更新彈窗數值
  document.getElementById("clear-score").textContent = score;
  document.getElementById("clear-highscore").textContent = highScores[currentCategory];

  // 啟動星星亮起動畫
  const starsSpans = modalClear.querySelectorAll(".modal-star");
  starsSpans.forEach((star) => star.classList.remove("active"));
  
  setTimeout(() => {
    for (let i = 1; i <= stars; i++) {
      setTimeout(() => {
        const starEl = modalClear.querySelector(`.modal-star[data-star="${i}"]`);
        if (starEl) starEl.classList.add("active");
      }, (i - 1) * 300);
    }
  }, 400);
}

function showGameOver() {
  playSound("gameover");
  const overlay = document.getElementById("modal-overlay");
  const modalGameOver = document.getElementById("modal-gameover");
  
  overlay.classList.remove("hidden");
  modalGameOver.classList.remove("hidden");

  document.getElementById("fail-score").textContent = score;
}

function hideModal() {
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-clear").classList.add("hidden");
  document.getElementById("modal-gameover").classList.add("hidden");
  document.getElementById("modal-mode-select").classList.add("hidden");
}

function exitToLobby() {
  clearInterval(timerInterval);
  hideModal();
  
  // 切換畫面
  document.getElementById("game-hud").classList.add("hidden");
  document.getElementById("game-screen").classList.add("hidden");
  document.getElementById("lobby-screen").classList.remove("hidden");

  // 重新載入大廳分數
  loadStats();
}

// ==========================================
// 學習模式邏輯
// ==========================================
let currentStudyCategory = "";
let currentFilteredLetter = "";

function startStudy(category) {
  currentStudyCategory = category;
  currentFilteredLetter = ""; // 預設顯示全部

  // 切換頁面
  document.getElementById("lobby-screen").classList.add("hidden");
  document.getElementById("study-screen").classList.remove("hidden");

  const studyData = PHONICS_DATA[category];
  document.getElementById("study-title").textContent = studyData.title;
  document.getElementById("phonics-intro").innerHTML = studyData.tips;

  // 1. 生成拼音積木
  const tilesContainer = document.getElementById("study-tiles-container");
  tilesContainer.innerHTML = "";

  // 「全部」按鈕獨立放上面
  const allTileWrapper = document.createElement("div");
  allTileWrapper.style.width = "100%";
  allTileWrapper.style.display = "flex";
  allTileWrapper.style.justifyContent = "center";
  allTileWrapper.style.marginBottom = "15px";

  const allTile = document.createElement("div");
  allTile.className = "study-tile active";
  allTile.textContent = "🌟 全部";
  allTile.addEventListener("click", () => {
    playSound("click");
    document.querySelectorAll(".study-tile").forEach(t => t.classList.remove("active"));
    allTile.classList.add("active");
    currentFilteredLetter = "";
    renderStudyWords();
  });
  allTileWrapper.appendChild(allTile);
  tilesContainer.appendChild(allTileWrapper);

  if (category === "vowels_single") {
    // 長母音列
    const longRow = document.createElement("div");
    longRow.style.width = "100%";
    longRow.style.display = "flex";
    longRow.style.gap = "14px";
    longRow.style.justifyContent = "center";
    longRow.style.alignItems = "center";
    longRow.style.marginBottom = "15px";

    const longLabel = document.createElement("div");
    longLabel.textContent = "長母音";
    longLabel.style.fontWeight = "bold";
    longLabel.style.color = "#576574";
    longLabel.style.fontSize = "1.1rem";
    longRow.appendChild(longLabel);

    ["a", "e", "i", "o", "u"].forEach(letter => {
      const tile = document.createElement("div");
      tile.className = "study-tile";
      tile.textContent = letter;
      tile.addEventListener("click", () => {
        playSound("click");
        document.querySelectorAll(".study-tile").forEach(t => t.classList.remove("active"));
        tile.classList.add("active");
        // 長母音直接發字母本身的音
        speakWord(letter);
        currentFilteredLetter = letter;
        renderStudyWords();
      });
      longRow.appendChild(tile);
    });
    tilesContainer.appendChild(longRow);

    // 短母音列
    const shortRow = document.createElement("div");
    shortRow.style.width = "100%";
    shortRow.style.display = "flex";
    shortRow.style.gap = "14px";
    shortRow.style.justifyContent = "center";
    shortRow.style.alignItems = "center";

    const shortLabel = document.createElement("div");
    shortLabel.textContent = "短母音";
    shortLabel.style.fontWeight = "bold";
    shortLabel.style.color = "#576574";
    shortLabel.style.fontSize = "1.1rem";
    shortRow.appendChild(shortLabel);

    ["a", "e", "i", "o", "u"].forEach(letter => {
      const tile = document.createElement("div");
      tile.className = "study-tile";
      tile.textContent = letter;
      tile.addEventListener("click", () => {
        playSound("click");
        document.querySelectorAll(".study-tile").forEach(t => t.classList.remove("active"));
        tile.classList.add("active");
        speakWord(studyData.sounds[letter] || letter);
        currentFilteredLetter = letter;
        renderStudyWords();
      });
      shortRow.appendChild(tile);
    });
    tilesContainer.appendChild(shortRow);

  } else {
    // 預設 (雙母音或子音) 的生成方式
    const defaultRow = document.createElement("div");
    defaultRow.style.width = "100%";
    defaultRow.style.display = "flex";
    defaultRow.style.gap = "14px";
    defaultRow.style.justifyContent = "center";
    defaultRow.style.flexWrap = "wrap";

    const allWords = WORD_DATABASE[category];
    const uniqueLetters = [...new Set(allWords.map(w => w.missing))];

    uniqueLetters.forEach(letter => {
      const tile = document.createElement("div");
      tile.className = "study-tile";
      tile.textContent = letter;

      tile.addEventListener("click", () => {
        playSound("click");
        document.querySelectorAll(".study-tile").forEach(t => t.classList.remove("active"));
        tile.classList.add("active");

        const guideText = studyData.sounds[letter] || `${letter} says Phonics sound`;
        speakWord(guideText);

        currentFilteredLetter = letter;
        renderStudyWords();
      });

      defaultRow.appendChild(tile);
    });
    
    tilesContainer.appendChild(defaultRow);
  }

  // 2. 渲染單字發音卡
  renderStudyWords();
}

function renderStudyWords() {
  const container = document.getElementById("study-words-container");
  container.innerHTML = "";

  const words = WORD_DATABASE[currentStudyCategory];
  // 篩選單字
  const displayWords = currentFilteredLetter 
    ? words.filter(w => w.missing === currentFilteredLetter) 
    : words;

  displayWords.forEach(word => {
    const card = document.createElement("div");
    card.className = "study-word-card";

    // 格式化單字，高亮目標拼音部分（如 cl<u>ou</u>d）
    const highlightedHtml = `${word.clue[0]}<u>${word.missing}</u>${word.clue[1]}`;

    card.innerHTML = `
      <div class="study-word-text">${highlightedHtml}</div>
      <div class="study-word-speaker">🔊</div>
    `;

    card.addEventListener("click", () => {
      speakWord(word.word);
    });

    container.appendChild(card);
  });
}

function exitStudyToLobby() {
  document.getElementById("study-screen").classList.add("hidden");
  document.getElementById("lobby-screen").classList.remove("hidden");
}

function exitStudyToGame() {
  document.getElementById("study-screen").classList.add("hidden");
  startGame(currentStudyCategory);
}

// ==========================================
// 9. 輔助函式 (Fisher-Yates Shuffle)
// ==========================================
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 初始化啟動
window.addEventListener("DOMContentLoaded", init);

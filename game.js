// 拼磚塊大冒險 - 遊戲核心邏輯

// ==========================================
// 1. 題庫資料集
// ==========================================
const WORD_DATABASE = {
  // ① 短母音：單母音 a/e/i/o/u 的短音；pattern = CVC（子母子）或 VC（母子）
  short_vowels: [
    // a /æ/
    { word: "cat", missing: "a", vowel: "a", pattern: "CVC", clue: ["c", "t"] },
    { word: "map", missing: "a", vowel: "a", pattern: "CVC", clue: ["m", "p"] },
    { word: "bag", missing: "a", vowel: "a", pattern: "CVC", clue: ["b", "g"] },
    { word: "at",  missing: "a", vowel: "a", pattern: "VC",  clue: ["", "t"] },
    { word: "an",  missing: "a", vowel: "a", pattern: "VC",  clue: ["", "n"] },
    // e /ɛ/
    { word: "pen", missing: "e", vowel: "e", pattern: "CVC", clue: ["p", "n"] },
    { word: "bed", missing: "e", vowel: "e", pattern: "CVC", clue: ["b", "d"] },
    { word: "ten", missing: "e", vowel: "e", pattern: "CVC", clue: ["t", "n"] },
    { word: "egg", missing: "e", vowel: "e", pattern: "VC",  clue: ["", "gg"] },
    { word: "end", missing: "e", vowel: "e", pattern: "VC",  clue: ["", "nd"] },
    // i /ɪ/
    { word: "pig", missing: "i", vowel: "i", pattern: "CVC", clue: ["p", "g"] },
    { word: "sit", missing: "i", vowel: "i", pattern: "CVC", clue: ["s", "t"] },
    { word: "six", missing: "i", vowel: "i", pattern: "CVC", clue: ["s", "x"] },
    { word: "in",  missing: "i", vowel: "i", pattern: "VC",  clue: ["", "n"] },
    { word: "it",  missing: "i", vowel: "i", pattern: "VC",  clue: ["", "t"] },
    // o /ɑ/
    { word: "hot", missing: "o", vowel: "o", pattern: "CVC", clue: ["h", "t"] },
    { word: "dog", missing: "o", vowel: "o", pattern: "CVC", clue: ["d", "g"] },
    { word: "box", missing: "o", vowel: "o", pattern: "CVC", clue: ["b", "x"] },
    { word: "on",  missing: "o", vowel: "o", pattern: "VC",  clue: ["", "n"] },
    { word: "ox",  missing: "o", vowel: "o", pattern: "VC",  clue: ["", "x"] },
    // u /ʌ/
    { word: "cup", missing: "u", vowel: "u", pattern: "CVC", clue: ["c", "p"] },
    { word: "sun", missing: "u", vowel: "u", pattern: "CVC", clue: ["s", "n"] },
    { word: "bus", missing: "u", vowel: "u", pattern: "CVC", clue: ["b", "s"] },
    { word: "up",  missing: "u", vowel: "u", pattern: "VC",  clue: ["", "p"] },
    { word: "us",  missing: "u", vowel: "u", pattern: "VC",  clue: ["", "s"] }
  ],
  // ② 長母音：母音唸自己的名字；vowel = 長A/E/I/O/U；spelling = 拼法；adv = 進階(冷僻拼法)
  long_vowels: [
    // 長 A /eɪ/
    { word: "rain",  missing: "ai",   vowel: "a", spelling: "ai",   adv: false, clue: ["r", "n"] },
    { word: "train", missing: "ai",   vowel: "a", spelling: "ai",   adv: false, clue: ["tr", "n"] },
    { word: "day",   missing: "ay",   vowel: "a", spelling: "ay",   adv: false, clue: ["d", ""] },
    { word: "play",  missing: "ay",   vowel: "a", spelling: "ay",   adv: false, clue: ["pl", ""] },
    { word: "cake",  missing: "a",    vowel: "a", spelling: "a_e",  adv: false, clue: ["c", "ke"] },
    { word: "name",  missing: "a",    vowel: "a", spelling: "a_e",  adv: false, clue: ["n", "me"] },
    { word: "eight", missing: "eigh", vowel: "a", spelling: "eigh", adv: true,  clue: ["", "t"] },
    { word: "weigh", missing: "eigh", vowel: "a", spelling: "eigh", adv: true,  clue: ["w", ""] },
    { word: "vein",  missing: "ei",   vowel: "a", spelling: "ei",   adv: true,  clue: ["v", "n"] },
    { word: "they",  missing: "ey",   vowel: "a", spelling: "ey",   adv: true,  clue: ["th", ""] },
    // 長 E /i/
    { word: "see",   missing: "ee",   vowel: "e", spelling: "ee",   adv: false, clue: ["s", ""] },
    { word: "tree",  missing: "ee",   vowel: "e", spelling: "ee",   adv: false, clue: ["tr", ""] },
    { word: "eat",   missing: "ea",   vowel: "e", spelling: "ea",   adv: false, clue: ["", "t"] },
    { word: "sea",   missing: "ea",   vowel: "e", spelling: "ea",   adv: false, clue: ["s", ""] },
    { word: "he",    missing: "e",    vowel: "e", spelling: "open", adv: false, clue: ["h", ""] },
    { word: "she",   missing: "e",    vowel: "e", spelling: "open", adv: false, clue: ["sh", ""] },
    { word: "thief", missing: "ie",   vowel: "e", spelling: "ie",   adv: true,  clue: ["th", "f"] },
    { word: "field", missing: "ie",   vowel: "e", spelling: "ie",   adv: true,  clue: ["f", "ld"] },
    { word: "key",   missing: "ey",   vowel: "e", spelling: "ey",   adv: true,  clue: ["k", ""] },
    { word: "receive", missing: "ei", vowel: "e", spelling: "ei",   adv: true,  clue: ["rec", "ve"] },
    // 長 I /aɪ/
    { word: "high",  missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["h", ""] },
    { word: "night", missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["n", "t"] },
    { word: "light", missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["l", "t"] },
    { word: "bike",  missing: "i",    vowel: "i", spelling: "i_e",  adv: false, clue: ["b", "ke"] },
    { word: "kite",  missing: "i",    vowel: "i", spelling: "i_e",  adv: false, clue: ["k", "te"] },
    { word: "pie",   missing: "ie",   vowel: "i", spelling: "ie",   adv: true,  clue: ["p", ""] },
    { word: "tie",   missing: "ie",   vowel: "i", spelling: "ie",   adv: true,  clue: ["t", ""] },
    // 長 O /oʊ/
    { word: "boat",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["b", "t"] },
    { word: "road",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["r", "d"] },
    { word: "goat",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["g", "t"] },
    { word: "home",  missing: "o",    vowel: "o", spelling: "o_e",  adv: false, clue: ["h", "me"] },
    { word: "nose",  missing: "o",    vowel: "o", spelling: "o_e",  adv: false, clue: ["n", "se"] },
    { word: "go",    missing: "o",    vowel: "o", spelling: "open", adv: false, clue: ["g", ""] },
    { word: "no",    missing: "o",    vowel: "o", spelling: "open", adv: false, clue: ["n", ""] },
    { word: "toe",   missing: "oe",   vowel: "o", spelling: "oe",   adv: true,  clue: ["t", ""] },
    // 長 U /(j)u/
    { word: "new",   missing: "ew",   vowel: "u", spelling: "ew",   adv: false, clue: ["n", ""] },
    { word: "few",   missing: "ew",   vowel: "u", spelling: "ew",   adv: false, clue: ["f", ""] },
    { word: "blue",  missing: "ue",   vowel: "u", spelling: "ue",   adv: false, clue: ["bl", ""] },
    { word: "due",   missing: "ue",   vowel: "u", spelling: "ue",   adv: false, clue: ["d", ""] },
    { word: "cute",  missing: "u",    vowel: "u", spelling: "u_e",  adv: false, clue: ["c", "te"] },
    { word: "cube",  missing: "u",    vowel: "u", spelling: "u_e",  adv: false, clue: ["c", "be"] },
    { word: "euro",  missing: "eu",   vowel: "u", spelling: "eu",   adv: true,  clue: ["", "ro"] },
    { word: "neutral", missing: "eu", vowel: "u", spelling: "eu",   adv: true,  clue: ["n", "tral"] }
  ],
  // ③ 特殊母音：雙母音/滑音 + oo 雙拼；g = 依發音分組（給表格用）
  special_vowels: [
    // /aʊ/ 凹（澳）
    { word: "cloud", missing: "ou", g: "loud", clue: ["cl", "d"] },
    { word: "house", missing: "ou", g: "loud", clue: ["h", "se"] },
    { word: "mouth", missing: "ou", g: "loud", clue: ["m", "th"] },
    { word: "cow",   missing: "ow", g: "loud", clue: ["c", ""] },
    { word: "town",  missing: "ow", g: "loud", clue: ["t", "n"] },
    { word: "flower",missing: "ow", g: "loud", clue: ["fl", "er"] },
    // /ɔ/ 喔
    { word: "autumn",missing: "au", g: "saw", clue: ["", "tumn"] },
    { word: "sauce", missing: "au", g: "saw", clue: ["s", "ce"] },
    { word: "draw",  missing: "aw", g: "saw", clue: ["dr", ""] },
    { word: "paw",   missing: "aw", g: "saw", clue: ["p", ""] },
    { word: "straw", missing: "aw", g: "saw", clue: ["str", ""] },
    // /ʊ/ 嗚（短）
    { word: "book",  missing: "oo", g: "book", clue: ["b", "k"] },
    { word: "foot",  missing: "oo", g: "book", clue: ["f", "t"] },
    { word: "good",  missing: "oo", g: "book", clue: ["g", "d"] },
    { word: "wood",  missing: "oo", g: "book", clue: ["w", "d"] },
    // /u/ 嗚（長）
    { word: "zoo",   missing: "oo", g: "moon", clue: ["z", ""] },
    { word: "moon",  missing: "oo", g: "moon", clue: ["m", "n"] },
    { word: "boot",  missing: "oo", g: "moon", clue: ["b", "t"] },
    // /ɔɪ/ 歐一
    { word: "coin",  missing: "oi", g: "coin", clue: ["c", "n"] },
    { word: "point", missing: "oi", g: "coin", clue: ["p", "nt"] },
    { word: "soil",  missing: "oi", g: "coin", clue: ["s", "l"] },
    { word: "toy",   missing: "oy", g: "coin", clue: ["t", ""] },
    { word: "boy",   missing: "oy", g: "coin", clue: ["b", ""] },
    { word: "joy",   missing: "oy", g: "coin", clue: ["j", ""] }
  ],
  // ④ 弱化母音 schwa /ə/：schwa = 唸輕聲那個母音的字元索引(0-based)；
  //    syll = 音節拆解（接起來等於 word）；weak = 輕音節（含 schwa）的索引
  schwa: [
    { word: "sofa",    schwa: 3, syll: ["so", "fa"],    weak: 1, zh: "沙發" },
    { word: "lemon",   schwa: 3, syll: ["lem", "on"],   weak: 1, zh: "檸檬" },
    { word: "panda",   schwa: 4, syll: ["pan", "da"],   weak: 1, zh: "熊貓" },
    { word: "zebra",   schwa: 4, syll: ["ze", "bra"],   weak: 1, zh: "斑馬" },
    { word: "pencil",  schwa: 4, syll: ["pen", "cil"],  weak: 1, zh: "鉛筆" },
    { word: "salad",   schwa: 3, syll: ["sal", "ad"],   weak: 1, zh: "沙拉" },
    { word: "seven",   schwa: 3, syll: ["sev", "en"],   weak: 1, zh: "七" },
    { word: "open",    schwa: 2, syll: ["o", "pen"],    weak: 1, zh: "打開" },
    { word: "garden",  schwa: 4, syll: ["gar", "den"],  weak: 1, zh: "花園" },
    { word: "problem", schwa: 5, syll: ["prob", "lem"], weak: 1, zh: "問題" },
    { word: "about",   schwa: 0, syll: ["a", "bout"],   weak: 0, zh: "關於" },
    { word: "wagon",   schwa: 3, syll: ["wag", "on"],   weak: 1, zh: "貨車" }
  ],
  consonants: [
    { word: "ship", missing: "sh", clue: ["", "ip"] },
    { word: "shop", missing: "sh", clue: ["", "op"] },
    { word: "dish", missing: "sh", clue: ["di", ""] },
    { word: "chip", missing: "ch", clue: ["", "ip"] },
    { word: "chair", missing: "ch", clue: ["", "air"] },
    { word: "peach", missing: "ch", clue: ["pea", ""] },
    { word: "three", missing: "th [θ]", clue: ["", "ree"] },
    { word: "thin", missing: "th [θ]", clue: ["", "in"] },
    { word: "bath", missing: "th [θ]", clue: ["ba", ""] },
    { word: "this", missing: "th [ð]", clue: ["", "is"] },
    { word: "that", missing: "th [ð]", clue: ["", "at"] },
    { word: "brother", missing: "th [ð]", clue: ["bro", "er"] },
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
  short_vowels: {
    title: "短母音組 📖 學習樂園",
    tips: "短母音 a, e, i, o, u 是<b>又短又輕</b>的聲音，最常出現在兩種結構裡：<br>• <b>子母子</b>：c<u>a</u>t、p<u>e</u>n、p<u>i</u>g<br>• <b>母子</b>：<u>a</u>t、<u>i</u>n、<u>u</u>p<br>💡 小提醒：英文還有一個「偷懶的母音」schwa /ə/，沒重音的母音常弱化成它（像 sofa 的 a），那是另一區「弱化母音」要練的喔！",
    // 短音近似音（給長/短對照表與點字母發音用）
    // 採用 GitHub 已驗證的單母音值：a="a"(/æ/誒)、i="yi"(一)
    sounds: { a: "a", e: "eh", i: "yi", o: "ah", u: "uh" }
  },
  long_vowels: {
    title: "長母音組 📖 學習樂園",
    tips: "長母音就是「<b>母音在唸自己的名字</b>」（a→/eɪ/、e→/i/、i→/aɪ/、o→/oʊ/、u→/juː/）。常見三種形式：<br>• <b>子音＋長母音＋子音</b>：r<u>ai</u>n、b<u>oa</u>t<br>• <b>子音＋長母音</b>：s<u>ay</u>、h<u>e</u>、g<u>o</u><br>• <b>Magic-e（無聲 e）</b>：c<u>a</u>ke、b<u>i</u>ke、h<u>o</u>me（字尾的 e 不發音，卻讓前面的母音唸出名字！）<br>先看基礎拼法，想看更多奇特拼法再點「進階」💪",
    // 長母音 = 字母念自己的名字；用會念出字母名又不會多唸 "capital" 的拼法
    // 長A：直接沿用短母音 A 的 "a"（在 TTS 上唸出的音正是要的長 A），取代會發成「哎」的 "ay"
    sounds: { a: "a", e: "ee", i: "eye", o: "oh", u: "you" }
  },
  special_vowels: {
    title: "特殊母音組 📖 學習樂園",
    tips: "這些是<b>滑來滑去的特殊母音</b>，兩個字母合出一個新的音。下面的表格把<b>發音相同的拼法排在同一列</b>，點「發音」欄或字母聽聽看，點單字聽整個字。<br>⚠️ 注意 <b>oo</b> 有兩個音：zoo 的長『嗚』/u/ vs book 的短『嗚』/ʊ/，所以分成兩列喔！",
    // 依「發音」分組，給學習樂園表格用；say 是給 TTS 念的近似音
    groups: [
      { id: "loud", ipa: "/aʊ/", note: "凹（澳）", say: "ow",  combos: ["ou", "ow"] },
      { id: "saw",  ipa: "/ɔ/",  note: "喔",       say: "aw",  combos: ["au", "aw"] },
      { id: "book", ipa: "/ʊ/",  note: "嗚（短）", say: "oo",  combos: ["oo"] },
      { id: "moon", ipa: "/u/",  note: "嗚（長）", say: "ooh", combos: ["oo"] },
      { id: "coin", ipa: "/ɔɪ/", note: "歐一",     say: "oy",  combos: ["oi", "oy"] }
    ]
  },
  schwa: {
    title: "弱化母音 schwa /ə/ 📖 學習樂園",
    tips: "schwa /ə/ 是英文裡<b>最常出現、最偷懶</b>的母音！當一個音節<b>沒有重音</b>時，裡面的母音常會「偷懶」唸成輕輕的「ㄜ／uh」，不管它本來是 a, e, i, o, u 都一樣。<br>例如 <b>sofa</b> 的 a、<b>lemon</b> 的 o、<b>pencil</b> 的 i——它們都唸 /ə/。<br>👇 聽聽看，找出每個單字裡那個「偷懶的母音」！"
  },
  consonants: {
    title: "子音與輔音群 📖 學習樂園",
    tips: "子音組合有時會<b>發出一個全新的音</b>（如 sh, ch, th, ph, wh），有時則是兩個字母的<b>發音快速滑過去</b>（如 tr, dr, br, cr）。例如：<br>• <b>sh</b> 發 /ʃ/（像叫人安靜的『噓』，如 ship）<br>• <b>ch</b> 發 /tʃ/（像火車『七』，如 chip）<br>• <b>th [θ]</b> 發無聲的 /θ/（要把舌頭夾在牙齒中間發音喔，如 three）<br>• <b>th [ð]</b> 發有聲的 /ð/（喉嚨會震動，如 this）<br>• <b>ph</b> 發 /f/（發『夫』的音，如 phone）<br>• <b>wh</b> 發 /w/ (發『烏』，如 whale)<br>• <b>tr</b> /tr/, <b>dr</b> /dr/, <b>br</b> /br/, <b>cr</b> /cr/ 則是把兩個聲母連著快速唸出來！",
    sounds: {
      sh: "shh",
      ch: "chuh",
      "th [θ]": "thuh",
      "th [ð]": "the",
      ph: "fuh",
      wh: "wuh",
      tr: "truh",
      dr: "druh",
      br: "bruh",
      cr: "cruh"
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
let isEasyMode = true;
let gamePool = []; // 本局出題用的題庫（長母音只取基礎字）

// 五大分類
const CATEGORY_KEYS = ["short_vowels", "long_vowels", "special_vowels", "schwa", "consonants"];

// 儲存至本地的資料
let highScores = { short_vowels: 0, long_vowels: 0, special_vowels: 0, schwa: 0, consonants: 0 };
let starRatings = { short_vowels: 0, long_vowels: 0, special_vowels: 0, schwa: 0, consonants: 0 };

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
    const savedHigh = localStorage.getItem("block_puzzle_highscores_v2");
    if (savedHigh) {
      highScores = Object.assign(highScores, JSON.parse(savedHigh));
    }
    const savedStars = localStorage.getItem("block_puzzle_stars_v2");
    if (savedStars) {
      starRatings = Object.assign(starRatings, JSON.parse(savedStars));
    }
  } catch (e) {
    console.error("無法載入本地存檔:", e);
  }

  // 更新大廳 UI 數值
  CATEGORY_KEYS.forEach((cat) => {
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
    localStorage.setItem("block_puzzle_highscores_v2", JSON.stringify(highScores));
    localStorage.setItem("block_puzzle_stars_v2", JSON.stringify(starRatings));
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
      // 弱化母音沒有拼字挑戰，直接進專屬學習頁（含聽音找輕聲練習）
      if (selectedCategory === "schwa") {
        startStudy("schwa");
      } else {
        showModeSelect();
      }
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

  document.getElementById("btn-mode-play-easy").addEventListener("click", () => {
    playSound("click");
    hideModal();
    isEasyMode = true;
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
  
  // 設定本局題庫：長母音只用「基礎」字，進階冷僻字不進遊戲
  gamePool = WORD_DATABASE[category];
  if (category === "long_vowels") {
    gamePool = gamePool.filter((w) => !w.adv);
  }

  // 隨機選出 10 題
  currentQuestions = shuffleArray([...gamePool]).slice(0, QUESTIONS_PER_GAME);

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

  // 自動發音 (僅限簡單模式)
  const btnSpeakCloud = document.getElementById("btn-speak");
  if (isEasyMode) {
    btnSpeakCloud.style.display = "flex"; // 顯示按鈕
    setTimeout(() => {
      speakWord(currentQ.word);
    }, 300);
  } else {
    btnSpeakCloud.style.display = "none"; // 隱藏按鈕
  }

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

  // 根據本局題庫撈取合適的混淆字母
  const possibleAnswers = gamePool.map((q) => q.missing);

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
    const displayLetter = letter.replace(/ \[.*?\]/, "");
    dropZone.textContent = displayLetter;
    dropZone.className = "drop-zone correct";
    updateHUD();

    // 觸發 Combo 動畫
    const comboBadge = document.getElementById("combo-badge");
    if (combo >= 3) {
      comboBadge.textContent = `Combo x${combo}! 🔥`;
      comboBadge.classList.add("show");
    }

    // 播放發音 (僅限簡單模式，或過關後給予回饋)
    if (isEasyMode) {
      speakWord(currentQ.word);
    }

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

  const tilesContainer = document.getElementById("study-tiles-container");
  const tilesPrompt = document.getElementById("study-tiles-prompt");
  const wordsSection = document.getElementById("study-words-section");
  const startBtn = document.getElementById("btn-study-start-game");

  // 預設：隱藏舊版「積木 + 單字卡」、把 tiles 區當成自由畫布、顯示挑戰鈕
  tilesPrompt.style.display = "none";
  wordsSection.style.display = "none";
  tilesContainer.style.display = "block";
  tilesContainer.style.flexWrap = "";
  tilesContainer.innerHTML = "";
  startBtn.style.display = "";

  if (category === "short_vowels") { renderShortVowels(studyData); return; }
  if (category === "long_vowels") { renderLongVowels(studyData); return; }
  if (category === "special_vowels") { renderSpecialVowelTable(studyData); return; }
  if (category === "schwa") {
    startBtn.style.display = "none"; // 弱化母音的練習就在本頁，沒有拼字挑戰
    renderSchwa(studyData);
    return;
  }

  // consonants：維持原本「積木 + 單字卡」模式
  tilesPrompt.style.display = "";
  wordsSection.style.display = "";
  tilesContainer.style.display = "flex";
  tilesContainer.style.flexWrap = "wrap";
  renderConsonantTiles(category, studyData);
  renderStudyWords();
}

// ---- 共用小工具 ----
// 單字 chip：高亮目標拼法（如 cl<u>ou</u>d）並可點擊發音
function wordChipHtml(w) {
  const before = w.clue[0];
  const after = w.clue[1];
  return `<span class="word-chip" data-word="${w.word}">${before}<u>${w.missing.replace(/ \[.*?\]/, "")}</u>${after} 🔊</span>`;
}

// 把長母音拼法轉成好懂的標籤
function spellLabel(spelling) {
  if (spelling === "open") return "子音＋母音";
  if (/^[aeiou]_e$/.test(spelling)) return spelling + "（magic-e）";
  return spelling;
}

// 綁定容器內所有 .word-chip 的點擊發音
function bindWordChips(container) {
  container.querySelectorAll(".word-chip").forEach((el) => {
    el.addEventListener("click", () => speakWord(el.getAttribute("data-word")));
  });
}

// ---- 長/短母音對照表（兩頁共用，active 那一排會加框） ----
// 短母音用「近似音素」拼法讓 TTS 直接念短音（不是念整個單字）。
// 注意：e/o/u 念得較準；a(/æ/) 與 i(/ɪ/) 是 TTS 弱點，只能盡量近似。
const SHORT_VOWEL_DEMO = { a: "a", e: "eh", i: "yi", o: "ah", u: "uh" };

function renderVowelCompare(activeType) {
  const wrap = document.createElement("div");
  wrap.className = "vowel-compare";

  const rows = [
    { type: "long",  label: "長母音", cls: "long-vowel",  sounds: PHONICS_DATA.long_vowels.sounds },
    { type: "short", label: "短母音", cls: "short-vowel", sounds: SHORT_VOWEL_DEMO }
  ];

  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = "vc-row" + (r.type === activeType ? " vc-active" : "");

    const label = document.createElement("div");
    label.className = "vc-label";
    label.innerHTML = r.type === activeType
      ? `${r.label}<span class="vc-badge">本單元</span>`
      : r.label;
    row.appendChild(label);

    ["a", "e", "i", "o", "u"].forEach((v) => {
      const tile = document.createElement("div");
      tile.className = `study-tile ${r.cls}`;
      tile.textContent = v;
      tile.addEventListener("click", () => {
        playSound("click");
        speakWord(r.sounds[v] || v);
      });
      row.appendChild(tile);
    });

    wrap.appendChild(row);
  });

  return wrap;
}

// ---- ① 短母音頁 ----
function renderShortVowels(studyData) {
  const c = document.getElementById("study-tiles-container");

  c.appendChild(renderVowelCompare("short"));

  const vowels = [
    { v: "a", name: "短 A /æ/" },
    { v: "e", name: "短 E /ɛ/" },
    { v: "i", name: "短 I /ɪ/" },
    { v: "o", name: "短 O /ɑ/" },
    { v: "u", name: "短 U /ʌ/" }
  ];

  vowels.forEach(({ v, name }) => {
    const words = WORD_DATABASE.short_vowels.filter((w) => w.vowel === v);
    const cvc = words.filter((w) => w.pattern === "CVC");
    const vc = words.filter((w) => w.pattern === "VC");

    const group = document.createElement("div");
    group.className = "vgroup";
    group.innerHTML = `
      <div class="vgroup-head short-head" data-say="${SHORT_VOWEL_DEMO[v] || v}">${name} 🔊</div>
      <div class="vgroup-body">
        <div class="patt-row">
          <span class="patt-tag tag-cvc">子母子</span>
          <div class="chips">${cvc.map(wordChipHtml).join("")}</div>
        </div>
        <div class="patt-row">
          <span class="patt-tag tag-vc">母子</span>
          <div class="chips">${vc.map(wordChipHtml).join("")}</div>
        </div>
      </div>
    `;
    c.appendChild(group);
  });

  // 互動：點母音標頭發短音、點單字發音
  c.querySelectorAll(".vgroup-head").forEach((el) => {
    el.addEventListener("click", () => {
      playSound("click");
      speakWord(el.getAttribute("data-say"));
    });
  });
  bindWordChips(c);
}

// ---- ② 長母音頁（基礎 + 進階按鈕） ----
function renderLongVowels(studyData) {
  const c = document.getElementById("study-tiles-container");

  c.appendChild(renderVowelCompare("long"));

  // 進階切換鈕
  const advBtn = document.createElement("button");
  advBtn.id = "btn-advanced";
  advBtn.className = "btn-advanced";
  advBtn.textContent = "🔒 進階拼法（點我展開）";
  advBtn.addEventListener("click", () => {
    playSound("click");
    const on = c.classList.toggle("show-adv");
    advBtn.textContent = on ? "🔓 進階拼法（點我收合）" : "🔒 進階拼法（點我展開）";
  });
  c.appendChild(advBtn);

  const vowels = [
    { v: "a", name: "長 A /eɪ/" },
    { v: "e", name: "長 E /iː/" },
    { v: "i", name: "長 I /aɪ/" },
    { v: "o", name: "長 O /oʊ/" },
    { v: "u", name: "長 U /juː/" }
  ];

  vowels.forEach(({ v, name }) => {
    const words = WORD_DATABASE.long_vowels.filter((w) => w.vowel === v);

    // 依 spelling 分組，保留原始順序
    const order = [];
    const bySpell = {};
    words.forEach((w) => {
      if (!bySpell[w.spelling]) { bySpell[w.spelling] = []; order.push(w.spelling); }
      bySpell[w.spelling].push(w);
    });

    const rowsHtml = order.map((sp) => {
      const list = bySpell[sp];
      const isAdv = list[0].adv;
      return `
        <div class="patt-row${isAdv ? " adv-row" : ""}">
          <span class="patt-tag tappable ${isAdv ? "tag-adv" : "tag-basic"}" data-say="${studyData.sounds[v] || v}">${spellLabel(sp)} 🔊</span>
          <div class="chips">${list.map(wordChipHtml).join("")}</div>
        </div>`;
    }).join("");

    const group = document.createElement("div");
    group.className = "vgroup";
    group.innerHTML = `
      <div class="vgroup-head long-head" data-say="${studyData.sounds[v] || v}">${name} 🔊</div>
      <div class="vgroup-body">${rowsHtml}</div>
    `;
    c.appendChild(group);
  });

  c.querySelectorAll(".vgroup-head").forEach((el) => {
    el.addEventListener("click", () => {
      playSound("click");
      speakWord(el.getAttribute("data-say"));
    });
  });
  // 點前面的拼法標籤 → 念該母音的長音（ai/ay/a_e… 都念同一個長音）
  c.querySelectorAll(".patt-tag[data-say]").forEach((el) => {
    el.addEventListener("click", () => {
      playSound("click");
      speakWord(el.getAttribute("data-say"));
    });
  });
  bindWordChips(c);
}

// ---- ③ 特殊母音：依發音分組的表格 ----
function renderSpecialVowelTable(studyData) {
  const container = document.getElementById("study-tiles-container");

  const table = document.createElement("table");
  table.className = "vowel-table";
  table.innerHTML = `
    <thead>
      <tr><th>發音</th><th>字母組合</th><th>範例單字（點一下聽發音）</th></tr>
    </thead>
    <tbody></tbody>
  `;
  const tbody = table.querySelector("tbody");

  studyData.groups.forEach((g) => {
    const words = WORD_DATABASE.special_vowels.filter((w) => w.g === g.id);

    const combosHtml = g.combos
      .map((cmb) => `<span class="vt-combo" data-say="${g.say}">${cmb}</span>`)
      .join("");

    const wordsHtml = words
      .map((w) => `<span class="vt-word" data-word="${w.word}">${w.clue[0]}<u>${w.missing}</u>${w.clue[1]} 🔊</span>`)
      .join("");

    const tr = document.createElement("tr");
    tr.className = `vt-row vt-row-${g.id}`;
    tr.innerHTML = `
      <td class="vt-sound" data-say="${g.say}">
        <span class="vt-ipa">${g.ipa}</span>
        <span class="vt-note">${g.note}</span>
      </td>
      <td class="vt-combos">${combosHtml}</td>
      <td class="vt-words">${wordsHtml}</td>
    `;
    tbody.appendChild(tr);
  });

  container.appendChild(table);

  container.querySelectorAll(".vt-sound, .vt-combo").forEach((el) => {
    el.addEventListener("click", () => {
      playSound("click");
      speakWord(el.getAttribute("data-say"));
    });
  });
  container.querySelectorAll(".vt-word").forEach((el) => {
    el.addEventListener("click", () => {
      speakWord(el.getAttribute("data-word"));
    });
  });
}

// ---- ④ 弱化母音 schwa：教學示範 + 聽音找輕聲 ----
let schwaOrder = [];
let schwaIdx = 0;
let schwaScore = 0;
let schwaAnswered = false;

function isVowelChar(ch) {
  return "aeiou".includes(ch.toLowerCase());
}

// 把單字拆字元；schwa 位置加紅；asButtons 時母音是可點按鈕
function schwaWordNode(item, opts) {
  const o = opts || {};
  const node = document.createElement("div");
  node.className = "schwa-word";
  [...item.word].forEach((ch, i) => {
    let el;
    if (o.asButtons && isVowelChar(ch)) {
      el = document.createElement("button");
      el.className = "schwa-char schwa-vbtn";
      el.dataset.i = i;
    } else {
      el = document.createElement("span");
      el.className = "schwa-char";
    }
    el.textContent = ch;
    if (o.highlight && i === item.schwa) el.classList.add("schwa-target");
    node.appendChild(el);
  });
  return node;
}

let schwaMode = "learn";

function renderSchwa(studyData) {
  const c = document.getElementById("study-tiles-container");
  schwaMode = "learn";

  // 模式分頁
  const tabs = document.createElement("div");
  tabs.className = "schwa-mode-tabs";
  tabs.innerHTML = `
    <button class="schwa-tab" data-mode="learn">📖 學習模式</button>
    <button class="schwa-tab" data-mode="practice">🎮 練習模式</button>
  `;
  c.appendChild(tabs);

  const content = document.createElement("div");
  content.id = "schwa-content";
  c.appendChild(content);

  const setMode = (mode) => {
    schwaMode = mode;
    tabs.querySelectorAll(".schwa-tab").forEach((b) =>
      b.classList.toggle("active", b.dataset.mode === mode)
    );
    if (mode === "learn") renderSchwaLearn();
    else renderSchwaPractice();
  };

  tabs.querySelectorAll(".schwa-tab").forEach((b) => {
    b.addEventListener("click", () => {
      playSound("click");
      setMode(b.dataset.mode);
    });
  });

  setMode("learn");
}

// 學習模式：單字音節拆解，標出哪個音節／母音發 /ə/
function renderSchwaLearn() {
  const content = document.getElementById("schwa-content");
  content.innerHTML = `<p class="schwa-learn-tip">每個單字都拆成音節，<b>灰色</b>是沒重音的「輕音節」，裡面那個<b style="color:#e74c3c">紅色</b>母音就偷懶唸成 /ə/。點卡片可以聽發音！</p>`;

  const grid = document.createElement("div");
  grid.className = "schwa-learn-grid";

  WORD_DATABASE.schwa.forEach((item) => {
    const card = document.createElement("div");
    card.className = "schwa-learn-card";
    card.appendChild(schwaSyllNode(item));

    const note = document.createElement("div");
    note.className = "sl-note";
    const weakSyll = item.syll[item.weak];
    const schwaChar = item.word[item.schwa];
    note.innerHTML = `輕音節「<b>${weakSyll}</b>」的 <b>${schwaChar}</b> → /ə/`;
    card.appendChild(note);

    const meta = document.createElement("div");
    meta.className = "schwa-zh";
    meta.textContent = `${item.zh} 🔊`;
    card.appendChild(meta);

    card.addEventListener("click", () => speakWord(item.word));
    grid.appendChild(card);
  });

  content.appendChild(grid);
}

// 依音節拆解成節點：輕音節加灰底、schwa 母音標紅
function schwaSyllNode(item) {
  const node = document.createElement("div");
  node.className = "schwa-word sl-break";
  let offset = 0;
  item.syll.forEach((syl, si) => {
    if (si > 0) {
      const sep = document.createElement("span");
      sep.className = "sl-dot";
      sep.textContent = "·";
      node.appendChild(sep);
    }
    const sylSpan = document.createElement("span");
    sylSpan.className = "sl-syll" + (si === item.weak ? " sl-weak" : "");
    [...syl].forEach((ch, ci) => {
      const charSpan = document.createElement("span");
      charSpan.className = "schwa-char";
      if (offset + ci === item.schwa) charSpan.classList.add("schwa-target");
      charSpan.textContent = ch;
      sylSpan.appendChild(charSpan);
    });
    node.appendChild(sylSpan);
    offset += syl.length;
  });
  return node;
}

// 練習模式：聽音找輕聲
function renderSchwaPractice() {
  const content = document.getElementById("schwa-content");
  content.innerHTML = "";
  const quiz = document.createElement("div");
  quiz.className = "schwa-quiz";
  quiz.id = "schwa-quiz";
  content.appendChild(quiz);
  startSchwaQuiz();
}

function startSchwaQuiz() {
  schwaOrder = shuffleArray([...WORD_DATABASE.schwa]);
  schwaIdx = 0;
  schwaScore = 0;
  loadSchwaQuestion();
}

function loadSchwaQuestion() {
  const quiz = document.getElementById("schwa-quiz");
  if (!quiz) return;

  if (schwaIdx >= schwaOrder.length) {
    renderSchwaResult();
    return;
  }

  schwaAnswered = false;
  const item = schwaOrder[schwaIdx];

  quiz.innerHTML = `
    <div class="schwa-quiz-head">
      <span>🎧 聽音找輕聲　第 ${schwaIdx + 1} / ${schwaOrder.length} 題</span>
      <span>⭐ ${schwaScore}</span>
    </div>
    <p class="schwa-prompt">哪一個母音偷懶、唸成輕輕的 /ə/（uh）？</p>
  `;

  const wordNode = schwaWordNode(item, { asButtons: true });
  quiz.appendChild(wordNode);

  const bar = document.createElement("div");
  bar.className = "schwa-bar";
  bar.innerHTML = `<button class="btn-replay">🔊 再聽一次</button>`;
  quiz.appendChild(bar);

  const feedback = document.createElement("div");
  feedback.className = "schwa-feedback";
  feedback.id = "schwa-feedback";
  quiz.appendChild(feedback);

  bar.querySelector(".btn-replay").addEventListener("click", () => speakWord(item.word));
  wordNode.querySelectorAll(".schwa-vbtn").forEach((btn) => {
    btn.addEventListener("click", () => onSchwaAnswer(parseInt(btn.dataset.i, 10), item, wordNode));
  });

  setTimeout(() => speakWord(item.word), 350);
}

function onSchwaAnswer(i, item, wordNode) {
  if (schwaAnswered) return;
  schwaAnswered = true;

  const feedback = document.getElementById("schwa-feedback");
  const buttons = wordNode.querySelectorAll(".schwa-vbtn");
  buttons.forEach((b) => (b.disabled = true));

  // 標出正解
  wordNode.querySelector(`.schwa-vbtn[data-i="${item.schwa}"]`).classList.add("schwa-correct");

  if (i === item.schwa) {
    schwaScore += 10;
    playSound("correct");
    createCelebrationBurst();
    feedback.innerHTML = `🎉 答對了！「${item.word}」的這個母音偷懶唸成 /ə/。`;
    feedback.className = "schwa-feedback ok";
  } else {
    playSound("wrong");
    const chosen = wordNode.querySelector(`.schwa-vbtn[data-i="${i}"]`);
    if (chosen) chosen.classList.add("schwa-wrong");
    feedback.innerHTML = `💡 再聽一次～綠色那個母音才是偷懶的 /ə/。`;
    feedback.className = "schwa-feedback no";
  }

  speakWord(item.word);

  setTimeout(() => {
    schwaIdx++;
    loadSchwaQuestion();
  }, 1900);
}

function renderSchwaResult() {
  const quiz = document.getElementById("schwa-quiz");
  if (!quiz) return;

  if (schwaScore > (highScores.schwa || 0)) {
    highScores.schwa = schwaScore;
  }
  // 全對給 3 星，其餘依比例
  const ratio = schwaScore / (schwaOrder.length * 10);
  const stars = ratio >= 1 ? 3 : ratio >= 0.7 ? 2 : 1;
  if (stars > (starRatings.schwa || 0)) starRatings.schwa = stars;
  saveStats();

  quiz.innerHTML = `
    <div class="schwa-result">
      <h3>🎉 練習完成！</h3>
      <p class="schwa-result-score">本次得分：<b>${schwaScore}</b>（共 ${schwaOrder.length} 題）</p>
      <p class="schwa-result-high">歷史最高：${highScores.schwa}</p>
      <button class="btn-replay btn-schwa-again">🔁 再玩一次</button>
    </div>
  `;
  playSound("clear");
  quiz.querySelector(".btn-schwa-again").addEventListener("click", () => {
    playSound("click");
    startSchwaQuiz();
  });
}

// ---- 子音頁：維持原本「積木 + 單字卡」 ----
function renderConsonantTiles(category, studyData) {
  const tilesContainer = document.getElementById("study-tiles-container");
  tilesContainer.innerHTML = "";

  // 「全部」按鈕
  const allTileWrapper = document.createElement("div");
  allTileWrapper.style.cssText = "width:100%;display:flex;justify-content:center;margin-bottom:15px;";
  const allTile = document.createElement("div");
  allTile.className = "study-tile active";
  allTile.textContent = "🌟 全部";
  allTile.addEventListener("click", () => {
    playSound("click");
    document.querySelectorAll(".study-tile").forEach((t) => t.classList.remove("active"));
    allTile.classList.add("active");
    currentFilteredLetter = "";
    renderStudyWords();
  });
  allTileWrapper.appendChild(allTile);
  tilesContainer.appendChild(allTileWrapper);

  const defaultRow = document.createElement("div");
  defaultRow.style.cssText = "width:100%;display:flex;gap:14px;justify-content:center;flex-wrap:wrap;";
  const uniqueLetters = [...new Set(WORD_DATABASE[category].map((w) => w.missing))];
  uniqueLetters.forEach((letter) => {
    const tile = document.createElement("div");
    tile.className = "study-tile";
    tile.textContent = letter;
    tile.addEventListener("click", () => {
      playSound("click");
      document.querySelectorAll(".study-tile").forEach((t) => t.classList.remove("active"));
      tile.classList.add("active");
      speakWord(studyData.sounds[letter] || `${letter} says Phonics sound`);
      currentFilteredLetter = letter;
      renderStudyWords();
    });
    defaultRow.appendChild(tile);
  });
  tilesContainer.appendChild(defaultRow);
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
    const displayMissing = word.missing.replace(/ \[.*?\]/, "");
    const highlightedHtml = `${word.clue[0]}<u>${displayMissing}</u>${word.clue[1]}`;

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

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
    { word: "hat", missing: "a", vowel: "a", pattern: "CVC", clue: ["h", "t"] },
    { word: "jam", missing: "a", vowel: "a", pattern: "CVC", clue: ["j", "m"] },
    { word: "at",  missing: "a", vowel: "a", pattern: "VC",  clue: ["", "t"] },
    { word: "an",  missing: "a", vowel: "a", pattern: "VC",  clue: ["", "n"] },
    { word: "am", missing: "a", vowel: "a", pattern: "VC", clue: ["", "m"] },
    { word: "ant", missing: "a", vowel: "a", pattern: "VC", clue: ["", "nt"] },
    { word: "add", missing: "a", vowel: "a", pattern: "VC", clue: ["", "dd"] },
    // e /ɛ/
    { word: "pen", missing: "e", vowel: "e", pattern: "CVC", clue: ["p", "n"] },
    { word: "bed", missing: "e", vowel: "e", pattern: "CVC", clue: ["b", "d"] },
    { word: "ten", missing: "e", vowel: "e", pattern: "CVC", clue: ["t", "n"] },
    { word: "red", missing: "e", vowel: "e", pattern: "CVC", clue: ["r", "d"] },
    { word: "leg", missing: "e", vowel: "e", pattern: "CVC", clue: ["l", "g"] },
    { word: "egg", missing: "e", vowel: "e", pattern: "VC",  clue: ["", "gg"] },
    { word: "end", missing: "e", vowel: "e", pattern: "VC",  clue: ["", "nd"] },
    { word: "elf", missing: "e", vowel: "e", pattern: "VC", clue: ["", "lf"] },
    { word: "elk", missing: "e", vowel: "e", pattern: "VC", clue: ["", "lk"] },
    { word: "edge", missing: "e", vowel: "e", pattern: "VC", clue: ["", "dge"] },
    // i /ɪ/
    { word: "pig", missing: "i", vowel: "i", pattern: "CVC", clue: ["p", "g"] },
    { word: "sit", missing: "i", vowel: "i", pattern: "CVC", clue: ["s", "t"] },
    { word: "six", missing: "i", vowel: "i", pattern: "CVC", clue: ["s", "x"] },
    { word: "lip", missing: "i", vowel: "i", pattern: "CVC", clue: ["l", "p"] },
    { word: "fin", missing: "i", vowel: "i", pattern: "CVC", clue: ["f", "n"] },
    { word: "in",  missing: "i", vowel: "i", pattern: "VC",  clue: ["", "n"] },
    { word: "it",  missing: "i", vowel: "i", pattern: "VC",  clue: ["", "t"] },
    { word: "if", missing: "i", vowel: "i", pattern: "VC", clue: ["", "f"] },
    { word: "ill", missing: "i", vowel: "i", pattern: "VC", clue: ["", "ll"] },
    { word: "ink", missing: "i", vowel: "i", pattern: "VC", clue: ["", "nk"] },
    // o /ɑ/
    { word: "hot", missing: "o", vowel: "o", pattern: "CVC", clue: ["h", "t"] },
    { word: "dog", missing: "o", vowel: "o", pattern: "CVC", clue: ["d", "g"] },
    { word: "box", missing: "o", vowel: "o", pattern: "CVC", clue: ["b", "x"] },
    { word: "top", missing: "o", vowel: "o", pattern: "CVC", clue: ["t", "p"] },
    { word: "pot", missing: "o", vowel: "o", pattern: "CVC", clue: ["p", "t"] },
    { word: "on",  missing: "o", vowel: "o", pattern: "VC",  clue: ["", "n"] },
    { word: "ox",  missing: "o", vowel: "o", pattern: "VC",  clue: ["", "x"] },
    { word: "odd", missing: "o", vowel: "o", pattern: "VC", clue: ["", "dd"] },
    { word: "otter", missing: "o", vowel: "o", pattern: "VC", clue: ["", "tter"] },
    { word: "octopus", missing: "o", vowel: "o", pattern: "VC", clue: ["", "ctopus"] },
    // u /ʌ/
    { word: "cup", missing: "u", vowel: "u", pattern: "CVC", clue: ["c", "p"] },
    { word: "sun", missing: "u", vowel: "u", pattern: "CVC", clue: ["s", "n"], homophones: ["son"] },
    { word: "bus", missing: "u", vowel: "u", pattern: "CVC", clue: ["b", "s"], homophones: ["bas"] },
    { word: "cut", missing: "u", vowel: "u", pattern: "CVC", clue: ["c", "t"] },
    { word: "mud", missing: "u", vowel: "u", pattern: "CVC", clue: ["m", "d"] },
    { word: "up",  missing: "u", vowel: "u", pattern: "VC",  clue: ["", "p"] },
    { word: "us",  missing: "u", vowel: "u", pattern: "VC",  clue: ["", "s"] },
    { word: "uncle", missing: "u", vowel: "u", pattern: "VC", clue: ["", "ncle"] },
    { word: "under", missing: "u", vowel: "u", pattern: "VC", clue: ["", "nder"] },
    { word: "ugly", missing: "u", vowel: "u", pattern: "VC", clue: ["", "gly"] }
  ],
  // ② 長母音：母音唸自己的名字；vowel = 長A/E/I/O/U；spelling = 拼法；adv = 進階(冷僻拼法)
  long_vowels: [
    // 長 A /eɪ/
    { word: "rain",  missing: "ai",   vowel: "a", spelling: "ai",   adv: false, clue: ["r", "n"], homophones: ["rein"] },
    { word: "train", missing: "ai",   vowel: "a", spelling: "ai",   adv: false, clue: ["tr", "n"] },
    { word: "mail", missing: "ai", vowel: "a", spelling: "ai", adv: false, clue: ["m", "l"] },
    { word: "tail", missing: "ai", vowel: "a", spelling: "ai", adv: false, clue: ["t", "l"] },
    { word: "paint", missing: "ai", vowel: "a", spelling: "ai", adv: false, clue: ["p", "nt"] },
    { word: "day",   missing: "ay",   vowel: "a", spelling: "ay",   adv: false, clue: ["d", ""] },
    { word: "play",  missing: "ay",   vowel: "a", spelling: "ay",   adv: false, clue: ["pl", ""] },
    { word: "say", missing: "ay", vowel: "a", spelling: "ay", adv: false, clue: ["s", ""], homophones: ["sei"] },
    { word: "stay", missing: "ay", vowel: "a", spelling: "ay", adv: false, clue: ["st", ""] },
    { word: "tray", missing: "ay", vowel: "a", spelling: "ay", adv: false, clue: ["tr", ""], homophones: ["trey"] },
    { word: "cake",  missing: "a",    vowel: "a", spelling: "a_e",  adv: false, clue: ["c", "ke"] },
    { word: "name",  missing: "a",    vowel: "a", spelling: "a_e",  adv: false, clue: ["n", "me"] },
    { word: "face", missing: "a", vowel: "a", spelling: "a_e", adv: false, clue: ["f", "ce"] },
    { word: "whale", missing: "a", vowel: "a", spelling: "a_e", adv: false, clue: ["wh", "le"] },
    { word: "game", missing: "a", vowel: "a", spelling: "a_e", adv: false, clue: ["g", "me"] },
    { word: "eight", missing: "eigh", vowel: "a", spelling: "eigh", adv: true,  clue: ["", "t"], homophones: ["ait"] },
    { word: "weigh", missing: "eigh", vowel: "a", spelling: "eigh", adv: true,  clue: ["w", ""], homophones: ["way", "wei", "wey"] },
    { word: "weight", missing: "eigh", vowel: "a", spelling: "eigh", adv: true, clue: ["w", "t"], homophones: ["wait"] },
    { word: "sleigh", missing: "eigh", vowel: "a", spelling: "eigh", adv: true, clue: ["sl", ""], homophones: ["slay", "sley"] },
    { word: "freight", missing: "eigh", vowel: "a", spelling: "eigh", adv: true, clue: ["fr", "t"] },
    { word: "vein",  missing: "ei",   vowel: "a", spelling: "ei",   adv: true,  clue: ["v", "n"], homophones: ["vain"] },
    { word: "rein", missing: "ei", vowel: "a", spelling: "ei", adv: true, clue: ["r", "n"], homophones: ["rain"] },
    { word: "veil", missing: "ei", vowel: "a", spelling: "ei", adv: true, clue: ["v", "l"], homophones: ["vail"] },
    { word: "beige", missing: "ei", vowel: "a", spelling: "ei", adv: true, clue: ["b", "ge"] },
    { word: "reindeer", missing: "ei", vowel: "a", spelling: "ei", adv: true, clue: ["r", "ndeer"] },
    { word: "they",  missing: "ey",   vowel: "a", spelling: "ey",   adv: true,  clue: ["th", ""] },
    { word: "grey", missing: "ey", vowel: "a", spelling: "ey", adv: true, clue: ["gr", ""], homophones: ["gray"] },
    { word: "prey", missing: "ey", vowel: "a", spelling: "ey", adv: true, clue: ["pr", ""], homophones: ["pray"] },
    { word: "obey", missing: "ey", vowel: "a", spelling: "ey", adv: true, clue: ["ob", ""] },
    { word: "convey", missing: "ey", vowel: "a", spelling: "ey", adv: true, clue: ["conv", ""] },
    // 長 E /i/
    { word: "see",   missing: "ee",   vowel: "e", spelling: "ee",   adv: false, clue: ["s", ""], homophones: ["sea", "si"] },
    { word: "tree",  missing: "ee",   vowel: "e", spelling: "ee",   adv: false, clue: ["tr", ""] },
    { word: "queen", missing: "ee", vowel: "e", spelling: "ee", adv: false, clue: ["qu", "n"], homophones: ["quean"] },
    { word: "knee", missing: "ee", vowel: "e", spelling: "ee", adv: false, clue: ["kn", ""] },
    { word: "wheel", missing: "ee", vowel: "e", spelling: "ee", adv: false, clue: ["wh", "l"] },
    { word: "eat",   missing: "ea",   vowel: "e", spelling: "ea",   adv: false, clue: ["", "t"] },
    { word: "sea",   missing: "ea",   vowel: "e", spelling: "ea",   adv: false, clue: ["s", ""], homophones: ["see", "si"] },
    { word: "leaf", missing: "ea", vowel: "e", spelling: "ea", adv: false, clue: ["l", "f"], homophones: ["leef", "lief"] },
    { word: "peach", missing: "ea", vowel: "e", spelling: "ea", adv: false, clue: ["p", "ch"] },
    { word: "team", missing: "ea", vowel: "e", spelling: "ea", adv: false, clue: ["t", "m"], homophones: ["teem"] },
    { word: "he",    missing: "e",    vowel: "e", spelling: "open", adv: false, clue: ["h", ""], homophones: ["hee"] },
    { word: "she",   missing: "e",    vowel: "e", spelling: "open", adv: false, clue: ["sh", ""], homophones: ["shea"] },
    { word: "me", missing: "e", vowel: "e", spelling: "open", adv: false, clue: ["m", ""], homophones: ["mee", "mi"] },
    { word: "we", missing: "e", vowel: "e", spelling: "open", adv: false, clue: ["w", ""], homophones: ["wee"] },
    { word: "be", missing: "e", vowel: "e", spelling: "open", adv: false, clue: ["b", ""], homophones: ["bee"] },
    { word: "these", missing: "e",    vowel: "e", spelling: "e_e",  adv: false, clue: ["th", "se"] },
    { word: "eve",   missing: "e",    vowel: "e", spelling: "e_e",  adv: false, clue: ["", "ve"] },
    { word: "complete", missing: "e", vowel: "e", spelling: "e_e", adv: false, clue: ["compl", "te"] },
    { word: "gene", missing: "e", vowel: "e", spelling: "e_e", adv: false, clue: ["g", "ne"] },
    { word: "scene", missing: "e", vowel: "e", spelling: "e_e", adv: false, clue: ["sc", "ne"] },
    { word: "thief", missing: "ie",   vowel: "e", spelling: "ie",   adv: true,  clue: ["th", "f"] },
    { word: "field", missing: "ie",   vowel: "e", spelling: "ie",   adv: true,  clue: ["f", "ld"] },
    { word: "chief", missing: "ie", vowel: "e", spelling: "ie", adv: true, clue: ["ch", "f"] },
    { word: "shield", missing: "ie", vowel: "e", spelling: "ie", adv: true, clue: ["sh", "ld"] },
    { word: "brief", missing: "ie", vowel: "e", spelling: "ie", adv: true, clue: ["br", "f"] },
    { word: "key",   missing: "ey",   vowel: "e", spelling: "ey",   adv: true,  clue: ["k", ""], homophones: ["kee"] },
    { word: "keyboard", missing: "ey", vowel: "e", spelling: "ey", adv: true, clue: ["k", "board"] },
    { word: "keyhole", missing: "ey", vowel: "e", spelling: "ey", adv: true, clue: ["k", "hole"] },
    { word: "keypad", missing: "ey", vowel: "e", spelling: "ey", adv: true, clue: ["k", "pad"] },
    { word: "keyring", missing: "ey", vowel: "e", spelling: "ey", adv: true, clue: ["k", "ring"] },
    { word: "receive", missing: "ei", vowel: "e", spelling: "ei",   adv: true,  clue: ["rec", "ve"] },
    { word: "ceiling", missing: "ei", vowel: "e", spelling: "ei", adv: true, clue: ["c", "ling"] },
    { word: "receipt", missing: "ei", vowel: "e", spelling: "ei", adv: true, clue: ["rec", "pt"] },
    { word: "deceive", missing: "ei", vowel: "e", spelling: "ei", adv: true, clue: ["dec", "ve"] },
    { word: "conceive", missing: "ei", vowel: "e", spelling: "ei", adv: true, clue: ["conc", "ve"] },
    // 長 I /aɪ/
    { word: "high",  missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["h", ""], homophones: ["hi", "hai", "heigh", "hie"] },
    { word: "night", missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["n", "t"] },
    { word: "light", missing: "igh",  vowel: "i", spelling: "igh",  adv: false, clue: ["l", "t"] },
    { word: "right", missing: "igh", vowel: "i", spelling: "igh", adv: false, clue: ["r", "t"] },
    { word: "bright", missing: "igh", vowel: "i", spelling: "igh", adv: false, clue: ["br", "t"] },
    { word: "bike",  missing: "i",    vowel: "i", spelling: "i_e",  adv: false, clue: ["b", "ke"] },
    { word: "kite",  missing: "i",    vowel: "i", spelling: "i_e",  adv: false, clue: ["k", "te"] },
    { word: "five", missing: "i", vowel: "i", spelling: "i_e", adv: false, clue: ["f", "ve"] },
    { word: "white", missing: "i", vowel: "i", spelling: "i_e", adv: false, clue: ["wh", "te"] },
    { word: "time", missing: "i", vowel: "i", spelling: "i_e", adv: false, clue: ["t", "me"] },
    { word: "pie",   missing: "ie",   vowel: "i", spelling: "ie",   adv: true,  clue: ["p", ""], homophones: ["pi"] },
    { word: "tie",   missing: "ie",   vowel: "i", spelling: "ie",   adv: true,  clue: ["t", ""], homophones: ["tai"] },
    { word: "lie", missing: "ie", vowel: "i", spelling: "ie", adv: true, clue: ["l", ""] },
    { word: "die", missing: "ie", vowel: "i", spelling: "ie", adv: true, clue: ["d", ""], homophones: ["dai"] },
    { word: "untie", missing: "ie", vowel: "i", spelling: "ie", adv: true, clue: ["unt", ""] },
    // 長 O /oʊ/
    { word: "boat",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["b", "t"] },
    { word: "road",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["r", "d"], homophones: ["roed"] },
    { word: "goat",  missing: "oa",   vowel: "o", spelling: "oa",   adv: false, clue: ["g", "t"] },
    { word: "coat", missing: "oa", vowel: "o", spelling: "oa", adv: false, clue: ["c", "t"] },
    { word: "soap", missing: "oa", vowel: "o", spelling: "oa", adv: false, clue: ["s", "p"] },
    { word: "home",  missing: "o",    vowel: "o", spelling: "o_e",  adv: false, clue: ["h", "me"] },
    { word: "nose",  missing: "o",    vowel: "o", spelling: "o_e",  adv: false, clue: ["n", "se"] },
    { word: "rose", missing: "o", vowel: "o", spelling: "o_e", adv: false, clue: ["r", "se"] },
    { word: "phone", missing: "o", vowel: "o", spelling: "o_e", adv: false, clue: ["ph", "ne"] },
    { word: "note", missing: "o", vowel: "o", spelling: "o_e", adv: false, clue: ["n", "te"] },
    { word: "go",    missing: "o",    vowel: "o", spelling: "open", adv: false, clue: ["g", ""] },
    { word: "no",    missing: "o",    vowel: "o", spelling: "open", adv: false, clue: ["n", ""] },
    { word: "so", missing: "o", vowel: "o", spelling: "open", adv: false, clue: ["s", ""], homophones: ["sew"] },
    { word: "open", missing: "o", vowel: "o", spelling: "open", adv: false, clue: ["", "pen"] },
    { word: "sofa", missing: "o", vowel: "o", spelling: "open", adv: false, clue: ["s", "fa"] },
    { word: "toe",   missing: "oe",   vowel: "o", spelling: "oe",   adv: true,  clue: ["t", ""] },
    { word: "doe", missing: "oe", vowel: "o", spelling: "oe", adv: true, clue: ["d", ""] },
    { word: "foe", missing: "oe", vowel: "o", spelling: "oe", adv: true, clue: ["f", ""] },
    { word: "hoe", missing: "oe", vowel: "o", spelling: "oe", adv: true, clue: ["h", ""], homophones: ["ho"] },
    { word: "oboe", missing: "oe", vowel: "o", spelling: "oe", adv: true, clue: ["ob", ""] },
    // 長 U /(j)u/
    { word: "new",   missing: "ew",   vowel: "u", spelling: "ew",   ipa: "u", gbAuIpa: "ju", adv: false, clue: ["n", ""], homophones: ["nu"] },
    { word: "grew", missing: "ew", vowel: "u", spelling: "ew", ipa: "u", adv: false, clue: ["gr", ""], homophones: ["grue"] },
    { word: "flew", missing: "ew", vowel: "u", spelling: "ew", ipa: "u", adv: false, clue: ["fl", ""], homophones: ["flu", "flue"] },
    { word: "blew", missing: "ew", vowel: "u", spelling: "ew", ipa: "u", adv: false, clue: ["bl", ""], homophones: ["blue"] },
    { word: "crew", missing: "ew", vowel: "u", spelling: "ew", ipa: "u", adv: false, clue: ["cr", ""], homophones: ["cru"] },
    { word: "chew", missing: "ew", vowel: "u", spelling: "ew", ipa: "u", adv: false, clue: ["ch", ""] },
    { word: "few",   missing: "ew",   vowel: "u", spelling: "ew",   adv: false, clue: ["f", ""], homophones: ["feu"] },
    { word: "pew", missing: "ew", vowel: "u", spelling: "ew", adv: false, clue: ["p", ""] },
    { word: "mew", missing: "ew", vowel: "u", spelling: "ew", adv: false, clue: ["m", ""], homophones: ["mu"] },
    { word: "skew", missing: "ew", vowel: "u", spelling: "ew", adv: false, clue: ["sk", ""] },
    { word: "hew", missing: "ew", vowel: "u", spelling: "ew", adv: false, clue: ["h", ""], homophones: ["hue"] },
    { word: "blue",  missing: "ue",   vowel: "u", spelling: "ue",   ipa: "u", adv: false, clue: ["bl", ""], homophones: ["blew"] },
    { word: "clue", missing: "ue", vowel: "u", spelling: "ue", ipa: "u", adv: false, clue: ["cl", ""], homophones: ["clew"] },
    { word: "glue", missing: "ue", vowel: "u", spelling: "ue", ipa: "u", adv: false, clue: ["gl", ""] },
    { word: "true", missing: "ue", vowel: "u", spelling: "ue", ipa: "u", adv: false, clue: ["tr", ""] },
    { word: "flue", missing: "ue", vowel: "u", spelling: "ue", ipa: "u", adv: false, clue: ["fl", ""], homophones: ["flew", "flu"] },
    { word: "due",   missing: "ue",   vowel: "u", spelling: "ue",   ipa: "u", gbAuIpa: "ju", adv: false, clue: ["d", ""], homophones: ["dew", "do"] },
    { word: "cue", missing: "ue", vowel: "u", spelling: "ue", adv: false, clue: ["c", ""] },
    { word: "hue", missing: "ue", vowel: "u", spelling: "ue", adv: false, clue: ["h", ""], homophones: ["hew"] },
    { word: "rescue", missing: "ue", vowel: "u", spelling: "ue", adv: false, clue: ["resc", ""] },
    { word: "value", missing: "ue", vowel: "u", spelling: "ue", adv: false, clue: ["val", ""] },
    { word: "argue", missing: "ue", vowel: "u", spelling: "ue", adv: false, clue: ["arg", ""] },
    { word: "cute",  missing: "u",    vowel: "u", spelling: "u_e",  adv: false, clue: ["c", "te"] },
    { word: "cube",  missing: "u",    vowel: "u", spelling: "u_e",  adv: false, clue: ["c", "be"] },
    { word: "huge", missing: "u", vowel: "u", spelling: "u_e", adv: false, clue: ["h", "ge"] },
    { word: "mule", missing: "u", vowel: "u", spelling: "u_e", adv: false, clue: ["m", "le"] },
    { word: "mute", missing: "u", vowel: "u", spelling: "u_e", adv: false, clue: ["m", "te"], homophones: ["meute"] },
    { word: "rule", missing: "u", vowel: "u", spelling: "u_e", ipa: "u", adv: false, clue: ["r", "le"] },
    { word: "rude", missing: "u", vowel: "u", spelling: "u_e", ipa: "u", adv: false, clue: ["r", "de"] },
    { word: "flute", missing: "u", vowel: "u", spelling: "u_e", ipa: "u", adv: false, clue: ["fl", "te"] },
    { word: "prune", missing: "u", vowel: "u", spelling: "u_e", ipa: "u", adv: false, clue: ["pr", "ne"] },
    { word: "brute", missing: "u", vowel: "u", spelling: "u_e", ipa: "u", adv: false, clue: ["br", "te"] },
    { word: "euro",  missing: "eu",   vowel: "u", spelling: "eu",   ipa: "jʊ", adv: true,  clue: ["", "ro"] },
    { word: "europe", missing: "eu", vowel: "u", spelling: "eu", ipa: "jʊ", adv: true, clue: ["", "rope"], display: "Europe" },
    { word: "european", missing: "eu", vowel: "u", spelling: "eu", ipa: "jʊ", adv: true, clue: ["", "ropean"], display: "European" },
    { word: "eurasia", missing: "eu", vowel: "u", spelling: "eu", ipa: "jʊ", adv: true, clue: ["", "rasia"], display: "Eurasia" },
    { word: "eurozone", missing: "eu", vowel: "u", spelling: "eu", ipa: "jʊ", adv: true, clue: ["", "rozone"] },
    { word: "neutral", missing: "eu", vowel: "u", spelling: "eu",   ipa: "u", gbAuIpa: "ju", adv: true,  clue: ["n", "tral"] },
    { word: "neutron", missing: "eu", vowel: "u", spelling: "eu", ipa: "u", gbAuIpa: "ju", adv: true, clue: ["n", "tron"] },
    { word: "neutrino", missing: "eu", vowel: "u", spelling: "eu", ipa: "u", gbAuIpa: "ju", adv: true, clue: ["n", "trino"] },
    { word: "neuter", missing: "eu", vowel: "u", spelling: "eu", ipa: "u", gbAuIpa: "ju", adv: true, clue: ["n", "ter"] },
    { word: "neutrality", missing: "eu", vowel: "u", spelling: "eu", ipa: "u", gbAuIpa: "ju", adv: true, clue: ["n", "trality"] }
  ],
  // ③ 特殊母音：雙母音/滑音 + oo 雙拼；g = 依發音分組（給表格用）
  special_vowels: [
    // /aʊ/ 凹（澳）
    { word: "cloud", missing: "ou", g: "loud", clue: ["cl", "d"] },
    { word: "house", missing: "ou", g: "loud", clue: ["h", "se"] },
    { word: "mouth", missing: "ou", g: "loud", clue: ["m", "th"] },
    { word: "loud", missing: "ou", g: "loud", clue: ["l", "d"] },
    { word: "shout", missing: "ou", g: "loud", clue: ["sh", "t"] },
    { word: "cow",   missing: "ow", g: "loud", clue: ["c", ""] },
    { word: "town",  missing: "ow", g: "loud", clue: ["t", "n"] },
    { word: "flower",missing: "ow", g: "loud", clue: ["fl", "er"] },
    { word: "how", missing: "ow", g: "loud", clue: ["h", ""] },
    { word: "brown", missing: "ow", g: "loud", clue: ["br", "n"] },
    // /ɔ/ 喔
    { word: "autumn",missing: "au", g: "saw", clue: ["", "tumn"] },
    { word: "sauce", missing: "au", g: "saw", clue: ["s", "ce"] },
    { word: "launch", missing: "au", g: "saw", clue: ["l", "nch"] },
    { word: "fault", missing: "au", g: "saw", clue: ["f", "lt"] },
    { word: "pause", missing: "au", g: "saw", clue: ["p", "se"] },
    { word: "draw",  missing: "aw", g: "saw", clue: ["dr", ""] },
    { word: "paw",   missing: "aw", g: "saw", clue: ["p", ""] },
    { word: "straw", missing: "aw", g: "saw", clue: ["str", ""] },
    { word: "saw", missing: "aw", g: "saw", clue: ["s", ""] },
    { word: "lawn", missing: "aw", g: "saw", clue: ["l", "n"] },
    // /ʊ/ 嗚（短）
    { word: "book",  missing: "oo", g: "book", clue: ["b", "k"] },
    { word: "foot",  missing: "oo", g: "book", clue: ["f", "t"] },
    { word: "good",  missing: "oo", g: "book", clue: ["g", "d"] },
    { word: "wood",  missing: "oo", g: "book", clue: ["w", "d"] },
    { word: "wool", missing: "oo", g: "book", clue: ["w", "l"] },
    // /u/ 嗚（長）
    { word: "zoo",   missing: "oo", g: "moon", clue: ["z", ""] },
    { word: "moon",  missing: "oo", g: "moon", clue: ["m", "n"] },
    { word: "boot",  missing: "oo", g: "moon", clue: ["b", "t"] },
    { word: "food", missing: "oo", g: "moon", clue: ["f", "d"] },
    { word: "cool", missing: "oo", g: "moon", clue: ["c", "l"] },
    // /ɔɪ/ 歐一
    { word: "coin",  missing: "oi", g: "coin", clue: ["c", "n"], homophones: ["coyn"] },
    { word: "point", missing: "oi", g: "coin", clue: ["p", "nt"] },
    { word: "soil",  missing: "oi", g: "coin", clue: ["s", "l"] },
    { word: "oil", missing: "oi", g: "coin", clue: ["", "l"] },
    { word: "boil", missing: "oi", g: "coin", clue: ["b", "l"] },
    { word: "toy",   missing: "oy", g: "coin", clue: ["t", ""] },
    { word: "boy",   missing: "oy", g: "coin", clue: ["b", ""] },
    { word: "joy",   missing: "oy", g: "coin", clue: ["j", ""] },
    { word: "enjoy", missing: "oy", g: "coin", clue: ["enj", ""] },
    { word: "royal", missing: "oy", g: "coin", clue: ["r", "al"] }
  ],
  // ④ 弱化母音 schwa /ə/：schwa = 唸輕聲那個母音的字元索引(0-based)；
  //    syll = 音節拆解（接起來等於 word）；weak = 輕音節（含 schwa）的索引
  schwa: [
    { word: "sofa",    schwa: 3, syll: ["so", "fa"],    weak: 1 },
    { word: "lemon",   schwa: 3, syll: ["lem", "on"],   weak: 1 },
    { word: "panda",   schwa: 4, syll: ["pan", "da"],   weak: 1 },
    { word: "zebra",   schwa: 4, syll: ["ze", "bra"],   weak: 1 },
    { word: "pencil",  schwa: 4, syll: ["pen", "cil"],  weak: 1 },
    { word: "salad",   schwa: 3, syll: ["sal", "ad"],   weak: 1 },
    { word: "seven",   schwa: 3, syll: ["sev", "en"],   weak: 1 },
    { word: "open",    schwa: 2, syll: ["o", "pen"],    weak: 1 },
    { word: "garden",  schwa: 4, syll: ["gar", "den"],  weak: 1 },
    { word: "problem", schwa: 5, syll: ["prob", "lem"], weak: 1 },
    { word: "about",   schwa: 0, syll: ["a", "bout"],   weak: 0 },
    { word: "wagon",   schwa: 3, syll: ["wag", "on"],   weak: 1 },
    { word: "away", schwa: 0, syll: ["a", "way"], weak: 0 },
    { word: "ago", schwa: 0, syll: ["a", "go"], weak: 0 },
    { word: "balloon", schwa: 1, syll: ["bal", "loon"], weak: 0 },
    { word: "today", schwa: 1, syll: ["to", "day"], weak: 0 },
    { word: "support", schwa: 1, syll: ["sup", "port"], weak: 0 },
    { word: "supply", schwa: 1, syll: ["sup", "ply"], weak: 0 }
  ],
  consonants: [
    { word: "ship", missing: "sh", clue: ["", "ip"] },
    { word: "shop", missing: "sh", clue: ["", "op"] },
    { word: "dish", missing: "sh", clue: ["di", ""] },
    { word: "fish", missing: "sh", clue: ["fi", ""] },
    { word: "wish", missing: "sh", clue: ["wi", ""] },
    { word: "chip", missing: "ch", clue: ["", "ip"] },
    { word: "chair", missing: "ch", clue: ["", "air"] },
    { word: "peach", missing: "ch", clue: ["pea", ""] },
    { word: "cheese", missing: "ch", clue: ["", "eese"] },
    { word: "lunch", missing: "ch", clue: ["lun", ""] },
    { word: "three", missing: "th [θ]", clue: ["", "ree"] },
    { word: "thin", missing: "th [θ]", clue: ["", "in"] },
    { word: "bath", missing: "th [θ]", clue: ["ba", ""] },
    { word: "thank", missing: "th [θ]", clue: ["", "ank"] },
    { word: "thick", missing: "th [θ]", clue: ["", "ick"] },
    { word: "this", missing: "th [ð]", clue: ["", "is"] },
    { word: "that", missing: "th [ð]", clue: ["", "at"] },
    { word: "brother", missing: "th [ð]", clue: ["bro", "er"] },
    { word: "they", missing: "th [ð]", clue: ["", "ey"] },
    { word: "these", missing: "th [ð]", clue: ["", "ese"] },
    { word: "phone", missing: "ph", clue: ["", "one"] },
    { word: "photo", missing: "ph", clue: ["", "oto"] },
    { word: "dolphin", missing: "ph", clue: ["dol", "in"] },
    { word: "elephant", missing: "ph", clue: ["ele", "ant"] },
    { word: "alphabet", missing: "ph", clue: ["al", "abet"] },
    { word: "whale", missing: "wh", clue: ["", "ale"] },
    { word: "wheel", missing: "wh", clue: ["", "eel"] },
    { word: "white", missing: "wh", clue: ["", "ite"] },
    { word: "wheat", missing: "wh", clue: ["", "eat"] },
    { word: "whisk", missing: "wh", clue: ["", "isk"] },
    { word: "tree", missing: "tr", clue: ["", "ee"] },
    { word: "truck", missing: "tr", clue: ["", "uck"] },
    { word: "train", missing: "tr", clue: ["", "ain"] },
    { word: "trip", missing: "tr", clue: ["", "ip"] },
    { word: "track", missing: "tr", clue: ["", "ack"] },
    { word: "drum", missing: "dr", clue: ["", "um"] },
    { word: "dress", missing: "dr", clue: ["", "ess"] },
    { word: "drink", missing: "dr", clue: ["", "ink"] },
    { word: "drop", missing: "dr", clue: ["", "op"] },
    { word: "draw", missing: "dr", clue: ["", "aw"] },
    { word: "bread", missing: "br", clue: ["", "ead"] },
    { word: "brown", missing: "br", clue: ["", "own"] },
    { word: "brush", missing: "br", clue: ["", "ush"] },
    { word: "bright", missing: "br", clue: ["", "ight"] },
    { word: "brick", missing: "br", clue: ["", "ick"] },
    { word: "crab", missing: "cr", clue: ["", "ab"] },
    { word: "cry", missing: "cr", clue: ["", "y"] },
    { word: "crown", missing: "cr", clue: ["", "own"] },
    { word: "cream", missing: "cr", clue: ["", "eam"] },
    { word: "crop", missing: "cr", clue: ["", "op"] }
  ],
  basic_consonants: [
    { word: "book", missing: "b", clue: ["", "ook"] },
    { word: "bird", missing: "b", clue: ["", "ird"] },
    { word: "bag", missing: "b", clue: ["", "ag"] },
    { word: "bed", missing: "b", clue: ["", "ed"] },
    { word: "bus", missing: "b", clue: ["", "us"] },
    { word: "cat", missing: "c", soundGroup: "c [k]", clue: ["", "at"] },
    { word: "cow", missing: "c", soundGroup: "c [k]", clue: ["", "ow"] },
    { word: "cake", missing: "c", soundGroup: "c [k]", clue: ["", "ake"] },
    { word: "cup", missing: "c", soundGroup: "c [k]", clue: ["", "up"] },
    { word: "coat", missing: "c", soundGroup: "c [k]", clue: ["", "oat"] },
    { word: "city", missing: "c", soundGroup: "c [s]", clue: ["", "ity"] },
    { word: "face", missing: "c", soundGroup: "c [s]", clue: ["fa", "e"] },
    { word: "fancy", missing: "c", soundGroup: "c [s]", clue: ["fan", "y"] },
    { word: "ice", missing: "c", soundGroup: "c [s]", clue: ["i", "e"] },
    { word: "rice", missing: "c", soundGroup: "c [s]", clue: ["ri", "e"] },
    { word: "dog", missing: "d", clue: ["", "og"] },
    { word: "duck", missing: "d", clue: ["", "uck"] },
    { word: "day", missing: "d", clue: ["", "ay"] },
    { word: "dish", missing: "d", clue: ["", "ish"] },
    { word: "drum", missing: "d", clue: ["", "rum"] },
    { word: "fish", missing: "f", clue: ["", "ish"] },
    { word: "foot", missing: "f", clue: ["", "oot"] },
    { word: "food", missing: "f", clue: ["", "ood"] },
    { word: "full", missing: "f", clue: ["", "ull"] },
    { word: "fin", missing: "f", clue: ["", "in"] },
    { word: "goat", missing: "g", soundGroup: "g [g]", clue: ["", "oat"] },
    { word: "garden", missing: "g", soundGroup: "g [g]", clue: ["", "arden"] },
    { word: "go", missing: "g", soundGroup: "g [g]", clue: ["", "o"] },
    { word: "game", missing: "g", soundGroup: "g [g]", clue: ["", "ame"] },
    { word: "get", missing: "g", soundGroup: "g [g]", clue: ["", "et"] },
    { word: "giant", missing: "g", soundGroup: "g [dʒ]", clue: ["", "iant"] },
    { word: "gym", missing: "g", soundGroup: "g [dʒ]", clue: ["", "ym"] },
    { word: "gem", missing: "g", soundGroup: "g [dʒ]", clue: ["", "em"], homophones: ["jem"] },
    { word: "gentle", missing: "g", soundGroup: "g [dʒ]", clue: ["", "entle"] },
    { word: "magic", missing: "g", soundGroup: "g [dʒ]", clue: ["ma", "ic"] },
    { word: "home", missing: "h", clue: ["", "ome"] },
    { word: "happy", missing: "h", clue: ["", "appy"] },
    { word: "hat", missing: "h", clue: ["", "at"] },
    { word: "high", missing: "h", clue: ["", "igh"] },
    { word: "house", missing: "h", clue: ["", "ouse"] },
    { word: "jam", missing: "j", clue: ["", "am"] },
    { word: "jump", missing: "j", clue: ["", "ump"] },
    { word: "joy", missing: "j", clue: ["", "oy"] },
    { word: "jet", missing: "j", clue: ["", "et"] },
    { word: "job", missing: "j", clue: ["", "ob"] },
    { word: "key", missing: "k", clue: ["", "ey"] },
    { word: "kite", missing: "k", clue: ["", "ite"] },
    { word: "king", missing: "k", clue: ["", "ing"] },
    { word: "kid", missing: "k", clue: ["", "id"] },
    { word: "kitchen", missing: "k", clue: ["", "itchen"] },
    { word: "leg", missing: "l", clue: ["", "eg"] },
    { word: "lemon", missing: "l", clue: ["", "emon"] },
    { word: "light", missing: "l", clue: ["", "ight"] },
    { word: "leaf", missing: "l", clue: ["", "eaf"] },
    { word: "lake", missing: "l", clue: ["", "ake"] },
    { word: "map", missing: "m", clue: ["", "ap"] },
    { word: "moon", missing: "m", clue: ["", "oon"] },
    { word: "milk", missing: "m", clue: ["", "ilk"] },
    { word: "mouth", missing: "m", clue: ["", "outh"] },
    { word: "mud", missing: "m", clue: ["", "ud"] },
    { word: "nose", missing: "n", clue: ["", "ose"] },
    { word: "nurse", missing: "n", clue: ["", "urse"] },
    { word: "night", missing: "n", clue: ["", "ight"] },
    { word: "note", missing: "n", clue: ["", "ote"] },
    { word: "name", missing: "n", clue: ["", "ame"] },
    { word: "pen", missing: "p", clue: ["", "en"] },
    { word: "panda", missing: "p", clue: ["", "anda"] },
    { word: "pig", missing: "p", clue: ["", "ig"] },
    { word: "peach", missing: "p", clue: ["", "each"] },
    { word: "pie", missing: "p", clue: ["", "ie"] },
    { word: "queen", missing: "q", clue: ["", "ueen"] },
    { word: "quick", missing: "q", clue: ["", "uick"] },
    { word: "quiz", missing: "q", clue: ["", "uiz"] },
    { word: "quit", missing: "q", clue: ["", "uit"] },
    { word: "quilt", missing: "q", clue: ["", "uilt"] },
    { word: "rain", missing: "r", clue: ["", "ain"] },
    { word: "red", missing: "r", clue: ["", "ed"] },
    { word: "road", missing: "r", clue: ["", "oad"] },
    { word: "ring", missing: "r", clue: ["", "ing"] },
    { word: "rose", missing: "r", clue: ["", "ose"] },
    { word: "sun", missing: "s", clue: ["", "un"] },
    { word: "sofa", missing: "s", clue: ["", "ofa"] },
    { word: "sit", missing: "s", clue: ["", "it"] },
    { word: "sing", missing: "s", clue: ["", "ing"] },
    { word: "sea", missing: "s", clue: ["", "ea"] },
    { word: "top", missing: "t", clue: ["", "op"] },
    { word: "town", missing: "t", clue: ["", "own"] },
    { word: "ten", missing: "t", clue: ["", "en"] },
    { word: "toy", missing: "t", clue: ["", "oy"] },
    { word: "tree", missing: "t", clue: ["", "ree"] },
    { word: "van", missing: "v", clue: ["", "an"] },
    { word: "five", missing: "v", clue: ["fi", "e"] },
    { word: "very", missing: "v", clue: ["", "ery"] },
    { word: "vest", missing: "v", clue: ["", "est"] },
    { word: "voice", missing: "v", clue: ["", "oice"] },
    { word: "wet", missing: "w", clue: ["", "et"] },
    { word: "wagon", missing: "w", clue: ["", "agon"] },
    { word: "wood", missing: "w", clue: ["", "ood"] },
    { word: "week", missing: "w", clue: ["", "eek"] },
    { word: "wish", missing: "w", clue: ["", "ish"] },
    { word: "box", missing: "x", clue: ["bo", ""] },
    { word: "six", missing: "x", clue: ["si", ""] },
    { word: "fox", missing: "x", clue: ["fo", ""] },
    { word: "mix", missing: "x", clue: ["mi", ""] },
    { word: "next", missing: "x", clue: ["ne", "t"] },
    { word: "yes", missing: "y", clue: ["", "es"] },
    { word: "yellow", missing: "y", clue: ["", "ellow"] },
    { word: "yet", missing: "y", clue: ["", "et"] },
    { word: "yell", missing: "y", clue: ["", "ell"] },
    { word: "yogurt", missing: "y", clue: ["", "ogurt"] },
    { word: "zebra", missing: "z", clue: ["", "ebra"] },
    { word: "zoo", missing: "z", clue: ["", "oo"] },
    { word: "zip", missing: "z", clue: ["", "ip"] },
    { word: "zero", missing: "z", clue: ["", "ero"] },
    { word: "zone", missing: "z", clue: ["", "one"] }
  ]
};

const QUESTIONS_PER_GAME = 10;

// ==========================================
// 自然拼讀發音與教學資料
// ==========================================
// 規則例字用底線標出要觀察的拼法，整個字都可以點讀。
function ruleWord(word, spelling) {
  const highlighted = word.replace(spelling, "<u>$&</u>");
  return `<button type="button" class="rule-word" data-word="${word}" aria-label="播放 ${word}，${WORD_MEANINGS[word]}"><span lang="en">${highlighted}</span>（${WORD_MEANINGS[word]}）</button>`;
}

const PHONICS_DATA = {
  short_vowels: {
    title: "短母音組 📖 學習樂園",
    sounds: { a: "æ", e: "ɛ", i: "ɪ", o: "ɑ", u: "ʌ" }
  },
  long_vowels: {
    title: "長母音組 📖 學習樂園",
    sounds: { a: "eɪ", e: "i", i: "aɪ", o: "oʊ", u: "ju" }
  },
  special_vowels: {
    title: "特殊母音組 📖 學習樂園",
    groups: [
      { id: "loud", ipa: "aʊ", note: "凹（澳）", combos: ["ou", "ow"], tip: "ou 和 ow 都能拼出這個滑音，唸的時候嘴形從張開滑向收圓。" },
      { id: "saw",  ipa: "ɔ",  note: "喔",       combos: ["au", "aw"], tip: "在這組例字裡，au 和 aw 各用兩個字母拼出一個母音。" },
      { id: "book", ipa: "ʊ",  note: "嗚（短）", combos: ["oo"], tip: `同樣寫 oo，${ruleWord("moon", "oo")} 的母音又不一樣。點來比較看看。` },
      { id: "moon", ipa: "u",  note: "嗚（長）", combos: ["oo"], tip: `同樣寫 oo，${ruleWord("book", "oo")} 的母音又不一樣。點來比較看看。` },
      { id: "coin", ipa: "ɔɪ", note: "歐一",     combos: ["oi", "oy"], tip: "oi 常在字中，oy 常在字尾，兩種拼法都能拼出這個滑音。" }
    ]
  },
  schwa: {
    title: "弱化母音 schwa /ə/ 📖 學習樂園"
  },
  consonants: {
    title: "子音與輔音群 📖 學習樂園",
    notes: {
      sh: `<b>sh 合成一個音</b>　聽 ${ruleWord("ship", "sh")}。兩個字母合起來唸 /ʃ/，空氣從舌面和上顎之間流過。`,
      ch: `<b>ch 常唸 /tʃ/</b>　聽 ${ruleWord("chip", "ch")}，先擋住氣流，再一起放開。也有其他讀法，例如 ${ruleWord("school", "ch")} 的 ch 唸 /k/。`,
      "th [θ]": `<b>th 的無聲讀法</b>　唸 ${ruleWord("thin", "th")} 的 th 時，舌尖輕碰上下齒之間，讓氣流通過，喉嚨不振動。和 ${ruleWord("this", "th")} 比一比。`,
      "th [ð]": `<b>th 的有聲讀法</b>　唸 ${ruleWord("this", "th")} 的 th 時，舌尖輕碰上下齒之間，喉嚨會振動。再聽 ${ruleWord("thin", "th")} 的無聲 th。`,
      ph: `<b>ph 常唸 /f/</b>　聽 ${ruleWord("phone", "ph")} 和 ${ruleWord("fish", "f")}。兩個單字的開頭拼法不同，聲音相同。`,
      wh: `<b>wh 的常見讀音</b>　${ruleWord("whale", "wh")} 的 wh 常唸 /w/，和 ${ruleWord("wet", "w")} 的開頭相同。`
    },
    sounds: {
      sh: "ʃ",
      ch: "tʃ",
      "th [θ]": "θ",
      "th [ð]": "ð",
      ph: "f",
      wh: "w",
      tr: "tr",
      dr: "dr",
      br: "br",
      cr: "kr"
    }
  },
  basic_consonants: {
    title: "普通子音 📖 學習樂園",
    notes: {
      "c [s]": `<b>c 的軟音</b>　c 後面接 e、i、y 時，通常唸 /s/。依序聽 ${ruleWord("face", "ce")}、${ruleWord("city", "ci")}、${ruleWord("fancy", "cy")}。`,
      "c [k]": `<b>c 的硬音</b>　c 後面接 a、o、u 時，通常唸 /k/，和 ${ruleWord("kite", "k")} 開頭的 k 同音。依序聽 ${ruleWord("cat", "ca")}、${ruleWord("cow", "co")}、${ruleWord("cup", "cu")}。`,
      "g [dʒ]": `<b>g 的軟音</b>　g 後面接 e、i、y 時，常唸 /dʒ/，和 ${ruleWord("jam", "j")} 開頭的 j 同音。依序聽 ${ruleWord("gem", "ge")}、${ruleWord("giant", "gi")}、${ruleWord("gym", "gy")}。留意 ${ruleWord("get", "ge")} 和 ${ruleWord("give", "gi")} 的 g 仍唸 /ɡ/。`,
      "g [g]": `<b>g 的硬音</b>　g 後面接 a、o、u 時，通常唸 /ɡ/。留意 ${ruleWord("get", "ge")} 和 ${ruleWord("give", "gi")}，這兩個字接了 e 或 i，g 仍唸 /ɡ/。`,
      k: `<b>字首的 kn</b>　比較 ${ruleWord("kite", "k")} 和 ${ruleWord("knee", "kn")}。kite 的 k 唸 /k/，knee 開頭的 kn 只唸 /n/。`,
      l: `<b>母音前後的 L</b>　${ruleWord("leg", "l")} 的 l 在母音前，通常較清亮。聽 ${ruleWord("milk", "l")} 和 ${ruleWord("ball", "ll")}，l 在同一個音節的母音後，舌後部也會抬起來，聲音常較厚，叫做「暗 L」[ɫ]。不同口音的明暗程度會有差別。<br>也留意前面的母音。字尾拼成 <b>-all</b> 時，a 常像 ball 裡的母音。聽 ${ruleWord("cat", "a")}，比較兩個字的 a。`,
      n: `<b>n 遇到 k</b>　先聽 ${ruleWord("nose", "n")} 開頭的 /n/，再聽 ${ruleWord("ink", "nk")} 和 ${ruleWord("thank", "nk")}。在這兩個字裡，舌後部先抬起發 /ŋ/，再接 /k/。`,
      r: `<b>母音前後的 r</b>　${ruleWord("red", "r")} 的 r 在母音前。換個口音再聽單獨的 ${ruleWord("car", "ar")}，多數美式讀法的字尾帶有 r 音，常見的英式和澳式讀法則以母音收尾。`,
      q: `<b>q 和 u 一起讀</b>　${ruleWord("queen", "qu")} 和 ${ruleWord("quick", "qu")} 開頭的 qu 都唸 /kw/。先發 /k/，接著把嘴唇收圓發 /w/。拼字時把 q 放在 u 前面。`,
      w: `<b>字首的 wr</b>　比較 ${ruleWord("wet", "w")} 和 ${ruleWord("write", "wr")}。wet 的 w 唸 /w/，write 開頭的 w 不發音。`,
      x: `<b>看 x 的位置</b>　字尾的 x 通常唸 /ks/，像 ${ruleWord("box", "x")}。把 /k/ 和 /s/ 連起來唸。聽聽 ${ruleWord("xylophone", "x")}，這個字開頭的 x 唸 /z/。`,
      y: `<b>y 也可以當母音</b>　${ruleWord("yes", "y")} 開頭的 y 是子音 /j/。舌面靠近上顎，再滑向後面的母音。聽聽 ${ruleWord("gym", "y")}，這裡的 y 是母音 /ɪ/。`
    },
    sounds: {
      b: "b", "c [k]": "k", "c [s]": "s", d: "d", f: "f",
      "g [g]": "g", "g [dʒ]": "dʒ", h: "h", j: "dʒ", k: "k",
      l: "l", m: "m", n: "n", p: "p", q: "kw", r: "r", s: "s",
      t: "t", v: "v", w: "w", x: "ks", y: "j", z: "z"
    }
  }
};

// ==========================================
// 2. 遊戲狀態變數
// ==========================================
let currentCategory = "";
let selectedCategory = ""; // 大廳選取的類別，用於模式選擇分流
let longVowelScope = "magic-e";
const LONG_VOWEL_SCOPE_LABELS = { "magic-e": "Magic E", regular: "普通", advanced: "進階" };
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let lives = 3;
let timer = 30;
let timerInterval = null;
let questionTransition = null;
let combo = 0;
let isCurrentQuestionAnswered = false;
let isEasyMode = true;
let gamePool = []; // 本局出題用的題庫

const CATEGORY_KEYS = Object.keys(WORD_DATABASE);

// 儲存至本地的資料
let highScores = Object.fromEntries(CATEGORY_KEYS.map(key => [key, 0]));
let starRatings = { ...highScores };

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
// 4. 單字與音素播放
// ==========================================
function speakWord(word, onEnded, onError) {
  window.PronunciationAudio.play("word", word, onEnded, onError);
}

function speakPhoneme(ipa) {
  window.PronunciationAudio.play("phoneme", ipa);
}

function playAnswerFeedback(word, effect, minimumDelay, advance) {
  const start = performance.now();
  function afterReading() {
    clearTimeout(questionTransition);
    playSound(effect);
    const remaining = minimumDelay - (performance.now() - start);
    questionTransition = setTimeout(advance, Math.max(450, remaining));
  }
  if (word) {
    // 先聽清楚單字再響提示音。若音檔一直無法播放，挑戰仍會進入下一題。
    questionTransition = setTimeout(advance, 4500);
    speakWord(word, afterReading, afterReading);
  } else {
    afterReading();
  }
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
// 6. 積木配對（滑鼠、觸控及觸控筆共用）
// ==========================================
let activeDrag = null;
const DRAG_THRESHOLD = 6;
const HOVER_MATCH_DELAY = 350;

function clearBlockDrag() {
  if (!activeDrag) return;
  const { block, pointerId, proxy, zone, hoverTimer } = activeDrag;
  activeDrag = null;
  clearTimeout(hoverTimer);
  proxy?.remove();
  zone.classList.remove("drag-over");
  block.classList.remove("dragging");
  if (block.hasPointerCapture(pointerId)) block.releasePointerCapture(pointerId);
}

function submitBlockDrag() {
  const letter = activeDrag.block.dataset.letter;
  clearBlockDrag();
  handleDrop(letter);
}

function isOverZone(zone, event) {
  const { left, right, top, bottom } = zone.getBoundingClientRect();
  return event.clientX >= left && event.clientX <= right &&
    event.clientY >= top && event.clientY <= bottom;
}

function movedFromStart(drag, event) {
  return Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY) > DRAG_THRESHOLD;
}

function createDragProxy(block) {
  const proxy = document.createElement("div");
  proxy.className = "drag-proxy";
  proxy.setAttribute("aria-hidden", "true");
  proxy.textContent = block.textContent;
  const style = window.getComputedStyle(block);
  proxy.style.background = style.background;
  proxy.style.boxShadow = style.boxShadow;
  proxy.style.width = style.width;
  proxy.style.height = style.height;
  proxy.style.fontSize = style.fontSize;
  document.body.appendChild(proxy);
  return proxy;
}

function moveBlockDrag(event) {
  const drag = activeDrag;
  if (drag?.pointerId !== event.pointerId) return;
  if (!drag.proxy) {
    if (!movedFromStart(drag, event)) return;
    drag.proxy = createDragProxy(drag.block);
    drag.block.classList.add("dragging");
  }
  drag.proxy.style.left = `${event.clientX}px`;
  drag.proxy.style.top = `${event.clientY}px`;
  const over = isOverZone(drag.zone, event);
  drag.zone.classList.toggle("drag-over", over);
  if (over && drag.hoverTimer === null) {
    drag.hoverTimer = setTimeout(() => {
      if (activeDrag === drag) submitBlockDrag();
    }, HOVER_MATCH_DELAY);
  } else if (!over) {
    clearTimeout(drag.hoverTimer);
    drag.hoverTimer = null;
  }
}

// 手指移出按鈕時，部分瀏覽器會把後續事件送到手指下的元素。
document.addEventListener("pointermove", moveBlockDrag);
document.addEventListener("pointerup", event => {
  if (activeDrag?.pointerId !== event.pointerId) return;
  const tap = !activeDrag.proxy && !movedFromStart(activeDrag, event);
  if (tap || isOverZone(activeDrag.zone, event)) submitBlockDrag();
  else clearBlockDrag();
});
document.addEventListener("pointercancel", event => {
  if (activeDrag?.pointerId === event.pointerId) clearBlockDrag();
});

function setupDragEvents(block) {
  block.addEventListener("pointerdown", event => {
    if (activeDrag || isCurrentQuestionAnswered || !event.isPrimary || event.button !== 0) return;
    initAudioContext();
    activeDrag = {
      block, pointerId: event.pointerId, startX: event.clientX, startY: event.clientY,
      zone: document.getElementById("drop-zone"), proxy: null, hoverTimer: null
    };
    block.setPointerCapture(event.pointerId);
  });

  block.addEventListener("lostpointercapture", event => {
    if (activeDrag?.block === block && activeDrag.pointerId === event.pointerId) clearBlockDrag();
  });

  // 鍵盤和輔助工具可直接啟用按鈕；實體指標已在放手或懸停時處理。
  block.addEventListener("click", event => {
    if (event.detail !== 0 || isCurrentQuestionAnswered) return;
    initAudioContext();
    handleDrop(block.dataset.letter);
  });
}

window.addEventListener("blur", clearBlockDrag);
window.addEventListener("pagehide", clearBlockDrag);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) clearBlockDrag();
});

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
  const scope = document.getElementById("long-practice-scope");
  scope.hidden = selectedCategory !== "long_vowels";
  const selected = scope.querySelector(`input[value="${longVowelScope}"]`);
  selected.checked = true;
  overlay.classList.remove("hidden");
  modalModeSelect.classList.remove("hidden");
  document.querySelector(".app-container").inert = true;
  (scope.hidden ? document.getElementById("btn-mode-learn") : selected).focus();
}

// 設定遊戲按鈕與視窗事件
function setupGameControlEvents() {
  document.getElementById("long-practice-scope").addEventListener("change", event => {
    longVowelScope = event.target.value;
  });
  const closeModeSelect = () => {
    hideModal();
    const card = document.querySelector(`[data-category="${selectedCategory}"]`);
    if (card.tagName === "DIV") card.tabIndex = -1; // 讓既有的關卡卡片也能接回焦點。
    card.focus();
  };
  const closeButton = document.getElementById("btn-mode-close");
  const playButton = document.getElementById("btn-mode-play-easy");
  closeButton.addEventListener("click", closeModeSelect);
  document.getElementById("modal-mode-select").addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModeSelect();
    } else if (event.key === "Tab") {
      if (event.shiftKey && event.target === closeButton) {
        event.preventDefault();
        playButton.focus();
      } else if (!event.shiftKey && event.target === playButton) {
        event.preventDefault();
        closeButton.focus();
      }
    }
  });

  document.getElementById("study-screen").addEventListener("click", event => {
    const wordButton = event.target.closest(".rule-word");
    if (wordButton) speakWord(wordButton.dataset.word);
  });

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
    if (currentQ && !isCurrentQuestionAnswered) {
      speakWord(currentQ.word);
    }
  });

  // 模式選擇彈窗按鈕
  document.getElementById("btn-mode-learn").addEventListener("click", () => {
    playSound("click");
    hideModal();
    startStudy(selectedCategory);
  });

  playButton.addEventListener("click", () => {
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
    startGame(currentStudyCategory);
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

function isMagicE(word) {
  return word.spelling === word.vowel + "_e";
}

function longVowelPracticeWords() {
  return WORD_DATABASE.long_vowels.filter(word => {
    if (isMagicE(word)) return longVowelScope === "magic-e";
    return longVowelScope === (word.adv ? "advanced" : "regular");
  });
}

// 每個母音抽兩個不同單字，有多種拼法時各抽一種。
function drawLongVowelQuestions(pool) {
  const shuffled = shuffleArray([...pool]);
  const questions = [];
  for (const vowel of Object.keys(PHONICS_DATA.long_vowels.sounds)) {
    const words = shuffled.filter(word => word.vowel === vowel);
    const pair = words.slice(0, 2);
    if (pair.length === 2) {
      pair[1] = words.find(word => word.spelling !== pair[0].spelling) || pair[1];
    }
    questions.push(...pair);
  }
  return shuffleArray(questions);
}

// 開始遊戲
function startGame(category) {
  currentCategory = category;
  score = 0;
  lives = 3;
  combo = 0;
  currentQuestionIndex = 0;
  
  const isLongVowelGame = category === "long_vowels";
  gamePool = isLongVowelGame ? longVowelPracticeWords() : WORD_DATABASE[category];
  currentQuestions = isLongVowelGame
    ? drawLongVowelQuestions(gamePool)
    : shuffleArray([...gamePool]).slice(0, QUESTIONS_PER_GAME);

  // 切換畫面
  hideStudyRule();
  document.querySelector(".app-container").classList.remove("study-mode-active");
  document.getElementById("study-screen").classList.add("hidden");
  document.getElementById("lobby-screen").classList.add("hidden");
  document.getElementById("long-quiz-status").hidden = !isLongVowelGame;
  document.getElementById("game-hud").classList.remove("hidden");
  document.getElementById("game-screen").classList.remove("hidden");

  // 更新 HUD
  updateHUD();

  // 載入第一題
  loadQuestion();
}

// 載入題目
function loadQuestion() {
  clearBlockDrag();
  clearTimeout(questionTransition);
  window.PronunciationAudio.stop();
  isCurrentQuestionAnswered = false;
  clearInterval(timerInterval);
  
  const currentQ = currentQuestions[currentQuestionIndex];
  
  // 更新進度條
  const progressPercent = (currentQuestionIndex / currentQuestions.length) * 100;
  document.getElementById("game-progress").style.width = `${progressPercent}%`;
  if (currentCategory === "long_vowels") {
    const name = LONG_VOWEL_SCOPE_LABELS[longVowelScope];
    document.getElementById("long-quiz-status").textContent =
      `${name} · 第 ${currentQuestionIndex + 1} / ${currentQuestions.length} 題`;
  }

  // 生成雲朵單字結構
  const wordContainer = document.getElementById("word-container");
  document.getElementById("game-word-meaning").textContent = WORD_MEANINGS[currentQ.word];
  wordContainer.innerHTML = `
    <span class="word-letter">${currentQ.clue[0]}</span>
    <div id="drop-zone" class="drop-zone">?</div>
    <span class="word-letter">${currentQ.clue[1]}</span>
  `;

  // 生成選項積木
  generateOptions(currentQ);

  // 自動發音 (僅限簡單模式)
  const btnSpeakCloud = document.getElementById("btn-speak");
  if (isEasyMode) {
    btnSpeakCloud.style.display = "flex"; // 顯示按鈕
    speakWord(currentQ.word);
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
  const spellings = [...new Set(gamePool.map(word => word.missing))];
  // 同一題面可能拼出同音字，例如 s□ 配上 ee 或 ea 都唸 /si/。
  const distractors = spellings.filter(spelling => spelling !== correctAnswer &&
    !question.homophones?.includes(question.clue[0] + spelling + question.clue[1]));
  const options = shuffleArray([correctAnswer, ...shuffleArray(distractors).slice(0, 4)]);

  // 渲染積木
  options.forEach((letter) => {
    const block = document.createElement("button");
    block.type = "button";
    block.className = "block";
    block.setAttribute("data-letter", letter);
    block.textContent = letter;
    
    // 綁定拖曳事件
    setupDragEvents(block);

    container.appendChild(block);
  });
}

// 處理放置判斷
function handleDrop(letter) {
  clearBlockDrag();
  if (isCurrentQuestionAnswered) return;
  const currentQ = currentQuestions[currentQuestionIndex];
  const dropZone = document.getElementById("drop-zone");

  if (letter === currentQ.missing) {
    // 答對了！
    isCurrentQuestionAnswered = true;
    clearTimeout(questionTransition);
    clearInterval(timerInterval);
    combo++;
    
    // 計算分數：基本 10 分 + 賸餘時間加成，連擊達 3 次以上加倍
    const pts = (10 + timer) * (combo >= 3 ? 2 : 1);
    score += pts;

    // 播放音效與粒子特效
    createCelebrationBurst();

    // 更新 UI 狀態
    dropZone.textContent = answerLetters(currentQ);
    dropZone.className = "drop-zone correct";
    updateHUD();

    // 觸發 Combo 動畫
    const comboBadge = document.getElementById("combo-badge");
    if (combo >= 3) {
      comboBadge.textContent = `Combo x${combo}! 🔥`;
      comboBadge.classList.add("show");
    }

    playAnswerFeedback(isEasyMode ? currentQ.word : null, "correct", 1800, () => {
      comboBadge.classList.remove("show");
      nextQuestion();
    });

  } else {
    loseLife(false);
  }
}

// 時間到未答
function handleTimeout() {
  clearBlockDrag();
  if (isCurrentQuestionAnswered) return;
  loseLife(true);
}

function loseLife(timedOut) {
  clearTimeout(questionTransition);
  combo = 0;
  lives--;
  isCurrentQuestionAnswered = timedOut || lives === 0;
  if (isCurrentQuestionAnswered) clearInterval(timerInterval);
  navigator.vibrate?.(100);
  playSound("wrong");
  updateHUD();

  const dropZone = document.getElementById("drop-zone");
  dropZone.className = "drop-zone wrong";
  const shake = dropZone.getAnimations().find(animation => animation.animationName === "shake");
  if (shake) shake.currentTime = 0;
  if (timedOut) dropZone.textContent = "⏰";

  if (lives === 0) {
    questionTransition = setTimeout(showGameOver, 550);
  } else if (timedOut) {
    questionTransition = setTimeout(nextQuestion, 1200);
  } else {
    questionTransition = setTimeout(() => dropZone.classList.remove("wrong"), 500);
  }
}

// 下一題
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= currentQuestions.length) {
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
  clearBlockDrag();
  window.PronunciationAudio.stop();
  playSound("clear");
  const overlay = document.getElementById("modal-overlay");
  const modalClear = document.getElementById("modal-clear");
  
  overlay.classList.remove("hidden");
  modalClear.classList.remove("hidden");

  // 本地紀錄更新
  // 舊版 long_vowels_advanced 是混合題庫的成績，拆章後分開計算。
  let scoreKey = currentCategory;
  if (currentCategory === "long_vowels") {
    const suffix = { "magic-e": "magic_e", regular: "regular", advanced: "advanced_only" };
    scoreKey = `long_vowels_${suffix[longVowelScope]}`;
  }
  let previousHigh = highScores[scoreKey] || 0;
  if (score > previousHigh) {
    highScores[scoreKey] = score;
  }

  // 星等判定：
  // 3 顆星：剩餘 3 條命且得分高 (或是答對所有題目)
  // 2 顆星：剩餘 2 條命
  // 1 顆星：剩餘 1 條命
  let stars = 1;
  if (lives === 3) stars = 3;
  else if (lives === 2) stars = 2;

  if (stars > (starRatings[scoreKey] || 0)) {
    starRatings[scoreKey] = stars;
  }

  saveStats();

  // 更新彈窗數值
  document.getElementById("clear-score").textContent = score;
  document.getElementById("clear-highscore").textContent = highScores[scoreKey] || 0;

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
  clearBlockDrag();
  window.PronunciationAudio.stop();
  playSound("gameover");
  const overlay = document.getElementById("modal-overlay");
  const modalGameOver = document.getElementById("modal-gameover");
  const question = currentQuestions[currentQuestionIndex];
  document.getElementById("fail-tile").textContent = question.missing;
  document.getElementById("fail-word").innerHTML = highlightedSpelling(question);
  document.getElementById("fail-meaning").textContent = WORD_MEANINGS[question.word];
  
  overlay.classList.remove("hidden");
  modalGameOver.classList.remove("hidden");

  document.getElementById("fail-score").textContent = score;
  document.querySelector(".app-container").inert = true;
  modalGameOver.scrollTop = 0;
  document.getElementById("fail-title").focus({ preventScroll: true });
}

function hideModal() {
  document.querySelector(".app-container").inert = false;
  document.getElementById("modal-overlay").classList.add("hidden");
  document.getElementById("modal-clear").classList.add("hidden");
  document.getElementById("modal-gameover").classList.add("hidden");
  document.getElementById("modal-mode-select").classList.add("hidden");
}

function exitToLobby() {
  clearBlockDrag();
  clearInterval(timerInterval);
  clearTimeout(questionTransition);
  window.PronunciationAudio.stop();
  document.getElementById("combo-badge").classList.remove("show");
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

let studyRuleAnchor = null;

function hideStudyRule(returnFocus = false) {
  if (studyRuleAnchor) {
    studyRuleAnchor.removeAttribute("aria-details");
    if (returnFocus && studyRuleAnchor.isConnected) studyRuleAnchor.focus({ preventScroll: true });
    studyRuleAnchor = null;
  }
  const intro = document.getElementById("phonics-intro");
  intro.textContent = "點選字母、拼法或例字，就能在這裡看對應的規則。";
  intro.scrollTop = 0;
  document.querySelector(".rule-close").disabled = true;
}

function showStudyRule(html, anchor) {
  if (!html || !anchor?.isConnected) {
    hideStudyRule();
    return;
  }
  if (studyRuleAnchor) studyRuleAnchor.removeAttribute("aria-details");
  const intro = document.getElementById("phonics-intro");
  intro.innerHTML = html;
  intro.scrollTop = 0;
  document.querySelector(".rule-close").disabled = false;
  anchor.setAttribute("aria-details", "phonics-info-card");
  studyRuleAnchor = anchor;
}

document.querySelector(".rule-close").addEventListener("click", () => hideStudyRule(true));
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && studyRuleAnchor && !event.target.closest(".word-focus-dialog")) hideStudyRule(true);
});

window.addEventListener("accentchange", () => {
  if (document.getElementById("study-screen").classList.contains("hidden")) return;
  const studyData = PHONICS_DATA[currentStudyCategory];
  if (!studyData) return;
  document.querySelectorAll(".study-tile[data-sound]").forEach(updateConsonantTileLabel);
  if (currentStudyCategory === "basic_consonants") updateConsonantFilterStatus();
  const render = {
    short_vowels: renderShortVowels,
    long_vowels: renderLongVowels,
    special_vowels: renderSpecialVowelTable
  }[currentStudyCategory];
  if (render) {
    hideStudyRule();
    document.getElementById("study-tiles-container").replaceChildren();
    render(studyData);
  }
});

function startStudy(category) {
  hideStudyRule();
  currentStudyCategory = category;
  currentFilteredLetter = ""; // 預設顯示全部

  // 切換頁面
  document.querySelector(".app-container").classList.add("study-mode-active");
  document.getElementById("lobby-screen").classList.add("hidden");
  document.getElementById("study-screen").classList.remove("hidden");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });

  const studyData = PHONICS_DATA[category];
  const title = studyData.title.replace(/\s*📖\s*/g, " ");
  document.getElementById("study-title").textContent = category === "long_vowels"
    ? `${title} · ${LONG_VOWEL_SCOPE_LABELS[longVowelScope]}` : title;

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

  // 兩個子音章節共用可篩選的字母與例字卡。
  document.getElementById("consonant-tiles-title").textContent =
    category === "basic_consonants" ? "選擇子音字母" : "選擇子音組合";
  tilesPrompt.style.display = "";
  wordsSection.style.display = "";
  tilesContainer.style.display = "flex";
  tilesContainer.style.flexWrap = "wrap";
  renderConsonantTiles(category, studyData);
  renderStudyWords();
}

// ---- 共用小工具 ----
function answerLetters(w) {
  const word = w.display || w.word;
  return word.slice(w.clue[0].length, word.length - w.clue[1].length);
}

function highlightedSpelling(w) {
  const before = w.clue[0];
  const suffix = w.clue[1];
  const after = isMagicE(w) ? suffix.slice(0, -1) + "<u>e</u>" : suffix;
  return `${before}<u>${answerLetters(w)}</u>${after}`;
}

function wordChipHtml(w) {
  return `<button type="button" class="word-chip" data-word="${w.word}"><span lang="en">${highlightedSpelling(w)}</span> 🔊<span class="study-meaning">${WORD_MEANINGS[w.word]}</span></button>`;
}

// 把長母音拼法轉成好懂的標籤
function spellLabel(spelling) {
  if (spelling === "open") return "開音節";
  if (spelling.endsWith("_e")) return spelling + "（magic-e）";
  return spelling;
}

// 每個音標或拼法按鈕都帶一個同列例字，供點擊時解說。
function bindVowelButtons(container, words, describe) {
  container.querySelectorAll("button[data-ipa], button[data-word]").forEach(button => {
    const name = button.dataset.word || button.dataset.example;
    const example = words.find(word => word.word === name);
    button.addEventListener("click", () => {
      if (button.dataset.word) {
        speakWord(name);
      } else {
        speakPhoneme(button.dataset.ipa);
      }
      showStudyRule(describe(example), button);
    });
  });
}

function shortVowelRule(word) {
  const sound = window.AccentPhonics.label(PHONICS_DATA.short_vowels.sounds[word.vowel]);
  const pattern = word.pattern === "CVC" ? "子音＋母音＋子音" : "母音＋子音";
  const contrast = word.word === "cat"
    ? `再聽 ${ruleWord("ball", "a")}。字尾拼成 -all 時，a 常和 cat 的短 a 不同。`
    : "";
  return `<b>${word.word}</b> 裡畫線的 ${word.vowel} 在「${pattern}」的閉音節裡，唸短音 ${sound}。${contrast}`;
}

function longVowelRule(word) {
  const letterSound = PHONICS_DATA.long_vowels.sounds[word.vowel];
  const key = window.AccentPhonics.longVowelKey(word, letterSound);
  const sound = window.AccentPhonics.label(key);
  if (isMagicE(word)) {
    const reading = key === letterSound ? `唸字母名 ${sound}` : `唸 ${sound}`;
    return `<b>${word.word}</b> 的字尾 e 不發音。在這個字的 ${word.spelling} 拼法裡，前面的 ${word.vowel} ${reading}。`;
  }
  if (word.spelling === "open") {
    return `<b>${word.word}</b> 裡畫線的 ${word.vowel} 在音節尾，這個開音節的母音唸字母名 ${sound}。`;
  }
  const position = ["ai", "ay"].includes(word.spelling) ? "ai 常在字中，ay 常在字尾。" : "";
  const letterName = key === letterSound ? `，和字母 ${word.vowel.toUpperCase()} 的名字同音` : "";
  return `<b>${word.display || word.word}</b> 裡的 ${word.spelling} 要放在一起讀，唸 ${sound}${letterName}。${position}`;
}

// ---- 長/短母音對照表（兩頁共用，active 那一排會加框） ----
function renderVowelCompare(activeType, longWords = WORD_DATABASE.long_vowels) {
  const wrap = document.createElement("div");
  wrap.className = "vowel-compare";

  const rows = [
    { type: "long",  label: "長母音", cls: "long-vowel",  sounds: PHONICS_DATA.long_vowels.sounds },
    { type: "short", label: "短母音", cls: "short-vowel", sounds: PHONICS_DATA.short_vowels.sounds }
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

    const isLong = r.type === "long";
    const words = isLong ? longWords : WORD_DATABASE.short_vowels;
    ["a", "e", "i", "o", "u"].forEach((v) => {
      const letter = v.toUpperCase();
      const example = words.find(word => word.vowel === v &&
        (!isLong || window.AccentPhonics.longVowelKey(word, r.sounds[v]) === r.sounds[v]));
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = `study-tile ${r.cls}`;
      tile.textContent = v;
      tile.dataset.ipa = r.sounds[v];
      tile.setAttribute("aria-label", isLong ? `長母音 ${letter}，聽字母名稱` : `聽短母音 ${letter}`);
      tile.addEventListener("click", () => {
        window.PronunciationAudio.playVowel(isLong ? "letter" : "phoneme-single", isLong ? letter : r.sounds[v]);
        const rule = example ? (isLong ? longVowelRule(example) : shortVowelRule(example))
          : `字母 ${letter} 的名字唸 ${window.AccentPhonics.label(r.sounds[v])}。`;
        showStudyRule(rule, tile);
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

  Object.entries(studyData.sounds).forEach(([v, key]) => {
    const name = `短 ${v.toUpperCase()} ${window.AccentPhonics.label(key)}`;
    const words = WORD_DATABASE.short_vowels.filter((w) => w.vowel === v);
    const cvc = words.filter((w) => w.pattern === "CVC");
    const vc = words.filter((w) => w.pattern === "VC");

    const group = document.createElement("div");
    group.className = "vgroup";
    group.innerHTML = `
      <button type="button" class="vgroup-head short-head" data-ipa="${key}" data-example="${cvc[0].word}">${name} 🔊</button>
      <div class="vgroup-body">
        <div class="patt-row">
          <button type="button" class="patt-tag tappable tag-cvc" data-ipa="${key}" data-example="${cvc[0].word}">子母子</button>
          <div class="chips">${cvc.map(wordChipHtml).join("")}</div>
        </div>
        <div class="patt-row">
          <button type="button" class="patt-tag tappable tag-vc" data-ipa="${key}" data-example="${vc[0].word}">母子</button>
          <div class="chips">${vc.map(wordChipHtml).join("")}</div>
        </div>
      </div>
    `;
    bindVowelButtons(group, words, shortVowelRule);
    c.appendChild(group);
  });
}

// ---- ② 長母音頁 ----
function renderLongVowels(studyData) {
  const c = document.getElementById("study-tiles-container");
  const pool = longVowelPracticeWords();
  c.appendChild(renderVowelCompare("long", pool));

  Object.entries(studyData.sounds).forEach(([v, key]) => {
    const words = pool.filter(w => w.vowel === v);
    const example = words.find(w => window.AccentPhonics.longVowelKey(w, key) === key) || words[0];
    const exampleKey = window.AccentPhonics.longVowelKey(example, key);
    const name = `長 ${v.toUpperCase()} ${window.AccentPhonics.label(exampleKey)}`;

    // 相同拼法在不同單字裡可能有不同的音，例如 new 和 few 的 ew。
    const rows = new Map();
    words.forEach((w) => {
      const ipa = window.AccentPhonics.longVowelKey(w, key);
      const rowKey = `${w.spelling}-${ipa}`;
      if (!rows.has(rowKey)) rows.set(rowKey, { spelling: w.spelling, ipa, isAdv: w.adv, words: [] });
      rows.get(rowKey).words.push(w);
    });

    const rowsHtml = [...rows.values()].map(({ spelling, ipa, isAdv, words: list }) => {
      const label = v === "u" ? `${spellLabel(spelling)} ${window.AccentPhonics.label(ipa)}` : spellLabel(spelling);
      return `
        <div class="patt-row">
          <button type="button" class="patt-tag tappable ${isAdv ? "tag-adv" : "tag-basic"}" data-ipa="${ipa}" data-example="${list[0].word}">${label} 🔊</button>
          <div class="chips">${list.map(wordChipHtml).join("")}</div>
        </div>`;
    }).join("");

    const group = document.createElement("div");
    group.className = "vgroup";
    group.innerHTML = `
      <button type="button" class="vgroup-head long-head" data-ipa="${exampleKey}" data-example="${example.word}">${name} 🔊</button>
      <div class="vgroup-body">${rowsHtml}</div>
    `;
    bindVowelButtons(group, words, longVowelRule);
    c.appendChild(group);
  });
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
      .map((cmb) => `<button type="button" class="vt-combo" data-ipa="${g.ipa}" data-example="${words.find(w => w.missing === cmb).word}">${cmb}</button>`)
      .join("");

    const wordsHtml = words
      .map((w) => `<button type="button" class="vt-word" data-word="${w.word}"><span lang="en">${highlightedSpelling(w)}</span> 🔊<span class="study-meaning">${WORD_MEANINGS[w.word]}</span></button>`)
      .join("");

    const tr = document.createElement("tr");
    tr.className = `vt-row vt-row-${g.id}`;
    tr.innerHTML = `
      <td><button type="button" class="vt-sound" data-ipa="${g.ipa}" data-example="${words[0].word}">
        <span class="vt-ipa">${window.AccentPhonics.label(g.ipa)}</span>
        <span class="vt-note">${g.note}</span>
      </button></td>
      <td><div class="vt-combos">${combosHtml}</div></td>
      <td><div class="vt-words">${wordsHtml}</div></td>
    `;
    bindVowelButtons(tr, words, word =>
      `<b>${word.word}</b> 裡的 ${word.missing} 唸 ${window.AccentPhonics.label(g.ipa)}。${g.tip}`
    );
    tbody.appendChild(tr);
  });

  container.appendChild(table);
}

// ---- ④ 弱化母音 schwa：教學示範 + 聽音找輕聲 ----
let schwaOrder = [];
let schwaIdx = 0;
let schwaScore = 0;
let schwaAnswered = false;

function isVowelChar(ch) {
  return "aeiouy".includes(ch.toLowerCase());
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
    hideStudyRule();
    schwaMode = mode;
    tabs.querySelectorAll(".schwa-tab").forEach((b) =>
      b.classList.toggle("active", b.dataset.mode === mode)
    );
    if (mode === "learn") {
      window.PronunciationAudio.stop();
      renderSchwaLearn();
    } else {
      renderSchwaPractice();
    }
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
  content.innerHTML = `<p class="schwa-learn-tip">點單字聽發音，留意標紅的母音。</p>`;

  const grid = document.createElement("div");
  grid.className = "schwa-learn-grid";

  WORD_DATABASE.schwa.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "schwa-learn-card";
    card.dataset.word = item.word;
    card.setAttribute("aria-label", `播放 ${item.word}，${WORD_MEANINGS[item.word]}，查看弱化母音`);
    card.appendChild(schwaSyllNode(item));

    const meta = document.createElement("span");
    meta.className = "schwa-zh";
    meta.textContent = `${WORD_MEANINGS[item.word]} 🔊`;
    card.appendChild(meta);

    card.addEventListener("click", () => {
      speakWord(item.word);
      const weakSyll = item.syll[item.weak];
      showStudyRule(`<b>${item.word}</b> 裡的 ${weakSyll} 是沒有重音的音節。注意聽其中的 ${item.word[item.schwa]}，它在這裡讀成輕短的弱化母音 /ə/。`, card);
    });
    grid.appendChild(card);
  });

  content.appendChild(grid);
}

// 依音節拆解成節點：輕音節加灰底、schwa 母音標紅
function schwaSyllNode(item) {
  const node = document.createElement("span");
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
  clearTimeout(questionTransition);
  window.PronunciationAudio.stop();
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
  const meaning = document.createElement("p");
  meaning.className = "schwa-zh";
  meaning.textContent = WORD_MEANINGS[item.word];
  quiz.appendChild(meaning);

  const bar = document.createElement("div");
  bar.className = "schwa-bar";
  bar.innerHTML = `<button class="btn-replay">🔊 再聽一次</button>`;
  quiz.appendChild(bar);

  const feedback = document.createElement("div");
  feedback.className = "schwa-feedback";
  feedback.id = "schwa-feedback";
  quiz.appendChild(feedback);

  bar.querySelector(".btn-replay").addEventListener("click", () => {
    if (!schwaAnswered) speakWord(item.word);
  });
  wordNode.querySelectorAll(".schwa-vbtn").forEach((btn) => {
    btn.addEventListener("click", () => onSchwaAnswer(parseInt(btn.dataset.i, 10), item, wordNode));
  });

  speakWord(item.word);
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
    createCelebrationBurst();
    feedback.innerHTML = `🎉 答對了！「${item.word}」的這個母音偷懶唸成 /ə/。`;
    feedback.className = "schwa-feedback ok";
  } else {
    const chosen = wordNode.querySelector(`.schwa-vbtn[data-i="${i}"]`);
    if (chosen) chosen.classList.add("schwa-wrong");
    feedback.innerHTML = `💡 再聽一次～綠色那個母音才是偷懶的 /ə/。`;
    feedback.className = "schwa-feedback no";
  }

  playAnswerFeedback(item.word, i === item.schwa ? "correct" : "wrong", 1900, () => {
    if (!wordNode.isConnected || document.getElementById("study-screen").classList.contains("hidden")) return;
    schwaIdx++;
    loadSchwaQuestion();
  });
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

// ---- 子音頁：可篩選、可直接試聽的發音卡 ----
function consonantGroup(word) {
  return word.soundGroup || word.missing;
}

function showConsonantRule(group, anchor) {
  const chapter = PHONICS_DATA[currentStudyCategory];
  let rule = chapter.notes[group];
  if (!rule && currentStudyCategory === "consonants") {
    const example = WORD_DATABASE.consonants.find(word => consonantGroup(word) === group);
    rule = `<b>${group} 的兩個子音</b>　聽 ${ruleWord(example.word, group)} 的開頭。把 ${group[0]} 的音直接接到 ${group[1]}，中間不加母音。`;
  }
  showStudyRule(rule, anchor);
}

function updateConsonantTileLabel(tile) {
  const badge = tile.querySelector(".study-tile-ipa");
  if (badge) badge.textContent = window.AccentPhonics.label(tile.dataset.sound);
  tile.setAttribute("aria-label", `篩選 ${tile.textContent.trim()} 的例字並播放發音`);
}

function renderConsonantTiles(category, studyData) {
  const tilesContainer = document.getElementById("study-tiles-container");
  tilesContainer.innerHTML = "";
  const speakerIcon = '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/></svg>';

  // 「全部」按鈕
  const allTile = document.createElement("button");
  allTile.type = "button";
  allTile.className = "study-tile study-tile-all active";
  allTile.setAttribute("aria-pressed", "true");
  allTile.setAttribute("aria-label", "顯示本章全部單字");
  allTile.textContent = "全部";
  allTile.addEventListener("click", () => {
    playSound("click");
    document.querySelectorAll(".study-tile").forEach((t) => {
      t.classList.remove("active");
      t.setAttribute("aria-pressed", "false");
    });
    allTile.classList.add("active");
    allTile.setAttribute("aria-pressed", "true");
    currentFilteredLetter = "";
    hideStudyRule();
    renderStudyWords();
  });
  tilesContainer.appendChild(allTile);

  const defaultRow = document.createElement("div");
  defaultRow.className = "study-tile-row";
  if (category === "basic_consonants") defaultRow.classList.add("basic-consonant-tiles");
  const uniqueLetters = [...new Set(WORD_DATABASE[category].map(consonantGroup))];
  uniqueLetters.forEach((letter) => {
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "study-tile";
    tile.setAttribute("aria-pressed", "false");
    const match = letter.match(/^(.+?) \[(.+)\]$/);
    const label = match ? match[1] : letter;
    tile.dataset.sound = studyData.sounds[letter];
    const showIpa = category === "basic_consonants" || match;
    tile.innerHTML = `<span>${label}</span> ${showIpa ? '<span class="study-tile-ipa"></span>' : ""}${speakerIcon}`;
    updateConsonantTileLabel(tile);
    tile.addEventListener("click", () => {
      document.querySelectorAll(".study-tile").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-pressed", "false");
      });
      tile.classList.add("active");
      tile.setAttribute("aria-pressed", "true");
      speakPhoneme(studyData.sounds[letter]);
      currentFilteredLetter = letter;
      renderStudyWords();
      showConsonantRule(letter, tile);
    });
    defaultRow.appendChild(tile);
  });
  tilesContainer.appendChild(defaultRow);
}

function updateConsonantFilterStatus() {
  const count = document.querySelectorAll("#study-words-container .study-word-card").length;
  const status = document.getElementById("study-filter-status");
  if (!currentFilteredLetter) {
    status.textContent = `全部・${count} 個單字`;
    return;
  }
  const activeTile = document.querySelector("#study-tiles-container [data-sound].active");
  status.textContent = `${activeTile.textContent.trim()}・${count} 個單字`;
}

function renderStudyWords() {
  const container = document.getElementById("study-words-container");
  container.replaceChildren();
  const words = WORD_DATABASE[currentStudyCategory];
  // 篩選單字
  const displayWords = currentFilteredLetter 
    ? words.filter(w => consonantGroup(w) === currentFilteredLetter)
    : words;

  displayWords.forEach(word => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "study-word-card";
    card.dataset.word = word.word;
    card.setAttribute("aria-label", `播放 ${word.word}，${WORD_MEANINGS[word.word]}`);

    card.innerHTML = `
      <span><span class="study-word-text" lang="en">${highlightedSpelling(word)}</span><span class="study-meaning">${WORD_MEANINGS[word.word]}</span></span>
      <span class="study-word-speaker" aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18 6a8.5 8.5 0 0 1 0 12"/></svg>
      </span>
    `;

    card.addEventListener("click", () => {
      speakWord(word.word);
      showConsonantRule(consonantGroup(word), card);
    });

    container.appendChild(card);
  });
  updateConsonantFilterStatus();
}

function exitStudyToLobby() {
  hideStudyRule();
  window.PronunciationAudio.stop();
  document.querySelector(".app-container").classList.remove("study-mode-active");
  document.getElementById("study-screen").classList.add("hidden");
  document.getElementById("lobby-screen").classList.remove("hidden");
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

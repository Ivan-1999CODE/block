(() => {
  // 同一個教學項目沿用相同音檔名稱，畫面上的音標依口音轉換。
  // 澳洲母音採用麥覺理大學的 Harrington–Cox–Evans 標音。
  // https://www.mq.edu.au/faculty-of-medicine-health-and-human-sciences/departments-and-schools/department-of-linguistics/our-research/phonetics-and-phonology/speech/australian-english-pronunciation-and-transcription/chapter-2-vowels
  const symbols = {
    us: {},
    gb: {
      "ɑ": "ɒ", "ɑr": "ɑː", "ɝ": "ɜː", "ɔ": "ɔː", "oʊ": "əʊ",
      "ɛ": "e", "i": "iː", "happy-i": "i", "u": "uː", "ju": "juː", "jʊ": "jʊə"
    },
    au: {
      "ɑ": "ɔ", "ɑr": "ɐː", "ɝ": "ɜː", "ɔ": "oː", "oʊ": "əʉ",
      "ɛ": "e", "ʌ": "ɐ", "i": "iː", "u": "ʉː", "ju": "jʉː",
      "jʊ": "jʊə", "eɪ": "æɪ", "aɪ": "ɑe", "aʊ": "æɔ", "ɔɪ": "oɪ",
      "r": "ɹ", "br": "bɹ", "dr": "dɹ", "kr": "kɹ", "tr": "tɹ"
    }
  };

  function label(key) {
    const accent = window.PronunciationAudio.accent;
    return `/${symbols[accent]?.[key] || key}/`;
  }

  function longVowelKey(word, defaultKey) {
    if (window.PronunciationAudio.accent !== "us" && word.gbAuIpa) {
      return word.gbAuIpa;
    }
    return word.ipa || defaultKey;
  }

  window.AccentPhonics = { label, longVowelKey };
})();

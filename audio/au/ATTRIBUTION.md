# 澳洲英語發音來源

三種口音共用的子音錄音另列於[子音示範錄音來源](../ATTRIBUTION.md)。

## 長短母音的真人錄音

下表的 12 個 `phoneme/` 示範取自 Commander Keane 在 Wikimedia Commons 發表的澳洲英語單字錄音。製作時擷取母音，去除低頻雜音，以 Praat 的音高同步疊加法調整時長。每個 MP3 保留一聲完整示範，`phoneme-single/` 中的 5 個短母音與同名示範相同。原作與這些衍生音檔都採用 [Creative Commons 姓名標示－相同方式分享 4.0 國際授權](https://creativecommons.org/licenses/by-sa/4.0/)。錄音副本取自 [Wiktionary 英語發音資料集](https://huggingface.co/datasets/Reza2kn/wiktionary-ipa-audio-en)。

| 教學音 | 檔名 | Commander Keane 的原始錄音 |
|---|---|---|
| 短 A /æ/ | `æ.mp3` | [pad](https://commons.wikimedia.org/wiki/File:En-au-pad.ogg) |
| 短 E /e/ | `ɛ.mp3` | [edge](https://commons.wikimedia.org/wiki/File:En-au-edge.ogg) |
| 短 I /ɪ/ | `ɪ.mp3` | [fid](https://commons.wikimedia.org/wiki/File:En-au-fid.ogg) |
| 短 O /ɔ/ | `ɑ.mp3` | [swab](https://commons.wikimedia.org/wiki/File:En-au-swab.ogg) |
| 短 U /ɐ/ | `ʌ.mp3` | [mug](https://commons.wikimedia.org/wiki/File:En-au-mug.ogg) |
| 長 A /æɪ/ | `eɪ.mp3` | [Abe](https://commons.wikimedia.org/wiki/File:En-au-Abe.ogg) |
| 長 E /iː/ | `i.mp3` | [me](https://commons.wikimedia.org/wiki/File:En-au-me.ogg) |
| 長 I /ɑe/ | `aɪ.mp3` | [pie](https://commons.wikimedia.org/wiki/File:En-au-pie.ogg) |
| 長 O /əʉ/ | `oʊ.mp3` | [hoe](https://commons.wikimedia.org/wiki/File:En-au-hoe.ogg) |
| 長 U /jʉː/ | `ju.mp3` | [ute](https://commons.wikimedia.org/wiki/File:En-au-ute.ogg) |
| /ʉː/ | `u.mp3` | [boo](https://commons.wikimedia.org/wiki/File:En-au-boo.ogg) |
| /jʊə/ | `jʊ.mp3` | [demure](https://commons.wikimedia.org/wiki/File:En-au-demure.ogg) |

## 取自真人錄音的單字

以下 5 個單字使用 Commander Keane 的澳洲英語錄音。剪輯時調整片段起迄與音量，加上淡入淡出後編碼為 MP3。原作與這 5 個衍生音檔均採用 [Creative Commons 姓名標示－相同方式分享 4.0 國際授權](https://creativecommons.org/licenses/by-sa/4.0/)。

| 檔名 | 擷取片段 | Wikimedia Commons 原始錄音 |
|---|---|---|
| `word/mail.mp3` | 複合字後半的 mail | [airmail](https://commons.wikimedia.org/wiki/File:En-au-airmail.ogg) |
| `word/veil.mp3` | 重讀音節 /veɪl/ | [avail](https://commons.wikimedia.org/wiki/File:En-au-avail.ogg) |
| `word/odd.mp3` | 從母音起點保留到字尾的 /d/ | [sod](https://commons.wikimedia.org/wiki/File:En-au-sod.ogg) |
| `word/wool.mp3` | 第一音節 wool | [woolly](https://commons.wikimedia.org/wiki/File:En-au-woolly.ogg) |
| `word/lake.mp3` | 將字首 /l/ 和 lake 的韻部交叉淡化銜接 | [lid](https://commons.wikimedia.org/wiki/File:En-au-lid.ogg)、[jake](https://commons.wikimedia.org/wiki/File:En-au-jake.ogg) |

## 字母 Q 的名稱

`letter/Q.mp3` 採用 Commander Keane 親錄的澳式英語 queue，與字母 Q 同音。剪輯時去除前後靜音、轉為單聲道並調整音量。原作與此衍生音檔均採用 CC BY-SA 4.0 授權。[原始錄音](https://commons.wikimedia.org/wiki/File:En-au-queue.ogg) · [授權條款](https://creativecommons.org/licenses/by-sa/4.0/)

## 合成的單字、字母名稱與其他音素

除上述真人錄音與三種口音共用的子音示範外，澳洲英語音檔由 Data Craftsman 的 `en_AU-librivox-medium` 模型合成。主要聲線 Banjo 的訓練錄音來自 LibriVox 志工 Timothy Ferguson。`word/argue.mp3` 使用 LibriVox 朗讀者 Algy Pug 的聲線。教學音檔經過片段擷取、音量調整及 MP3 編碼。[模型與語音示例](https://huggingface.co/DataCraftsmanAustralia/piper-en_AU-librivox-medium)

Data Craftsman 以 Creative Commons 姓名標示 4.0 國際授權釋出模型。基礎模型 `en_GB-jenny_dioco-medium` 使用 Jenny（Dioco）錄製的 Jenny TTS 資料集。[模型授權](https://creativecommons.org/licenses/by/4.0/) · [作者完整署名與資料來源](https://huggingface.co/DataCraftsmanAustralia/piper-en_AU-librivox-medium/blob/main/ATTRIBUTION.md) · [Jenny TTS 資料集](https://github.com/dioco-group/jenny-tts-dataset)

> `en_AU-librivox-medium`, CC BY 4.0. Fine-tuned from `en_GB-jenny_dioco-medium`, derived from the Jenny TTS dataset by **Jenny (Dioco)**. Training audio is public domain, recorded by LibriVox volunteers.

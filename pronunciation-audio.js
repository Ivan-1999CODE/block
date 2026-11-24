(() => {
  const accents = { us: "美式", gb: "英式", au: "澳式" };
  const preferenceKey = "block_puzzle_accent";
  const choices = document.querySelector(".accent-choice");
  const pageLinks = document.querySelectorAll("a[data-carry-accent]");
  const player = new Audio();
  let activeRequest = 0;
  let accent = "us";

  function savedAccent() {
    try { return localStorage.getItem(preferenceKey); }
    catch { return null; }
  }

  function selectAccent(value, remember = false) {
    if (!Object.hasOwn(accents, value)) return;
    const changed = accent !== value;
    if (changed) stop();
    accent = value;
    choices.querySelector(`input[value="${value}"]`).checked = true;
    // 本機直接開 HTML 時，兩個檔案可能有各自的 localStorage。
    pageLinks.forEach(link => { link.hash = `accent=${value}`; });
    if (remember) {
      try { localStorage.setItem(preferenceKey, value); } catch {}
    }
    if (remember || location.hash.startsWith("#accent=")) {
      try { history.replaceState(history.state, "", `#accent=${value}`); } catch {}
    }
    if (changed) window.dispatchEvent(new CustomEvent("accentchange", { detail: value }));
  }

  function stop() {
    activeRequest++;
    player.onended = null;
    player.onerror = null;
    player.pause();
  }

  function play(kind, value, onEnded, onError) {
    stop();
    const request = activeRequest;

    function finish(callback) {
      if (request !== activeRequest) return;
      stop();
      if (callback) callback();
    }

    player.onended = () => {
      if (player.ended) finish(onEnded);
    };
    player.onerror = () => {
      if (player.error) finish(onError);
    };
    const folder = accent === "us" ? "audio" : `audio/${accent}`;
    player.src = `${folder}/${kind}/${encodeURIComponent(value)}.mp3`;
    player.play().catch(() => finish(onError));
  }

  window.PronunciationAudio = { play, stop, get accent() { return accent; } };

  for (const [value, name] of Object.entries(accents)) {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "pronunciation-accent";
    input.id = `accent-${value}`;
    input.value = value;
    const label = document.createElement("label");
    label.htmlFor = input.id;
    label.textContent = name;
    choices.append(input, label);
  }
  choices.addEventListener("change", event => selectAccent(event.target.value, true));
  const linkedAccent = new URLSearchParams(location.hash.slice(1)).get("accent");
  const stored = savedAccent();
  if (Object.hasOwn(accents, linkedAccent)) selectAccent(linkedAccent, true);
  else selectAccent(Object.hasOwn(accents, stored) ? stored : "us");

  window.addEventListener("storage", event => {
    if (event.key === preferenceKey) selectAccent(event.newValue);
  });
  window.addEventListener("pageshow", event => {
    if (event.persisted) selectAccent(savedAccent());
  });
  window.addEventListener("pagehide", stop);
})();

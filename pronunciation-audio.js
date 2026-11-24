(() => {
  const accents = { us: "美式", gb: "英式", au: "澳式" };
  const preferenceKey = "block_puzzle_accent";
  const choices = document.querySelector(".accent-choice");
  const pageLinks = document.querySelectorAll("a[data-carry-accent]");
  const player = new Audio();
  const retry = document.createElement("button");
  retry.type = "button";
  retry.className = "audio-retry";
  retry.hidden = true;
  document.body.appendChild(retry);
  let current = null;
  let pending = null;
  let stallTimer;
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
    current = null;
    pending = null;
    clearTimeout(stallTimer);
    retry.hidden = true;
    retry.onclick = null;
    player.onended = null;
    player.onerror = null;
    player.onplaying = null;
    player.pause();
  }

  function start(request) {
    current = request;
    retry.hidden = true;
    retry.onclick = null;

    function finish(error) {
      if (current !== request) return;
      clearTimeout(stallTimer);
      current = null;
      if (error) player.pause();
      if (error?.name === "NotAllowedError" && !pending) {
        // Safari 若限制非手勢銜接播放，這個按鈕提供一次真正的點擊。
        const target = document.querySelector("#game-screen:not(.hidden)") ? "題目單字" : request.value;
        retry.textContent = `點一下播放 ${target}`;
        retry.onclick = () => start(request);
        retry.hidden = false;
        return;
      }
      const callback = error ? request.onError : request.onEnded;
      callback?.();
      if (pending && !current) {
        const next = pending;
        pending = null;
        start(next);
      }
    }

    player.onended = () => {
      if (player.ended) finish();
    };
    player.onerror = () => {
      if (player.error) finish(player.error);
    };
    player.onplaying = () => {
      if (current === request && !player.paused) request.onStart?.();
    };
    // 沿用同一個已獲播放授權的元素，讓待播音檔也能在 Safari 接續播放。
    const folder = accent === "us" ? "audio" : `audio/${accent}`;
    player.src = `${folder}/${request.kind}/${encodeURIComponent(request.value)}.mp3?v=2`;
    player.defaultPlaybackRate = request.kind === "phoneme" ? 1 : 0.86;
    player.playbackRate = player.defaultPlaybackRate;
    player.preservesPitch = true;
    stallTimer = setTimeout(() => finish(new Error("音檔載入逾時")), 12000);
    player.play().catch(finish);
  }

  function play(kind, value, onEnded, onError, onStart) {
    const request = { kind, value, onEnded, onError, onStart };
    if (current) pending = request;
    else start(request);
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

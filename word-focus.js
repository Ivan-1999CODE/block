(() => {
  const size = document.querySelector("[data-word-size]");
  const setWordSize = () => {
    document.documentElement.style.setProperty("--word-scale", size.value);
    document.documentElement.classList.toggle("large-words", size.value !== "1");
  };
  size.addEventListener("change", setWordSize);
  setWordSize();

  const toggle = document.querySelector("[data-word-focus-toggle]");
  const hint = document.querySelector(".word-focus-hint");
  const dialog = document.createElement("dialog");
  dialog.className = "word-focus-dialog";
  dialog.setAttribute("aria-labelledby", "word-focus-word");
  dialog.innerHTML = `
    <form method="dialog" class="word-focus-actions">
      <button type="button" class="word-focus-button" data-replay>🔊 再聽一次</button>
      <button type="submit" class="word-focus-button" autofocus>關閉</button>
    </form>
    <div id="word-focus-word" class="word-focus-word" lang="en"></div>
    <p class="word-focus-meaning"></p>
  `;
  document.body.append(dialog);

  const display = dialog.querySelector(".word-focus-word");
  const meaning = dialog.querySelector(".word-focus-meaning");
  let selectedButton;

  toggle.addEventListener("click", () => {
    const active = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(active));
    hint.hidden = !active;
  });

  document.addEventListener("click", event => {
    if (toggle.getAttribute("aria-pressed") !== "true") return;
    const button = event.target.closest("#study-screen button[data-word], #alphabet-grid button[data-word]");
    if (!button) return;

    selectedButton = button;
    const word = button.dataset.word;
    const spelling = button.querySelector("[lang='en']");
    display.replaceChildren(spelling?.cloneNode(true) ?? word);
    display.style.setProperty("--letter-count", word.length);
    meaning.textContent = WORD_MEANINGS[word] ?? "";
    dialog.showModal();
  });

  dialog.querySelector("[data-replay]").addEventListener("click", () => {
    window.PronunciationAudio.play("word", selectedButton.dataset.word);
  });

  dialog.addEventListener("close", () => {
    if (selectedButton?.isConnected) selectedButton.focus({ preventScroll: true });
  });
})();

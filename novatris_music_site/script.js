const audio = document.getElementById("audio");
const trackList = document.getElementById("trackList");
const albumTitle = document.getElementById("albumTitle");
const albumDescription = document.getElementById("albumDescription");
const albumArt = document.getElementById("albumArt");
const playerArt = document.getElementById("playerArt");
const nowTitle = document.getElementById("nowTitle");
const mainPlayBtn = document.getElementById("mainPlayBtn");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const player = document.getElementById("player");
const trackCount = document.getElementById("trackCount");
const downloadAll = document.getElementById("downloadAll");

let currentIndex = -1;

albumTitle.textContent = ALBUM.title;
albumDescription.textContent = ALBUM.description;
albumArt.src = ALBUM.artwork;
playerArt.src = ALBUM.artwork;
document.title = `Novatris — ${ALBUM.title}`;
document.getElementById("year").textContent = new Date().getFullYear();

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function renderTracks() {
  trackCount.textContent = `${TRACKS.length} ${TRACKS.length === 1 ? "TRACK" : "TRACKS"}`;

  if (!TRACKS.length) {
    trackList.innerHTML = `
      <div style="padding:28px 5px;color:#77778a;">
        Add your songs to <strong>music.js</strong> to make them appear here.
      </div>`;
    return;
  }

  trackList.innerHTML = TRACKS.map((track, i) => `
    <div class="track">
      <span class="track-number">${String(i + 1).padStart(2, "0")}</span>
      <div class="track-name">${escapeHtml(track.title)}</div>
      <span class="track-meta">${escapeHtml(track.duration || "")}</span>
      <div>
        <button class="track-play" data-index="${i}" aria-label="Play ${escapeHtml(track.title)}">▶</button>
        <a class="track-download" href="${encodeURI(track.file)}" download aria-label="Download ${escapeHtml(track.title)}">↓</a>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".track-play").forEach(btn => {
    btn.addEventListener("click", () => playTrack(Number(btn.dataset.index)));
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  }[c]));
}

function playTrack(index) {
  if (!TRACKS[index]) return;

  currentIndex = index;
  const track = TRACKS[index];

  audio.src = track.file;
  nowTitle.textContent = track.title;
  playerArt.src = ALBUM.artwork;
  player.classList.remove("hidden");

  audio.play().catch(() => {});
  updatePlayButton();
}

function updatePlayButton() {
  mainPlayBtn.textContent = audio.paused ? "▶" : "❚❚";
}

function nextTrack() {
  if (!TRACKS.length) return;
  playTrack((currentIndex + 1) % TRACKS.length);
}

function previousTrack() {
  if (!TRACKS.length) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    return;
  }
  playTrack((currentIndex - 1 + TRACKS.length) % TRACKS.length);
}

document.getElementById("playAll").addEventListener("click", () => {
  if (!TRACKS.length) return;
  playTrack(currentIndex >= 0 ? currentIndex : 0);
});

document.getElementById("mainPlayBtn").addEventListener("click", () => {
  if (currentIndex < 0) {
    if (TRACKS.length) playTrack(0);
    return;
  }
  if (audio.paused) audio.play().catch(() => {});
  else audio.pause();
});

document.getElementById("nextBtn").addEventListener("click", nextTrack);
document.getElementById("prevBtn").addEventListener("click", previousTrack);

audio.addEventListener("play", updatePlayButton);
audio.addEventListener("pause", updatePlayButton);
audio.addEventListener("ended", nextTrack);

audio.addEventListener("loadedmetadata", () => {
  progress.value = 0;
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  if (audio.duration) progress.value = (audio.currentTime / audio.duration) * 100;
});

progress.addEventListener("input", () => {
  if (audio.duration) audio.currentTime = (progress.value / 100) * audio.duration;
});

document.getElementById("closePlayer").addEventListener("click", () => {
  audio.pause();
  player.classList.add("hidden");
});

if (TRACKS.length) {
  // A simple text file isn't a true "album download"; keep this button disabled
  // until a ZIP is supplied. The per-track downloads always work.
  downloadAll.style.display = "none";
}

renderTracks();

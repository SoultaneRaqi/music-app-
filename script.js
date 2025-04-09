// 'X-RapidAPI-Key': 'e9a9af46a2msh72507f33997bd8ep13467cjsnbd93c14f70c2',
/*
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");

let audio = new Audio();
let currentPreview = "";

// Search when typing (with debounce)
searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return; // avoid short queries

  const data = await searchSongs(query);
  showResults(data);
});

// Call Deezer API
async function searchSongs(query) {
  const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e9a9af46a2msh72507f33997bd8ep13467cjsnbd93c14f70c2',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  });

  const json = await res.json();
  return json.data;
}

// Show search results
function showResults(songs) {
  resultsContainer.innerHTML = "";

  songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition";
    card.innerHTML = `
      <img src="${song.album.cover_small}" alt="Cover" class="w-12 h-12 rounded" />
      <div>
        <div class="font-semibold">${song.title}</div>
        <div class="text-sm text-gray-400">${song.artist.name}</div>
      </div>
    `;

    // Play on click
    card.addEventListener("click", () => playSong(song));
    resultsContainer.appendChild(card);
  });
}

// Play selected song
function playSong(song) {
  if (audio.src !== song.preview) {
    audio.src = song.preview;
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    togglePlayPause();
  }

  // Update player UI
  cover.src = song.album.cover_small;
  title.textContent = song.title;
  artist.textContent = song.artist.name;
  player.classList.remove("hidden");
  currentPreview = song.preview;
}

// Play/Pause Button
playBtn.addEventListener("click", () => {
  togglePlayPause();
});

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
}
*/



const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const player = document.getElementById("player");
const cover = document.getElementById("cover");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const seekBar = document.getElementById("seekBar");
const timeDisplay = document.getElementById("time");
const volumeControl = document.getElementById("volume");
const equalizer = document.getElementById("equalizer");
const bgBlur = document.getElementById("bg-blur");

let audio = new Audio();
let currentPreview = "";

// Search when typing (with debounce)
searchInput.addEventListener("keyup", async (e) => {
  const query = e.target.value.trim();
  if (query.length < 3) return; // avoid short queries

  const data = await searchSongs(query);
  showResults(data);
});

// Call Deezer API
async function searchSongs(query) {
  const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e9a9af46a2msh72507f33997bd8ep13467cjsnbd93c14f70c2',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  });

  const json = await res.json();
  return json.data;
}

// Show search results
function showResults(songs) {
  resultsContainer.innerHTML = "";

  songs.forEach(song => {
    const card = document.createElement("div");
    card.className = "bg-gray-800 p-4 rounded flex items-center gap-4 cursor-pointer hover:bg-gray-700 transition";
    card.innerHTML = `
      <img src="${song.album.cover_small}" alt="Cover" class="w-12 h-12 rounded" />
      <div>
        <div class="font-semibold">${song.title}</div>
        <div class="text-sm text-gray-400">${song.artist.name}</div>
      </div>
    `;

    // Play on click
    card.addEventListener("click", () => playSong(song));
    resultsContainer.appendChild(card);
  });
}

// Play selected song
function playSong(song) {
  if (audio.src !== song.preview) {
    audio.src = song.preview;
    audio.play();
    playBtn.textContent = "Pause";
    currentPreview = song.preview;
  } else {
    togglePlayPause();
  }

  // Update player UI
  cover.src = song.album.cover_small;
  title.textContent = song.title;
  artist.textContent = song.artist.name;
  player.classList.remove("hidden");

  // Blur background when playing
  bgBlur.style.backgroundImage = `url('${song.album.cover}')`;
  bgBlur.classList.remove("opacity-30");

  // Equalizer animation
  equalizer.classList.remove("hidden");

  // Initialize time display
  updateTimeDisplay();

  // Reset and update seek bar
  seekBar.value = 0;
  seekBar.max = 30; // 30s preview

  // Volume Control
  volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
  });

  // Update progress every second
  audio.ontimeupdate = () => {
    updateProgress();
  };
}

// Play/Pause Button
playBtn.addEventListener("click", () => {
  togglePlayPause();
});

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "Pause";
  } else {
    audio.pause();
    playBtn.textContent = "Play";
  }
}

// Update Time Display
function updateTimeDisplay() {
  audio.ontimeupdate = () => {
    const currentTime = Math.floor(audio.currentTime);
    const totalTime = Math.floor(audio.duration);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const totalMinutes = Math.floor(totalTime / 60);
    const totalSeconds = totalTime % 60;
    timeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds} / ${totalMinutes}:${totalSeconds < 10 ? '0' : ''}${totalSeconds}`;
  };
}

// Update Seek Bar
function updateProgress() {
  const progress = (audio.currentTime / audio.duration) * 100;
  seekBar.value = progress;
  seekBar.addEventListener("input", (e) => {
    const seekTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = seekTime;
  });
}

// script.js
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const stopBtn = document.getElementById('stop');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const seekBar = document.getElementById('seek-bar');
const currentTimeSpan = document.getElementById('current-time');
const durationSpan = document.getElementById('duration');
const playlist = document.getElementById('playlist');
const songs = playlist.getElementsByTagName('li');
const h22 = document.getElementById('currsong');

let isPlaying = false;
let currentSongIndex = 0;

const songsData = [
    { src: 'audio/song1.mp3', title: 'Song 1' },
    { src: 'audio/song2.mp3', title: 'Song 2' },
    { src: 'audio/song3.mp3', title: 'Song 3' }
];

function loadSong(index) {
    audio.src = songsData[index].src;
    for (let i = 0; i < songs.length; i++) {
        songs[i].classList.remove('active');
    }
    if (index === 0) {
        h22.innerHTML = "Song 1";
    }
    else if (index === 1) {
        h22.innerHTML = "Song 2";
    }
    else {
        h22.innerHTML = "Song 3";
    }
    songs[index].classList.add('active');
    currentSongIndex = index;
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audio.play();
        playPauseBtn.textContent = '𝕀𝕀';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    if (currentSongIndex > 0) {
        loadSong(currentSongIndex - 1);
        audio.play();
        playPauseBtn.textContent = '𝕀𝕀';
        isPlaying = true;
    }
});

nextBtn.addEventListener('click', () => {
    if (currentSongIndex < songsData.length - 1) {
        loadSong(currentSongIndex + 1);
        audio.play();
        playPauseBtn.textContent = '𝕀𝕀';
        isPlaying = true;
    }
});

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    seekBar.value = (currentTime / duration) * 100;

    currentTimeSpan.textContent = formatTime(currentTime);
    durationSpan.textContent = formatTime(duration);
});

seekBar.addEventListener('input', () => {
    const duration = audio.duration;
    audio.currentTime = (seekBar.value / 100) * duration;
});

audio.addEventListener('loadedmetadata', () => {
    durationSpan.textContent = formatTime(audio.duration);
});

audio.addEventListener('ended', () => {
    if (currentSongIndex < songsData.length - 1) {
        loadSong(currentSongIndex + 1);
        audio.play();
    } else {
        playPauseBtn.textContent = '▶';
        isPlaying = false;
    }
});

playlist.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === 'LI') {
        loadSong(Array.prototype.indexOf.call(songs, e.target));
        audio.play();
        playPauseBtn.textContent = '𝕀𝕀';
        isPlaying = true;
    }
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

document.getElementById('playlistbutton').addEventListener('click', function() {
    var backButton = document.getElementById('backButton');
    playlist.style.display = 'block';
    this.style.display = 'none';
    backButton.style.display = 'block';
});

document.getElementById('backButton').addEventListener('click', function() {
    var btn = document.getElementById('playlistbutton');
    playlist.style.display = 'none';
    this.style.display = 'none';
    btn.style.display = 'block';
});

loadSong(0);

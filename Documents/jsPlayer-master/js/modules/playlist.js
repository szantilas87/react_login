import {
    songsList
} from "../data/songs.js";

import PlayInfo from './play-info.js'
import TrackBar from './track-bar.js'

const Playlist = (_ => {
    // data 
    let songs = songsList;
    let currentlyPlayingIndex = 0;
    let currentSong = new Audio(songs[currentlyPlayingIndex].url);
    currentSong.currentTime = 0;

    // cache the DOM
    const playlistEl = document.querySelector(".playlist");
    const trackBarEl = document.querySelector(".track-bar");
    const forwardEl = document.querySelector(".forward");
    const backwardEl = document.querySelector(".backward");

    const init = _ => {
        render();
        listeners();
        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const flip = _ => {
        togglePlayPause();
        render();
    }

    const togglePlayPause = _ => {
        return currentSong.paused ? currentSong.play() : currentSong.pause();
    }

    const changeAudioSrc = _ => {
        currentSong.src = songs[currentlyPlayingIndex].url;
    }

    const mainPlay = clickedIndex => {
        if (currentlyPlayingIndex === clickedIndex) {
            togglePlayPause();
        } else {
            currentlyPlayingIndex = clickedIndex;
            changeAudioSrc();
            togglePlayPause();
        }

        PlayInfo.setState({
            songsLength: songs.length,
            isPlaying: !currentSong.paused
        })
    }

    const playBack = _ => {
        if (songs[currentlyPlayingIndex - 1]) {
            currentlyPlayingIndex--;
            changeAudioSrc();
            togglePlayPause();
            render();
        }
    }

    const playNext = _ => {
        if (songs[currentlyPlayingIndex + 1]) {
            currentlyPlayingIndex++;
            changeAudioSrc();
            togglePlayPause();
            render();
        }
    }

    const listeners = _ => {
        playlistEl.addEventListener("click", event => {
            if (event.target && event.target.matches(".fa")) {
                const listElem = event.target.parentNode.parentNode;
                const listElemIndex = [...listElem.parentElement.children].indexOf(listElem);
                mainPlay(listElemIndex);
                render();

            }
        })

        playlistEl.addEventListener("mousemove", event => {
            if (event.target.matches("li") && !event.target.childNodes[1].children[0].classList.contains("fa-pause")) {
                const icon = event.target.childNodes[1].children[0];
                icon.classList.add("fa-play");
            } else if (event.target.matches("i") && !event.target.classList.contains("fa-pause")) {
                const icon = event.target;
                icon.classList.add("fa-play");
            } else if (event.target.matches(".off") && !event.target.parentElement.parentElement.childNodes[1].children[0].classList.contains("fa-pause")) {
                const icon = event.target.parentElement.parentElement.childNodes[1].children[0];
                icon.classList.add("fa-play");
            } else if (event.target.matches(".play-pause") && !event.target.children[0].classList.contains("fa-pause")) {
                const icon = event.target.children[0];
                icon.classList.add("fa-play");
            }
        })

        playlistEl.addEventListener("mouseout", event => {
            if (event.target.matches("li")) {
                const icon = event.target.childNodes[1].children[0];
                icon.classList.remove("fa-play");
                icon.classList.add("fa-music");
            } else if (event.target.matches("i")) {
                const icon = event.target;
                icon.classList.remove("fa-play");
                icon.classList.add("fa-music");
            }
        })

        currentSong.addEventListener("timeupdate", _ => {
            TrackBar.setState(currentSong);
        })

        currentSong.addEventListener("ended", _ => {
            playNext();
        })

        trackBarEl.addEventListener("click", (event) => {
            const position = Math.floor((event.offsetX / event.target.offsetWidth) * 100);
            currentSong.currentTime = Math.floor((currentSong.duration * position) / 100);
        })

        forwardEl.addEventListener("click", _ => {
            playNext()
        })

        backwardEl.addEventListener("click", _ => {
            playBack()
        })

    }
    const render = _ => {
        let markup = '';

        const toggleIcon = itemIndex => {
            if (currentlyPlayingIndex === itemIndex) {
                return currentSong.paused ? 'fa-play' : 'fa-pause';
            } else {
                return 'fas fa-music';
            }
        }

        songs.forEach((songObj, index) => {
            markup += `
                <li class="playlist__song ${index === currentlyPlayingIndex && !currentSong.paused ?'playlist__song--active': ''}">
                    <div class="play-pause">
                        <i class="fa ${toggleIcon(index)} pp-icon"></i>
                    </div>
                    <div class="playlist__song-details">
                        <span class="playlist__song-name off">${songObj.title}</span>
                        <br>
                        <span class="playlist__song-artist off">${songObj.artist}</span>
                    </div>
                    <div class="playlist__song-duration">
                    ${songObj.time}
                    </div>
                </li>
            `;
        })
        playlistEl.innerHTML = markup;
    }

    return {
        init,
        flip,
        currentSong
    }
})();

export default Playlist;
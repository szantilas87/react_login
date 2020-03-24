import Playlist from "./playlist.js"

const PlayInfo = (_ => {

    const state = {
        songsLength: 0,
        isPlaying: false
    }

    const playerCountEl = document.querySelector(".player__count");
    const playerTriggerEl = document.querySelector(".player__trigger");
    const playEl = document.querySelector(".play");

    const init = _ => {
        render();
        listeners();
    }

    const listeners = _ => {
        playerTriggerEl.addEventListener("click", _ => {
            state.isPlaying = state.isPlaying ? false : true;
            render();
            Playlist.flip();
        })

        playEl.addEventListener("click", _ => {
            state.isPlaying = state.isPlaying ? false : true;
            render();
            Playlist.flip();
        })
    }

    const setState = obj => {
        state.songsLength = obj.songsLength;
        state.isPlaying = obj.isPlaying;
        render();
    }

    const render = _ => {
        const toggleIcon = itemIndex => {
            if (state.isPlaying) {
                return "fa-pause-circle";
            } else {
                return 'fa-play-circle';
            }
        }

        playerCountEl.innerHTML = state.songsLength;
        playerTriggerEl.innerHTML = state.isPlaying ? "Pause" : "Play";
        playEl.innerHTML = `<i class="far ${toggleIcon()} fa-3x "></i>`
    }

    return {
        init,
        setState,
    }
})();

export default PlayInfo;
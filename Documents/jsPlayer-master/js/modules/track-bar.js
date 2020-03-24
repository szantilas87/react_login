const TrackBar = (_ => {

    const state = {
        currentTrackTime: 0,
        fullTrackTime: 0,
        fillWidth: 0
    }

    const trackBarFillEl = document.querySelector(".track-bar__fill");
    const durationEl = document.querySelector(".duration");
    const timeLeftEl = document.querySelector(".time-left");

    const init = _ => {
        render();
    }

    const getPercent = (current, full) => {
        return (current / full) * 100;
    }

    const time = (input) => {
        if ((input / 60) < 10 && (input % 60) < 10) {
            timeLeftEl.innerHTML = `
            0${Math.floor(state.currentTrackTime / 60)}:0${Math.floor(state.currentTrackTime % 60)}`;
        } else if ((input / 60) < 10) {
            timeLeftEl.innerHTML = `
            0${Math.floor(state.currentTrackTime / 60)}:${Math.floor(state.currentTrackTime % 60)}`;
        } else {
            timeLeftEl.innerHTML = `
            ${Math.floor(state.currentTrackTime / 60)}:${Math.floor(state.currentTrackTime % 60)}`;
        }
    }

    const render = _ => {
        trackBarFillEl.style.width = `${state.fillWidth}%`;

        if (!state.fullTrackTime) {
            durationEl.innerHTML = `0:00`
        } else {
            durationEl.innerHTML = `${Math.floor(state.fullTrackTime / 60)}:${Math.floor(state.fullTrackTime % 60)}`;
        }

        if (!state.currentTrackTime) {
            timeLeftEl.innerHTML = `0:00`
        } else {
            time(state.currentTrackTime);
        }
    }

    const setState = obj => {
        state.currentTrackTime = obj.currentTime;
        state.fullTrackTime = obj.duration;
        state.fillWidth = getPercent(state.currentTrackTime, state.fullTrackTime);
        render();
    }

    return {
        init,
        setState

    }
})();

export default TrackBar;
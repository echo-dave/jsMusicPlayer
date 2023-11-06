const removePlayIndicator = async () => {
    let outGoingTrack = document.querySelector('.nowPlaying')
    if (outGoingTrack) outGoingTrack.classList.remove('nowPlaying')
}

export default removePlayIndicator
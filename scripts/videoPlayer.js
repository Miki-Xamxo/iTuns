export const videoPlayerInit = () => {

  const videoPlayer = document.querySelector('.video-player')
  const videoButtonPlay = document.querySelector('.video-button__play')
  const videoButtonStop = document.querySelector('.video-button__stop')
  const videoTimePassed = document.querySelector('.video-time__passed')
  const videoProgress = document.querySelector('.video-progress')
  const videoTimeTotal = document.querySelector('.video-time__total')
  const videoValume = document.querySelector('.video-valume')
  const videoFullscreen = document.querySelector('.video-fullscreen')

  videoFullscreen.addEventListener('click', () => {
    videoPlayer.requestFullscreen()
  })

  videoPlayer.addEventListener('fullscreenchange', () => { 
    if(document.fullscreen){
      videoPlayer.controls = true
    }else{
      videoPlayer.controls = false
    }
  })

  const toggleIcon = () => {
    if(videoPlayer.paused){
      videoButtonPlay.classList.remove('fa-pause')
      videoButtonPlay.classList.add('fa-play')
    }else{
      videoButtonPlay.classList.add('fa-pause')
      videoButtonPlay.classList.remove('fa-play')
    }
  }

  const togglePlay = () => {
      if(videoPlayer.paused){
      videoPlayer.play()
    }else{
      videoPlayer.pause()
    }
    
    toggleIcon() 
  }

  const stopPlay = () => {
    videoPlayer.pause()
    videoPlayer.currentTime = 0
  }

  const addZero = n => n < 10 ? '0'+ n : n

  const changeValue = () => {
    const valueValume = videoValume.value  
    videoPlayer.volume = valueValume / 100 
  }

  videoPlayer.addEventListener('click', togglePlay)
  videoButtonPlay.addEventListener('click', togglePlay)
  videoButtonStop.addEventListener('click', stopPlay)

  videoPlayer.addEventListener('timeupdate', () => {
      const currentTime = videoPlayer.currentTime
      const duration = videoPlayer.duration

      videoProgress.value = (currentTime / duration) * 100

      let minutePassed = Math.floor(currentTime / 60)
      let secondsPassed = Math.floor(currentTime % 60)

      let minuteTotal = Math.floor(duration / 60)
      let secondsTotal = Math.floor(duration % 60)

      videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
      videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondsTotal)
  })

  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration
    const value = videoProgress.value
    
    videoPlayer.currentTime = (value * duration) / 100
  })

  videoPlayer.addEventListener('volumechange', () => {
    videoValume.value = Math.round(videoPlayer.volume * 100)
  })
  
  videoValume.addEventListener('input', changeValue)

  changeValue()

  videoPlayerInit.stop = () => {
    videoPlayer.pause()
    toggleIcon()
  }

} 
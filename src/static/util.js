let Fun = {
  formatTime(time) {
    time = Math.floor(time);
    let miniute = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    return (miniute < 10 ? '0' + miniute : miniute) + ':' + (seconds < 10 ? '0' + seconds : seconds);
  },
  randomRange(under, over) {
    return Math.ceil(Math.random() * (over - under) + under);
  }
}


export default Fun;
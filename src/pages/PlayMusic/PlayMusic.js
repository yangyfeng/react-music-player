import React from 'react'
// import { Link } from 'react-router-dom'
import Progress from './../../components/Progress/Progress'
import './PlayMusic.less'
let PubSub = require('pubsub-js')
let duration = null
let $ = window.$
class PlayMusic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: false,
            leftTime: ''
        }
    }
    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        });
    }
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }
    formatTime(time) {
        time = Math.floor(time);
        let miniute = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        return miniute + ':' + (seconds < 10
            ? '0' + seconds
            : seconds);
    }
    changeProgressHandler(progress) {
        $("#player").jPlayer("play", duration * progress);
        this.setState({isPlay: true});
    }
    changeVolumeHandler(progress) {
        $("#player").jPlayer("volume", progress);
    }
    play() {
        if (this.state.isPlay) {
            $("#player").jPlayer("pause");
        } else {
            $("#player").jPlayer("play");
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    next() {
        this.setState({
            isPlay:true
        })
        PubSub.publish('PLAY_NEXT');
    }
    prev() {
        this.setState({
            isPlay:true
        })
        PubSub.publish('PLAY_PREV');
    }
    changeRepeat() {
        PubSub.publish('CHANAGE_REPEAT');
    }
    render() {
        return (
            <div className="player-page">
                <div className="player-content">
                    <div className="music-cover row -col-auto">
                        <img
                            src={this.props.currentMusitItem.cover}
                            alt={this.props.currentMusitItem.title}/>
                    </div>
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusitItem.title}</h2>
                        <h3 className="music-artist">歌手：{this.props.currentMusitItem.artist}</h3>
                        <div className="row time-volume">
                            <div className="left-time -col-auto">剩余时间：{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt"></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler.bind(this)}
                                        barColor='#aaaaaa'></Progress>
                                </div>
                            </div>
                        </div>
                        <div className="Progress-content">
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.changeProgressHandler.bind(this)}></Progress>
                        </div>
                        <div className="row controll-btns">
                            <div className="about-play">
                                <i className="icon prev" onClick={this.prev.bind(this)}></i>
                                <i
                                    className={`icon ${this.state.isPlay
                                    ? 'pause'
                                    : 'play'}`}
                                    onClick={this.play.bind(this)}></i>
                                <i className="icon next" onClick={this.next.bind(this)}></i>
                            </div>
                            <div className="play-type">
                                <i
                                    className={`icon repeat-${this.props.repeatType}`}
                                    onClick={this.changeRepeat.bind(this)}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
      }
    }
export default PlayMusic;
    
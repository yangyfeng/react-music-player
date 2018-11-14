import React from 'react'
// import { Link } from 'react-router-dom'
import Progress from './../../components/Progress/Progress'
import Fun from './../../static/util.js'
import './PlayMusic.less'
let PubSub = require('pubsub-js')
let duration = null
let currentTime = null
let $ = window.$
class PlayMusic extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: false,
            currentTime: '',
            typeList : {
                cycle: 'icon-liebiaoxunhuan',
                once: 'icon-danquxunhuan',
                random: 'icon-suijibofang'
            }
        }
    }
    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            currentTime = e.jPlayer.status.currentTime;
            this.setState({
                progress: e.jPlayer.status.currentPercentAbsolute,
                volume: e.jPlayer.options.volume * 100,
                currentTime: Fun.formatTime(currentTime),
                duration: Fun.formatTime(duration),
            });
        });
    }
    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
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
                    <div className="music-cover">
                        <img
                            src={this.props.currentMusitItem.cover}
                            alt={this.props.currentMusitItem.title}/>
                    </div>
                    <div className="music-controll">
                        <div className="music-title">{this.props.currentMusitItem.title}</div>
                        <div className="music-artist"><i className="iconfont icon-renqigeshou"></i> {this.props.currentMusitItem.artist}</div>
                        <div className="music-time"><i className="iconfont icon-shijian"></i> {this.state.currentTime}/{this.state.duration}</div>
                        <div className="music-vol-ptype">
                            <div className="volume-container">
                                <i className="iconfont icon-icon-test"></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler.bind(this)}
                                        barColor='#636de6' height='5'></Progress>
                                </div>
                            </div>
                            <div className="play-type">
                                <i
                                    className={`iconfont repeatType ${this.state.typeList[this.props.repeatType]}`}
                                    onClick={this.changeRepeat.bind(this)}></i>
                                <i className={`iconfont icon-bofangqi_shouyegequliebiao_ music-list`}></i>
                            </div>
                        </div>
                        <div className="music-progress">
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.changeProgressHandler.bind(this)}></Progress>
                        </div>
                        <div className="music-ctrl">
                            <i className="iconfont icon-yduishangyiqu" onClick={this.prev.bind(this)}></i>
                            <i
                                className={`iconfont ${this.state.isPlay
                                ? 'icon-zanting'
                                : 'icon-yduibofang'}`}
                                onClick={this.play.bind(this)}></i>
                            <i className="iconfont icon-yduixiayiqu" onClick={this.next.bind(this)}></i>
                        </div>
                    </div>
                </div>
            </div>
        )
      }
    }
export default PlayMusic;
    
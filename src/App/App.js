import React from 'react'
import {MUSIC_LIST} from './../static/config.js'
import Fun from './../static/util.js'
// 组件
import PlayMusic from './../pages/PlayMusic/PlayMusic'
import MusicList from './../pages/MusicList/MusicList'
import Header from './../components/Header/Header'
// 发布订阅模式
let PubSub = require('pubsub-js')
let $ = window.$
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicList: MUSIC_LIST,
            currentMusitItem: {},
            repeatType: 'cycle',
            showPlayer: false,
            showPlayerHander:this.showPlayerHander.bind(this)
        }
    }
    componentDidMount() {
        let repeatList = ['cycle', 'once', 'random'];
        $("#player").jPlayer({supplied: "mp3,m4a", wmode: "window", useStateClassSkin: true});
        this.playMusic(this.state.musicList[0]);
        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });
        PubSub.subscribe('PLAY_MUSIC', (msg, item) => {
            this.playMusic(item);
        });
        PubSub.subscribe('DEL_MUSIC', (msg, item) => {
            this.setState({
                musicList: this
                    .state
                    .musicList
                    .filter((music) => {
                        return music !== item;
                    })
            });
        });
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });
        PubSub.subscribe('CHANAGE_REPEAT', () => {
            let index = repeatList.indexOf(this.state.repeatType);
            index = (index + 1) % repeatList.length;
            this.setState({repeatType: repeatList[index]});
        });
    }
    componentWillUnmount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DEL_MUSIC');
        PubSub.unsubscribe('CHANAGE_REPEAT');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
    }

    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusitItem);
            let randomIndex = Fun.randomRange(0, this.state.musicList.length - 1);
            while (randomIndex === index) {
                randomIndex = Fun.randomRange(0, this.state.musicList.length - 1);
            }
            this.playMusic(this.state.musicList[randomIndex]);
        } else if (this.state.repeatType === 'once') {
            this.playMusic(this.state.currentMusitItem);
        } else {
            this.playNext();
        }
    }
    playNext(type = 'next') {
        let index = this.findMusicIndex(this.state.currentMusitItem);
        if (type === 'next') {
            index = (index + 1) % this.state.musicList.length;
        } else {
            index = (index + this.state.musicList.length - 1) % this.state.musicList.length;
        }
        let musicItem = this.state.musicList[index];
        this.setState({currentMusitItem: musicItem});
        this.playMusic(musicItem);
    }
    findMusicIndex(music) {
        let index = this
            .state
            .musicList
            .indexOf(music);
        return Math.max(0, index);
    }
    playMusic(item) {
        $("#player")
            .jPlayer("setMedia", {
            mp3: item.file,
            autoPlay: false
        })
            .jPlayer('play');
        this.setState({currentMusitItem: item});
    }
    showPlayerHander(flag) {
        this.setState({showPlayer: flag})
    }
    render() {
        return (
            <div className="container">
                <div id="player"></div>
                <Header/>
                <div className="player-page">
                    <PlayMusic {...this.state} showPlayerHander={this.state.showPlayerHander}></PlayMusic>
                    <MusicList {...this.state} showPlayerHander={this.state.showPlayerHander}></MusicList>
                </div>
            </div>
        );
    }
}

export default App
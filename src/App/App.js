import React from 'react'
// import {HashRouter as Router,Route} from 'react-router-dom'
import {MUSIC_LIST} from './../static/config.js'
import {randomRange} from './../static/util.js'
// 组件
import PlayMusic from './../pages/PlayMusic/PlayMusic'
// import MusicList from './../pages/MusicList/MusicList'
import Header from './../components/Header/Header'
// 发布订阅模式
let PubSub = require('pubsub-js')
let $ = window.$
class Root extends React.Component {
    componentDidMount() {
        $("#player").jPlayer({supplied: "mp3", wmode: "window", useStateClassSkin: true});
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
        let repeatList = ['cycle', 'once', 'random'];
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
    constructor(props) {
        super(props)
        this.state = {
            musicList: MUSIC_LIST,
            currentMusitItem: {},
            repeatType: 'cycle'
        }
    }
    playWhenEnd() {
        if (this.state.repeatType === 'random') {
            let index = this.findMusicIndex(this.state.currentMusitItem);
            let randomIndex = randomRange(0, this.state.musicList.length - 1);
            while (randomIndex === index) {
                randomIndex = randomRange(0, this.state.musicList.length - 1);
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
            .jPlayer("setMedia", {mp3: item.file})
            .jPlayer('play');
        this.setState({currentMusitItem: item});
    }
    render() {
        return (
            <div className="container">
                <div id="player"></div>
                <Header/> 
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}
class App extends React.Component {
    render() {
        return (
            // <Router>
            //     <Route component={Root}>
            //         <Route path="/" component={PlayMusic}/>
            //         <Route path="/list" component={MusicList}/>
            //     </Route>
            // </Router>
            <Root>
              <PlayMusic></PlayMusic>
            </Root>
        );
    }
}
export default App

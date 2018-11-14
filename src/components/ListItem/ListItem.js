import React from 'react';
require('./ListItem.less');
let PubSub = require('pubsub-js');
class ListItem extends React.Component {
    deleteHandler(item, event) {
        event.stopPropagation();
        PubSub.publish('DEL_MUSIC', item);
    }
    playMusic(item, e) {
        PubSub.publish('PLAY_MUSIC', item);
    }
    render() {
        let item = this.props.data;
        return (
            <li
                className={`song-item ${this.props.focus
                ? ' focus'
                : ''}`}
                onClick={this
                .playMusic
                .bind(this, item)}>
                <div className="text">
                    <div className="song-cover">
                        <img src={item.cover} alt={item.title}/>
                    </div>
                    <div className="song-title">{item.title}</div>-
                    <div className="song-artist"></div>{item.artist}
                </div>
                <i
                    className="iconfont icon-del delete"
                    onClick={this
                    .deleteHandler
                    .bind(this, item)}></i>
            </li>
        );
    }
}
export default ListItem;

import React from 'react'
import ListItem from './../../components/ListItem/ListItem'
import './MusicList.less'
class MusicList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        let Items = this
            .props
            .musicList
            .map((item) => {
                return (
                    <ListItem
                        key={item.id}
                        data={item}
                        focus={this.props.currentMusitItem === item}></ListItem>
                );
            });
        return (
            <div
                className={`list-wrap ${this.props.showPlayer
                ? 'hide'
                : ''}`}>
                <div className="list-title">
                    <div
                        className="iconfont icon-fanhui1 back-palyer"
                        onClick={this
                        .props
                        .showPlayerHander
                        .bind(this, true)}></div>
                    <div className="text">歌曲列表</div>
                </div>

                <ul className="music-song-list">
                    {Items}
                </ul>
            </div>

        );
    }
}
export default MusicList
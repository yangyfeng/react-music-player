import React from 'react'
import ListItem from './../../components/ListItem/ListItem'
import {Link} from 'react-router-dom'
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
            <div className="list-wrap">
                <Link className="back-palyer" to={'/'}>返回</Link>
                <ul className="music-song-list">
                    {Items}
                </ul>
            </div>

        );
    }
}
export default MusicList
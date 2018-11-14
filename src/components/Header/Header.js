import React from 'react'
import './Header.less'
class Header extends React.Component {
  render () {
    return (
      <div className="componetns-header">
        <i className="col-auto iconfont  icon-music logo"></i>
        <h1 className="caption">React Music Player</h1>
      </div>
    )
  }
}
export default Header;
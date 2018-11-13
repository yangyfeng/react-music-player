import React from 'react'
import './Header.less'
const img_logo = require('./../../static/images/logo.png')
class Header extends React.Component {
  render () {
    return (
      <div className="componetns-header row">
        <img src={img_logo} alt="logo" width="40" className="-col-auto" />
        <h1 className="caption">React Music Player</h1>
      </div>
    )
  }
}
export default Header;
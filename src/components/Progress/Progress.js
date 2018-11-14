import React from 'react';
import './Progress.less'
class Progress extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);

    }
    static defaultProps = {
        barColor: '#2f9842'
    }
    changeProgress(e) {
        let progressBar = e.target
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this
            .props
            .onProgressChange(progress);
    }
    render() {
        return (
            <div
                className="components-progress"
                ref="progressBar"
                onClick={this
                .changeProgress
                .bind(this)} style={{height: Number(this.props.height) + 2 + 'px'}}>
                <div
                    className="progress"
                    style={{
                    width: `${this.props.progress}%`,
                    background: this.props.barColor,
                    height: this.props.height + 'px'
                }}></div>
            </div>
        )
    }
}
export default Progress;

import React, { Component } from 'react';
import './progress.less';

class Progress extends Component {
    onProgressChange(e) {
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange(progress);
    }
    render() {
        return(
            <div className="components-progress" ref="progressBar" style={{margin:0}}
                 onClick={this.onProgressChange.bind(this)}>
                <div className="progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
            </div>
        )
    }
}
Progress.defaultProps = {
    barColor: '#4f9248'
}

export default Progress;
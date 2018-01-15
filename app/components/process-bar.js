/*页面底部播放条*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import './process-bar.less';

export default class ProcessBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: this.props.currentMusicItem || {}
        }
    }
    render () {
        return (
            <div className='wrap process-bar'>
                <Link className='link' to='/player'>
                    <img src="https://y.gtimg.cn/music/photo_new/T006R300x300M000004bFmjW2PXSqF.jpg?max_age=2592000" alt=""/>
                    <div className='info flex'>
                        {/*<p>{JSON.stringify(this.state.currentMusicItem)}</p>*/}
                        <p>{'歌曲'}</p>
                        {/*<span>{this.state.currentMusicItem.singername || '歌手'}</span>*/}
                        <span>{'歌手'}</span>
                    </div>
                </Link>
                <div className="btn">
                    <i className='iconfont icon-bofang'/>
                    <i className='iconfont icon-liebiao1'/>
                </div>
            </div>
        )
    }
}
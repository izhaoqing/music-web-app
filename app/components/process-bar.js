/*页面底部播放条*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import './process-bar.less';

export default class ProcessBar extends Component {
    render () {
        return (
            <div className='wrap process-bar'>
                <img src="https://y.gtimg.cn/music/photo_new/T006R300x300M000004bFmjW2PXSqF.jpg?max_age=2592000" alt=""/>
                <div className='info flex'>
                    <p>歌曲</p>
                    <span>歌手</span>
                </div>
                <div className="btn">
                    <i className='iconfont icon-bofang'></i>
                    <i className='iconfont icon-liebiao1'></i>
                </div>
            </div>
        )
    }
}
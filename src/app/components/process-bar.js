/*页面底部播放条*/
import React, { Component } from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import Pubsub from 'pubsub-js';
import './process-bar.less';

export default class ProcessBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repeatOnce: false
            // currentMusicItem: this.props.currentMusicItem || {}
            // isPlay: this.props.isPlay
        }
    }

    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            if (e.jPlayer.status.ended) {
                this.changeMusic();
            }
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    componentWillReceiveProps (next) {
        console.log(next.isPlay);
    }

    play() {
        if (this.props.isPlay) {
            this.parseMusic();
        } else {
            this.playMusic();
        }
    }
    playMusic() {
        Pubsub.publish('PLAY');
    }
    parseMusic() {
        Pubsub.publish('PARSE');
    }
    nextMusic() {
        Pubsub.publish('NEXT_MUSIC');
    }
    playThisMusic() {
        Pubsub.publish('THIS_MUSIC');
    }
    changeMusic() {
        if (this.state.repeatOnce) {
            this.playThisMusic();
        } else {
            this.nextMusic();
        }
    }
    render () {
        let item = this.props.currentMusicItem || {};
        return (
            <div className='wrap process-bar'>
                <Link className='link' to='/player'>
                    <img src={item.image || '../../static/images/logo1.png'} alt=""/>
                    <div className='info flex'>
                        <p>{item.name || '歌曲'}</p>
                        <span>{item.singer || '歌手'}</span>
                    </div>
                </Link>
                <div className="btn">
                    <i className={`iconfont change ${!this.props.isPlay ? 'icon-bofang pause' : 'icon-zanting play'}`}
                       onClick={this.play.bind(this)} />
                    <Link to={'/playList'}>
                        <i className='iconfont icon-liebiao1'/>
                    </Link>
                </div>
            </div>
        )
    }
}
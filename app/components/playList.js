import React, { Component } from 'react';
import MUSIC_LIST from '../config/musicList';
import Header from './header';
import Pubsub from 'pubsub-js';
import ProcessBar from './process-bar';
import { createSong } from "../config/song";
import './playList.less';

export default class PlayList extends Component {
    componentDidMount() {

    }

    render() {
        // let item = this.state.musicList;
        return(
            <div>
                <Header title={'播放列表'} left={'left'}/>
                {
                    this.props.currentMusicItem.type === 'nomusic'
                        ? '' : <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                }
                <div id="content">
                    <div className={`play-list`}>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {MUSIC_LIST.map(item => {
                                if(item.mid) {
                                    return <SongItem
                                        key={item.mid} musicItem={item}
                                        isCurrent={item.mid === this.props.currentMusicItem.mid} />
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

class SongItem extends Component {
    playMusic(item) {
        if(this.props.isCurrent) return false;

        let musicItem = createSong(item);
        Pubsub.publish('PLAY_MUSIC', musicItem);

        let isRepeat = false;
        for (let i=0; i<MUSIC_LIST.length; i++) {
            if(MUSIC_LIST[i].mid === musicItem.mid) {
                isRepeat = true;
            }
        }

        if(!isRepeat) {
            MUSIC_LIST.push(musicItem);
            window.localStorage.setItem('music_list', JSON.stringify(MUSIC_LIST));
        }
    }
    render() {
        let item = this.props.musicItem;
        let musicItem = {
            songname: item.name,
            singername: item.singer,
            albumname: item.album,
            songid: item.id,
            interval: item.duration,
            albummid: item.albummid,
            songmid: item.mid,
        }
        return(
            <li className={`list-item flex ${this.props.isCurrent ? 'active' : ''}`}
                onClick={this.playMusic.bind(this, musicItem)}
            >
                <div className={'item-info flex'}>
                    <p className={'ell'}>{item.name}</p>
                    <span className={'ell'}>{item.singer}</span>
                </div>
                <i className={'iconfont icon-cuohao'}> </i>
            </li>
        )
    }
}
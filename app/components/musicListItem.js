import React, { Component } from 'react';
import MUSIC_LIST from '../config/musicList';
import './musicListItem.less';
import Pubsub from 'pubsub-js';
import { createSong } from "../config/song";

export default class MusicListItem extends Component {
    playMusic(item) {
        MUSIC_LIST.push(createSong(item));
        Pubsub.publish('PLAY_MUSIC', createSong(item));
        console.log(createSong(item));
    }
    componentDidMount() {
        // console.log(createSong(this.props.musicListItem));
    }
    render() {
        let musicItem = this.props.musicListItem;
        return(
            <li className={`components-listitem flex ${this.props.focus ? 'focus' : ''}`}
                onClick={this.playMusic.bind(this, musicItem)}
            >
                <p className='ell'>{musicItem.songname}</p>
                <span className={'artist ell'}>{musicItem.singername}·{musicItem.albumname}</span>
                {/*<p className="-col-auto delete"*/}
                   {/*onClick={this.deleteMusic.bind(this, musicItem )}*/}
                {/*></p>*/}
            </li>
        )
    }
}
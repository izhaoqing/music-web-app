import React, { Component } from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js';

export default class MusicListItem extends Component {
    playMusic(item) {
        Pubsub.publish('PLAY_MUSIC', item);
    }
    render() {
        let musicItem = this.props.musicListItem.data;
        return(
            <li className={`components-listitem flex ${this.props.focus ? 'focus' : ''}`}
                onClick={this.playMusic.bind(this, musicItem )}
            >
                <p className='ell'>{musicItem.songname}</p>
                <span className={'artist ell'}>{musicItem.singer[0].name}·{musicItem.albumname}</span>
                {/*<p className="-col-auto delete"*/}
                   {/*onClick={this.deleteMusic.bind(this, musicItem )}*/}
                {/*></p>*/}
            </li>
        )
    }
}
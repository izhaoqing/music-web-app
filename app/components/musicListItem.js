import React, { Component } from 'react';
import './musicListItem.less';
import Pubsub from 'pubsub-js';

export default class MusicListItem extends Component {
    playMusic(item) {
        Pubsub.publish('PLAY_MUSIC', item);
    }
    deleteMusic(item, e) {
        e.stopPropagation();
        Pubsub.publish('DELETE_MUSIC', item);
    }
    render() {
        let musicItem = this.props.musicListItem;
        return(
            <li className={`components-listitem flex ${this.props.focus ? 'focus' : ''}`}
                onClick={this.playMusic.bind(this, musicItem )}
            >
                <p>{musicItem.title}</p>
                <span className={'artist'}>{musicItem.artist}</span>
                {/*<p className="-col-auto delete"*/}
                   {/*onClick={this.deleteMusic.bind(this, musicItem )}*/}
                {/*></p>*/}
            </li>
        )
    }
}
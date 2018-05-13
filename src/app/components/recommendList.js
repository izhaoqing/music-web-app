/*
* 歌单列表
* */
import React, { Component } from 'react';
import MUSIC_LIST from '../config/musicList';
import Header from './header';
import Pubsub from 'pubsub-js';
import ProcessBar from './process-bar';
import { createSong } from "../config/song";

export default class RecommendList extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <Header title={'歌单'} left={'left'}/>
                {
                    this.props.currentMusicItem.type === 'nomusic'
                        ? '' : <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                }

            </div>
        )
    }
}
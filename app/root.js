import React, { Component } from 'react';
import Player from './page/player';
import MUSIC_LIST from './config/musicList';
import MusicList from './components/musicList';
import { Router, Route, IndexRoute, Link, hashHistory} from 'react-router';
import Pubsub from 'pubsub-js';
import Billboard from "./page/home-page/billboard";
import Search from './page/home-page/search';
import Singer from './page/home-page/singer';
import SingerDetail from './components/singerDetail';
// import getSongUrl from './config/play_config';
import getOptions from './config/music_url';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST,
            isPlay: true
        };
    }
    //切换音乐
    changeMusic(type) {
        let changeMusic = true;
        let index = MUSIC_LIST.indexOf(this.state.currentMusicItem);
        if (type === 'prev') {
            index = (index - 1) < 0 ? MUSIC_LIST.length-1 : index-1;
        } else if (type === 'next') {
            index = (index + 1) >= MUSIC_LIST.length ? 0 : index+1;
        } else {
            changeMusic = false;
        }

        if (!changeMusic) return false;
        let item = MUSIC_LIST[index];

        if(this._noMusic(item)) {
            this._play(item);
        }
    }

    //播放音乐事件函数
    playMusic(musicItem) {
        if(this._noMusic(musicItem)) {
            this._play(musicItem);
        }
    }

    //播放音乐
    _play(musicItem) {
        console.log(musicItem);
        let isPlay = true;
        getOptions(musicItem.mid, url => {
            if (!url) {
                $('#player').jPlayer('stop');
                isPlay = false;
                return false;
            }
            this.setState({
                currentMusicItem: musicItem,
                isPlay: isPlay
            });
            $('#player').jPlayer('setMedia', {
                mp3: url
            }).jPlayer('play');
        });
    }

    //没有音乐显示默认背景
    _noMusic(musicItem) {
        let result = true;
        if(musicItem.type === 'nomusic') {
            $('#player').jPlayer('stop');
            this.setState({
                currentMusicItem: musicItem,
                isPlay: false
            });
            result = false;
        }
        return result;
    }

    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        // this.playMusic(this.state.currentMusicItem);
        Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
            this.setState({
                currentMusicItem: musicItem
            });
        });
        Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: MUSIC_LIST.filter(item => {
                    return (item !== musicItem);
                })
            });
        });
        Pubsub.subscribe('PREV_MUSIC', () => {
            this.changeMusic('prev');
        });
        Pubsub.subscribe('NEXT_MUSIC', () => {
            this.changeMusic('next');
        });
        Pubsub.subscribe('THIS_MUSIC', () => {
            this.playMusic(this.state.currentMusicItem);
        });
    }
    componentWillUnmount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PREV_MUSIC');
        Pubsub.unsubscribe('NEXT_MUSIC');
        Pubsub.unsubscribe('THIS_MUSIC');
    }
    render() {
        return(
            <div>
                { React.cloneElement(this.props.children, this.state) }
            </div>
        );
    }
}

export default class Root extends Component {
    render() {
        return(
            <Router history={hashHistory}>
                <Route path='/' component={App}>
                    <IndexRoute component={Billboard}/>
                    <Route path='player' components={Player}/>
                    <Route path='billboard' component={Billboard}/>
                    <Route path='list' component={MusicList}/>
                    <Route path='search' component={Search}/>
                    <Route path='singer' component={Singer}/>
                    <Route path='singerDetail' component={SingerDetail}/>
                </Route>
            </Router>
        )
    }
}


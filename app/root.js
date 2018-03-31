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
import Recommend from './page/home-page/recommend.js';
// import getSongUrl from './config/play_config';
import getOptions from './config/music_url';
import PlayList from './components/playList';
import RecommendList from './components/recommendList';

let noMusci = {
    type: 'nomusic',
    mid: '',
    name: 'Music Player',
    singer: '',
    url: 'http://oj4t8z2d5.bkt.clouddn.com/%E9%A3%8E%E7%BB%A7%E7%BB%AD%E5%90%B9.mp3',
    image: ''
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0] || noMusci,
            musicList: MUSIC_LIST,
            isPlay: false
        };
    }
    //切换音乐
    changeMusic(type) {
        if (MUSIC_LIST.length === 0) return false;
        let changeMusic = true;
        let index = 0;

        MUSIC_LIST.forEach((v, i) => {
            if(v.mid === this.state.currentMusicItem.mid) index = i;
        });        

        if (type === 'prev') {
            index = (index - 1) < 0 ? MUSIC_LIST.length-1 : index-1;
        } else if (type === 'next') {
            index = (index + 1) >= MUSIC_LIST.length ? 0 : index+1;
        } else {
            changeMusic = false;
        }

        if (!changeMusic) return false;
        let item = MUSIC_LIST[index];

        console.log(MUSIC_LIST);

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
            console.log(this.state.isPlay);
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

        if(this.state.currentMusicItem.type !== 'nomusic') {
            getOptions(this.state.currentMusicItem.mid, url => {
                $('#player').jPlayer('setMedia', {
                    mp3: url
                }).jPlayer('pause');
            });
        }

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
        Pubsub.subscribe('PLAY', () => {
            console.log('paly')
            $('#player').jPlayer('play');
            this.setState({
                isPlay: !this.state.isPlay
            });
        });
        Pubsub.subscribe('PARSE', () => {
            $('#player').jPlayer('pause');
            this.setState({
                isPlay: !this.state.isPlay
            });
        });
        Pubsub.subscribe('MUSIC_PRESS_CHANGE', (msg, data) => {
            console.log(msg, data);
            $('#player').jPlayer('play', data.progress * data.duration);
            this.setState({
                isPlay: true
            })
        })
    }
    componentWillUnmount() {
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PREV_MUSIC');
        Pubsub.unsubscribe('NEXT_MUSIC');
        Pubsub.unsubscribe('THIS_MUSIC');
        Pubsub.unsubscribe('PLAY');
        Pubsub.unsubscribe('PARSE');
        Pubsub.unsubscribe('MUSIC_PRESS_CHANGE');
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
                    <IndexRoute component={Recommend}/>
                    <Route path='player' components={Player}/>
                    <Route path='billboard' component={Billboard}/>
                    <Route path='list' component={MusicList}/>
                    <Route path='search' component={Search}/>
                    <Route path='singer' component={Singer}/>
                    <Route path='singerDetail' component={SingerDetail}/>
                    <Route path='recommend' component={Recommend} />
                    <Route path='playList' component={PlayList} />
                    <Route path='recommendList' component={RecommendList}/>
                </Route>
            </Router>
        )
    }
}


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
// import getSongUrl from 'config/play_config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMusicItem: MUSIC_LIST[0],
            musicList: MUSIC_LIST,
            isPlay: true
        };
    }
    playMusic(item) {
        let changeMusic = false;
        let index = MUSIC_LIST.indexOf(this.state.currentMusicItem);
        if (item === 'prev') {
            index = (index - 1) < 0 ? MUSIC_LIST.length-1 : index-1;
        } else if (item === 'next') {
            index = (index + 1) >= MUSIC_LIST.length ? 0 : index+1;
        } else {
            changeMusic = true;
        }
        if (!changeMusic) {
            item = MUSIC_LIST[index];
            this.setState({
                currentMusicItem: MUSIC_LIST[index],
                isPlay: true
            });
        }

        $('#player').jPlayer('setMedia', {
            mp3: item.url
        }).jPlayer('play');
    }
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMusic(this.state.currentMusicItem);
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
            this.playMusic('prev');
        });
        Pubsub.subscribe('NEXT_MUSIC', () => {
            this.playMusic('next');
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


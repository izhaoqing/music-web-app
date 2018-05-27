import React, { Component } from 'react';
import Progress from '../components/progress';
import $ from 'jquery';
import { Base64 } from 'js-base64';
import './player.less';
import Pubsub from 'pubsub-js';
import Header from '../components/header';
import { getLyric, showLyric, createLyricArr } from '../api/lyric';

let duration = 0;

//歌名和歌手名
function SongInfo(props) {
    return (
        <div className='w100p flex song-info'>
            <div className="blumn-img flex">
                {
                    props.currentMusicItem.image
                    ? <img src={props.currentMusicItem.image} alt={props.currentMusicItem.name} />
                    :<img src="../../static/images/logo1.png" alt="" />
                }
            </div>
            <h2 className="music-title">{props.currentMusicItem.name}</h2>
            <h3 className="music-artist">{props.currentMusicItem.singer}</h3>
        </div>
    )
}

//歌词
const LyricText = props => {
    let y = - props.index * 30 + 6 * 30;
    return <div className="lyric">
        <ul style={{transform: 'translate(0, ' + y + 'px)'}}>
            {
                props.lyricArr.map((item, index) => {
                    return item.time && item.text ? <li key={item.time} className={props.index == index ? 'active' : ''}>{item.text}</li> : ''
                })
            }
        </ul>
    </div>
}

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            left: '',
            repeatOnce: false,
            //是否显示歌词
            isShowLyric: true,
            //歌词
            lyricArr: [],
            //需要高亮显示的歌词的索引
            lyricIndex: 0
        };
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            //总时长
            duration = e.jPlayer.status.duration;
            //播放进度（百分比）
            let absolute = e.jPlayer.status.currentPercentAbsolute;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                //剩下的时间
                left: (duration * (100 - e.jPlayer.status.currentPercentAbsolute) / 100),
                //计算出当前需要高亮显示的歌词的索引 
                lyricIndex: showLyric(this.state.lyricArr, absolute * duration/100)
            });
            if (e.jPlayer.status.ended) {
                this.changeMusic();
            }
        });

        //请求歌词数据
        getLyric(this.props.currentMusicItem.mid).then(res => {
            let lyric = Base64.decode(res.lyric);
            this.setState({
                lyricArr: createLyricArr(lyric)
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        // 父组件执行setState时，判断当前mid是否与传来的props相等。
        if (this.props.currentMusicItem.mid !== nextProps.currentMusicItem.mid) {
            //获取到歌词前显示为空
            this.setState({
                lyricArr: []
            });
            getLyric(nextProps.currentMusicItem.mid).then(res => {
                let lyric = Base64.decode(res.lyric);
                this.setState({
                    lyricArr: createLyricArr(lyric)
                });
            });
        }
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
        clearInterval(this.timer);
    }
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }
    play() {
        if (this.props.isPlay) {
            this.parseMusic();
        } else {
            this.playMusic();
        }
    }
    prevMusic() {
        Pubsub.publish('PREV_MUSIC');
    }
    nextMusic() {
        Pubsub.publish('NEXT_MUSIC');
    }
    playThisMusic() {
        Pubsub.publish('THIS_MUSIC');
    }
    playMusic() {
        Pubsub.publish('PLAY');
    }
    parseMusic() {
        Pubsub.publish('PARSE');
    }
    musicPressChange(progress) {
        Pubsub.publish('MUSIC_PRESS_CHANGE', { progress, duration });
    }
    formatTime(item) {
        let min = Math.round(item / 60);
        let seconds = Math.round(item % 60);
        min = min < 10 ? '0' + min : min;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        return min + ':' + seconds;
    }
    changeMusic() {
        if (this.state.repeatOnce) {
            this.playThisMusic();
        } else {
            this.nextMusic();
        }
    }
    changeRepeat() {
        this.setState({
            repeatOnce: !this.state.repeatOnce
        });
    }
    //显示歌词
    showLyricFn() {
        this.setState({
            isShowLyric: !this.state.isShowLyric
        });
    }
    render() {
        return (
            <div className='player wh'>
                <Header title={this.props.currentMusicItem.name} left={'left'} />
                <div className="player-page flex">
                    <div className="cover" onClick={() => this.showLyricFn()}>
                        {
                            !this.state.isShowLyric ? <SongInfo currentMusicItem={this.props.currentMusicItem}/> : <LyricText lyricArr={this.state.lyricArr} index={this.state.lyricIndex} />
                        }
                    </div>
                    <div className="controll-wrapper">
                        <div className="flex" style={{ flexDirection: 'row' }}>
                            <div className="volume-container flex">
                                <i className="icon-volume iconfont icon-shengyin" style={{ marginRight: '.3rem' }}> </i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#585858'
                                    >
                                    </Progress>
                                </div>
                            </div>
                            <div className="left-time -col-auto">{this.formatTime(this.state.left)}</div>
                        </div>
                        <div style={{ height: '.5rem', marginTop: '.5rem', marginBottom: '.6rem' }}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.musicPressChange}
                                barColor='#585858'
                            >
                            </Progress>
                        </div>
                        <div className="flex" style={{ flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems: 'center', height: '2rem' }}>
                            <div className='w100p flex set-icon'>
                                <i className="iconfont icon-fanhui1 prev" onClick={this.prevMusic} />
                                <i className={`iconfont change ${!this.props.isPlay ? 'icon-bofang pause' : 'icon-zanting play'}`}
                                    onClick={this.play.bind(this)} />
                                <i className="next iconfont icon-fanhui1-copy" onClick={this.nextMusic} />
                            </div>
                            <div className="set-repeat-icon">
                                <i className={`iconfont repeat ${this.state.repeatOnce ? 'icon-danquxunhuan' : 'icon-xunhuan'}`}
                                    onClick={this.changeRepeat.bind(this)} />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.props.currentMusicItem.image
                        ? <div className='filter wh bg-pic' style={{ backgroundImage: `url(${this.props.currentMusicItem.image})` }}> </div>
                        : <div className='filter wh bg-pic'> </div>
                }
            </div>
        );
    }
}
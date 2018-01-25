import React, { Component } from 'react';
import Progress from '../components/progress';
import './player.less';
import Pubsub from 'pubsub-js';
import Header from '../components/header';

let duration = 0;

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            left: '',
            repeatOnce: false
        };
    }
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                left: (duration * (100 - e.jPlayer.status.currentPercentAbsolute)/100),
            });
            if (e.jPlayer.status.ended) {
                this.changeMusic();
            }
        });
    }

    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
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
        Pubsub.publish('MUSIC_PRESS_CHANGE', {progress,duration});
    }
    formatTime(item) {
        let min = Math.round(item/60);
        let seconds = Math.round(item%60);
        min = min < 10 ? '0'+min : min;
        seconds = seconds < 10 ? '0'+seconds : seconds;
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
    render() {
        return(
            <div className='player wh'>
                <Header title={this.props.currentMusicItem.name} left={'left'}/>
                <div className="player-page flex">
                <div className="cover">
                    {
                        this.props.currentMusicItem.image
                            ? <img src={this.props.currentMusicItem.image} alt={this.props.currentMusicItem.name}/>
                            :<img src="../../static/images/logo1.png" alt=""/>
                    }
                </div>
                <div className="controll-wrapper">
                    <h2 className="music-title">{this.props.currentMusicItem.name}</h2>
                    <h3 className="music-artist">{this.props.currentMusicItem.singer}</h3>
                    <div className="flex" style={{flexDirection: 'row'}}>
                        <div className="volume-container flex">
                            <i className="icon-volume iconfont icon-shengyin" style={{marginRight: '.3rem'}}> </i>
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
                    <div style={{height: '.5rem', marginTop: '.5rem', marginBottom: '.6rem'}}>
                        <Progress
                            progress={this.state.progress}
                            onProgressChange={this.musicPressChange}
                            barColor='#585858'
                        >
                        </Progress>
                    </div>
                    <div className="flex" style={{flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems:'center', height:'2rem'}}>
                        <div className='w100p flex set-icon'>
                            <i className="iconfont icon-fanhui1 prev" onClick={this.prevMusic}/>
                            <i className={`iconfont change ${!this.props.isPlay ? 'icon-bofang pause' : 'icon-zanting play'}`}
                               onClick={this.play.bind(this)} />
                            <i className="next iconfont icon-fanhui1-copy" onClick={this.nextMusic}/>
                        </div>
                        <div className="set-repeat-icon">
                            <i className={`iconfont repeat ${this.state.repeatOnce? 'icon-danquxunhuan' : 'icon-xunhuan'}`}
                               onClick={this.changeRepeat.bind(this)} />
                        </div>
                    </div>
                </div>
            </div>
                {
                    this.props.currentMusicItem.image
                        ? <div className='filter wh bg-pic' style={{backgroundImage: `url(${this.props.currentMusicItem.image})`}}> </div>
                        : <div className='filter wh bg-pic'> </div>
                }
            </div>
        );
    }
}
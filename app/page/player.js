import React, { Component } from 'react';
import Progress from '../components/progress';
import './player.less';
import Pubsub from 'pubsub-js';
import Header from '../components/header'

let duration = 0;

export default class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            volume: 0,
            isPlay: this.props.isPlay,
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
    componentWillReceiveProps () {
        this.setState({
            isPlay: this.props.isPlay
        });
    }
    componentWillUnmount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }
    handlePressChange(progress) {
        $('#player').jPlayer('play', progress * duration);
    }
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }
    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
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
            <div>
                <Header title={this.props.currentMusicItem.title} left={'left'} right={'list'}/>
            <div className="player-page flex">
                {/*<h1 className="caption">*/}
                    {/*<Link to='/list'>我的私人音乐坊 &gt;</Link>*/}
                {/*</h1>*/}
                    <div className="cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist">{this.props.currentMusicItem.artist}</h3>
                        <div className="flex" style={{flexDirection: 'row'}}>
                            <div className="volume-container flex">
                                <i className="icon-volume" style={{marginRight: '.3rem'}}></i>
                                <div className="volume-wrapper">
                                    <Progress
                                        progress={this.state.volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#aaa'
                                    >
                                    </Progress>
                                </div>
                            </div>
                            <div className="left-time -col-auto">{this.formatTime(this.state.left)}</div>
                        </div>
                        <div style={{height: '.5rem', marginTop: '.5rem', marginBottom: '.6rem'}}>
                            <Progress
                                progress={this.state.progress}
                                onProgressChange={this.handlePressChange}
                            >
                            </Progress>
                        </div>
                        <div className="flex" style={{flexDirection: 'row', justifyContent: 'space-between', position: 'relative', alignItems:'center', height:'2rem'}}>
                            <div className='w100p flex set-icon'>
                                <i className="iconfont icon-fanhui1 prev"
                                   onClick={this.prevMusic}
                                ></i>
                                <i className={`iconfont change ${!this.state.isPlay ? 'icon-bofang pause' : 'icon-zanting play'}`}
                                   onClick={this.play.bind(this)}
                                ></i>
                                <i className="next iconfont icon-fanhui1-copy" onClick={this.nextMusic}></i>
                            </div>
                            <div className="">
                                <i className={`icon ${this.state.repeatOnce? 'repeat-once' : 'repeat-cycle'}`}
                                   onClick={this.changeRepeat.bind(this)}
                                ></i>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        );
    }
}
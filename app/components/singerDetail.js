import React, { Component } from 'react';
import MusicListItem from './musicListItem';
import Header from './header';
import ProcessBar from './process-bar';
import { getSingerDetail } from "../api/singer";
import './singerDetail.less';

export default class SingerDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            musicList: {data:{
                singer_name: '',
                list: []
            }}
        }
    }
    componentDidMount() {
        if(!this.props.location.query.id) return;
        getSingerDetail(this.props.location.query.id).then(res => {
            console.log(res);
            this.setState({
                musicList: res,
                isHidden: false
            })
        });
    }
    render() {
        let item = this.state.musicList;
        return (
            <div className='singer-detail'>
                <Header title={item.data.singer_name} left={'left'}/>
                <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={this.state.isHidden ? 'hidden' : 'show'}>
                        <div className='top-info' >
                            {
                                item.data.singer_mid
                                    ? <img src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.data.singer_mid}.jpg?max_age=2592000`} alt=""/>
                                    : <img src={``} alt=""/>
                            }
                        </div>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {item.data.list.map((v) => {
                                let isFocus = v.musicData.songmid === this.props.currentMusicItem.id;
                                let songData = {
                                    songname: v.musicData.songname,
                                    singername: v.musicData.singer.map(item => item.name).join('/'),
                                    albumname: v.musicData.albumname,
                                    songid: v.musicData.songid,
                                    interval: v.musicData.interval,
                                    albummid: v.musicData.albummid,
                                    songmid: v.musicData.songmid
                                    // title: v.musicData.songname,
                                    // artist: v.musicData.singer.map(item => item.name).join('/'),
                                    // id: v.musicData.songmid,
                                    // cover: `https://y.gtimg.cn/music/photo_new/T001R300x300M000${v.musicData.singer_mid}.jpg?max_age=2592000`,
                                    // file: `http://dl.stream.qqmusic.qq.com/C400${v.musicData.songmid}.m4a?vkey=F68FC9FEAD9138AF8451F4AEC3491D07D844D402236917923C1AD1D861F851C214606045A156F5DC3ED2319DC79572FE5F36CBBD2DAC06D5&guid=8476550550&uin=0&fromtag=66`
                                };
                                return(
                                    <MusicListItem
                                        key={v.musicData.songmid}
                                        musicListItem={songData}
                                        focus={isFocus}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
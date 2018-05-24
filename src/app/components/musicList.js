import React, { Component } from 'react';
import MusicListItem from './musicListItem';
import Header from './header';
import ProcessBar from './process-bar';
import { getMusicList} from "../api/rank";
import { getSingerDetail } from "../api/singer";
import { getSongList } from '../api/recommend';
import './musicList.less';

export default class MusicList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: {songlist: [], topinfo: {}},
            isHidden: true
        }
    }
    componentDidMount() {
        if (this.props.location.query.type === 'singer') {
            getSingerDetail(this.props.location.query.id).then(res => {
                this.setState({
                    musicList: res,
                    isHidden: false
                })
            });
        } else if(this.props.location.query.type === 'recommend') {
            getSongList(this.props.location.query.dissid).then(res => {
                console.log(JSON.stringify(res));
                this.setState({
                    musicList: res.cdlist[0],
                    isHidden: false
                });
            });
        } else {
            getMusicList(this.props.location.query.id).then((res) => {
                console.log(res);
                this.setState({
                    musicList: res,
                    isHidden: false
                })
            });
        }

    }
    componentWillUnmount() {

    }
    render() {
        let item = this.state.musicList;
        let data = this.props.location.query.type === 'recommend' ? {
            title: item.dissname,
            pic_album: item.logo,
            nickname: item.nickname,
            songlist: item.songlist
        } : {
            title: item.topinfo.ListName,
            pic_album: item.topinfo.pic_album,
            day: item.day_of_year || '1',
            update_time: item.update_time,
            songlist: item.songlist
        };

        return(
            <div>
                <Header title={data.title} left={'left'}/>
                {
                    this.props.currentMusicItem.type === 'nomusic'
                        ? '' : <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                }
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={`${this.state.isHidden ? 'hidden' : 'show'} music-list`}>
                        <div className='top-info' >
                            <img src={data.pic_album} alt=""/>
                            <div className='info'>
                                <p className='title'>{data.title}</p>
                                {data.day ? <p>第{data.day}天</p> : ''}
                                {data.update_time ? <p>更新时间：{data.update_time}</p> : ''}
                                {data.nickname ? <p>{data.nickname}</p> : ''}
                            </div>
                            <i className="mark filter" style={{backgroundImage:`url(${data.pic_album})`}}/>
                        </div>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {data.songlist.map((v) => {
                                let value = this.props.location.query.type === 'recommend' ? v : v.data;
                                let isFocus = value.songid === this.props.currentMusicItem.id;
                                let musicData = {
                                    songname: value.songname,
                                    singername: value.singer.map(item => item.name).join('/'),
                                    albumname: value.albumname,
                                    songid: value.songid,
                                    interval: value.interval,
                                    albummid: value.albummid,
                                    songmid: value.songmid,
                                }
                                return(
                                    <MusicListItem
                                        key={value.songid}
                                        musicListItem={musicData}
                                        focus={isFocus}
                                    />
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
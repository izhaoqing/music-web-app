import React, { Component } from 'react';
import MusicListItem from './musicListItem';
import Header from './header';
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
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={this.state.isHidden ? 'hidden' : 'show'}>
                        <div className='top-info' >
                            <img src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${item.data.singer_mid}.jpg?max_age=2592000`} alt=""/>
                        </div>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {item.data.list.map((v) => {
                                let isFocus = v.musicData.songmid === this.props.currentMusicItem.id;
                                let songData = {
                                    songname: v.musicData.songname,
                                    singername: item.data.singer_name,
                                    albumname: v.musicData.albumname
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
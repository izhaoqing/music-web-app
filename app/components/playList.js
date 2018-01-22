import React, { Component } from 'react';
import MUSIC_LIST from '../config/musicList';
import MusicListItem from './musicListItem';
import Header from './header';
import ProcessBar from './process-bar';
import './musicList.less';

export default class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: {songlist: [], topinfo: {}},
            isHidden: true
        }
    }
    componentDidMount() {
        // if (this.props.location.query.type === 'singer') {
        //     getSingerDetail(this.props.location.query.id).then(res => {
        //         console.log(res);
        //         this.setState({
        //             musicList: res,
        //             isHidden: false
        //         })
        //     });
        // } else if(this.props.location.query.type === 'recommend') {
        //     console.log(this.props.location.query.dissid)
        //     getSongList(this.props.location.query.dissid).then(res => {
        //         console.log(res);
        //     })
        // } else {
        //     getMusicList(this.props.location.query.id).then((res) => {
        //         console.log(res);
        //         this.setState({
        //             musicList: res,
        //             isHidden: false
        //         })
        //     });
        // }

    }
    componentWillUnmount() {

    }
    render() {
        let item = this.state.musicList;
        return(
            <div>
                <Header title={item.topinfo.ListName} left={'left'}/>
                <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={`${this.state.isHidden ? 'hidden' : 'show'} music-list`}>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {MUSIC_LIST.map(item => {
                                <MusicListItem
                                    key={item.id}
                                    musicListItem={musicData}
                                    focus={isFocus}
                                />
                            })}

                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
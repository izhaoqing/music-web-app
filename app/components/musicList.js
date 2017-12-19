import React, { Component } from 'react';
import MusicListItem from './musicListItem';
import Header from './header';
import { getMusicList} from "../api/rank";
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
        getMusicList(this.props.location.query.id).then((res) => {
            console.log(res);
            this.setState({
                musicList: res,
                isHidden: false
            })
        })
    }
    componentWillUnmount() {

    }
    render() {
        let item = this.state.musicList;
        return(
            <div>
                <Header title={item.topinfo.ListName} left={'left'}/>
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={this.state.isHidden ? 'hidden' : 'show'}>
                        <div className='top-info' >
                            <img src={item.topinfo.pic_album} alt=""/>
                            <div className='info'>
                                <p className='title'>{item.topinfo.ListName}</p>
                                <p>第{item.day_of_year || 1}天</p>
                                <p>更新时间：{item.update_time}</p>
                            </div>
                            <i className="mark filter" style={{backgroundImage:`url(${item.topinfo.pic_album})`}}></i>
                        </div>
                        <ul style={{padding:'0 .75rem',background:'#fafafa'}}>
                            {item.songlist.map((item) => {
                                let isFocus = item.id === this.props.currentMusicItem.id;
                                return(
                                    <MusicListItem
                                        key={item.data.songid}
                                        musicListItem={item}
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
import React, { Component } from 'react';
import './search.less';
import { Link } from 'react-router';
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';
import { getHotKey, search } from '../../api/search';
// import sliderFn from '../../config/slider';
import Pubsub from 'pubsub-js';
import { createSong } from "../../config/song";
import MUSIC_LIST from '../../config/musicList';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotKeys: [],
            searchList: [],
            searchListShow: false
        };
        this.page = 1;  //页码
        this.query = '';  //搜索关键词
        this.resultData = [];  //搜索结果
        this.stopSearch = false; //是否停止搜索;
        this.loading = true;  //正在加载；
    }
    componentDidMount() {
        //获取热门搜索
        getHotKey().then(res => {
            this.setState({
                hotKeys: res.data.hotkey.slice(0,10),
            })
        });

        //scroll事件
        this.refs.resultList.addEventListener('scroll', () => {
            this._scrollFn();
        })
    }

    componentWillUnmount() {
        this.refs.resultList.removeEventListener('scroll', () => {
            this._scrollFn();
        });
    }

    //滚动事件函数
    _scrollFn() {
        let boxH = this.refs.resultList.clientHeight;   //父级高度
        let slientH = this.refs.resultUl.clientHeight;  //ul的高度
        let scrollTop = this.refs.resultList.scrollTop; //滚动条top
        console.log(boxH+scrollTop, slientH);
        if (boxH+scrollTop === slientH) {
            if(this.stopSearch || this.loading) return false;
            this.page++;
            this._search(this.query, this.page);
        }
    }

    //搜索请求函数
    _search(query, page) {
        search(query, page, 1, 30).then(res => {
            console.log(res);
            if (res.code !== 0) return;

            if(page === 1) {
                this.resultData = [];
                this.stopSearch = false;
            }

            if (res.data.song.list && res.data.song.list.length < 30) {
                this.stopSearch = true;
            }

            this.resultData = [...this.resultData, ...res.data.song.list];
            let list = this.resultData;

            let searchList = [{
                type: 'singer',
                singername: res.data.zhida.singername,
                singermid: res.data.zhida.singermid,
                singerid: res.data.zhida.singerid
            }];
            for (let i=0; i<list.length; i++) {
                searchList.push({
                    type: 'song',
                    songid: list[i].songid,
                    duration: list[i].duration,
                    albumname: list[i].albumname,
                    albummid: list[i].albummid,
                    songname: list[i].songname,
                    songmid: list[i].songmid,
                    singername: list[i].singer.map(item => item.name).join('/')
                });
            }

            this.setState({
                searchList,
                searchListShow: true
            });

            console.log(searchList);

            this.loading = false;
        });
    }

    //搜索
    handleSearch() {
        this._search(this.input.value, 1);
        this.query = this.input.value;
        // sliderFn(this.parentNode, this.scrollNode, this._loadCb);
    }

    //点击热门搜索
    handleHotSearch(query) {
        this._search(query, 1);
        this.input.value = query;
        this.query = query;
    }

    //取消搜索
    handleCancelSearch() {
        this.setState({
            searchListShow: false
        });
        this.input.value = '';
    }

    //播放音乐
    handlePlay(mid) {
        let list = this.resultData;
        for (let i=0; i<list.length; i++) {
            // console.log()
            if(list[i].songmid === mid) {
                play(list[i]);
            }
        }

        function play(item) {
            let musicItem = createSong(item);
            Pubsub.publish('PLAY_MUSIC', musicItem);

            let isRepeat = false;
            for (let i=0; i<MUSIC_LIST.length; i++) {
                if(MUSIC_LIST[i].mid === musicItem.mid) {
                    isRepeat = true;
                }
            }

            if(!isRepeat) {
                MUSIC_LIST.push(musicItem);
                window.localStorage.setItem('music_list', JSON.stringify(MUSIC_LIST));
            }
        }
    }

    render () {
        return (
            <div className='wh'>
                <PageHeader active='search'/>
                <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                <div id={'content'}>
                    <div className='search-page wh'>
                        <div className="input-box">
                            <input type="text"
                                   ref={input => this.input = input}
                                   placeholder='搜索歌曲 歌手'/>
                            <button
                                onClick={this.handleSearch.bind(this)}
                            ><i className='iconfont icon-sousuo'> </i></button>
                            <span className={`cancel-btn`}
                                  onClick={this.handleCancelSearch.bind(this)}
                                  style={{visibility: `${this.state.searchListShow ? 'visible' : 'hidden'}` }}>&times;</span>
                        </div>

                        <div className={`hot-search ${this.state.searchListShow? 'dn' : ''}`}>
                            <p>热门搜索</p>
                            <ul>
                                {
                                    this.state.hotKeys.map(item => {
                                        return(
                                            <li key={item.n+item.k}
                                                onClick={this.handleHotSearch.bind(this, item.k)}
                                                data-n={item.n}>{item.k}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div ref='resultList'
                            className={`result-list wh ${this.state.searchListShow ? '': 'dn'}`}>
                            <ul ref='resultUl'>
                                {
                                    this.state.searchList.map(item => {
                                        if(item.type ==='singer') {
                                            if(!item.singermid) return false;
                                            return(
                                                <li key={item.singermid}>
                                                    <i className="iconfont icon-geshou"></i>
                                                    <Link to={{pathname:'/singerDetail', query:{id: item.singermid}} }>
                                                        {item.singername}
                                                    </Link>
                                                </li>
                                            )
                                        } else {
                                            return(
                                                <li key={item.songmid} onClick={this.handlePlay.bind(this, item.songmid)}>
                                                    <i className="iconfont icon-yinle"/>
                                                    <p className='ell' dangerouslySetInnerHTML={{__html: `${item.songname} - ${item.singername}`}}/>
                                                </li>
                                            )
                                        }

                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
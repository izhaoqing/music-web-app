import React, { Component } from 'react';
import './search.less';
import { Link } from 'react-router';
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';
import { getHotKey, search } from '../../api/search';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hotKeys: [],
            searchList: [],
            searchListShow: false
        }
    }
    componentDidMount() {
        getHotKey().then(res => {
            this.setState({
                hotKeys: res.data.hotkey.slice(0,10),
            })
        });
    }
    _search(query) {
        search(query, 1, 1, 30).then(res => {
            if (res.code !== 0) return;
            let list = res.data.song.list;
            let searchList = [{
                type: 'singer',
                singername: res.data.zhida.singername,
                singermid: res.data.zhida.singermid,
                singerid: res.data.zhida.singerid
            }];
            for (let i=0; i<list.length; i++) {
                searchList.push({
                    type: 'song',
                    albumname: list[i].albumname,
                    albummid: list[i].albummid,
                    songname: list[i].songname,
                    songmid: list[i].songmid,
                    singername: list[i].singer[0].name
                });
            }
            this.setState({
                searchList,
                searchListShow: true
            });
            console.log(res);
        });
    }
    handleSearch() {
        this._search(this.input.value);
    }
    handleHotSearch(query) {
        this._search(query);
        this.input.value = query;
    }
    render () {
        return (
            <div className='wh'>
                <PageHeader active='search'/>
                <ProcessBar/>
                <div id={'content'}>
                    <div className='search-page wh'>
                        <div className="input-box">
                            <input type="text"
                                   ref={input => this.input = input}
                                   placeholder='搜索歌曲 歌手'/>
                            <button
                                onClick={this.handleSearch.bind(this)}
                            ><i className='iconfont icon-sousuo'> </i></button>
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

                        <ul className={`result-list wh ${this.state.searchListShow ? '': 'dn'}`}>
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
                                            <li key={item.songmid}>
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
        )
    }
}
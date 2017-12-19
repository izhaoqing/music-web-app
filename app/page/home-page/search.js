import React, { Component } from 'react';
import './search.less';
import Header from '../../components/header';
import { Link } from 'react-router';
import { getTopList} from "../../api/rank";
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';

export default class Search extends Component {
    render () {
        return (
            <div className='wh'>
                <PageHeader active='search'/>
                <ProcessBar/>
                <div id={'content'}>
                    <div className='search-page wh'>
                        <div className="input-box">
                            <input type="text" placeholder='搜索歌曲 歌手'/>
                            <button><i className='iconfont icon-sousuo'></i></button>
                        </div>

                        <div className='hot-search'>
                            <p>热门搜索</p>
                            <ul>
                                <li>林俊杰</li>
                                <li>林俊杰</li>
                                <li>林俊杰</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
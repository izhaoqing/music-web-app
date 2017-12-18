import React, { Component } from 'react';
import './billboard.less';
import Header from './header.js';
import { Link } from 'react-router';
import { getTopList} from "../api/rank";

export default class Billboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topList: []
        }
    }
    componentDidMount() {
        let _this = this;
        getTopList().then(function (res){
            console.log(res);
            _this.setState({
                topList: res.data.topList
            });
        });
    }
    render () {
        return (
            <div>
                <Header title='榜单' left={'left'}/>
                <div id={'content'}>
                    <div style={{padding: `0 0 .5rem`}}>
                        {
                            this.state.topList.map((item)=> {
                                return (
                                    <Link to={{pathname:"/list", query:{id: item.id}, state:{}  }} key={item.id}>
                                        <div style={{margin: '.5rem .5rem 0'}}>
                                            <div className='bill-wrap'>
                                                <div className='title' style={{backgroundImage: `url(${item.picUrl})`}}></div>
                                                <ul className='bill-list ell'>
                                                    {
                                                        item.songList.map((item)=>{
                                                            return (
                                                                <li className={'ell'} key={item.songname}>{item.songname}-{item.singername}</li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

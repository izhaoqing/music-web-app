import React, { Component } from 'react';
import './billboard.less';
import { Link } from 'react-router';
import { getTopList} from "../../api/rank";
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';

export default class Billboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topList: [],
            isHidden: true
        }
    }
    componentDidMount() {
        let _this = this;
        getTopList().then(function (res){
            console.log(res);
            _this.setState({
                topList: res.data.topList,
                isHidden: false
            });
        });
    }
    render () {
        return (
            <div className='parent-box'>
                {/*<Header title='榜单' left={'left'}/>*/}
                <PageHeader active='billboard'/>
                <ProcessBar currentMusicItem={this.props.currentMusicItem} />
                <div id={'content'}>
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div style={{padding: `0 0 .5rem`}} className={this.state.isHidden ? 'hidden' : 'show'}>
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
                                                                <li className={'ell'} key={item.songname+ item.singername}>{item.songname} <span style={{color: '#999'}}>-{item.singername}</span></li>
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

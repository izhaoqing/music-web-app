import React, { Component } from 'react';
import PageHeader from './page-header';
import {Link} from 'react-router';
import { getDiscList } from '../../api/recommend';
import './recommend.less';

const data = [
    {
    "dissid": "890327314",
    "createtime": "2017-11-03",
    "commit_time": "2017-11-03",
    "dissname": "华语 | 斜阳余晖下，思念被拉好长",
    "imgurl": "http://p.qpic.cn/music_cover/38UCn2Yq89HOhk5xasnD2tMy1sDGxibQd91bCmAnej26PujWymeCmiaQ/600?n=1",
    "introduction": "",
    "listennum": 58078,
    "score": 0,
    "version": 0,
    "creator": {
        "type": 0,
        "qq": 2097206520,
        "encrypt_uin": "ownq7i-z7w4Aon**",
        "name": "艺术猫",
        "isVip": 0,
        "avatarUrl": "",
        "followflag": 0
    }
},{
    "dissid": "2983775451",
    "createtime": "2017-10-27",
    "commit_time": "2017-10-27",
    "dissname": "小语种音乐：纯享以色列之音",
    "imgurl": "http://p.qpic.cn/music_cover/ka2yTVAaK7TPKQf8bKAdpfs9iahTBzYOEnKzEwL9ehTKtGJKohHicIjA/600?n=1",
    "introduction": "",
    "listennum": 24027,
    "score": 0,
    "version": 0,
    "creator": {
        "type": 0,
        "qq": 643711727,
        "encrypt_uin": "7wvi7i657i-l",
        "name": "這里的黎明靜悄悄",
        "isVip": 0,
        "avatarUrl": "",
        "followflag": 0
    }
}];

export default class Recommend extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {
        // getDiscList().then(res => {
        //     console.log(res);
        // })
    }
    render() {
        return(
            <div>
                <PageHeader active='recommend'/>
                <div id="content">
                    <div className="recommend">
                        <div className="banner">

                        </div>
                        <ul className="rec-wrap">
                            {
                                data.map(item => {
                                    return(
                                        <li key={item.dissid}>
                                            <Link to={{pathname:"/list", query:{dissid: item.dissid, type: 'recommend'}, state:{}  }}>
                                                <img src={item.imgurl} alt=""/>
                                                <div>
                                                    <p>{item.creator.name}</p>
                                                    <span className='ell'>{item.dissname}</span>
                                                </div>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
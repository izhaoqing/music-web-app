import React, { Component } from 'react';
import './singer.less';
import { Link } from 'react-router';
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';
import {getSingerList, getSingerDetail} from '../../api/singer';

export default class Singer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            singers: [],
            data: [],
            keys: []
        }
    }
    componentDidMount() {
        getSingerList().then(res => {
            console.log(res);

            let keyArr = res.data.list.map(item => {
                return item.Findex;
            });

            //导航标签
            let keys = ['热', ...this.arrRepeat(keyArr)];

            //歌手数据
            let singers = [{Findex: '热门', list: []}];

            //热门歌手
            let hotSingers = res.data.list.slice(0,10);
            for (let i=0; i<hotSingers.length; i++) {
                singers[0].list.push({
                    Fsinger_name: hotSingers[i].Fsinger_name,
                    Fsinger_id: hotSingers[i].Fsinger_id
                });
            }

            //其他歌手
            let singerData = res.data.list;
            for (let i=1; i<keys.length; i++) {
                let data = {Findex: keys[i], list: []}
                for (let j=0; j<singerData.length; j++) {
                    if (keys[i] === singerData[j].Findex) {
                        data.list.push({
                            Fsinger_name: singerData[j].Fsinger_name,
                            Fsinger_id: singerData[j].Fsinger_id
                        });
                    }
                }
                singers.push(data);
            }

            this.setState({keys, singers});
        });
        // getSingerDetail('0025NhlN2yWrP4').then(res => {
        //     console.log(res);
        // })
    }

    //去重/排序
    arrRepeat(arr) {
        let newArr = [];
        arr.forEach(item => {
            if (newArr.indexOf(item) < 0) {
                newArr.push(item);
            }

        });
        return newArr.sort();
    }

    render() {
        return (
            <div className='wh'>
                <PageHeader active='singer'/>
                <ProcessBar/>
                <div id={'content'} className='singer-page'>
                    <ul className='wh'>
                        {
                            this.state.singers.map(item => {
                                return (
                                    <li key={item.Findex}>
                                        <p className='key'>{item.Findex}</p>
                                        <ul className='singer-list'>
                                            {
                                                item.list.map(data => {
                                                    return (
                                                        <li key={data.Fsinger_id} data-id={data.Fsinger_id}>
                                                            <img src="https://y.gtimg.cn/music/photo_new/T006R300x300M000004bFmjW2PXSqF.jpg?max_age=2592000" alt=""/>
                                                            <span>{data.Fsinger_name}</span>
                                                        </li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </li>
                                )
                            })
                        }

                    </ul>
                    <ul className='tag'>
                        {
                            this.state.keys.map(item => {
                                return <li key={item}>{item}</li>;
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import './singer.less';
import { Link } from 'react-router';
import ProcessBar from "../../components/process-bar";
import PageHeader from './page-header';
import { getSingerList } from '../../api/singer';

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
            let singers = [{Findex: '热门', id: '热', list: []}];

            //热门歌手
            let hotSingers = res.data.list.slice(0,10);
            for (let i=0; i<hotSingers.length; i++) {
                singers[0].list.push({
                    Fsinger_name: hotSingers[i].Fsinger_name,
                    Fsinger_id: hotSingers[i].Fsinger_id,
                    Fsinger_mid: hotSingers[i].Fsinger_mid
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
                            Fsinger_id: singerData[j].Fsinger_id,
                            Fsinger_mid: singerData[j].Fsinger_mid
                        });
                    }
                }
                singers.push(data);
            }

            this.setState({keys, singers});
        });
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

    //点击锚点
    scrollTo(id) {
        console.log(id)
        document.querySelector(id).scrollIntoView();
    }

    //滑动锚点
    touchTo(e) {
        e.preventDefault();
        let node = document.querySelector('.tag-list'); //ul节点
        let lis = node.querySelectorAll('li');      //ul下的所有li

        //节点到页面顶部距离
        let getElementTop = function(node){
            let top = node.offsetTop;
            let cur = node.offsetParent;
            while(cur !== null){
                top += cur.offsetTop;
                cur = cur.offsetParent;
            }
            return top;
        };

        let nodeTop = getElementTop(node);  //ul离页面顶部距离

        let nodeHeight = node.offsetHeight;  //ul的height

        let long = e.changedTouches[0].clientY - nodeTop;  //触摸点到ul顶部的距离

        //判断滑动到哪个li上
        let index = Math.ceil(long/(nodeHeight/lis.length));

        index = index < 1 ? 1 : index > lis.length ? lis.length : index;

        this.scrollTo('#tag-'+lis[index-1].getAttribute('data-tag'));

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
                                        <p className='key' id={'tag-'+(item.id || item.Findex)}>{item.Findex}</p>
                                        <ul className='singer-list'>
                                            {
                                                item.list.map(data => {
                                                    return (
                                                        <li key={data.Fsinger_id}>
                                                            <Link to={{pathname:"/singerDetail", query:{id: data.Fsinger_mid}, state:{}  }}>
                                                                <img src={`https://y.gtimg.cn/music/photo_new/T001R300x300M000${data.Fsinger_mid}.jpg?max_age=2592000`} alt=""/>
                                                                <span>{data.Fsinger_name}</span>
                                                            </Link>
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
                    <div className='tag-box'>
                        <ul className='tag-list'>
                            {
                                this.state.keys.map(item => {
                                    return (<li key={item}
                                                data-tag={item}
                                                onTouchMove={this.touchTo.bind(this)}
                                                onClick={this.scrollTo.bind(this, '#tag-'+item)}>{item}</li>);
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
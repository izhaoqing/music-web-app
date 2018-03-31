import React, { Component } from 'react';
import PageHeader from './page-header';
import {Link} from 'react-router';
import { getDiscList, getBanner } from '../../api/recommend';
import './recommend.less';
import ProcessBar from '../../components/process-bar';

let sliderIndex = 0;

export default class Recommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: {
                songList: [],
                slider: []
            },
            isHidden: true,
            timer: null
        }
    }
    componentDidMount() {
        // getDiscList().then(res => {
        //     console.log(res);
        //     this.setState({
        //         data: res.data,
        //         isHidden: false
        //     });
        // });
        getBanner().then(res => {
            this.setState({
                data: res.data,
                isHidden: false
            });
            this.sliderFn(0);
            this.timer = setInterval(() => {
                if(this.sliderBox.querySelectorAll('li').length === 0) {
                    return false;
                } else {
                    sliderIndex = sliderIndex++ > this.sliderBox.querySelectorAll('li').length-2 ? 0 : sliderIndex;
                    this.sliderFn(sliderIndex);
                }
            }, 3000);
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        sliderIndex = 0;
    }
    sliderFn(i) {
        console.log(i);
        this.sliderBox.querySelectorAll('li').forEach(item => {
            item.style.opacity = 0;
        });
        this.sliderBox.querySelectorAll('li')[i].style.opacity = 1;
    }
    render() {
        return(

            <div>
                <PageHeader active='recommend'/>
                {
                    this.props.currentMusicItem.type === 'nomusic'
                    ? '' : <ProcessBar currentMusicItem={this.props.currentMusicItem} isPlay={this.props.isPlay}/>
                }
                <div id="content">
                    <div className={`${!this.state.isHidden ? 'hidden' : 'show'} loading`}>加载中...</div>
                    <div className={this.state.isHidden ? 'hidden' : 'show'}>
                        <div className="recommend">
                            <div className="banner">
                                <ul ref={ul => this.sliderBox = ul}>
                                    {
                                        this.state.data.slider.map(item => {
                                            return(
                                                <li key={item.id}>
                                                    <img src={item.picUrl} alt=""/>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <h2>热门歌单</h2>
                            <ul className="rec-wrap">
                                {
                                    this.state.data.songList.map(item => {
                                        return(
                                            <li key={item.id}>
                                                <Link to={{pathname:"/list", query:{dissid: item.pic_mid, type: 'recommend'}, state:{}  }}>
                                                    <img src={item.picUrl} alt=""/>
                                                    <div>
                                                        <p>{item.songListAuthor}</p>
                                                        <span className='ell'>{item.songListDesc}</span>
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
            </div>
        )
    }
}
import React, { Component } from 'react';
import PageHeader from './page-header';
import {Link} from 'react-router';
import { getDiscList, getBanner, getRecomentList } from '../../api/recommend';
import './recommend.less';
import ProcessBar from '../../components/process-bar';

let sliderIndex = 0;

export default class Recommend extends Component {
    constructor(props){
        super(props);
        this.state = {
            slider: [],
            songList: [],
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
                slider: res.data.slider,
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
        });
        getRecomentList().then(res => {
            console.log(res);
            this.setState({
                songList: res.recomPlaylist.data.v_hot
            })
        })
    }
    componentWillUnmount() {
        clearInterval(this.timer);
        sliderIndex = 0;
        sessionStorage.setItem('recommend', document.querySelector('#root'),)
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
                                        this.state.slider.map(item => {
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
                                    this.state.songList.map(item => {
                                        return(
                                            <li key={item.pic_mid}>
                                                <Link to={{pathname:"/list", query:{dissid: item.content_id, type: 'recommend'}, state:{}  }}>
                                                    <img src={item.cover} alt=""/>
                                                    <div>
                                                        <p className='ell'>{item.title}</p>
                                                        <span className='ell'>{item.username}</span>
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
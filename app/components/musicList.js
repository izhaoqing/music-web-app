import React, { Component } from 'react';
import MusicListItem from './musicListItem';
import Header from './header';

export default class MusicList extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         musicList: this.props.musicList;
    //     }
    // }
    render() {
        let musicList = this.props.musicList;
        return(
            <div>
                <Header title={'歌曲列表'} left={'left'}/>
                <ul style={{margin:'0 .75rem'}}>
                    {musicList.map((item) => {
                        let isFocus = item.id === this.props.currentMusicItem.id;
                        return(
                            <MusicListItem
                                key={item.id}
                                musicListItem={item}
                                focus={isFocus}
                            ></MusicListItem>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
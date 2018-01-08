import {getLyric} from '../api/song';
import {ERR_OK} from '../api/config';
import {Base64} from 'js-base64';

class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id;
        this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        this.duration = duration;
        this.image = image;
        this.url = url;
    }

    getLyric() {
        if (this.lyric) {
            return Promise.resolve(this.lyric)
        }

        return new Promise((resolve, reject) => {
            getLyric(this.mid).then((res) => {
                if (res.retcode === ERR_OK) {
                    this.lyric = Base64.decode(res.lyric)
                    resolve(this.lyric)
                } else {
                    reject('no lyric')
                }
            })
        })
    }
}

export function createSong (musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: musicData.singername,
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        // imgage: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${}.jpg?max_age=2592000`,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`,
        // url: `http://dl.stream.qqmusic.qq.com/${musicData.songid}.m4a?vkey=81C211E7BA76C685C30B039A777D542DE6E6B5D91FF2241ACC8F6834F595BA81148C69A48B7797E1FB407FDBD4C34D1D2FE8D1BB488A1915&guid=8476550550&uin=0&fromtag=66`
    })
}

function filterSinger(singer) {
    let ret = [];
    if (!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    })
    return ret.join('/')
}

function createUlr () {

}


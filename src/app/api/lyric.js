// import {commonParams} from './config'
import jsonp from '../config/jsonp';

export function getLyric(mid) {
  // const url = 'http://ustbhuangyi.com/music/api/lyric';
  const url = 'http://localhost:4000?type=lyric';

  // const data = Object.assign({}, commonParams, {
  //     g_tk: 1928093487,
  //     inCharset: 'utf-8',
  //     outCharset: 'utf-8',
  //     notice: 0,
  //     format: 'json',
  //     songmid: mid,
  //     platform: 'yqq',
  //     hostUin: 0,
  //     needNewCode: 0,
  //     categoryId: 10000000,
  //     pcachetime: +new Date()
  // });
    return jsonp(url, {
        id: mid,
        pcachetime: + new Date()
    });

  // return jsonp(url, data);
}

export function createLyricArr (lyric) {
    let arr = [];
    lyric.split(/\n/).map(item => {
        let time = item.split(']')[0].replace('[', '');
        let v = {
            str : time,
            time: (Number(time.split(':')[1]) || 0) + (Number(time.split(':')[0]) || 0) * 60,
            text: item.split(']')[1] || ''
        };
        if (v.time && v.text) {
            arr.push(v);
        }
    });
    console.log(arr);
    return arr;
}

export function showLyric (lyricArr, time) {
    let timeArr = lyricArr.map(item => item.time);

    let index = 0;

    if (time < timeArr[0]) return 0;

    for(let i=0; i<timeArr.length; i++) {
        if (timeArr[i] < time && timeArr[i+1] && timeArr[i+1] > time) {
            index = i;
            break;
        } 
        if (!timeArr[i+1]) {
            index = i;
            break;
        }
    }

    return index;
}
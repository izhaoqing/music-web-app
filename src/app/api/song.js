import {commonParams} from './config';
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
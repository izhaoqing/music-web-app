import jsonp from '../config/jsonp';
import axios from 'axios';
import {commonParams, options} from './config'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  });

  return jsonp(url, data, options)
}

//获取歌单
export function getDiscList() {
    const url = 'http://ustbhuangyi.com/music/api/getDiscList'

    const data = Object.assign({
        g_tk: 1928093487,
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        format: 'json',
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: 0.17759368475702543
    }, commonParams, {});
    return jsonp(url, data, options);
}

//获取banner
export function getBanner() {
    const url ='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=828893882&uin=569135939&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1516844007775';
    const data = Object.assign({}, commonParams, {});
    return jsonp(url, data, options);
}

export function getSongList(disstid) {

  const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&new_format=1&pic=500&disstid=2646688496&type=1&json=1&utf8=1&onlysong=0&picmid=1&nosign=1&song_begin=0&song_num=15&_=1517500314985';
  const data = Object.assign({}, commonParams, {

  });

  return jsonp(url, data, options);

  // return axios.get(url, {
  //     params: data
  // }).then((res) => {
  //     return Promise.resolve(res.data)
  // });

  //return jsonp(url, data, options)
}
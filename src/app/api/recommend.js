import jsonp from '../config/jsonp';
import 'whatwg-fetch';
import {commonParams, options} from './config'
import $ from 'jquery';
import param from '../config/jsonp';

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

export function getSongList(disstid, cb) {
    // let url = 'localhost:4000';
    // const data = Object.assign({}, commonParams, {
    //     disstid,
    //     type: 1,
    //     json: 1,
    //     utf8: 1,
    //     onlysong: 0,
    //     platform: 'yqq',
    //     hostUin: 0,
    //     needNewCode: 0,
    //     url: 'http://ustbhuangyi.com/music/api/getCdInfo'
    // });
    // $.ajax({
    //     url: "http://localhost:4000/?disstid=" + disstid,
    //     type:"get",
    //     dataType:"jsonp",
    //     jsonp:"callback",
    //     //传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
    //     jsonpCallback:"success_jsonpCallback",
    //     //自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
    //     success : function(res){
    //         cb(res);
    //     }
    // });
    let url = "http://localhost:4000";
    return jsonp(url, {disstid});
}

export function getRecomentList() {
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const str = {
        "comm": {
            "ct": 24
        },
        "category": {
            "method": "get_hot_category",
            "param": {
                "qq": ""
            },
            "module": "music.web_category_svr"
        },
        "recomPlaylist": {
            "method": "get_hot_recommend",
            "param": {
                "async": 1,
                "cmd": 2
            },
            "module": "playlist.HotRecommendServer"
        },
        "playlist": {
            "method": "get_playlist_by_category",
            "param": {
                "id": 8,
                "curPage": 1,
                "size": 40,
                "order": 5,
                "titleid": 8
            },
            "module": "playlist.PlayListPlazaServer"
        },
        "new_song": {
            "module": "QQMusic.MusichallServer",
            "method": "GetNewSong",
            "param": {
                "type": 0
            }
        },
        "new_album": {
            "module": "music.web_album_library",
            "method": "get_album_by_tags",
            "param": {
                "area": 7,
                "company": -1,
                "genre": -1,
                "type": -1,
                "year": -1,
                "sort": 2,
                "get_tags": 1,
                "sin": 0,
                "num": 40,
                "click_albumid": 0
            }
        },
        "toplist": {
            "module": "music.web_toplist_svr",
            "method": "get_toplist_index",
            "param": {}
        },
        "focus": {
            "module": "QQMusic.MusichallServer",
            "method": "GetFocus",
            "param": {}
        }
    };
    const data = Object.assign({
        callback: 'recom939023486738535',
        g_tk: 543931786,
        jsonpCallback: 'recom939023486738535',
        loginUin: 569135939,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0,
        data: JSON.stringify(str)
    }, commonParams, {});
    return jsonp(url, data, {});
}
import axios from 'axios';

let guid = _getGuid();

export default function getSongUrl (mid) {
    let url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
    const data = {
        g_tk:569135939,
        jsonpCallback:'MusicJsonCallback39355320624659207',
        loginUin:0,
        hostUin:0,
        format:'json',
        inCharset: 'utf8',
        outCharset:'utf-8',
        notice:0,
        platform: 'yqq',
        needNewCode:0,
        cid:205361747,
        callback:'MusicJsonCallback39355320624659207',
        uin: 0,
        songmid: mid,
        filename: mid+'.m4a',
        guid: guid
    };

    return axios.get(url, {
        params: data
    }).then((res) => {
        let vkey = res.data.items[0].vkey;
        res.url = 'http://dl.stream.qqmusic.qq.com/C400000Wk6NP4NaAPo.m4a?vkey='+vkey+'&guid='+guid+'&uin=0&fromtag=66';
        return Promise.resolve(res);
    })
}

function _getGuid() {
    // if (_guid.length > 0)
    //     return _guid;
    // var e = MUSIC.cookie.get("pgv_pvid");
    // if (e && e.length > 0)
    //     return _guid = e;
    var t = (new Date).getUTCMilliseconds();
    return _guid = Math.round(2147483647 * Math.random()) * t % 1e10;
    // document.cookie = "pgv_pvid=" + _guid + "; Expires=Sun, 18 Jan 2038 00:00:00 GMT; PATH=/; DOMAIN=qq.com;",
    // _guid
}

let guid = _getGuid();
export default function getOptions (musicId, cb) {
    $.ajax({
        url: 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=0&jsonpCallback=MusicJsonCallback39355320624659207&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&callback=MusicJsonCallback39355320624659207&uin=0&songmid='+ musicId +'&filename=C400'+ musicId +'.m4a&guid='+guid,
        dataType: 'jsonp',
        scriptCharset: 'GBK',
        success: function (res) {
            console.log(res);
            let vkey = res.data.items[0].vkey;
            cb && cb(playMusic(vkey, musicId));
        },
        error: function (res) {
            console.log(res);
            cb && cb('');
        }
    });
}

function playMusic (vkey, id) {
    return 'http://dl.stream.qqmusic.qq.com/C400'+id+'.m4a?vkey='+vkey+'&guid='+guid+'&uin=0&fromtag=66';
}

function _getGuid() {
    let t = (new Date).getUTCMilliseconds();
    return Math.round(2147483647 * Math.random()) * t % 1e10;
}
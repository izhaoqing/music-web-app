const http = require("http");

const server = http.createServer((req,res)=>{

    //从url中获取数据
    const getData = str => req.url.split('&').map(item => {
        return (new RegExp(str)).test(item) ? item.split('=')[1] || '' : ''
    }).join('');

    const type = getData('type');
    const id = getData('id');
    const callback = getData('callback');

    console.log(req.url);

    const url = type === 'recommend' ? "http://ustbhuangyi.com/music/api/getCdInfo?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&disstid=" + id + "&type=1&json=1&utf8=1&onlysong=0&platform=yqq&hostUin=0&needNewCode=0"
        : type === 'lyric' ? 'http://ustbhuangyi.com/music/api/lyric?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=json&songmid=' + id + '&platform=yqq&hostUin=0&needNewCode=0&categoryId=10000000'
            : '';

    console.log(url);

    http.get(url, data => {
        let str="";
        data.on("data",chunk => {
            str += chunk;
        });
        data.on("end",() => {
            res.writeHead(200, {"content-type":"text/plain"});
            res.write("callback=" + callback + "(" + str + ")");
            res.end();
        })
    })
});

server.listen(4000,() => {
    console.log("http server is listening in port 4000");
});
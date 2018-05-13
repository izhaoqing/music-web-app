/*
* 封装滚动加载插件调用，配置相应参数
* 参数：传入容器，滚动元素，回调函数
* */
import Slideload from '../../static/js/slider';

function sliderFn (parentNode, scrollNode, loadCb, refreshCb, hasData=true) {

    // console.log('1')
    console.log(parentNode);

    let slideLoad = new Slideload(parentNode,{
        scrollCont: scrollNode,
        refreshDOM:{
            "pull2refresh":'<p class="refresh-tip">↓ 下拉刷新</p>',
            "release2refresh":'<p class="refresh-tip">↑ 释放刷新</p>',
            "loading":'<div id="infinite-loading" class="infinite-loading">正在刷新...</div>',
            "refreshSuccess":'<p class="refresh-tip">√ 刷新成功</p>'
        },
        loadMoreDOM:{
            "pull2load":'<p class="refresh-tip">↑ 上拉加载更多</p>',
            "loading":'<div id="infinite-loading" class="infinite-loading">正在加载...</div>',
            "loadSuccess":'<p class="refresh-tip">√ 加载成功</p>'
        }
    });

    //注册滚动加载事件
    slideLoad.on('load',function(next,stop){
        //通过ajax获取数据，渲染DOM
        if(hasData){
            loadCb && loadCb();
            next();//如果还有数据，调用next();
        }else{
            stop();//如果没有数据，调用stop();
        }
    });

    //注册下拉刷新事件
    slideLoad.on('refresh',function(next){
        //通过ajax获取数据，渲染DOM
        refreshCb && refreshCb();
        next();//下拉刷新渲染完DOM必须调用next();
    });
}

export default sliderFn;
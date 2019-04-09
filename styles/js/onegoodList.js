$(function () {
  //单击搜索按钮实现搜索功能
$('.mui-icon-search').on('tap',function () {
  mui('.mui-off-canvas-wrap').offCanvas('show');
})

  

var data={
  cid: getParam(location.search).cid,
  pagenum:1,
  pagesize:10
}
  function render(callback,obj) {
    console.log(data);
    $.ajax({
      type:'get',
      url: 'goods/search',
      data:$.extend(data,obj),
      dataType:'json',
      success:function (res) {
       callback(res)
        // var html=template('goodsTemp',res.data);
        // // console.log(html);
        // $('.content ul').html(html);
      }
    })
  }
  function getParam(url) {
    var obj={};
    url=url.substring(1);
    var arr=url.split('&');
    for(var i=0;i<arr.length;i++){
      var temp=arr[i].split('=');
      console.log(temp)
      obj[temp[0]]=temp[1];
      console.log(temp);
    }
    return obj;
  }
  //下拉刷新实现
  mui.init({
    swipeBack: false,
    pullRefresh: {
      container: "#refreshContainer", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down: {
        height: 50, //可选,默认50.触发下拉刷新拖动距离,
        auto: true, //可选,默认false.首次加载自动下拉刷新一次
        contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
        contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
        contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
        callback: function () {
             data.pagenum=1;
            render(function (res) {
              var html = template('goodsTemp', res.data);
               $('.content ul').html(html);
               mui('#refreshContainer').pullRefresh().endPulldownToRefresh();
               mui('#refreshContainer').pullRefresh().refresh(true);
            })
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      },
      ////上拉加载实现
      up: {
        height: 50, //可选.默认50.触发上拉加载拖动距离
        auto: false, //可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: function () {
         data.pagenum++;
         render(function (res) {
           if(res.data.goods.length>0){
              var html = template('goodsTemp', res.data);
             $('.content ul').append(html);
              mui('#refreshContainer').pullRefresh().endPullupToRefresh();
           }else{
              mui('#refreshContainer').pullRefresh().endPullupToRefresh(true);
           }
         })
        } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
      }
    }
  });
  
})
$(function () {
     mui('body').on('tap', 'a', function (e) {
       e.preventDefault()
       window.top.location.href = this.href;
     });
  //写入入口函数
  const baseURl = ' http://157.122.54.189:9094/api/public/v1/'; //定义一个基本接口地址，就是每个接口都重复的地址
  $.ajaxSettings.beforeSend=function (xhr,obj) {//在ajax启动前进行对ajax的监听检测
    console.log(obj);//输出ajax请求中的obj
    obj.url=baseURl+obj.url;//进行地址拼接
  }
  $.ajaxSettings.complete=function () {//在ajax完成之后又要干的事
    console.log(456);
  }
})
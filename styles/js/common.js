$(function () {
     mui('body').on('tap', 'a', function (e) {
       e.preventDefault()
       window.top.location.href = this.href;
     });
  //写入入口函数
  const baseURl = ' http://140.143.222.79:8899/api/public/v1/'; //定义一个基本接口地址，就是每个接口都重复的地址
  $.ajaxSettings.beforeSend=function (xhr,obj) {//在ajax启动前进行对ajax的监听检测
    // console.log(obj);//输出ajax请求中的obj
    obj.url=baseURl+obj.url;//进行地址拼接
    if(obj.url.indexOf('/my/')!=-1){//判断路径是否是私有路径
      xhr.setRequestHeader('Authorization',sessionStorage.getItem('pyg_token'));//访问私有路径时把这个token值传递过来
    }
  }
  $.ajaxSettings.complete=function () {//在ajax完成之后又要干的事
    // console.log(456);
  }
  //动态扩展zepto中的成员
  $.extend($,{
     getParam(url) {
       var obj = {};
       url = url.substring(1);
       var arr = url.split('&');
       for (var i = 0; i < arr.length; i++) {
         var temp = arr[i].split('=');
         console.log(temp)
         obj[temp[0]] = temp[1];
         console.log(temp);
       }
       return obj;
     }
  })
})
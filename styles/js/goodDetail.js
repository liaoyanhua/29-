$(function () {
  // console.log(location.search);
  //滚动区域初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  //轮播图初始化
 
var goods_id=location.search.substring(10);

// console.log(goods_id);
var info={
  cat_id:'',
  goods_id:'',
  goods_name:'',
  goods_number:'',
  goods_price:'',
  goods_small_log:'',
  goods_weight:''
}

   $.ajax({
     type:'get',
     url: 'goods/detail',
     data:{goods_id:goods_id},
     dataType:'json',
     success:function (res) {
      info.cat_id=res.data.cat_id;
      info.goods_id=res.data.goods_id;
      info.goods_name=res.data.goods_name;
      info.goods_number=res.data.goods_number;
      info.goods_price=res.data.goods_price;
      info.goods_small_log=res.data.goods_small_log;
      info.goods_weight=res.data.goods_weight;
       var html1=template('bannerTemp',res.data);
       $('.bannerlist').html(html1);
       var html2=template('indiTemp',res.data);
       $('.indilist').html(html2);
       var gallery = mui('.mui-slider');
       gallery.slider({
         interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；
       });
       var html3=template('textTemp',res.data);
       $('.goodsdesc').html(html3);
       var html4=template('shopdesc',res.data);
      //  console.log(html4);
       $('#item1').html(html4);
       var html5 = template('attrTemp',res.data);
       $('#item2').html(html5);
     } 
   })
   $('.btn-addCart').on('tap',function () {
     /*1,先判断是否有token，如果没有，则重定向到登录页面
       2，如果有，用sessionStorage来存储，且发送ajax请求
       3，接收返回来的结果，并且判断token值是否有效，如果无效，则重定向到登录页面，
       4，如果有效则弹出提示：添加成功，是否查看购物车
     */
   
    var mytoken=sessionStorage.getItem('pyg_token');
    if(!mytoken){
       console.log(123)
      location.href = './login.html?redirectUrl=' + location.href;
    }else{
         $.ajax({
           type: 'post',
           url: 'my/cart/add',
           data: info,
           dataType: 'json',
           success: function (res) {
             console.log(res);
             if(res.meta.status==401){
               location.href='./login.html?redirectUrl='+location.href;
             }else{
               console.log('ok');  
               mui.confirm('添加成功，是否查看购物车？','温馨提示',['跳转','取消'],function (e) {
                 if(e.index==0){
                   location.href='cart.html';
                 }else{
                   
                 }
               })
             }
           }
         })
    }
   })
})
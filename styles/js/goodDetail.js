$(function () {
  // console.log(location.search);
  //滚动区域初始化
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
  //轮播图初始化
 
var goods_id=location.search.substring(10);

console.log(goods_id);
render();
 function render() {
   $.ajax({
     type:'get',
     url: 'goods/detail',
     data:{goods_id:goods_id},
     dataType:'json',
     success:function (res) {
       console.log(res.data);
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
       console.log(html4);
       $('#item1').html(html4);
       var html5 = template('attrTemp',res.data);
       $('#item2').html(html5);
     }
   })
 }
})
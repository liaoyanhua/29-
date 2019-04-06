$(function () {
   banner();
   goodsList();
   categories();
  //图片以及小圆点轮播渲染
  function banner() {
    $.ajax({
      type:'get',
      url: 'home/swiperdata',
      dataType:'json',
      success:function (res) {
        // console.log(res);
       if(res.meta.status==200){
         var html=template('bantemp',res);
         $('.ban').html(html);
         var indicator = template('indicate',res)
         $('.indicator').html(indicator);
         var gallery = mui('.mui-slider');
         gallery.slider({
           interval: 2000 //自动轮播周期，若为0则不自动播放，默认为0；
         });
       }
      }
    })
  }
  //商品列表渲染
  function goodsList() {
    $.ajax({
      type:'get',
      url: 'home/goodslist',
      dataType:'json',
      success:function (res) {
        console.log(res);
        if(res.meta.status==200){
          var html1 = template('goodsList',res);
          $('.goodList').html(html1);
        }
      }
    })
  }
  //获取分类数据
  function categories() {
    $.ajax({
      type:'get',
      url: 'categories',
      dataType:'json',
      success:function (res) {
        console.log(res);
      }
    })
  }

  
})
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
  function login(urls) {
    var mytoken = sessionStorage.getItem('pyg_token');
    if (!mytoken) {
      console.log(123);
      location.href = './views/login.html?redirectUrl=' + location.href;
    } else {
      $.ajax({
        type: 'get',
        url: 'my/cart/all',
        dataType: 'json',
        success: function (res) {
          console.log(res);
          if (res.meta.status == 401) {
            location.href = './views/login.html?redirectUrl=' + location.href;
          } else {
            console.log('ok');
            location.href = `./views/${urls}.html`;
          }
        }
      })
    }
  }
  // $('.cart').on('tap',function () {
  //    login('cart');
  // })
  // $('.my').on('tap',function () {
  //   login('user');
  // })

})
$(function () {
  console.log(123);
  
  //获取购物车数据并渲染到页面
  $.ajax({
    type:'get',
    url: 'my/cart/all',
    dataType:'json',
    success:function (res) {
      console.log(res);
      
      // console.log(res.data.cart_info);
     var result= JSON.parse(res.data.cart_info);
     console.log({list: result});
     var html = template('order', { list: result});
    //  console.log(html)
      $('.orderlist').html(html);
      mui('.pyg_userNum').numbox();//数据动态生成后对添加盒子进行初始化，不然添加按钮无效，点不动
      mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
      });
      calprice();

    }
  })
  $('.pygedit').on('tap',function () {
    $('body').toggleClass('buttonToggle');
    if($(this).text()=='编辑'){
      $(this).text('完成')
    }else{
      $(this).text('编辑');
    }
  })
    function calprice() {
      var total=0;
      var allorders=$('.orderone');
      allorders.each(function (index,value) {
        console.log(value);
        var price = $(value).data('order').goods_price;
        var num=$(value).find('#test').val();
        total=total+(price*num);
      })
      $('.priceP>span:nth-of-type(2)').text('￥'+total);
    }
    //单击修改数量重新计算价格
    $('.orderlist').on('tap', '.pyg_userNum .mui-btn',function () {
      calprice();
    })
})
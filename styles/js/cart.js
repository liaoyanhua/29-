$(function () {
  //获取购物车数据并渲染到页面
  function init() {
    $.ajax({
      type: 'get',
      url: 'my/cart/all',
      dataType: 'json',
      success: function (res) {
        // console.log(res);
             if(res.meta.status!=200){
               location.href='./login.html';
               return false;
             }
        // console.log(res.data.cart_info);
        var result = JSON.parse(res.data.cart_info);
        console.log({list: result});
        var html = template('order', {list: result});
        //  console.log(html)
        $('.orderlist').html(html);
        mui('.pyg_userNum').numbox(); //数据动态生成后对添加盒子进行初始化，不然添加按钮无效，点不动
        mui('.mui-scroll-wrapper').scroll({
          deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
        calprice(); //在上面的数据渲染完成后调用计算总价函数实现总价的计算
      }
    })
  }
  init();
  
  //给编辑按钮绑定一个单击事件
  $('.pygedit').on('tap',function () {
    $('body').toggleClass('buttonToggle');
    if($(this).text()=='编辑'){
      $(this).text('完成')
    }else{
      $(this).text('编辑');
      sync($('.orderone'));
    }
  })
  var total = 0;
  //封装计算总价格函数
    function calprice() {
      
      var allorders=$('.orderone');
      allorders.each(function (index,value) {
        // console.log(value);
        var price = $(value).data('order').goods_price;
        var num=$(value).find('#test').val();
        total=total+(price*num);
      })
      $('.priceP>span:nth-of-type(2)').text('￥'+total);
    }
    //单击修改数量重新计算总价格
    $('.orderlist').on('tap', '.pyg_userNum .mui-btn',function () {
      calprice();
    })
    //同步购物车,封装一个同步购物车函数，传入一个参数（需要同步的商品列表，即需要传给后台的同步列表）
    function sync(allList) {
      var list={};
      for(var i=0;i<allList.length;i++){
        var data=$(allList[i]).data('order');
        data.amount = $(allList[i]).find('#test').val();
        list[data.goods_id]=data;
      }
      $.ajax({
        type:'post',
        url: 'my/cart/sync',
        data:{'infos':JSON.stringify(list)},
        dataType:'json',
        success:function (res) {
          // console.log(res);
        }
      })
    }
    //单击删除按钮实现购物车的同步更新
    $('.pygdel').on('tap',function () {//给删除按钮绑定一个单击事件，
      // console.log(123);
      var list=$('.orderlist').find('[type="checkbox"]').not(':checked').parents('.orderone');//找到没有选到的商品列表
      sync(list);//然后同步
      init();//最后在更新一次
    })
    //使用组件进行地址选择
    $('.btnAddress').on('tap',function () {//给地址绑定一个点击事件
      console.log(123);//测试是否触发
      var cityPicker=new mui.PopPicker({layer:3});//设置省市三级级联
      cityPicker.setData(cityData3);//引入city数据
      cityPicker.show(function (items) {//显示省市区选+择结构
        // console.log(items);//打印出选择结果
        $('.address').text(`${items[0].text}-${items[1].text}-${items[2].text}`);//然后在赋值
       
      });
      
    })
    //单击生成订单按钮，跳转订单页面
    $('.orderAdd').on('tap',function () {
      // console.log(123);
      var obj={
        "order_price":total,
       "consignee_addr":$('.address').text(),
        goods:[]
      }
      var allorders=$('.orderone');
      allorders.each(function (index, value) {
        var goodlist={};
        var temp=$(value).data('order');
        goodlist.goods_id=temp.goods_id;
        goodlist.goods_number=temp.amount;
        goodlist.goods_price=temp.goods_price;
        console.log(goodlist);
        // console.log(obj.goods);
        obj.goods.push(goodlist)
      })
      
      console.log(obj);
      $.ajax({
        type:'post',
        url: 'my/orders/create',
        data:obj,
        dataType:'json',
        success:function (res) {
          console.log(res);//获取到订单数据
          // var address;
          // res.data[address] = `${ $('.address')}`;
          console.log(res.data);//打印出订单里的数据
          var string = JSON.stringify(res.data)//将它转成字符串
          console.log(string);//并打印输出这个字符串
          localStorage.setItem('pygorder',string);//讲这个数据存储起来
          location.href='./order.html';//实现页面跳转
        }
      })
    })

})
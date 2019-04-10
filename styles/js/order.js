$(function () {
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  });
 
 $.ajax({
   type:'get',
   url: 'my/orders/all',
   data:{type:1},
   dataType:'json',
   success:function (res) {
    //  console.log(res);
     var html=template('item1Temp',res);
     $('#item1').html(html);
   }
 })
  var data = JSON.parse(localStorage.getItem('pygorder'));
  // console.log(data);
  console.log(data);
  var html1 = template('itemtwo', data);
  console.log(html1);
  $('#item2').html(html1);
  var html2=template('itemthree',data)
  $('#item3').html(html2);
  
})
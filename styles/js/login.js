$(function () {
$('.mui-btn-primary').on('tap',function () {
  
  /*1，获取用户数据
  2，验证数据
  3，发起ajax请求
   */
  //收集用户数据
  var obj={
    username:'',
    password:'',
  }
  obj.username = $('.mui-input-row').find('input[type="text"]').val();
  obj.password = $('.mui-input-row').find('input[type="password"]').val();
  // console.log(obj);
  //将获取到的用户数据进行验证
  if(!/^1[3-9]\d{9}$/.test(obj.username)){
    mui.toast('手机输入格式不正确');
    return false;
  }  
  if(obj.password.length<6){
    mui.toast('密码输入小于6位请重新输入');
    return false;
  }
  //发起ajax请求
  $.ajax({
    type:'post',
    url: 'login',
    data:obj,
    dataType:'json',
    success:function (res) {
      console.log(res);
      if(res.meta.status==200){
        //登录成功将获取到token值进行本地存储，
        sessionStorage.setItem('pyg_token',res.data.token);
        console.log(typeof (res.data.token));
        //进行页面跳转，跳回用户之前所在的页面，
        var re = location.search.substring(13);
        console.log(re);
        if(!re){
         location.href='../index.html'
        }else{
 location.href = re;
        }
        
      }else{
        mui.toast(res.meta.msg)
      }
    }
  })
 
}) 
$('.btnregister').on('tap', function () {
  console.log(123);
  location.href = "./register.html";
})
})
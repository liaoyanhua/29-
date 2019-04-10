$(function () {
      //验证手机号并且获取验证码
     var mobile, email,code,pwd,pwd2;
      var reg = /^1[3-9]\d{9}$/
      $('.getreg').on('tap', function () {
          mobile = $('[name="mobile"]').val();
        console.log(mobile,'-----------------------')
        if (!reg.test(mobile)) {
          mui.toast('手机号输入格式不正确');
          return false;
        } else {
          $.ajax({
            type: 'post',
            url: 'users/get_reg_code',
            data: {
              mobile: mobile
            },
            dataType: 'json',
            success: function (res) {
              console.log(res);
              if (res.meta.status == 200) {
                $('[name="code"]').val(res.data);
              } else {
                mui.toast(res.msg);
              }
            }
          })
        }
      })
      console.log(123);
      //获取与验证邮箱

    
      var emreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      $('[name="email"]').on('blur', function () {
           email = $('[name="email"]').val();
        if (!emreg.test(email)) {
          mui.toast('邮箱格式不正确');
          return false;
        }
      })
      //获取与验证密码
      
      
      $('[name="pwd"]').on('blur', function () {
         pwd = $('[name="pwd"]').val();
        if (pwd.length < 6) {
          mui.toast('密码输入小于6位');
          return false;
        }
      })
      $('[name="pwd2"]').on('blur', function () {
         pwd2 = $('[name="pwd2"]').val();
        if (pwd2 != pwd) {
          mui.toast('两次输入密码不一致');
          return false;
        }
      })
      //注册按钮
      $('.btntrue').on('tap', function () {
        if (!reg.test(mobile)) {
          mui.toast('手机号输入格式不正确');
          return false;
        } else if (!emreg.test(email)) {
          mui.toast('邮箱格式不正确');
          return false;
        } else if (pwd.length < 6) {
          mui.toast('密码输入小于6位');
          return false;
        } else if (pwd2 !== pwd) {
          mui.toast('两次输入密码不一致');
          return false;
        } else {
          $.ajax({
              type: 'post',
              url: 'users/reg',
              data: $('form').serialize(),
              dataType: 'json',
              success: function (res) {
                console.log(res);
                if (res.meta.status == 200) {
                  mui.confirm('注册成功，是否去登录？', '温馨提示', ['确定', '取消'], function (e) {
                      if (e.index == 0) {
                        location.href = './login.html';
                      } else {

                      }
                    })
                  }
                }
                })
            }
        console.log($('form').serialize());



      })
    })
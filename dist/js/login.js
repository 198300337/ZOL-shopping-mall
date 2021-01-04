// 登录接口

//  接口地址：http://jx.xuzhixiang.top/ap/api/login.php
//  接口请求方式：get
//  接口参数：
//       username用户名
//       password密码
//  使用方式
//       http://jx.xuzhixiang.top/ap/api/login.php?username=11&password=1212

//  服务器返回json数据
window.onload = function() {
    let username = document.querySelector('.username').Value;
    let password = document.querySelector('.password').Value;
    let params = { username, password };
    let url = 'http://jx.xuzhixiang.top/ap/api/login.php';
    let btn = document.querySelector('.btn')
    btn.onclick = function() {
        axios.get(url, { params }).then(res => {
            if (res.data.code === 1) {
                alert(res.data.msg);
                localStorage.setItem('uid', res.data.data.id);
                localStorage.setItem('token', res.data.data.token);
                location.href = '../index.html';
            } else {
                alert(res.data.mag);
            }
        })
    }

}
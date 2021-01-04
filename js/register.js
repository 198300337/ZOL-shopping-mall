// 注册接口

// 接口地址：http://jx.xuzhixiang.top/ap/api/reg.php
// 接口请求方式：get
// 接口参数：
//      username用户名
//      password密码
// 使用方式
//      http://jx.xuzhixiang.top/ap/api/reg.php?username=11&password=1212

// 服务器返回json数据
window.onload = function() {
    let btn = document.querySelector(".btn");

    btn.onclick = function() {
        let username = document.querySelector(".username").value;
        let password = document.querySelector(".password").value;
        let p1 = document.querySelector('.p1p').value;
        let params = { username, password };
        let url = 'http://jx.xuzhixiang.top/ap/api/reg.php';
        axios.get(url, { params }).then(res => {
            if (password === p1) {
                if (res.data.code === 1) {
                    alert(res.data.msg);
                    location.href = '../html/login.html';
                } else {
                    alert(res.data.msg)
                }
            } else {
                alert("确认密码错误")
            }
        })
    }
}
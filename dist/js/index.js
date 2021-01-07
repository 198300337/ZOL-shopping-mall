window.onload = function() {
    $(function() {
        $('.nav .nav-right .number').hover(function() {
            $('.number .number-bottom').css({ 'display': 'block', 'z-index': '5' })
        }, function() {
            $('.nav .number .number-bottom').css('display', 'none')
        });
    })
    $(function() {

            $('.content ul').hover(function() {
                $('.content ul .abs').css({ 'display': 'block' })
            }, function() {
                $('.content ul .abs').css({ 'display': 'none' })
            })
        }),
        $(function() {
            $('.hot input[type=button]').click(function() {
                alert('跳转列表页')
                $(location).attr('href', '../html/list.html')
            })
        })
    aaa();
    aaaa();

    function aaaa() {
        if (localStorage.getItem('zj')) {
            document.querySelector('.shopping span').innerText = localStorage.getItem('zj')
        }
        let uname = localStorage.getItem("uid")
        if (uname) {
            document.querySelector('.loginBar .r').remove();
            document.querySelector('.content .vip').remove();
            $(".loginBar .lr").html(`尊贵的用户欢迎登陆，${uname}<button>注销</button>`);
            $(".content .vip").html(`尊贵的用户欢迎登陆，${uname}`);
            let btnaa = document.querySelector('button');
            btnaa.onclick = function() {
                localStorage.clear()
                location.reload()
            }
        }
    }
    // 登录接口

    //  接口地址：http://jx.xuzhixiang.top/ap/api/login.php
    //  接口请求方式：get
    //  接口参数：
    //       username用户名
    //       password密码
    //  使用方式
    //       http://jx.xuzhixiang.top/ap/api/login.php?username=11&password=1212

    //  服务器返回json数据
    function aaa() {
        let username = document.querySelector('#username').Value;
        let password = document.querySelector('#password').Value;
        let params = { username, password };
        let url = 'http://jx.xuzhixiang.top/ap/api/login.php';
        let btn = document.querySelector('#btn')
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
    $(function() {
        let flag = true;
        $(window).scroll(function() {
            if (flag) {
                let st = $(this).scrollTop();
                if (st > 400) {
                    $("#stairs").fadeIn();
                } else {
                    $("#stairs").fadeOut();
                }
                $(".louti").each(function() {
                    if (st >= $(this).offset().top - $(this).outerHeight() / 2) {
                        let index = $(this).index();
                        // console.log(index)
                        $("#stairs ul li").eq(index).addClass(".hover").siblings().removeClass(
                            ".hover");
                    }
                })
                console.log($('.louti'))
            }
        });
        $("#stairs li:not(:last)").click(function() {
            flag = false;
            let index = $(this).index();
            $("body,html").stop().animate({
                "scrollTop": $(".louti").eq(index).offset().top
            }, 1000, function() {
                flag = true;
            });

            $(this).addClass("hver").siblings().removeClass("hover");


        })

        $("#stairs li:last").click(function() {
            flag = false;
            $("body,html").stop().animate({
                "scrollTop": 0
            }, 1000, function() {
                flag = true;
            });

            $("#stairs").fadeOut();

        })


    })
};
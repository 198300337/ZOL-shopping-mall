window.onload = function() {
    $(function() {
        $('.nav .nav-right .number').hover(function() {
            $('.number .number-bottom').css({ 'display': 'block', 'z-index': '5' })
        }, function() {
            $('.nav .number .number-bottom').css('display', 'none')
        });
    })

    details()
        // shopopingmall()

    // function shopopingmall() {
    //     let btn = document.querySelector('button');
    //     btn.onclick = async function() {
    //         let obj = new URLSearchParams(location.search);
    //         let pid = obj.get('pid');
    //         let uid = localStorage.getItem('uid');

    //         let pnum = document.querySelector('.inpu').value;
    //         let url = 'http://jx.xuzhixiang.top/ap/api/add-product.php';
    //         let params = { pid, uid, pnum };
    //         try {
    //             let { data } = await axios.get(url, { params });
    //             alert(data.msg)
    //         } catch (error) {
    //             alert('请求数据失败')
    //         }
    //     }
    // }
    // 接口地址： http: //jx.xuzhixiang.top/ap/api/detail.php
    //     接口请求方式： get
    // 接口参数：
    // id 商品的id
    // 使用方式
    // 获取id为1的商品的详情
    // http: //jx.xuzhixiang.top/ap/api/detail.php?id=1
    //     服务器返回json数据
    function details() {
        let obj = new URLSearchParams(location.search);
        let id = obj.get('pid');
        let url = 'http://jx.xuzhixiang.top/ap/api/detail.php';
        let params = { id };
        axios.get(url, { params }).then(res => {
            let v = res.data.data;
            let arr = `
                <img src="${v.pimg}" alt="">
            <p class="pdesc">${v.pdesc}</p>
            <div class="ppice"><span>价格:</span>${v.pprice}</div>
            <div class="counts"><span>数量:</span>
            <a href="javascript:;" class="subtract" data-pid='${v.pid}'>-</a><input type="text" class="inpu" value="1" readonly>
            <a href="javascript:;" class="plus" data-pid='${v.pid}'>+</a>
        </div>
        <button>加入购物车</button>
                `
            document.querySelector('.par').innerHTML = arr;
            addandsubtract()

        })
    }

    function addandsubtract() {
        // 接口地址： http: //jx.xuzhixiang.top/ap/api/add-product.php
        //     接口请求方式： get
        // 接口参数：
        // uid 用户id
        // pid 商品id
        // pnum 要添加的商品数量

        // 使用方式

        // http: //jx.xuzhixiang.top/ap/api/add-product.php?uid=1&pid=1&pnum=1
        //     服务器返回json数据
        let sub = document.querySelector('.subtract');
        let plus = document.querySelector('.plus');
        let url = 'http://jx.xuzhixiang.top/ap/api/add-product.php';
        let uid = localStorage.getItem('uid');
        let pn = document.querySelector('.par inpu');
        // let params = { uid, pid, pum };
        let btn = document.querySelector('button');


        plus.onclick = function() {
            let pnum = (plus.parentNode.querySelector('.inpu').value) ++;
            let pid = plus.getAttribute('data-pid');


        }

        sub.onclick = function() {
            let pnum = (sub.parentNode.querySelector('.inpu').value) --;
            if ((sub.parentNode.querySelector('.inpu').value) < 1) {
                sub.parentNode.querySelector('.inpu').value = 1
            }
            let pid = plus.getAttribute('data-pid');


        }
        let obj = new URLSearchParams(location.search);
        let pid = obj.get('pid');
        var pnum = document.querySelector('.inpu').value;
        if ((document.querySelector('.inpu').value) < 1) {
            document.querySelector('.inpu').value = 1;
        }
        let params = { uid, pid, pnum };

        btn.onclick = function() {
            axios.get(url, { params }).then(res => {
                alert(res.data.msg)
            });
        }


    }


}
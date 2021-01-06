// 接口地址：  http://jx.xuzhixiang.top/ap/api/goods/goods-add.php
//      接口请求方式：post
//      接口参数：
//     1. 
// pimg
//     2. 
// pname
//     3. 
// pprice
//     4. 
// pdesc
//     5. 
// uid  （可选）用户商品
//      使用方式  post 请求，参数在请求体
//      服务器返回json数据
window.onload = function() {

    goods();

    exhibiton();



    function goods() {
        let btn = document.querySelector('.goods button');
        btn.onclick = function() {
            let oInput = document.querySelectorAll(".goods input");
            let pname = oInput[0].value;
            let pprice = oInput[1].value;
            let pdesc = oInput[2].value;
            let pimg = oInput[3].value;
            let uid = localStorage.getItem("uid");
            let token = localStorage.getItem("token");
            let url = 'http://jx.xuzhixiang.top/ap/api/goods/goods-add.php';

            let params = { pname, pprice, pdesc, pimg, uid };
            axios.get(url, { params }).then(res => {
                if (res.data.code === 1) {
                    alert(res.data.msg);
                    location.reload();
                } else(
                    alert(res.data.msg)
                )
            })
        }

    }

    // 所有商品接口
    // get
    // 参数
    // pagesize 每页获取几个数据
    // pagenum 获取第几页数据
    // uid 用户id
    // http: //jx.xuzhixiang.top/ap/api/allproductlist.php?pagesize=20&pagenum=4

    async function exhibiton() {

        let url = 'http://jx.xuzhixiang.top/ap/api/allproductlist.php';
        let uid = localStorage.getItem("uid");
        // console.log(uid);
        let token = localStorage.getItem("token")
        let pagesize = 20;
        let pagenum = 0;
        let params = { pagesize, pagenum, uid };
        try {
            let { data } = await axios.get(url, { params })
            let v = data.data;
            console.log(v)
            for (let i = 0; i < v.length; i++) {
                let arr = `
                    <div class="list"><div data-pid='${v[i].pid}' class="del-btn">×
                    </div>
                    <a href="../html/particulars .html?pid=${v[i].pid}"><img src="${v[i].pimg}" alt="">
                <span>${v[i].pname}</span>
                <p>${v[i].pdesc}</p>
                <strong>￥${v[i].pprice}</strong>
                </a>
                </div>
                    `
                document.querySelector('.exhibition').innerHTML += arr;
                // deletethegoods()
            }
        } catch (error) {
            alert('数据请求失败');
        }
        deletethegoods()
    }
    // 接口地址： http: //jx.xuzhixiang.top/ap/api/goods/goods-delete.php
    //     接口请求方式： get
    // 接口参数：
    // pid（ 必选） 商品的id
    // uid（ 必选） 用户的id
    // token（ 必选） 登陆时候返回的token

    // 使用方式


    // http: //jx.xuzhixiang.top/ap/api/goods/goods-delete.php?pid=2459

    //     服务器返回json数据 ``
    function deletethegoods() {
        let btna = document.querySelectorAll('.del-btn');
        for (let i = 0; i < btna.length; i++) {
            btna[i].onclick = function(e) {
                var evt = e || window.event;
                var target = evt.target || evt.srcElement;
                if (e.target.classList.contains('del-btn')) {
                    let url = 'http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php';
                    let pid = evt.target.getAttribute('data-pid');
                    let uid = localStorage.getItem('uid');
                    let token = localStorage.getItem('token');
                    let params = { pid, uid, token };
                    axios.get(url, { params }).then(res => {
                        alert(res.data.msg)
                        location.reload();
                    })
                } else {
                    alert('请求失败')
                }
            }
        }
    }
}
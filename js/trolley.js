// 接口地址： http: //jx.xuzhixiang.top/ap/api/cart-list.php
//     接口请求方式： get
// 接口参数：
// id 用户id
// 使用方式
// 获取id为1的用户的购物车
// http: //jx.xuzhixiang.top/ap/api/cart-list.php?id=1


//     服务器返回json数据
window.onload = function() {
    shoppingcart()

    function shoppingcart() {
        let id = localStorage.getItem('uid');
        let url = 'http://jx.xuzhixiang.top/ap/api/cart-list.php';
        let params = { id };
        axios.get(url, { params }).then(res => {
            let v = res.data.data;
            console.log(v);
            let st = document.querySelector('.articlea');
            let pidid = "";
            let aja = 0;
            for (let i = 0; i < v.length; i++) {
                let a = v[i].pnum;
                let b = parseInt(v[i].pprice);
                let dj = a * b;
                // let aas = {...dj };
                // console.log(aas)
                aja += Number(v[i].pnum)
                console.log(v[i].pnum)
                let arr = `
                <div class="list" data-pid='${v[i].pid}'>
                <input type="checkbox" class='one' data-id='${v[i].pid}'>
                    <img src="${v[i].pimg}" alt="">
                    <span class="pdesc">${v[i].pdesc}</span>
                    <span class="pprice ppp">${v[i].pprice}</span>
                    <span class="jj"><a href="javascript:;" class="subtract" data-id='${v[i].pid}' >-</a><input type="text" class="inpu" value="${v[i].pnum}" readonly><a href="javascript:;" class="plus" data-id='${v[i].pid}'>+</a></span>
                    <span class="dzj">${dj}</span>
                    <button data-pid='${v[i].pid}'>删除</button>
                </div>`
                st.innerHTML += arr;
                deletethegoods();
                pidid++;
            }
            console.log(aja)
            localStorage.setItem("zj", aja)
                // console.log(arr);
                // 全选 
            let kall = document.querySelector('.checkall')
            let onea = document.querySelectorAll('.list .one')
            console.log(kall)

            kall.onchange = function() {
                    onea.forEach(onea => onea.checked = this.checked)
                    calculate()
                }
                //单选
            onea.forEach(oneaa => {
                    //
                    oneaa.onchange = function() {
                        // 判断 所有的 singleSels 状态 

                        // 全部都是选中，all才是选中
                        // 反之 all是非选中

                        //singleSels 伪数组 
                        // let arr = Array.from(singleSels)
                        let arr = [...onea]
                        console.log(arr);
                        console.log(onea);
                        let allFlag = arr.every(ipt => ipt.checked === true)
                        kall.checked = allFlag

                        calculate()
                    }
                })
                // 接口地址： http: //jx.xuzhixiang.top/ap/api/cart-update-num.php
                //     接口请求方式： get
                // 接口参数：
                // uid 用户id
                // pid 商品id
                // pnum 要添加的商品数量

            // 使用方式

            // http: //jx.xuzhixiang.top/ap/api/cart-update-num.php?uid=1&pid=1&pnum=1

            //     服务器返回json数据
            let uid = localStorage.getItem('uid')
            let plus = document.querySelectorAll('.plus');
            let sub = document.querySelectorAll('.subtract');
            plus.forEach(v => {
                v.onclick = function() {
                    let pum = v.parentNode.querySelector('.inpu');
                    let pnum = parseInt(pum.value) + 1;
                    let pid = v.getAttribute('data-id')
                    let url = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php';
                    let params = { uid, pid, pnum };
                    axios.get(url, { params }).then(res => {
                        console.log(res.data)
                        location.reload()
                    })
                }
            })
            sub.forEach(btn => {
                btn.onclick = function() {
                    let pum = btn.parentNode.querySelector('.inpu');
                    let pnum = parseInt(pum.value) - 1;
                    if (pnum === 0) {
                        return;
                    }
                    let pid = btn.getAttribute('data-id')
                    let url = 'http://jx.xuzhixiang.top/ap/api/cart-update-num.php';
                    let params = { uid, pid, pnum };
                    axios.get(url, { params }).then(res => {
                        console.log(res.data)
                        location.reload()
                    })
                }
            })
        })
    }

    function deletethegoods() {
        // 接口地址： http: //jx.xuzhixiang.top/ap/api/cart-delete.php
        //     接口请求方式： get
        // 接口参数：
        // uid 用户id
        // pid 商品id
        // 使用方式
        // 删除用户1中的 id为1商品
        // http: //jx.xuzhixiang.top/ap/api/cart-delete.php?uid=1&pid=1
        //     服务器返回json数据
        let btna = document.querySelectorAll('button');
        for (let i = 0; i < btna.length; i++) {
            btna[i].onclick = function() {
                let pid = btna[i].getAttribute('data-pid');
                console.log(pid)
                let uid = localStorage.getItem('uid');
                let url = 'http://jx.xuzhixiang.top/ap/api/cart-delete.php';
                let params = { uid, pid };
                axios.get(url, { params }).then(res => {
                    alert(res.data.msg);
                    location.reload();
                })
            }
        }
        let btnb = document.querySelector('.cleft');
        btnb.onclick = function() {
            let uid = localStorage.getItem('uid');
            let url = 'http://jx.xuzhixiang.top/ap/api/cart-delete.php';
            let pi = $(this).parent().parent().siblings('.articlea').children();
            console.log(pi);
            pi.each(function(i, v) {
                let pid = v.getAttribute('data-pid')
                    // console.log(pid)
                let params = { uid, pid };
                axios.get(url, { params }).then(res => {
                    location.reload();
                })
            })
            alert("删除成功")

        }
    }
    //商品计算


    function calculate() {
        let singleSels = document.querySelectorAll('.one');
        let singleSelArr = [...singleSels];

        //获取被选中的框
        let singleSeledArr = singleSelArr.filter(v => v.checked == true)
        console.log(singleSeledArr);
        let sum = 0;
        let price = 0;
        singleSeledArr.forEach(v => {
            //计算商品总数
            sum += parseInt(v.parentNode.querySelector('.inpu').value)
            console.log(parseInt(v.parentNode.querySelector('.inpu').value))
            console.log

            //计算商品总价
            // console.log(parseInt(v.parentNode.children.querySelector('.ppp')))
            price += parseInt(v.parentNode.querySelector('.inpu').value) *
                parseInt((v.parentNode.querySelector(".pprice").innerText))
        })
        console.log(price)
        document.querySelector('.close .price .zj').innerText = price;
        document.querySelector('.close .price #pidid').innerText = sum;
    }
}
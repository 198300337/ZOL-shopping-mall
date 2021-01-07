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
            // let arra = `<img src="${v.pimg}">`;
            //     <div id="bigArea">

            // </div>
            let arr = `
                <img src="${v.pimg}" alt="" id='aad'>
                
            <p class="pdesc">${v.pdesc}</p>
            <div class="ppice"><span>价格:</span>${v.pprice}</div>
            <div class="counts"><span>数量:</span>
            <input type="number" class='va' value='1'>
        </div>
        <button>加入购物车</button>
                `
            document.querySelector('.par').innerHTML = arr;
            addandsubtract()
                // document.querySelector('.par #bigArea').innerHTML = arra;

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

        // let params = { uid, pid, pum };
        let btn = document.querySelector('button');
        document.querySelector(".va").onchange = function() {
            console.log(this.value);
            if (this.value <= 0) {
                this.value = 1
            }
        }
        try {
            btn.onclick = function() {
                let obj = new URLSearchParams(location.search);
                let pid = obj.get('pid');
                var pnum = document.querySelector('.va').value;
                let params = { uid, pid, pnum };
                axios.get(url, { params }).then(res => {
                    alert(res.data.msg)
                    location.href = '../html/trolley.html'
                });
            }
        } catch (error) {
            alert('请求失败')
        }
        // plus.onclick = function() {
        //     let pnum = (plus.parentNode.querySelector('.inpu').value) ++;
        //     let pid = plus.getAttribute('data-pid');

        //     // var pnum = document.querySelector('.inpu').value;
        //     try {

        //         btn.onclick = function() {
        //             let obj = new URLSearchParams(location.search);
        //             let pid = obj.get('pid');
        //             let params = { uid, pid, pnum };
        //             var pnum = document.querySelector('.inpu').value;
        //             axios.get(url, { params }).then(res => {
        //                 alert(res.data.msg)
        //                 location.href = '../html/trolley.html'
        //             });
        //         }
        //     } catch (error) {
        //         alert('请求失败')
        //     }
        // }

        // sub.onclick = function() {
        //     let pnum = (sub.parentNode.querySelector('.inpu').value) --;
        //     let pid = plus.getAttribute('data-pid');
        //     if ((sub.parentNode.querySelector('.inpu').value) < 1) {
        //         sub.parentNode.querySelector('.inpu').value = 1
        //     }
        //     
        // }
    }

    // class Zoom {
    //     constructor() {
    //         this.zoomBox = document.getElementById("aad");
    //         this.midArea = document.getElementById("add");
    //         this.midImg = this.midArea.children[0];
    //         this.zoom = document.getElementById("zoom");
    //         this.bigArea = document.getElementById("bigArea");
    //         this.bigImg = this.bigArea.children[0];
    //         this.smallArea = document.getElementById("smallArea");
    //         this.smallImg = this.smallArea.children;
    //         this.init();
    //     }
    //     init() {
    //         this.midArea.onmouseover = () => {
    //             this.zoom.style.display = "block";
    //             this.bigArea.style.display = "block";
    //         }
    //         this.midArea.onmouseout = () => {
    //             this.zoom.style.display = "none";
    //             this.bigArea.style.display = "none";
    //         }
    //         this.midArea.onmousemove = (e) => {
    //             let evt = e || window.event;
    //             let x = evt.pageX - this.zoomBox.offsetLeft - this.zoom.offsetWidth / 2;
    //             let y = evt.pageY - this.zoomBox.offsetTop - this.zoom.offsetHeight / 2;

    //             let mx = this.midArea.offsetWidth - this.zoom.offsetWidth;
    //             let my = this.midArea.offsetHeight - this.zoom.offsetHeight;

    //             x = x <= 0 ? 0 : x >= mx ? mx : x;
    //             y = y <= 0 ? 0 : y >= my ? my : y;



    //             this.zoom.style.left = x + "px";
    //             this.zoom.style.top = y + "px";

    //             //大图移动
    //             this.bigImg.style.left = -this.zoom.offsetLeft * (this.bigImg.offsetWidth / this.midArea.offsetWidth) + "px";
    //             this.bigImg.style.top = -this.zoom.offsetTop * (this.bigImg.offsetHeight / this.midArea.offsetHeight) + "px";

    //         }

    //         for (let i = 0; i < this.smallImg.length; i++) {
    //             this.smallImg[i].onclick = () => {
    //                 this.midImg.src = this.smallImg[i].src;
    //                 this.bigImg.src = this.smallImg[i].src;
    //             }
    //         }

    //     }
    // }


}
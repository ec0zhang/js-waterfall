window.onload = function () {
    waterfall("big","ele");
    var dataInt = {"data":[{"src":'1.png'},{"src":'2.png'},{"src":'3.png'},{"src":'6.png'},{"src":'7.png'},{"src":'8.png'},{"src":'9.png'},{"src":'10.png'},{"src":'11.png'},{"src":'13.png'},{"src":'12.png'},{"src":'13.png'},{"src":'14.png'},{"src":'15.png'},{"src":'16.png'},{"src":'17.png'},{"src":'18.png'},{"src":'20.png'},{"src":'4.png'},{"src":'5.png'},{"src":'21.png'},{"src":'22.png'}]}
    window.onscroll = function () {
        if (checkScroll()){
            var myPCls = document.getElementById("big");
            for (var i=0;i<dataInt.data.length;i++){
                var oele1 = document.createElement('div');
                oele1.className = 'ele';
                myPCls.appendChild(oele1);
                var opic = document.createElement('pic');
                opic.className = 'pic';
                oele1.appendChild(opic);
                var oimg = document.createElement('img');
                oimg.src="pic/"+ dataInt.data[i].src;
                opic.appendChild(oimg);
            }
            waterfall('big','ele');
        }
    }
}


function waterfall(parent,box) {
//取出所有元素
    var myPCls = document.getElementById(parent);
    var all = getClass(myPCls,box);
    //计算给出浏览器一个固定的列数
    var oneW = all[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oneW);
    //该函数的意思是获取浏览器当前文档部分的宽度。不包含滚动条
    //实际列数并不固定，因为最大的盒子的宽度会随着浏览器窗口的大小的改变而变化
    //所以接下来设置父盒子的W
    myPCls.style.cssText = "width:"+ oneW*cols +"px";
    var myArr = [];
    for (var i=0;i<all.length;i++){
        if (i<cols){
            myArr.push(all[i].offsetHeight);
        }
        else{
            var minH = Math.min.apply(null,myArr);
            var Loc = getMinL(myArr,minH);//获取最小值的位置

            all[i].style.position = "absolute";
            all[i].style.top =  minH + "px";
            all[i].style.left = oneW * Loc + "px";
            //all[i].style.left = myArr[Loc].offsetLeft +"px";
            //为什么不行
            myArr[Loc] += all[i].offsetHeight;
        }
    }
}
function getClass(parent,cls) {
    var boxArr = new Array();
    var oelements = parent.getElementsByTagName('*');
    for (var i=0;i<oelements.length;i++){
        if (oelements[i].className === cls){
            boxArr.push(oelements[i]);
        }
    }
    return boxArr;
}
function getMinL(arr,val) {
    for(var i in arr){
        if (arr[i] == val){
            return i;
        }
    }
}
function checkScroll() {
    var myPCls = document.getElementById("big");
    var oele = getClass(myPCls,"ele");
    var lastH = oele[oele.length-1].offsetTop + oele[oele.length-1].offsetHeight/2;
    var scrolled = document.body.scrollTop || document.documentElement.scrollTop;
    var win = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastH < (scrolled+win))?true:false;
}
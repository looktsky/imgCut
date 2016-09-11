/* 
 * @Author: anchen
 * @Date:   2016-06-02 13:24:03
 * @Last Modified by:   61720
 * @Last Modified time: 2016-09-09 20:51:27
 */

$(document).ready(function() {
    var c = document.getElementById("myCan");
    var ctx = c.getContext("2d");
    var img = $("#demoImg")[0];
    // 预览文件
    $("#file").change(function () {
        var file = $("#imgFile")[0].files[0];
        var reader = new FileReader();
        reader.onload =function(e){
            $("#demoImg").attr("src",e.target.result);
        };
        reader.readAsDataURL(file);

    });
    // 选择框拖拽
    move();
    function move() {
        var chose = $("#chose");
        var i = false;
        var x = 100;
        var y = 100;
        var oldX;
        var oldY;
        if(document.attachEvent) {//ie的事件监听，拖拽div时禁止选中内容，firefox与chrome已在css中设置过-moz-user-select: none; -webkit-user-select: none;
            $("#chose")[0].attachEvent('onselectstart', function() {
                return false;
            });
        }
        chose.mousedown(function (e) {
            i = true;
            oldX = e.pageX;
            oldY = e.pageY;
            console.log("down",oldX,oldY);
            e.stopPropagation();
        });
        $(document).mouseup(function (e) {
            x = chose.position().left;
            y = chose.position().top;
            i = false;
        });
        chose.mousemove(function(e){
            if (i){
                var cssX = e.pageX  - oldX  + x ;
                var cssY = e.pageY  - oldY  + y ;
                if (cssX>=0 && cssX<=(300-chose.width()-4)){
                    chose.css("left",cssX+"px");
                }
                if (cssY>=0 && cssY<=(300-chose.height()-4)){
                    chose.css("top",cssY+"px");
                }
            };
            e.stopPropagation();
        });
    }
    scaleMove();
    function scaleMove() {
        var chose = $("#chose");
        var scale = $(".choseControl");
        var i = false;
        var x = 100;
        var y = 100;
        var oldX;
        var oldY;
        if(document.attachEvent) {
            $("#chose")[0].attachEvent('onselectstart', function() {
                return false;
            });
        }
        scale.mousedown(function (e) {
            i = true;
            oldX = e.pageX;
            oldY = e.pageY;
            e.stopPropagation();
        });
        $(document).mouseup(function (e) {
            i = false;
            x = chose.width();
            y = chose.height();
        });
        scale.mousemove(function(e){
            if (i){
                var last = Math.abs(e.pageX  - oldX)>=Math.abs(e.pageY  - oldY+x)?(e.pageX  - oldX):(e.pageY  - oldY+y);
                if (last>=0 && last<=300){
                    chose.css({"width":last+"px","height":last+"px"});
                }
            };
            e.stopPropagation();
        });
    }
    // 裁剪图片
    img.onload = function(){
       $("#cutImg").click(function(){
           var chose = $("#chose");
           var sX = chose.position().left;
           var sY = chose.position().top;
           var sWidth = chose.width();
           var sHeight = chose.height();
           ctx.drawImage(img,sX,sY,sWidth,sHeight,0,0,100,100);
       });
   };
    // 上传图片
    // $("#backImg").click(function () {
    //     var data = c.toDataURL();
    //     data = data.split(",")[1];
    //     data = window.atob(data);
    //     console.log(data);
    //     var ia = new Uint8Array(data.length);
    //     for(var i = 0 ; i < data.length; i++){
    //         ia[i] = data.charCodeAt(i);
    //     };
    //     var blob = new Blob([ia],{type:"image/png"});
    //     var fd = new FormData();
    //     fd.append("file",blob);
    //     console.log(fd);
        // $.ajax({
        //     url:"www.looktsky.com/img",
        //     type:"POST",
        //     data:fd,
        //     success:function (d) {
        //         $("#returnImg").attr("src","/img/"+JSON.parse(d))
        //     }
        // })
    // });
});
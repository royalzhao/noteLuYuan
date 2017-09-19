var appIndex = angular.module('appIndex', ['ngFlowGrid','ui.router','hc.marked', 'hljs', 'angular-markdown-editor']);

appIndex.directive('uploadImage1', function () {
    return {
    link:function(scope,elem) {
    
    elem.on("change", function () {
    var file
    = this.files[0];
    if
    (!/image\/\w+/.test(file.type)) {
    
    ;
    return
    false;
    //判断所选文件类型是否为图片
    }
    var
    reader = new FileReader();
    
    reader.readAsDataURL(file);
    
    reader.onload = function (e) {
    
    //result.innerHTML = ''
    
    elem.parent().css({
    
    'backgroundImage': 'url(' + this.result + ')',
    
    'backgroundSize': '100%'
    
    });
    
    elem.parent().next().show();
    //页面效果为初始化完成只有第一个显示，点击当前选择图片后，下一个显示
    
    scope.$apply();
    };
    
    scope.sendObj.append('file1', file);
    
    });
    }
    }
    
    });

appIndex.controller('writeYouji',function($scope){
    
    $scope.config={  
        //初始化编辑器内容  
        content : '<p>在此处编辑你的内容</p>',  
        //是否聚焦 focus默认为false  
        focus : true,  
        //首行缩进距离,默认是2em  
        indentValue:'2em',  
        //初始化编辑器宽度,默认1000  
        initialFrameWidth:1000,  
        //初始化编辑器高度,默认320  
        initialFrameHeight:320,  
        //编辑器初始化结束后,编辑区域是否是只读的，默认是false  
        readonly : false ,  
        //启用自动保存  
        enableAutoSave: false,  
        //自动保存间隔时间， 单位ms  
        saveInterval: 500,  
        //是否开启初始化时即全屏，默认关闭  
        fullscreen : false,  
        //图片操作的浮层开关，默认打开  
        imagePopup:true,       
        //提交到后台的数据是否包含整个html字符串  
        allHtmlEnabled:false,  
        //额外功能添加                 
        functions :['map','insertimage','insertvideo','attachment',  
        ,'insertcode','webapp','template',  
        'background','wordimage']       
        };  
        $scope.config2={  
            functions :['map']       
    };  
    $scope.getContent=function(id){  
       var content=$scope.ueditorGetContent(id);      
       alert(content);  
    }  
    
})


appIndex.controller('youjiLoader',function($rootScope,$scope,$http){
    
    $http({
        url: '/youjiList',
        method: 'post'
    }).then(function successCallBack(response) {
        $scope.items=response.data;
    }, function errorCallback(response) {
        console.log('网络错误')
    })

})
appIndex.controller('youjiContent',function($scope,$http,$stateParams){
    var id = $stateParams.id;
    //console.log(id)
    $http({
        url: '/youjiContent/'+id,
        method: 'GET'
    }).then(function successCallBack(response) {
        console.log(response.data[0].title)
        
        $scope.title = response.data[0].title;
        $scope.putDate = response.data[0].putDate;
        $scope.see = response.data[0].see;
        $scope.author = response.data[0].author;
        $scope.content = response.data[0].content;

        
    }, function errorCallback(response) {
        console.log('网络错误')
    })

})
//转义html
appIndex.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});
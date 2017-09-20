var appIndex = angular.module('appIndex', ['ui.router','hc.marked', 'hljs', 'angular-markdown-editor']);

appIndex.config(function ($stateProvider,$urlRouterProvider,markedProvider, hljsServiceProvider) {
	markedProvider.setOptions({
        gfm: true,
        tables: true,
        sanitize: true,
        highlight: function (code, lang) {
          if (lang) {
            return hljs.highlight(lang, code, true).value;
          } else {
            return hljs.highlightAuto(code).value;
          }
        }
	});
	hljsServiceProvider.setOptions({
	// replace tab with 4 spaces
	tabReplace: '    '
    });
    
    $urlRouterProvider.otherwise('/index/youji');
	$stateProvider
        .state('index', {
			url:'/index',
            templateUrl: 'template/indexTemplate.html',
            controller: 'appIndexController'
        })
        .state('mudidi', {
			url:'/mudidi',
            templateUrl: 'template/imgTemplate.html'
		})
        .state('login', {
			url:'/login',
            templateUrl: 'template/login.html'
		})
        .state('register', {
			url:'/register',
            templateUrl: 'template/register.html'
		})
        .state('setting', {
			url:'/setting',
            templateUrl: 'template/setting.html'
		})
        .state('setting.info', {
			url:'/info',
            templateUrl: 'template/info_setting.html'
		})
        .state('setting.pass', {
			url:'/pass',
            templateUrl: 'template/password_setting.html'
		})
        .state('index.youji', {
			url:'/youji',
            templateUrl: 'template/articleList.html',
            controller:'youjiLoader'
		})
        .state('index.img', {
			url:'/img',
            templateUrl: 'template/imgList.html',
            controller:'imgLoader'
		})
		.state('writeYouji', {
			url:'/writeYouji',
            templateUrl: 'template/writeYouji.html',
            controller:'writeYouji'
		})
		.state('articleContent', {
			url:'/articleContent',
            templateUrl: 'template/articleContent.html',
            controller:'articleContent'
		})
		.state('createImgs', {
			url:'/createImgs',
            templateUrl: 'template/createImgs.html',
            controller:'createImgs'
		})
	
})
appIndex.controller('appIndexController',['$rootScope','$scope','marked',function($rootScope,$scope,$http,marked){

	// 双向数据
	$scope.userdata={};
    $scope.loginSubmitForm = function(){
        console.log($scope.userdata);
        if($scope.loginForm.$invalid){
            alert('检查你的信息')
        }else{
            alert('提交成功')
        }
    }
	$scope.infoData={};
    $scope.infoSubmitForm = function(){
        console.log($scope.infoData);
        if($scope.infoForm.$invalid){
            alert('检查你的信息')
        }else{
            alert('保存成功')
        }
    }
	$scope.passdata={};
    $scope.infoSubmitForm = function(){
        console.log($scope.passdata);
        if($scope.infoForm.$invalid){
            alert('检查你的信息')
        }else{
            alert('保存成功')
        }
    }
    


}]);
appIndex.controller('writeYouji',function($rootScope,$scope,marked){
    // markdown
    $scope.editor1 = "在此处以markdown格式编辑文本";

    // normal flow, function call
    $scope.convertMarkdown = function() {
    vm.convertedMarkdown = marked(vm.markdown);
    }
    $scope.fullScreenPreview = function() {
        $rootScope.markdownEditorObjects.editor1.showPreview();
        $rootScope.markdownEditorObjects.editor1.setFullscreen(true);
    }
    $scope.onFullScreenCallback = function(e) {
        e.showPreview();
    }
    $scope.onFullScreenExitCallback = function(e) {
        e.hidePreview();
    }
})

appIndex.controller('createImgs',function($rootScope,$scope,$http){
    // 图片上传

	$scope.reader = new FileReader();   //创建一个FileReader接口
    $scope.form = {     //用于绑定提交内容，图片或其他数据
        image:{},
    };
    $scope.thumb = {};      //用于存放图片的base64
    $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
        1111:{}
    };

    $scope.img_upload = function(files) {       //单次提交图片的函数
        $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
        $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
        $scope.reader.onload = function(ev) {
            $scope.$apply(function(){
                $scope.thumb[$scope.guid] = {
                    imgSrc : ev.target.result,  //接收base64
                }
            });
        };
        
        var data = new FormData();      //以下为像后台提交图片数据
        data.append('image', files[0]);
		data.append('guid',$scope.guid);
		console.log(files[0])
		console.log($scope.guid)
		//console.log(data.image);
        // $http({
        //     method: 'post',
        //     url: '/comm/test-upload.php?action=success',
        //     data:data,
        //     headers: {'Content-Type': undefined},
        //     transformRequest: angular.identity
        // }).success(function(data) {
        //     if (data.result_code == 'SUCCESS') {
                // $scope.form.image[data.guid] = data.result_value;
                // $scope.thumb[data.guid].status = 'SUCCESS';
                // console.log($scope.form)
        //     }
        //     if(data.result_code == 'FAIL'){
        //         console.log(data)
        //     }
        // })
    };

    $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
        var guidArr = [];
        for(var p in $scope.thumb){
            guidArr.push(p);
        }
        delete $scope.thumb[guidArr[key]];
        delete $scope.form.image[guidArr[key]];
    };
    // $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
    //     $http({
    //         method: 'post',
    //         url: '/comm/test.php',
    //         data:$scope.form,
    //     }).success(function(data) {
    //         console.log(data);   
    //     })
    // };
 
 })

appIndex.controller('youjiLoader',function($rootScope,$scope,$http){

    $http({
        url: '/youjiShow',
        method: 'post'
    }).then(function successCallBack(response) {
        $scope.items=response.data;
    }, function errorCallback(response) {
        console.log('网络错误')
    })

})


appIndex.controller('imgLoader',function($scope,$http){
    $http({
        url: '/imgShow',
        method: 'post'
    }).then(function successCallBack(response) {
        $scope.items=response.data;
    }, function errorCallback(response) {
        console.log('网络错误')
    })


});
appIndex.directive('compare',function(){
    var o = {};
    o.strict = 'AE';
    o.scope = {
        orgText:'=compare'
    }
    o.require='ngModel';
    o.link = function(sco,ele,att,con){
        con.$validators.compare=function(v){
            return v == sco.orgText;
        }
        sco.$wacth('orgText',function(){
            con.$validate()
        })
    }
    return o;
})
appIndex.directive('ngFileSelect', [ '$parse', '$timeout', function($parse, $timeout) {
	return function(scope, elem, attr) {
		var fn = $parse(attr['ngFileSelect']);
		
		elem.bind('change', function(evt) {
			var files = [], fileList, i;
			fileList = evt.target.files;
			
			if (fileList != null) {
				for (i = 0; i < fileList.length; i++) {
					files.push(fileList.item(i));
				}
			}
			$timeout(function() {
				fn(scope, {
					$files : files,
					$event : evt
				});
			});
		});
	};
}])

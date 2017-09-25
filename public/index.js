var appIndex = angular.module('appIndex', ['ui.router','ng-layer','ui.bootstrap','ueditor.directive'],function($httpProvider){
    // Use x-www-form-urlencoded Content-Type
  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
  
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj) {
      var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        
      for(name in obj) {
        value = obj[name];
          
        if(value instanceof Array) {
          for(i=0; i<value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value instanceof Object) {
          for(subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        }
        else if(value !== undefined && value !== null)
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
        
      return query.length ? query.substr(0, query.length - 1) : query;
    };
  
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
      return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
});

appIndex.config(function ($stateProvider,$urlRouterProvider) {
	
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
            templateUrl: 'template/login.html',
            controller:'login'
		})
        .state('register', {
			url:'/register',
            templateUrl: 'template/register.html',
            controller:'register'
		})
        .state('setting', {
			url:'/setting',
            templateUrl: 'template/setting.html'
		})
        .state('setting.info', {
			url:'/info',
            templateUrl: 'template/info_setting.html',
            controller:'info_setting'
		})
        .state('setting.pass', {
			url:'/pass',
            templateUrl: 'template/password_setting.html',
            controller:'password_setting'
		})
        .state('index.youji', {
			url:'/youji',
            templateUrl: 'template/youjiList.html',
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
		.state('youjiContent', {
			url:'/youjiContent/:id',
            templateUrl: 'template/youjiContent.html',
            controller:'youjiContent'
		})
		.state('imgContent', {
			url:'/imgContent/:id',
            templateUrl: 'template/imgContent.html',
            controller:'imgContent'
		})
		.state('createImgs', {
			url:'/createImgs',
            templateUrl: 'template/createImgs.html',
            controller:'createImgs'
		})
	
})
appIndex.controller('appIndexController',function($scope,$http,$state){

	// 双向数据
	
	// $scope.passdata={};
    // $scope.infoSubmitForm = function(){
    //     console.log($scope.passdata);
    //     if($scope.infoForm.$invalid){
    //         alert('检查你的信息')
    //     }else{
    //         alert('保存成功')
    //     }
    // }
    $http({
        url: '/isUsername',
        method: 'get'
    }).then(function successCallBack(response) {
        if(response.data.username){
            $scope.username=response.data.username;
        }
        
    }, function errorCallback(response) {
        console.log('网络错误')
    })

    $scope.isUsername = function (number) {
        if (number) {
            return true
        } else {
            return false
        }
    }

    $scope.logout = function(){
        alert(1)
        $http({
            url: '/delUsername',
            method: 'get'
        }).then(function successCallBack(response) {
            if(response.data.message == 'ok'){
                $state.go('index.youji');
             }
        }, function errorCallback(response) {
            console.log('网络错误')
        })
    }
    
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

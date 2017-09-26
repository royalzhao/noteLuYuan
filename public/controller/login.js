
appIndex.controller('login',function($scope,$http,$location,$state,$window){
    $scope.userdata={};
    
    $scope.loginSubmitForm = function(){
        console.log($scope.userdata.username);
        
        $http({
            url: '/login',
            method: 'post',
            data:{
                username:$scope.userdata.username,
                password:$scope.userdata.password
            }
        }).then(function successCallBack(response) {
            if(response.data.message=='ok'){
                
                layer.alert('登录成功',{icon:1});
               // $state.go('index.youji',{},{reload:true});
                // $route.reload()
                $window.location.reload();
                
           }else{
                layer.alert('账号或密码不正确',{icon:2});
            }
        }, function errorCallback(response) {
            layer.alert('网络链接失败',{icon:6});
        })
    }
})
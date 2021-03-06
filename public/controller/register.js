
appIndex.controller('register',function($scope,$http,$location,$state){
    
	$scope.userdata={};
    $scope.registerSubmitForm = function(){
        //console.log($scope.userdata);
        $http({
            url: '/register',
            method: 'post',
            data:{
                username:$scope.userdata.username,
                password:$scope.userdata.password,
                email:$scope.userdata.email
            }
        }).then(function successCallBack(response) {
           if(response.data.message=='ok'){
                layer.alert('注册成功，请登录',{icon:1});
                $state.go('login');
           }else{
                layer.alert('注册失败',{icon:2});
            }
        }, function errorCallback(response) {
            layer.alert('网络链接失败',{icon:6});

            
        })
    }
    
})

appIndex.controller('info_setting',function($scope,$http,$location,$state){
    $scope.infoData={};
    $http({
        url: '/info_setting',
        method: 'get'
    }).then(function successCallBack(response) {
        $scope.infoData.infoName=response.data[0].spaceName;
        $scope.infoData.infoText=response.data[0].spaceInfo;
        console.log($scope.infoData)
        $scope.infoSubmitForm = function(){
            console.log($scope.infoData)
            $http({
                url: '/update_info_setting',
                method: 'post',
                data:$scope.infoData
            }).then(function successCallBack(response) {
               if(response.data.message=='ok'){
                    layer.alert('修改成功',{icon:1});
               }else{
                    layer.alert('修改失败',{icon:2});
                }
            }, function errorCallback(response) {
                layer.alert('网络链接失败',{icon:6});
            })
            
        }
    }, function errorCallback(response) {
        console.log('网络错误')
    })

})

appIndex.controller('password_setting',function($scope,$http,$location,$state){
    $scope.isExist = function(){
        $http({
            url: '/isExist',
            method: 'post',
            data:{
                oldPassword:$scope.passdata.oldPassword
            }
        }).then(function successCallBack(response) {
            if(response.data.message=='ok'){
                angular.element(document.querySelector('#exist')).css('display','block');
                angular.element(document.querySelector('#isExist')).css('display','none');
            }else{
                angular.element(document.querySelector('#exist')).css('display','none');
                angular.element(document.querySelector('#isExist')).css('display','block');
                angular.element(document.querySelector('#isExist')).html('原密码输入错误');
            }
        }, function errorCallback(response) {
            layer.alert('网络链接失败',{icon:6});
        })
    }

    $scope.passdata={};
    $scope.passSubmitForm = function(){
        console.log($scope.passdata)
        $http({
            url: '/update_password_setting',
            method: 'post',
            data:{
                password:$scope.passdata.password
            }
        }).then(function successCallBack(response) {
            if(response.data.message=='ok'){
                layer.alert('修改成功',{icon:1});
            }else{
                layer.alert('修改失败',{icon:2});
            }
        }, function errorCallback(response) {
            layer.alert('网络链接失败',{icon:6});
        })
        
    }
    
})
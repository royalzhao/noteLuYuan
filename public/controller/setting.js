
appIndex.controller('info_setting',function($scope,$http,$location,$state){
    $scope.infoData={};
    $http({
        url: '/info_setting',
        method: 'get'
    }).then(function successCallBack(response) {
        $scope.infoData.infoName=response.data[0].spaceName;
        $scope.infoData.infoText=response.data[0].spaceInfo;
        console.log($scope.infoData)
    }, function errorCallback(response) {
        console.log('网络错误')
    })
	
    $scope.infoForm = function(){
        // $http({
        //     url: '/update_info_setting',
        //     method: 'post',
        //     data:$scope.infoData
        // }).then(function successCallBack(response) {
        //    if(response.data.message=='ok'){
        //         layer.alert('修改成功',{icon:1});
        //    }else{
        //         layer.alert('修改失败',{icon:2});
        //     }
        // }, function errorCallback(response) {
        //     layer.alert('网络链接失败',{icon:6});
        // })
        alert(1)
    }
    
})
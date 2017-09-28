
appIndex.controller('imgContent',function($scope,$http,$stateParams){
    var id = $stateParams.id;
    //console.log(id)
    $scope.myInterval = '';
    $scope.noWrapSlides = false;
    $scope.active = 0;
    var slides = $scope.slides = [];
    
  
    slides.push({
        image: './img/img1.jpg',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: 0
      });
      slides.push({
        image: './img/img2.jpg',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: 1
      });
      slides.push({
        image: './img/img3.jpg',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: 2
      });
      slides.push({
        image: './img/img4.jpg',
        text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
        id: 3
      });
    
  
    $scope.randomize = function() {
      var indexes = generateIndexesArray();
      assignNewIndexesToSlides(indexes);
    };
  
    
  
    // Randomize logic below
  
    function assignNewIndexesToSlides(indexes) {
      for (var i = 0, l = slides.length; i < l; i++) {
        slides[i].id = indexes.pop();
      }
    }
  
    function generateIndexesArray() {
      var indexes = [];
      for (var i = 0; i < currIndex; ++i) {
        indexes[i] = i;
      }
      return shuffle(indexes);
    }
  
    // http://stackoverflow.com/questions/962802#962890
    function shuffle(array) {
      var tmp, current, top = array.length;
  
      if (top) {
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      }
  
      return array;
    }
    // $http({
    //     url: '/imgContent/'+id,
    //     method: 'GET'
    // }).then(function successCallBack(response) {
    //     console.log(response.data[0].title)
       
    //     $scope.myInterval = 2000;
    //     $scope.noWrapSlides = false;
    //     $scope.active = 0;
    //     var slides = $scope.slides = [];
    //     var addSlide = function () {
    //         slides.push({
    //             image: './img/img1.jpg',
    //             text: 'Image1',
    //             id: 0
    //         });
    //         slides.push({
    //             image: './img/img2.jpg',
    //             text: 'Image2',
    //             id: 1
    //         });
    //     };

    //     addSlide();

    //     $scope.title = response.data[0].title;
    //     $scope.putDate = response.data[0].putDate;
    //     $scope.see = response.data[0].see;
    //     $scope.author = response.data[0].author;
    //     $scope.content = response.data[0].content;

        
    // }, function errorCallback(response) {
    //     console.log('网络错误')
    // })

})


appIndex.controller('imgLoader',function($scope,$http){
    $http({
        url: '/imgList',
        method: 'post'
    }).then(function successCallBack(response) {
        $scope.items=response.data;
    }, function errorCallback(response) {
        console.log('网络错误')
    })


});


appIndex.controller('createImgs',function($rootScope,$scope,$http){
    $scope.dat = new Date();
    $scope.format = "yyyy/MM/dd";
    $scope.altInputFormats = ['yyyy/M!/d!'];

    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };


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
		$http({
            method: 'post',
            url: '/uploadImg',
            data:data,
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function successCallBack(response) {
            if (response.data.result_code == 'SUCCESS') {
                $scope.form.image[$scope.guid] = response.data.results[0].path;
                $scope.thumb[$scope.guid].status = 'SUCCESS';
                console.log($scope.form)
            }
            if(data.result_code == 'FAIL'){
                console.log(data)
            }
        }, function errorCallback(response) {
            console.log('网络错误')
        })
    };

    $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
        var guidArr = [];
        for(var p in $scope.thumb){
            guidArr.push(p);
        }
        delete $scope.thumb[guidArr[key]];
        delete $scope.form.image[guidArr[key]];
    };
    $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
        $http({
            method: 'post',
            url: '/insertImg',
            data:$scope.form,
        }).success(function(data) {
            console.log(data);   
        })
    };
 
 })

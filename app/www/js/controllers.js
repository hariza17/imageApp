angular.module('app.controllers', ['ngCordova', 'cloudinary', 'ngFileUpload'])


.controller('buscarCtrl', function ($scope) {

})

.controller('favoritosCtrl', function ($scope, $http) {


})

.controller('recientesCtrl', function ($scope) {

})

.controller('loginCtrl', function ($scope) {

})

.controller('peticiones', function ($scope, $http) {


})

.controller('buscarCtrl', ['$scope', '$cordovaCamera', '$http', '$cordovaFile', 'Upload',
            function ($scope, $cordovaCamera, $http, $cordovaFile, $upload) {

        $scope.takePhoto = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 300,
                targetHeight: 300,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: true
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    console.log(imageData);
                    var imgSIp = $scope.imgURI;
                    $upload.upload({
                        url: "https://api.cloudinary.com/v1_1/utb/upload",
                        fields: {
                            upload_preset: 'dkrplmzw',
                            tags: 'myphotoalbum',
                            context: 'photo=' + $scope.title
                        },
                        file: imgSIp
                    }).success(function (data, status, headers, config) {
                        console.log(data.url);
                        buscar(data.url);
                    });


                },
                function (err) {
                    console.log("Error2:" + err);
                });



        }

        $scope.choosePhoto = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 350,
                targetHeight: 700,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                var imgSIp = $scope.imgURI;
                $upload.upload({
                    url: "https://api.cloudinary.com/v1_1/utb/upload",
                    fields: {
                        upload_preset: 'dkrplmzw',
                        tags: 'myphotoalbum',
                        context: 'photo=' + $scope.title
                    },
                    file: imgSIp
                }).success(function (data, status, headers, config) {
                    console.log(data.url);
                    buscar(data.url);
                });
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }

        var buscar = function (serveImg) {


        $scope.imgO = serveImg;
        var req = {
            method: 'GET',
            url: 'http://api.imagga.com/v1/tagging?url=' + serveImg + '&version=2',
            headers: {
                "authorization": "Basic YWNjX2FkMDg3MzBkMzU4ZmI5MTphNTgxNDdiN2ViZmU3NTk0NjMzYWU4ZTEzNWNhMTU2Mg==",
                "accept": "application/json"
            }

        }
    $http(req).then(function (data) {
            console.log(data.data.results[0]);
            $scope.confi = data.data.results[0].tags[0].confidence;
            $scope.tags = data.data.results[0].tags[0].tag;
            $scope.datos = data.data.results[0];
        }, function (data) {
            $scope.datos = data.data.results[0];
        });

    }


                }]);

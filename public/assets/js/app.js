var app = angular.module('chatApp',[]);
function sendRequest($http) {
  return $http.get('app/mockupData.json')
  .success(function(data) {
      return data;
  })
  .error(function(error) {
      return error;
  });
}
app.controller('chatCtrl', function($scope, $http) {
    sendRequest($http).success(function(data) {
      $scope.contacts = data.contacts;
      console.log($scope.contacts);
    });
});

app.controller('chatCtrl', function($scope, $http) {
    sendRequest($http).success(function(data) {
      $scope.contacts = data.contacts;
      $scope.currentChat = $scope.contacts[0];
    });
    $scope.openChat = function(id, element) {
      var index = -1;
      for( var i = 0; i < $scope.contacts.length; i++ ) {
  			if( $scope.contacts[i].id === id ) {
  				index = i;
  				break;
  			}
  		}
      $scope.currentChat = $scope.contacts[index];
    };
});
function sendRequest($http) {
  return $http.get('app/mockupData.json')
  .success(function(data) {
      return data;
  })
  .error(function(error) {
      return error;
  });
}

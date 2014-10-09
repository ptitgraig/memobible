angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $localstorage, $state) {

  // list of modals name for easy access
  $scope.modals = [];

  // Create the about modal that we will use later
  $ionicModal.fromTemplateUrl('templates/about.html', {
    scope: $scope,
    animation: 'slide-in-up',
    name : 'about'
  }).then(function(modal) {
    $scope.modals['about'] = modal;
  });

  // Create the parameters modal that we will use later
  $ionicModal.fromTemplateUrl('templates/params.html', {
    scope: $scope,
    animation: 'slide-in-up',
    name : 'params'
  }).then(function(modal) {
    $scope.modals['params'] = modal;
  });

  // Triggered modal to close it
  $scope.closeModal = function(name) {
    var closePrm = $scope.modals[name].hide();
  };

  // Open the modal
  $scope.openModal = function(name) {
    $scope.modals[name].show();
  };

  // show popup to confirm user data deletion
  $scope.showConfirmReset = function() {
   var confirmPopup = $ionicPopup.confirm({
     title: 'Attention',
     template: 'Cette op&eacute;ration effacera tout votre parcours. &Ecirc;tes-vous s&ucirc;r de continuer ?'
   });
   confirmPopup.then(function(res) {
     if(res) {
       $localstorage.setObject('verses', VERSES);
       $scope.closeModal('params');
       $state.go('app.home', {}, {reload : true});
     }
   });

 };

  $scope.$on('$destroy', function() {
    //$scope.modals.empty();
  });

})

.controller('HomeCtrl', function($scope, number) {
  $scope.numberOfKnownVerse = number;
  $scope.positive = $scope.numberOfKnownVerse > 0;
})

.controller('VersesCtrl', function($scope, verses) {
  $scope.verses = verses;
})

.controller('VerseCtrl', function($scope, verse, $localstorage, $state) {
  $scope.verse = verse;
  
  $scope.markAsKnown = function() {
    var verses = $localstorage.getObject('verses');
    verses.forEach(function(verse) {
      if (verse.id === $scope.verse.id) {
        verse.known = true;
        if (verse.count < 5) verse.count++;
        $localstorage.setObject('verses', verses);
        $state.go('app.verses');
      }
    });
  };

  $scope.markAsUnknown = function() {
    var verses = $localstorage.getObject('verses');
    verses.forEach(function(verse) {
      if (verse.id === $scope.verse.id) {
        verse.known = false;
        verse.count = 0;
        $localstorage.setObject('verses', verses);
        $state.go('app.verses');
      }
    });
  };

  $scope.range = function(n) {
    return new Array(n);
  }
})

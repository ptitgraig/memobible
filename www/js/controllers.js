angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $localstorage, $state) {

  // list of modals name for easy access
  $scope.modals = [];

  // get view mode from settings
  //$scope.settings = $localstorage.getObject('settings');
  

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

  /*$scope.toggleCardsMode = function() {
    console.info($scope.settings);
    $localstorage.setObject('settings', $scope.settings);
    //console.log($localstorage.getObject('settings').cardsMode);
  };*/

  /*$scope.changeView = function(viewid) {
    console.info($scope.settings);
    $state.go(viewid);
    //$state.go(viewid, );
  }*/

  $scope.$on('$destroy', function() {
    //$scope.modals.empty();
  });

})

.controller('ParamsCtrl', function($scope, $localstorage) {

  $scope.settings = $localstorage.getObject('settings');
  
  $scope.toggleCardsMode = function() {
    console.log($scope.settings);
    $localstorage.setObject('settings', $scope.settings);
  };
})

.controller('SideMenuCtrl', function($scope, $localstorage) {
  $scope.cardsMode = $localstorage.getObject('settings').cardsMode;
})

.controller('HomeCtrl', function($scope, number) {
  $scope.numberOfKnownVerse = number;
  $scope.positive = $scope.numberOfKnownVerse > 0;
})

.controller('VersesCtrl', function($scope, verses, cardsMode, $state) {
  $scope.verses = verses;
  $scope.cardsMode = cardsMode;
  console.info('VersesCtrl ', $scope.cardsMode);

  /*$scope.changeView = function(viewid) {
    //$state.transitionTo('app.cards');
    $state.go('app.cards', {}, {reload : true});
  }*/
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
  };

})

.controller('CardsCtrl', function($scope, verses, $state/*, $ionicSwipeCardDelegate*/) {
  $scope.verses = verses;
  $scope.changeView = function(viewid) {
    $state.go('app.verses', {}, {reload : true});
  }
  /*var cardTypes = [
    { title: 'Swipe down to clear the card', image: 'img/pic.png' },
    { title: 'Where is this?', image: 'img/pic.png' },
    { title: 'What kind of grass is this?', image: 'img/pic2.png' },
    { title: 'What beach is this?', image: 'img/pic3.png' },
    { title: 'What kind of clouds are these?', image: 'img/pic4.png' }
  ];

  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }*/
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate) {
  $scope.goAway = function() {
    var card = $ionicSwipeCardDelegate.getSwipebleCard($scope);
    card.swipe();
  };
});

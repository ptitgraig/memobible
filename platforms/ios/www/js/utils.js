angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    clear : function() {
      $window.localStorage.clear();
    }
  }
}])

// Store of verses locally
.service('VersesService', function($q, $localstorage) {
  return {
    getVerses : function() {
      return $localstorage.getObject('verses');
    },
    getVerse : function(verseId) {
      var dfd = $q.defer();
      $localstorage.getObject('verses').forEach(function(verse) {
        if (verse.id === verseId) dfd.resolve(verse)
      });
      return dfd.promise
    },
    getNumberOfKnownVerse : function() {
      var dfd = $q.defer();
      var counter = 0;
      $localstorage.getObject('verses').forEach(function(verse) {
        if (verse.count > 0) {
          counter++;
        }
      });
      dfd.resolve(counter)
      return dfd.promise
    }
  }
})
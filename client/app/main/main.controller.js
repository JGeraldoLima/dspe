'use strict';

(function () {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    getThing(id) {
      this.$http.get('/api/things/' + id).then(response => {
        return response.data;
      })
    }

    addThing() {

      //randomNumber

      var newThing = {
        name: '',
        info: ''
      };

      this.$http.post('/api/things', {
        name: newThing.name,
        info: newThing.info
      });
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
      this.awesomeThings = this.awesomeThings.filter(function (t) {
        return t._id !== thing._id;
      })
    }
  }

  angular.module('dspeApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();

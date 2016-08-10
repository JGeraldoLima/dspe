'use strict';

(function () {

  class MainController {

    constructor($http) {
      this.$http = $http;
      this.awesomeThings = [];
      this.insertCounter = 0;
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    sendRequest() {
      if(this.requestCode === 0){
        this.addThing();
      } else {
        this.getThing();
      }

    }

    //get random document from mongodc
    getThing() {
      this.$http.get('/api/things/1').then(response => {
        console.log(response.data); // change to a toast
        return response.data;
      })
    }

    //add random thing based on insertCount
    addThing() {
      this.$http.post('/api/things', {});
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

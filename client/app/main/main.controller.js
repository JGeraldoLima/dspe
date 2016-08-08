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
      var skip = Math.floor((Math.random() * 3598) + 1);
      this.$http.get('/api/things/' + skip).then(response => {
        console.log(response.data); // change to a toast
        return response.data;
      })
    }

    //add random thing based on insertCount
    addThing() {
      var newThing = {
        name: "Thing " + (this.insertCounter + 1),
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
        "sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " +
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris " +
        "nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in " +
        "reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. " +
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. " + (this.insertCounter + 1)
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

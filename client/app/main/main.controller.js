'use strict';

(function () {

  class MainController {

    constructor($http, toaster) {
      this.$http = $http;
      this.toaster = toaster;
      this.awesomeThings = [];
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
        });
    }

    showToast(type, title, text){
      this.toaster.pop(type, title, text);
    };

    sendRequest() {
      if(this.requestCode === 0){
        this.addThing();
      } else {
        this.getThing();
      }

    }

    getThing() {
      this.$http.get('/api/things/1').then(response => {
        var data = response.data;

        if(data){
          this.showToast('success', "Thing", "Thing returned successfully");
        } else {
          this.showToast('error', "Thing", "It occurred an internal error");
        }
        return data;
      })
    }

    addThing() {
      this.$http.post('/api/things', {}).then(response => {
        var type = 'error';
        if(response.status === 200 || response.status === 201){
          type = 'success'
        }

        this.showToast(type, "Thing", response.statusText);
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

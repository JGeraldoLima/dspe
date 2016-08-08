/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';


Thing.find({}).remove()
  .then(() => {

    var http = require('http');
    var options = {
      host: 'localhost',
      path: '/app/things.json',
      port: '9000',
      method: 'GET'
    };

    function callback(response) {
      var json = '';

      response.on('data', function (chunk) {
        json += chunk;
      });

      response.on('end', function () {
        var things = JSON.parse(json);
        things.forEach(function (thing) {
          Thing.create({name: thing.name, info: thing.info});
        });
      });
    }

    http.request(options, callback).end();
});
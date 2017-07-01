var assert = require('assert');
var add = require('../add');


describe('JavaScript Closure', function() {
  describe('first calling', function() {
    it('should return 2018 after calling the nextYear method for the first time', function() {
      assert.equal(2018, add.nextYear());
    });
  });

  describe('second calling', function() {
    it('should return 2019 after calling the nextYear method for the second time', function() {
      assert.equal(2019, add.nextYear());
    });
  });  
}); 
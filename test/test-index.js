var main = require("../");

exports["test main"] = function(assert) {
  assert.pass("Unit test running!");
};

exports["test main async"] = function(assert, done) {
  assert.pass("async Unit test running!");
  done();
};

exports["test toVia"] = function(assert) {
  var url = main.toVia("http://w3.org/DesignIssues/");
  assert.ok((url === "https://via.hypothes.is/http://w3.org/DesignIssues/"),
      "Do I start with via.hypothes.is?");
};

exports["test fromVia"] = function(assert) {
  var url = main.fromVia("https://via.hypothes.is/http://w3.org/DesignIssues/");
  assert.ok((url === "http://w3.org/DesignIssues/"),
      "via.hypothes.is should not be in this URL");

  var url = main.fromVia("http://w3.org/DesignIssues/");
  assert.ok((url === "http://w3.org/DesignIssues/"),
      "via.hypothes.is should not be in this URL");
};

require("sdk/test").run(exports);

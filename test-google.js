var viewports = require('./viewports'),
    pad = require('./pad'),
    now = new Date(),
    nowString = now.getFullYear() + 
                pad(now.getMonth() + 1) + 
                pad(now.getDate()) + '-' + 
                pad(now.getHours()) + 
                pad(now.getMinutes()) + 
                pad(now.getSeconds());

casper.test.begin('Screenshots', function suite(test) {
  casper.start('http://google.com/', function() {
    this.echo('Starting screenshots');
  });
  casper.each(viewports, function(casper, viewport) {
    this.then(function() {
      this.viewport(viewport.viewport.width, viewport.viewport.height);
    });
    this.thenOpen('http://google.com/', function() {
      this.wait(5000);
    });
    this.then(function() {
      var shot_name = 'shots/' + nowString + '/' + viewport.name + '-' + viewport.viewport.width + 'x' + viewport.viewport.height + '.png';
      this.echo('Shooting ' + shot_name);
      this.capture(shot_name, {
        top: 0,
        left: 0,
        width: viewport.viewport.width,
        height: viewport.viewport.height
      });
    });
  });

  casper.run(function() {
    test.done();
  });
});

// begin(String description, Number planned, Function suite)
casper.test.begin('Google search retrieves 10 or more results', 5, function suite(test) {
  // start(String url[, Function then])
  casper.start("http://www.google.com/", function() {

    // assertTitle(String expected[, String message])
    test.assertTitle("Google", "google homepage title is the one expected");
    
    // assertExists(String selector[, String message])
    test.assertExists('form[action="/search"]', "main form is found");


    // fill(String selector, Object values[, Boolean submit])
    this.fill('form[action="/search"]', { q: "casperjs" }, true);
  });

  // then(Function then)
  casper.then(function() {
    test.assertTitle("casperjs - Google Search", "google title is ok");

    // assertUrlMatch(Regexp pattern[, String message])
    test.assertUrlMatch(/q=casperjs/, "search term has been submitted");

    // assertEval(Function fn[, String message, Mixed arguments])
    test.assertEval(function() {
      return __utils__.findAll("h3.r").length >= 10;
    }, "google search for \"casperjs\" retrieves 10 or more results");
  });

  casper.run(function() {
    test.done();
  });
});

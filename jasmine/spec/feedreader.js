/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        //Check that the allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         //Loop through each feed and check that each object has a url
         it('has valid URLs', function() {
           for (let i=0; i<allFeeds.length; i++) {
             expect(allFeeds[i]).toBeDefined();
             expect(allFeeds[i].length).not.toBe(0);
             expect(allFeeds[i].url).toContain("http://");
           }
         });

         //Loop through each feed and check that each object has a name
         it('has valid name', function() {
           for (let i=0; i<allFeeds.length; i++) {
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
             expect(allFeeds[i].name).not.toBe(null);
             expect(allFeeds[i].name).not.toBe("");
           }
         });
    });

    describe('The Menu', function() {
       //Check that the menu is hidden by default
       let body = $('body');

       it("is hidden by default", function() {
         expect(body.hasClass("menu-hidden")).toBe(true);
       });

        //Check that the menu toggles between hidden and shown when clicked
        it("display toggles visibility", function() {
          let menuIcon = $('.menu-icon-link');
          menuIcon.click();
          expect(body.hasClass("menu-hidden")).toBe(false);
          menuIcon.click();
          expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       let container = $('.feed');

       beforeEach(function(done) {
         loadFeed(0);
         done();
       });

       it("Contains entry", function() {
         expect(container.length).not.toBe(0);
         //expect(container[0].firstElementChild.children[0].hasClass("entry"))
       });
     });

     /* TODO: Write a new test suite named "New Feed Selection" */
     describe('New Feed Selection', function() {
       /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        let container = $('.feed');
        let x;
        let y;
        beforeEach(function(done) {
          loadFeed(0, function() {
            x = container["0"].children["0"].innerText;
            loadFeed(1, function() {
              y = container["0"].children["0"].innerText;
              done();
            });
          });
        });

        it("Content Changes", function() {
          expect(x).not.toEqual(y);
        });
     });
}());

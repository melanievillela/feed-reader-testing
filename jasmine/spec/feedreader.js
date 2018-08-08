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

    describe('Initial Entries', function() {

       //Check that single .entry element in .feed container
       let container = $('.feed');

       beforeEach(function(done) {
         loadFeed(0);
         done();
       });

       it("Contains entry", function() {
         expect(container.children.length).not.toBe(0);
       });
     });

     describe('New Feed Selection', function() {

        //Check new feed is loaded and that content changes
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

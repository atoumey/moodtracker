// A simple mood tracker for Pebble Time that posts to a Google form

var UI = require('ui');
var ajax = require('ajax');

var moods = [
  "Shit",
  "Hangover bad",
  "Bad",
  "Fine",
  "Good",
  "Wonderful",
  "Euphoria"
];

function postToGoogle(moodRating) {
  ajax(
    {
      url: "https://docs.google.com/forms/d/abc123/formResponse", // replace with URL taken from form submit
      data: {"entry.36643600": moodRating }, // inspect form submit to get this POST parameter name
      method: "POST"
    },
    function (data, status, request) {
      //Success message
      console.log("successful post");
    },
    function() {
      //Success Message
      console.log("failure");
    }
  );
}

var menuItems = [];

// Add to menu items array
for (var ii = 0; ii < moods.length; ii++) {
  menuItems.push({
    title: moods[ii]
  });
}

// Construct Menu to show to user
var menu = new UI.Menu({
  sections: [{
    title: 'Rate your mood',
    items: menuItems
  }]
});

menu.selection(0, 3);

// Add an action for SELECT
menu.on('select', function(e) {
  console.log('Item number ' + e.itemIndex + ' was pressed!');
  postToGoogle(e.itemIndex);
  menu.hide();
});

// Show the Menu, hide the splash
menu.show();

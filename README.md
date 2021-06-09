Teaching assignment for WinC FED level 38

React Student Dashboard


  - setup basic structure:
    - App

Changelog:

- Initial setup:
  - created react-app student-dashboard-app
- Getting data from google spreadsheet, with [Tabletop](https://github.com/jsoma/tabletop)
  - ! npm install tabletop
  - Only works if spreadsheet is _Published to the web_ (*File* > *Publish to the web*) and then shared
    > just sharing the spreadsheet is not enough, it needs to be _Published_ as well
	
    > created own copy and published that, at least it gets pulled live from a remote source (instead of manually creating a .csv)
  - this.state.data gets set with {name: , excercise: , difficultyRating: , enjoymentRating: }
    > _postProcess: function (element) {
        element["name"] = element["Wie ben je?"];},_
	> this just creates extra properties instead of renaming them, remapped them through a temp cleanData Array
  - Initial method kept in components/StudentData.js for now

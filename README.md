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
  - this.state.data gets set with {student: , assignment: , difficultyRating: , enjoymentRating: }
    > _postProcess: function (element) {
        element["student"] = element["Wie ben je?"];},_
	> this just creates extra properties instead of renaming them, remapped them through a temp cleanData Array
  - Initial method kept in components/StudentData.js for now
- Created Chart.js that renders input to a graph, using the Victory charting components, for now just using test data
  - ! npm install victory
- Chart is only rendered when the loading of the data from the google spreadsheet is completed
- Created listSet of students and of assignments, on completion of getting the data from the google spreadsheet
- Chart now renders our data, ratings are averaged per assignment
- Added zoom to the chart
- Added fetching some random student info with addSudentInfo that fetches info from randomuser.me
- Added the basics for Routing through react-router-dom, only Home for now
- Added a Select element with react-select through which you can select students to filter the shown data with
  - Default state is all students are selected, you can deselect them by clicking the x next to their name, (or with keyboard BCKSPCE or DELETE)
  - Add students by picking them in the list
  - Remove all at once with the X on the right of the Select bar
- Added average linegraph, always showing the average ratings of all students
- Rounded the avg to 2 decimal places
- Really starting to implement routing
  > Created NavBar component that creates list with links to Home and all individual students
  > App.js has a Route to /students added in the <Switch> render
  > Students route has a <Route in itself based on the category/studentname behind it (that will need some content)

  > Student route (and 404/NoMatchPage) moved into separate components
  > Path to students page is /students/:studentName if another name is entered 404  will be shown
  > props are passed down to studentInfo page to deal with
- Keys added to NavBar
- Modified Chart a little bit with minimumzoom, average line graph in steps, fixed Y-axis
  > Parse the received info from https://randomuser.me/ (with the first name from the student data)
  > set a fake email with firstname.lastname@exampple.com (stripping out possible spaces in the last name (and first name while were at it))
  > - Somehow I think the students have not been entirely honest filling in their data ;)
  > Going to a student route triggers the chart to display that students data
  > Well, it was, until I removed it...
- Home is a separate component now

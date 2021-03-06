Teaching assignment for WinC FED level 38

React Student Dashboard

  Provides an overview of collected student feedback, accumulated in a google spreadsheet (retrieved through Tabletop)
  Data is presented in clear charts (generated through Victory) and tables.
  Per student pages provide individual student data, including (mock) bio data.


  - setup basic structure:
    - App
       - components
	     - Chart
		 - DataTable
	     - NavBar
		 - RatingToggle
		 - InputSelect
		 - NoMatchPage
       - views
	     - Home
		 - students/:studentName
		 - Table


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
- NavBar inline
- Created RatingsToggle to switch between showing both, or only difficulty or enjoyment ratings...
  > Chose to hide ratings by using dummy data with 0's , this way it is easier to keep the layout and scheme of the chart intact
- Added a nicer yet very simple color scheme, and added an event that shines a bit more light when hovering over chart bars to get more detail
- Chart is rendered in Home
- Student route on a path of a student that does not exists is handled better in StudentInfo now
- RatingToggle rendered in Home
- Home is now also home to the selectChartBar, which provides the list of students to (de)select for rendering in the Chart through InputSelect
- Each student route now also renders the RatingsToggle and the Chart (with that students data)
- Bug: I broke filtering on selected students in Home Chart and didn't notice, passed the wrong handleChange to props: FiXed
- Moved the select-bar under the Chart so when choosing, the list does not obscure the Chart
- Added a bit of explanatory text in the Home / Overview page , and the StudentInfo pages
- Used color in the RatingToggle to make it a bit more stylish, but it also serves as legend for the Chart...
- Some styling, some in css, some directly in the jsx color
- A lot of clean-up, unused stuff and console.logs
  > Decided to have a stab at incorporating the table component I created for the Song Saver assignment (L35).
  > DataTable is basically my L35's SongList with the filtering stripped out, and remodelled a tiny bit to accommodate the use of the same input as Chart
  > Added the insertion of an .id to the initial parsing of the Google spreadsheet data to be used for key creation of the table (as is React's best practise)
  > The Table works quite well, however when more than a few students are selected resizing the browser window is quite slow, therefore I opted to put the full Table in it's own page as a separate Table route
  > - Resizing is only slow on the Table page, moving away from it, resizing, and then returning to it seems to be fine
  > - For the single student pages I opted to have both the Chart and the Table in view since that seems to cause no slowdowns (for now)
- Last bit of 'clean-up' (I hope), trying to keep the workflow organized, so Home / Table and StudentInfo have been moved into their own views folder
- Hmm, apparently messed up a bit, no commit was made on the changes to App.js, mea culpa! It should be fixed now...

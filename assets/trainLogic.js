// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyA8y4qUe-Ovgg7eNOExFKgufMpa-mvO-YU",
  authDomain: "train-29341.firebaseapp.com",
  databaseURL: "https://train-29341.firebaseio.com",
  projectId: "train-29341",
  storageBucket: "",
  messagingSenderId: "319660847494"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var empName = $("#train-name-input").val().trim();
  var empDestiny = $("#destiny-input").val().trim();
  var empStart = moment($("#start-input").val().trim(), "HH:mm").format("hh:mm");
  var empMinutes = $("#minutes-input").val().trim();

var firstTimeConverted = moment(empStart, "HH:mm").subtract(1, "years");

var currentTime = moment();

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    // Time apart (remainder)
  var tRemainder = diffTime % empMinutes;

     // Minute Until Train
  var MinutesTillTrain = empMinutes - tRemainder;
  console.log("MINUTES TILL TRAIN: " + MinutesTillTrain);


    // Next Train
  var nextTrain = moment().add(MinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



  // Creates local "temporary" object for holding employee data
  var newEmp = {
    name: empName,
    place: empDestiny,
    start: empStart,
    arrive: empMinutes,
   //next: nextTrain,
  remind: MinutesTillTrain,
 
  };

  // Uploads employee data to the database
  database.ref().push(newEmp);


  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destiny-input").val("");
  $("#start-input").val("");
  $("#minutes-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empDestiny = childSnapshot.val().place;
  var empStart = childSnapshot.val().start;
  var empMinutes = childSnapshot.val().arrive;
  var nextTrain = childSnapshot.val().next;
var MinutesTillTrain = childSnapshot.val().remind;



  // Create the new row
  var newRow = $("<tr>").append(
    $("<th>").text(empName),
    $("<th>").text(empDestiny),
    $("<th>").text(empMinutes),
    $("<th>").text(nextTrain),
    $("<th>").text(MinutesTillTrain)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});


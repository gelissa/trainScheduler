// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBBG_AG9asjm2rjFrglZ0pjuYE-TfKjnqU",
    authDomain: "trainscheduler-de9ca.firebaseapp.com",
    databaseURL: "https://trainscheduler-de9ca.firebaseio.com",
    projectId: "trainscheduler-de9ca",
    storageBucket: "",
    messagingSenderId: "892100657503",
    appId: "1:892100657503:web:c8966724508faee32db6ea"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

//   reference the database service
var database = firebase.database();

// global variables
var trainName;
var trainDestination; 
var trainFrequency;
var firstTrain;
var trainNextArrival;
var trainMinutesAway;

// populate firebase database with initial data
// create onclick event to capture form values and add trains to the database
$("#add-train").on("click", function(event){
    // stop form from running normally
    event.preventDefault();
    // reassign variables to grab values from inputs
    trainName = $("#train-input").val().trim();
    trainDestination = $("#train-destination").val().trim();
    trainFrequency = $("#train-frequency").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    trainNextArrival = $("#train-input").val().trim();
    trainMinutesAway = $("#train-input").val().trim();

    // console party
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainFrequency);
    // console.log(firstTrain);

    // put it in the database
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        frequency: trainFrequency,
        train: firstTrain,
        nextArrival: trainNextArrival,
        minutesAway: trainMinutesAway
    });

    alert("train added!");

    // empties the names on the form
    $("#train-input").val("");
    $("#train-destination").val("");
    $("#train-frequency").val("");
    $("#firstTrain").val("");
    $("#train-input").val("");
    $("#train-input").val("");

});

database.ref().on("child_added", function(snapshot){
    // console.log data to make sure it's receiving results
    console.log(snapshot.val());
    // store everything in a variable
    var tName = snapshot.val().name;
    var tDest = snapshot.val().destination;
    var tFreq = snapshot.val().frequency;
    // =========================================
    // next arrival and minutes away calcs here
    // =========================================
    var tr = $("<tr>");
    // dispay results inside table
    // create vars to hold table elements and content
    // append all table data(td) to the table row(tr)
    tr.append(
        "<td>" + tName + "</td>",
        "<td>" + tDest + "</td>",
        "<td>" + tFreq + "</td>",
        "<td> First Train </td>",
        "<td> Next Arrival </td>",
        "<td> Minutes Away </td>",
     );
    // append to tbody element
    $("tbody").append(tr);
});

// Assumptions
var tFrequency = 3;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
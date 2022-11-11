

// List of sentences
var _CONTENT = [ "Plan a trip.", "Find yourself.", "Get away.", "Live your dream." ];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed 
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#animated-text");

// How long to hold?
var hold_main = 5000
var hold_sub = 1500

// Implements typing effect
function Type() { 
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX + 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX++;

	// If full sentence has been displayed then start to delete the sentence after some time
	if(text === _CONTENT[_PART]) {
        var to_hold
        if (text == _CONTENT[0]) {
            to_hold = hold_main
        } else {to_hold = hold_sub}

		clearInterval(_INTERVAL_VAL);
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Delete, 50);
		}, to_hold);
	}
}

// Implements deleting effect
function Delete() {
	var text =  _CONTENT[_PART].substring(0, _PART_INDEX - 1);
	_ELEMENT.innerHTML = text;
	_PART_INDEX--;

	// If sentence has been deleted then start to display the next sentence
	if(text === '') {
		clearInterval(_INTERVAL_VAL);

		// If last sentence then display the first one, else move to the next
		if(_PART == (_CONTENT.length - 1))
			_PART = 0;
		else
			_PART++;
		_PART_INDEX = 0;

		// Start to display the next sentence after some time
		setTimeout(function() {
			_INTERVAL_VAL = setInterval(Type, 100);
		}, 200);
	}
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);

//======================================= DYNAMIC GETTING OF INFO ==========================================
// Importing Firebase API
// DO NOT EDIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Our Firebase Project Configuration
const WADTravel = initializeApp({
    apiKey: "AIzaSyCR5RtPZexqY6jCbDZsaYzyUpVE_q8vzMc",
    authDomain: "wad-brothers-travel-ltd.firebaseapp.com",
    databaseURL: "https://wad-brothers-travel-ltd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wad-brothers-travel-ltd",
    storageBucket: "wad-brothers-travel-ltd.appspot.com",
    messagingSenderId: "305280551700",
    appId: "1:305280551700:web:434cc190d57eabe14d1001",
    measurementId: "G-3XQT4098KL"
})
const db = getDatabase(WADTravel)

const app = Vue.createApp( {

	//=========== DATA PROPERTIES ===========
	data() {
		return {
			user_trips: {},
		}
	},

	//=========== METHODS ===========
	methods: {
		edit_trip(tripID) {
			console.log("button working")
			localStorage.setItem("trip", tripID)
			location.replace("../../map_phase2.html")
		},


	},

	async created() {

		// Getting the userID from localStorage and creating the cards based off it.
		const user_ID = localStorage.getItem("user")
		console.log(user_ID)
		const path_location = ref(db, "users/" + user_ID + "/trips")
		onValue(path_location, (snapshot) => {
			var trips = snapshot.val()
			console.log(trips)
			document.getElementById("cards").innerHTML = ""
			for(var tripID of trips){
				console.log(tripID)
				var trip_name = tripID.split("urjfjwowskdorrofkckshecoejfnek")[0]
				console.log(trip_name)
				// this.user_trip[tripID] = trip_name
				var trip_destination = ""
				onValue(ref(db, "trips/" + tripID), (snapshot) => {
					const trip_data = snapshot.val()
					trip_destination = trip_data.trip_details.destination[0].toLowerCase()
					console.log(trip_destination)
					console.log(trip_name)
					document.getElementById("cards").innerHTML += `
					<div class="card cardstyle" >
						<img src="../../images/home_page/trips_imgs/${trip_destination}.jpg" class="card-img-top" height="200px">

						<div class="card-body">
							<h5 class="card-title">${trip_name}</h5>
							<button onclick="edit_trip('${tripID}')" class="btn btn-main-bold">Edit Trip</a>
						</div>

						<div class="card-footer text-muted">
						Last edited: 2 days ago
						</div>
					</div>
					`
				})
				
				
			}


		})

		console.log(this.user_trips)
		
	}
})




// DO NOT MODIFY THIS
// ASSOCIATING the current Vue app to an HTML element with id='app'
app.mount('#homepage')
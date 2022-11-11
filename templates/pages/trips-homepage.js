if (localStorage.getItem("user") === null) {
	window.location.href = "signup_login pages/login_page.html"
}

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

		async get_trips() {
			const user_ID = localStorage.getItem("user")
			const path_location = ref(db, "users/" + user_ID + "/trips")

			const snapshot = await get(path_location)
			var trips = snapshot.val()

			return trips
		},

		async get_trip_obj(trip_id) {
			const path_location = ref(db, "trips/" + trip_id)

			const snapshot = await get(path_location)
			var trip_obj = snapshot.val()

			return trip_obj
		}


	},

	async created() {
		var trips = await this.get_trips()

		console.log("PRE SUCCESS")

		for (var e_trip_id of trips) {
			var trip_obj = await this.get_trip_obj(e_trip_id)
			this.user_trips[e_trip_id] = trip_obj
		}

		console.log(this.user_trips)

		console.log("SUCCESS")
	}
})




// DO NOT MODIFY THIS
// ASSOCIATING the current Vue app to an HTML element with id='app'
app.mount('#homepage')
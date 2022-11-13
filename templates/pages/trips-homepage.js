// REDIRECT IF NOT LOGGED IN YET
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
import { getDatabase, ref, onValue, get, push, set, remove } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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

			username: "",
		}
	},

	//=========== METHODS ===========
	methods: {
		delete_trip(tripID) {
			const path_location = ref(db, "trips/" + tripID)
			remove(path_location)
			.then(
				console.log("trip deleted")
			)
		},

		edit_trip(tripID,trip_start,trip_end,trip_destination) {
			console.log("button working")
			localStorage.setItem("trip", tripID)
			localStorage.setItem("trip_start_date", trip_start)
			localStorage.setItem("trip_end_date", trip_end)
			localStorage.setItem("destination", trip_destination)
			location.replace("../../map_phase2.html")
		},

		async get_trips() {
			const user_ID = localStorage.getItem("user")
			// const path_location = ref(db, "users/" + user_ID + "/trips")
			const path_location = ref(db, `users/${user_ID}/trips`)

			const snapshot = await get(path_location)
			var trips = snapshot.val()

			return trips
		},

		async get_trip_obj(trip_id) {
			const path_location = ref(db, "trips/" + trip_id)

			const snapshot = await get(path_location)
			var trip_obj = snapshot.val()

			return trip_obj
		},

		async get_username() {
			var user_ID	= localStorage.getItem("user")
			const path_location_username = ref(db, "users/" + user_ID + "/username")
			var username_snapshot = await get(path_location_username)
			var username = username_snapshot.val()
			

			return username
		}


	},

	async created() {
		console.log(localStorage.getItem("user"))

		this.username = await this.get_username()
		localStorage.setItem("username", this.username)
		console.log(this.username)

		var trips = await this.get_trips()

		if (trips !== null) {
			for (var e_trip_id of trips) {
				var trip_obj = await this.get_trip_obj(e_trip_id)
				this.user_trips[e_trip_id] = trip_obj
			}
		}

		console.log("USER TRIPS: ", JSON.stringify(this.user_trips))

		console.log("USER TRIPS: ", Object.keys(this.user_trips))

		var modal_counter = 1

		for(var trip_ID of Object.keys(this.user_trips)) {
			if(trip_ID == "undefined"){
				console.log(trip_name)
				console.log(trip_ID)
			}
			else{
				var trip_name = trip_ID.split("urjfjwowskdorrofkckshecoejfnek")[0]
				// console.log(trip_name)
				// console.log(trip_ID)
				var trip_destination = this.user_trips[trip_ID]["trip_details"]["destination"][0]
				var trip_start = this.user_trips[trip_ID]["trip_details"]["start_date"]
				var trip_end = this.user_trips[trip_ID]["trip_details"]["end_date"]
				document.getElementById("cards").innerHTML += `
				<div class="card cardstyle" >
					<img src="../../images/home_page/trip_imgs/${trip_destination.toLowerCase()}.jpg" class="card-img-top" height="200px">
					<div class="card-body">
					<h5 class="card-title">${trip_name}</h5>

					<button onclick="edit_trip(\`${trip_ID}\`,\`${trip_start}\`,\`${trip_end}\`,\`${trip_destination}\`)" class="btn btn-main-bold">Edit Trip</button>

					<button type="button" class="btn btn-fade" data-bs-toggle="modal" data-bs-target="#del_button_modal_${modal_counter}">
						<i class="fa-solid fa-trash-can fa-lg"></i>
					</button>
					</div>
					<div class="card-footer text-muted">
					${trip_destination} <br>
					${trip_start} - ${trip_end} <br
					</div>
				</div>
				`

				document.getElementById("modals").innerHTML += `
				<div class="modal fade" id="del_button_modal_${modal_counter}" tabindex="-1" aria-labelledby="del_button_modal_label_${modal_counter}" aria-hidden="true">
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
							<h1 class="modal-title fs-5" id="ModalLabel">Delete Trip?</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body">
							Are you sure you want to delete <span class="fw-bold">${trip_name}</span>?
							</div>
							<div class="modal-footer">
							<button type="button" class="btn btn-main-bold-fixed" data-bs-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-main-fixed" data-bs-dismiss="modal" @click="delete_trip('${trip_ID}')">Confirm</button>
							</div>
						</div>
					</div>
				</div>
				`
			}
			
		}

		console.log("SUCCESS")
	},

})




// DO NOT MODIFY THIS
// ASSOCIATING the current Vue app to an HTML element with id='app'
app.mount('#homepage')
// Importing Firebase API
// DO NOT EDIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set, remove} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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

// EDIT HERE
// Vue.js data variables
// Input whatever data variables you need, and edit the HTML file to have a v-model, etc.
const root = Vue.createApp({
    data() {
        return{
            myUserID: "",
            trip_id: "",
            trip_details: "",
            sDate: "",
            eDate: "",
            trip_delimiter: "urjfjwowskdorrofkckshecoejfnek",
            my_trip_name: "",
            user_trips: "",
        }
    },

    async mounted() {
        // get details from cache
        await this.get_relevant_info()
        await this.read_from_existing()
        await this.read_from_user_trips()

        console.log("VUE INSTANCE INITIALIZED")

        let date_config = {
            altInput: true,
            altFormat: "J M y",
            disableMobile: "true"
        }

        console.log("FLATPICKR INITIALIZED")
        // date only
        let date_fp_obj = flatpickr("input[type=date]", date_config)
    },

    methods: {
        get_relevant_info() {
            // get user ID
            const userID = localStorage.getItem("user")
            // get trip ID
            const trip_id = localStorage.getItem("trip")
            // get start date
            const start_date = localStorage.getItem("trip_start_date")
            // get end date
            const end_date = localStorage.getItem("trip_end_date")
            this.my_trip_name = trip_id.split(this.trip_delimiter)[0]
            this.myUser_ID = userID.replace(".","")
            this.trip_id = trip_id
            this.sDate = start_date
            this.eDate = end_date
        },
        // read trip_ids
        async read_from_existing() {
            const path_location = ref(db, `trips/${this.trip_id}`)

            const snapshot = await get(path_location)
            var details = snapshot.val()
            console.log(details)
            this.trip_details = details
            // console.log(lodging_locations)
        },
        // read user trips
        async read_from_user_trips() {
            const path_location = ref(db, `users/${this.trip_id}/trips`)

            const snapshot = await get(path_location)
            var details = snapshot.val()
            // console.log(details)
            this.user_trips = details
            // console.log(lodging_locations)
        },

        // create new trip object and delete old trip object
        write_new_data() {
            if (this.trip_id == "") {
                alert(`Trip name cannot be empty!`)
                return
            }
            // get new trip_ID
            var new_trip_id = `${this.my_trip_name}${this.trip_delimiter}${this.myUsername}`
            // console.log(this.trip_id)
            // console.log(new_trip_id)
            // get previous trip details
            var new_obj = this.trip_details
            console.log(new_obj)
            // set new start date
            new_obj.trip_details.end_date = this.eDate
            // set new end date
            new_obj.trip_details.start_date = this.sDate

            // create new trip in database
            set(ref(db, `trips/${new_trip_id}`), new_obj)
            .then(
                function write_success() {
                    // display "Success" message
                    console.log("Entry Created")
            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                console.log(failed_message);
            })

            // delete old data from database
            const path_location = ref(db, `trips/${this.trip_id}`)
            // remove(`trips/${this.trip_id}`)
            remove(path_location)
            .then(
                function delete_success() {
                    alert("Delete operation is a success!")
                    console.log("Delete operation is a success!")
                    window.location.replace("../../map_phase2.html");
                }
            )
            .catch((error) => {
                // for admin, tells you what error there is
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)

                // display "Error" message
                // stays on the same page
                var failed_message = `Delete Operation Unsuccessful. Error: ${errorMessage}`
                // alert(failed_message)
                console.log("Delete Unsuccessful");
                console.log(`${failed_message}`)
            })

            // update user list of trips
            for (var trip in this.user_trips) {
                if (this.user_trips[trip] == this.trip_id) {
                    this.user_trips[trip] = new_trip_id
                }
            }
            set(ref(db, `trips/${new_trip_id}/trips`), this.user_trips)
            .then(
                function write_success() {
                    // display "Success" message
                    console.log("Entry Created")
            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                console.log(failed_message);
            })
        },
    },
    
})



// Mount your HTML document
root.mount('#edit_trip_details')


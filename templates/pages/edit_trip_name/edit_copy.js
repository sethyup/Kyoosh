// Importing Firebase API
// DO NOT EDIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set, remove} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";
import { vm } from "../../../map_js.js";

console.log("YUP CORRECT!!!")

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
            // leader user ID
            myUserID: "",
            // existing trip ID
            trip_id: "",
            // existing trip details
            trip_details: "",
            // existing start & end
            sDate: "",
            eDate: "",
            trip_delimiter: "urjfjwowskdorrofkckshecoejfnek",
            // v-model for new name
            my_trip_name: "",
            // destination
            destination: "",
            collaborators: [],
            
        }
    },

    async mounted() {
        // get details from cache
        await this.get_relevant_info()
        await this.read_from_existing()
        // this.read_all()
        
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
        convert_email_to_userID(email_str) {
            return email_str.replaceAll(".","")
        },
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
            this.myUserID = userID.replace(".","")
            this.trip_id = trip_id
            this.sDate = start_date
            this.eDate = end_date
        },
        // read trip_ids
        async read_from_existing() {
            const path_location = ref(db, `trips/${this.trip_id}`)

            const snapshot = await get(path_location)
            var details = snapshot.val()
            // console.log(details)
            this.trip_details = details
            this.destination = details.trip_details.destination[0]

            if (details.trip_details.g_member !== undefined) {
                this.collaborators = details.trip_details.g_member
            } else {
                this.collaborators = []
            }
            // console.log(lodging_locations)
        },
        // read all data
        read_all() {
            for (var i in dm.$data) {
                console.log(dm.$data[i])
            }
        },

        // create new trip object and delete old trip object
        write_new_data() {
            if (this.trip_id == "") {
                alert(`Trip name cannot be empty!`)
                return
            }
            this.create_new_trip()

            // delete old data from main database
            const path_location = ref(db, `trips/${this.trip_id}`)
            // remove(`trips/${this.trip_id}`)
            remove(path_location)
            .then(
                function delete_success() {
                    // alert("Delete operation is a success!")
                    console.log("Delete operation is a success!")
                    // window.location.replace("../../map_phase2.html");
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

            
        },
        // will need trip_name, destination,start date and end date
        create_new_trip() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends
            // EDIT HERE
            if (this.trip_id && this.destination && this.sDate && this.eDate){
                var url = "images/" + this.destination + ".jpg"
                console.log(url)
                // array of group member UserIDs
                var arr_edited_usernames = []

                // trip ID
                var trip_ID = `${this.my_trip_name}${this.trip_delimiter}${this.myUserID}`

                if (this.collaborators.length > 0) {
                    for (var e_username of this.collaborators) {
                        arr_edited_usernames.push(this.convert_email_to_userID(e_username))
                    }
                }

                set(ref(db, 'trips/' + trip_ID + '/trip_details'), {
                    // DATA YOU WANT TO WRITE GOES HERE,
                    
                        g_member: arr_edited_usernames,
                        destination: [this.destination, url],
                        start_date: this.sDate,
                        end_date: this.eDate,
                        phase: 2
                        
                })
                .then(
                    // write group leader's trip into the trips_gl variable & update the database
                    async function write_success() {
                        // display "Success" message
                        // alert("Write Operation Successful")
                        var user_ID = dm.convert_email_to_userID(localStorage.getItem("user"))
                        console.log("Entry Created")
                        const path_location_g_leader = ref(db, 'users/' + user_ID + '/trips')
                        var snapshot_trips_gl = await get(path_location_g_leader)
                        // console.log(snapshot_trips_gl)
                        var trips_gl = snapshot_trips_gl.val()
                        console.log(trips_gl)
                        // push new trip into arr
                        trips_gl.push(trip_ID)
                        // remove old trip from arr
                        trips_gl.splice(trips_gl.indexOf(dm.trip_id), 1)
                        set(path_location_g_leader, trips_gl)
                        .then(
                            console.log("shit's added and deleted into g_leader's list")
                        )

                        // write group members new trip into the database
                        for(var g_member of arr_edited_usernames){
                            console.log(g_member)
                            const path_location = ref(db, 'users/' + g_member + '/trips')
                            var snapshot_trips = await get(path_location)
                            var trips = snapshot_trips.val()
                            // push new trip into arr
                            trips.push(trip_ID)
                            // remove old trip from arr
                            trips.splice(trips.indexOf(dm.trip_id), 1)
                            set(path_location, trips)
                            .then(
                                console.log("shit's added and deleted into g_member's list")
                            )
                            
                        }

                })
                .catch((error) => {
                    // for us to debug, tells us what error there is,
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // display "Error" message
                    var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                    // alert(failed_message)
                    console.log(failed_message);

                    return
                })
                // alert("Create Trip Successful")

                //PUSH INFORMATION TO LOCALSTORAGE ========================================================
                localStorage.setItem("trip", `${this.my_trip_name}${this.trip_delimiter}${this.myUserID}`)
                localStorage.setItem("trip_start_date", this.sDate)
                localStorage.setItem("trip_end_date", this.eDate)
                localStorage.setItem("destination", this.destination)
                // ========================================================================================

                location.href = "../../../map_phase2.html"
                // location.href = "https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html"
            }
            
            else{
                let msg = "Please fill in your "
                let empty_fields = []
                if(!this.trip_id){
                    empty_fields.push('Trip Name')
                }if(!this.sDate){
                    empty_fields.push('Start Date')
                }if(!this.eDate){
                    empty_fields.push('End Date')
                }

                if (empty_fields.length == 1){
                    msg += empty_fields[0] + '!'
                }else if (empty_fields.length == 2){
                    msg += empty_fields[0] + ' and ' + empty_fields[1] + '!'
                }else{
                    for (let i = 0; i < empty_fields.length - 2 ; i++) {
                        msg += empty_fields[i] + ", ";
                      }
                    msg += empty_fields[empty_fields.length - 2] + ' and ' + empty_fields[empty_fields.length - 1] + '!'
                }
                alert(msg)
            }
                
        },
        
    },
    
    
})



// Mount your HTML document
const dm = root.mount('#edit_trip_details')

// get new trip_ID
            // var new_trip_id = `${this.my_trip_name}${this.trip_delimiter}${this.myUsername}`
            // console.log(new_trip_id)

            // // save old info into new object
            // var new_obj = this.trip_details
            // // console.log(new_obj)

            // // set new start date
            // new_obj.trip_details.end_date = this.eDate
            // // set new end date
            // new_obj.trip_details.start_date = this.sDate

            // // create new trip in database
            // set(ref(db, `trips/${new_trip_id}`), new_obj)
            // .then(
            //     function write_success() {
            //         // display "Success" message
            //         console.log("Entry Created")
            // })
            // .catch((error) => {
            //     // for us to debug, tells us what error there is,
            //     const errorCode = error.code;
            //     const errorMessage = error.message;

            //     // display "Error" message
            //     var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
            //     console.log(failed_message);
            // })
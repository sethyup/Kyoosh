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

// EDIT HERE
// Vue.js data variables
// Input whatever data variables you need, and edit the HTML file to have a v-model, etc.
const root = Vue.createApp({
    data() {
        return{
            // Enter your code here,

            // example
            // email: "seth@gmail.com"

            // activity: "hong deh street"

            // ...

            // myUsername: localStorage.getItem("user"),
            
            // myTrip: localStorage.getItem("trip").split('urjfjwowskdorrofkckshecoejfnek')[0],

            // sDate: localStorage.getItem("trip_start_date"),

            // eDate: localStorage.getItem("trip_end_date"),

            destination: ref(db, 'trips/' + this.myTrip + 'urjfjwowskdorrofkckshecoejfnek' + this.myUsername + '/trip_details/destination/0'),

            g_member: ref(db, 'trips/' + this.myTrip + 'urjfjwowskdorrofkckshecoejfnek' + this.myUsername + '/trip_details/g_member'),

            myUsername: this.myUsername,
            
            myTrip: this.myTrip,

            sDate: this.sDate,

            eDate: this.eDate,

            trip_delimiter: "urjfjwowskdorrofkckshecoejfnek"
        }
    },

    mounted() {
        const myUsername = localStorage.getItem("user")
            
        var oldTrip_ID = localStorage.getItem("trip")

        var myTrip = oldTrip_ID.split('urjfjwowskdorrofkckshecoejfnek')[0]

        var sDate= localStorage.getItem("trip_start_date")

        var eDate = localStorage.getItem("trip_end_date")
        
    },

    methods: {
        edit_trip_details() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends
            // EDIT HERE
            if (this.myTrip && this.sDate && this.eDate){
                var url = "images/" + this.destination + ".jpg"

                set(ref(db, 'trips/' + this.myTrip + this.trip_delimiter + this.myUsername + '/trip_details'), {
                    // DATA YOU WANT TO WRITE GOES HERE,
                    
                        g_member: this.g_member,
                        destination: [this.destination, url],
                        start_date: this.sDate,
                        end_Date: this.eDate
                        
                })
                .then(
                    function write_success() {
                        // display "Success" message
                        // alert("Write Operation Successful")
                        console.log("Entry Created")

                },
                
                    function delete_from_user_and_friends() {
                        all_members = this.g_member
                        all_members.push(localStorage.getItem("trip").split('urjfjwowskdorrofkckshecoejfnek')[1])
                        console.log(all_members)

                        const users_path = ref(db, "users/")
                        onValue(users_path, (snapshot) => {
                            const data = snapshot.val()
                            // console.log(data)
                            for(var user in data){
                                // console.log(user)
                                // console.log(data[user].email)
                                if(all_members.includes(user)){
                                    //this.user_emails.push(data[user].email)

                                    remove(user + "/trips/" + oldTrip_ID)
                                    set(user + "/trips/" + this.myTrip + this.trip_delimiter + this.myUsername)
                                    .then(
                                        function delete_success() {
                                            alert("Delete operation is a success!")
                                            console.log("Delete operation is a success!")
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
                                        alert(failed_message)
                                        console.log("Delete Unsuccessful");
                                    })

                                }

                            }
                        })
                    }
                )
                .catch((error) => {
                    // for us to debug, tells us what error there is,
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    // display "Error" message
                    var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                    // alert(failed_message)
                    console.log(failed_message);
                })
                // alert("Create Trip Successful")
                //PUSH INFORMATION TO LOCALSTORAGE ========================================================
                localStorage.setItem("trip", this.myTrip + this.trip_delimiter + this.myUsername)
                localStorage.setItem("trip_start_date", this.sDate)
                localStorage.setItem("trip_end_date", this.eDate)
                localStorage.setItem("destination", this.destination)
                // ========================================================================================

                location.href = "../../map_phase2.html"
            }
            
            // show alert
            else{
                
                let msg = "Please fill in your "
                let empty_fields = []
                if(!this.trip_name){
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
        
        get_my_trips(username) {
            const data_to_be_read = ref(db, "users/" + username + "/trips");
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                console.log(data)
            return data
            });
        }

    },

    mounted() {
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
    
})



// Mount your HTML document
root.mount('#edit_trip_details')


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

            myUsername: 'adambft',
            // assume that i'm adam right now

            trip_name: "",

            g_member: [],

            destination: "",

            sDate: "",

            eDate: ""
            

        }
    },

    methods: {
        create_new_trip() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends
            // EDIT HERE
            var url = "images/" + this.destination + ".jpg"

            set(ref(db, 'trips/' + this.trip_name + '_' + this.myUsername + '/trip_details'), {
                // DATA YOU WANT TO WRITE GOES HERE,
                
                    g_member: this.g_member,
                    destination: [this.destination, url],
                    start_date: this.sDate,
                    end_Date: this.eDate
                    
            })
            .then(
                function write_success() {
                    // display "Success" message
                    alert("Write Operation Successful")
                    console.log("Entry Created")

            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                alert(failed_message)
                console.log(failed_message);
            })
            alert("Create Trip Successful")
            location.replace("https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html")
        },

        get_my_trips(username) {
            const data_to_be_read = ref(db, "users/" + username + "/trips");
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                console.log(data)
            return data
            });
        },

        // delete_data() {
        //     remove(/* path location goes here*/)
        //     .then(
        //         function delete_success() {
        //             alert("Delete operation is a success!")
        //             console.log("Delete operation is a success!")
        //         }
        //     )
        //     .catch((error) => {
        //         // for admin, tells you what error there is
        //         const errorCode = error.code;
        //         const errorMessage = error.message;
        //         console.log(errorMessage)
        //         console.log(errorCode)

        //         // display "Error" message
        //         // stays on the same page
        //         var failed_message = `Delete Operation Unsuccessful. Error: ${errorMessage}`
        //         alert(failed_message)
        //         console.log("Delete Unsuccessful");
        //     })

        // }
    }
})


// Mount your HTML document
root.mount('#create_get_trip')


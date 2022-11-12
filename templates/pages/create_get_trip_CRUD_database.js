// REDIRECT IF NOT LOGGED IN YET
if (localStorage.getItem("user") === null) {
	window.location.href = "signup_login pages/login_page.html"
}

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

            myUsername: localStorage.getItem("user"),
            // assume that i'm adam right now
            // no need friend, its all dynamic

            collaborator_input: "",
            
            collaborators: [],

            user_emails: [],

            trip_name: "",

            g_member: [],

            destination: "",

            sDate: "",

            eDate: "",

            all_countries:[
                "Afghanistan", "Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
            ],

            nameList: [],

            trip_delimiter: "urjfjwowskdorrofkckshecoejfnek"
        }
    },

    computed: {
        friendCollaborators(){
            return this.collaborators.length > 0 ? "You have added " + this.collaborators.join(", ") : ''
        }
    },

    created() {
        const user_ID = localStorage.getItem("user")
        const users_path = ref(db, "users/")
        onValue(users_path, (snapshot) => {
            const data = snapshot.val()
            // console.log(data)
            for(var user in data){
                // console.log(user)
                // console.log(data[user].email)
                if(user != user_ID){
                    this.user_emails.push(data[user].email)
                }

            }
        });

        
        console.log(this.user_emails)
    
    },

    methods: {
        create_new_trip() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends
            // EDIT HERE
            if (this.trip_name && this.destination && this.sDate && this.eDate){
                var url = "images/" + this.destination + ".jpg"

                // array of group member UserIDs
                var arr_edited_usernames = []

                // trip ID
                var trip_ID = this.trip_name + this.trip_delimiter + this.myUsername

                for (var e_username of this.collaborators) {
                    arr_edited_usernames.push(this.convert_email_to_userID(e_username))
                }

                set(ref(db, 'trips/' + trip_ID + '/trip_details'), {
                    // DATA YOU WANT TO WRITE GOES HERE,
                    
                        g_member: arr_edited_usernames,
                        destination: [this.destination, url],
                        start_date: this.sDate,
                        end_Date: this.eDate,
                        phase: 2
                        
                })
                .then(
                    async function write_success() {
                        // display "Success" message
                        // alert("Write Operation Successful")
                        var user_ID = localStorage.getItem("user")
                        console.log("Entry Created")
                        try{
                        const path_location_g_leader = ref(db, 'users/' + user_ID + '/trips')
                        var snapshot_trips_gl = await get(path_location_g_leader)
                        var trips_gl = snapshot_trips.val()
                        trips_gl.push(trip_ID)
                        set(path_location, trips_gl)
                        .then(
                            console.log("shit's added into g_leader's list")
                        )
                        }
                        catch(error){
                            
                        }


                        for(var g_member in arr_edited_usernames){
                            const path_location = ref(db, 'users/' + g_member + '/trips')
                            var snapshot_trips = await get(path_location)
                            var trips = snapshot_trips.val()
                            trips.push(trip_ID)
                            set(path_location, trips)
                            .then(
                                console.log("shit's added into g_member's list")
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
                localStorage.setItem("trip", this.trip_name + this.trip_delimiter + this.myUsername)
                localStorage.setItem("trip_start_date", this.sDate)
                localStorage.setItem("trip_end_date", this.eDate)
                localStorage.setItem("destination", this.destination)
                // ========================================================================================

                // location.href = "../../map_phase2.html"
                // location.href = "https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html"
            }
            
            else{
                let msg = "Please fill in your "
                let empty_fields = []
                if(!this.trip_name){
                    empty_fields.push('Trip Name')
                }if(!this.destination){
                    empty_fields.push('Destination')
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
        },

        add_collaborator() {
            // console.log("adding")
            var collaborator_to_add = this.collaborator_input
            console.log(collaborator_to_add)
            console.log(this.user_emails)
            if(this.user_emails.includes(collaborator_to_add)){
                if(this.collaborators.includes(collaborator_to_add)){
                    var error_message = "Email already added into the list, tick the checkbox instead!"
                    document.getElementById("error").innerText = error_message
                }
                else{
                    this.collaborators.push(collaborator_to_add)
                    this.collaborator_input = ""
                }
            }
            else{
                var error_message = "Email entered is not registered on Whoosh!"
                document.getElementById("error").innerText = error_message
            }  
            
        },

        convert_email_to_userID(email_str) {
            return email_str.replaceAll(".","")
        }

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
root.mount('#create_get_trip')


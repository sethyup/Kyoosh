// REDIRECT IF NOT LOGGED IN YET
if (localStorage.getItem("user") === null) {
	window.location.href = "../pages/signup_login pages/login_page.html"
} else if (localStorage.getItem("trip") === null) {
	// REDIRECT IF LOGGED IN BUT NO TRIP ID IN CACHE
	window.location.href = "../pages/trips-homepage.html"
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// DATETIME FUNCTIONS
function convert_date_obj_to_str(date_obj) {
    console.log("")
    console.log("CALLING convert_date_obj_to_str() ---------------")

    console.log("date_obj (input):", date_obj)

    return `${date_obj.getFullYear()}-${("0" + (date_obj.getMonth()+1)).slice(-2)}-${("0" + (date_obj.getDate())).slice(-2)} ${("0" + (date_obj.getHours())).slice(-2)}:${("0" + (date_obj.getMinutes())).slice(-2)}`
}

function convert_datetime_str_to_date_obj(datetime_str) {
    // format: 2022-10-05 12:00
    let arr_depart_datetime = datetime_str.split(" ")
    let datetime_date_arr = arr_depart_datetime[0].split("-")
    let datetime_h_min_arr = arr_depart_datetime[1].split(":")

    let new_date_obj = new Date(datetime_date_arr[0], Number(datetime_date_arr[1])-1, datetime_date_arr[2], datetime_h_min_arr[0], datetime_h_min_arr[1])

    return new_date_obj
}

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

// const auth = getAuth(WADTravel)
const db = getDatabase(WADTravel)

const main = Vue.createApp({
    data(){
        return{
            trip_id: "",
            days: "",
            date_array: [],
            flights_details: "", 
            lodging_details: "",
        }
    },
    computed:{

    },
    created(){

    },
    methods:{
        get_day(index){
            var key = "Day " + (index + 1)
            var activity_list = this.days[key];
            return activity_list
        },

        // read itinerary from the database
        read_itinerary() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/days`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.days = data
                    console.log("DAYS DATA:", data)
                }
                // retrieve recommended places for new trips
                // else {
                //     const data_to_be_read = ref(db, `locations`);
                //     onValue(data_to_be_read, (snapshot) => {
                //         const data2 = snapshot.val();
                //         if (data2) {
                //             this.existing_locations = data2
                //         }
                //     })
                // }
                })
        },
        
        // read flight stuff from db
        read_flight_details() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/flights`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.flights_details = data
                    console.log("FLIGHT:", data)
                    // for (let i=0; i<this.flights_details.length; i++) {
                    //     var departure = this.flights_details[i].depart_datetime
                    //     departure = departure.slice(0,10)
                    //     // console.log("flight: ", departure)
                    //     this.flight_dates.push(departure)
                    // }
                    // console.log("flight dates:", this.flight_dates)
                }
                })
        },

        // read lodging stuff from db
        read_lodging_details() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/lodging`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.lodging_details = data
                    console.log("LODGING:", data)
                    // for (let i=0; i<this.lodging_details.length; i++) {
                    //     var check_in = this.lodging_details[i].checkin_datetime.slice(0,10)
                    //     var check_out = this.lodging_details[i].checkout_datetime.slice(0,10)
                    //     this.check_in_dates.push(check_in)
                    //     this.check_out_dates.push(check_out)
                    // }
                    // console.log("check in:", this.check_in_dates)
                    // console.log("check in:", this.check_out_dates)
                }
                })
        },

        // read all dates from db 
        read_dates() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/trip_details`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    var  trip_details = data
                    var s_date = trip_details.start_date
                    var e_date = trip_details.end_date
                    // console.log(s_date, e_date)
                    this.create_dates_array(s_date, e_date)
                }
            })
        },

        convert_date_obj_to_str(date_obj) {
            return `${date_obj.getFullYear()}-${("0" + (date_obj.getMonth()+1)).slice(-2)}-${("0" + (date_obj.getDate())).slice(-2)}`
        },

        create_dates_array(s_date, e_date){
                var s_date_obj = new Date(s_date)
                var e_date_obj = new Date(e_date)
            
                var increment_date_obj = new Date(s_date)            
            
                while (increment_date_obj <= e_date_obj) {
                    // console.log("working")
                    var date_str_to_push = this.convert_date_obj_to_str(increment_date_obj)
                    this.date_array.push(date_str_to_push)
                    
                    increment_date_obj.setDate(increment_date_obj.getDate() + 1)
                }
            console.log("DATES ARRAY:", this.date_array)
            
                // return this.date_array
        },

        // DATETIME METHODS
        convert_datetime_to_readable(datetime_str) {
            var date_obj = convert_datetime_str_to_date_obj(datetime_str)

            return flatpickr.formatDate(date_obj, "h:i K, j F Y (D)")
        },

        convert_datetime_to_readable_time(datetime_str) {
            var date_obj = convert_datetime_str_to_date_obj(datetime_str)

            return flatpickr.formatDate(date_obj, "h:i K")
        },

        convert_date_to_readable(date_str) {
            return flatpickr.formatDate(new Date(date_str), "j F (D)")
        }
        
    },
    // retrieve data from database onload
    async created() {
        this.trip_id = localStorage.getItem("trip")

        await this.read_itinerary()
        await this.read_flight_details()
        await this.read_lodging_details()
        await this.read_dates()
    }
})

main.mount("#main")
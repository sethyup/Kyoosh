// REDIRECT IF NOT LOGGED IN YET
if (localStorage.getItem("user") === null) {
	window.location.href = "../pages/signup_login pages/login_page.html"
} else if (localStorage.getItem("trip") === null) {
	// REDIRECT IF LOGGED IN BUT NO TRIP ID IN CACHE
	window.location.href = "../pages/trips-homepage.html"
}

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// list of months
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

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
            // locations  : { 
            //     "0": {
            //         "address": "273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
            //         "description": "",
            //         "latlng": {
            //             "lat": 37.5444,
            //             "lng": 127.0374
            //         },
            //         "name": "Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
            //         "price": {
            //             "krw": 0,
            //             "sgd": 0
            //         },
            //         "tag": "Attraction",
            //         "votes": {
            //             yes: ["SETH YAP ZIQI_", "kbang"],
            //             no: ["adamft"],
            //             yet_to_vote: ["name4", "name5"]
            //         }
            //         },
            //         "1":{
            //         "address": "105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
            //         "description": "",
            //         "latlng": {
            //             "lat": 37.5512,
            //             "lng": 126.9882
            //         },
            //         "name": "Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
            //         "price": {
            //             "krw": 12000,
            //             "sgd": 12
            //         },
            //         "tag": "Attraction",
            //         "votes": {
            //           yes: ["SETH YAP ZIQI_"],
            //           no: ["adamft", "kbang", ],
            //           yet_to_vote: ["name4", "name5"]
            //         }
            //         },
            //         "2":{
            //         "address": "405 Hangang-daero, Jung-gu, Seoul, South Korea",
            //         "description": "",
            //         "latlng": {
            //             "lat": 37.5561,
            //             "lng": 126.9719
            //         },
            //         "name": "Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea",
            //         "price": {
            //             "krw": 3000,
            //             "sgd": 3
            //         },
            //         "tag": "Food",
            //         "votes": {
            //           yes: ["SETH YAP ZIQI_"],
            //           no: ["adamft"],
            //           yet_to_vote: ["kbang", "name4", "name5"]
            //         }
            //         },
            //         "3":{
            //         "address": "365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea",
            //         "description": "",
            //         "latlng": {
            //             "lat": 37.5532,
            //             "lng": 126.9219
            //         },
            //         "name": "Hongdae Shopping Street",
            //         "price": {
            //             "krw": 25244.25,
            //             "sgd": 25
            //         },
            //         "tag": "Shopping",
            //         "votes": {
            //           yes: ["SETH YAP ZIQI_"],
            //           no: ["adamft", "name4"],
            //           yet_to_vote: ["kbang", "name5"]
            //         }
            //     }, 
                
            // },

            spending: 0,
            selected_all: false,
            filter_tag: "",
            existing_locations: "",
            trip_id: "",
            filtered_locations: [],

            // selected_activities
            selected_activities: [],

            // TRIP DETAILS
            user_id: "",
            trip_details: {},
        }
    },
    computed:{
        sort_by(){
            var tag_list = []
            var votes_list = []
            var cost_list = []

            for (let i=0; i<this.existing_locations.length; i++) {
                var tag = this.existing_locations[i].tag
                var cost = Number(this.existing_locations[i].price.sgd)
                var votes = 0
                    if(this.existing_locations[i].votes.yes){
                    votes = this.existing_locations[i].votes.yes.length
                    }
                var tag_id = [tag, i]
                tag_list.push(tag_id)

                var votes_id = [votes, i]
                votes_list.push(votes_id)

                var cost_id = [cost, i]
                cost_list.push(cost_id)
            }
            // sort current tags/votes/cost
            tag_list = tag_list.sort()
            votes_list = votes_list.sort(function(a, b){return b[0]-a[0]})
            cost_list = cost_list.sort(function(a, b){return a[0]-b[0]})

            // console.log(this.locations)
            console.log("FILTER")
            console.log(tag_list)
            console.log(votes_list)
            console.log(cost_list)

            if(this.filter_tag == "Tag"){
                this.filtered_locations = []
                for (let i=0; i<tag_list.length; i++) {
                    var index = tag_list[i][1]
                    var location = this.existing_locations[index]
                    this.filtered_locations.push(location)
                }
            }
            else if(this.filter_tag == "Votes"){
                this.filtered_locations = []
                for (let i=0; i<votes_list.length; i++) {
                    var index = votes_list[i][1]
                    var location = this.existing_locations[index]
                    this.filtered_locations.push(location)
                }
            }
            else if(this.filter_tag == "Cost"){
                this.filtered_locations = []
                for (let i=0; i<cost_list.length; i++) {
                    var index = cost_list[i][1]
                    var location = this.existing_locations[index]
                    this.filtered_locations.push(location)
                }
            }

            // new_location = (this.locations).sort((a, b) => (a.price.sgd > b.price.sgd) ? 1 : -1)
            // console.log(new_location)
        }
    },
    methods:{
        calculate_votes_percentage(votes){
            var yes_votes = 0
            var total_users = 0
            if(votes.yes){
                yes_votes += votes.yes.length
                total_users += votes.yes.length
            }


            if(votes.no){
                total_users += votes.no.length
            }
            if(votes.yet_to_vote){
                total_users += votes.yet_to_vote.length
            }

            return yes_votes/total_users * 100
        },

        select_all(){
            // haven't select all
            console.log("====START selectall ===")
            if(this.selected_all == false){
                var total_num = this.existing_locations.length
                for (let i=0; i<total_num; i++) {
                    this.selected_activities.push(this.existing_locations[i])
                }
                // this.selected_activities = Object.keys(this.locations)
                this.selected_all = true
                this.calculate_spending()

            }
            // selected all --> unselect all
            else{
                this.selected_activities = []
                this.selected_all = false
                this.spending = 0
            }


            

        },

        calculate_spending(){
            console.log("==== START FUNCTION +++++")

            this.spending = 0
            for (let i=0; i< this.selected_activities.length; i++) {
                var name = this.selected_activities[i].name
                // console.log(name)
                for (let j=0; j<this.existing_locations.length; j++) {
                    if(name == this.existing_locations[j].name){
                        console.log(this.existing_locations[j].name)
                        var cost = Number(this.existing_locations[j].price.sgd)
                        this.spending += cost
                    }
                }
                // this.spending += Number(this.existing_locations[index].price.sgd)
                // console.log(this.existing_locations[index].price.sgd)
                // this.spending += Number(this.selected_activities[i])
            };
            console.log(this.selected_activities)
        }, 

        // read existing locations from the database
        read_from_existing_locations() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/activities`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.existing_locations = data
                    console.log(data)
                }
                // retrieve recommended places for new trips
                else {
                    const data_to_be_read = ref(db, `locations`);
                    onValue(data_to_be_read, (snapshot) => {
                        const data2 = snapshot.val();
                        if (data2) {
                            this.existing_locations = data2
                        }
                    })
                }
                })
          },

        // push selected_activities into database
        create_update_data() {
            console.log("Writing data into database...")

            // WRITE SELECTED_ACTIVITIES TO DB
            set(ref(db, `trips/${this.trip_id}/selected_activities`),
                this.selected_activities
            )
            .then(
                function write_success() {
                    // display "Success" message
                    // alert("Write Operation Successful")
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

            // SET PHASE TO 3
            set(ref(db, `trips/${this.trip_id}/trip_details/phase`),
                3
            ) 
            .then(
                function write_success() {
                    // display "Success" message
                    // alert("Write Operation Successful")
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


        // Datetime details
        convert_datetime_str_to_date_obj(datetime_str) {
            // format: 2022-10-05
            let arr_depart_datetime = datetime_str.split(" ")
            let datetime_date_arr = arr_depart_datetime[0].split("-")

            let new_date_obj = new Date(datetime_date_arr[0], Number(datetime_date_arr[1])-1, datetime_date_arr[2])

            return new_date_obj
        },

        // retrieve trip details from localStorage
        retrieve_from_cache() {
            if (localStorage.getItem('user')) {
                this.user_id = localStorage.getItem('user')
            }
            if (localStorage.getItem('trip')) {
                this.trip_id = localStorage.getItem('trip')
            }
            if (localStorage.getItem('trip_start_date')) {
                // format YYYY-MM-DD to "DD Month Year"
                var start_date = this.convert_datetime_str_to_date_obj(localStorage.getItem('trip_start_date'))
                var end_date = this.convert_datetime_str_to_date_obj(localStorage.getItem('trip_end_date'))
                // set duration
                var c_duration = `${start_date.getDate()} ${month[start_date.getMonth()]} ${start_date.getFullYear()} - ${end_date.getDate()} ${month[end_date.getMonth()]} ${end_date.getFullYear()}`
                this.trip_details.duration = c_duration
            }
            if (localStorage.getItem('destination')) {
                var c_country = localStorage.getItem('destination')
                this.trip_details.country = c_country
            }
        },

        // GET TRIP NAME
        get_trip_name(tripID) {
            return tripID.split("urjfjwowskdorrofkckshecoejfnek")[0]
        },
        
    },
    // retrieve data from database onload
    async created() {
        this.retrieve_from_cache()

        await this.read_from_existing_locations()
    }
})

main.mount("#main")
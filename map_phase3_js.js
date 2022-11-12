// Firebase stuff
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

// const auth = getAuth(WADTravel)
const db = getDatabase(WADTravel)

// cached variables
var markers = [];
var uniqueId = 1;

// create your map
function initMap(location) {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.5665, lng:126.9780},
    }
    );
    vm.$data.map = map;
    // map.addListener("click", (e) => {
    //     create_marker_by_click(e.latLng,map);
    // });
    for (var place in location) {
        // create_marker(place, map)
        create_marker(location[place], map)
    }
}

// create existing marker
function create_marker(place, map) {
    const icon = {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // url
            scaledSize: new google.maps.Size(40, 40), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
        };
        var marker = new google.maps.Marker({
            position: place.latlng,
            map: map,
            icon: icon
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true,
            });
        // Set unique id
        marker.id = uniqueId;
        // vm.$data.marker_id = uniqueId
        uniqueId++;
        

        // set infoWindow
        var contentString = 
            `
            <div id="content" name="${marker.id}>
            <div id="siteNotice"></div>

            <div class="container">
            
            <div class="row">
                <div class = "col-8">
                <span class="badge rounded-pill text-bg-warning">#Shopping</span>
                <h3>${place.name}</h3>
                <p class="address">${place.address}<p>
                <hr>
                <h6>SGD ${place.price.sgd} / KRW ${place.price.krw} per person</h6>
                <p class="description">Top picks that the fam wants to visit while in Korea</p>
                </div>
                

                <div class="col-4" style:"position:relative">
                <p class="pt-3">Current Votes: </p>
                    <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" aria-label="voted_yes" style="width: 45%" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-danger" role="progressbar" aria-label="voted_no" style="width: 30%" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-secondary" role="progressbar" aria-label="yet_to_vote" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="voting_buttons pt-3">
                    <button type="button" class="btn btn-danger btn-sm reject_btn">Reject</button>
                    <button type="button" class="btn btn-success btn-sm vote_btn"> Vote </button>
                    </div>
                    <div>
                        <button type="button" class="btn btn-sm rounded bg-primary text-white float-end" data-bs-toggle="button" onclick="set_edit(this)">Edit<div id="get_marker_id" style="display: none;">${marker.id}</div></button>
                    </div>
                    
                </div>

            </div>  
            </div>
        </div>
        </div>
            `
        // delete button removed from contentString
        // <input type = 'button' va;ue = 'Delete' onclick = 'DeleteMarker( ${marker.id});' value = 'Delete Activity' />
        marker.addListener("click", (googleMapsEvent) => {
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);});
        markers.push(marker)
}

// delete markers
function DeleteMarker(id) {
    //Find and remove the marker from the Array
    
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
            //Remove the marker from Map                  
            markers[i].setMap(null);

            //Remove the marker from array.
            markers.splice(i, 1);
            return;
        }
    }
};



// vue app
const app = Vue.createApp({ 
    data() { 
        return { 
            // trip details
            trip_id: "kbang bangkok bangbongurjfjwowskdorrofkckshecoejfnekkbang@yahoocom",
            user_id: "",
            map_view: false,
            map: "",
            marker_id: uniqueId,
            amount: "", 
            // locations: [
            //     {
            //         name: 'Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
            //         address: '273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5444, lng: 127.0374 },
            //         tag: 'Attraction',
            //         description: '',
            //         price: {sgd: 0, krw: 0},
            //         votes_percentage: {yes: 60, no: 20, yet_to_vote: 20}, 
            //         votes_num: {yes: 3, no: 1, yet_to_vote:1},
            //     },
            //     {
            //         name: 'Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
            //         address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5512, lng: 126.9882 },
            //         tag: 'Attraction',
            //         description: '',
            //         price: {sgd: 12, krw: 12000},
            //         votes_percentage: {yes: 20, no: 20, yet_to_vote: 60}, 
            //         votes_num: {yes: 1, no: 1, yet_to_vote:3},
            //     },
            //     {
            //         name: 'Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea',
            //         address: '405 Hangang-daero, Jung-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5561, lng: 126.9719 },
            //         tag: 'Food',
            //         description: '',
            //         price: {sgd: 3, krw: 3000},
            //         votes_percentage: {yes: 80, no: 0, yet_to_vote: 20}, 
            //         votes_num: {yes: 4, no: 0, yet_to_vote:1},
            //     },
            //     {
            //         name: 'Hongdae Shopping Street',
            //         address: '365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5532, lng: 126.9219 },
            //         tag: 'Shopping',
            //         description: '',
            //         price: {sgd: 25, krw: 25244.25}, 
            //         votes_percentage: {yes: 100, no: 0, yet_to_vote: 0}, 
            //         votes_num: {yes: 5, no: 0, yet_to_vote:0},
            //     },
            //     {
            //         name: 'Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
            //         address: '273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5444, lng: 127.0374 },
            //         tag: 'Attraction',
            //         description: '',
            //         price: {sgd: 0, krw: 0},
            //         votes_percentage: {yes: 60, no: 20, yet_to_vote: 20}, 
            //         votes_num: {yes: 3, no: 1, yet_to_vote:1},
            //     },
            //     {
            //         name: 'Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
            //         address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5512, lng: 126.9882 },
            //         tag: 'Attraction',
            //         description: '',
            //         price: {sgd: 12, krw: 12000},
            //         votes_percentage: {yes: 20, no: 20, yet_to_vote: 60}, 
            //         votes_num: {yes: 1, no: 1, yet_to_vote:3},
            //     },
            //     {
            //         name: 'Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea',
            //         address: '405 Hangang-daero, Jung-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5561, lng: 126.9719 },
            //         tag: 'Food',
            //         description: '',
            //         price: {sgd: 3, krw: 3000},
            //         votes_percentage: {yes: 80, no: 0, yet_to_vote: 20}, 
            //         votes_num: {yes: 4, no: 0, yet_to_vote:1},
            //     },
            //     {
            //         name: 'Hongdae Shopping Street',
            //         address: '365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea',
            //         latlng: { lat: 37.5532, lng: 126.9219 },
            //         tag: 'Shopping',
            //         description: '',
            //         price: {sgd: 25, krw: 25244.25}, 
            //         votes_percentage: {yes: 100, no: 0, yet_to_vote: 0}, 
            //         votes_num: {yes: 5, no: 0, yet_to_vote:0},
            //     },
            //         ],
            existing_locations: "",
            // push_id: 1, 
            current_id: 0,
            // selected locations for each day
            days: {
                
            },
            s_date: "",
            e_date: "",
            date_array: [], 
            master_checked_activities: [0],
            // 
        };
    }, //data
    methods: {
        get_total_users(){
            var total_users = 0
            var votes = this.existing_locations[0].votes
            // console.log(`${all_votes} this from get total users`)
            if(votes.yes){
              total_users += votes.yes.length
            }
            if(votes.no){
              total_users += votes.no.length
            }
            if(votes.yet_to_vote){
              total_users += votes.yet_to_vote.length
            }
            // var total_users = all_votes.yes.length + all_votes.no.length + all_votes.yet_to_vote.length
            // console.log(this.get_total_users)
            return total_users
            },
        get_yes_num(votes){
                // console.log(typeof String(votes.yes.length))
                var yes_votes = 0 
                if(votes.yes){
                yes_votes += votes.yes.length
                }
                return yes_votes
            },
        get_no_num(votes){
                var no_votes = 0 
                if(votes.no){
                no_votes += votes.no.length
                }
                return no_votes
            },
        get_yet_to_vote_num(votes){
                var yet_to_vote_votes = 0 
                if(votes.yet_to_vote){
                yet_to_vote_votes += votes.yet_to_vote.length
                }
                return yet_to_vote_votes
            },
        get_yes_percentage(votes){
                // console.log(votes.yes.length)
                var yes_votes = this.get_yes_num(votes)
                return (yes_votes)*100/this.get_total_users()
            },
        get_no_percentage(votes){
                // console.log(votes.no.length)
                var no_votes = this.get_no_num(votes)
                return (no_votes)*100/this.get_total_users()
            },
        get_yet_to_vote_percentage(votes){
                // console.log(votes.yet_to_vote.length)
                var yet_to_vote_votes = this.get_yet_to_vote_num(votes)
                return (yet_to_vote_votes)*100/this.get_total_users()
            },
        // manually +1 to 
        get_list(index){
            index = index + 1
            var key = "Day " + index
            var current_list = this.days[key]
            return current_list
        },
        // did not +1 
        // change_current_id(id_index) {
        //     this.current_id = id_index
        //     console.log("CURRENT ID:", this.current_id, "DAY:", this.current_id+1)
        // },
        add_activity(index){
            var activity = this.existing_locations[index]
            // var id_index = 
            var key = "Day " + this.current_id
            // this.days[key].push(activity)
            // console.log(this.days[key].length)
            // console.log("INDEX")
            // console.log(index)
            if(this.days[key].includes(activity)){
                this.days[key].splice(this.days[key].indexOf(activity),1)
            }
            else{
                this.days[key].push(activity)
            }
            console.log(this.days[key])
        },
            select_new_day(id_index){
                // push activities into old day in days array 
                console.log("OLD ID:", this.current_id, "OLD DAY:", this.current_id+1)

                // var make_id =  +1
                var key = "Day " + (this.current_id + 1)
                this.days[key] = []
                for (let i=0; i<this.master_checked_activities.length; i++) {
                    var activity = this.existing_locations[this.master_checked_activities[i]]
                    this.days[key].push(activity)   
                }

                // make checkbox unselected / selected for new day
                this.current_id = id_index
                this.master_checked_activities = []
                key = "Day " + (this.current_id +1)
                console.log("CURRENT ID:", this.current_id, "DAY:", this.current_id+1)

                if(this.days[key]){
                    for (let i=0; i<this.days[key].length; i++) {
                        var checked_activity = this.days[key][i]
                        for (let i=0; i<this.existing_locations.length; i++) {
                            if(checked_activity == this.existing_locations[i]){
                                this.master_checked_activities.push(i)
                            }
                        }
                }}

            },
        // check_activity_for_day(index){
        //     var activity = this.existing_locations[index]
        //     var key = "Day" + this.current_id
        //     // var current_activity_list = this.days[key]
        //     // deletes 1st instance of element element_to_remove from array current_activity_list
        //     if(this.days[key] == null){
        //         return false
        //     }
        //     else if (this.days[key].includes(activity)) {
        //         return true
        //     }
        //     return false
        //     console.log(activity)
        //     console.log(this.days[key])
        // },






        d_create() {
            if (this.create_true == false) {
                return "none"
            } else if (this.create_true == true) {
                return ""
            }
        },
        
        d_edit() {
            if (this.edit_true == false) {
                return "none"
            } else if (this.edit_true == true) {
                return ""
            }
        },
        
        delete_marker(id) {
            DeleteMarker(id);
        },
        
        toggle_map() {
            if (this.map_view == false) {
                return "none"
            } else if (this.map_view == true) {
                return ""
            }
        },

        toggle_collapse() {
            if (this.map_view == true) {
                return "none"
            } else if (this.map_view == false) {
                return ""
            }
        },

        change_map_view() {
            if (this.map_view == false) {
                this.map_view = true;
            } else if (this.map_view == true) {
                this.map_view = false;
            }
        },

        read_from_existing() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/selected_activities`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db

                if (data) {
                    this.existing_locations = data

                    uniqueId = data.length
                    markers = []
                    window.initMap = initMap(this.existing_locations);
                }
                // retrieve recommended places for new trips
                else {
                    const data_to_be_read = ref(db, `locations`);
                    onValue(data_to_be_read, (snapshot) => {
                        const data2 = snapshot.val();
                        if (data2) {
                            this.existing_locations = data2
                            
                            window.initMap = initMap(this.existing_locations);
                        }
                    })
                }
                })   
        },

        read_dates() {
                const data_to_be_read = ref(db, `trips/${this.trip_id}/trip_details`);
                onValue(data_to_be_read, (snapshot) => {
                    const data = snapshot.val();
                    // check if there is existing data on db
                    if (data) {
                        var  trip_details = data
                        this.s_date = trip_details.start_date
                        this.e_date = trip_details.end_date
                        console.log("TRIP DETAILS", this.s_date, this.e_date)
                        this.create_dates_array(this.s_date, this.e_date)
                    }
                    })
                },
            convert_date_obj_to_str(date_obj) {
                    return `${date_obj.getFullYear()}-${("0" + (date_obj.getMonth()+1)).slice(-2)}-${("0" + (date_obj.getDate())).slice(-2)}`
                },
            create_dates_array(s_date, e_date){
                console.log("function dates_array")
                    var s_date_obj = new Date(s_date)
                    var e_date_obj = new Date(e_date)
                
                    var increment_date_obj = new Date(s_date)
                    var count_days = 1
                
                
                    while (increment_date_obj <= e_date_obj) {
                        // console.log("working")
                        var date_str_to_push = this.convert_date_obj_to_str(increment_date_obj)
                        this.date_array.push(date_str_to_push)
                        var day = "Day " + count_days
                        // var new_obj = {day : []}
                        // console.log(new_obj)
                        this.days[day] = []
                        count_days += 1
                        
                        increment_date_obj.setDate(increment_date_obj.getDate() + 1)
                    }
                console.log("render", this.date_array)
                console.log("render2", this.days)
                
                    // return this.date_array
                },
        write_to_existing() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/selected_activities`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.existing_locations = data
                    
                    window.initMap = initMap(this.existing_locations);
                }
                // retrieve recommended places for new trips
                else {
                    const data_to_be_read = ref(db, `locations`);
                    onValue(data_to_be_read, (snapshot) => {
                        const data2 = snapshot.val();
                        if (data2) {
                            this.existing_locations = data2
                            console.log(data2)
                            window.initMap = initMap(this.existing_locations);
                        }
                    })
                }
                })   
            },
        create_days_data() {
            console.log("Writing data into database...")

            // EDIT HERE
            set(ref(db, `trips/${this.trip_id}/days`), this.days) 
                // DATA YOU WANT TO WRITE GOES HERE,

                // example
                // email: this.email
                // ...

            
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
                alert(failed_message)
                console.log(failed_message);
            })
        },
        
    }, // methods
    async created() {
        // get recommended locations from database
        await this.read_from_existing()
        await this.read_dates()
                
    }
});
const vm = app.mount('#app'); 



var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
return new bootstrap.Tooltip(tooltipTriggerEl)
})

// window.initMap = initMap;
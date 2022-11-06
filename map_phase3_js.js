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
        };
    }, //data
    methods: {
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

        async write_to_existing() {
            const data_to_be_read = ref(db, "locations");
            await onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                this.existing_locations = data
                
                window.initMap = initMap(this.existing_locations);
                })   
            },
        
    }, // methods
    async created() {
        // get recommended locations from database
        await this.write_to_existing()
                
    }
});
const vm = app.mount('#app'); 



var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
return new bootstrap.Tooltip(tooltipTriggerEl)
})

// window.initMap = initMap;
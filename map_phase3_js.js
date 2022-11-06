// vue app
const app = Vue.createApp({ 
    data() { 
        return { 
            map_view: false,
            map: "",
            marker_id: uniqueId,
            amount: "", 
            locations: [
                {
                    name: 'Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
                    address: '273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
                    latlng: { lat: 37.5444, lng: 127.0374 },
                    tag: 'Attraction',
                    description: '',
                    price: {sgd: 0, krw: 0},
                    votes_percentage: {yes: 60, no: 20, yet_to_vote: 20}, 
                    votes_num: {yes: 3, no: 1, yet_to_vote:1},
                },
                {
                    name: 'Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
                    address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
                    latlng: { lat: 37.5512, lng: 126.9882 },
                    tag: 'Attraction',
                    description: '',
                    price: {sgd: 12, krw: 12000},
                    votes_percentage: {yes: 20, no: 20, yet_to_vote: 60}, 
                    votes_num: {yes: 1, no: 1, yet_to_vote:3},
                },
                {
                    name: 'Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea',
                    address: '405 Hangang-daero, Jung-gu, Seoul, South Korea',
                    latlng: { lat: 37.5561, lng: 126.9719 },
                    tag: 'Food',
                    description: '',
                    price: {sgd: 3, krw: 3000},
                    votes_percentage: {yes: 80, no: 0, yet_to_vote: 20}, 
                    votes_num: {yes: 4, no: 0, yet_to_vote:1},
                },
                {
                    name: 'Hongdae Shopping Street',
                    address: '365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea',
                    latlng: { lat: 37.5532, lng: 126.9219 },
                    tag: 'Shopping',
                    description: '',
                    price: {sgd: 25, krw: 25244.25}, 
                    votes_percentage: {yes: 100, no: 0, yet_to_vote: 0}, 
                    votes_num: {yes: 5, no: 0, yet_to_vote:0},
                },
                {
                    name: 'Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
                    address: '273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea',
                    latlng: { lat: 37.5444, lng: 127.0374 },
                    tag: 'Attraction',
                    description: '',
                    price: {sgd: 0, krw: 0},
                    votes_percentage: {yes: 60, no: 20, yet_to_vote: 20}, 
                    votes_num: {yes: 3, no: 1, yet_to_vote:1},
                },
                {
                    name: 'Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
                    address: '105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea',
                    latlng: { lat: 37.5512, lng: 126.9882 },
                    tag: 'Attraction',
                    description: '',
                    price: {sgd: 12, krw: 12000},
                    votes_percentage: {yes: 20, no: 20, yet_to_vote: 60}, 
                    votes_num: {yes: 1, no: 1, yet_to_vote:3},
                },
                {
                    name: 'Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea',
                    address: '405 Hangang-daero, Jung-gu, Seoul, South Korea',
                    latlng: { lat: 37.5561, lng: 126.9719 },
                    tag: 'Food',
                    description: '',
                    price: {sgd: 3, krw: 3000},
                    votes_percentage: {yes: 80, no: 0, yet_to_vote: 20}, 
                    votes_num: {yes: 4, no: 0, yet_to_vote:1},
                },
                {
                    name: 'Hongdae Shopping Street',
                    address: '365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea',
                    latlng: { lat: 37.5532, lng: 126.9219 },
                    tag: 'Shopping',
                    description: '',
                    price: {sgd: 25, krw: 25244.25}, 
                    votes_percentage: {yes: 100, no: 0, yet_to_vote: 0}, 
                    votes_num: {yes: 5, no: 0, yet_to_vote:0},
                },
                    ],
        };
    }, // data
    // computed: { 
    //     derivedProperty() {
    //         return false;
    //     }  
    // }, // computed
    // created() { 
    // },
    // mounted() { 
        
    // },
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
        }
        
    } // methods
    // , updated() {
    //     alert('updated')
    // }
});
const vm = app.mount('#app'); 

// create your map
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 37.5665, lng:126.9780},
    }
    );
    this.map = map;
    // map.addListener("click", (e) => {
    //     create_marker_by_click(e.latLng,map);
    // });
    // create marker for each stored location
    for (place in location_coded) {
        // console.log(place)
        // console.log(location_coded[place])
        create_marker(location_coded[place], map)
    }
    

}

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
    
// delete all created markers
function DeleteMarkers() {
    for (var i = 0; i < (markers.length)+1; i++) {
        //Remove the marker from Map                  
        markers[i].setMap(null);
    }
    markers = []
    uniqueId = 1
}

 // create existing marker
 function create_marker(place,map) {
    // console.log(place)
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
        vm.$data.marker_id = uniqueId
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
        
}


// cached variables
var markers = [];
var uniqueId = 1;

var location_coded = 
    { 
        "1": {
            "address": "273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
            "description": "",
            "latlng": {
            "lat": 37.5444,
            "lng": 127.0374
            },
            "name": "Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
            "price": {
            "krw": 0,
            "sgd": 0
            },
            "tag": "Attraction",
            "votes_num": {
            "no": 1,
            "yes": 3,
            "yet_to_vote": 1
            },
            "votes_percentage": {
            "no": 20,
            "yes": 60,
            "yet_to_vote": 20
            }
        },
        "2":{
            "address": "105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
            "description": "",
            "latlng": {
            "lat": 37.5512,
            "lng": 126.9882
            },
            "name": "Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
            "price": {
            "krw": 12000,
            "sgd": 12
            },
            "tag": "Attraction",
            "votes_num": {
            "no": 1,
            "yes": 1,
            "yet_to_vote": 3
            },
            "votes_percentage": {
            "no": 20,
            "yes": 20,
            "yet_to_vote": 60
            }
        },
        "3":{
            "address": "405 Hangang-daero, Jung-gu, Seoul, South Korea",
            "description": "",
            "latlng": {
            "lat": 37.5561,
            "lng": 126.9719
            },
            "name": "Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea",
            "price": {
            "krw": 3000,
            "sgd": 3
            },
            "tag": "Food",
            "votes_num": {
            "no": 0,
            "yes": 4,
            "yet_to_vote": 1
            },
            "votes_percentage": {
            "no": 0,
            "yes": 80,
            "yet_to_vote": 20
            }
        },
        "4":{
            "address": "365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea",
            "description": "",
            "latlng": {
            "lat": 37.5532,
            "lng": 126.9219
            },
            "name": "Hongdae Shopping Street",
            "price": {
            "krw": 25244.25,
            "sgd": 25
            },
            "tag": "Shopping",
            "votes_num": {
            "no": 0,
            "yes": 5,
            "yet_to_vote": 0
            },
            "votes_percentage": {
            "no": 0,
            "yes": 100,
            "yet_to_vote": 0
            }
        }
    }
        ;

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
return new bootstrap.Tooltip(tooltipTriggerEl)
})

window.initMap = initMap;
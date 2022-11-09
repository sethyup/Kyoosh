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
var uniqueId = 0;

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
        create_marker(location[place], map, place)
    }
    
    initAutocomplete();

}

// enable Autocomplete
function initAutocomplete() {
    let map = vm.$data.map
    // Init Autocomplete
    var input = document.getElementById('autocomplete');
    const options = {
        componentRestrictions: {'country':['US', 'CH', 'KR', 'SG']},
        fields: ['place_id','name','geometry','formatted_address']
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // autocomplete connected to map viewport
    autocomplete.bindTo('bounds',map);

    // create marker for searched location, go to location, save into marker list
    autocomplete.addListener('place_changed', () => {

        const infowindow = new google.maps.InfoWindow();
        const icon = {
            url:  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40,40),
            };
        const marker = new google.maps.Marker({
            map: map,
            icon: icon
        });
        
        infowindow.close()
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        // console.log(place)
        vm.$data.selected_name = place.name;
        vm.$data.selected_address = place.formatted_address;
        vm.$data.selected_latlng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
        // vm.console_all()
        
        if (!place.geometry || !place.geometry.location) {
        window.alert(`No details available for the place: "${place.name}"`
        );
        return;
        }
        if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        } else {
        map.setCenter(place.geometry.location);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        marker.id = uniqueId;
        vm.$data.current_id = uniqueId
        
        const contentString = 
        `
        <div id="content" name="${marker.id}">
            <div id="siteNotice"></div>

            <div class="container">
                <div class="row">
                    <div class = "col-8">
                    <span class="badge rounded-pill text-bg-warning">#Shopping</span>
                    <h3>${place.name}</h3>
                    <p class="address">${place.formatted_address}<p>
                    <hr>
                </div>  
            </div>
        </div>
        `
    // line for deleting marker by clicking in InfoWindow
    // <input type = 'button' va;ue = 'Delete' onclick = 'DeleteMarker( ${marker.id});' value = 'Delete Activity' />
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
    markers.push(marker)
    marker.addListener("click", (googleMapsEvent) => {
        infowindow.open(map, marker);})
    })
    window.autocomplete = autocomplete
    
    // autocomplete.addListener("", () => {
    //     autocomplete.set("place", null)
    // })
}

// create existing marker
function create_marker(place, map, id) {
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
        // console.log(place)
        // console.log(id)
        marker.id = id;
        vm.$data.current_id = id;
        console.log(`this is the unique Id from  creating the marker: ${id}`)     
        
        // set infoWindow
        var contentString = 
            `
            <div id="content" name="${marker.id}>
            <div id="siteNotice"></div>

            <div class="container">
            
            <div class="row">
                <div class = "col-8">
                <span class="badge rounded-pill text-bg-warning">#${place.tag}</span>
                <h3>${place.name}</h3>
                <p class="address">${place.address}<p>
                <hr>
                <h6>SGD ${place.price.sgd} / KRW ${place.price.krw} per person</h6>
                <p class="description">${place.description}</p>
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
    console.log(`${id} from DeleteMarker`)
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
            trip_id: "grad trip_adambft",
            user_id: "",
            // display details
            create_true: false,
            edit_true: false,
            // map stuff
            map_width: '90%',
            existing_locations: "",
            // create activity stuff
            amount: "", 
            from: "SGD", 
            to: "KRW", 
            converted_amount: "",
            api_key: "wjnJhKhIK8qWrTVQ2YILd5wpxuyRGSP2",
            home_country: "SGD",
            // create activity 2nd part
            tags: ["Shopping", "Museum", "Food", "Attraction", "Sports", "Theme Park", "Camping", "Hiking", "Aquarium", "Zoo", "Tour", "Cruise"],     
            tag_input: "",
            // marker stuff
            current_id: "",
            selected_address: "",
            // selected_tags: "", is under tag_input
            selected_description: "",
            selected_name: "",
            selected_latlng: "",
            group_members: '',
            // amount, converted amount from main stuff
            // vote details
            no: [],
            yes: [],
            yet_to_vote: [],

        };
    }, 
    methods: {
        // delete marker in edit_activity
        delete_marker_edit(id) {
            console.log(`this is the curernt marker id: ${this.current_id}`)
            console.log(`and this is the current markers length: ${markers.length}`)
            console.log(markers)
            // console.log(`${id} this is from delete marker`)
            DeleteMarker(id);
            this.delete_data(id)
            
        },
        // delete marker in create activity
        delete_marker(id) {
            // console.log(`${id} this is from delete marker`)
            if (this.current_id == markers.length - 1) {
                return
            } else if (this.current_id != markers.length - 1    ) {
                DeleteMarker(id);
                this.delete_data(id)
            }
            
        },
        // toggle display for create activity
        d_create() {
            if (this.create_true == false) {
                return "none"
            } else if (this.create_true == true) {
                return ""
            }
        },
        // toggle display for edit activity
        d_edit() {
            if (this.edit_true == false) {
                return "none"
            } else if (this.edit_true == true) {
                return ""
            }
        },
        // calculate value from
        calculate_to_from() {
            if (this.from != "SGD"){
                this.to = "SGD"
            }

            let api_endpoint_url = `https://api.apilayer.com/exchangerates_data/convert?to=${this.to}&from=${this.from}&amount=${this.amount}&apikey=${this.api_key}`
            // 250 times per month 
            axios.get(api_endpoint_url)
            .then(response => {
                
                // Inspect the response.data
                let converted = response.data["result"]; 
                this.converted_amount = (Math.round(converted*100))/100
                
            })
            .catch(error => {
                console.log(error.message)
            })
        },
        // calculate value to
        calculate_from_to() {
            let api_endpoint_url = `https://api.apilayer.com/exchangerates_data/convert?to=${this.from}&from=${this.to}&amount=${this.converted_amount}&apikey=${this.api_key}`
            
            axios.get(api_endpoint_url)
            .then(response => {
                
                // Inspect the response.data
                let converted = response.data["result"]; 
                this.amount = (Math.round(converted*100))/100
                
            })
            .catch(error => {
                console.log(error.message)
            })
        },
        // read location data from database
        read_from_existing() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/activities`);
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
        // read group members for voting
        read_group_members() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/group_member`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.group_members = data
                    // console.log(data)
                }})
        },
        // write activity detail to database
        create_update_data() {
            // create new object
            var new_obj = {
                address: this.selected_address,
                description: this.selected_description,
                latlng: this.selected_latlng,
                name: this.selected_name,
                price: {
                    krw: this.converted_amount,
                    sgd: this.amount,
                },
                tag: this.tag_input,
                votes: { 
                    no: this.no, 
                    yes: this.yes, 
                    yet_to_vote: this.yet_to_vote
                }
            }
            // push to existing places under current id
            this.existing_locations[this.current_id] = new_obj
            // push data to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
            this.yet_to_vote = [];
        },
        // write activity for new activities
        create_new_data() {
            // create new object
            var new_obj = {
                address: this.selected_address,
                description: this.selected_description,
                latlng: this.selected_latlng,
                name: this.selected_name,
                price: {
                    krw: this.converted_amount,
                    sgd: this.amount,
                },
                tag: this.tag_input,
                votes: { 
                    no: [], 
                    yes: [], 
                    yet_to_vote: this.group_members
                }
            }
            console.log(new_obj)
            // push to existing places under current id
            this.existing_locations[this.current_id] = new_obj
            // push data to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
            this.yet_to_vote = [];
        },
        // delete activity from database
        delete_data(id) {
            // remove location from existing locations
            delete this.existing_locations[id] 
            // write to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
        // clog all details
        console_all() {
            for (var key in vm.$data) {
                console.log(`${key} : ${vm.$data[key]}`)
            }

        },
        // retrieve location details for edit activity page
        retrieve_edit_activity_info(id) {
            var details = this.existing_locations[id];
            console.log(details);
            this.selected_address = details.address;
            this.selected_description = details.description;
            this.selected_latlng = details.latlng;
            this.selected_name = details.name;
            this.converted_amount = details.price.krw;
            this.amount = details.price.sgd;
            this.tag_input = details.tag;
            this.no = details.votes.no;
            this.yes = details.votes.yes;
            this.yet_to_vote = details.votes.yet_to_vote;
        },
        // retrieve and edit user and trip id
        // retrieve_from_cache() {
        //     this.trip_id = localStorage.getItem('user')
        //     this.user_id = localStorage.getItem('trip')
        // }
    },
    // load data from database before initialising map and mounting vue
    async created() {
        // get recommended locations from database
        await this.read_from_existing()
        // get group size from database
        await this.read_group_members()
    }
    
});
const vm = app.mount('#app'); 

// main js variables
let country_list = {
    "AED" : "AE",
    "AFN" : "AF",
    "XCD" : "AG",
    "ALL" : "AL",
    "AMD" : "AM",
    "ANG" : "AN",
    "AOA" : "AO",
    "AQD" : "AQ",
    "ARS" : "AR",
    "AUD" : "AU",
    "AZN" : "AZ",
    "BAM" : "BA",
    "BBD" : "BB",
    "BDT" : "BD",
    "XOF" : "BE",
    "BGN" : "BG",
    "BHD" : "BH",
    "BIF" : "BI",
    "BMD" : "BM",
    "BND" : "BN",
    "BOB" : "BO",
    "BRL" : "BR",
    "BSD" : "BS",
    "NOK" : "BV",
    "BWP" : "BW",
    "BYR" : "BY",
    "BZD" : "BZ",
    "CAD" : "CA",
    "CDF" : "CD",
    "XAF" : "CF",
    "CHF" : "CH",
    "CLP" : "CL",
    "CNY" : "CN",
    "COP" : "CO",
    "CRC" : "CR",
    "CUP" : "CU",
    "CVE" : "CV",
    "CYP" : "CY",
    "CZK" : "CZ",
    "DJF" : "DJ",
    "DKK" : "DK",
    "DOP" : "DO",
    "DZD" : "DZ",
    "ECS" : "EC",
    "EEK" : "EE",
    "EGP" : "EG",
    "ETB" : "ET",
    "EUR" : "FR",
    "FJD" : "FJ",
    "FKP" : "FK",
    "GBP" : "GB",
    "GEL" : "GE",
    "GGP" : "GG",
    "GHS" : "GH",
    "GIP" : "GI",
    "GMD" : "GM",
    "GNF" : "GN",
    "GTQ" : "GT",
    "GYD" : "GY",
    "HKD" : "HK",
    "HNL" : "HN",
    "HRK" : "HR",
    "HTG" : "HT",
    "HUF" : "HU",
    "IDR" : "ID",
    "ILS" : "IL",
    "INR" : "IN",
    "IQD" : "IQ",
    "IRR" : "IR",
    "ISK" : "IS",
    "JMD" : "JM",
    "JOD" : "JO",
    "JPY" : "JP",
    "KES" : "KE",
    "KGS" : "KG",
    "KHR" : "KH",
    "KMF" : "KM",
    "KPW" : "KP",
    "KRW" : "KR",
    "KWD" : "KW",
    "KYD" : "KY",
    "KZT" : "KZ",
    "LAK" : "LA",
    "LBP" : "LB",
    "LKR" : "LK",
    "LRD" : "LR",
    "LSL" : "LS",
    "LTL" : "LT",
    "LVL" : "LV",
    "LYD" : "LY",
    "MAD" : "MA",
    "MDL" : "MD",
    "MGA" : "MG",
    "MKD" : "MK",
    "MMK" : "MM",
    "MNT" : "MN",
    "MOP" : "MO",
    "MRO" : "MR",
    "MTL" : "MT",
    "MUR" : "MU",
    "MVR" : "MV",
    "MWK" : "MW",
    "MXN" : "MX",
    "MYR" : "MY",
    "MZN" : "MZ",
    "NAD" : "NA",
    "XPF" : "NC",
    "NGN" : "NG",
    "NIO" : "NI",
    "NPR" : "NP",
    "NZD" : "NZ",
    "OMR" : "OM",
    "PAB" : "PA",
    "PEN" : "PE",
    "PGK" : "PG",
    "PHP" : "PH",
    "PKR" : "PK",
    "PLN" : "PL",
    "PYG" : "PY",
    "QAR" : "QA",
    "RON" : "RO",
    "RSD" : "RS",
    "RUB" : "RU",
    "RWF" : "RW",
    "SAR" : "SA",
    "SBD" : "SB",
    "SCR" : "SC",
    "SDG" : "SD",
    "SEK" : "SE",
    "SGD" : "SG",
    "SKK" : "SK",
    "SLL" : "SL",
    "SOS" : "SO",
    "SRD" : "SR",
    "STD" : "ST",
    "SVC" : "SV",
    "SYP" : "SY",
    "SZL" : "SZ",
    "THB" : "TH",
    "TJS" : "TJ",
    "TMT" : "TM",
    "TND" : "TN",
    "TOP" : "TO",
    "TRY" : "TR",
    "TTD" : "TT",
    "TWD" : "TW",
    "TZS" : "TZ",
    "UAH" : "UA",
    "UGX" : "UG",
    "USD" : "US",
    "UYU" : "UY",
    "UZS" : "UZ",
    "VEF" : "VE",
    "VND" : "VN",
    "VUV" : "VU",
    "YER" : "YE",
    "ZAR" : "ZA",
    "ZMK" : "ZM",
    "ZWD" : "ZW"
}

// To generate drop down list for country currency

const dropList = document.querySelectorAll("form select");
// fromCurrency = document.querySelector(".from select"),
// toCurrency = document.querySelector(".to select"),
// getButton = document.querySelector("form button");

// dropdown list for activities
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "SGD" ? "selected" : "" : currency_code == "KRW" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

// loading Flag - activities
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}


       
export {vm}

// var location_coded = 
        //     { 
        //         "1": {
        //             "address": "273 Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
        //             "description": "",
        //             "latlng": {
        //             "lat": 37.5444,
        //             "lng": 127.0374
        //             },
        //             "name": "Seoul Forest Park, Ttukseom-ro, Seongdong-gu, Seoul, South Korea",
        //             "price": {
        //             "krw": 0,
        //             "sgd": 0
        //             },
        //             "tag": "Attraction",
        //             "votes_num": {
        //             "no": 1,
        //             "yes": 3,
        //             "yet_to_vote": 1
        //             },
        //             "votes_percentage": {
        //             "no": 20,
        //             "yes": 60,
        //             "yet_to_vote": 20
        //             }
        //         },
        //         "2":{
        //             "address": "105 Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
        //             "description": "",
        //             "latlng": {
        //             "lat": 37.5512,
        //             "lng": 126.9882
        //             },
        //             "name": "Seoul Tower, Namsangongwon-gil, Yongsan-gu, Seoul, South Korea",
        //             "price": {
        //             "krw": 12000,
        //             "sgd": 12
        //             },
        //             "tag": "Attraction",
        //             "votes_num": {
        //             "no": 1,
        //             "yes": 1,
        //             "yet_to_vote": 3
        //             },
        //             "votes_percentage": {
        //             "no": 20,
        //             "yes": 20,
        //             "yet_to_vote": 60
        //             }
        //         },
        //         "3":{
        //             "address": "405 Hangang-daero, Jung-gu, Seoul, South Korea",
        //             "description": "",
        //             "latlng": {
        //             "lat": 37.5561,
        //             "lng": 126.9719
        //             },
        //             "name": "Seoul Station Square, Hangang-daero, Jung-gu, Seoul, South Korea",
        //             "price": {
        //             "krw": 3000,
        //             "sgd": 3
        //             },
        //             "tag": "Food",
        //             "votes_num": {
        //             "no": 0,
        //             "yes": 4,
        //             "yet_to_vote": 1
        //             },
        //             "votes_percentage": {
        //             "no": 0,
        //             "yes": 80,
        //             "yet_to_vote": 20
        //             }
        //         },
        //         "4":{
        //             "address": "365-8 Seogyo-dong, Mapo-gu, Seoul, South Korea",
        //             "description": "",
        //             "latlng": {
        //             "lat": 37.5532,
        //             "lng": 126.9219
        //             },
        //             "name": "Hongdae Shopping Street",
        //             "price": {
        //             "krw": 25244.25,
        //             "sgd": 25
        //             },
        //             "tag": "Shopping",
        //             "votes_num": {
        //             "no": 0,
        //             "yes": 5,
        //             "yet_to_vote": 0
        //             },
        //             "votes_percentage": {
        //             "no": 0,
        //             "yes": 100,
        //             "yet_to_vote": 0
        //             }
        //         }
        //     };
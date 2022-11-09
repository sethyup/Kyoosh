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


const main = Vue.createApp({
    data(){
        return{
            locations  : { 
                "0": {
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
                    "votes": {
                        yes: ["SETH YAP ZIQI_", "kbang"],
                        no: ["adamft"],
                        yet_to_vote: ["name4", "name5"]
                    }
                    },
                    "1":{
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
                    "votes": {
                      yes: ["SETH YAP ZIQI_"],
                      no: ["adamft", "kbang", ],
                      yet_to_vote: ["name4", "name5"]
                    }
                    },
                    "2":{
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
                    "votes": {
                      yes: ["SETH YAP ZIQI_"],
                      no: ["adamft"],
                      yet_to_vote: ["kbang", "name4", "name5"]
                    }
                    },
                    "3":{
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
                    "votes": {
                      yes: ["SETH YAP ZIQI_"],
                      no: ["adamft", "name4"],
                      yet_to_vote: ["kbang", "name5"]
                    }
                }, 
                
            },

            spending: 0,
            selected_all: false,
            filter_tag: "",
            existing_locations: "",
            trip_id: "grad trip_adambft",

            // push selected activities into DB
            selected_activities: [],
        }
    },
    // computed:{
        // sort_by(){
        //     tag_list = []
        //     votes_list = []
        //     cost_list = []

        //     for (let i=0; i<Object.keys(this.locations).length; i++) {
        //         tag = this.locations[i].tag
        //         cost = this.locations[i].price.sgd
        //         votes = this.locations[i].votes.yes.length
        //         tag_id = [tag, i]
        //         tag_list.push(tag_id)

        //         votes_id = [votes, i]
        //         votes_list.push(votes_id)

        //         cost_id = [cost, i]
        //         cost_list.push


                

        //         if(!tag_list.includes(tag)){
        //             tag_list.push(tag)
        //         }
        //         if(!votes_list.includes(votes)){
        //             votes_list.push(votes)
        //         }
        //         if(!cost_list.includes(cost)){
        //             cost_list.push(cost)
        //         }
        //     }
            // sort current tags/votes/cost
            // tag_list = tag_list.sort()
            // votes_list = votes_list.sort(function(a, b){return b-a})
            // cost_list = cost_list.sort(function(a, b){return a-b})

            // console.log(this.locations)
            // console.log(tag_list)
            // console.log(votes_list)
            // console.log(cost_list)

            // new_location = (this.locations).sort((a, b) => (a.price.sgd > b.price.sgd) ? 1 : -1)
            // console.log(new_location)
    //     }
    // },
    methods:{
        calculate_votes_percentage(location){
            var num_yes = location.votes.yes.length
            var total_num = location.votes.yes.length + location.votes.no.length + location.votes.yet_to_vote.length
            return num_yes/total_num * 100
        },

        select_all(){
            // haven't select all
            console.log("====START selectall ===")
            if(this.selected_all == false){
                this.selected_activities = Object.keys(this.locations)
                this.selected_all = true
                this.calculate_spending()
                // var items = document.getElementsByName('atv');
                // console.log(items)
                // this.selected_activities = []
                // for (var i = 0; i < items.length; i++) {
                //     if (items[i].type == 'checkbox')
                //         items[i].checked = true;
                //         this.selected_activities.push(items)
                // }
                // this.selected_all = true;
                // return this.calculate_spending()
            }
            // selected all --> unselect all
            else{
                this.selected_activities = []
                this.selected_all = false
                this.spending = 0
            }

            // selected all 
            // else if (this.selected_all){
            //     var items = document.getElementsByName('atv');
            //     for (var i = 0; i < items.length; i++) {
            //         if (items[i].type == 'checkbox')
            //             items[i].checked = false;
            //     }
            //     this.selected_all = false;
            //     this.selected_activities = []
            //     return this.calculate_spending()
            // }
            

        },
        calculate_spending(){
            console.log("==== START FUNCTION +++++")
            this.spending = 0
            for (let i=0; i< this.selected_activities.length; i++) {
                index = this.selected_activities[i]
                this.spending += this.locations[index].price.sgd
                console.log(this.locations[index].price.sgd)
                // this.spending += Number(this.selected_activities[i])
            };
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
        // compareValues(key, order = 'asc') {
        //     return function innerSort(a, b) {
        //       if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        //         // property doesn't exist on either object
        //         return 0;
        //       }
          
        //       const varA = (typeof a[key] === 'string')
        //         ? a[key].toUpperCase() : a[key];
        //       const varB = (typeof b[key] === 'string')
        //         ? b[key].toUpperCase() : b[key];
          
        //       let comparison = 0;
        //       if (varA > varB) {
        //         comparison = 1;
        //       } else if (varA < varB) {
        //         comparison = -1;
        //       }
        //       return (
        //         (order === 'desc') ? (comparison * -1) : comparison
        //       );
        //     };
        //     // console.log(this.calculate_list[1])
        // }
        
    },
    // retrieve data from database onload
    async created() {
      await this.read_from_existing_locations()
    }
})

main.mount("#main")
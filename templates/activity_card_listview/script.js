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
        // retrieve from database
      //   locations  : { 
      //     "1": {
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
      //         "2":{
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
      //           no: ["adamft", "kbang" ],
      //           yet_to_vote: ["name4", "name5"]
      //         }
      //         },
      //         "3":{
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
      //         "4":{
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
        //HARD-CODED
        user_name: "kbang",
        trip_id: "kbang bangkok bangbongurjfjwowskdorrofkckshecoejfnekkbang@yahoocom",
        existing_locations: "",
        current_id: "",
        // display details
        edit_true: false,
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
        }
    },
    methods:{
        // progess bar methods
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
        user_reject(votes, idx){
            // number of members = 5
            // if voted yes before
            if(!votes.no.includes(this.user_name)){
            if(votes.yes.includes(this.user_name)){
              votes.no.push(this.user_name)

              votes.yes.splice(votes.yes.indexOf(this.user_name),1)
            }
            // never place vote before
            else{
              votes.no.push(this.user_name)
              votes.yet_to_vote.splice(votes.yet_to_vote.indexOf(this.user_name),1)
            }
          }
          //update tooltip
            // var tooltip_no = bootstrap.Tooltip.getInstance('#progress_no'+idx);
            // tooltip_no.setContent({ '.tooltip-inner': String(votes.no.length) });
            // console.log(votes.no.length)
            // var tooltip_yes = bootstrap.Tooltip.getInstance('#progress_yes' + idx);
            // tooltip_yes.setContent({ '.tooltip-inner': String(votes.yes.length) });

            // var tooltip_maybe = bootstrap.Tooltip.getInstance('#progress_maybe' + idx);
            // tooltip_maybe.setContent({ '.tooltip-inner': String(votes.yet_to_vote.length) });
        },
        user_accept(votes, idx){
        // if voted no before
        if(!votes.yes.includes(this.user_name)){
          if(votes.no.includes(this.user_name)){
            votes.yes.push(this.user_name)

            votes.no.splice(votes.no.indexOf(this.user_name),1)
          }
          // never place vote before
          else{
            votes.yes.push(this.user_name)
            votes.yet_to_vote.splice(votes.yes.indexOf(this.user_name),1)
          }
        }},
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
        // read existing locations from the database
        read_from_existing_locations() {
          const data_to_be_read = ref(db, `trips/${this.trip_id}/activities`);
          onValue(data_to_be_read, (snapshot) => {
              const data = snapshot.val();
              //check if there is existing data on db
              if (data) {
                  this.existing_locations = data
                  // console.log(data)
              }
              //retrieve recommended places for new trips
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
        // update existing data
        create_update_data() {
            // create new object
            var new_obj = {
              address: this.selected_address,
              description: this.selected_description,
              latlng: this.selected_latlng,
              name: this.selected_name,
              tag: this.tag_input,
              
          }

          // check for empty strings
          
          if (this.amount == "") {
              this.amount = 0
          }
          if (this.amount == "") {
              this.converted_amount = 0
          }
          // update price
          new_obj.price = {
              krw: this.converted_amount,
              sgd: this.amount,
          }

          // settle voting
          if (!this.no) {
              this.no = []
          }
          if (!this.yes) {
              this.yes = []
          }
          if (!this.yet_to_vote) {
              this.yet_to_vote = []
          }
          // update votes
          new_obj.votes = { 
              no: this.no, 
              yes: this.yes, 
              yet_to_vote: this.yet_to_vote
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
        set_edit(id) {
            if (this.edit_true == false) {
              // console.log(id)
              this.edit_true = true
              this.current_id = id
              // console.log(obj.querySelector(`div id="get_marker_id"`).innerText)
              // console.log(`${vm_vue.vm.$data.current_id} this is from set_edit`)
              this.retrieve_edit_activity_info(this.current_id)
          } else {
              this.edit_true = false
          }
        }
    },
    async created() {
      await this.read_from_existing_locations()
    }
  })

const vm = main.mount("#main")


// SCRIPT TO ALLOW TOOLTIP TO WORK
// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// })

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, {
  container: '.container-fluid',
  boundary: document.body
}));
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
// const tooltip = new bootstrap.Tooltip('#example', {
//   boundary: document.body // or document.querySelector('#boundary')
// })
// const exampleEl = document.getElementById('main')
// const tooltip = new bootstrap.Tooltip(exampleEl, options)
// const tooltip = new bootstrap.Tooltip('#main', {
//   boundary: document.body // or document.querySelector('#boundary')
// })

// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
// return new bootstrap.Tooltip(tooltipTriggerEl,{
//     container: '.container-fluid',
//     boundary: document.body
//  });
// });

// $(document).ready(function(){
//   $('[data-bs-toggle="tooltip"]').tooltip()
// })


export {vm}


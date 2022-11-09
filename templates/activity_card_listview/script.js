const main = Vue.createApp({
    data(){
      return{
        // retrieve from database
        locations  : { 
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
              "votes": {
                  yes: ["SETH YAP ZIQI_", "kbang"],
                  no: ["adamft"],
                  yet_to_vote: ["name4", "name5"]
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
              "votes": {
                yes: ["SETH YAP ZIQI_"],
                no: ["adamft", "kbang" ],
                yet_to_vote: ["name4", "name5"]
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
              "votes": {
                yes: ["SETH YAP ZIQI_"],
                no: ["adamft"],
                yet_to_vote: ["kbang", "name4", "name5"]
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
              "votes": {
                yes: ["SETH YAP ZIQI_"],
                no: ["adamft", "name4"],
                yet_to_vote: ["kbang", "name5"]
              }
          }, 
          
      },
      //HARD-CODED
      user_name: "kbang",
      }
    },
    methods:{
        get_total_users(){
          all_votes = this.locations["1"].votes
          total_users = all_votes.yes.length + all_votes.no.length + all_votes.yet_to_vote.length
          console.log(this.get_total_users)
          return total_users
        },
        get_yes_num(votes){
          console.log(typeof String(votes.yes.length))
          return String(votes.yes.length)
        },
        get_no_num(votes){
          // console.log(votes.no.length)
          return String(votes.no.length)
        },
        get_yet_to_vote_num(votes){
          // console.log(votes.yet_to_vote.length)
          return String(votes.yet_to_vote.length)
        },
        get_yes_percentage(votes){
          // console.log(votes.yes.length)
          return (votes.yes.length)*100/this.get_total_users()
        },
        get_no_percentage(votes){
          // console.log(votes.no.length)
          return (votes.no.length)*100/this.get_total_users()
        },
        get_yet_to_vote_percentage(votes){
          // console.log(votes.yet_to_vote.length)
          return (votes.yet_to_vote.length)*100/this.get_total_users()
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
            var tooltip_no = bootstrap.Tooltip.getInstance('#progress_no'+idx);
            tooltip_no.setContent({ '.tooltip-inner': String(votes.no.length) });
            console.log(votes.no.length)
            var tooltip_yes = bootstrap.Tooltip.getInstance('#progress_yes' + idx);
            tooltip_yes.setContent({ '.tooltip-inner': String(votes.yes.length) });

            var tooltip_maybe = bootstrap.Tooltip.getInstance('#progress_maybe' + idx);
            tooltip_maybe.setContent({ '.tooltip-inner': String(votes.yet_to_vote.length) });
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
        }
            // update tooltip
            var tooltip_no = bootstrap.Tooltip.getInstance('#progress_no'+ idx);
            tooltip_no.setContent({ '.tooltip-inner': String(votes.no.length) });
            console.log("#progress_no" + idx)
            var tooltip_yes = bootstrap.Tooltip.getInstance('#progress_yes'+ idx);
            tooltip_yes.setContent({ '.tooltip-inner': String(votes.yes.length) });

            var tooltip_maybe = bootstrap.Tooltip.getInstance('#progress_maybe'+ idx);
            tooltip_maybe.setContent({ '.tooltip-inner': String(votes.yet_to_vote.length)});
        }, 
    }
  })

main.mount("#main")


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





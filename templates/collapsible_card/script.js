const main = Vue.createApp({
    data(){
        return{
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
                }}

    }
    },
    methods:{

    }
})

main.mount("#main")

// SCRIPT TO ALLOW TOOLTIP TO WORK
// const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})
// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
//   return new bootstrap.Tooltip(tooltipTriggerEl)
// })

// const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
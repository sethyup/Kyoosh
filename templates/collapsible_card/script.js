const main = Vue.createApp({
    data(){
        return{
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
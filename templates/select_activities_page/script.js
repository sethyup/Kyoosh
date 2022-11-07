const main = Vue.createApp({
    data(){
        return{
            selected_all: false,
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
                }, 
                
            },
            total_price_list: [],
            spending: 0,

        }
    },
    methods:{
        select_all(){
            // haven't select all
            console.log("====START selectall ===")
            if(this.selected_all == false){
                var items = document.getElementsByName('atv');

                this.total_price_list = []
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type == 'checkbox')
                        items[i].checked = true;
                        this.total_price_list.push(items[i].value)
                }
                this.selected_all = true;
                return this.calculate_spending()
            }

            // selected all 
            else if (this.selected_all){
                var items = document.getElementsByName('atv');
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type == 'checkbox')
                        items[i].checked = false;
                }
                this.selected_all = false;
                this.total_price_list = []
                return this.calculate_spending()
            }
            

        },
        calculate_spending(){
            console.log("==== START FUNCTION +++++")
            this.spending = 0
            for (let i=0; i< this.total_price_list.length; i++) {
                this.spending += Number(this.total_price_list[i])
            };
        }
        


    }
})

main.mount("#main")
const main = Vue.createApp({
    data(){
        return{
            selected_all: false,
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
                    ],

        }
    },
    methods:{
        select_all(){
            // haven't select all
            if(this.selected_all == false){
                var items = document.getElementsByName('atv');
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type == 'checkbox')
                        items[i].checked = true;
                }

                this.selected_all = true;
            }

            // selected all 
            else if (this.selected_all){
                var items = document.getElementsByName('atv');
                for (var i = 0; i < items.length; i++) {
                    if (items[i].type == 'checkbox')
                        items[i].checked = false;
                }
                this.selected_all = false;
            }
            

        }

    }
})

main.mount("#main")
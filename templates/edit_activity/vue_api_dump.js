// use vue + api to autofill currency exchange amount
const main = Vue.createApp({
    data(){
      return{
        amount: "", 
        from: "SGD", 
        to: "KRW", 
        converted_amount: "",
        api_key: "wjnJhKhIK8qWrTVQ2YILd5wpxuyRGSP2",

      }
    },
    methods:{
        calculate_to_from() {
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
        }

    }
  })

main.mount("#main")

// use vue to autofill and create new tags
const main2 = Vue.createApp({
    data(){
      return{
        tags: ["Shopping", "Museum", "Food", "Attraction", "Sports", "Theme Park", "Camping", "Hiking", "Aquarium", "Zoo", "Tour", "Cruise"],     
        tag_input: "",

      }
    },
    methods:{
        
        

    }
  })
main2.mount("#main2")
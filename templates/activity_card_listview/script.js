const main = Vue.createApp({
    data(){
      return{
        // retrieve from database
        voted_yes: "20",
        voted_no: "0",
        yet_to_vote: "80",
        place_yes: false,
        place_no: false,
      }
    },
    methods:{
        user_reject(){
            // if voted yes before
            if(this.place_vote){
                let percentage = (1/5)*100
                this.voted_no = Number(this.voted_no) + percentage
                this.voted_yes = Number(this.voted_yes) - percentage
            }
            // never place vote before
            else{
                this.place_vote = true;
                let percentage = (1/5)*100
                this.voted_no = Number(this.voted_no) + percentage
                this.yet_to_vote = Number(this.yet_to_vote) - percentage
            }


        }
    }
  })

main.mount("#main")
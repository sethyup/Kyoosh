const main = Vue.createApp({
    data(){
      return{
        // retrieve from database
        //YES
        voted_yes_percentage: "20",
        voted_yes_people: "1",
        //NO
        voted_no_percentage: "20",
        voted_no_people: "1",
        //YET TO VOTE
        yet_to_vote_percentage: "60",
        yet_to_vote_people: "3",

        place_yes: false,
        place_no: false,


      }
    },
    methods:{
        user_reject(){
            // number of members = 5
            // if voted yes before
            if(this.place_no == false && this.place_yes == true){
                this.place_yes = false
                this.place_no = true
                let percentage = (1/5)*100
                // Change percentage
                this.voted_no_percentage = Number(this.voted_no_percentage) + percentage
                this.voted_yes_percentage = Number(this.voted_yes_percentage) - percentage
                // Change number
                this.voted_no_people = String(Number(this.voted_no_people) + 1)
                this.voted_yes_people = String(Number(this.voted_yes_people) - 1)

            }
            // never place vote before
            else if(this.place_no == false && this.place_yes==false){
                this.place_no = true
                let percentage = (1/5)*100
                //Change percentage
                this.voted_no_percentage = Number(this.voted_no_percentage) + percentage
                this.yet_to_vote_percentage = Number(this.yet_to_vote_percentage) - percentage
                // Change number 
                this.voted_no_people = String(Number(this.voted_no_people) + 1)
                this.yet_to_vote_people = String(Number(this.yet_to_vote_people) - 1)

            }

            var tooltip_no = bootstrap.Tooltip.getInstance('#progress_no');
            tooltip_no.setContent({ '.tooltip-inner': this.voted_no_people });

            var tooltip_yes = bootstrap.Tooltip.getInstance('#progress_yes');
            tooltip_yes.setContent({ '.tooltip-inner': this.voted_yes_people });

            var tooltip_maybe = bootstrap.Tooltip.getInstance('#progress_maybe');
            tooltip_maybe.setContent({ '.tooltip-inner': this.yet_to_vote_people });

            


        },

        user_accept(){
            // if voted no before
            if(this.place_no == true && this.place_yes == false){
                this.place_yes = true
                this.place_no = false
                let percentage = (1/5)*100
                // Change percentage
                this.voted_yes_percentage = Number(this.voted_yes_percentage) + percentage
                this.voted_no_percentage = Number(this.voted_no_percentage) - percentage
                // Change number
                this.voted_no_people = String(Number(this.voted_no_people) - 1)
                this.voted_yes_people = String(Number(this.voted_yes_people) + 1)
            }
            // never place vote before
            else if(this.place_no == false && this.place_yes==false){
                this.place_yes = true
                let percentage = (1/5)*100
                // Change percentage
                this.voted_yes_percentage = Number(this.voted_yes_percentage) + percentage
                this.yet_to_vote_percentage = Number(this.yet_to_vote_percentage) - percentage
                // Change number
                this.voted_yes_people = String(Number(this.voted_yes_people) + 1)
                this.yet_to_vote_people = String(Number(this.yet_to_vote_people) - 1)
            }

            var tooltip_no = bootstrap.Tooltip.getInstance('#progress_no');
            tooltip_no.setContent({ '.tooltip-inner': this.voted_no_people });

            var tooltip_yes = bootstrap.Tooltip.getInstance('#progress_yes');
            tooltip_yes.setContent({ '.tooltip-inner': this.voted_yes_people });

            var tooltip_maybe = bootstrap.Tooltip.getInstance('#progress_maybe');
            tooltip_maybe.setContent({ '.tooltip-inner': this.yet_to_vote_people });
        }
    }
  })

main.mount("#main")


// SCRIPT TO ALLOW TOOLTIP TO WORK
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})






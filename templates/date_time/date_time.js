// // 1) API endpoint
// let api_endpoint_url = "https://timezone.abstractapi.com/v1/current_time/?api_key=ffc998ad9ddc4166a4fcbbdb7da17aa3&location=Singapore"

// // 2) Use Axios to call API asynchronously
// axios.get(api_endpoint_url)
// .then(response => {
//     console.log(response.data)
// })
// .catch(error=> {
//     // In case of any error, see what it's about
//     console.log(error.message)
// })

// VUE APP ------------------------------------------------------------------------------
var datetime_app = Vue.createApp({
    data() {
        return {
            depart_datetime: "",
            depart_tz: "",

            arrive_datetime: "",
            arrive_tz: "",

            duration_hours: 0,
            duration_minutes: 0,

            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            curr_user_datetime: "",
        }
    },

    methods: {
        log_everything(thing) {
            console.log("")
            console.log("LOGGING EVERTHING ---------------")

            console.log("depart_datetime:", this.depart_datetime)
            console.log("depart_tz:", this.depart_tz)
            console.log("arrive_datetime:", this.arrive_datetime)
            console.log("arrive_tz:", this.arrive_tz)
            console.log("duration_hours:", this.duration_hours)
            console.log("duration_minutes:", this.duration_minutes)

            console.log("LOGGED EVERYTHING----------------")
            console.log("")
        },

        verify_hour() {
            if (this.duration_hours == "") {
                this.duration_hours = 0
            } else {
                this.duration_hours = this.duration_hours.toFixed()
            }

            if (this.duration_hours < 0) {
                this.duration_hours = 0
            }
        },

        verify_minite() {
            if (this.duration_minutes == "") {
                this.duration_minutes = 0
            } else {
                this.duration_minutes = this.duration_minutes.toFixed()
            }

            if (this.duration_minutes < 0) {
                this.duration_minutes = 0
            } else if (this.duration_minutes >= 60) {
                this.duration_minutes = 59
            }
        },

        update_datetimes(caller_event) {
            let elem_calling = caller_event.path[0].getAttribute("datetime_obj")
            console.log(elem_calling)

            if (elem_calling == "duration-flight") {
                //GOAL: Update arrival datetime
                
                //fill in fields that are not filled ----------------------------------------
                if (this.depart_datetime == "") {
                    console.log("setting depart datetime")
                    this.depart_datetime = this.curr_user_datetime
                    console.log(this.depart_datetime)

                    let temp_fp_obj = flatpickr("#departure_datetime_i9w2", datetime_config)

                    temp_fp_obj.setDate(this.curr_user_datetime)
                }
                
                if (this.depart_tz == "") {
                    this.depart_tz = this.user_timezone
                }

                if (this.arrive_tz == "") {
                    this.arrive_tz = this.user_timezone
                }

                // initialize variables ----------------------------------------------------
                let depart_time = this.depart_datetime
                let depart_tz = this.depart_tz
                let arrive_tz = this.arrive_tz
                let duration_minutes_total = Number(this.duration_hours*60) + Number(this.duration_minutes)

                // create depart and arrive Date objects -----------------------------------
                // format: 2022-10-05 12:00
                let arr_depart_datetime = depart_time.split(" ")
                let datetime_date_arr = arr_depart_datetime[0].split("-")
                let datetime_h_min_arr = arr_depart_datetime[1].split(":")

                let depart_date_obj = new Date(datetime_date_arr[0], datetime_date_arr[1], datetime_date_arr[2], datetime_h_min_arr[0], datetime_h_min_arr[1])

                let arrive_date_obj = new Date(depart_date_obj.getTime() + duration_minutes_total*60000)

                console.log(depart_date_obj)
                console.log(arrive_date_obj)
            }
        }
    },

    created() {
        console.log("CREATING ---------------------------")
        const time_elapsed = Date.now()
        let current_date = new Date(time_elapsed)

        let curr_datetime_temp = `${current_date.getFullYear()}-${("0" + (current_date.getMonth() + 1)).slice(-2)}-${("0" + (current_date.getDate())).slice(-2)} ${("0" + (current_date.getHours())).slice(-2)}:${("0" + (current_date.getMinutes())).slice(-2)}`

        this.curr_user_datetime = curr_datetime_temp
        console.log(this.curr_user_datetime)
        console.log("DONE CREATING ----------------------")
    }
})

datetime_app.mount('#datetime_app')


// functions for buttons ------------------------------------------------------
function get_val() {
    console.log(document.getElementById("datetime_test").value)
}

function get_date() {
    console.log(document.getElementById("date_test").value)
}

// FLATPICKR CONFIG SETTINGS -----------------------------------------------------------------
let datetime_config = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    altInput: true,
    altFormat: "J F y (h:i K)",
    disableMobile: "true",
}

let date_config = {
    altInput: true,
    altFormat: "J F Y",
    disableMobile: "true"
}

// datetime
let datetime_fp_obj = flatpickr("input[type=datetime-local]", datetime_config);

// date only
let date_fp_obj = flatpickr("input[type=date]", date_config)
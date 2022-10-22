// const options = {
//     method: 'GET',
//     url: 'https://airport-info.p.rapidapi.com/airport',
//     params: {iata: 'ICN'},
//     headers: {
//         'X-RapidAPI-Key': '2fdc59c26emsh514b42b5ad07ad9p12ae1ejsnd3ecee539782',
//         'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
//     }
// };

// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

const AbstractAPI_Key = "ffc998ad9ddc4166a4fcbbdb7da17aa3"

async function convert_timezone(base_local, target_local, base_datetime, API_key) {
    // console.log()
    // console.log("CALLING API ---------------")

    // console.log("base_local:", base_local)
    // console.log("target_local:", target_local)
    // console.log("base_datetime:", base_datetime)
    // console.log("API_key:", API_key)

    try {
        // 1) API endpoint
        let api_endpoint_url = `https://timezone.abstractapi.com/v1/convert_time?api_key=${API_key}&base_location=${base_local}&base_datetime=${base_datetime}&target_location=${target_local}`
    
        // Return response
        let response = await axios.get(api_endpoint_url)
        return response.data
    } catch(error) {
        console.log(`ERROR: ${error}`)
    }
}

function convert_date_obj_to_str(date_obj) {
    console.log("")
    console.log("CALLING convert_date_obj_to_str() ---------------")

    console.log("date_obj (input):", date_obj)

    return `${date_obj.getFullYear()}-${("0" + (date_obj.getMonth()+1)).slice(-2)}-${("0" + (date_obj.getDate())).slice(-2)} ${("0" + (date_obj.getHours())).slice(-2)}:${("0" + (date_obj.getMinutes())).slice(-2)}`
}

function convert_datetime_str_to_date_obj(datetime_str) {
    // format: 2022-10-05 12:00
    let arr_depart_datetime = datetime_str.split(" ")
    let datetime_date_arr = arr_depart_datetime[0].split("-")
    let datetime_h_min_arr = arr_depart_datetime[1].split(":")

    let new_date_obj = new Date(datetime_date_arr[0], Number(datetime_date_arr[1])-1, datetime_date_arr[2], datetime_h_min_arr[0], datetime_h_min_arr[1])

    return new_date_obj
}

// functions for buttons ------------------------------------------------------
function get_val() {
    console.log(document.getElementById("datetime_test").value)
}

function get_date() {
    console.log(document.getElementById("date_test").value)
}

// VUE APP ------------------------------------------------------------------------------
var datetime_app = Vue.createApp({
    data() {
        return {
            depart_datetime: "",
            depart_country: "",
            depart_tz: "Singapore Standard Time",

            arrive_datetime: "",
            arrive_country: "",
            arrive_tz: "Singapore Standard Time",

            duration_hours: 0,
            duration_minutes: 0,

            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            curr_user_datetime: "",

            //dropdown of countries
            all_countries:[
                "Afghanistan", "Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
            ],

            //Animations
            dropdown_open: false,

            //Currency conversion
            amount: "", 
            from: "SGD", 
            to: "KRW", 
            converted_amount: "",
            api_key: "wjnJhKhIK8qWrTVQ2YILd5wpxuyRGSP2",
        }
    },

    methods: {
        log_everything(thing) {
            console.log("")
            console.log("LOGGING EVERTHING ---------------")

            console.log("depart_datetime:", this.depart_datetime)
            console.log("depart_country:", this.depart_country)
            console.log("arrive_datetime:", this.arrive_datetime)
            console.log("arrive_country:", this.arrive_country)
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

        toggle_dropdown() {
            this.dropdown_open = !this.dropdown_open
        },

        async update_arrival_time() {
            // fill in fields that are not filled ----------------------------------------
                // Setting: depart time
            if (this.depart_datetime == "") {
                this.depart_datetime = this.curr_user_datetime

                departure_fp_obj.setDate(this.curr_user_datetime)
            }
            
                // Setting: depart country
            if (this.depart_country == "") {
                this.depart_country = this.user_timezone
            }

                // Setting: arrive country
            if (this.arrive_country == "") {
                this.arrive_country = this.user_timezone
            }

            // initialize variables ----------------------------------------------------
            let depart_time = this.depart_datetime
            let depart_country = this.depart_country
            let arrive_country = this.arrive_country
            let duration_minutes_total = Number(this.duration_hours*60) + Number(this.duration_minutes)

            // create depart and arrive Date objects -----------------------------------
            let depart_date_obj = convert_datetime_str_to_date_obj(depart_time)

            let arrive_date_obj = new Date(depart_date_obj.getTime() + duration_minutes_total*60000)

            // find arrival datetime in destination country's timezone
            let arrive_datetime_base = convert_date_obj_to_str(arrive_date_obj)

            let convert_timezone_data = await convert_timezone(depart_country, arrive_country, arrive_datetime_base, AbstractAPI_Key)

            arrival_fp_obj.setDate(convert_timezone_data.target_location.datetime)

            this.depart_tz = convert_timezone_data.base_location.timezone_abbreviation
            this.arrive_tz = convert_timezone_data.target_location.timezone_abbreviation
        },

        async update_flight_duration() {
            // fill in fields that are not filled ----------------------------------------
                // Setting: depart time
            if (this.depart_datetime == "") {
                this.depart_datetime = this.curr_user_datetime

                departure_fp_obj.setDate(this.curr_user_datetime)
            }
            
                // Setting: depart country
            if (this.depart_country == "") {
                this.depart_country = this.user_timezone
            }

                // Setting: arrive time
            if (this.arrive_datetime == "") {
                this.arrive_datetime = this.curr_user_datetime

                arrival_fp_obj.setDate(this.curr_user_datetime)
            }

                // Setting: arrive country
            if (this.arrive_country == "") {
                this.arrive_country = this.user_timezone
            }

            // initialize variables
            let depart_time = this.depart_datetime
            let depart_country = this.depart_country
            let arrive_time = this.arrive_datetime
            let arrive_country = this.arrive_country
            //let duration_minutes_total = Number(this.duration_hours*60) + Number(this.duration_minutes)

            let convert_timezone_data = await convert_timezone(arrive_country, depart_country, arrive_time, AbstractAPI_Key)

            let arrival_time_w_departure_base = await convert_timezone_data.target_location.datetime

            let depart_date_obj = convert_datetime_str_to_date_obj(depart_time)
            let arrive_date_obj = convert_datetime_str_to_date_obj(arrival_time_w_departure_base)

            let diff_in_minutes = (arrive_date_obj - depart_date_obj) / 1000 / 60

            let flight_dur_hour
            let flight_dur_mins

            if (diff_in_minutes<0) {
                flight_dur_hour = 0
                flight_dur_mins = 0
            } else {
                flight_dur_hour = Math.floor(diff_in_minutes/60)
                flight_dur_mins = Math.round(diff_in_minutes%60)
            }

            this.duration_hours = flight_dur_hour
            this.duration_minutes = flight_dur_mins

            this.depart_tz = convert_timezone_data.target_location.timezone_abbreviation
            this.arrive_tz = convert_timezone_data.base_location.timezone_abbreviation
        },

        update_datetimes(caller_event) {
            console.log("update_datetimes called -------------")
            this.log_everything()


            let elem_calling = caller_event.path[0].getAttribute("datetime_obj")
            console.log(elem_calling)

            // if (elem_calling == "duration-flight") {
            //     this.update_arrival_time()
            // } else if (["depart-country-flight", "depart-dt-flight"].includes(elem_calling) && (this.duration_hours + this.duration_minutes) > 0) {
            //     this.update_arrival_time()
            // } else if (elem_calling == "arrive-country-flight") {
            //     this.update_arrival_time()
            // } else if (elem_calling == "arrive-dt-flight") {
            //     this.update_flight_duration()
            // }

            if (this.depart_datetime!="" && this.depart_country!="" && this.arrive_datetime!="" && this.arrive_country!="") {
                console.log("UPDATING")
                this.update_flight_duration()
            } else {
                console.log("CANNOT UPDATE :(")
                this.duration_hours = 0
                this.duration_minutes = 0
            }
        },

        //currency methods
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
    },

    created() {
        console.log("CREATING ---------------------------")
        const time_elapsed = Date.now()
        let current_date = new Date(time_elapsed)

        let curr_datetime_temp = convert_date_obj_to_str(current_date)

        this.curr_user_datetime = curr_datetime_temp
        console.log(this.curr_user_datetime)
        console.log("DONE CREATING ----------------------")
    }
})

datetime_app.mount('#datetime_app')

// FLATPICKR CONFIG SETTINGS -----------------------------------------------------------------
let datetime_config = {
    enableTime: true,
    dateFormat: "Y-m-d H:i",
    altInput: true,
    altFormat: "J M y (h:i K)",
    disableMobile: "true",
}

let date_config = {
    altInput: true,
    altFormat: "J M y",
    disableMobile: "true"
}

// FLatpickr objects ----------------------------------------------------------------------
let departure_fp_obj = flatpickr("#departure_datetime_i9w2", datetime_config)
let arrival_fp_obj = flatpickr("#arrival_datetime_i9w2", datetime_config)

// datetime
let datetime_fp_obj = flatpickr("input[type=datetime-local]", datetime_config);

// date only
let date_fp_obj = flatpickr("input[type=date]", date_config)
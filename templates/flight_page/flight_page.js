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
    console.log(`=== [START] convert_datetime_str_to_date_obj() ===`)
    
    
    // format: 2022-10-05 12:00
    let arr_depart_datetime = datetime_str.split(" ")
    let datetime_date_arr = arr_depart_datetime[0].split("-")
    let datetime_h_min_arr = arr_depart_datetime[1].split(":")
    
    let new_date_obj = new Date(datetime_date_arr[0], Number(datetime_date_arr[1])-1, datetime_date_arr[2], datetime_h_min_arr[0], datetime_h_min_arr[1])
    
    console.log(`=== [END] convert_datetime_str_to_date_obj() ===`)
    return new_date_obj
}

// DATABASE STUFF
// Importing Firebase API
// DO NOT EDIT
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getDatabase, ref, onValue, get, push, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

// Our Firebase Project Configuration
const WADTravel = initializeApp({
    apiKey: "AIzaSyCR5RtPZexqY6jCbDZsaYzyUpVE_q8vzMc",
    authDomain: "wad-brothers-travel-ltd.firebaseapp.com",
    databaseURL: "https://wad-brothers-travel-ltd-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "wad-brothers-travel-ltd",
    storageBucket: "wad-brothers-travel-ltd.appspot.com",
    messagingSenderId: "305280551700",
    appId: "1:305280551700:web:434cc190d57eabe14d1001",
    measurementId: "G-3XQT4098KL"
})
const db = getDatabase(WADTravel)

// VUE APP ------------------------------------------------------------------------------
var flight_app = Vue.createApp({
    data() {
        return {
            depart_datetime: "",
            depart_country: "",
            depart_tz: "",

            arrive_datetime: "",
            arrive_country: "",
            arrive_tz: "",

            duration_hours: 0,
            duration_minutes: 0,

            price: "",
            currency: "SGD",

            airline: "",
            flight_no: "",
            airport: "",
            terminal: "",
            gate: "",

            create_new_flight: false,
            edit_existing_flight: false,
            updating_calendars: false,
            error_message: "",

            user_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            curr_user_datetime: "",

            //dropdown of countries
            all_countries:[
                "Afghanistan", "Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia & Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre & Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts & Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad & Tobago","Tunisia","Turkey","Turkmenistan","Turks & Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
            ],

            //dropdown of currencies
            country_list: {
                "AED" : "AE",
                "AFN" : "AF",
                "XCD" : "AG",
                "ALL" : "AL",
                "AMD" : "AM",
                "ANG" : "AN",
                "AOA" : "AO",
                "AQD" : "AQ",
                "ARS" : "AR",
                "AUD" : "AU",
                "AZN" : "AZ",
                "BAM" : "BA",
                "BBD" : "BB",
                "BDT" : "BD",
                "XOF" : "BE",
                "BGN" : "BG",
                "BHD" : "BH",
                "BIF" : "BI",
                "BMD" : "BM",
                "BND" : "BN",
                "BOB" : "BO",
                "BRL" : "BR",
                "BSD" : "BS",
                "NOK" : "BV",
                "BWP" : "BW",
                "BYR" : "BY",
                "BZD" : "BZ",
                "CAD" : "CA",
                "CDF" : "CD",
                "XAF" : "CF",
                "CHF" : "CH",
                "CLP" : "CL",
                "CNY" : "CN",
                "COP" : "CO",
                "CRC" : "CR",
                "CUP" : "CU",
                "CVE" : "CV",
                "CYP" : "CY",
                "CZK" : "CZ",
                "DJF" : "DJ",
                "DKK" : "DK",
                "DOP" : "DO",
                "DZD" : "DZ",
                "ECS" : "EC",
                "EEK" : "EE",
                "EGP" : "EG",
                "ETB" : "ET",
                "EUR" : "FR",
                "FJD" : "FJ",
                "FKP" : "FK",
                "GBP" : "GB",
                "GEL" : "GE",
                "GGP" : "GG",
                "GHS" : "GH",
                "GIP" : "GI",
                "GMD" : "GM",
                "GNF" : "GN",
                "GTQ" : "GT",
                "GYD" : "GY",
                "HKD" : "HK",
                "HNL" : "HN",
                "HRK" : "HR",
                "HTG" : "HT",
                "HUF" : "HU",
                "IDR" : "ID",
                "ILS" : "IL",
                "INR" : "IN",
                "IQD" : "IQ",
                "IRR" : "IR",
                "ISK" : "IS",
                "JMD" : "JM",
                "JOD" : "JO",
                "JPY" : "JP",
                "KES" : "KE",
                "KGS" : "KG",
                "KHR" : "KH",
                "KMF" : "KM",
                "KPW" : "KP",
                "KRW" : "KR",
                "KWD" : "KW",
                "KYD" : "KY",
                "KZT" : "KZ",
                "LAK" : "LA",
                "LBP" : "LB",
                "LKR" : "LK",
                "LRD" : "LR",
                "LSL" : "LS",
                "LTL" : "LT",
                "LVL" : "LV",
                "LYD" : "LY",
                "MAD" : "MA",
                "MDL" : "MD",
                "MGA" : "MG",
                "MKD" : "MK",
                "MMK" : "MM",
                "MNT" : "MN",
                "MOP" : "MO",
                "MRO" : "MR",
                "MTL" : "MT",
                "MUR" : "MU",
                "MVR" : "MV",
                "MWK" : "MW",
                "MXN" : "MX",
                "MYR" : "MY",
                "MZN" : "MZ",
                "NAD" : "NA",
                "XPF" : "NC",
                "NGN" : "NG",
                "NIO" : "NI",
                "NPR" : "NP",
                "NZD" : "NZ",
                "OMR" : "OM",
                "PAB" : "PA",
                "PEN" : "PE",
                "PGK" : "PG",
                "PHP" : "PH",
                "PKR" : "PK",
                "PLN" : "PL",
                "PYG" : "PY",
                "QAR" : "QA",
                "RON" : "RO",
                "RSD" : "RS",
                "RUB" : "RU",
                "RWF" : "RW",
                "SAR" : "SA",
                "SBD" : "SB",
                "SCR" : "SC",
                "SDG" : "SD",
                "SEK" : "SE",
                "SGD" : "SG",
                "SKK" : "SK",
                "SLL" : "SL",
                "SOS" : "SO",
                "SRD" : "SR",
                "STD" : "ST",
                "SVC" : "SV",
                "SYP" : "SY",
                "SZL" : "SZ",
                "THB" : "TH",
                "TJS" : "TJ",
                "TMT" : "TM",
                "TND" : "TN",
                "TOP" : "TO",
                "TRY" : "TR",
                "TTD" : "TT",
                "TWD" : "TW",
                "TZS" : "TZ",
                "UAH" : "UA",
                "UGX" : "UG",
                "USD" : "US",
                "UYU" : "UY",
                "UZS" : "UZ",
                "VEF" : "VE",
                "VND" : "VN",
                "VUV" : "VU",
                "YER" : "YE",
                "ZAR" : "ZA",
                "ZMK" : "ZM",
                "ZWD" : "ZW"
            },

            //List of flight objects
            flight_obj_arr: [],

            //DATABASE
            trip_id: "grad trip_adambft"
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

        //dealing with datetimes
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

        convert_datetime_readable(datetime_str) {
            if (datetime_str!="") {
                let date_obj = convert_datetime_str_to_date_obj(datetime_str)

                return flatpickr.formatDate(date_obj, "J M y (h:i K)")
            } else {
                return ""
            }
        },


        //create & edit flight methods
        initialize_create_flight() {
            console.log("=== initialize_create_flight() ===")

            this.create_new_flight = true
            this.edit_existing_flight = false
            this.updating_calendars = true

            console.log("=== END initialize_create_flight() ===")
        },

        reset_flight_form(flight_ID) {
            console.log(`=== reset_flight_form(${flight_ID}) ===`)

            this.depart_datetime = ""
            this.depart_country = ""
            this.depart_tz = ""

            this.arrive_datetime = ""
            this.arrive_country = ""
            this.arrive_tz = ""

            this.duration_hours = 0
            this.duration_minutes = 0

            this.price = ""
            this.currency = "SGD"

            this.airline = ""
            this.flight_no = ""
            this.airport = ""
            this.terminal = ""
            this.gate = ""

            this.create_new_flight = false
            this.edit_existing_flight = false
            this.error_message = ""

            if (flight_ID) {
                console.log("RESETING edit")
                this.flight_obj_arr[flight_ID-1].edit_mode = false
            }

            console.log(`=== END reset_flight_form(${flight_ID}) ===`)
        },

        check_for_errors() {
            console.log(`=== check_for_errors() ===`)

            this.error_message = ""

            if (this.depart_country.trim()=="") {
                this.error_message = "Please fill in Departure Country"
            } else if (this.arrive_country.trim()=="") {
                this.error_message = "Please fill in Arrival Country"
            } else if (this.depart_datetime.trim() == "") {
                this.error_message = "Please fill in Departure Date & Time"
            } else if (this.arrive_datetime.trim()=="") {
                this.error_message = "Please fill in Arrival Date & Time"
            } else if (this.price=="") {
                this.error_message = "Please fill in Cost"
            }

            console.log(`=== END check_for_errors() ===`)
        },

        push_flight_obj() {
            console.log(`=== push_flight_obj() ===`)

            let new_flight_obj = {
                ID:                 this.flight_obj_arr.length + 1,
                depart_datetime:    this.depart_datetime,
                depart_country:     this.depart_country,
                depart_tz:          this.depart_tz,
                arrive_datetime:    this.arrive_datetime,
                arrive_country:     this.arrive_country,
                arrive_tz:          this.arrive_tz,
                duration_hours:     this.duration_hours,
                duration_minutes:   this.duration_minutes,
                price:              this.price,
                currency:           this.currency,
                airline:            this.airline,
                flight_no:          this.flight_no,
                airport:            this.airport,
                terminal:           this.terminal,
                gate:               this.gate,
                edit_mode:          false
            }

            this.flight_obj_arr.push(new_flight_obj)

            this.reset_flight_form()

            console.log(`=== END push_flight_obj() ===`)
        },

        save_new_flight() {
            console.log(`=== save_new_flight() ===`)

            this.check_for_errors()

            //update based on whether there are errors
            if (this.error_message.trim() == "") {
                this.push_flight_obj()
            }

            console.log(`=== END save_new_flight() ===`)
        },

        load_flight_obj_to_form(flight_ID) {
            console.log(`=== load_flight_obj_to_form(${flight_ID}) ===`)

            let curr_flight_obj = this.flight_obj_arr[flight_ID]

            this.depart_datetime =  curr_flight_obj.depart_datetime
            this.depart_country =  curr_flight_obj.depart_country
            this.depart_tz =  curr_flight_obj.depart_tz
            
            this.arrive_datetime =  curr_flight_obj.arrive_datetime
            this.arrive_country =  curr_flight_obj.arrive_country
            this.arrive_tz =  curr_flight_obj.arrive_tz
            
            this.duration_hours =  curr_flight_obj.duration_hours
            this.duration_minutes =  curr_flight_obj.duration_minutes
            
            this.price =  curr_flight_obj.price
            this.currency = curr_flight_obj.currency
            
            this.airline =  curr_flight_obj.airline
            this.flight_no =  curr_flight_obj.flight_no
            this.airport =  curr_flight_obj.airport
            this.terminal =  curr_flight_obj.terminal
            this.gate =  curr_flight_obj.gate

            console.log(`=== END load_flight_obj_to_form(${flight_ID}) ===`)
        },
        
        enable_edit_flight(flight_ID) {
            console.log(`=== enable_edit_flight(${flight_ID}) ===`)

            flight_ID = flight_ID-1

            this.flight_obj_arr[flight_ID].edit_mode = true
            this.edit_existing_flight = true
            this.create_new_flight = false
            this.updating_calendars = true

            this.load_flight_obj_to_form(flight_ID)

            console.log(`=== END enable_edit_flight(${flight_ID}) ===`)
        },

        save_edit_existing_flight(flight_ID) {
            console.log(`=== save_edit_existing_flight(${flight_ID}) ===`)

            this.check_for_errors()

            console.log("ERROR MESSAGE: ", this.error_message)

            if (this.error_message.trim() == "") {
                this.push_to_existing_flight(flight_ID)
                this.reset_flight_form(flight_ID)
            }

            console.log(`=== END save_edit_existing_flight(${flight_ID}) ===`)
        },

        push_to_existing_flight(flight_ID) {
            console.log(`=== push_to_existing_flight(${flight_ID}) ===`)

            let new_flight_obj = {
                ID:                 flight_ID,
                depart_datetime:    this.depart_datetime,
                depart_country:     this.depart_country,
                depart_tz:          this.depart_tz,
                arrive_datetime:    this.arrive_datetime,
                arrive_country:     this.arrive_country,
                arrive_tz:          this.arrive_tz,
                duration_hours:     this.duration_hours,
                duration_minutes:   this.duration_minutes,
                price:              this.price,
                currency:           this.currency,
                airline:            this.airline,
                flight_no:          this.flight_no,
                airport:            this.airport,
                terminal:           this.terminal,
                gate:               this.gate,
                edit_mode:          false
            }

            this.flight_obj_arr[flight_ID-1] = new_flight_obj

            console.log(`=== END push_to_existing_flight(${flight_ID}) ===`)
        },

        update_flight_IDs() {
            console.log(`=== update_flight_IDs() ===`)

            //changes flight ids to be from 1 - N
            let curr_id = 1

            for(var e_flight_obj of this.flight_obj_arr) {
                e_flight_obj.ID = curr_id
                curr_id++
            }

            console.log(`=== END update_flight_IDs() ===`)
        },

        delete_flight(flight_ID) {
            console.log(`=== delete_flight(${flight_ID}) ===`)

            this.flight_obj_arr.splice(flight_ID-1,1)

            this.reset_flight_form()
            this.update_flight_IDs()

            console.log(`=== END delete_flight(${flight_ID}) ===`)
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
        },

        update_currency_dropdown() {
            console.log("UPDATING CURRENCY DROPDOWN NOW")
            const dropList = document.querySelectorAll("form select");

            for (let i = 0; i < dropList.length; i++) {
                for(let currency_code in this.country_list){
                    // selecting USD by default as FROM currency and NPR as TO currency
                    let selected = i == 0 ? currency_code == "SGD" ? "selected" : "" : currency_code == "KRW" ? "selected" : "";
                    // creating option tag with passing currency code as a text and value
                    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
                    // inserting options tag inside select tag
                    dropList[i].insertAdjacentHTML("beforeend", optionTag);
                }
            }
        },

        //DATABASE methods
        create_update_data() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends

            // EDIT HERE
            set(ref(db, /* PATH GOES HERE */), {
                // DATA YOU WANT TO WRITE GOES HERE,

                // example
                // email: this.email
                // ...

              })
            .then(
                function write_success() {
                    // display "Success" message
                    alert("Write Operation Successful")
                    console.log("Entry Created")
            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                alert(failed_message)
                console.log(failed_message);
            })
        },

        read_data(path) {
            const data_to_be_read = ref(db, path);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();

                console.log(data)

                this.data_to_update = data
            });
        },

        read_flights_n_set_flight_data() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/flights`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();

                this.flight_obj_arr = data
            });
        },

        delete_data() {
            remove(/* path location goes here*/)
            .then(
                function delete_success() {
                    alert("Delete operation is a success!")
                    console.log("Delete operation is a success!")
                }
            )
            .catch((error) => {
                // for admin, tells you what error there is
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)

                // display "Error" message
                // stays on the same page
                var failed_message = `Delete Operation Unsuccessful. Error: ${errorMessage}`
                alert(failed_message)
                console.log("Delete Unsuccessful");
            })

        }
    },

    updated() {
        if (this.updating_calendars) {
            this.update_currency_dropdown()

            //updating calendars
            let departure_fp_obj = flatpickr("#departure_datetime_i9w2", datetime_config)
            let arrival_fp_obj = flatpickr("#arrival_datetime_i9w2", datetime_config)

            this.updating_calendars = false
        }

        console.log("FLIGHT OBJ ARR: ",this.flight_obj_arr)
    },

    created() {
        console.log("CREATING ---------------------------")
        const time_elapsed = Date.now()
        let current_date = new Date(time_elapsed)

        let curr_datetime_temp = convert_date_obj_to_str(current_date)

        this.curr_user_datetime = curr_datetime_temp

        this.read_flights_n_set_flight_data()

        console.log("DONE CREATING ----------------------")
    }
})

flight_app.mount('#flight_app')

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
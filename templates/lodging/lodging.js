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


// Google Maps API autocomplete
// init Autocomplete and setting boundaries
function initAutocomplete() {
    let autocomplete;

    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
            componentRestrictions: {'country':['US', 'AU', 'KR', 'SG']},
            fields: ['place_id','name']
        }
    )
}
// -----------------------------------------------------

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

var accommodation_app = Vue.createApp({
    data() {
        return {
            accom_name: "",
            accom_address: "",
            checkin_datetime: "",
            checkout_datetime: "",
            max_occupancy: "",

            price: "",
            currency: "SGD",

            create_new_accom: false,
            edit_existing_accom: false,
            updating_calendars: false,
            error_message: "",

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

            //List of accomodation objects
            accom_obj_arr: [],

            //DATABASE HARDCODING
            trip_id: "grad trip_adambft"
        }
    },

    methods: {
        log_everything(thing) {
            console.log("")
            console.log("LOGGING EVERTHING ---------------")

            console.log(document.getElementById("autocomplete").value)
            console.log("accom_name: ", this.accom_name)
            console.log("accom_address: ", this.accom_address)
            console.log("checkin_datetime: ", this.checkin_datetime)
            console.log("checkout_datetime: ", this.checkout_datetime)
            console.log("max_occupancy: ", this.max_occupancy)
            console.log("price: ", this.price)
            console.log("currency: ", this.currency)

            console.log("LOGGED EVERYTHING----------------")
            console.log("")
        },

        //update v-model for location
        update_local_vmodel() {
            if (this.edit_existing_accom || this.create_new_accom) {
                console.log("=== update_local_vmodel() ===")
                this.accom_address = document.getElementById("autocomplete").value
            }
        },

        //dealing with datetimes
        convert_datetime_readable(datetime_str) {
            if (datetime_str!="") {
                let date_obj = convert_datetime_str_to_date_obj(datetime_str)

                return flatpickr.formatDate(date_obj, "J M y (h:i K)")
            } else {
                return ""
            }
        },

        //CREATE AND EDIT ACCOM

            //MISC
        check_for_errors() {
            console.log(`=== check_for_errors() ===`)

            this.error_message = ""

            if (this.accom_name.trim()=="") {
                this.error_message = "Please fill in Accommodation Name"
            } else if (this.accom_address.trim()=="") {
                this.error_message = "Please fill in Address"
            } else if (this.checkin_datetime.trim() == "") {
                this.error_message = "Please fill in Check In Date & Time"
            } else if (this.checkout_datetime.trim()=="") {
                this.error_message = "Please fill in Check Out Date & Time"
            } else if (this.price=="") {
                this.error_message = "Please fill in Cost"
            } else if (this.max_occupancy=="") {
                this.error_message = "Please fill in Occupancy"
            }

            console.log(`=== END check_for_errors() ===`)
        },

        clear_form(accom_id) {
            this.accom_name = ""
            this.accom_address = ""
            this.checkin_datetime = ""
            this.checkout_datetime = ""
            this.max_occupancy = ""
            this.price = ""
            this.currency = "SGD"

            this.error_message = ""

            this.create_new_accom = false
            this.edit_existing_accom = false
            this.error_message = ""
            
            if (accom_id) {
                this.accom_obj_arr[accom_id-1].edit_mode = false
            }
        },

        update_accom_IDs() {
            let curr_id = 1

            for (var e_accom_obj of this.accom_obj_arr) {
                e_accom_obj.ID = curr_id
                curr_id++
            }
        },

        sort_accom_obj() {
            let list_to_sort = []

            for (var e_obj of this.accom_obj_arr) {
                let e_id = e_obj.ID - 1
                let e_checkin = e_obj.checkin_datetime
                let e_checkout = e_obj.checkout_datetime
                let e_name = e_obj.accom_name

                let new_entry = [e_checkin, e_checkout, e_name, e_id]
                list_to_sort.push(new_entry)
            }

            list_to_sort.sort()

            let edited_obj_arr = []

            for (var e_entry of list_to_sort) {
                let e_id = e_entry[e_entry.length - 1]

                edited_obj_arr.push(this.accom_obj_arr[e_id])
            }

            this.accom_obj_arr = edited_obj_arr

            this.update_accom_IDs()
        },

            //CREATE NEW
        enable_create_mode() {
            this.create_new_accom = true
            this.updating_calendars = true
            this.edit_existing_accom = false
        },

        push_accom_obj() {
            console.log("=== push_accom_obj() ===")

            let new_accom_obj = {
                ID:                 this.accom_obj_arr.length + 1,
                accom_name:         this.accom_name,
                accom_address:      this.accom_address,
                checkin_datetime:   this.checkin_datetime,
                checkout_datetime:  this.checkout_datetime,
                max_occupancy:      this.max_occupancy,
                price:              this.price,
                currency:           this.currency,
                edit_mode:          false,
            }

            this.accom_obj_arr.push(new_accom_obj)

            this.clear_form()
        },

        save_new_accom() {
            console.log("=== save_new_accom() ===")

            this.update_local_vmodel()

            this.check_for_errors()

            if (this.error_message.trim() == "") {
                this.push_accom_obj()
                this.sort_accom_obj()
                
                this.write_accom_obj_to_database()
            }

            console.log("=== END save_new_accom() ===")
        },

            //EDIT CURRENT
        enable_edit_mode(accom_id) {
            this.accom_obj_arr[accom_id-1].edit_mode = true
            this.updating_calendars = true
            this.create_new_accom = false
            this.edit_existing_accom = true

            this.load_accom_obj_to_form(accom_id)
        },

        load_accom_obj_to_form(accom_id) {
            console.log(`=== load_accom_obj_to_form(${accom_id}) ===`)

            let curr_accom_obj = this.accom_obj_arr[accom_id-1]

            this.accom_name = curr_accom_obj.accom_name
            this.accom_address = curr_accom_obj.accom_address
            this.checkin_datetime = curr_accom_obj.checkin_datetime
            this.checkout_datetime = curr_accom_obj.checkout_datetime
            this.max_occupancy = curr_accom_obj.max_occupancy
            this.price = curr_accom_obj.price
            this.currency = curr_accom_obj.currency
        },

        push_to_existing_accom(accom_id) {
            let new_accom_obj = {
                ID:                 accom_id,
                accom_name:         this.accom_name,
                accom_address:      this.accom_address,
                checkin_datetime:   this.checkin_datetime,
                checkout_datetime:  this.checkout_datetime,
                max_occupancy:      this.max_occupancy,
                price:              this.price,
                currency:           this.currency,
                edit_mode:          false,
            }

            this.accom_obj_arr[accom_id-1] = new_accom_obj
        },

        save_edit_existing_accom(accom_id) {
            this.check_for_errors()

            if (this.error_message.trim() == "") {
                this.update_local_vmodel()
                this.push_to_existing_accom(accom_id)
                this.clear_form(accom_id)
                this.sort_accom_obj()

                this.write_accom_obj_to_database()
            }
        },

            //DELETE
        delete_accom(accom_id) {
            this.accom_obj_arr.splice(accom_id-1, 1)

            this.clear_form()
            this.update_accom_IDs()

            this.write_accom_obj_to_database()
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
                    let selected = i == 0 ? currency_code == this.currency ? "selected" : "" : currency_code == "KRW" ? "selected" : "";
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

        },

        //CUSTOM DATABASE METHODS
        write_accom_obj_to_database() {
            console.log("Writing data into database...")
            // the console can be open, 

            // Database path must be set by you
            // e.g. users/junsui/friends

            // EDIT HERE
            set(ref(db, `trips/${this.trip_id}/lodging`),
                // DATA YOU WANT TO WRITE GOES HERE,
                this.accom_obj_arr
            )
            .then(
                function write_success() {
                    // display "Success" message
                    console.log("Entry Created")
            })
            .catch((error) => {
                // for us to debug, tells us what error there is,
                const errorCode = error.code;
                const errorMessage = error.message;

                // display "Error" message
                var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                console.log(failed_message);
            })
        },

        read_accom_n_set_accom_data() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/lodging`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();

                if (data) {
                    this.accom_obj_arr = data
                }
            });
        },
    },

    updated() {
        console.log("=== updated() ===")
        if (this.updating_calendars) {
            console.log("Updating calendar and currency dropdown")
            this.update_currency_dropdown()

            //updating calendars
            let checkin_fp_obj = flatpickr("#checkin_datetime_i9w2", datetime_config)
            let checkout_fp_obj = flatpickr("#checkout_datetime_i9w2", datetime_config)

            this.updating_calendars = false

            initAutocomplete()
        }

        console.log("=== DONE updated() ===")
    },

    created() {
        this.read_accom_n_set_accom_data()
    }
})

accommodation_app.mount('#accommodation_app')

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
let checkin_fp_obj = flatpickr("#checkin_datetime_i9w2", datetime_config)
let checkout_fp_obj = flatpickr("#checkout_datetime_i9w2", datetime_config)

// datetime
let datetime_fp_obj = flatpickr("input[type=datetime-local]", datetime_config);

// date only
let date_fp_obj = flatpickr("input[type=date]", date_config)
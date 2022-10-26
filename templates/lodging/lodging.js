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
            accom_local: "",
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

            //List of flight objects
            accom_obj_arr: [
                {
                    ID: 1,
                    // other details
                    edit_mode: false,
                    dropdown_open: false
                },
                {
                    ID: 2,
                    //other details
                    edit_mode: false,
                    dropdown_open: false
                },
            ],
        }
    },

    methods: {
        log_everything(thing) {
            console.log("")
            console.log("LOGGING EVERTHING ---------------")

            console.log(document.getElementById("autocomplete").value)
            console.log("accom_name: ", this.accom_name)
            console.log("accom_local: ", this.accom_local)
            console.log("checkin_datetime: ", this.checkin_datetime)
            console.log("checkout_datetime: ", this.checkout_datetime)
            console.log("max_occupancy: ", this.max_occupancy)
            console.log("price: ", this.price)
            console.log("currency: ", this.currency)

            console.log("LOGGED EVERYTHING----------------")
            console.log("")
        },

        // KENGBOONHELPP
        //update v-model for location
        update_local_vmodel() {
            console.log("=== update_local_vmodel() ===")
            this.accom_local = document.getElementById("autocomplete").value
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

        convert_datetime_readable(datetime_str) {
            if (datetime_str!="") {
                let date_obj = convert_datetime_str_to_date_obj(datetime_str)

                return flatpickr.formatDate(date_obj, "J M y (h:i K)")
            } else {
                return ""
            }
        },


        //dropdown toggle
        toggle_dropdown(flight_obj_ID) {
            if (flight_obj_ID == -1) {
                this.dropdown_open = !this.dropdown_open
            } else {
                this.flight_obj_arr[flight_obj_ID-1].dropdown_open = !this.flight_obj_arr[flight_obj_ID-1].dropdown_open
            }
        },


        //create & edit flight methods
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
        }
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
        }
    },

    mounted() {
        this.update_currency_dropdown()
    },
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
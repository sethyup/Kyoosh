// REDIRECT IF NOT LOGGED IN YET
if (localStorage.getItem("user") === null) {
	window.location.href = "../pages/signup_login pages/login_page.html"
} else if (localStorage.getItem("trip") === null) {
	// REDIRECT IF LOGGED IN BUT NO TRIP ID IN CACHE
	window.location.href = "../pages/trips-homepage.html"
}


// Firebase stuff
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

// const auth = getAuth(WADTravel)
const db = getDatabase(WADTravel)

// const variables
// ISO 3166 Alpha-2 Format: [Country Name] : [2 letter Country Code]
const countryList = {
    Afghanistan: 'AF',
    'Aland Islands': 'AX',
    Albania: 'AL',
    Algeria: 'DZ',
    'American Samoa': 'AS',
    Andorra: 'AD',
    Angola: 'AO',
    Anguilla: 'AI',
    Antarctica: 'AQ',
    'Antigua And Barbuda': 'AG',
    Argentina: 'AR',
    Armenia: 'AM',
    Aruba: 'AW',
    Australia: 'AU',
    Austria: 'AT',
    Azerbaijan: 'AZ',
    Bahamas: 'BS',
    Bahrain: 'BH',
    Bangladesh: 'BD',
    Barbados: 'BB',
    Belarus: 'BY',
    Belgium: 'BE',
    Belize: 'BZ',
    Benin: 'BJ',
    Bermuda: 'BM',
    Bhutan: 'BT',
    Bolivia: 'BO',
    'Bosnia And Herzegovina': 'BA',
    Botswana: 'BW',
    'Bouvet Island': 'BV',
    Brazil: 'BR',
    'British Indian Ocean Territory': 'IO',
    'Brunei Darussalam': 'BN',
    Bulgaria: 'BG',
    'Burkina Faso': 'BF',
    Burundi: 'BI',
    Cambodia: 'KH',
    Cameroon: 'CM',
    Canada: 'CA',
    'Cape Verde': 'CV',
    'Cayman Islands': 'KY',
    'Central African Republic': 'CF',
    Chad: 'TD',
    Chile: 'CL',
    China: 'CN',
    'Christmas Island': 'CX',
    'Cocos (Keeling) Islands': 'CC',
    Colombia: 'CO',
    Comoros: 'KM',
    Congo: 'CG',
    'Congo, Democratic Republic': 'CD',
    'Cook Islands': 'CK',
    'Costa Rica': 'CR',
    "Cote D'Ivoire": 'CI',
    Croatia: 'HR',
    Cuba: 'CU',
    Cyprus: 'CY',
    'Czech Republic': 'CZ',
    Denmark: 'DK',
    Djibouti: 'DJ',
    Dominica: 'DM',
    'Dominican Republic': 'DO',
    Ecuador: 'EC',
    Egypt: 'EG',
    'El Salvador': 'SV',
    'Equatorial Guinea': 'GQ',
    Eritrea: 'ER',
    Estonia: 'EE',
    Ethiopia: 'ET',
    'Falkland Islands (Malvinas)': 'FK',
    'Faroe Islands': 'FO',
    Fiji: 'FJ',
    Finland: 'FI',
    France: 'FR',
    'French Guiana': 'GF',
    'French Polynesia': 'PF',
    'French Southern Territories': 'TF',
    Gabon: 'GA',
    Gambia: 'GM',
    Georgia: 'GE',
    Germany: 'DE',
    Ghana: 'GH',
    Gibraltar: 'GI',
    Greece: 'GR',
    Greenland: 'GL',
    Grenada: 'GD',
    Guadeloupe: 'GP',
    Guam: 'GU',
    Guatemala: 'GT',
    Guernsey: 'GG',
    Guinea: 'GN',
    'Guinea-Bissau': 'GW',
    Guyana: 'GY',
    Haiti: 'HT',
    'Heard Island & Mcdonald Islands': 'HM',
    'Holy See (Vatican City State)': 'VA',
    Honduras: 'HN',
    'Hong Kong': 'HK',
    Hungary: 'HU',
    Iceland: 'IS',
    India: 'IN',
    Indonesia: 'ID',
    'Iran, Islamic Republic Of': 'IR',
    Iraq: 'IQ',
    Ireland: 'IE',
    'Isle Of Man': 'IM',
    Israel: 'IL',
    Italy: 'IT',
    Jamaica: 'JM',
    Japan: 'JP',
    Jersey: 'JE',
    Jordan: 'JO',
    Kazakhstan: 'KZ',
    Kenya: 'KE',
    Kiribati: 'KI',
    Korea: 'KR',
    Kuwait: 'KW',
    Kyrgyzstan: 'KG',
    "Lao People's Democratic Republic": 'LA',
    Latvia: 'LV',
    Lebanon: 'LB',
    Lesotho: 'LS',
    Liberia: 'LR',
    'Libyan Arab Jamahiriya': 'LY',
    Liechtenstein: 'LI',
    Lithuania: 'LT',
    Luxembourg: 'LU',
    Macao: 'MO',
    Macedonia: 'MK',
    Madagascar: 'MG',
    Malawi: 'MW',
    Malaysia: 'MY',
    Maldives: 'MV',
    Mali: 'ML',
    Malta: 'MT',
    'Marshall Islands': 'MH',
    Martinique: 'MQ',
    Mauritania: 'MR',
    Mauritius: 'MU',
    Mayotte: 'YT',
    Mexico: 'MX',
    'Micronesia, Federated States Of': 'FM',
    Moldova: 'MD',
    Monaco: 'MC',
    Mongolia: 'MN',
    Montenegro: 'ME',
    Montserrat: 'MS',
    Morocco: 'MA',
    Mozambique: 'MZ',
    Myanmar: 'MM',
    Namibia: 'NA',
    Nauru: 'NR',
    Nepal: 'NP',
    Netherlands: 'NL',
    'Netherlands Antilles': 'AN',
    'New Caledonia': 'NC',
    'New Zealand': 'NZ',
    Nicaragua: 'NI',
    Niger: 'NE',
    Nigeria: 'NG',
    Niue: 'NU',
    'Norfolk Island': 'NF',
    'Northern Mariana Islands': 'MP',
    Norway: 'NO',
    Oman: 'OM',
    Pakistan: 'PK',
    Palau: 'PW',
    'Palestinian Territory, Occupied': 'PS',
    Panama: 'PA',
    'Papua New Guinea': 'PG',
    Paraguay: 'PY',
    Peru: 'PE',
    Philippines: 'PH',
    Pitcairn: 'PN',
    Poland: 'PL',
    Portugal: 'PT',
    'Puerto Rico': 'PR',
    Qatar: 'QA',
    Reunion: 'RE',
    Romania: 'RO',
    'Russian Federation': 'RU',
    Rwanda: 'RW',
    'Saint Barthelemy': 'BL',
    'Saint Helena': 'SH',
    'Saint Kitts And Nevis': 'KN',
    'Saint Lucia': 'LC',
    'Saint Martin': 'MF',
    'Saint Pierre And Miquelon': 'PM',
    'Saint Vincent And Grenadines': 'VC',
    Samoa: 'WS',
    'San Marino': 'SM',
    'Sao Tome And Principe': 'ST',
    'Saudi Arabia': 'SA',
    Senegal: 'SN',
    Serbia: 'RS',
    Seychelles: 'SC',
    'Sierra Leone': 'SL',
    Singapore: 'SG',
    Slovakia: 'SK',
    Slovenia: 'SI',
    'Solomon Islands': 'SB',
    Somalia: 'SO',
    'South Africa': 'ZA',
    'South Georgia And Sandwich Isl.': 'GS',
    Spain: 'ES',
    'Sri Lanka': 'LK',
    Sudan: 'SD',
    Suriname: 'SR',
    'Svalbard And Jan Mayen': 'SJ',
    Swaziland: 'SZ',
    Sweden: 'SE',
    Switzerland: 'CH',
    'Syrian Arab Republic': 'SY',
    Taiwan: 'TW',
    Tajikistan: 'TJ',
    Tanzania: 'TZ',
    Thailand: 'TH',
    'Timor-Leste': 'TL',
    Togo: 'TG',
    Tokelau: 'TK',
    Tonga: 'TO',
    'Trinidad And Tobago': 'TT',
    Tunisia: 'TN',
    Turkey: 'TR',
    Turkmenistan: 'TM',
    'Turks And Caicos Islands': 'TC',
    Tuvalu: 'TV',
    Uganda: 'UG',
    Ukraine: 'UA',
    'United Arab Emirates': 'AE',
    'United Kingdom': 'GB',
    'United States': 'US',
    'United States Outlying Islands': 'UM',
    Uruguay: 'UY',
    Uzbekistan: 'UZ',
    Vanuatu: 'VU',
    Venezuela: 'VE',
    'Viet Nam': 'VN',
    'Virgin Islands, British': 'VG',
    'Virgin Islands, U.S.': 'VI',
    'Wallis And Futuna': 'WF',
    'Western Sahara': 'EH',
    Yemen: 'YE',
    Zambia: 'ZM',
    Zimbabwe: 'ZW',
    'North Macedonia': 'MK',
    Češka: 'CZ'
  }

// list of all 2 letter country code: capital
const capitalList = {
    "AF": "Kabul",
    "AX": "Mariehamn",
    "AL": "Tirana",
    "DZ": "Algiers",
    "AS": "Pago Pago",
    "AD": "Andorra la Vella",
    "AO": "Luanda",
    "AI": "The Valley",
    "AQ": "Antarctica",
    "AG": "St. John's",
    "AR": "Buenos Aires",
    "AM": "Yerevan",
    "AW": "Oranjestad",
    "AU": "Canberra",
    "AT": "Vienna",
    "AZ": "Baku",
    "BS": "Nassau",
    "BH": "Manama",
    "BD": "Dhaka",
    "BB": "Bridgetown",
    "BY": "Minsk",
    "BE": "Brussels",
    "BZ": "Belmopan",
    "BJ": "Porto-Novo",
    "BM": "Hamilton",
    "BT": "Thimphu",
    "BO": "Sucre",
    "BQ": "Kralendijk",
    "BA": "Sarajevo",
    "BW": "Gaborone",
    "BV": "",
    "BR": "Brasilia",
    "IO": "Diego Garcia",
    "BN": "Bandar Seri Begawan",
    "BG": "Sofia",
    "BF": "Ouagadougou",
    "BI": "Bujumbura",
    "KH": "Phnom Penh",
    "CM": "Yaounde",
    "CA": "Ottawa",
    "CV": "Praia",
    "KY": "George Town",
    "CF": "Bangui",
    "TD": "N'Djamena",
    "CL": "Santiago",
    "CN": "Beijing",
    "CX": "Flying Fish Cove",
    "CC": "West Island",
    "CO": "Bogota",
    "KM": "Moroni",
    "CG": "Brazzaville",
    "CD": "Kinshasa",
    "CK": "Avarua",
    "CR": "San Jose",
    "CI": "Yamoussoukro",
    "HR": "Zagreb",
    "CU": "Havana",
    "CW": "Willemstad",
    "CY": "Nicosia",
    "CZ": "Prague",
    "DK": "Copenhagen",
    "DJ": "Djibouti",
    "DM": "Roseau",
    "DO": "Santo Domingo",
    "EC": "Quito",
    "EG": "Cairo",
    "SV": "San Salvador",
    "GQ": "Malabo",
    "ER": "Asmara",
    "EE": "Tallinn",
    "ET": "Addis Ababa",
    "FK": "Stanley",
    "FO": "Torshavn",
    "FJ": "Suva",
    "FI": "Helsinki",
    "FR": "Paris",
    "GF": "Cayenne",
    "PF": "Papeete",
    "TF": "Port-aux-Francais",
    "GA": "Libreville",
    "GM": "Banjul",
    "GE": "Tbilisi",
    "DE": "Berlin",
    "GH": "Accra",
    "GI": "Gibraltar",
    "GR": "Athens",
    "GL": "Nuuk",
    "GD": "St. George's",
    "GP": "Basse-Terre",
    "GU": "Hagatna",
    "GT": "Guatemala City",
    "GG": "St Peter Port",
    "GN": "Conakry",
    "GW": "Bissau",
    "GY": "Georgetown",
    "HT": "Port-au-Prince",
    "HM": "",
    "VA": "Vatican City",
    "HN": "Tegucigalpa",
    "HK": "Hong Kong",
    "HU": "Budapest",
    "IS": "Reykjavik",
    "IN": "New Delhi",
    "ID": "Jakarta",
    "IR": "Tehran",
    "IQ": "Baghdad",
    "IE": "Dublin",
    "IM": "Douglas, Isle of Man",
    "IL": "Jerusalem",
    "IT": "Rome",
    "JM": "Kingston",
    "JP": "Tokyo",
    "JE": "Saint Helier",
    "JO": "Amman",
    "KZ": "Astana",
    "KE": "Nairobi",
    "KI": "Tarawa",
    "KP": "Pyongyang",
    "KR": "Seoul",
    "XK": "Pristina",
    "KW": "Kuwait City",
    "KG": "Bishkek",
    "LA": "Vientiane",
    "LV": "Riga",
    "LB": "Beirut",
    "LS": "Maseru",
    "LR": "Monrovia",
    "LY": "Tripolis",
    "LI": "Vaduz",
    "LT": "Vilnius",
    "LU": "Luxembourg",
    "MO": "Macao",
    "MK": "Skopje",
    "MG": "Antananarivo",
    "MW": "Lilongwe",
    "MY": "Kuala Lumpur",
    "MV": "Male",
    "ML": "Bamako",
    "MT": "Valletta",
    "MH": "Majuro",
    "MQ": "Fort-de-France",
    "MR": "Nouakchott",
    "MU": "Port Louis",
    "YT": "Mamoudzou",
    "MX": "Mexico City",
    "FM": "Palikir",
    "MD": "Chisinau",
    "MC": "Monaco",
    "MN": "Ulan Bator",
    "ME": "Podgorica",
    "MS": "Plymouth",
    "MA": "Rabat",
    "MZ": "Maputo",
    "MM": "Nay Pyi Taw",
    "NA": "Windhoek",
    "NR": "Yaren",
    "NP": "Kathmandu",
    "NL": "Amsterdam",
    "AN": "Willemstad",
    "NC": "Noumea",
    "NZ": "Wellington",
    "NI": "Managua",
    "NE": "Niamey",
    "NG": "Abuja",
    "NU": "Alofi",
    "NF": "Kingston",
    "MP": "Saipan",
    "NO": "Oslo",
    "OM": "Muscat",
    "PK": "Islamabad",
    "PW": "Melekeok",
    "PS": "East Jerusalem",
    "PA": "Panama City",
    "PG": "Port Moresby",
    "PY": "Asuncion",
    "PE": "Lima",
    "PH": "Manila",
    "PN": "Adamstown",
    "PL": "Warsaw",
    "PT": "Lisbon",
    "PR": "San Juan",
    "QA": "Doha",
    "RE": "Saint-Denis",
    "RO": "Bucharest",
    "RU": "Moscow",
    "RW": "Kigali",
    "BL": "Gustavia",
    "SH": "Jamestown",
    "KN": "Basseterre",
    "LC": "Castries",
    "MF": "Marigot",
    "PM": "Saint-Pierre",
    "VC": "Kingstown",
    "WS": "Apia",
    "SM": "San Marino",
    "ST": "Sao Tome",
    "SA": "Riyadh",
    "SN": "Dakar",
    "RS": "Belgrade",
    "CS": "Belgrade",
    "SC": "Victoria",
    "SL": "Freetown",
    "SG": "Singapur",
    "SX": "Philipsburg",
    "SK": "Bratislava",
    "SI": "Ljubljana",
    "SB": "Honiara",
    "SO": "Mogadishu",
    "ZA": "Pretoria",
    "GS": "Grytviken",
    "SS": "Juba",
    "ES": "Madrid",
    "LK": "Colombo",
    "SD": "Khartoum",
    "SR": "Paramaribo",
    "SJ": "Longyearbyen",
    "SZ": "Mbabane",
    "SE": "Stockholm",
    "CH": "Berne",
    "SY": "Damascus",
    "TW": "Taipei",
    "TJ": "Dushanbe",
    "TZ": "Dodoma",
    "TH": "Bangkok",
    "TL": "Dili",
    "TG": "Lome",
    "TK": "",
    "TO": "Nuku'alofa",
    "TT": "Port of Spain",
    "TN": "Tunis",
    "TR": "Ankara",
    "TM": "Ashgabat",
    "TC": "Cockburn Town",
    "TV": "Funafuti",
    "UG": "Kampala",
    "UA": "Kiev",
    "AE": "Abu Dhabi",
    "GB": "London",
    "US": "Washington",
    "UM": "",
    "UY": "Montevideo",
    "UZ": "Tashkent",
    "VU": "Port Vila",
    "VE": "Caracas",
    "VN": "Hanoi",
    "VG": "Road Town",
    "VI": "Charlotte Amalie",
    "WF": "Mata Utu",
    "EH": "El-Aaiun",
    "YE": "Sanaa",
    "ZM": "Lusaka",
    "ZW": "Harare"
};

// cached variables
var markers = [];
var uniqueId = 0;

// progress bar functions

function get_total_users(place) {
    var total_users = 0
    var votes = place.votes
    // console.log(`${all_votes} this from get total users`)
    if(votes.yes){
      total_users += votes.yes.length
    }
    if(votes.no){
      total_users += votes.no.length
    }
    if(votes.yet_to_vote){
      total_users += votes.yet_to_vote.length
    }
    // var total_users = all_votes.yes.length + all_votes.no.length + all_votes.yet_to_vote.length
    // console.log(this.get_total_users)
    return total_users
}
function get_yes_num(votes) {
    // console.log(typeof String(votes.yes.length))
    var yes_votes = 0 
    if(votes.yes){
    yes_votes += votes.yes.length
    }
    return yes_votes
}
function get_no_num(votes) {
    var no_votes = 0 
    if(votes.no){
        no_votes += votes.no.length
    }
    return no_votes
}
function get_yet_to_vote_num(votes) {
    var yet_to_vote_votes = 0 
    if(votes.yet_to_vote){
        yet_to_vote_votes += votes.yet_to_vote.length
    }
    return yet_to_vote_votes
}
function get_yes_percentage(votes,place) {
    // console.log(votes.yes.length)
    var yes_votes = get_yes_num(votes)
    return (yes_votes)*100/get_total_users(place)
}
function get_no_percentage(votes,place) {
    // console.log(votes.no.length)
    var no_votes = get_no_num(votes)
    return (no_votes)*100/get_total_users(place)
}
function get_yet_to_vote_percentage(votes,place) {
    // console.log(votes.yet_to_vote.length)
    var yet_to_vote_votes = get_yet_to_vote_num(votes)
    return (yet_to_vote_votes)*100/get_total_users(place)
}

// map-related functions

// create your map
function initMap(location, lodging) {
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        // center: {lat: 37.5665, lng:126.9780},
    }
    );
    // get capital from capitalList, get country code from function, get country from cache
    var capital = vm.get_capital_city(vm.get_country_code(vm.$data.trip_details.country))
    vm.set_country_center(capital,map)
    // map.addListener("click", (e) => {
    //     create_marker_by_click(e.latLng,map);
    // });
    for (var place in location) {
        // create_marker(place, map)
        create_marker(location[place], map, place)
    }
    // console.log(lodging)
    create_lodging_marker(lodging, map)
        
    initAutocomplete(map);

}
// enable Autocomplete
function initAutocomplete(map) {
    
    // Init Autocomplete
    var input = document.getElementById('autocomplete');
    // get country code
    // var country = get_country_code(this.trip_details.country)
    const options = {
        componentRestrictions: {'country':['US', 'CH', 'KR', 'SG']},
        fields: ['place_id','name','geometry','formatted_address']
    };
    const autocomplete = new google.maps.places.Autocomplete(input, options);
    // autocomplete connected to map viewport
    autocomplete.bindTo('bounds',map);

    // create marker for searched location, go to location, save into marker list
    autocomplete.addListener('place_changed', () => {

        const infowindow = new google.maps.InfoWindow();
        const icon = {
            url:  "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scaledSize: new google.maps.Size(40,40),
            };
        const marker = new google.maps.Marker({
            map: map,
            icon: icon
        });
        
        infowindow.close()
        marker.setVisible(false);

        const place = autocomplete.getPlace();
        // console.log(place)
        vm.$data.selected_name = place.name;
        vm.$data.selected_address = place.formatted_address;
        vm.$data.selected_latlng = {lat: place.geometry.location.lat(), lng: place.geometry.location.lng()}
        // vm.console_all()
        
        if (!place.geometry || !place.geometry.location) {
        window.alert(`No details available for the place: "${place.name}"`
        );
        return;
        }
        if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
        } else {
        map.setCenter(place.geometry.location);
        }

        marker.setPosition(place.geometry.location);
        marker.setVisible(true);

        marker.id = uniqueId;
        vm.$data.current_id = uniqueId
        
        const contentString = 
        `
        <div id="content" name="${marker.id}">
            <div id="siteNotice"></div>

            <div class="container">
                <div class="row">
                    <div class = "col-8">
                    <span class="badge rounded-pill text-bg-warning">#Shopping</span>
                    <h3>${place.name}</h3>
                    <p class="address">${place.formatted_address}<p>
                    <hr>
                </div>  
            </div>
        </div>
        `
    // line for deleting marker by clicking in InfoWindow
    // <input type = 'button' va;ue = 'Delete' onclick = 'DeleteMarker( ${marker.id});' value = 'Delete Activity' />
    infowindow.setContent(contentString);
    infowindow.open(map, marker);
    markers.push(marker)
    marker.addListener("click", (googleMapsEvent) => {
        infowindow.open(map, marker);})
    })
    window.autocomplete = autocomplete
    
    // autocomplete.addListener("", () => {
    //     autocomplete.set("place", null)
    // })
}
// create existing marker
function create_marker(place, map, id) {
    const icon = {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // url
            scaledSize: new google.maps.Size(40, 40), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
        };
        var marker = new google.maps.Marker({
            position: place.latlng,
            map: map,
            icon: icon
        });
        var infoWindow = new google.maps.InfoWindow({
            content: "",
            disableAutoPan: true,
            });
        // Set unique id
        // console.log(place)
        // console.log(id)
        marker.id = id;
        vm.$data.current_id = id;
        console.log(`Creating location marker: ${id}`)     
        
        // set infoWindow
        var contentString = 
            `
            <div id="content" name="${marker.id}>
            <div id="siteNotice"></div>

            <div class="container">
            
            <div class="row">
                <div class = "col-8">
                <span class="badge rounded-pill text-bg-warning">#${place.tag}</span>
                
                <h3>${place.name}</h3>
                <p class="address">${place.address}<p>
                <hr>
                <h6>SGD ${place.price.sgd} / KRW ${place.price.krw} per person</h6>
                <p class="description">${place.description}</p>
                </div>
                

                <div class="col-4" style:"position:relative">
                    <p class="pt-3">Current Votes: </p>
                    <div class="progress">
                        <!-- VOTED YES -->
                        <div id=${id}  class="progress-bar bg-success" role="progressbar" aria-label="voted_yes_percentage" style="width: ${get_yes_percentage(place.votes,place)}%" aria-valuenow="${get_yes_percentage(place.votes,place)}" aria-valuemin="0" aria-valuemax="100">YES</div>

                        <!-- VOTED NO -->
                        <div id=${id}  class="progress-bar bg-danger" role="progressbar" aria-label="voted_no_percentage" style="width: ${get_no_percentage(place.votes,place)}%" aria-valuenow="${get_no_percentage(place.votes,place)}" aria-valuemin="0" aria-valuemax="100" >NO</div>
                        
                        <!--  VOTED MAYBE   -->
                        <div id=${id} class="progress-bar bg-mild text-dark" role="progressbar" aria-label="yet_to_vote_percentage" style="width: ${get_yet_to_vote_percentage(place.votes,place)}%" aria-valuenow="${get_yet_to_vote_percentage(place.votes,place)}" aria-valuemin="0" aria-valuemax="100">NA</div>
                    </div>
                    <div style="margin-top: 5px;">
                        <button type="button" class="btn btn-sm rounded bg-primary text-white float-end" data-bs-toggle="button" onclick="set_edit(this)">Edit<div id="get_marker_id" style="display: none;">${marker.id}</div></button>
                    </div>

                </div> 
            </div>
        </div>
        </div>
            `
        // delete button removed from contentString
        // <input type = 'button' va;ue = 'Delete' onclick = 'DeleteMarker( ${marker.id});' value = 'Delete Activity' />
        marker.addListener("click", (googleMapsEvent) => {
            infoWindow.setContent(contentString);
            infoWindow.open(map, marker);});
        markers.push(marker)
        
}
// create lodging markers
async function create_lodging_marker(locations, map) {
    // console.log('Creating lodging markers')
    // create marker for each lodging location
    for (var location of locations) {
        console.log(`Creating lodging marker: ${locations.indexOf(location) + 1}`)
        // set icon 
        const icon = {
            url: "http://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/350/hotel_1f3e8.png", // url
            scaledSize: new google.maps.Size(40, 40), // scaled size
            // origin: new google.maps.Point(0,0), // origin
            // anchor: new google.maps.Point(0, 0) // anchor
        };
        // get location latlng to create marker
        var service = new google.maps.places.PlacesService(map)
        var request = {
            query: location.accom_address,
            fields: ['geometry','formatted_address','name'],
        };

        var latng = service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                var latlng = results[0].geometry.location;
                // create marker
                var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    icon: icon
                });
                // set infoWindow
                var infoWindow = new google.maps.InfoWindow({
                    content: "",
                    disableAutoPan: true,
                    });
                var contentString = 
                    `
                    <div id="content">
                    <div id="siteNotice"></div>
        
                    <div class="container">
                    <span class="badge rounded-pill text-bg-success">#Lodging</span>
                        
                    <h3>${results[0].name}</h3>
                    <p class="address">${results[0].formatted_address}<p>
                    <hr>
                </div>
                </div>
                    `
                marker.addListener("click", (googleMapsEvent) => {
                    infoWindow.setContent(contentString);
                    infoWindow.open(map, marker);});
                }
        });
    
    }
    
    
}
// delete markers
function DeleteMarker(id) {
    //Find and remove the marker from the Array
    console.log(`${id} from DeleteMarker`)
    for (var i = 0; i < markers.length; i++) {
        if (markers[i].id == id) {
            //Remove the marker from Map                  
            markers[i].setMap(null);

            //Remove the marker from array.
            markers.splice(i, 1);
            
            return;
        }
    }
    
};

// vue app
const app = Vue.createApp({ 
    data() { 
        return {
            // trip details
            trip_id: "kbang bangkok bangbongurjfjwowskdorrofkckshecoejfnekkbang@yahoocom",
            user_id: "",
            trip_details: {
                country: 'Korea',
                duration: '12 November 2022 - 16 November 2022'
            },
            // display details
            create_true: false,
            edit_true: false,

            // map details
            map_width: '90%',
            existing_locations: "",
            

            // create activity details
            amount: "", 
            from: "SGD", 
            to: "KRW", 
            converted_amount: "",
            api_key: "wjnJhKhIK8qWrTVQ2YILd5wpxuyRGSP2",
            home_country: "SGD",
            // create activity 2nd part
            tags: ["Shopping", "Museum", "Food", "Attraction", "Sports", "Theme Park", "Camping", "Hiking", "Aquarium", "Zoo", "Tour", "Cruise"],     
            tag_input: "",

            // input field details
            current_id: "",
            selected_address: "",
                // selected_tags: "", is under tag_input
            selected_description: "",
            selected_name: "",
            selected_latlng: "",
            group_members: '',
            // amount, converted amount from main stuff
            // vote details
            no: [],
            yes: [],
            yet_to_vote: [],

        };
    }, 
    methods: {
        // map related codes

        // delete marker in edit_activity
        delete_marker_edit(id) {
            console.log(`this is the curernt marker id: ${this.current_id}`)
            console.log(`and this is the current markers length: ${markers.length}`)
            console.log(markers)
            // console.log(`${id} this is from delete marker`)
            DeleteMarker(id);
            this.delete_data(id)
            
        },
        // delete marker in create activity
        delete_marker(id) {
            // console.log(`${id} this is from delete marker`)
            if (this.current_id == markers.length - 1) {
                return
            } else if (this.current_id != markers.length - 1    ) {
                DeleteMarker(id);
                this.delete_data(id)
            }
            
        },
        // get country code
        get_country_code(country) {
            return countryList[country]
        },
        get_capital_city(lettercode) {
            return capitalList[lettercode]
        },
        // set center to selected country
        set_country_center(country, map) {
            // setCenter for map
            var service = new google.maps.places.PlacesService(map)
            var request = {
                query: country,
                fields: ['geometry'],
              };
            service.findPlaceFromQuery(request, function(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // console.log(results[0].geometry.location)
                    map.setCenter(results[0].geometry.location);
                }
              });
        },

        // create/edit acitvity-related codes

        // toggle display for create activity
        d_create() {
            if (this.create_true == false) {
                return "none"
            } else if (this.create_true == true) {
                return ""
            }
        },
        // toggle display for edit activity
        d_edit() {
            if (this.edit_true == false) {
                return "none"
            } else if (this.edit_true == true) {
                return ""
            }
        },
        // calculate value from
        calculate_to_from() {
            if (this.from != "SGD"){
                this.to = "SGD"
            }

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
        // calculate value to
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
        


        // database-related codes

        // read location data from database
        async read_from_existing() {
            var lodging_locations = await this.retrieve_lodging_locations()
            // console.log(lodging_locations)
            const data_to_be_read = ref(db, `trips/${this.trip_id}/activities`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.existing_locations = data
                    
                    uniqueId = data.length
                    markers = []
                    // console.log(lodging_locations)
                    window.initMap = initMap(this.existing_locations, lodging_locations);
                    
                }
                // retrieve recommended places for new trips
                else {
                    const data_to_be_read = ref(db, `locations`);
                    onValue(data_to_be_read, (snapshot) => {
                        const data2 = snapshot.val();
                        if (data2) {
                            this.existing_locations = data2
                            
                            window.initMap = initMap(this.existing_locations);
                        }
                    })
                }
                })   
            },
        // read group members for voting
        read_group_members() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/trip_details`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    this.group_members = data.g_member
                    var group_leader = this.trip_id.split('urjfjwowskdorrofkckshecoejfnek')[1]
                    this.group_members.push(group_leader)
                    
                    // console.log(data)
                }})
        },
        // write edit activity detail to database
        create_update_data() {
            // create new object
            var new_obj = {
                address: this.selected_address,
                description: this.selected_description,
                latlng: this.selected_latlng,
                name: this.selected_name,
                tag: this.tag_input,
                
            }

            // check for empty strings
            
            if (this.amount == "") {
                this.amount = 0
            }
            if (this.amount == "") {
                this.converted_amount = 0
            }
            // update price
            new_obj.price = {
                krw: this.converted_amount,
                sgd: this.amount,
            }

            // settle voting
            if (!this.no) {
                this.no = []
            }
            if (!this.yes) {
                this.yes = []
            }
            if (!this.yet_to_vote) {
                this.yet_to_vote = []
            }
            // update votes
            new_obj.votes = { 
                no: this.no, 
                yes: this.yes, 
                yet_to_vote: this.yet_to_vote
            }
            // push to existing places under current id
            this.existing_locations[this.current_id] = new_obj
            // push data to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
            // reset fields
            this.description = ""
            this.yet_to_vote = []
            this.tag_input = ""
            this.amount = ""
            this.converted_amount = ""
            console.log(this.current_id)
            this.current_id = this.existing_locations.length
            console.log(this.current_id)
        },
        // write activity for new activities
        create_new_data() {
            // create new object
            // console.log(this.group_members)
            var new_obj = {
                address: this.selected_address,
                description: this.selected_description,
                latlng: this.selected_latlng,
                name: this.selected_name,
                tag: this.tag_input,
                votes: { 
                    no: [], 
                    yes: [], 
                    yet_to_vote: this.group_members
                }
            }
            // check for empty strings
            if (this.amount == "") {
                this.amount = 0
            }
            if (this.amount == "") {
                this.converted_amount = 0
            }
            // update price
            new_obj.price = {
                krw: this.converted_amount,
                sgd: this.amount,
            }
            // console.log(new_obj)
            // push to existing places under current id
            this.existing_locations[this.current_id] = new_obj
            // push data to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
            // clear yet_to_vote for next activity
            this.yet_to_vote = [];
            // clear autocomplete input field for next activity
            // console.log(document.getElementById('autocomplete').value )
            document.getElementById('autocomplete').value = ""

        },
        // delete activity from database
        delete_data(id) {
            // remove location from existing locations
            delete this.existing_locations[id] 
            // write to database
            console.log("Writing data into database...")
            
            set(ref(db, `trips/${this.trip_id}/activities`), this.existing_locations)
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
        // clog all details
        console_all() {
            for (var key in vm.$data) {
                console.log(`${key} : ${vm.$data[key]}`)
            }

        },
        // retrieve location details for edit activity page
        retrieve_edit_activity_info(id) {
            var details = this.existing_locations[id];
            // console.log(details);
            this.selected_address = details.address;
            this.selected_description = details.description;
            this.selected_latlng = details.latlng;
            this.selected_name = details.name;
            this.converted_amount = details.price.krw;
            this.amount = details.price.sgd;
            this.tag_input = details.tag;
            this.no = details.votes.no;
            this.yes = details.votes.yes;
            this.yet_to_vote = details.votes.yet_to_vote;
        },
        // retrieve lodging locations
        async retrieve_lodging_locations() {
            
            const path_location = ref(db, `trips/${this.trip_id}/lodging`)

            const snapshot = await get(path_location)
            var locations = snapshot.val()
            return locations
            // // console.log(locations)
            // var addresses = []
            // for (var locas of locations) {
            //     addresses.push(locas.accom_address)
            // }
            // // console.log(addresses)
            // return addresses
        },

        // retrieve_trip_name_date() {
        //     // name of trip, trip to where, date
        //     const data_to_be_read = ref(db, `trips/${this.trip_id}/trip_details`);
        //     onValue(data_to_be_read, (snapshot) => {
        //         const data = snapshot.val();
        //         // check if there is existing data on db
        //         if (data) {
        //             console.log(data)
        //             var country = data.destination[0]
        //             var end_date = new Date(data.end_date)
        //             var start_date = new Date(data.start_date)
        //             this
        //         }
        //         // retrieve recommended places for new trips
        //         else {
        //             const data_to_be_read = ref(db, `locations`);
        //             onValue(data_to_be_read, (snapshot) => {
        //                 const data2 = snapshot.val();
        //                 if (data2) {
        //                     // this.existing_locations = data2
                            
        //                     // window.initMap = initMap(this.existing_locations);
        //                 }
        //             })
        //         }
        //         })
        // },

        
        // retrieve trip details from localStorage
        retrieve_from_cache() {
            if (localStorage.getItem('user')) {
                this.trip_id = localStorage.getItem('user')
            }
            if (localStorage.getItem('trip')) {
                this.trip_id = localStorage.getItem('trip')
            }
            if (localStorage.getItem('trip_start_date')) {
                // format YYYY-MM-DD to "DD Month Year"
                var start_date = this.convert_datetime_str_to_date_obj(localStorage.getItem('trip_start_date'))
                var end_date = this.convert_datetime_str_to_date_obj(localStorage.getItem('trip_end_date'))
                // set duration
                var duration = `${start_date.getDate()} ${start_date.getMonth()} ${start_date.getFullYear()} - ${end_date.getDate()} ${end_date.getMonth()} ${end_date.getFullYear()}`
                this.trip_details[duration] = duration
                console.log(this.trip_details)
            }
            if (localStorage.getItem('destination')) {
                var country = localStorage.getItem('destination')
                this.trip_details[country] = country
            }
        },

        // Datetime details
        convert_datetime_str_to_date_obj(datetime_str) {
            // format: 2022-10-05
            let arr_depart_datetime = datetime_str.split(" ")
            let datetime_date_arr = arr_depart_datetime[0].split("-")
        
            let new_date_obj = new Date(datetime_date_arr[0], Number(datetime_date_arr[1])-1, datetime_date_arr[2])
        
            return new_date_obj
        }
    },
    
    // load data from database before initialising map and mounting vue
    async created() {
        // get cached information
        await this.retrieve_from_cache()
        // get recommended/existing locations from database
        await this.read_from_existing()
        // get group size from database
        await this.read_group_members()
        // await this.retrieve_trip_name_date()
        
    }
});
const vm = app.mount('#app'); 

// main js variables
let country_list = {
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
}

// To generate drop down list for country currency

const dropList = document.querySelectorAll("form select");
// fromCurrency = document.querySelector(".from select"),
// toCurrency = document.querySelector(".to select"),
// getButton = document.querySelector("form button");

// dropdown list for activities
for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in country_list){
        // selecting USD by default as FROM currency and NPR as TO currency
        let selected = i == 0 ? currency_code == "SGD" ? "selected" : "" : currency_code == "KRW" ? "selected" : "";
        // creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserting options tag inside select tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // calling loadFlag with passing target element as an argument
    });
}

// loading Flag - activities
function loadFlag(element){
    for(let code in country_list){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag of particular drop list
            // passing country code of a selected currency code in a img url
            imgTag.src = `https://flagcdn.com/48x36/${country_list[code].toLowerCase()}.png`;
        }
    }
}

// export mounted instance to access it outside of module
export {vm}


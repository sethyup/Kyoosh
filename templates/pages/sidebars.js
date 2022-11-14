import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, confirmPasswordReset } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import { getDatabase, ref, onValue, get, push, set } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-database.js";

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
const auth = getAuth(WADTravel)
const db = getDatabase(WADTravel)
const google_provider = new GoogleAuthProvider()

const sidebar = Vue.createApp({
    data(){
    //     return{
    //         trip_details: "",
    //         trip_id: "kbang bangkok bangbongurjfjwowskdorrofkckshecoejfnekkbang@yahoocom",
    //         s_date: "", 
    //         e_date: "", 
    //         date_array: [],
    //     }
        return{    
            username: "",
            user_pic: ""
        }
    },

    methods:{
        get_username(){
            // get username
            if (localStorage.getItem('username')) {
                this.username = localStorage.getItem('username')

            } else {
                this.username = "Login Chap"
            }
            // console.log("USERNAME: ", this.username)
        },

        get_user_pic(){
            let username_array = ["adambft", "kbang", "JUNS", "mrsethbean", "weibeast", "sethy"]
            if (username_array.includes(this.username)){
                this.user_pic = "https://kengboonang.github.io/WADBrothers.github.io/images/profile_pic/" + this.username + ".jpg"
            } else {
                this.user_pic = "https://kengboonang.github.io/WADBrothers.github.io/images/profile_pic/placeholder.jpg"
            }

            // console.log("USER PIC: ", this.user_pic)
        },

        sign_out() {
            console.log("starting to log out user...")
            signOut(auth).then(
            function success_sign_out() {
                console.log("sign out successful")
                localStorage.clear()
            },
            function failed_sign_out() {
                // alert("sign out failed")
                console.log("sign out failed")
            }
            )
        },

        // read existing locations from the database
        read_from_existing_locations() {
            const data_to_be_read = ref(db, `trips/${this.trip_id}/trip_details`);
            onValue(data_to_be_read, (snapshot) => {
                const data = snapshot.val();
                // check if there is existing data on db
                if (data) {
                    this.trip_details = data
                    this.s_date = this.trip_details.start_date
                    this.e_date = this.trip_details.end_date
                    // console.log("TRIP DETAILS", this.s_date, this.e_date)
                    this.create_dates_array(this.s_date, this.e_date)
                }
                // retrieve recommended places for new trips
                // else {
                //     const data_to_be_read = ref(db, `locations`);
                //     onValue(data_to_be_read, (snapshot) => {
                //         const data2 = snapshot.val();
                //         if (data2) {
                //             this.existing_locations = data2
                //         }
                //     })
                // }
                })
            },
        convert_date_obj_to_str(date_obj) {
                return `${date_obj.getFullYear()}-${("0" + (date_obj.getMonth()+1)).slice(-2)}-${("0" + (date_obj.getDate())).slice(-2)}`
            },
        create_dates_array(s_date, e_date){
            // console.log("function dates_array")
                var s_date_obj = new Date(s_date)
                var e_date_obj = new Date(e_date)
            
                var increment_date_obj = new Date(s_date)
            
            
                while (increment_date_obj <= e_date_obj) {
                    var date_str_to_push = this.convert_date_obj_to_str(increment_date_obj)
                    this.date_array.push(date_str_to_push)
            
                    increment_date_obj.setDate(increment_date_obj.getDate() + 1)
                }
            // console.log("render", this.date_array)
            
                // return this.date_array
            },

    }, 
    async created() {
        // get cached information
        await this.get_username()

        await this.get_user_pic()
    }
    // async created() {
    //     await this.read_from_existing_locations()
    // }
});

sidebar.component('sidebar-general', {
    props: ["comp_username", "comp_user_pic"],
    template: 
        `
        <div class="col-auto sticky-top">
            <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                    <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
                </a>
                <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                    <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
                </a>

                <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    
                    <!--Home-->
                    <li class="nav-item">
                        <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                            <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                        </a>
                    </li>

                    <!--Activities-->
                    <li class="d-none d-sm-inline">
                        <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                            <span class="fs-5 ms-1"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                            <span class="fs-5 ms-1">Activities</span>
                        </a>

                        <ul class="collapse nav flex-column ms-3 show bring-front" id="submenu1" data-bs-parent="#menu">
                            <li class="w-100">
                                <a href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html" class="nav-link px-0">
                                    <i class="fa-solid fa-right-long fa-xs"></i> Map View
                                </a>
                            </li>
                            <li>
                                <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                    <i class="fa-solid fa-right-long fa-xs"></i> List View
                                </a>
                            </li>
                        </ul>
                    </li>

                    <div class=" pb-4 d-sm-none">
                        <a href="#" class="text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                        </a>
                        <ul class="dropdown-menu text-small shadow bring-front" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html">Map View</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html">List View</a></li>
                        </ul>
                    </div>

                    <!--Lodging-->
                    <li>
                        <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging_phase2.html" class="nav-link px-0 align-middle">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i></span>
                            <span class="fs-5 ms-1 d-none d-sm-inline">Lodging</span>
                        </a>
                    </li>
                    <!--Budget-->
                    <li>
                        <a href="#" class="nav-link px-0 align-middle">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-wallet fa-xs"></i></span>
                            <span class="fs-5 ms-1 d-none d-sm-inline">Budget</span>
                        </a>
                    </li>
                </ul>
                <hr>
                <div style="width:100%;" class="d-flex justify-content-center">
                    <button class="btn btn-main-fixed d-none d-sm-inline" href="#">Confirm Activities</button>
                </div>

                
                <div style="width:100%;" class="d-flex justify-content-center">
                    <button class="btn btn-main-fixed d-inline d-sm-none" style="font-size: 10px;" href="#">Confirm<br>Activities</button>
                </div>
                <hr>

                <div class="dropdown pb-4">
                    <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                        <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                        <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </div>
        `
    })

sidebar.component('sidebar-phase2', {
    props: ["comp_username", "comp_user_pic"],
    template: 
           `
           <div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
                    </a>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
                    </a>

                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>

                        <!--Activities-->
                        <li class="d-none d-sm-inline">
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                                <span class="fs-5 ms-1">Activities</span>
                            </a>

                            <ul class="collapse nav flex-column ms-3 show bring-front" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html" class="nav-link px-0">
                                        <i class="fa-solid fa-right-long fa-xs"></i> Map View
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                        <i class="fa-solid fa-right-long fa-xs"></i> List View
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <div class=" pb-4 d-sm-none">
                            <a href="#" class="text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                            </a>
                            <ul class="dropdown-menu text-small shadow bring-front" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html">Map View</a></li>
                                <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html">List View</a></li>
                            </ul>
                        </div>


                        <!--Flight & Lodging-->
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page_phase2.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Flight</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging_phase2.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Lodging</span>
                            </a>
                        </li>
                    </ul>
                    <hr>
                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-fixed d-none d-sm-inline" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/select_activities_page/select_activities_page.html'">Confirm Activities</button>
                    </div>

                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-fixed d-inline d-sm-none" style="font-size: 10px;" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/select_activities_page/select_activities_page.html'">Confirm<br>Activities</button>
                    </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="comp_user_pic" alt="pic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
           `
    })

sidebar.component('sidebar-member-phase2', {
    props: ["comp_username", "comp_user_pic"],
    template: 
    `
    <div class="col-auto sticky-top">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
            </a>
            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
            </a>
        
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                
                <!--Home-->
                <li class="nav-item">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                        <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                        <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                    </a>
                </li>

                <!--Activities-->
                <li class="d-none d-sm-inline">
                    <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                        <span class="fs-5 ms-1"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                        <span class="fs-5 ms-1">Activities</span>
                    </a>

                    <ul class="collapse nav flex-column ms-3 show bring-front" id="submenu1" data-bs-parent="#menu">
                        <li class="w-100">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html" class="nav-link px-0">
                                <i class="fa-solid fa-right-long fa-xs"></i> Map View
                            </a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                <i class="fa-solid fa-right-long fa-xs"></i> List View
                            </a>
                        </li>
                    </ul>
                </li>

                <div class=" pb-4 d-sm-none">
                    <a href="#" class="text-decoration-none" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                    </a>
                    <ul class="dropdown-menu text-small shadow bring-front" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/map_phase2.html">Map View</a></li>
                        <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html">List View</a></li>
                    </ul>
                </div>


                <!--Flight & Lodging-->
                <li>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page_phase2.html" class="nav-link px-0 align-middle">
                        <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i></span>
                        <span class="fs-5 ms-1 d-none d-sm-inline">Flight</span>
                    </a>
                </li>
                <li>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging_phase2.html" class="nav-link px-0 align-middle">
                        <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i></span>
                        <span class="fs-5 ms-1 d-none d-sm-inline">Lodging</span>
                    </a>
                </li>
            </ul>
            <hr>

            <div class="dropdown pb-4">
                <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                    <span class="d-none d-sm-inline mx-1">{{comp_username}}</span>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                    <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                </ul>
            </div>
        </div>
    </div>
    `
    })

sidebar.component('select-activity-sidebar', {
    props: ["comp_username", "comp_user_pic"],
    template: 
            ` <div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
                    </a>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                            
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>
                    
                    </ul>
                    <hr>
                        <div style="width:100%;" class="d-flex justify-content-center">
                            <button class="btn btn-main-bold-fixed d-none d-sm-inline" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html'">\< Back</button>
                        </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="comp_user_pic" alt="pic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })

sidebar.component('sidebar-phase3', {
    props: ['date_array', 'comp_username', 'comp_user_pic'],
    template: 
            ` <div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
                    </a>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>

                        <!--Itinerary-->
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/map_phase3.html" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Itinerary</span>
                            </a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page_phase3.html" class="nav-link px-0 align-middle">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i></span>
                            <span class="fs-5 ms-1 d-none d-sm-inline">Flight</span>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging_phase3.html" class="nav-link px-0 align-middle">
                            <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i></span>
                            <span class="fs-5 ms-1 d-none d-sm-inline">Lodging</span>
                        </li>
                    </ul>
                    
                    
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })

sidebar.component('sidebar-phase4', {
    props: ['date_array', 'comp_username', 'comp_user_pic'],
    template: 
            ` <div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-none d-sm-inline">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120">         
                    </a>
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none d-sm-none">
                        <img src="https://kengboonang.github.io/WADBrothers.github.io/Logo-SMALL.png" width="50">         
                    </a>

                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-sm-inline"><i class="fa-solid fa-house fa-xs"></i></span>
                                <span class="fs-5 ms-1 d-none d-sm-inline">Home</span>
                            </a>
                        </li>
                    </ul>

                    <hr>
                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-bold-fixed d-none d-sm-inline" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/map_phase3.html'"><i class="fa-solid fa-pen fa-xs"></i> Edit Mode</button>
                    </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })


sidebar.mount('#nav')
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


const main = Vue.createApp({
    data(){
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
                    this.username = "Login Pls!"
                }
            },
            get_user_pic(){
                if (this.username){
                    this.user_pic = "https://kengboonang.github.io/WADBrothers.github.io/images/profile_pic/" + this.username + ".jpg"
                } else {
                    this.user_pic = "https://images.theconversation.com/files/304864/original/file-20191203-67028-qfiw3k.jpeg?ixlib=rb-1.1.0&rect=638%2C2%2C795%2C745&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip"
                }
            },

            sign_out() {
                console.log("starting to log out user...")
                signOut(auth).then(
                function success_sign_out() {
                    alert("sign out successful")
                    console.log("sign out successful")
                    localStorage.clear()
                },
                function failed_sign_out() {
                    alert("sign out failed")
                    console.log("sign out failed")
                }
                )
            }
        }, 
        async created() {
            await this.get_username()
            await this.get_user_pic()
        }
});

main.component('homepage-navbar', {
    props: ["comp_username", "comp_user_pic"],
    template: 
            `<nav class="navbar navbar-expand-sm navbar-light border-bottom sticky-top blurred">
                <div class="container">
                    <a class="navbar-brand" href="#"><img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120"></a>

                        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>

                    <div class="collapse navbar-collapse" id="collapsibleNavId">
                        <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                            <li class="nav-item">
                                <button type="button" class="d-sm-none nav-link btn btn-main-fixed" style="width: 150px;" onclick="location.href='create-trip.html' ">+ Plan New Trip</button>                       
                            </li>
                        </ul>

                        <div style="width: calc(8vw + 150px)" class="d-flex justify-content-center">
                            <button type="button" class="d-none d-sm-block btn btn-main mx-3" onclick="location.href='create-trip.html'">+ Plan New Trip</button>
                        </div>
                        
                        <div class="dropdown">
                            <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                                <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </nav>
            `
})

main.component('createtrip-navbar', {
    props: ["comp_username", "comp_user_pic"],
    template: 
            `<nav class="navbar navbar-expand-sm navbar-light border-bottom sticky-top blurred">
            <div class="container">
                <a class="navbar-brand" href="#"><img src="https://kengboonang.github.io/WADBrothers.github.io/Logo.png" width="120"></a>
                <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <div class="dropdown d-none d-sm-inline">
                        <a href="#" class="text-dark text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img :src="comp_user_pic" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1 text-dark">{{comp_username}}</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html" @click="$emit('btnclick')">Sign out</a></li>
                        </ul>
                    </div>

                    <div class="dropdown d-sm-none">
                        <button type="button" class="btn btn-outline-warning my-2" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html'" @click="$emit('btnclick')">Sign Out</button>
                    </div>
                </div>
                
            </div>
        </nav>`
    })

main.mount('#nav')
// signup code
console.log("this page is linked to signup_login.js")

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
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

const root = Vue.createApp({
    data() {
        return{
            email: "",

            password: "",

            username: "",
            
            first_name: "",

            last_name: ""
        }
    },
    
    methods: {
        sign_up() {
            var email = this.email
            var password = this.password
            console.log("starting to create user...")
            createUserWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    // Signed Up 

                    // save user account details to database
                    console.log("starting to write user data...")
                    console.log(userCredential)
                    set(ref(db, "users/" + this.username), {
                        email: this.email,
                        fullname: this.first_name + " " + this.last_name,
                        trips: []
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
                    // display "Success" message
                    alert("Sign Up Successful")
                    console.log("user created")


                    // redirects to Log In page
                    // find a way to use await and wait for the update to database, if not this will cancel the update
                    // location.replace("/*http://localhost/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html*/")
                    const user = userCredential.user;
                })
                .catch((error) => {
                    // for admin, tells you what error there is
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log(errorCode)

                    // display "Error" message
                    // stays on the same page
                    var failed_message = `Sign Up Unsuccessful. Error: ${errorMessage}`
                    alert(failed_message)
                    console.log("user not created")
                });
        },

        login() {
            var email = this.email
            console.log(email)
            console.log(typeof email)
            var password = this.password
            console.log("starting to log in user...")
            signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    //signed in

                    // display Success message
                    alert("Login Successful")
                    console.log("user login successful")
                    // redirects to home page
                    // location.replace("")
                    const user = userCredential.user;
                })
                .catch((error) => {
                    // for admin, tells you what error there is
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log(errorCode)

                    // display "Error" message
                    // stays on the same page
                    var failed_message = `Sign Up Unsuccessful. Error: ${errorMessage}`
                    alert(failed_message)
                    console.log("user not created")
                })
        },

        sign_out() {
            console.log("starting to log out user...")
            signOut(auth).then(
            function success_sign_out() {
                alert("sign out successful")
                console.log("sign out successful")
            },
            function failed_sign_out() {
                alert("sign out failed")
                console.log("sign out failed")
            }
            )
        },
        
        reset_password() {
        },
    }

})


//Mount
root.mount('#signuplogin')


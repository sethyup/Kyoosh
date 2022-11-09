// signup code
console.log("this page is linked to signup_login.js")

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

const root = Vue.createApp({
    data() {
        return{
            email: "",

            password: "",

            username: "",
            
            first_name: "",

            last_name: "",
            
            reset_code: "",

            new_password_1: "",

            new_password_2: "",
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
                            console.log("Write Operation Successful")
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
                    // display "Success" message
                    console.log("user created")


                    // redirects to Log In page
                    // find a way to use await and wait for the update to database, if not this will cancel the update
                    location.replace("https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html")
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
                    var failed_message = `Sign Up Unsuccessful. ${errorMessage}`
                    document.getElementById("error").attributes[2].nodeValue = ""
                    document.getElementById("error").innerHTML = `
                    ${failed_message}
                    `
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
                    console.log("user login successful")
                    // redirects to home page
                    const user = userCredential.user;
                    console.log(user)
                    
                    location.replace("https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html")
                })
                .catch((error) => {
                    // for admin, tells you what error there is
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log(errorCode)

                    // display "Error" message
                    // stays on the same page
                    var failed_message = `Log In Unsuccessful. ${errorMessage}`
                    document.getElementById("error").attributes[2].nodeValue = ""
                    document.getElementById("error").innerHTML = `
                    ${failed_message}
                    `
                    // alert(failed_message)
                    console.log("user not created")
                })
        },

        login_with_google() {
            console.log(`Logging in using Google API`)
            signInWithPopup(auth, google_provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;

                // Adding the user to the database

                console.log(user.displayName)
                console.log(user.email)

                set(ref(db, "users/" + user.displayName), {
                    email: user.email,
                    fullname: user.displayName,
                    trips: []
                  })
                .then(
                    function write_success() {
                        // display "Success" message
                        console.log("Write Operation Successful")
                })
                .catch((error) => {
                    // for us to debug, tells us what error there is,
                    const errorCode = error.code;
                    const errorMessage = error.message;
    
                    // display "Error" message
                    var failed_message = `Write Operation Unsuccessful. Error Code ${errorCode}: ${errorMessage}`
                    console.log(failed_message);
                })

                console.log(`Log In Successful`)    
                location.replace("https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html")            

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // // The email of the user's account used.
                // const email = error.customData.email;
                // // The AuthCredential type that was used.
                // const credential = GoogleAuthProvider.credentialFromError(error);
                
                console.log(errorCode + ': ' + errorMessage)
                var failed_message = `Log In Unsuccessful. ${errorMessage}`
                document.getElementById("error").attributes[2].nodeValue = ""
                document.getElementById("error").innerHTML = `
                ${failed_message}
                `
                // alert(failed_message)
                console.log("user not created")
            });
        },

        send_reset_email() {
            sendPasswordResetEmail(auth, this.email)
            .then(function(){
                console.log("email sent")
                document.getElementById("sent_status").attributes[2].nodeValue = "display:block;"
                // location.replace("./reset_password_page.html")
            })
            .catch(function(){

                // for admin, tells you what error there is
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(errorCode)

                // display "Error" message
                // stays on the same page
                var failed_message = `Sending Email Unsuccessful. ${errorMessage}`
                document.getElementById("error").attributes[2].nodeValue = ""
                document.getElementById("error").innerHTML = `
                ${failed_message}
                `
                // alert(failed_message)
                console.log("email not sent")
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
            if(this.new_password_2 == this.new_password_1){
                confirmPasswordReset(auth, this.reset_code, this.password)
                .then(function(){
                    console.log("password reset")
                    var success_message = "Password Successfully Reset!"
                    document.getElementById("reset_status").innerText = success_message
                    // location.replace("./login_page.html")
                })
                .catch(function(){
                    // for admin, tells you what error there is
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    console.log(errorCode)

                    // display "Error" message
                    // stays on the same page
                    var failed_message = `Reset Unsuccessful. ${errorMessage}`
                    document.getElementById("error").attributes[2].nodeValue = ""
                    document.getElementById("error").innerHTML = `
                    ${failed_message}
                    `
                    // alert(failed_message)
                    console.log("password not reset")
                })
            }
            else{
                var different_new_passwords = "The two passwords typed do not match!"
                document.getElementById("reset_status").innerText = different_new_passwords
            }

        },
    }

})


//Mount
root.mount('#signuplogin')


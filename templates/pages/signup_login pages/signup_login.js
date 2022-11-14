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
            login_email: "",

            signup_email: "",

            password: "",

            login_password: "",

            signup_password: "",

            username: "",
            
            first_name: "",

            last_name: "",
            
            reset_code: "",

            new_password_1: "",

            new_password_2: "",

            db_usernames: []
        }
    },

    async created() {
        var users = await this.get_database_usernames()
        console.log(users)
        for (var user in users) {
            let username = users[user].username
            // console.log(username)
            this.db_usernames.push(username)
        }

        console.log(this.db_usernames)
    },
    
    methods: {
        async get_database_usernames () {
            const path_location = ref(db,"users")
            const snapshot = await get(path_location)
            var users = snapshot.val()
            
            return users
        },

        sign_up() {
            if(this.first_name && this.last_name && this.signup_email && this.signup_password && this.username){
                var email = this.signup_email
                var password = this.signup_password
                var username = this.username
                console.log("starting to create user...")
                if(this.db_usernames.includes(username)){
                    var failed_message = `Username is already taken! Try a different one!`
                    document.getElementById("error").attributes[2].nodeValue = ""
                    document.getElementById("error").innerHTML = `
                    ${failed_message}
                    `
                    console.log("user not created")
                }
                else{
                    createUserWithEmailAndPassword(auth, email, password)
                    .then(
                        (userCredential) => {
                            // Signed Up 
        
                            // save user account details to database
                            console.log("starting to write user data...")
                            console.log(userCredential)
                            set(ref(db, "users/" + this.signup_email.replaceAll(".","")), {
                                email: this.signup_email,
                                username: this.username,
                                fullname: this.first_name + " " + this.last_name,
                                trips: ['Example Trip To Seoul!']
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
                            location.replace("./login_page.html")
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
                        })
                }
            }
            else{
                var failed_message = `Make sure to fill in all the input fields!`
                document.getElementById("error").attributes[2].nodeValue = ""
                document.getElementById("error").innerHTML = `
                ${failed_message}
                `
                console.log("user not created")
            }
           
        },

        login() {
            var email = this.login_email
            var password = this.login_password
            console.log("starting to log in user...")
            signInWithEmailAndPassword(auth, email, password).then(
                (userCredential) => {
                    //signed in

                    // display Success message
                    // redirects to home page
                    const user = userCredential.user;
                    const email = user.email.replaceAll(".","")
                    console.log(email)
                    localStorage.setItem("user", email)
        
                    console.log("user login successful")
                    location.href = "https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html"
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
                    console.log("user not logged in")
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
                const userID = user.email.replaceAll(".","")
                console.log(userID)
                localStorage.setItem("user", userID)

                // CHECK IF USER IS ALREADY REGISTERED, IF NOT CREATE NEW ENTRY
                const arr_of_users = ref(db, "users")
                onValue(arr_of_users, (snapshot) => {
                    const data = snapshot.val()
                    console.log(Object.keys(data))
                    const all_users = Object.keys(data)
                    if(!(all_users.includes(userID))){
                        set(ref(db, "users/" + userID), {
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
                    }
                })
                

                console.log(`Log In Successful`)
                console.log(localStorage.getItem("user"))    
                location.replace("../trips-homepage.html")

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
                // alert("sign out successful")
                console.log("sign out successful")
                localStorage.clear()
            },
            function failed_sign_out() {
                // alert("sign out failed")
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


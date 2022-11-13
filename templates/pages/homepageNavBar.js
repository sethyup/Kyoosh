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
                }
            },
            get_user_pic(){
                if (this.username){
                    this.user_pic = "https://kengboonang.github.io/WADBrothers.github.io/images/profile_pic/" + this.username + ".jpg"
                }
            },
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
                    <a class="navbar-brand" href="#"><b>Kyoosh</b></a>
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
                                <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
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
                <a class="navbar-brand" href="#"><b>Kyoosh</b></a>
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
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>

                    <div class="dropdown d-sm-none">
                        <button type="button" class="btn btn-outline-warning my-2" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html'">Sign Out</button>
                    </div>
                </div>
                
            </div>
        </nav>`
    })

main.mount('#nav')
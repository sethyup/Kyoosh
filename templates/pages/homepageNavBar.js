const main = Vue.createApp({
    
});

main.component('homepage-navbar', {
    template: 
            `<nav class="navbar navbar-expand-sm navbar-light bg-light border-bottom border-secondary sticky-top">
                <div class="container">
                    <a class="navbar-brand" href="#"><b>The JAWKS-7</b></a>
                        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavId">

                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <button class="d-sm-none nav-link btn btn-main-fixed" style="width: 150px;" href="#">+ Plan New Trip</button>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="#" aria-current="page">Trips <span class="visually-hidden">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Friends</a>
                        </li>
                        <li class="nav-item">
                            <a class="d-sm-none nav-link" href="#">Account</a>
                        </li> 
                    </ul>

                    <div style="width: calc(8vw + 150px)" class="d-flex justify-content-center">
                        <button type="button" class="d-none d-sm-block btn btn-main mx-3">+ Plan New Trip</button>
                    </div>
                    
                    <!-- <a class="d-none d-sm-block" href="#">
                        <img width="40px" src="https://img.icons8.com/ios-filled/100/000000/user-male-circle.png"/>
                    </a> -->

                    <a class="d-none d-sm-block" href="#">
                        <i class="fa-solid fa-circle-user fa-2xl text-dark"></i>
                    </a>

                </div>
            </nav>`
    })

main.component('createtrip-navbar', {
    template: 
            `<nav class="navbar navbar-expand-sm navbar-light bg-light border-bottom border-secondary sticky-top">
                <div class="container">
                    <a class="navbar-brand" href="#"><b>The JAWKS-7</b></a>
                        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                    <div class="collapse navbar-collapse" id="collapsibleNavId">
        
                    <ul class="navbar-nav me-auto mt-2 mt-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="#" aria-current="page">Trips <span class="visually-hidden">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Friends</a>
                        </li>
                        <li class="nav-item">
                            <a class="d-sm-none nav-link" href="#">Account</a>
                        </li> 
                    </ul>
        
                    <a class="d-none d-sm-block" href="#">
                        <i class="fa-solid fa-circle-user fa-2xl text-dark"></i>
                    </a>
        
                </div>
            </nav>`
    })

main.mount('#nav')
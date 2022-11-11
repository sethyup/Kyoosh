const sidebar = Vue.createApp({
    
});

sidebar.component('sidebar-general', {
    template: 
            `<div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span class="fs-4 d-none d-sm-inline fw-bold">The JAWKS-7</span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-house fa-xs"></i> Home</span>
                            </a>
                        </li>

                        <!--Activities-->
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i> Activities</span>
                            </a>

                            <ul class="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="../../map_phase2.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Map View</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> List View</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging.html" class="nav-link px-0"> 
                                        <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i> Lodging</span></a>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="#" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-wallet fa-xs"></i> Budget</span></a>
                        </li>
                    </ul>
                    <hr>
                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-fixed d-none d-sm-inline" href="#">Confirm Activities</button>
                    </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1">Bean</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    })

sidebar.component('sidebar-phase2', {
    template: 
            `<div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span class="fs-4 d-none d-sm-inline fw-bold">The JAWKS-7</span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-house fa-xs"></i> Home</span>
                            </a>
                        </li>

                        <!--Activities-->
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i> Activities</span>
                            </a>

                            <ul class="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="../../map_phase2.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Map View</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> List View</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i> Flight</span></a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i> Lodging</span></a>
                        </li>
                    </ul>
                    <hr>
                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-fixed d-none d-sm-inline" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/select_activities_page/select_activities_page.html'">Confirm Activities</button>
                    </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1">Bean</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })

sidebar.component('sidebar-member-phase2', {
    template: 
            `<div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span class="fs-4 d-none d-sm-inline fw-bold">The JAWKS-7</span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-house fa-xs"></i> Home</span>
                            </a>
                        </li>

                        <!--Activities-->
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i> Activities</span>
                            </a>

                            <ul class="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="../../map_phase2.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Map View</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> List View</span>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i> Flight</span></a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i> Lodging</span></a>
                        </li>
                    </ul>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1">Bean</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })

sidebar.component('select-activity-sidebar', {
    template: 
            `<div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span class="fs-4 d-none d-sm-inline fw-bold">The JAWKS-7</span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-house fa-xs"></i> Home</span>
                            </a>
                        </li>

                        <!--Activities-->
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i> Activities</span>
                            </a>

                            <ul class="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="../../map_phase2.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Map View</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> List View</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <hr>
                    <div style="width:100%;" class="d-flex justify-content-center">
                        <button class="btn btn-main-bold-fixed d-none d-sm-inline" onclick="location.href='https://kengboonang.github.io/WADBrothers.github.io/templates/activity_card_listview/activity_card.html'">< Back</button>
                    </div>
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1">Bean</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })

sidebar.component('sidebar-phase3', {
    template: 
            ` <div class="col-auto sticky-top">
                <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                        <span class="fs-4 d-none d-sm-inline fw-bold">The JAWKS-7</span>
                    </a>
                    <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                        <!--Home-->
                        <li class="nav-item">
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html" class="nav-link align-middle px-0">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-house fa-xs"></i> Home</span>
                            </a>
                        </li>

                        <!--Itinerary-->
                        <li>
                            <a href="#submenu1" data-bs-toggle="collapse" class="nav-link px-0 align-middle ">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-map-location-dot fa-xs"></i> Itinerary</span>
                                </a>

                            <ul class="collapse nav flex-column ms-3" id="submenu1" data-bs-parent="#menu">
                                <li class="w-100">
                                    <a href="#" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Day 1</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Day 2</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Day 3</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Day 4</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="nav-link px-0"> 
                                        <span class="d-none d-sm-inline"><i class="fa-solid fa-right-long fa-xs"></i> Day 5</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/flight_page/flight_page.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-plane fa-xs"></i> Flight</span></a>
                        </li>
                        <li>
                            <a href="https://kengboonang.github.io/WADBrothers.github.io/templates/lodging/lodging.html" class="nav-link px-0 align-middle">
                                <span class="fs-5 ms-1 d-none d-sm-inline"><i class="fa-solid fa-hotel fa-xs"></i> Lodging</span></a>
                        </li>
                    </ul>
                    
                    
                    <hr>

                    <div class="dropdown pb-4">
                        <a href="#" class="d-flex align-items-center text-success text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/3/33/Mr._Bean_2011.jpg" alt="profilepic" width="30" height="30" class="rounded-circle">
                            <span class="d-none d-sm-inline mx-1">Bean</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/trips-homepage.html">My Trips</a></li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/edit_trip_name/edit_trip_name.html">Edit Trip Details</a></li>
                            <li><a class="dropdown-item" href="#">Profile</a></li>
                            <li>
                                <hr class="dropdown-divider">
                            </li>
                            <li><a class="dropdown-item" href="https://kengboonang.github.io/WADBrothers.github.io/templates/pages/signup_login%20pages/login_page.html">Sign out</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            `
    })


sidebar.mount('#nav')
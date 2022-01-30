<template>
    <div id="nav-wrapper" class="col-sm-auto">
        <nav>
            <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark min-vh-100">
                <router-link to="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                <img class="icon" src="../../assets/img/koala.png" alt="Drop Bear Table Logo" width="80" height="80">
                <span class="fs-4">Drop Bear Table</span>
                </router-link>
                <hr>
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link text-white" v-bind:class="{'active' : activePage === 'home'}">
                        <img class="icon" src="../../assets/img/icons/home.png" alt="Home Icon" width="32" height="32">
                        Home
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/restaurants" class="nav-link text-white" v-bind:class="{'active' : activePage === 'restaurants'}">
                        <img class="icon" src="../../assets/img/icons/cutlery.png" alt="Restaurants Icon" width="32" height="32">
                        Restaurants
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/reservations" class="nav-link text-white" v-bind:class="{'active' : activePage === 'reservations'}">
                        <img class="icon" src="../../assets/img/icons/calendar.png" alt="Reservations Icon" width="32" height="32">
                        My Reservations
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/stats" class="nav-link text-white" v-bind:class="{'active' : activePage === 'stats'}">
                        <img class="icon" src="../../assets/img/icons/pie-chart.png" alt="Stats Icon" width="32" height="32">
                        My Stats
                        </router-link>
                    </li>
                </ul>
                <hr>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="../../assets/img/icons/user.png" alt="" width="32" height="32" class="rounded-circle me-2">
                    <strong>Demo User</strong>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">Your reservation at Dorsia has been confirmed.</a></li>
                        <li><a class="dropdown-item" href="#">Your reservation at Smith & Wollensky has been confirmed.</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    .icon {
        margin-left: 1%;
    }

    .nav-item {
        text-align: left;
    }

    .nav-item .icon {
        margin-right: 8%
    }

    .nav-item a:hover {
        background-color: #0275d8;
    }

    #nav-wrapper {
        padding-left: 0;
    }
</style>

<script>
    export default {
        name: 'SideNav',
        props: {
            activePage: {
                type: String,
                required: true
            }
        }
    }
</script>
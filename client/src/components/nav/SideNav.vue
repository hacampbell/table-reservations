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
                <div class="logout">
                    <button type="button" class="btn btn-outline-light" @click="Signout">Logout</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<style scoped>
    button {
        width: 50%;
    }

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
    import {Logout} from '../../services/auth';

    export default {
        name: 'SideNav',

        props: {
            activePage: {
                type: String,
                required: true
            }
        },

        methods: {
            // Handles top level logic for logging a user out
            async Signout () {
                // Send the request to log the user out
                const response = await Logout(this.$store.getters.GetRefreshToken);

                // Check that we successfully signed out
                if (response) {
                    this.$store.dispatch('SetAccessToken', '');
                    this.$store.dispatch('SetRefreshToken', '');
                    this.$router.push('/login');
                    return;
                }

                // If something went wrong, let the user know that they should contact us, because that'd pretty weird.
                this.$toast.open({
                    message: `Your logout request was unable to be processed. Please contact us relating to this issue.`,
                    type: 'error',
                    duration: 6000
                });
            }
        }
    }
</script>
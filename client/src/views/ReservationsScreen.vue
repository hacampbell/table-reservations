<template>
    <div class="container-fluid">
        <div id="content" class="row">
            <div id="nav-area">
                <SideNav activePage="reservations" />
            </div>
            <div class="col">
                <div id="card-area" class="row row-cols-1 row-cols-md-3 g-4">
                    <h2>Test</h2>
                    <h2>Test</h2>
                    <h2>Test</h2>
                    <h2>Test</h2>
                    <h2>Test</h2>
                    <h2>Test</h2>
                </div>
            </div>
        </div>
    </div>        
</template>

<style scoped>
    #nav-area {
        position: fixed;
        width: 14.85%;
        padding: 0;
    }

    #card-area {
        margin-left: 15%;
        padding-top: 1%;
    }
</style>

<script>
    import SideNav from '../components/nav/SideNav.vue';

    export default {
        name: 'Reservations',
        components: {
            SideNav
        },

        async created() {
            // Get a list of the users reservations from the server
        },

        data () {
            // Store a list of reservations that we can loop over and display
            return {
                reservationsList: []
            }
        }
    }
</script>
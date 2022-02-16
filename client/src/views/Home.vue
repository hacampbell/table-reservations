<template>
    <div class="container-fluid">
        <div class="row">
            <SideNav activePage="home" />
            <div class="col">
                <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
                    <h1>Welcome to Drop Bear Table</h1>
                    <h2>Never worry about dropping by unannounced again.</h2>
                    <br/>
                    <router-link to='/restaurants'>
                        <input type="button" class="btn btn-primary" value="Show me the Restaurants!" />
                    </router-link>
                    <br/>
                    <p>Developed by Henry Campbell</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SideNav from '../components/nav/SideNav.vue';

    export default {
        name: 'Home',

        components: {
            SideNav,
        },

        created () {
            // Make sure that the user is logged in, if not redirect them to do so
            if (this.$store.getters.GetRefreshToken === '') {
                this.$router.push({name: 'Login'});
                return;
            }
        }
    }
</script>

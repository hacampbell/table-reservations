<template>
    <div class="container-fluid">
        <div class="row">
            <SideNav activePage="restaurants" />
            <div class="col">
                <h2>Test</h2>
            </div>
        </div>
    </div>        
</template>

<script>
    import SideNav from '../components/nav/SideNav.vue';
    import {GetRestaurants} from '../services/restaurants';

    export default {
        name: 'Restaurants',
        components: {
            SideNav
        },
        async created() {
            const restraunts = await GetRestaurants(this.$store.getters.GetAccessToken);
            console.log(restraunts);
        }
    }
</script>
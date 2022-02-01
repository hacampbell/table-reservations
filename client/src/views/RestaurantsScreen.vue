<template>
    <div class="container-fluid">
        <div id="content" class="row">
            <SideNav activePage="restaurants" />
            <div class="col">
                <div id="card-area" class="row row-cols-1 row-cols-md-3 g-4">
                    <RestaurantCard v-for="rest in this.restaurantList" :key="rest._id"
                    :restName="rest.name"
                    :description="rest.description" 
                    image="dorsia.jpeg" 
                    />
                </div>
            </div>
        </div>
    </div>        
</template>

<style scoped>
    #card-area {
        padding-top: 1%;
    }
</style>

<script>
    import SideNav from '../components/nav/SideNav.vue';
    import RestaurantCard from '../components/restaurants/RestaurantCard.vue';
    import {GetRestaurants} from '../services/restaurants';

    export default {
        name: 'Restaurants',
        components: {
            SideNav,
            RestaurantCard
        },

        async created() {
            // Get a list of restaurants from the server
            const restaurants = await GetRestaurants(this.$store.getters.GetAccessToken);
            console.log(restaurants);
            
            // If we couldn't get the restaurant list, just display an error for now
            if (!restaurants) {
                this.$toast.open({
                        message: `Unable to get restaurants.`,
                        type: 'error',
                        duration: 5000
                });
                return;
            }

            // If all went well, set the data for display
            this.restaurantList = restaurants;
        },

        data () {
            // Store a list of restaurants that we can loop over and display
            return {
                restaurantList: []
            }
        }
    }
</script>
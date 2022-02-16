<template>
    <div class="container-fluid">
        <div id="content" class="row">
            <div id="nav-area">
                <SideNav activePage="restaurants" />
            </div>
            <div class="col">
                <div id="card-area" class="row row-cols-1 row-cols-md-3 g-4">
                    <RestaurantCard v-for="rest in this.restaurantList" :key="rest._id"
                        :restName="rest.name"
                        :description="rest.description"
                        :address="rest.address"
                        :contact="rest.contactNumber"
                        :hours="rest.openingHours"
                        :days="rest.openingDays"
                        :maxGuests="rest.maxGuests"
                        image="dorsia.jpeg" 
                    />
                </div>
            </div>
        </div>
    </div>        
</template>

<style scoped>
    #nav-area {
        position: fixed;
        width: 15%;
        padding: 0;
    }

    #card-area {
        margin-left: 15%;
        padding-top: 1%;
    }
</style>

<script>
    import SideNav from '../components/nav/SideNav.vue';
    import RestaurantCard from '../components/restaurants/RestaurantCard.vue';
    import {GetRestaurants} from '../services/restaurants';
    import {CheckAndRefreshToken} from '../services/auth';

    export default {
        name: 'Restaurants',
        components: {
            SideNav,
            RestaurantCard
        },

        async created() {
            const refreshToken = this.$store.getters.GetRefreshToken;

            // Make sure that the user is logged in, if not redirect them to do so
            if (refreshToken === '') {
                this.$router.push({name: 'Login'});
                return;
            }

            // Make sure the user has a valid access token
            await CheckAndRefreshToken(this);

            // Get a list of restaurants from the server
            const restaurants = await GetRestaurants(this.$store.getters.GetAccessToken);
            
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
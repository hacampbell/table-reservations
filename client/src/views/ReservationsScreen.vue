<template>
    <div class="container-fluid">
        <div id="content" class="row">
            <div id="nav-area">
                <SideNav activePage="reservations" />
            </div>
            <div class="col">
                <div id="card-area" class="row row-cols-1 row-cols-md-3 g-4">
                    <ReservationCard v-for="res in this.DisplayReservations" :key="res._id"
                        :resId="res._id"
                        :restName="res.restaurantName"
                        :guestName="res.reservationName"
                        :phoneNumber="res.mobileNumber"
                        :guestCount="res.numGuests"
                        :resDate="res.date"
                        :resTime="res.time"
                        :status="res.status"
                        :specialRequest="res.specialRequests"
                    />
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
    import ReservationCard from '../components/reservations/ReservationCard.vue';
    import {GetReservations} from '../services/reservations'
    import {CheckAndRefreshToken} from '../services/auth';

    export default {
        name: 'Reservations',
        components: {
            SideNav,
            ReservationCard
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

            // Finally, get the users reservations
            const resData = await GetReservations(this.$store.getters.GetAccessToken);
            this.$store.dispatch('UpdateResData', resData);
        },

        computed: {
            // Gets a list of reservations that have the processing or confirmed status
            DisplayReservations() {
                const reservationList = this.$store.getters.GetResData;
                return reservationList.filter(reservation => reservation.status === 'Processing' || reservation.status === 'Confirmed');
            }
        }
    }
</script>
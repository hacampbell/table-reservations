<template>
    <div class="col">
        <div class="card h-100">
            <img v-bind:src="require(`../../assets/img/restaurants/${image}`)" class="card-img-top" alt="Restaurant Image">

            <div class="card-body">
                <h5 class="card-title">{{restName}}</h5>
                <p class="card-text">Address: {{address}}</p>
                <p class="card-text">Contact: {{contact}}</p>
                <p class="card-text">Open: {{hours}} {{days}}</p>
                <p class="card-text">{{description}}</p>
            </div>

            <div class="card-footer">
                <button type="button" class="btn btn-primary restuaurant-button" @click="ShowModal">
                Make a Reservation
                </button>
            </div>
        </div>
        <RestaurantModal v-if="displayModal" @close-restaurant-modal-event="HideModal" :restName=restName />
    </div>
</template>

<style scoped>
    .card-title {
        margin-bottom: 1%
    }

    .card-text {
        margin: 0.5%
    }
</style>

<script>
    import RestaurantModal from './RestaurantModal.vue'

    export default {
        name: 'RestaurantCard',

        components: {
            RestaurantModal
        },

        props: {
            restName: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            contact: {
                type: String,
                required: true
            },
            hours: {
                type: String,
                required: true
            },
            days: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                displayModal: false
            }
        },

        methods: {
            ShowModal () {
                this.displayModal = true;
            },

            HideModal () {
                this.displayModal = false;
            }
        }
    }
</script>
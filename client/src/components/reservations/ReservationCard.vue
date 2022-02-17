<template>
    <div class="col">
        <div class="col reservation-card">
            <div class="card h-100">
                <img v-bind:src="require(`@/assets/img/reservations/reserved.jpg`)" class="card-img-top" alt="Restaurant Image">
                <div class="card-body">
                    <h5 class="card-title">{{restName}}</h5>
                    <p class="card-text"><strong>Name: </strong> {{guestName}}</p>
                    <p class="card-text"><strong>Date: </strong> {{displayDate}} - {{resTime}}</p>
                    <p class="card-text"><strong>Guests: </strong> {{guestCount}}</p>
                    <p class="card-text"><strong>Status: </strong> {{status}}</p>
                    <p class="card-text"><strong>ID: </strong> {{resId}}</p>
                </div>
                <div class="card-footer text-center">
                    <button type="button" class="btn btn-primary reservation-button" @click="ShowModal">
                    Edit Reservation
                    </button>
                    <button type="button" class="btn btn-primary reservation-button" @click="ShowDeleteModal">
                    Delete Reservation
                    </button>
                </div>
            </div>
        </div>

        <ReservationModal 
            v-if="displayModal"
            @close-reservation-modal-event="HideModal"
            :resId=resId
            :restName=restName 
            :guestName=guestName
            :phoneNumber=phoneNumber
            :guestCount=guestCount
            :resDateRaw=resDate
            :resTime=resTime
            :specialRequest=specialRequest
        />

        <DeleteReservationModal 
            v-if="displayDeleteModal"
            @close-delete-reservation-modal-event="HideDeleteModal" 
            :resId=resId
            :restName=restName
        />
    </div>
</template>

<style scoped>
    h5 {
        font-weight: bold;
    }

    p {
        margin: 1%;
    }

    button {
        margin: 0 3%;
    }

    .card:hover {
        background-color: rgb(232, 252, 255);
    }

    .card img {
        height: 300px;
        width: 100%;
        object-fit: cover;
    }
</style>

<script>
    import ReservationModal from './ReservationModal.vue'
    import DeleteReservationModal from './DeleteReservationModal.vue'

    export default {
        name: 'ReservationCard',

        components: {
            ReservationModal,
            DeleteReservationModal
        },

        props: {
            resId: {
                type: String,
                required: true
            },
            restName: {
                type: String,
                required: true
            },
            guestName: {
                type: String,
                required: true
            },
            phoneNumber: {
                type: String,
                required: true
            },
            guestCount: {
                type: Number,
                required: true
            },
            resDate: {
                type: String,
                required: true
            },
            resTime: {
                type: String,
                required: true
            },
            specialRequest: {
                type: String,
                required: false
            },
            status: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                displayModal: false,
                displayDeleteModal: false,
            }
        },

        methods: {
            ShowModal () {
                this.displayModal = true;
            },

            HideModal () {
                this.displayModal = false;
            },

            ShowDeleteModal () {
                this.displayDeleteModal = true;
            },

            HideDeleteModal () {
                this.displayDeleteModal = false;
            }
        },

        computed: {
            // Do some wheeling and dealing so we can have a human readable date
            displayDate: function () {
                const convertedDate = new Date(this.resDate);
                    const day = convertedDate.getUTCDate();
                const month = convertedDate.getUTCMonth() + 1;
                const year = convertedDate.getUTCFullYear();
                const dispDate = `${day}-${month}-${year}`;

                return dispDate;
            }
        }
    }
</script>
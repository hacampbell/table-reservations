<template>
    <div class="restModal">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Make a Reservation for {{restName}}</h5>
                    </div>
                    <div class="modal-body">
                        <p v-if="errors.length">
                            Please correct the following error(s):
                            <ul>
                                <li class="text-danger" v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
                            </ul>
                        </p>
                        <form id="reservationForm">
                            <div class="mb-3">
                                <label for="reservation-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="reservation-name" v-model="resName">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-phone" class="col-form-label">Phone:</label>
                                <input type="text" class="form-control" id="reservation-phone" v-model="phone">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-guests" class="col-form-label">Number of Guests:</label>
                                <input type="number" class="form-control" id="reservation-guests" v-model="guests">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-date" class="col-form-label">Date:</label>
                                <input type="date" class="form-control" id="reservation-date" v-model="date">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-time" class="col-form-label">Time:</label>
                                <input type="time" class="form-control" id="reservation-time" v-model="time">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-request" class="col-form-label">Special Requests:</label>
                                <textarea class="form-control" id="reservation-request" v-model="requests"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="CloseModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="MakeReservation">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
  .modal {
    display: block;
    background-color: rgba(0, 0, 0, 0.432);
    text-align: left;
  }
</style>

<script>
    import {CreateReservation} from '../../services/reservations';
    import {isValidReservation} from '../../services/reservationDataValidation';
    import {CheckAndRefreshToken} from '../../services/auth';

    export default {
        name: 'RestaurantModal',

        data() {
            // Define our fields for model binding
            return {
                resName: '',
                phone: '',
                guests: '',
                date: '',
                time: '',
                requests: '',
                errors: []
            }
        },

        methods: {
            // Emits the event to close this modal
            CloseModal () {
                this.$emit('close-restaurant-modal-event');
            },

            // Sends a request to create a new reservation in the system
            async MakeReservation () {
                // Reset our list of errors so that it will only contain issues with this request
                this.errors = [];

                // Craft the payload we want to send
                const payload = {
                    reservationName: this.resName,
                    time: this.time,
                    numGuests: this.guests,
                    restaurantName: this.restName,
                    mobileNumber: this.phone,
                    date: this.date,
                    specialRequests: this.requests
                }

                // Check that the data we intend to send to the server is valid
                const errors = isValidReservation(payload, this.maxGuests, this.openHours);
                if (errors.length > 0) {
                    this.errors = errors;
                    return;
                }

                // Before we make our request, ensure we have a valid access token
                await CheckAndRefreshToken(this);

                // Get our response
                const response = await CreateReservation(payload, this.$store.getters.GetAccessToken);
                
                // If the request was successful, let the user know, otherwise if it failed tell the 
                // user what went wrong
                if (response === true) {
                    this.$toast.open({
                        message: `Your reservation for ${this.restName} has been requested.`,
                        type: 'success',
                        duration: 5000
                    });
                    this.CloseModal(); // The reservation has been made, close this modal
                } else {
                    this.$toast.open({
                        message: `Your reservation for ${this.restName} was unable to be made. Bad data sent to server.`,
                        type: 'error',
                        duration: 5000
                    });
                }
            }
        },

        props: {
            restName: {
                type: String,
                required: true
            }, 
            openHours: {
                type: String,
                required: true
            },
            maxGuests: {
                type: Number,
                required: true
            }
        }
    }
</script>
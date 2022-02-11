<template>
    <div class="resModal">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Edit Your Reservation For {{restName}}</h4>
                    </div>
                    <div class="modal-body">
                        <p v-if="errors.length">
                            Please correct the following error(s):
                            <ul>
                                <li class="text-danger" v-for="(error, index) in this.errors" :key="index">{{ error }}</li>
                            </ul>
                        </p>
                        <form>
                            <div class="mb-3">
                                <label for="reservation-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="reservation-name" v-model="newResName">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-phone" class="col-form-label">Phone:</label>
                                <input type="text" class="form-control" id="reservation-phone" v-model="newResPhone">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-guests" class="col-form-label">Number of Guests:</label>
                                <input type="number" class="form-control" id="reservation-guests" v-model="newResGuests">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-time" class="col-form-label">Time:</label>
                                <input type="time" class="form-control" id="reservation-time" v-model="newResTime">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-request" class="col-form-label">Special Requests:</label>
                                <textarea class="form-control" id="reservation-request" v-model="newResRequests"></textarea>
                            </div>
                        </form>
                        <p>Please note, you cannot edit the date of a reservation. If you wish to change the date, please cancel this reservation and create a new one.</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="CloseModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="SubmitUpdate">Update</button>
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
    import {UpdateReservation, GetReservations} from '../../services/reservations';

    export default {
        name: 'ReservationModal',

        methods: {
            // Sends an event to close this modal
            CloseModal () {
                this.$emit('close-reservation-modal-event');
            },

            // Sends a request to the server with new data from this form to update this reservation
            async SubmitUpdate () {
                // Clean our our list of errors so they're only relevent to this request
                this.errors = [];

                // Create our payload
                const payload = {
                    restaurantName: this.restName,
                    reservationName: this.newResName,
                    mobileNumber: this.newResPhone,
                    numGuests: this.newResGuests,
                    time: this.newResTime,
                    specialRequests: this.newResRequests
                };

                console.log('Payload is:');
                console.log(payload);

                // Send out request
                const response = await UpdateReservation(payload, this.resId, this.$store.getters.GetAccessToken);

                // If everything went according to plan, let the user know
                if (response === true) {
                    this.$toast.open({
                        message: `Your reservation for ${this.restName} has been updated.`,
                        type: 'success',
                        duration: 5000
                    });

                    // Update our list of reservations with the new data
                    const resData = await GetReservations(this.$store.getters.GetAccessToken);
                    this.$store.dispatch('UpdateResData', resData);

                    // Finally, close this modal.
                    this.CloseModal();
                    return;
                }

                // Otherwise, show what went wrong in the console and give the user a nice notification.
                console.log(response);

                this.$toast.open({
                    message: `An error occured trying to update your reservation for ${this.restName}.`,
                    type: 'error',
                    duration: 7000
                });

                this.errors = response.error;
            }
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
            resTime: {
                type: String,
                required: true
            },
            specialRequest: {
                type: String,
                required: false
            }
        },

        data() {
            // Setup models so we can easily send new data in an update request
            return {
                newResName: this.guestName,
                newResPhone: this.phoneNumber,
                newResGuests: this.guestCount,
                newResTime: this.resTime,
                newResRequests: this.specialRequest,
                errors: []
            }
        }
    }
</script>
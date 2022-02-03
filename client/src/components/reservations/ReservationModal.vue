<template>
    <div class="resModal">
        <div class="modal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Your Reservation For {{restName}}</h5>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                                <label for="reservation-name" class="col-form-label">Name:</label>
                                <input type="text" class="form-control" id="reservation-name" :value=guestName>
                            </div>
                            <div class="mb-3">
                                <label for="reservation-phone" class="col-form-label">Phone:</label>
                                <input type="text" class="form-control" id="reservation-phone" :value=phoneNumber>
                            </div>
                            <div class="mb-3">
                                <label for="reservation-guests" class="col-form-label">Number of Guests:</label>
                                <input type="number" class="form-control" id="reservation-guests" :value=guestCount>
                            </div>
                            <div class="mb-3">
                                <label for="reservation-date" class="col-form-label">Date:</label>
                                <input type="date" class="form-control" id="reservation-date">
                            </div>
                            <div class="mb-3">
                                <label for="reservation-time" class="col-form-label">Time:</label>
                                <input type="time" class="form-control" id="reservation-time" :value=resTime>
                            </div>
                            <div class="mb-3">
                                <label for="reservation-request" class="col-form-label">Special Requests:</label>
                                <textarea class="form-control" id="reservation-request" :value=specialRequest></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="CloseModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="SaveChanges">Submit</button>
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
    export default {
        name: 'ReservationModal',

        methods: {
            // Sends an event to close this modal
            CloseModal () {
                this.$emit('close-reservation-modal-event');
            },

            // Calls the UpdateReservation function and the CloseModal function
            SaveChanges () {
                this.UpdateReservation();
                this.CloseModal();
            },

            // Sends a request to the server with new data from this form to
            // update this reservation
            async UpdateReservation () {
               console.log('UpdateReservation');
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
            resDateRaw: {
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
            }
        }
    }
</script>